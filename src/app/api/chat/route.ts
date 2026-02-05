import { streamText } from "ai";
import { model } from "@/lib/ai/client";
import { auth } from "@/lib/auth";
import { getWeather, getNextF1Race, getStockPrice } from "@/lib/api/tools";

export async function POST(req: Request) {
  const session = await auth();
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { messages } = await req.json();

  const lastMessage = messages[messages.length - 1];
  const userMessage = lastMessage.content.toLowerCase();

  let systemPrompt = "You are Lumina, a helpful AI assistant.";
  let additionalContext = "";
  let toolData: any = null;

  // Company name to stock symbol mapping
  const companyToSymbol: { [key: string]: string } = {
    apple: "AAPL",
    tesla: "TSLA",
    microsoft: "MSFT",
    google: "GOOGL",
    amazon: "AMZN",
    meta: "META",
    facebook: "META",
    nvidia: "NVDA",
    netflix: "NFLX",
    amd: "AMD",
    intel: "INTC",
    uber: "UBER",
    disney: "DIS",
    "coca cola": "KO",
    pepsi: "PEP",
    walmart: "WMT",
    target: "TGT",
    starbucks: "SBUX",
    nike: "NKE",
  };

  try {
    // Weather detection
    if (userMessage.includes("weather")) {
      const locationMatch = userMessage.match(
        /weather (?:in |at |for )?([a-z\s]+)/i,
      );
      const location = locationMatch ? locationMatch[1].trim() : "London";

      const weatherData = await getWeather(location);
      toolData = { type: "weather", data: weatherData };
      additionalContext = `\n\nCurrent weather data for ${weatherData.location}:\n- Temperature: ${weatherData.temperature}°C (feels like ${weatherData.feelsLike}°C)\n- Condition: ${weatherData.condition}\n- Humidity: ${weatherData.humidity}%\n- Wind Speed: ${weatherData.windSpeed} km/h\n\nProvide a brief, natural response about this weather.`;
    }
    // F1 detection
    else if (
      userMessage.includes("f1") ||
      userMessage.includes("formula 1") ||
      userMessage.includes("formula one") ||
      userMessage.includes("next race") ||
      userMessage.includes("f1 race")
    ) {
      const raceData = await getNextF1Race();
      toolData = { type: "f1", data: raceData };
      additionalContext = `\n\nNext F1 race:\n- Race: ${raceData.raceName}\n- Circuit: ${raceData.circuit}\n- Location: ${raceData.location}\n- Date: ${raceData.date}\n- Time: ${raceData.time}\n\nProvide a brief, natural response about this race.`;
    }
    // Stock detection
    else if (
      userMessage.includes("stock") ||
      userMessage.includes("share") ||
      userMessage.includes("ticker") ||
      userMessage.includes("price of")
    ) {
      let symbol = "AAPL";
      const originalMessage = lastMessage.content;
      const symbolMatch = originalMessage.match(/\b([A-Z]{2,5})\b/);

      if (symbolMatch) {
        symbol = symbolMatch[1].toUpperCase();
      } else {
        for (const [companyName, stockSymbol] of Object.entries(
          companyToSymbol,
        )) {
          if (userMessage.includes(companyName)) {
            symbol = stockSymbol;
            break;
          }
        }
      }

      const stockData = await getStockPrice(symbol);
      toolData = { type: "stock", data: stockData };
      additionalContext = `\n\nStock info for ${stockData.symbol}:\n- Price: $${stockData.price.toFixed(2)}\n- Change: $${stockData.change.toFixed(2)} (${stockData.changePercent}%)\n- Volume: ${stockData.volume.toLocaleString()}\n\nProvide a brief, natural response about this stock.`;
    }
  } catch (error: any) {
    additionalContext = `\n\nError fetching data: ${error.message}. Please inform the user politely.`;
  }

  const result = streamText({
    model,
    messages,
    system: systemPrompt + additionalContext,
  });

  // Create a custom response that includes tool data
  const stream = result.toTextStreamResponse();

  if (toolData) {
    // Prepend tool data as a special marker
    const encoder = new TextEncoder();
    const toolDataString = `__TOOL_DATA__${JSON.stringify(toolData)}__END_TOOL_DATA__`;

    return new Response(
      new ReadableStream({
        async start(controller) {
          // Send tool data first
          controller.enqueue(encoder.encode(toolDataString));

          // Then stream the AI response
          const reader = stream.body?.getReader();
          if (reader) {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              controller.enqueue(value);
            }
          }
          controller.close();
        },
      }),
      {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
        },
      },
    );
  }

  return stream;
}

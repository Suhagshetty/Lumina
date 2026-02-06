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

  // Enhanced system prompt for better general conversation
  let systemPrompt = `You are Lumina, a friendly and helpful AI assistant. You can:
- Answer general questions about any topic
- Have casual conversations
- Provide information and explanations
- Help with tasks and problem-solving
- Access real-time data using special tools when needed:
  * Weather information for any location
  * F1 race schedules
  * Stock market prices

Always be conversational, helpful, and concise. When users ask about weather, F1, or stocks, I'll provide you with real-time data to include in your response.`;

  let additionalContext = "";
  let toolData: any = null;

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
    spotify: "SPOT",
    airbnb: "ABNB",
    twitter: "TWTR",
    zoom: "ZM",
    snapchat: "SNAP",
  };

  try {
    // Weather detection
    if (
      userMessage.includes("weather") ||
      userMessage.includes("temperature") ||
      userMessage.includes("forecast") ||
      userMessage.includes("clima") // Spanish
    ) {
      const locationMatch =
        userMessage.match(/weather (?:in |at |for |of )?([a-z\s]+)/i) ||
        userMessage.match(/temperature (?:in |at |for |of )?([a-z\s]+)/i) ||
        userMessage.match(/forecast (?:in |at |for |of )?([a-z\s]+)/i);

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
      userMessage.includes("f1 race") ||
      userMessage.includes("grand prix") ||
      userMessage.includes("racing")
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
      userMessage.includes("price of") ||
      userMessage.includes("market") ||
      userMessage.includes("trading at")
    ) {
      let symbol = "AAPL"; // Default
      const originalMessage = lastMessage.content;

      // Try to find ticker symbol (e.g., AAPL, TSLA)
      const symbolMatch = originalMessage.match(/\b([A-Z]{2,5})\b/);

      if (symbolMatch) {
        symbol = symbolMatch[1].toUpperCase();
      } else {
        // Try to match company name
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
    // No tool needed - just general conversation
    else {
      // The AI will respond naturally without any tool data
      additionalContext = "";
    }
  } catch (error: any) {
    additionalContext = `\n\nError fetching data: ${error.message}. Please inform the user politely that you couldn't retrieve the real-time data, but offer to help with something else.`;
  }

  const result = streamText({
    model,
    messages,
    system: systemPrompt + additionalContext,
  });

  const stream = result.toTextStreamResponse();

  // If we have tool data, inject it into the stream
  if (toolData) {
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

  // No tool data - just return the normal stream
  return stream;
}

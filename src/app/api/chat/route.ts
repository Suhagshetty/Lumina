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

  console.log("API received messages:", messages);

  // Analyze the last user message to determine if we need to call an API
  const lastMessage = messages[messages.length - 1];
  const userMessage = lastMessage.content.toLowerCase();

  console.log("User message (lowercase):", userMessage);

  let systemPrompt = "You are Lumina, a helpful AI assistant.";
  let additionalContext = "";

  // Common company name to stock symbol mapping
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
    adidas: "ADDYY",
    sony: "SONY",
    toyota: "TM",
    ford: "F",
    gm: "GM",
    "general motors": "GM",
    boeing: "BA",
    airbus: "EADSY",
    spacex: "SPACE", // Not public but added for reference
  };

  try {
    // Weather detection
    if (userMessage.includes("weather")) {
      const locationMatch = userMessage.match(
        /weather (?:in |at |for )?([a-z\s]+)/i,
      );
      const location = locationMatch ? locationMatch[1].trim() : "London";

      console.log("WEATHER DETECTED! Fetching weather for:", location);
      const weatherData = await getWeather(location);
      console.log("Weather data received:", weatherData);
      additionalContext = `\n\nCurrent weather data for ${weatherData.location}:\n- Temperature: ${weatherData.temperature}°C (feels like ${weatherData.feelsLike}°C)\n- Condition: ${weatherData.condition} (${weatherData.description})\n- Humidity: ${weatherData.humidity}%\n- Wind Speed: ${weatherData.windSpeed} km/h\n\nPlease provide a natural response using this data.`;
    }

    // F1 detection
    else if (
      userMessage.includes("f1") ||
      userMessage.includes("formula 1") ||
      userMessage.includes("formula one") ||
      userMessage.includes("next race") ||
      userMessage.includes("f1 race")
    ) {
      console.log("F1 DETECTED! Fetching F1 race data...");
      try {
        const raceData = await getNextF1Race();
        console.log("F1 race data received:", raceData);
        additionalContext = `\n\nNext F1 race information:\n- Race: ${raceData.raceName}\n- Circuit: ${raceData.circuit}\n- Location: ${raceData.location}\n- Date: ${raceData.date}\n- Time: ${raceData.time}\n- Round: ${raceData.round}\n\nPlease provide a natural response using this data.`;
      } catch (f1Error: any) {
        console.error("F1 API Error:", f1Error);
        additionalContext = `\n\nNote: I encountered an error fetching F1 race data: ${f1Error.message}. Please let the user know.`;
      }
    }

    // Stock detection - IMPROVED WITH COMPANY NAME MAPPING
    else if (
      userMessage.includes("stock") ||
      userMessage.includes("share") ||
      userMessage.includes("ticker") ||
      userMessage.includes("price of")
    ) {
      console.log("STOCK DETECTED! Processing...");

      let symbol = "AAPL"; // Default

      // First, try to find uppercase stock symbols (e.g., TSLA, AAPL)
      const originalMessage = lastMessage.content;
      const symbolMatch = originalMessage.match(/\b([A-Z]{2,5})\b/);

      if (symbolMatch) {
        symbol = symbolMatch[1].toUpperCase();
        console.log("Found uppercase symbol:", symbol);
      } else {
        // If no uppercase symbol found, check for company names
        console.log("No uppercase symbol found, checking company names...");
        for (const [companyName, stockSymbol] of Object.entries(
          companyToSymbol,
        )) {
          if (userMessage.includes(companyName)) {
            symbol = stockSymbol;
            console.log(
              `Found company name "${companyName}" -> ${stockSymbol}`,
            );
            break;
          }
        }
      }

      console.log("Final symbol to fetch:", symbol);

      try {
        const stockData = await getStockPrice(symbol);
        console.log("Stock data received:", stockData);
        additionalContext = `\n\nStock information for ${stockData.symbol}:\n- Current Price: $${stockData.price.toFixed(2)}\n- Change: $${stockData.change.toFixed(2)} (${stockData.changePercent}%)\n- Volume: ${stockData.volume.toLocaleString()}\n- Last Updated: ${stockData.lastUpdated}\n\nPlease provide a natural response using this data.`;
      } catch (stockError: any) {
        console.error("Stock API Error:", stockError);
        additionalContext = `\n\nNote: I encountered an error fetching stock data for ${symbol}: ${stockError.message}. Please let the user know.`;
      }
    }
  } catch (error: any) {
    console.error("Error fetching external data:", error);
    additionalContext = `\n\nNote: I encountered an error fetching the data: ${error.message}. Please let the user know and offer alternatives.`;
  }

  console.log("Additional context length:", additionalContext.length);
  console.log("Streaming response...");

  const result = streamText({
    model,
    messages,
    system: systemPrompt + additionalContext,
  });

  return result.toTextStreamResponse();
}

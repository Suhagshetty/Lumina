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

  // Analyze the last user message to determine if we need to call an API
  const lastMessage = messages[messages.length - 1];
  const userMessage = lastMessage.content.toLowerCase();

  let systemPrompt = "You are Lumina, a helpful AI assistant.";
  let additionalContext = "";

  try {
    // Weather detection
    if (userMessage.includes("weather")) {
      // Extract location from message
      const locationMatch = userMessage.match(
        /weather (?:in |at |for )?([a-z\s]+)/i,
      );
      const location = locationMatch ? locationMatch[1].trim() : "London";

      const weatherData = await getWeather(location);
      additionalContext = `\n\nCurrent weather data for ${weatherData.location}:\n- Temperature: ${weatherData.temperature}°C (feels like ${weatherData.feelsLike}°C)\n- Condition: ${weatherData.condition} (${weatherData.description})\n- Humidity: ${weatherData.humidity}%\n- Wind Speed: ${weatherData.windSpeed} km/h\n\nPlease provide a natural response using this data.`;
    }

    // F1 detection
    else if (
      userMessage.includes("f1") ||
      userMessage.includes("formula 1") ||
      userMessage.includes("formula one") ||
      userMessage.includes("race")
    ) {
      const raceData = await getNextF1Race();
      additionalContext = `\n\nNext F1 race information:\n- Race: ${raceData.raceName}\n- Circuit: ${raceData.circuit}\n- Location: ${raceData.location}\n- Date: ${raceData.date}\n- Time: ${raceData.time}\n- Round: ${raceData.round}\n\nPlease provide a natural response using this data.`;
    }

    // Stock detection
    else if (
      userMessage.includes("stock") ||
      userMessage.includes("share") ||
      userMessage.includes("ticker")
    ) {
      // Extract stock symbol
      const symbolMatch = userMessage.match(/\b([A-Z]{1,5})\b/);
      const symbol = symbolMatch ? symbolMatch[1] : "AAPL";

      const stockData = await getStockPrice(symbol);
      additionalContext = `\n\nStock information for ${stockData.symbol}:\n- Current Price: $${stockData.price.toFixed(2)}\n- Change: $${stockData.change.toFixed(2)} (${stockData.changePercent}%)\n- Volume: ${stockData.volume.toLocaleString()}\n- Last Updated: ${stockData.lastUpdated}\n\nPlease provide a natural response using this data.`;
    }
  } catch (error: any) {
    additionalContext = `\n\nNote: I encountered an error fetching the data: ${error.message}. Please let the user know and offer alternatives.`;
  }

  const result = streamText({
    model,
    messages,
    system: systemPrompt + additionalContext,
  });

  return result.toTextStreamResponse();
}

// Weather API (using WeatherAPI.com)
export async function getWeather(location: string) {
  const apiKey = process.env.WEATHER_API_KEY || process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    throw new Error("Weather API key not configured");
  }

  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(location)}&aqi=no`;

  console.log("Weather API - Calling WeatherAPI.com");

  const response = await fetch(url);

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Weather API - Error:", errorText);
    throw new Error(`Weather API error: ${response.status}`);
  }

  const data = await response.json();

  return {
    location: data.location.name + ", " + data.location.country,
    temperature: Math.round(data.current.temp_c),
    condition: data.current.condition.text,
    description: data.current.condition.text,
    humidity: data.current.humidity,
    windSpeed: Math.round(data.current.wind_kph),
    feelsLike: Math.round(data.current.feelslike_c),
  };
}

// F1 API (using Jolpica-f1 API)
export async function getNextF1Race() {
  try {
    // Use current season
    const currentYear = new Date().getFullYear();
    const url = `https://api.jolpi.ca/ergast/f1/${currentYear}.json`;

    console.log("F1 API - Calling URL:", url);

    const response = await fetch(url, {
      cache: "no-store",
    });

    console.log("F1 API - Response status:", response.status);

    if (!response.ok) {
      throw new Error(`F1 API error: ${response.status}`);
    }

    const data = await response.json();
    const races = data.MRData?.RaceTable?.Races || [];

    if (races.length === 0) {
      return {
        raceName: "No race data available",
        circuit: "N/A",
        location: "N/A",
        date: "N/A",
        time: "N/A",
        round: 0,
        country: "N/A",
      };
    }

    // Find next race
    const now = new Date();
    let nextRace = races.find((race: any) => {
      const raceDateTime = race.date + "T" + (race.time || "14:00:00Z");
      const raceDate = new Date(raceDateTime);
      return raceDate > now;
    });

    // If no future race found, use the last race of the season
    if (!nextRace) {
      nextRace = races[races.length - 1];
    }

    return {
      raceName: nextRace.raceName,
      circuit: nextRace.Circuit.circuitName,
      location: `${nextRace.Circuit.Location.locality}, ${nextRace.Circuit.Location.country}`,
      date: nextRace.date,
      time: nextRace.time || "TBA",
      round: nextRace.round,
      country: nextRace.Circuit.Location.country,
      season: currentYear,
    };
  } catch (error: any) {
    console.error("F1 API - Full error:", error);
    throw error;
  }
}
// Stock API
export async function getStockPrice(symbol: string) {
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY;

  console.log("Stock API - API Key exists:", !!apiKey);

  if (!apiKey) {
    throw new Error("Stock API key not configured");
  }

  const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol.toUpperCase()}&apikey=${apiKey}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Stock API error: ${response.status}`);
  }

  const data = await response.json();

  if (data["Error Message"]) {
    throw new Error("Invalid stock symbol");
  }

  if (data["Note"]) {
    throw new Error("API rate limit reached. Please try again in a minute.");
  }

  const quote = data["Global Quote"];

  if (!quote || !quote["05. price"]) {
    throw new Error("Stock data not available");
  }

  return {
    symbol: quote["01. symbol"],
    price: parseFloat(quote["05. price"]),
    change: parseFloat(quote["09. change"]),
    changePercent: quote["10. change percent"].replace("%", ""),
    volume: parseInt(quote["06. volume"]),
    lastUpdated: quote["07. latest trading day"],
  };
}

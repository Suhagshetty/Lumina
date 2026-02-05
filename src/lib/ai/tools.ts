import { z } from "zod";

export const tools = {
  getWeather: {
    description: "Get the current weather for a specific location",
    parameters: z.object({
      location: z.string().describe("The city name"),
    }),
  },

  getF1Race: {
    description: "Get information about the next Formula 1 race",
    parameters: z.object({}),
  },

  getStockPrice: {
    description: "Get the current stock price for a company",
    parameters: z.object({
      symbol: z.string().describe("The stock ticker symbol"),
    }),
  },
};

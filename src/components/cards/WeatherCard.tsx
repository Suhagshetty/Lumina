import { Card } from "@/components/ui/card";

type WeatherData = {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
};

export function WeatherCard({ data }: { data: WeatherData }) {
  return (
    <Card className="p-4 space-y-2 max-w-sm">
      <h3 className="text-lg font-semibold">Weather in {data.location}</h3>
      <p>🌡 {data.temperature}°C</p>
      <p>☀️ {data.condition}</p>
      <p>💧 Humidity: {data.humidity}%</p>
      <p>🌬 Wind: {data.windSpeed} km/h</p>
    </Card>
  );
}

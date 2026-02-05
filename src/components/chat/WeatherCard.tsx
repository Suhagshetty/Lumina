import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, Droplets, Wind, Thermometer } from "lucide-react";

interface WeatherCardProps {
  data: {
    location: string;
    temperature: number;
    feelsLike: number;
    condition: string;
    description: string;
    humidity: number;
    windSpeed: number;
  };
}

export function WeatherCard({ data }: WeatherCardProps) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cloud className="h-5 w-5" />
          {data.location}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Thermometer className="h-8 w-8 text-orange-500" />
            <div>
              <p className="text-3xl font-bold">{data.temperature}°C</p>
              <p className="text-sm text-muted-foreground">
                Feels like {data.feelsLike}°C
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold">{data.condition}</p>
            <p className="text-sm text-muted-foreground">{data.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div className="flex items-center gap-2">
            <Droplets className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm text-muted-foreground">Humidity</p>
              <p className="font-semibold">{data.humidity}%</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Wind className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm text-muted-foreground">Wind Speed</p>
              <p className="font-semibold">{data.windSpeed} km/h</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

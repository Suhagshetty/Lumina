import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Cloud,
  CloudRain,
  Sun,
  Wind,
  Droplet,
  Calendar,
  MapPin,
  Trophy,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

interface WeatherCardProps {
  data: {
    location: string;
    temperature: number;
    condition: string;
    description: string;
    humidity: number;
    windSpeed: number;
    feelsLike: number;
  };
}

export function WeatherCard({ data }: WeatherCardProps) {
  const getWeatherIcon = () => {
    const condition = data.condition.toLowerCase();
    if (condition.includes("rain")) return <CloudRain className="h-12 w-12" />;
    if (condition.includes("cloud")) return <Cloud className="h-12 w-12" />;
    return <Sun className="h-12 w-12" />;
  };

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          {data.location}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {getWeatherIcon()}
            <div>
              <div className="text-4xl font-bold">{data.temperature}°C</div>
              <div className="text-sm text-muted-foreground">
                Feels like {data.feelsLike}°C
              </div>
            </div>
          </div>
        </div>

        <div className="text-lg font-medium">{data.condition}</div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div className="flex items-center gap-2">
            <Droplet className="h-4 w-4 text-blue-500" />
            <div>
              <div className="text-sm text-muted-foreground">Humidity</div>
              <div className="font-semibold">{data.humidity}%</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Wind className="h-4 w-4 text-blue-500" />
            <div>
              <div className="text-sm text-muted-foreground">Wind</div>
              <div className="font-semibold">{data.windSpeed} km/h</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface F1RaceCardProps {
  data: {
    raceName: string;
    circuit: string;
    location: string;
    date: string;
    time: string;
    round: number;
    country: string;
  };
}

export function F1RaceCard({ data }: F1RaceCardProps) {
  return (
    <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 border-red-200 dark:border-red-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5" />
          {data.raceName}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <MapPin className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold">{data.circuit}</div>
              <div className="text-sm text-muted-foreground">
                {data.location}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-red-500" />
            <div>
              <div className="font-semibold">{data.date}</div>
              <div className="text-sm text-muted-foreground">
                {data.time} UTC
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t">
          <div className="text-sm text-muted-foreground">Round</div>
          <div className="text-2xl font-bold">{data.round}</div>
        </div>
      </CardContent>
    </Card>
  );
}

interface StockCardProps {
  data: {
    symbol: string;
    price: number;
    change: number;
    changePercent: string;
    volume: number;
    lastUpdated: string;
  };
}

export function StockCard({ data }: StockCardProps) {
  const isPositive = data.change >= 0;

  return (
    <Card
      className={`bg-gradient-to-br ${
        isPositive
          ? "from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800"
          : "from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 border-red-200 dark:border-red-800"
      }`}
    >
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{data.symbol}</span>
          {isPositive ? (
            <TrendingUp className="h-5 w-5 text-green-600" />
          ) : (
            <TrendingDown className="h-5 w-5 text-red-600" />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="text-sm text-muted-foreground">Current Price</div>
          <div className="text-4xl font-bold">${data.price.toFixed(2)}</div>
        </div>

        <div
          className={`flex items-center gap-2 ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          <div className="text-2xl font-semibold">
            {isPositive ? "+" : ""}
            {data.change.toFixed(2)}
          </div>
          <div className="text-lg">({data.changePercent}%)</div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div>
            <div className="text-sm text-muted-foreground">Volume</div>
            <div className="font-semibold">{data.volume.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Last Updated</div>
            <div className="font-semibold text-sm">{data.lastUpdated}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

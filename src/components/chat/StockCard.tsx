import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Activity } from "lucide-react";

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
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-green-500" />
          {data.symbol}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-4xl font-bold">${data.price.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground mt-1">Current Price</p>
          </div>
          <div
            className={`flex items-center gap-1 ${isPositive ? "text-green-600" : "text-red-600"}`}
          >
            {isPositive ? (
              <TrendingUp className="h-5 w-5" />
            ) : (
              <TrendingDown className="h-5 w-5" />
            )}
            <div className="text-right">
              <p className="font-semibold">
                {isPositive ? "+" : ""}
                {data.change.toFixed(2)}
              </p>
              <p className="text-sm">
                ({isPositive ? "+" : ""}
                {data.changePercent}%)
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm text-muted-foreground">Volume</p>
              <p className="font-semibold">{data.volume.toLocaleString()}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Last Updated</p>
            <p className="font-semibold text-sm">{data.lastUpdated}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

import { Card } from "@/components/ui/card";

type StockData =
  | {
      symbol: string;
      price: number;
      change: number;
      changePercent: number;
      volume: number;
    }
  | {
      error: "NO_SYMBOL";
    };

export function StockCard({ data }: { data: StockData }) {
  if ("error" in data) {
    return (
      <Card className="p-4 max-w-sm text-destructive">
        Please provide a stock symbol (e.g. AAPL, TSLA)
      </Card>
    );
  }

  return (
    <Card className="p-4 space-y-2 max-w-sm">
      <h3 className="text-lg font-semibold">{data.symbol}</h3>
      <p>💲 Price: {data.price}</p>
      <p>
        📈 Change: {data.change} ({data.changePercent}%)
      </p>
      <p>📊 Volume: {data.volume.toLocaleString()}</p>
    </Card>
  );
}

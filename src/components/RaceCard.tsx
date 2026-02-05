import { Card } from "@/components/ui/card";

type RaceCardProps = {
  data: {
    raceName: string;
    circuit: string;
    date: string;
    time: string;
    round: number;
  };
};

export function RaceCard({ data }: RaceCardProps) {
  return (
    <Card className="p-4 space-y-2 max-w-sm">
      <h3 className="text-lg font-semibold">{data.raceName}</h3>
      <p>🏁 Circuit: {data.circuit}</p>
      <p>📅 Date: {data.date}</p>
      <p>⏰ Time: {data.time}</p>
      <p>🔢 Round: {data.round}</p>
    </Card>
  );
}

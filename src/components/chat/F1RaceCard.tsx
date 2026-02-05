import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flag, MapPin, Calendar, Clock } from "lucide-react";

interface F1RaceCardProps {
  data: {
    raceName: string;
    circuit: string;
    location: string;
    date: string;
    time: string;
    round: string | number;
    country?: string;
  };
}

export function F1RaceCard({ data }: F1RaceCardProps) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flag className="h-5 w-5 text-red-500" />
          {data.raceName}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-start gap-2">
          <MapPin className="h-5 w-5 text-blue-500 mt-0.5" />
          <div>
            <p className="font-semibold">{data.circuit}</p>
            <p className="text-sm text-muted-foreground">{data.location}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-3 border-t">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-green-500" />
            <div>
              <p className="text-sm text-muted-foreground">Date</p>
              <p className="font-semibold">
                {new Date(data.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-purple-500" />
            <div>
              <p className="text-sm text-muted-foreground">Time</p>
              <p className="font-semibold">{data.time}</p>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t">
          <p className="text-sm text-muted-foreground">
            Round {data.round} of the Season
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

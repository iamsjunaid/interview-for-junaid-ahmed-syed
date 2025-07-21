import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  name: string;
  date: string;
  onClick: () => void;
};

export function LaunchCard({ name, date, onClick }: Props) {
  return (
    <Card
      onClick={onClick}
      className="cursor-pointer hover:shadow-md transition-all"
    >
      <CardHeader>
        <CardTitle className="text-lg">{name}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        {new Date(date).toLocaleDateString()}
      </CardContent>
    </Card>
  );
}

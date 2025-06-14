
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

const Insights = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          <span>Insights</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Get insights based on your intake.</p>
      </CardContent>
    </Card>
  );
};

export default Insights;

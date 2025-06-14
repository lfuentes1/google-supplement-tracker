
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList } from "lucide-react";

const IntakeTracker = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ClipboardList className="h-5 w-5 text-primary" />
          <span>Intake Tracker</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Track your daily intake here.</p>
      </CardContent>
    </Card>
  );
};

export default IntakeTracker;

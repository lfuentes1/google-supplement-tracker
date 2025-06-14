
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pill } from "lucide-react";

const Supplements = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Pill className="h-5 w-5 text-primary" />
          <span>Supplements</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Manage your supplements here.</p>
      </CardContent>
    </Card>
  );
};

export default Supplements;

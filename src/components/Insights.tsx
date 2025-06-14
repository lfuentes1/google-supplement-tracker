
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

const Insights = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5" />
          <span>Insights</span>
        </CardTitle>
        <CardDescription>Get insights based on your intake.</CardDescription>
      </CardHeader>
      <CardContent>
        {/* The card content is empty for now, as per the screenshot. */}
      </CardContent>
    </Card>
  );
};

export default Insights;


import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Lightbulb, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const Insights = () => {
  const [promptsOpen, setPromptsOpen] = useState(true);
  const [noticesOpen, setNoticesOpen] = useState(true);

  const notices = [
    "Vitamin D is best absorbed when paired with Vitamin K.",
    "The X supplement had a recall. Click here to learn more.",
    "It looks like you forgot to take your supplements last night.",
  ];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5" />
          <span>Insights</span>
        </CardTitle>
        <CardDescription>Get insights and notices about your supplements.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Collapsible open={promptsOpen} onOpenChange={setPromptsOpen} className="border rounded-lg">
          <CollapsibleTrigger className="flex justify-between items-center w-full p-4 font-semibold text-lg hover:bg-gray-100 dark:hover:bg-gray-800 rounded-t-lg transition-colors">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span>IntelliPrompts</span>
            </div>
            {promptsOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 space-y-4 border-t">
            <Textarea placeholder="Questions or Commands" />
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="text-xs h-auto py-2 whitespace-normal">Are there any recalls for the supplements that I am taking?</Button>
              <Button variant="outline" className="text-xs h-auto py-2 whitespace-normal">Can you recommend supplements that have been evaluated by independent 3rd party companies?</Button>
              <Button variant="outline" className="text-xs h-auto py-2 whitespace-normal">Anytime my supplement intake changes, provide me with absorption tips.</Button>
              <Button variant="outline" className="text-xs h-auto py-2 whitespace-normal">Always use IntelliAdd when I add a new supplement.</Button>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible open={noticesOpen} onOpenChange={setNoticesOpen} className="border rounded-lg">
          <CollapsibleTrigger className="flex justify-between items-center w-full p-4 font-semibold text-lg hover:bg-gray-100 dark:hover:bg-gray-800 rounded-t-lg transition-colors">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-600" />
              <span>IntelliNotices</span>
            </div>
            {noticesOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 space-y-2 border-t text-sm">
            {notices.map((notice, index) => (
              <div key={index} className="border-b last:border-b-0 py-2 first:pt-0 last:pb-0">
                <p>{notice}</p>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default Insights;

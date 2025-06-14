
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const Insights = () => {
  const [promptsOpen, setPromptsOpen] = useState(true);
  const [noticesOpen, setNoticesOpen] = useState(true);

  const notices = [
    { date: "2025-06-15", text: "It looks like you forgot to take your supplements last night." },
    { date: "2025-06-14", text: "The X supplement had a recall. Click here to learn more." },
    { date: "2025-06-14", text: "Vitamin D is best absorbed when paired with Vitamin K." },
  ];

  return (
    <Card className="h-full">
      <CardContent className="p-6 space-y-4">
        <Collapsible open={promptsOpen} onOpenChange={setPromptsOpen} className="border rounded-lg">
          <CollapsibleTrigger className="flex justify-between items-center w-full p-4 font-semibold text-lg hover:bg-gray-100 rounded-t-lg transition-colors">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span>IntelliPrompts</span>
            </div>
            {promptsOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 space-y-4 border-t">
            <Textarea placeholder="Questions or Commands" />
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="text-xs h-auto py-2 whitespace-normal">Recalls for My Supplements?</Button>
              <Button variant="outline" className="text-xs h-auto py-2 whitespace-normal">Give me absorption tips.</Button>
              <Button variant="outline" className="text-xs h-auto py-2 whitespace-normal">Recommend Brands, please.</Button>
              <Button variant="outline" className="text-xs h-auto py-2 whitespace-normal">Always use IntelliAdd.</Button>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible open={noticesOpen} onOpenChange={setNoticesOpen} className="border rounded-lg">
          <CollapsibleTrigger className="flex justify-between items-center w-full p-4 font-semibold text-lg hover:bg-gray-100 rounded-t-lg transition-colors">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-600" />
              <span>IntelliNotices</span>
            </div>
            {noticesOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 space-y-2 border-t text-sm">
            {notices.map((notice, index) => (
              <div key={index} className="border-b last:border-b-0 py-2 first:pt-0 last:pb-0">
                <p><span className="font-semibold">{new Date(notice.date).toLocaleDateString('en-US')}:</span> {notice.text}</p>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default Insights;

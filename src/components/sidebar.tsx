"use client";

import { Settings, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useChatStore } from "@/store/chat-store";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const { selectedModel, setSelectedModel, temperature, setTemperature, maxTokens, setMaxTokens } = useChatStore();

  if (!isOpen) {
    return (
      <div className="w-12 border-r bg-card flex flex-col items-center py-4">
        <Button variant="ghost" size="icon" onClick={onToggle}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="w-80 border-r bg-card flex flex-col">
      <div className="p-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Settings
        </h2>
        <Button variant="ghost" size="icon" onClick={onToggle}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
      
      <Separator />
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="model">Model</Label>
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger id="model">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-4">GPT-4</SelectItem>
                <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                <SelectItem value="claude-3-opus">Claude 3 Opus</SelectItem>
                <SelectItem value="claude-3-sonnet">Claude 3 Sonnet</SelectItem>
                <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="temperature">Temperature</Label>
              <span className="text-sm text-muted-foreground">{temperature}</span>
            </div>
            <Slider
              id="temperature"
              min={0}
              max={2}
              step={0.1}
              value={[temperature]}
              onValueChange={([value]) => setTemperature(value)}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="max-tokens">Max Tokens</Label>
              <span className="text-sm text-muted-foreground">{maxTokens}</span>
            </div>
            <Slider
              id="max-tokens"
              min={100}
              max={4000}
              step={100}
              value={[maxTokens]}
              onValueChange={([value]) => setMaxTokens(value)}
            />
          </div>

          <Separator />

          <div className="space-y-2">
            <h3 className="text-sm font-medium flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Recent Chats
            </h3>
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start text-sm">
                New conversation
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm text-muted-foreground">
                Yesterday's chat
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm text-muted-foreground">
                API testing session
              </Button>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
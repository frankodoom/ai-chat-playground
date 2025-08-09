"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Loader2, Copy, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatStore } from "@/store/chat-store";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export function ChatInterface() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { messages, addMessage, clearMessages, selectedModel } = useChatStore();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    addMessage({ role: "user", content: userMessage });
    setIsLoading(true);

    try {
      // Simulate API call - replace with actual API integration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const assistantMessage = `This is a simulated response from ${selectedModel}. 
      
To integrate with real AI models:
1. Add your API keys to .env.local
2. Implement the API routes in /app/api/chat
3. Connect to OpenAI, Anthropic, or Google APIs

Here's a code example:
\`\`\`javascript
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    message: userMessage,
    model: selectedModel 
  })
});
\`\`\``;
      
      addMessage({ role: "assistant", content: assistantMessage });
    } catch (error) {
      console.error("Error:", error);
      addMessage({ 
        role: "assistant", 
        content: "Sorry, an error occurred. Please try again." 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex-1 flex flex-col">
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold mb-2">Welcome to AI Chat Playground</h2>
              <p className="text-muted-foreground">
                Start a conversation with {selectedModel}
              </p>
            </div>
          )}
          
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <ReactMarkdown
                    className="prose prose-sm dark:prose-invert max-w-none"
                    components={{
                      code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "");
                        return !inline && match ? (
                          <SyntaxHighlighter
                            style={vscDarkPlus}
                            language={match[1]}
                            PreTag="div"
                            {...props}
                          >
                            {String(children).replace(/\n$/, "")}
                          </SyntaxHighlighter>
                        ) : (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                  {message.role === "assistant" && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => copyToClipboard(message.content)}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-lg p-4">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="min-h-[60px] resize-none"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <div className="flex flex-col gap-2">
              <Button type="submit" disabled={isLoading || !input.trim()}>
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={clearMessages}
                disabled={messages.length === 0}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
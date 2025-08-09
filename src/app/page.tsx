"use client";

import { useState } from "react";
import { ChatInterface } from "@/components/chat-interface";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { useChatStore } from "@/store/chat-store";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex-1 flex flex-col">
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <ChatInterface />
      </div>
    </div>
  );
}
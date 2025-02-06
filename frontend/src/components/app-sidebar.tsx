"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Mail, Settings } from "lucide-react";
import Nango from "@nangohq/frontend";
import { useCallback } from "react";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2">
          <img src="/icon.png" alt="OMAC" className="h-6 w-6" />
          <h2 className="text-lg font-semibold">OMAC</h2>
        </div>
      </SidebarHeader>
      <SidebarContent></SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <div className="space-y-1 px-2">
            <a
              href="/settings"
              className="flex items-center gap-2 rounded p-2 hover:bg-accent"
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </a>
            <button className="flex w-full items-center gap-2 rounded p-2 hover:bg-accent">
              <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
              <Mail className="h-4 w-4" />
              <span>Connect Gmail</span>
            </button>
          </div>
          <div className="px-4 py-2 text-sm text-muted-foreground">
            Version 0.0.1
          </div>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}

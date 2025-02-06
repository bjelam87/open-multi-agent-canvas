import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Menu } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <main className="h-screen w-screen">
        <SidebarTrigger>
          <Menu className="h-6 w-6 m-4" />
        </SidebarTrigger>
        <div className="h-full">{children}</div>
      </main>
    </SidebarProvider>
  );
}

"use client";
import { usePathname } from "next/navigation";

import { AuthErrorHandler } from "@/components/auth/auth-error-handler";
import Header from "@/components/headers/header";
import { useSessionMonitor } from "@/hooks/use-session-monitor";
import { Agent } from "@/interfaces/agent.interface";
import { User } from "@/interfaces/user.interface";
import { useCustomRouter } from "@/lib/use-custom-router";
import { tabsAgentSelected, tabsConfigs } from "@/utils/constants.util";

import { AgentList, Tab } from "./layout.types";

interface LayoutProps {
  children: React.ReactNode;
  user: User;
  agents: Agent[];
}

export default function Layout({ children, user, agents }: LayoutProps) {
  const pathname = usePathname();
  const router = useCustomRouter();

  // Monitorar sessão para logout automático quando token expira
  useSessionMonitor();

  // extrai o ID do agentbot de /agents/:id/*
  const agentIdMatch = pathname.match(/^\/agents\/([^\/]+)(?:\/|$)/);
  const isAgent = agentIdMatch?.[1] != 'create' && !tabsConfigs.some(tab => pathname.endsWith(`/${tab.value}`));
  const selectedAgent = isAgent ? agentIdMatch?.[1] : null;

  // lista de agentbots para o dropdown
  const agentsList: AgentList[] =
    agents?.map((c) => ({ value: c.id, label: c.name, slug: c.slug, id: c.id })) || [];

  // handler ao trocar de agentbot
  const handleSelectAgent = (agentSlug: string | null) => {
    if (agentSlug) {
      router.push(`/agents/${agentSlug}/playground`);
    }
  };

  // monta as abas conforme rota
  let tabs: Tab[] = [];
  let activeTab: string | null = null;

  if (selectedAgent) {
    tabs = tabsAgentSelected;
    const sub = pathname.split("/")[3];
    activeTab = tabs.find((t) => t.value === sub)?.value || "playground";
  } else if ((pathname.startsWith("/agents") || pathname.startsWith("/adjustments")) && !pathname.includes("/create")) {
    tabs = tabsConfigs;
    activeTab =
      tabs.find((t) => pathname.includes(`/${t.value}`))?.value || "agents";
  }

  // handler ao trocar de aba
  const handleTabChange = (tab: string | null) => {
    if (!selectedAgent && (pathname.includes('/create') || pathname.includes('/edit'))) {
      if (pathname.includes('/edit')) {
        router.push(`/${tab}`);
      } else {
        router.push(`/agents/${tab}`);
      }
    } else if (!selectedAgent) {
      router.push(`/${tab}`);
    } else {
      router.push(`/agents/${selectedAgent}/${tab}`);
    }
  };

  return (
    <div className="flex h-screen">
      <AuthErrorHandler />
      <div className="flex flex-col flex-1">
        <Header
          user={user}
          agentsList={agentsList}
          selectedAgent={selectedAgent || ""}
          onSelectAgent={handleSelectAgent}
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
        {selectedAgent ?
          <main className="mx-auto w-full px-4 pb-4">
            {children}
          </main>
          :
          <main className="mx-auto w-full max-w-7xl px-4 pb-4">
            {children}
          </main>}

      </div>
    </div>
  );
}

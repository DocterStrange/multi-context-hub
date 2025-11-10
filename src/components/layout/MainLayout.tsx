import { ReactNode, useState } from "react";
import { Header } from "./Header";
import { Context } from "@/types/context";

interface MainLayoutProps {
  children: ReactNode;
}

// Mock data - in production this would come from your backend
const mockContexts: Context[] = [
  { id: '1', type: 'individual', name: 'Bob (Individual)', credits: 1500 },
  { id: '2', type: 'organization', name: 'Corp Inc.', credits: 5000, role: 'admin' },
  { id: '3', type: 'organization', name: 'Startup LLC', credits: 2000, role: 'member' },
  { id: '4', type: 'helper', name: 'Helper', credits: 800, helperFor: 'Alice' },
  { id: '5', type: 'helper', name: 'Helper', credits: 300, helperFor: 'Charlie' },
];

export function MainLayout({ children }: MainLayoutProps) {
  const [activeContext, setActiveContext] = useState<Context>(mockContexts[0]);

  const handleContextChange = (context: Context) => {
    setActiveContext(context);
    // In production, this would trigger a state update that affects all views
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        contexts={mockContexts}
        activeContext={activeContext}
        onContextChange={handleContextChange}
        userName="Bob Johnson"
      />
      <main className="container mx-auto py-6 px-6">
        {children}
      </main>
    </div>
  );
}

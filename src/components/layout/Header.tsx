import { useState } from "react";
import { ChevronDown, FileText, Settings, LogOut, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Context } from "@/types/context";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  contexts: Context[];
  activeContext: Context;
  onContextChange: (context: Context) => void;
  userName: string;
}

export function Header({ contexts, activeContext, onContextChange, userName }: HeaderProps) {
  const navigate = useNavigate();

  const getContextIcon = (type: string) => {
    switch (type) {
      case 'individual':
        return '👤';
      case 'organization':
        return '🏢';
      case 'helper':
        return '🤝';
      default:
        return '📁';
    }
  };

  const formatContextLabel = (context: Context) => {
    if (context.type === 'helper') {
      return `Helper for ${context.helperFor}`;
    }
    if (context.type === 'organization') {
      return `${context.name} (${context.role})`;
    }
    return context.name;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Logo and Main Nav */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 font-semibold text-lg">
            <FileText className="h-6 w-6 text-primary" />
            <span>DocProcess</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <Button
              variant="ghost"
              className="text-sm font-medium"
              onClick={() => navigate('/documents')}
            >
              Documents
            </Button>
          </nav>
        </div>

        {/* Context Switcher and Credits */}
        <div className="flex items-center gap-4">
          {/* Context Switcher - Most Critical Element */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="gap-2 bg-context-highlight border-primary/20 hover:bg-context-highlight hover:border-primary/40 transition-all"
              >
                <span className="text-lg">{getContextIcon(activeContext.type)}</span>
                <div className="flex flex-col items-start">
                  <span className="text-xs text-muted-foreground">Acting as:</span>
                  <span className="text-sm font-medium">{formatContextLabel(activeContext)}</span>
                </div>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[280px] bg-popover">
              <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                Switch Context
              </div>
              <DropdownMenuSeparator />
              {contexts.map((context) => (
                <DropdownMenuItem
                  key={context.id}
                  onClick={() => onContextChange(context)}
                  className={`cursor-pointer ${
                    context.id === activeContext.id ? 'bg-accent' : ''
                  }`}
                >
                  <span className="mr-2 text-lg">{getContextIcon(context.type)}</span>
                  <div className="flex flex-col flex-1">
                    <span className="text-sm font-medium">{formatContextLabel(context)}</span>
                    <span className="text-xs text-muted-foreground">
                      {context.credits.toLocaleString()} credits
                    </span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Credits Display */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-md bg-success/10 border border-success/20">
            <CreditCard className="h-4 w-4 text-success" />
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Credits</span>
              <span className="text-sm font-semibold text-success">
                {activeContext.credits.toLocaleString()}
              </span>
            </div>
          </div>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                  {userName.charAt(0).toUpperCase()}
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-popover">
              <div className="px-2 py-1.5 text-sm font-medium">{userName}</div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/login')} className="cursor-pointer text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

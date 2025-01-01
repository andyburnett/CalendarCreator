import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import App from './App';
import "./index.css";

// Define types for WordPress theme configuration
interface ThemeColors {
  primary: string;
  background: string;
  text: string;
  link: string;
  accent: string;
  [key: string]: string;
}

interface ThemeSettings {
  radius: string;
  variant: 'professional' | 'tint' | 'vibrant';
}

interface CalendarAppConfig {
  useThemeColors: boolean;
  themeColors: ThemeColors | null;
  themeSettings: ThemeSettings;
}

// Declare global WordPress configuration
declare global {
  interface Window {
    initializeCalendarApp: (containerId: string) => void;
    calendarAppConfig?: CalendarAppConfig;
  }
}

// Function to generate theme variables
const applyThemeColors = (colors: ThemeColors) => {
  const root = document.documentElement;

  // Set CSS variables for theme colors
  root.style.setProperty('--primary', colors.primary);
  root.style.setProperty('--background', colors.background);
  root.style.setProperty('--foreground', colors.text);
  root.style.setProperty('--muted', colors.accent);

  // Additional color transformations for shadcn UI
  root.style.setProperty('--card', colors.background);
  root.style.setProperty('--card-foreground', colors.text);
  root.style.setProperty('--popover', colors.background);
  root.style.setProperty('--popover-foreground', colors.text);
  root.style.setProperty('--primary-foreground', adjustColorBrightness(colors.primary, -40));
  root.style.setProperty('--secondary', adjustColorBrightness(colors.background, -5));
  root.style.setProperty('--secondary-foreground', colors.text);
  root.style.setProperty('--muted-foreground', adjustColorBrightness(colors.text, 20));
  root.style.setProperty('--accent', colors.accent);
  root.style.setProperty('--accent-foreground', adjustColorBrightness(colors.accent, -40));
  root.style.setProperty('--destructive', '#ff0000');
  root.style.setProperty('--destructive-foreground', '#ffffff');
  root.style.setProperty('--border', adjustColorBrightness(colors.text, 80));
  root.style.setProperty('--input', adjustColorBrightness(colors.text, 80));
  root.style.setProperty('--ring', colors.primary);
};

// Helper function to adjust color brightness
function adjustColorBrightness(color: string, percent: number): string {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;

  return '#' + (0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 1 ? 0 : B) : 255)
  ).toString(16).slice(1);
}

// Function to initialize the app
window.initializeCalendarApp = function(containerId: string) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with id "${containerId}" not found`);
    return;
  }

  // Apply WordPress theme colors if available and enabled
  if (window.calendarAppConfig?.useThemeColors && window.calendarAppConfig.themeColors) {
    applyThemeColors(window.calendarAppConfig.themeColors);
  }

  createRoot(container).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
        <Toaster />
      </QueryClientProvider>
    </StrictMode>
  );
};

// Auto-initialize if the default container exists
document.addEventListener('DOMContentLoaded', () => {
  const defaultContainer = document.getElementById('calendar-app-container');
  if (defaultContainer) {
    window.initializeCalendarApp('calendar-app-container');
  }
});
/**
 * Central icon registry. Content files reference icons by name (a string),
 * and UI components resolve them here. This keeps content data free of JSX
 * and makes swapping an icon a one-line change.
 */

import {
  Eye,
  Scale,
  Target,
  TrendingUp,
  Sparkles,
  BrainCircuit,
  Compass,
  BarChart3,
  Layers,
  Megaphone,
  MessagesSquare,
  Radio,
  ShieldAlert,
  PenTool,
  Building2,
  Database,
  Lightbulb,
  Rocket,
  type LucideIcon,
} from "lucide-react";

export const icons = {
  eye: Eye,
  scale: Scale,
  target: Target,
  trendingUp: TrendingUp,
  sparkles: Sparkles,
  brainCircuit: BrainCircuit,
  compass: Compass,
  barChart: BarChart3,
  layers: Layers,
  megaphone: Megaphone,
  messagesSquare: MessagesSquare,
  radio: Radio,
  shieldAlert: ShieldAlert,
  penTool: PenTool,
  building: Building2,
  database: Database,
  lightbulb: Lightbulb,
  rocket: Rocket,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;

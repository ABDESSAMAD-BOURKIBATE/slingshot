/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export interface Point {
  x: number;
  y: number;
}

export interface Vector {
  vx: number;
  vy: number;
}

export type BubbleColor = 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'orange';
export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface Bubble {
  id: string;
  row: number;
  col: number;
  x: number;
  y: number;
  color: BubbleColor;
  active: boolean; // if false, popped
  isFloating?: boolean; // For animation
}

export interface TargetCandidate {
  id: string;
  color: BubbleColor;
  size: number;
  row: number;
  col: number;
  pointsPerBubble: number;
  description: string;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

export interface StrategicHint {
  message: string;
  rationale?: string;
  targetRow?: number;
  targetCol?: number;
  recommendedColor?: BubbleColor;
}

export interface DebugInfo {
  latency: number;
  screenshotBase64?: string;
  promptContext: string;
  rawResponse: string;
  parsedResponse?: any;
  error?: string;
  timestamp: string;
}

export interface AiResponse {
  hint: StrategicHint;
  debug: DebugInfo;
}

export interface MetricPoint {
    timestamp: number;
    stress: number;
    focus: number;
    event?: 'score' | 'level_up' | 'danger' | null;
}

// MediaPipe Type Definitions (Augmenting window)
declare global {
  interface Window {
    Hands: any;
    Camera: any;
    drawConnectors: any;
    drawLandmarks: any;
    HAND_CONNECTIONS: any;
  }
}
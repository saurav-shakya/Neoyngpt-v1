export type ChartType = 'flowchart' | 'mindmap' | 'comparison' | 'concept';

export interface VisualResponse {
  nodes: Array<{
    id: string;
    label: string;
    type: string;
  }>;
  connections: Array<{
    from: string;
    to: string;
    label?: string;
  }>;
}
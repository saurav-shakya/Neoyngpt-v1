import { VisualResponse, ChartType } from './types';

export function generateVisualRepresentation(query: string): VisualResponse {
  const chartType = determineChartType(query);
  const concepts = extractConcepts(query);
  
  switch (chartType) {
    case 'flowchart':
      return generateFlowchart(concepts);
    case 'mindmap':
      return generateMindMap(concepts);
    case 'comparison':
      return generateComparisonChart(concepts);
    default:
      return generateConceptMap(concepts);
  }
}

function determineChartType(query: string): ChartType {
  const q = query.toLowerCase();
  
  // Process-based questions
  if (q.includes('how to') || q.includes('steps') || q.includes('process')) {
    return 'flowchart';
  }
  
  // Comparison questions
  if (q.includes('compare') || q.includes('difference') || q.includes('versus') || q.includes('vs')) {
    return 'comparison';
  }
  
  // Exploration questions
  if (q.includes('what are') || q.includes('explain') || q.includes('describe')) {
    return 'mindmap';
  }
  
  return 'concept';
}

function extractConcepts(query: string): string[] {
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(word => !isCommonWord(word))
    .slice(0, 5);
}

function generateFlowchart(concepts: string[]): VisualResponse {
  const nodes = concepts.map((concept, index) => ({
    id: `node-${index}`,
    label: concept,
    type: 'process'
  }));

  const connections = concepts.slice(0, -1).map((_, index) => ({
    from: `node-${index}`,
    to: `node-${index + 1}`,
    label: '→'
  }));

  return { nodes, connections };
}

function generateMindMap(concepts: string[]): VisualResponse {
  const nodes = [
    { id: 'center', label: concepts[0], type: 'main' },
    ...concepts.slice(1).map((concept, index) => ({
      id: `branch-${index}`,
      label: concept,
      type: 'branch'
    }))
  ];

  const connections = concepts.slice(1).map((_, index) => ({
    from: 'center',
    to: `branch-${index}`
  }));

  return { nodes, connections };
}

function generateComparisonChart(concepts: string[]): VisualResponse {
  const midPoint = Math.floor(concepts.length / 2);
  
  const nodes = [
    ...concepts.slice(0, midPoint).map((concept, index) => ({
      id: `left-${index}`,
      label: concept,
      type: 'left'
    })),
    ...concepts.slice(midPoint).map((concept, index) => ({
      id: `right-${index}`,
      label: concept,
      type: 'right'
    }))
  ];

  const connections = nodes.slice(midPoint).map((node, index) => ({
    from: `left-${index}`,
    to: node.id,
    label: 'vs'
  }));

  return { nodes, connections };
}

function generateConceptMap(concepts: string[]): VisualResponse {
  const nodes = concepts.map((concept, index) => ({
    id: `concept-${index}`,
    label: concept,
    type: 'concept'
  }));

  const connections = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      if (Math.random() > 0.5) {
        connections.push({
          from: nodes[i].id,
          to: nodes[j].id
        });
      }
    }
  }

  return { nodes, connections };
}

function isCommonWord(word: string): boolean {
  const commonWords = new Set([
    'a', 'an', 'the', 'in', 'on', 'at', 'to', 'for', 'of', 'with',
    'and', 'or', 'but', 'so', 'because', 'if', 'when', 'where', 'how',
    'what', 'which', 'who', 'whom', 'whose', 'why'
  ]);
  
  return commonWords.has(word);
}
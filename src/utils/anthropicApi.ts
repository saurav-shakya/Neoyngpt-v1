import Anthropic from '@anthropic-ai/sdk';

const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;
const anthropic = new Anthropic({
  apiKey: API_KEY,
});

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

export async function generateVisualRepresentation(query: string): Promise<VisualResponse> {
  if (!API_KEY) {
    throw new Error('Anthropic API key is not configured. Please check your environment variables.');
  }

  try {
    const message = await anthropic.messages.create({
      model: 'claude-3-opus-20240229',
      max_tokens: 1024,
      messages: [{
        role: 'user',
        content: `Analyze this query and create a visual representation schema. Return only a JSON object with 'nodes' and 'connections' arrays. Nodes should have 'id', 'label', and 'type'. Connections should have 'from', 'to', and optional 'label'. Query: "${query}"`
      }],
      response_format: { type: 'json_object' }
    });

    if (!message.content[0]?.text) {
      throw new Error('Invalid response format from Anthropic API');
    }

    const response = JSON.parse(message.content[0].text) as VisualResponse;
    
    // Validate response structure
    if (!response.nodes || !response.connections || !Array.isArray(response.nodes) || !Array.isArray(response.connections)) {
      throw new Error('Invalid response structure from Anthropic API');
    }

    return response;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error calling Anthropic API:', error.message);
      throw new Error(`Failed to generate visual representation: ${error.message}`);
    }
    throw new Error('An unexpected error occurred while calling Anthropic API');
  }
}
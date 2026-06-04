const BASE_URL = "http://localhost:8000";

export interface SearchResult {
  id: string;
  text: string;
  metadata: {
    category: string;
  };
  distance: number;
}

export interface SearchResponse {
  query: string;
  results: SearchResult[];
  cached?: boolean;
}

export interface StatusResponse {
  status: string;
  documents_indexed: number;
  model: string;
}

export async function performSearch(query: string, topK: number = 5): Promise<SearchResponse> {
  const response = await fetch(`${BASE_URL}/search?query=${encodeURIComponent(query)}&top_k=${topK}`);
  if (!response.ok) {
    throw new Error("Failed to fetch search results");
  }
  return response.json();
}

export async function getStatus(): Promise<StatusResponse> {
  const response = await fetch(`${BASE_URL}/status`);
  if (!response.ok) {
    throw new Error("Failed to fetch status");
  }
  return response.json();
}

import { ENV } from "./env";

export interface GraphQLResponse {
  status: number;
  headers: Headers;
  body: any;
}

export async function sendGraphQLRequest(
  query: string,
  variables: Record<string, any> = {},
  token: string = ENV.API_TOKEN,
  customHeaders: Record<string, string> = {}
): Promise<GraphQLResponse> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...customHeaders,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(ENV.API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
  });

  let body: any = {};
  try {
    body = await response.json();
  } catch {
    body = {};
  }

  return {
    status: response.status,
    headers: response.headers,
    body,
  };
}
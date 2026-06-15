export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5257";

export function apiUrl(path: string) {
  return `${API_BASE_URL}${path}`;
}

async function parseJsonResponse<T>(response: Response) {
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function apiGet<T>(path: string) {
  return parseJsonResponse<T>(await fetch(apiUrl(path)));
}

export async function apiPost<TResponse, TBody>(path: string, body: TBody) {
  return parseJsonResponse<TResponse>(
    await fetch(apiUrl(path), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
  );
}

export async function apiPut<TBody>(path: string, body: TBody) {
  const response = await fetch(apiUrl(path), {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
}

export async function apiDelete(path: string) {
  const response = await fetch(apiUrl(path), { method: "DELETE" });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
}

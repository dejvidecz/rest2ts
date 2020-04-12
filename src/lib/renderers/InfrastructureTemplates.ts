export const infrastructureTemplate = `export type FetchResponse<T> = {
  json: T;
  status: number;
};

export async function fetchJson<T>(...args: any): Promise<FetchResponse<T>> {
  const res: Response = await (fetch as any)(...args);
  const json = await res.json();

  return { json: json, status: res.status };
}

export function apiPost<TResponse, TRequest>(url: string, request: TRequest, headers: Headers) {
  var headers = new Headers();
  headers.append("Content-Type", "application/json");

  var raw = JSON.stringify(request);

  var requestOptions = {
    method: "POST",
    headers,
    body: raw,
    redirect: "follow"
  };

  return fetchJson<TResponse>(url, requestOptions as any);
}`;
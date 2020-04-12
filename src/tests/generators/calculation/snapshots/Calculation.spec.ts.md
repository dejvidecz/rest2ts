# Snapshot report for `src/tests/generators/calculation/Calculation.spec.ts`

The actual snapshot is saved in `Calculation.spec.ts.snap`.

Generated by [AVA](https://avajs.dev).

## parse calculation

> Snapshot 1

    `␊
    // ARCHITECTURE START␊
    type FetchResponse<T> = {␊
      json: T;␊
      status: number;␊
    };␊
    ␊
    async function fetchJson<T>(...args: any): Promise<FetchResponse<T>> {␊
      const res: Response = await (fetch as any)(...args);␊
      const json = await res.json();␊
    ␊
      return { json: json, status: res.status };␊
    }␊
    ␊
    function apiPost<TResponse, TRequest>(␊
      url: string,␊
      request: TRequest,␊
      headers: Headers␊
    ) {␊
      var headers = new Headers();␊
      headers.append("Content-Type", "application/json");␊
    ␊
      var raw = JSON.stringify(request);␊
    ␊
      var requestOptions = {␊
        method: "POST",␊
        headers,␊
        body: raw,␊
        redirect: "follow",␊
      };␊
    ␊
      return fetchJson<TResponse>(url, requestOptions as any);␊
    }␊
    ␊
    function apiGet<TResponse>(url: string, headers: Headers, ...params: string[]) {␊
      headers.append("Content-Type", "application/json");␊
      var queryString = Object.keys(params)␊
        .map((key) => {␊
          return (␊
            encodeURIComponent(key) + "=" + encodeURIComponent(params[key as any])␊
          );␊
        })␊
        .join("&");␊
      return fetchJson<TResponse>(url + queryString);␊
    }␊
    // ARCHITECTURE END␊
    ␊
    export const API = { ␊
    	Calculation_id_GET: "/api/Calculation"␊
    }␊
    ␊
    interface CalculationDto {␊
    	calculationID: number;␊
    	calculationTypeCode: string;␊
    	name: string;␊
    	description: string;␊
    	isActive: boolean;␊
    	dateCreated: string;␊
    	dateUpdated: string;␊
    	createdBy: number;␊
    	updatedBy: number;␊
    	enterpriseID: number;␊
    	calculationVersions: undefined[];␊
    }␊
    ␊
    interface CalculationVersionListItemDto {␊
    	calculationVersionID: number;␊
    	isDeleted: boolean;␊
    	calculationID: number;␊
    	calculationStatusCode: string;␊
    	revisionFrom: string;␊
    	revisionTo: string;␊
    }␊
    ␊
    interface EntityResult {␊
    	primaryID: number;␊
    	primaryCode: string;␊
    	isValid: boolean;␊
    }␊
    ␊
    interface ProblemDetails {␊
    	type: string;␊
    	title: string;␊
    	status: number;␊
    	detail: string;␊
    	instance: string;␊
    }␊
    ␊
    export const Calculation_id_GET = (headers = new Headers()): ␊
    	Promise<FetchResponse<CalculationDto>> => ␊
    	apiGet('/api/Calculation', headers);␊
    ␊
    `
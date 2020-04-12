# Snapshot report for `src/tests/generators/calculation-list/CalculationList.spec.ts`

The actual snapshot is saved in `CalculationList.spec.ts.snap`.

Generated by [AVA](https://avajs.dev).

## parse calculation list

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
    function apiPost<TResponse, TRequest>(url: string, request: TRequest, headers: Headers) {␊
      var headers = new Headers();␊
      headers.append("Content-Type", "application/json");␊
    ␊
      var raw = JSON.stringify(request);␊
    ␊
      var requestOptions = {␊
        method: "POST",␊
        headers,␊
        body: raw,␊
        redirect: "follow"␊
      };␊
    ␊
      return fetchJson<TResponse>(url, requestOptions as any);␊
    }␊
    // ARCHITECTURE END␊
    ␊
    ␊
    export const API = { ␊
    	Calculation_list_POST: "/api/Calculation/list"␊
    }␊
    ␊
    interface CalculationFilter {␊
    	top: number;␊
    	searchQuery: string;␊
    	calculationTypeCodes: string[];␊
    }␊
    ␊
    interface CalculationListItemDto {␊
    	calculationID: number;␊
    	calculationTypeCode: string;␊
    	name: string;␊
    	description: string;␊
    	isActive: boolean;␊
    	enterpriseID: number;␊
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
    interface ProblemDetails {␊
    	type: string;␊
    	title: string;␊
    	status: number;␊
    	detail: string;␊
    	instance: string;␊
    }␊
    ␊
    ␊
    export const Calculation_list_POST = (requestContract: CalculationFilter, headers = new Headers()): ␊
    	Promise<FetchResponse<CalculationListItemDto[]>> => ␊
    	apiPost('/api/Calculation/list', requestContract, headers);␊
    ␊
    `
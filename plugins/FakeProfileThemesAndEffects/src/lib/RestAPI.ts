import { findByProps } from "@vendetta/metro";

interface RestAPIRequestOptions {
    url: string;
    query?: Record<string, any> | undefined;
    body?: Record<string, any> | undefined;
    oldFormErrors?: boolean | undefined;
    retries?: number | undefined;
}

export default <Record<"get" | "post" | "put" | "patch" | "delete", (options: RestAPIRequestOptions) => Promise<any>> & {
    V6OrEarlierAPIError: Error;
    V8APIError: Error;
    getAPIBaseURL: (withVersion?: boolean | undefined) => string;
}>findByProps("getAPIBaseURL");

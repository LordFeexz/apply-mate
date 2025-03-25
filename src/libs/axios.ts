import "server-only";
import axios, {
  type AxiosRequestConfig,
  type AxiosInstance,
  type AxiosResponse,
} from "axios";

export interface Query {
  url: string;
  headers?: any;
  params?: any;
}

export interface Mutation {
  url: string;
  headers?: any;
  params?: any;
  method: "POST" | "PATCH" | "DELETE" | "PUT";
  data?: any;
}

export default abstract class BaseThirdPartyRequest {
  private readonly client: AxiosInstance;

  constructor(baseURL: string, opts?: AxiosRequestConfig) {
    this.client = axios.create({
      ...opts,
      baseURL,
      validateStatus: (s) => s >= 200,
    });
  }

  protected async Query<T = any>({
    url,
    headers,
    params,
  }: Query): Promise<AxiosResponse<T>> {
    const { signal } = new AbortController();
    return this.client({
      url,
      headers,
      method: "GET",
      params,
      signal,
    });
  }

  protected async Mutation<T = any>({
    url,
    headers,
    data,
    method,
    params,
    ...rest
  }: Mutation & Record<string, any>): Promise<AxiosResponse<T>> {
    const { signal } = new AbortController();
    return this.client({
      ...rest,
      url,
      headers,
      method,
      data,
      params,
      signal,
    });
  }
}

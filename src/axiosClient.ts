import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { Agent } from "http";

const daprHost = process.env.DAPR_HOST || "localhost";
const daprPort = process.env.DAPR_PORT || "3500";

const httpAgent = new Agent({
  maxSockets: 100,
  keepAlive: true,
});

const config: AxiosRequestConfig = {
  baseURL: `http://${daprHost}:${daprPort}/v1.0/publish`,
  httpAgent: httpAgent,
};

const instance = axios.create(config);

export function sendRequest(path: string, data: any) {
  return instance.post(path, data);
}

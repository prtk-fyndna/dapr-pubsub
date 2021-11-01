import { DaprClient } from "dapr-client";
import fastify, { RequestGenericInterface } from "fastify";
import * as axiosClient from "./axiosClient";

interface requestTemplate extends RequestGenericInterface {
  Body: {
    message: string;
  };
}

const serverHost = process.env.HOST || "0.0.0.0";
const serverPort = process.env.PORT || 1101;
const daprHost = process.env.DAPR_HOST || "localhost";
const daprPort = process.env.DAPR_PORT || "3500";
//booelan flag for using axios http library for publishing messages to dapr, instead of dapr-client.
let useAxios = false;
let server = fastify();
//dapr
const daprClient = new DaprClient(daprHost, daprPort);
async function publishMessageWithDapr(message: string) {
  await daprClient.pubsub.publish("kafka-pubsub", "test-topic", {
    message: message,
  });
}
//axios
async function publishMessageWithAxios(message: string) {
  await axiosClient.sendRequest("/kafka-pubsub/test-topic", message);
}

const publishMessage = useAxios
  ? publishMessageWithAxios
  : publishMessageWithDapr;

server.post<requestTemplate>("/target", async (req, res) => {
  const message = req.body.message;
  //asyncronous call
  publishMessage(message).catch((error) => {
    console.error("error publishing message", error);
  });
  res.send("OK");
});

server.listen(serverPort, serverHost, () => {
  console.log(`server running at http://${serverHost}:${serverPort}`);
});

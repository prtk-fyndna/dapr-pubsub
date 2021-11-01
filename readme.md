## Dapr Pubsub

Sample Project for publishing incoming messages on a server to Kafka, using Dapr's Node.js sdk. 

### Usage

1. Clone this repository
    ```bash
    git clone https://github.com/prtk-fyndna/dapr-pubsub.git
    ```

2. Install dependencies
    ```bash
    npm install
    ```
3. Build project

    ```bash
    npm run build
    ```

4. Start a Kafka broker on port `localhost:19092` (alternatively specify broker port in `dapr/components/pubsub.yaml` )


5. Run application with Dapr
    ```bash
    dapr run --app-id test-app --app-port 1101 --dapr-http-port 3500 --components-path ./dapr/components/ --config ./dapr/config/config.yaml  npm run start
    ```

**Sending Requests**

- To send a single request to server:

```bash
curl --location --request POST 'localhost:3500/v1.0/invoke/test-app/method/target' \
--header 'Content-Type: application/json' \
--data-raw '{
    "message": "Test Message"
}'
```


- For load testing:

1. Install [autocannon](https://github.com/mcollina/autocannon).
```bash
npm i autocannon -g
```

2. Create 500 connections for 10 seconds and send 1 request per connection. (See autocannon [docs](https://github.com/mcollina/autocannon#command-line) for details)
```bash
autocannon -c 500 -d 10 -r 1 -m POST  -H 'Content-Type: application/json' -b '{"message":"testMessage"}' localhost:3500/v1.0/invoke/test-app/method/target
```

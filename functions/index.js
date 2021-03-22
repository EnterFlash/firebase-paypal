const functions = require("firebase-functions");

const clientId = functions.config().paypal.client_id;
const secretKey = functions.config().paypal.secret_key;
const paypal = require("@paypal/checkout-server-sdk");
const env = new paypal.core.SandboxEnvironment(clientId, secretKey);
const client = new paypal.core.PayPalHttpClient(env);
let request = new paypal.orders.OrdersCreateRequest();

exports.paypalCreateOrder = functions.https.onCall(async (data, context) => {
  request.requestBody({
    "intent": "CAPTURE",
    "purchase_units": [
      {
        "amount": {
          "currency_code": "USD",
          "value": "100.00",
        },
      },
    ],
  });

  const response = await client.execute(request);

  return response.result;
});

exports.paypalHandleOrder = functions.https.onCall(async (data, context) => {
  const orderId = data.orderId;
  request = new paypal.orders.OrdersCaptureRequest(orderId);
  request.requestBody({});
  const response = await client.execute(request);

  return response.result;
});

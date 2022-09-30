# Getting Started with Nixtla!

[Nixtla](https://docs.nixtla.io/) is a Time Series Forecasting and Anomaly Detection For Developers.

We will use Nixtla to forecast and detect anomalies in our dataset.

## Integrating Nixtla with your application

### Nixtla Auth token

All nixtla requests need a bearer token which can be obtained [here](http://18.235.133.135:3000/login).

### Nixtla Forecasting and Anomaly Detection API functions

The code assumes that your data object contains `data.timestamp` and `data.value` as properties.
You will also need to adjust the following params: `fh, seasonality, model, cv, and level`. You can find the documentation for this params here:
[Forecast](https://docs.nixtla.io/reference/forecast_forecast_post)
[Anomaly Detection](https://docs.nixtla.io/reference/anomaly_detector_anomaly_detector_post)

```js
// nixtla.js

const nixtlaURL = 'http://app.nixtla.io';
const bearerToken = process.env.REACT_APP_NIXTLA_BEARER_TOKEN;
const headers = {
  'accept': 'application/json',
  'authorization': \`Bearer \${bearerToken}\`,
  'content-type': 'application/json',
};

async function forecast(data) {
  const body = {
    timestamp: data.timestamp,
    value: data.value,
    fh: 12,
    seasonality: 12,
    model: 'arima',
    cv: false,
  }

  const response = await fetch(\`\${nixtlaURL}/forecast\`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body),
  });

  const responseData = await response.json();

  return responseData;
}

async function anomalyDetection(data) {
  const body = {
    timestamp: data.timestamp,
    value: data.value,
    level: 90,
    seasonality: 1,
    fh: 12,
  }

  const response = await fetch(\`\${nixtlaURL}/anomaly_detector\`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body),
  })

  const responseData = await response.json();

  return responseData;
}

export {
  forecast, anomalyDetection
};
```

### Using Nixtla API functions

### Add Nixtla data to your chart

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
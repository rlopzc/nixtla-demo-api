# Getting Started with Nixtla!

[Nixtla](https://docs.nixtla.io/) is a Time Series Forecasting and Anomaly Detection For Developers.

We will use Nixtla to forecast and detect anomalies in our dataset.

We are going to use the following dataset:
[Peyton Manning wikipedia visits dataset](/manning.json).

This is the plotted data before using Nixtla.
![Peyton before](/peyton-before.png)

**And this is the updated chart with Forecasting (blue) and anomalies detected (yellow dots).**

![Peyton after](/peyton-after.png)

## Integrating Nixtla with your application

### Nixtla Auth token

All nixtla requests need a bearer token which can be obtained [here](http://18.235.133.135:3000/login).

### Nixtla Forecasting and Anomaly Detection API functions

The following code are the requests that we are going to use in our project.

This code assumes that your data object contains `data.timestamp` and `data.value` as properties.
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

Let's use the previously defined functions in our code.

We will create two functions that call Nixtla API.
We add the response values to our Chart and update it.

```js
const makeForecast = async (data, chartRef) => {
  const fcast = await forecast(data);
  const parsedData = parseNixtlaData(fcast);

  const chart = chartRef.current;
  chart.data.labels = [...data.timestamp, ...parsedData.timestamp]
  chart.data.datasets[0].data = [...chart.data.datasets[0].data, ...parsedData.value];

  chart.update();
};

const detectAnomalies = async (data, chartRef) => {
  const anomalies = await anomalyDetection(data);
  const parsedData = parseNixtlaData(anomalies);

  // Search data by value. update it's point radius
  const chart = chartRef.current;
  const dataset = chart.data.datasets[0];

  parsedData.value
    .map(value => dataset.data.indexOf(value))
    .forEach(idx => dataset.pointRadius[idx] = 5);

  chart.update();
}
```

Now we need to add the following events to some buttons.

```js
<Row>
  <Col md={6}>
    <Button className='w-100' onClick={() => makeForecast(Data.manningData, chartRef)}>Forecast Data</Button>
  </Col>
  <Col md={6}>
    <Button variant='warning' className='w-100' onClick={() => detectAnomalies(Data.manningData, chartRef)}>Detect Anomalies</Button>
  </Col>
</Row>
```

You can also see the code in `/src/App.js` and follow the tutorial.

Happy coding and open an issue if you have any question!

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
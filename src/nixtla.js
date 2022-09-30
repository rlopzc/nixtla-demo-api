const nixtlaURL = 'http://app.nixtla.io';


// Get token here: http://18.235.133.135:3000/login
// Add token in .env (copy .env.example)
const bearerToken = process.env.REACT_APP_NIXTLA_BEARER_TOKEN;
const headers = {
  'accept': 'application/json',
  'authorization': `Bearer ${bearerToken}`,
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

  const response = await fetch(`${nixtlaURL}/forecast`,
    {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
    }
  );

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

  const response = await fetch(`${nixtlaURL}/anomaly_detector`, {
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
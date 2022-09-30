const nixtlaURL = 'http://app.nixtla.io';


// Get token here: http://18.235.133.135:3000/login
// Add token in .env (copy .env.example)
const bearerToken = process.env.REACT_APP_NIXTLA_BEARER_TOKEN;

async function forecast(data) {
  const body = {
    fh: 12,
    timestamp: data.timestamp,
    value: data.value,
    seasonality: 12,
    model: 'arima',
    cv: false,
  }

  const response = await fetch(`${nixtlaURL}/forecast`,
    {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'authorization': `Bearer ${bearerToken}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(body),
      mode: 'cors',
    }
  );

  const responseData = await response.json();

  return responseData;
}

export {
  forecast
};
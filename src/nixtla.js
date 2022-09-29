const nixtlaURL = 'http://app.nixtla.io';


// Get token here: http://18.235.133.135:3000/login
// Add token in .env (copy .env.example)
const bearerToken = process.env.REACT_APP_NIXTLA_BEARER_TOKEN;

async function forecast(data) {
  const body = {
    fh: 7,
    timestamp: Object.keys(data),
    value: Object.values(data),
    seasonality: 1,
    cv: false,
  }

  const response = await fetch(`${nixtlaURL}/forecast`,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${bearerToken}`,
      },
      body: JSON.stringify(body),
      mode: 'no-cors',
    }
  );

  const responseData = await response.json();
  console.log(responseData)

  return responseData;
}

export {
  forecast
};
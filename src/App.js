import './App.css';
import { Navbar, Container, Row, Col, Button } from 'react-bootstrap';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { forecast, anomalyDetection } from './nixtla';
import * as Utils from './utils';
import * as Data from './data';
import { useRef } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Nav() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">
          Wikipedia Visits
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export const chartOpts = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};

const chartData = {
  labels: Data.manningData.timestamp,
  datasets: [
    {
      label: 'Manning',
      data: Data.manningData.value,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      pointRadius: [],
      pointBackgroundColor: 'yellow',
      elements: {
        point: {
          radius: 0
        }
      },
      segment: {
        borderColor: ctx => {
          const idx = ctx.p0DataIndex;
          if (idx >= Data.manningData.timestamp.length) {
            return 'blue';
          }
        },
        borderDash: ctx => {
          const idx = ctx.p0DataIndex;
          if (idx >= Data.manningData.timestamp.length) {
            return [6];
          }
        },
      },
    },
  ],
};

const parseNixtlaData = (nixtla) => {
  const timestamp = nixtla['timestamp'].map(x => x.split(' ')[0]);

  return {
    timestamp: timestamp,
    value: nixtla['value'],
  };
};

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

function App() {
  const chartRef = useRef();

  return (
    <div>
      <Nav></Nav>
      <Container>
        <h1 className='text-center'>Peyton Manning visits on Wikipedia</h1>

        <Row className='mt-1'>
          <Col md={12}>
            <h2 className='text-center'>Forecasting and Anomaly Detection</h2>
            <Line ref={chartRef} options={chartOpts} data={chartData} />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Button className='w-100' onClick={() => makeForecast(Data.manningData, chartRef)}>Forecast Data</Button>
          </Col>
          <Col md={6}>
            <Button variant='warning' className='w-100' onClick={() => detectAnomalies(Data.manningData, chartRef)}>Detect Anomalies</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
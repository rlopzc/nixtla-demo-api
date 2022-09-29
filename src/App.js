import './App.css';
import { Navbar, Container, Row, Col } from 'react-bootstrap';
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
import { forecast } from './nixtla';
import * as Utils from './utils';
import * as Data from './data';

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
          Hooky
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export const chartOpts = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Webhooks Forecast',
    },
  },
};

const dashLastLine = (ctx, size) => {
  if (ctx.p1DataIndex == size - 1) {
    return [6, 6];
  } else {
    return undefined;
  }
}

const chartLabels = Utils.months({ count: Object.keys(Data.stripeData).length });

const chartData = {
  labels: chartLabels,
  datasets: [
    {
      label: 'Stripe',
      data: Object.values(Data.stripeData),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      segment: {
        borderDash: ctx => dashLastLine(ctx, Object.keys(Data.stripeData).length),
      },
    },
    {
      label: 'Whatsapp',
      data: [250, 650, 420, 830],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      segment: {
        borderDash: ctx => dashLastLine(ctx, Object.keys(Data.stripeData).length),
      },
    },
  ],
};

forecast(Data.stripeData);


function App() {
  return (
    <div>
      <Nav></Nav>
      <Container>
        <Row>
          <Col md={12}>
            <Line options={chartOpts} data={chartData} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
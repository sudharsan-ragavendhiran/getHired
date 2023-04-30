import React from 'react';
import {
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale
} from 'chart.js';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
// ChartJS.register(CategoryScale, l);
Chart.register(RadialLinearScale, ArcElement, Tooltip, Legend, CategoryScale);

const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July'
];
export const data = {
  labels: labels,
  datasets: [{
    label: 'Jobs Posted',
    data: [65, 59, 80, 81, 56, 55, 40],
    fill: false,
    borderColor: 'rgb(54, 162, 235)',
    tension: 0.1
  },{
    label: 'Hired',
    data: [1, 2, 0, 5, 0, 1, 1],
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  },{
    label: 'Rejected',
    data: [20, 18, 8, 11, 22, 54, 14],
    fill: false,
    borderColor: 'rgb(255, 99, 132)',
    tension: 0.1
  }]
};

export default function Chart1() {
  return <div>
  <Line data={data} />
</div>;
}
import React, { useState, useEffect } from "react";
import axios from "axios";
// import { Bar } from "react-chartjs-2";
// import { Chart as ChartJS, registerables } from "chart.js";
// ChartJS.register(...registerables);

// //Component to display chart  graph in the student dashboard. Used chart.js
// export default function ApplicationStatusChart() {
//   const [application, setApplications] = useState([]);
//   let applied = [];
//   let accepted = [];
//   let interviewing = [];
//   let rejected = [];

// //   //fetching all applications and maintaining count of all application statuses to display in the chart
//   useEffect(() => {
//     const fetchData = async () => {
//       await axios
//         .get(`http://localhost:9000/applications`)
//         .then(async (res) => {
//           setApplications(res.data);
//           applied = res.data.filter((app) => app.status === "APPLIED");
//           accepted = res.data.filter((app) => app.status === "ACCEPTED");
//           interviewing = res.data.filter(
//             (app) => app.status === "INTERVIEWING"
//           );
//           rejected = res.data.filter((app) => app.status === "REJECTED");
//         });
//     };
//     fetchData();
//   }, []);

//   return (
//     <Bar
//       height={400}
//       width={600}
//       data={{
//         labels: ["APPLIED", "ACCEPTED", "INTERVIEWING", "REJECTED"],
//         datasets: [
//           {
//             label: "Number of applications per status",
//             data: [12, 9, 8, 4],
//             // data: [
//             //   applied.length,
//             //   accepted.length,
//             //   interviewing.length,
//             //   rejected.length,
//             // ],
//             backgroundColor: [
//               "rgba(255, 99, 132, 0.2)",
//               "rgba(54, 162, 235, 0.2)",
//               "rgba(255, 206, 86, 0.2)",
//               "rgba(75, 192, 192, 0.2)",
//             ],
//             borderColor: [
//               "rgba(255, 99, 132, 1)",
//               "rgba(54, 162, 235, 1)",
//               "rgba(255, 206, 86, 1)",
//               "rgba(75, 192, 192, 1)",
//             ],
//             borderWidth: 1,
//           },
//         ],
//       }}
//       options={{
//         maintainAspectRatio: false,
//       }}
//     />
//   );
// }




// import React from 'react';
// import {
//   Chart as ChartJS,
//   RadialLinearScale,
//   ArcElement,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { Doughnut } from 'react-chartjs-2';

// ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

// export const data = {
//   labels: ['Rejected', 'Applied', 'Selected'],
//   datasets: [
//     {
//       // label: '# of Votes',
//       data: [16, 19, 3],
//       backgroundColor: [
//         '#811331',
//         '#325B7C',
//         '#52BE80'
//       ],
//       borderWidth: 1,
//       Animation: true
//     },
//   ],
// };

// export default function ApplicationStatusChart() {
//   return <div>
//     <Doughnut data={data} />
//   </div>;
// }


// import React from 'react';
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

// const [application, setApplications] = useState([]);
const applied = [];
const accepted = [];
const interviewing = [];
const rejected = [];

//   //fetching all applications and maintaining count of all application statuses to display in the chart
const fetchData = async () => {
    await axios
      .get(`http://localhost:9000/applications`)
      .then(async (res) => {
        // setApplications(res.data);
        console.log("----from----chart--"+res.data);
        let a = res.data.filter((app) => app.status === "APPLIED");
        applied = Object.keys(a).length;
        console.log("abcds"+applied);
        let b = res.data.filter((app) => app.status === "ACCEPTED");
        accepted = b.reduce((a, obj) => a + Object.keys(obj).length, 0);
        console.log("abcdu"+accepted);
        let c = res.data.filter((app) => app.status === "REJECTED");
        rejected = c.reduce((a, obj) => a + Object.keys(obj).length, 0);
        console.log("abcdd"+rejected);
      });
  };
  fetchData();

const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July'
];
console.log("sud"+applied);
export const data = {
  labels: labels,
  datasets: [{
    label: 'Applied',
    data: [65, 59, 80, 81, 56, 55, 40],
    // data: applied,
    fill: false,
    borderColor: '#325B7C',
    tension: 0.1
  },{
    label: 'Job Offered',
    data: [1, 2, 0, 5, 0, 1, 1],
    // data: accepted,
    fill: false,
    borderColor: '#52BE80',
    tension: 0.1
  },{
    label: 'Rejected',
    data: [20, 18, 8, 11, 22, 54, 14],
    // data: rejected,
    fill: false,
    borderColor: '#811331',
    tension: 0.1
  }]
};

export default function ApplicationStatusChart() {
  return <div>
  <Line data={data} />
</div>;
}
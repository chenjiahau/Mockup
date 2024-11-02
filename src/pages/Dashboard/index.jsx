import "./module.css";

import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import Breadcrumbs from "@/components/Breadcrumbs";
import MainTitle from "@/components/MainTitle";
import Form from "@/components/Form";
import Spacer from "@/components/Spacer";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const pieOption = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: "right",
    },
  },
};

const barOption = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function (data) {
          return data.dataset.formattedValue[data.dataIndex];
        },
      },
    },
  },
  y: {
    ticks: {
      stepSize: 1,
      suggestedMin: "min-int-value",
      suggestedMax: "max-int-value",
    },
  },
};

const Dashboard = () => {
  const linkList = [{ to: "/", label: "Dashboard" }];

  const mostPublisherPieChart = {
    labels: ["Ivan", "James", "愛大", "France", "Sammy", "Nancy"],
    datasets: [
      {
        data: [5, 2, 1, 1, 1, 1],
        backgroundColor: [
          "#51b361",
          "#b9901b",
          "#fe0723",
          "#17bcb2",
          "#217225",
          "#fca5b0",
        ],
      },
    ],
  };
  const mostPublisherBarChart = {
    labels: ["Ivan", "James", "愛大", "France", "Sammy", "Nancy"],
    datasets: [
      {
        borderWidth: 1,
        data: [5, 2, 1, 1, 1, 1],
        formattedValue: [],
        backgroundColor: [
          "#676abf",
          "#b2ac80",
          "#d73215",
          "#e08120",
          "#b5f034",
          "#49b841",
        ],
      },
    ],
  };

  const mostCommentBarChart = {
    labels: [
      "D-Link",
      "D-Link",
      "D-Link",
      "D-Link",
      "D-Link",
      "D-Link",
      "D-Link",
      "D-Link",
      "D-Link",
      "D-Link",
    ],
    datasets: [
      {
        borderWidth: 1,
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        formattedValue: [
          "Nuclias mp password",
          "Jp Site device local Local credential is not random",
          "import檔案格式檢查",
          "DRFT_1.00_Copyright &Powered Information needs to be corrected. - Bug - DBG24090319",
          "[工作記錄]20240930-20241004",
          "[工作記錄]20241007-20241011",
          "[工作記錄]20241014-20241018",
          "FW: 請協助詢價六台Mabook Air 13吋M3",
          "RE: 【TEPCO  Project­】Server shut down at 10:00 (UTC+8) 2024/10/23 ",
          "[工作記錄]20241014-20241025",
        ],
        backgroundColor: [
          "#9f4cbe",
          "#559778",
          "#c72403",
          "#ee4cd2",
          "#674542",
          "#fde8a3",
          "#ac9807",
          "#b5e513",
          "#3f3dcc",
          "#aafd15",
        ],
      },
    ],
  };

  return (
    <>
      <Breadcrumbs linkList={linkList} />
      <div className='custom-container primary-bg'>
        <MainTitle>Top 10 Publishers</MainTitle>
        <Form>
          <div className='publisher-container'>
            <div className='chart'>
              <Pie data={mostPublisherPieChart} options={pieOption} />
            </div>
            <div className='chart'>
              <Bar data={mostPublisherBarChart} options={barOption} />
            </div>
          </div>
        </Form>
        <Spacer extraClasses={["mt-4"]} />
        <MainTitle>Top 10 Comments</MainTitle>
        <Form>
          <div className='chart'>
            <Bar data={mostCommentBarChart} options={barOption} />
          </div>
        </Form>
      </div>
    </>
  );
};

export default Dashboard;

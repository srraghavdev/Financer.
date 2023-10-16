import React from "react";
import "./styles.css";
import { Line } from "@ant-design/charts";
import { Pie } from "@ant-design/plots";
import { motion } from "framer-motion"
function Chartsincome({ sortedarray }) {
  let data = sortedarray.map((element) => {
    return { date: element.date, amount: element.amount };
  });
  const config = {
    data,
    width: "500",
    autoFit: true,
    xField: "date",
    yField: "amount",
    color: 'rgb(32, 217, 150)',
  };
  let incomeDataArray = [
    { tag: "salary", amount: 0 },
    { tag: "freelance", amount: 0 },
    { tag: "investment", amount: 0 },
  ];
  let temparr = [];
  sortedarray.forEach((element) => {
    if (element.tag == "salary") {
      incomeDataArray[0].amount += element.amount;
    } else if (element.tag == "freelance") {
      incomeDataArray[1].amount += element.amount;
    } else {
      incomeDataArray[2].amount += element.amount;
    }
    temparr.push(element);
  });

  let finalincomearray = incomeDataArray.filter(
    (element) => element.amount != 0
  );

  const spendingConfig = {
    data: finalincomearray,
    angleField: "amount",
    colorField: "tag",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };
  let chart;
  return (
    <motion.div className="chart-container" initial={{y:50,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.3}}>
      <div
        style={{
          boxShadow: "var(--shadow)",
          margin: "2rem",
          borderRadius: "0.5rem",
          minWidth: "400px",
          flex: 1,
          padding: "1rem 1.5rem",
          border: "1.5px solid var(--theme)",
        }}
        className="linechart"
      >
        <h2 style={{ paddingBottom: "2rem" }}>Your Income</h2>
        <Line
          {...config}
          onReady={(chartInstance) => (chart = chartInstance)}
        />
      </div>
      <div
        style={{
          boxShadow: "var(--shadow)",
          margin: "2rem",
          borderRadius: "0.5rem",
          minWidth: "400px",
          flex: 1,
          padding: "1rem 1.5rem",
          flex: "0.45",
          border: "1.5px solid var(--theme)",
          minHeight: '495px'
        }}
        className='piechart'
      >
        <h2 style={{ paddingBottom: "2rem" }}>Total Income</h2>
        {temparr.length == 0 ? (
          <p style={{color:'var(--black)'}}>Seems like you haven't spent anything till now...</p>
        ) : (
          <Pie {...{ ...spendingConfig, data: finalincomearray }} />
        )}
      </div>
    </motion.div>
  );
}

export default Chartsincome;

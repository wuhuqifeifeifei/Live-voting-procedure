import React, { Component } from "react";
import ReactEcharts from "echarts-for-react";
import { value } from "./requests/value";
import { name } from "./requests/name";

class VoteCount extends Component {
  state = {
    data: [],
    sort: true,
    timer: null,
  };

  generateInitialData = () => {
    const data = [];
    for (let i = 0; i < 20; i++) {
      data.push({
        name: `${i + 1}`,
        value: 0,
        color: "",
      });
    }
    return data;
  };

  generateData = () => {
    function rgb() {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      const colors = `rgba(${r},${g},${b},1)`;
      return colors;
    }
    const { data, sort } = this.state;
    const newData = [...data];
    newData.forEach((item) => {
      value().then((res) => {
        item.value += res.data.value;
        console.log(res.data.value);
      });
      name().then((res) => {
        console.log(res);
      });
      item.color = rgb();
    });
    newData.sort((a, b) => {
      if (sort) {
        return a.value - b.value;
      } else {
        return b.value - a.value;
      }
    });
    this.setState({ data: newData });
  };

  componentDidMount() {
    const data = this.generateInitialData();
    const timer = setInterval(() => {
      this.generateData();
    }, 500);
    this.setState({ data, timer });
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  render() {
    const { data } = this.state;
    const option = {
      title: {
        text: "票数统计",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        top: 50,
        bottom: 50,
      },
      xAxis: {
        type: "value",
        boundaryGap: [0, 0.01],
      },
      yAxis: [
        {
          axisLabel: {
            formatter: (value, index) => {
              // console.log("data.name=" + data[index].name);
              if (index > 16) {
                return `{idx1|${20 - index}} {title|${data[index].name}}`;
              } else {
                return `{idx0|${20 - index}} {title|${data[index].name}}`;
              }
            },
            rich: {
              idx0: {
                color: "rgba(100,200,0,1)",
                backgroundColor: "rgba(100,200,0,0.3)",
                borderRadius: 100,
                width: 24,
                height: 24,
                align: "center",
                lineHeight: 24,
              },
              idx1: {
                color: "rgba(200,100,0,1)",
                backgroundColor: "rgba(200,100,100,0.5)",
                borderRadius: 100,
                width: 24,
                height: 24,
                align: "center",
                lineHeight: 24,
              },
              title: {
                width: 20,
              },
            },
          },
          type: "category",
        },
      ],
      visualMap: {
        orient: "horizontal",
        left: "center",
        min: 100,
        max: 1000,
        // Map the score column to color
        dimension: 0,
        inRange: {
          color: ["#65B581", "#FFCE34", "#FD665F"],
        },
      },
      series: [
        {
          label: {
            show: true,
            position: "right",
            color: "#6495ed",
          },
          name: "票数",
          borderRadius: 30,
          type: "bar",
          height: 100,
          data: data.map((item) => item),
          animationDelay: (idx) => idx * 1,
          animationDuration: 1000,
        },
      ],
      animationEasing: "elasticOut",
      animationDelayUpdate: (idx) => idx * 1,
    };
    return <ReactEcharts option={option} style={{ height: 700 }} />;
  }
}

export default VoteCount;

import React, { Component } from "react";
import ReactEcharts from "echarts-for-react";
import { value } from "./requests/value";
import { name } from "./requests/name";
import * as echarts from "echarts";

class VoteCount extends Component {
  state = {
    data: [],
    sort: true,
    timer: null,
  };

  generateInitialData = () => {
    const data = [];
    for (let i = 0; i < 10; i++) {
      name().then((res) => {
        console.log(res.data.name);
        data.push({
          name: res.data.name,
          value: 0,
          color: "",
        });
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
            //data.name未完成（传值和应用）
            formatter: function (value, index) {
              console.log(data);
              console.log(value);
              if (index > 6) {
                return `{idx1|${10 - index}} {title|${data.name}`;
              } else {
                return `{idx0|${10 - index}} {title|${data.name}}`;
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

          color: new echarts.graphic.LinearGradient( //颜色不同未完成
            0,
            0,
            1,
            0,
            [
              {
                offset: 0,
                color: "#FFF",
              },
              {
                offset: 0.98,
                color: "#6495ed",
              },
            ],
            false
          ),
          data: data.map((item) => item.value),
          animationDelay: (idx) => idx * 50,
          animationDuration: 1500,
        },
      ],
      animationEasing: "elasticOut",
      animationDelayUpdate: (idx) => idx * 5,
    };
    return <ReactEcharts option={option} style={{ height: 400 }} />;
  }
}

export default VoteCount;

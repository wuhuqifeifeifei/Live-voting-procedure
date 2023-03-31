import React, { Component } from "react";
import ReactEcharts from "echarts-for-react";
import { value } from "./requests/value";
//import { trySSE } from "./try"; //---------------------------------------

class VoteCount extends Component {
  state = {
    data: [],
    sort: true,
    timer: null,
  };
  generateInitialData = () => {
    const data = [];
    //trySSE(); //-----------------------------------------------------------
    for (let i = 0; i < 14; i++) {
      data.push({
        name: `${i + 1}`,
        value: 0,
        color: "",
      });
    }
    return data;
  };

  generateData = () => {
    const { data, sort } = this.state;
    const newData = [...data];
    var dataName = [];
    var dataValue = [];
    value().then((res) => {
      dataName = Object.keys(res.data);
      dataValue = Object.values(res.data);
      console.log("res.data:");
      console.log(dataName);
      var index = 0;
      newData.forEach((item) => {
        console.log("index:");
        console.log(index);
        item.name = dataName[index];
        item.value = dataValue[index];
        console.log(item.name);
        index++;
      });
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
      title:{
        show:true,//false
        text:"     票数统计",//主标题文本
        textStyle:{
            
            fontStyle:'normal',
            fontWeight:'normal',
            fontFamily:'sans-serif',
            fontSize:20,
            lineHeight:10,
            
            },
        subtext:"输入姓名进行投票",
        subtextStyle:{
            
            fontStyle:'normal',
            fontWeight:'normal',
            fontFamily:'宋体',
            fontSize:18,
            lineHeight:18,
            align:'center',
            verticalAlign:'middle',
        },
        textAlign:'auto',
        textVerticalAlign:'auto',
        padding:0,
        left:'35%',
        right:'auto',
        top:'5%',
        bottom:'auto',
    },


      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        top: 100,
        bottom: 0,
        left:50,
        right: "5%",
      },
      xAxis: {
        left : 200,
        type: "value",
      },
      yAxis: [
        {

          axisLabel: {
            formatter: (value, index) => {
              // console.log("data.name=" + data[index].name);

                return data[index].name;

            },
            margin:2,
            fontSize: 16
          },
          type: "category",
        },
      ],
      visualMap: {
        show:false,
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

          type: "bar",
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

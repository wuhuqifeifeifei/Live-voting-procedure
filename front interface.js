import React, { useState, useEffect } from "react";
import axios from "axios";

function Dictionary() {//Dictionary组件，它有两个状态变量：staticDict和liveDict
  const [staticDict, setStaticDict] = useState({});
  const [liveDict, setLiveDict] = useState({});

  // Load static dictionary on component mount
  useEffect(() => {//每挂载就调用一次，用于从后台获取选手的名字及序号
    axios.get("/api/static_dict").then((response) => {//对应 后台 接口
      setStaticDict(response.data);
    });
  }, []);//将获取的数据存到StaticDict里面

  // Connect to live dictionary update stream on component mount
  useEffect(() => {//也是每挂载一次就调用一次，用于接收爬虫给的票数和对应序号
    const eventSource = new EventSource("/api/live_dict");//对应 后端 接口
    eventSource.onmessage = (event) => {
      setLiveDict(JSON.parse(event.data));
    };//每收到更新时就将更新值存到liveDict
    return () => eventSource.close();
  }, []);

  return (//这边显示的是一个无序列表，以key-value输出字典
    <div>
      <h1>Static Dictionary</h1>
      <ul>
        {Object.entries(staticDict).map(([key, value]) => (
          <li key={key}>
            {key}: {value}
          </li>
        ))}
      </ul>
      <h1>Live Dictionary</h1>
      <ul>
        {Object.entries(liveDict).map(([key, value]) => (
          <li key={key}>
            {key}: {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dictionary;

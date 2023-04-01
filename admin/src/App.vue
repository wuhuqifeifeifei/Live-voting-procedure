<template>
  <div>
    <el-container>
      <el-header>十佳歌手投票后台</el-header>
      <el-container>
        <el-aside width="200px">
          <div class="button"><el-button type="primary" @click="start">开始投票</el-button></div>
          <div class="button"><el-button type="primary" @click="stop">暂停投票</el-button></div>
          <div class="button"><el-button type="primary" @click="resume">继续投票</el-button></div>
          <div class="button"><el-button type="primary" @click="reset">重置投票</el-button></div>
          <div class="button"><el-link href="../../voting system/vote-count/build/index.html"><el-button type="primary"
                @click="display">打开图表</el-button></el-link></div>
        </el-aside>
        <el-main>
          <TableData></TableData>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import TableData from './components/TableData.vue'
import { Start, Stop, Resume, Reset } from './utils/api'
export default {
  name: 'App',
  components: {
    TableData
  },
  methods: {
    //开启爬虫
    start() {
      Start().then(() => {
        console.log("Succeed to start!")
      })
    },
    //暂停爬虫
    stop() {
      Stop().then(() => {
        console.log("Succeed to stop!")
      })
    },
    //继续投票
    resume() {
      Resume().then(() => {
        console.log("Succeed to resume!")
      })
    },
    //重置投票
    reset() {
      Reset().then(() => {
        console.log("Succeed to reset!")
      })
    },
    //打开图表（待定）
    display() {
    }
  }
}
</script>

<style>
.button {
  height: 100px
}

.el-header {
  background-color: #052956;
  color: transparent;
  -webkit-text-stroke: 0.01px white;
  text-align: center;
  font-size: 40px;
  font-family: KaiTi;
  line-height: 60px;
  letter-spacing: 0.04em;
  font-weight: bold;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
</style>

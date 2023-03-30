<template>
  <div>
    <el-container>
      <el-header>十佳歌手投票后台</el-header>
      <el-container>
        <el-aside width="200px">
          <div class="button"><el-button type="primary" @click="start">开始投票</el-button></div>
          <div class="button"><el-button type="primary" @click="stop">结束投票</el-button></div>
          <div class="button"><el-button type="primary" @click="dispaly">打开图表</el-button></div>
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
import { Start, Stop } from './utils/api'
export default {
  name: 'App',
  components: {
    TableData
  },
  methods: {
    start() {
      Start().then(() => {
        console.log("Succeed to start!")
      })
    },
    stop() {
      Stop().then(() => {
        console.log("Succeed to stop!")
      })
    },
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

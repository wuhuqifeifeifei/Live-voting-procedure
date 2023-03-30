<template>
  <e-row :gutter="20" style="height: 80px;">
    <e-col :span="6"> <el-input style="width: 35%" v-model="newItem.name" placeholder="请输入新增选手姓名" /></e-col>
    <e-col :span="6"><el-button type="primary" plain @click="addItem">新增</el-button></e-col>
    <e-col :span=6><el-button type="primary" plain @click="update">更新票数</el-button></e-col>
  </e-row>
  <el-table :data="info" style="width: 100%">
    <el-table-column label="序号" style="width:20%">
      <template #default="scope">{{ scope.$index + 1 }} </template>
    </el-table-column>
    <el-table-column prop="name" label="姓名" style="width:20%" />
    <el-table-column prop="votes" label="票数" style="width:20%" />
    <el-table-column fixed="right" label="操作" style="width:20%">
      <template #default="scope">
        <el-button type="primary" @click="editItem(scope.$index)" plain>编辑</el-button>
        <el-button type="danger" @click="deleteItem(scope.$index)" plain>删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="dialogVisible">
    <div>
      <el-input v-model="newName" placeholder="请输入修改后的姓名" />
      <el-button type="primary" @click="sumbitAddRow()">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getData } from '@/utils/api';
var _index;
export default {
  name: 'TableData',
  data() {
    return {
      info: [{
        name: '曾健一',
        votes: 0
      }, {
        name: '赵华',
        votes: 0
      }, {
        name: '赖可颖',
        votes: 0
      }, {
        name: '朱寳麗',
        votes: 0
      }, {
        name: '马胜楠',
        votes: 0
      }, {
        name: '万大千',
        votes: 0
      }, {
        name: '王彦澄',
        votes: 0
      }, {
        name: '段欢宸',
        votes: 0
      }, {
        name: '雷昌昊',
        votes: 0
      }, {
        name: '玛迪娜叶尔卡提',
        votes: 0
      }, {
        name: '张馨鑫',
        votes: 0
      }, {
        name: '王梓源',
        votes: 0
      }, {
        name: '杨方杰',
        votes: 0
      }, {
        name: '何佩恩',
        votes: 0
      }, {
        name: '章湘粤',
        votes: 0
      }],
      newItem: {
        name: '',
        votes: 0
      },
      newName: '',
      dialogVisible: false
    }
  },
  methods: {
    //更新数据
    update() {
      getData().then(res => {
        console.log(res.data);
        for (let key in res.data) {
          for (let item of this.info) {
            if (item.name === key) {
              item.votes = res.data[key];
              break
            }
          }
        }
      })
    },
    //新增数据
    addItem() {
      this.info.push({
        name: this.newItem.name,
        votes: this.newItem.votes
      })
    },
    //打开编辑对话框
    editItem(index) {
      this.dialogVisible = true,
        _index = index
    },
    //关掉编辑对话框
    sumbitAddRow() {
      var editData = _index;
      this.info[editData].name = this.newName;
      this.dialogVisible = false
    },
    //删除数据
    deleteItem(index) {
      this.info.splice(index, 1)
    }
  },
  props: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

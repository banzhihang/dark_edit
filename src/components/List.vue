<template>
  <div class="list">
    <div class="head">
      <span>文章列表</span>
      <el-button type="primary" @click="jumpEdit">发布文章</el-button>
    </div>
    <el-card>
      <el-table :data="tableData" stripe>

        <el-table-column prop="title" label="标题"></el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
                size="mini"
                @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
                size="mini"
                type="danger"
                :loading="isDelete"
                @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "List",
  data() {
    return {
      isDelete:false,
      tableData:[]
    }
  },
  created() {
    this.getArticleList()
  },
  methods:{
    // 获取文章列表
    async getArticleList() {
      const {data:res} = await this.$http.get('/article_list')
      this.tableData = res.data
    },
    // 点击编辑就跳转
    handleEdit(data){
      this.$router.push(
          {
            path:`/update/${data.id}`
          }
      )
    },
    // 删除文章
    async handleDelete(data){
      this.isDelete = true
      const {data:res} = await this.$http.delete('/article',{data:{
        'id':data.id
        }})
      this.isDelete = false
      if (res.code === 0){
        this.$message.success('删除成功')
        await this.getArticleList()
      }else{
        return this.$message.error(res.msg)
      }
    },
    jumpEdit() {
      this.$router.push(
          {
            path:'/edit'
          }
      )
    }
  }
}
</script>

<style scoped lang="less">
.list {
  width: 70%;
  margin-left: 50%;
  transform: translateX(-50%);
}
.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0 10px 0;
  padding-left: 10px;
  padding-right: 10px;
}
</style>
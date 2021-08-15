<template>
  <div>
      <el-form :inline="true" :model="form"  class="head">
        <div>
          <el-form-item label=" 文章标题">
            <el-input
                placeholder="请输入文章标题" v-model="form.title" clearable style="width: 500px">
            </el-input>
          </el-form-item>
          <el-form-item label="文章类型">
            <el-select v-model="form.kind" placeholder="请选择">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-button type="primary" @click="submit" size="medium" :loading="isLoading">发布文章</el-button>
      </el-form>
      <div class="edit">
        <mavon-editor
            v-model="content"
            ref="md"
            style="min-height: 600px"
            @imgAdd="imgAdd"
        />
      </div>

  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
  name: "Edit",
  components: {
    mavonEditor,
  },
  data() {
    return {
      isLoading:false,
      content:'', // 输入的markdown
      options:[
        {
          value:'疑问',
          label:'疑问'
        },
        {
          value:'通知',
          label:'通知'
        }
      ],
      form: {
        title:'',
        kind:''
      }
    }
  },
  methods: {

    // 上传照片
    async imgAdd(pos, $file) {
      const formData = new FormData();
      formData.append('image', $file);
      const {data:res} = await this.$http.post('/upload_picture',formData,{headers:{
        "content-type":"multipart/form-data"
      }})
      this.$refs.md.$img2Url(pos, res.data.url);

    },
    // 提交
    async submit(){
      const d = {
        "title":this.form.title,
        "kind":this.form.kind,
        "content":this.content
      }
      this.isLoading = true
      const {data:res} = await this.$http.post('/article',d)
      this.isLoading = false
      if (res.code === 0) {
        return this.$message.success('发布成功')
      } else {
        return this.$message.error(res.msg)
      }
    },
  },
}
</script>

<style scoped lang="less">
.head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: -15px;
}

</style>
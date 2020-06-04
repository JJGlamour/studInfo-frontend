<template>
  <div>
      <strong>json文档说明：</strong>
      <el-divider></el-divider>
      1. json文件按年份区分，2019文件命名示例：20191100.json、2019provinces.json、2019template.json（除了template和provinces文件，其他文件名均与数据库名保持一致）
      <el-divider></el-divider>
      2. 每个年份文件夹下面provinces.json和template.json两个文件为整个年份总控文件，包含该年份各个省份所属的模板以及模板文件信息
      <el-divider></el-divider>

      <jsonyear></jsonyear>

      <strong>新增json文件：</strong>
      <el-divider></el-divider>
      <el-upload
        class="upload-demo"
        ref="upload"
        multiple
        :action="posturl"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-error="handleError"
        :on-success="handleSuccess"
        :file-list="fileList"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">注意json文件命名规则，建议先下载往年json然后重新命名上传，文件使用<span style="color:red;">UTF-8或UTF-8-BOM</span>编码</div>
      </el-upload>
  </div>
</template>

<script>
import jsonyear from './jsonyear'
export default {
  data() {
    return {
      year: '',
      fileList: [],
      posturl: `${this.$baseURL}/jsondata`,
    }
  },
  components: {
    jsonyear
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleError() {
      this.$message.error("上传失败，请重试");
    },
    async handleSuccess(file) {
      let filename = file.filename;
      if (filename.includes('province') || filename.includes('template')) return;
      try{
        let jsonfile = filename.split('.')[0];
        const res = await fetch(`${this.$baseURL}/jsondata?jsonfile=${jsonfile}`);
        const res1 = await res.json();
        console.log(res1);
      }catch{
        this.$message.error('json成绩信息完善错误');
      }
      // json上传成功后完善触发完善成绩信息
    }
  }
}
</script>

<style>

</style>
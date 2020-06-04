<template>
<div>
    <strong>下载json文件：</strong>
    <el-divider></el-divider>
    <div>
    <el-input placeholder="输入年份" clearable show-word-limit style="width:200px" maxlength="4" v-model="jsonyear"></el-input>
    &nbsp;&nbsp;<el-button @click="queryJson" v-loading="loading" icon="el-icon-search" type="primary">查询</el-button>
    </div>
    <div v-for="(item,index) in jsonurls" :key="index">
        <el-button type="text" @click="open(item)">{{item}}</el-button>
    </div>
    <el-divider></el-divider>
</div>
</template>

<script>
export default {
    data() {
        return {
            jsonyear: '',
            loading: false,
            jsonurls: []
        }
    },
    methods: {
        async queryJson() {
            if(this.jsonyear) {
                this.loading = true;
                try{
                    const res = await fetch(`${this.$baseURL}/jsondata?jsonyear=${this.jsonyear}`);  
                    const result = await res.json();
                    this.jsonurls = result['jsonurls'];
                    this.loading = false;
                    // console.log(result);
                    if(res.status == '404'){
                        this.$message.error(result['error']);
                    }
                } catch {
                    this.loading = false;
                    this.$message.error("操作失败!");
                }
            }
        },
        open(item) {
            window.open(item);
        }
    }
}
</script>

<style>

</style>
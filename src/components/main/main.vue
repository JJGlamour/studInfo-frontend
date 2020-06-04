<template>
<div>
    考生号：<el-input placeholder="请输入考生号" v-model="ksh" clearable style="width:250px;"></el-input>
    &nbsp;&nbsp;<el-button @click="query" v-loading="loading" icon="el-icon-search" type="primary">查询</el-button>
    <el-button icon="el-icon-download" v-loading="daochu" type="primary" @click="download">导出</el-button>
    <el-tabs>
        <el-tab-pane label="报名信息">
            <v-bmxx :bmxx="bmxx"></v-bmxx>
        </el-tab-pane>
        <el-tab-pane label="成绩与志愿">
            <v-cjyzy :cjyzy="cjyzy"></v-cjyzy>
        </el-tab-pane>
        <el-tab-pane label="体检信息">
            <v-tjxx :tjxx="tjxx"></v-tjxx>
        </el-tab-pane>
        <el-tab-pane label="静态文件">
            <small>点击<strong>导出</strong>方可看到后端静态文件的位置</small>
            <div v-for="(item,index) in staticfiles" :key="index">
                <el-divider></el-divider>
                {{ item }}
            </div>
            <el-divider>
            </el-divider>
            PDF文件链接：<el-button type="text" @click="open">{{pdfurl}}</el-button>
        </el-tab-pane>
    </el-tabs>
</div>
</template>

<script>
import vBmxx from './bmxx'
import vCjyzy from './cjyzy'
import vTjxx from './tjxx'
export default {
    data(){
        return{
            ksh: '',
            bmxx: [],
            cjyzy: [],
            tjxx: [],
            loading: false,
            daochu: false,
            staticfiles: [],
            pdfurl: ''
        }
    },
    components: {
        vBmxx,
        vCjyzy,
        vTjxx
    },
    methods: {
        query: async function(){
            let ksh = this.ksh;
            if(!ksh){
                this.$message.error("考生号不能为空!");
                return;
            }
            try{
                this.bmxx = [];
                this.cjyzy = [];
                this.tjxx = [];
                this.staticfiles = {};
                this.pdfurl = ''; 
                this.loading = true;
                const res1 = await fetch(`${this.$baseURL}/bmxx?ksh=${this.ksh}`);
                const bmxx = await res1.json();
                // 为考生号和json文件报错
                if(res1.status == 404) {
                    // this.$message.error(bmxx['error']);
                    console.log(bmxx['error']);
                }

                Object.keys(bmxx['bmxx']).forEach(key => {
                    this.bmxx.push(bmxx['bmxx'][key]);
                })

                const res2 = await fetch(`${this.$baseURL}/cjyzy?ksh=${this.ksh}`);
                const cjyzy = await res2.json();
                Object.keys(cjyzy).forEach(key => {
                    this.cjyzy.push(cjyzy[key]);
                })
                const res3 = await fetch(`${this.$baseURL}/tjxx?ksh=${this.ksh}`);
                const tjxx = await res3.json();
                Object.keys(tjxx).forEach(key => {
                    this.tjxx.push(tjxx[key]);
                })
            }catch{
                this.loading = false;
                this.$message.error('查询失败');
            }finally{
                this.loading = false;
            }
        },
        download: async function(){
            this.daochu = true;
            let ksh = this.ksh;
            if(!ksh){
                this.$message.error("考生号不能为空!");
                this.daochu = false;
                return;
            }
            try{
                const res = await fetch(`${this.$baseURL}/pdf?ksh=${this.ksh}`);
                let  result = await res.json();
                this.daochu = false;
                this.staticfiles = result['staticfiles'];
                this.pdfurl = result['pdfurl'];
                if(res.status != 200) {
                    this.$message.error(result['error']);
                    return;
                }
                window.open(result['pdfurl']);
            }catch{
                this.$message.error("导出失败!");
            }finally{
                this.daochu = false;
            }
        },
        open: function() {
            if(this.pdfurl) {
                window.open(this.pdfurl);
            }
        }
    }
}
</script>

<style>

</style>
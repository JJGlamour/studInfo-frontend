<template>
  <el-container>
    <el-aside style="height:100vh">
      <el-menu text-color="#fff" background-color="#545c64" :default-openeds="['1']" :router="true" style="height:100%">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span><strong>档案电子化管理系统</strong></span>
          </template>
          <el-menu-item index="/home/main">查询首页</el-menu-item>
          <el-menu-item index="/home/json">json管理</el-menu-item>
          <el-menu-item index="/home/group">批量导出</el-menu-item>
          <el-menu-item index="/home/more">更多功能</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
    <el-main>
       <router-view></router-view>
    </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {

}
</script>

<style>
</style>
<template>
  <el-container style="height: 900px; border: 1px solid #eee">
    <el-aside width="180px" style="background-color: rgb(238, 241, 246)">
      <el-menu default-active="1-1"  class="el-menu-vertical-demo" :default-openeds="['1']">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-menu"></i>数据配置</template>

          <el-menu-item-group>
            <template slot="title">分组信息</template>
            <el-menu-item index="1-1" @click="controlJump('groups-list')">分组列表</el-menu-item>
            <el-menu-item index="1-2" @click="controlJump('groups-form')">添加分组</el-menu-item>
          </el-menu-item-group>

          <el-menu-item-group title="用户信息">
            <el-menu-item index="1-3" @click="controlJump('users-list')">用户列表</el-menu-item>
            <el-menu-item index="1-4" @click="controlJump('users-form')">添加用户</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="2">
          <template slot="title"><i class="el-icon-setting"></i>系统设置</template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="2-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <router-view></router-view>
    </el-container>

  </el-container>
</template>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>

<script>
export default {
  name: 'App',

  data () {
    return {
      // tableData: Array(20).fill(item)
      tableData: []
    }
  },

  methods: {
    controlJump (target) {
      this.$router.push(target)
    }
  }
}

</script>

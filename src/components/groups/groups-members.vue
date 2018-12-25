<template>
  <el-container style="height: 900px; border: 1px solid #eee">
    <el-container>
      <el-header style="text-align: left; font-size: 14px">
        <el-button size="small" type="primary" icon="el-icon-back" @click="handleCancel">返回</el-button>
        <el-button size="small" type="primary" icon="el-icon-upload" @click="add()">新增</el-button>
        <el-button size="small" type="primary" icon="el-icon-search" >搜索</el-button>
        <el-button size="small" type="danger" icon="el-icon-delete">批量删除</el-button>
        <span style="float: right; font-size: 18px; width:320 px;"> {{groupInfo.name}} </span>
      </el-header>

      <el-main>
        <el-table v-loading='load' border :data="tableData">
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column prop="id" label="编号" width="80">
          </el-table-column>
          <el-table-column prop="name" label="用户" width="150">
          </el-table-column>
          <el-table-column prop="phone" label="手机" width="150">
          </el-table-column>
          <el-table-column prop="email" label="邮箱" width="150">
          </el-table-column>
          <el-table-column prop="wechat" label="微信" width="150">
          </el-table-column>

          <el-table-column width="250" label="添加日期">
            <template scope="scope">
              <el-icon name="time"></el-icon>
              <span style="margin-left: 10px">{{ scope.row.created_at }}</span>
            </template>
          </el-table-column>

          <el-table-column width="250" label="更新日期">
            <template scope="scope">
              <el-icon name="time"></el-icon>
              <span style="margin-left: 10px">{{ scope.row.updated_at }}</span>
            </template>
          </el-table-column>

          <el-table-column width="80" label="操作">
            <template scope="scope">
              <el-button type="text" size="small" class="el-icon-delete" @click="handleDelete(scope.row)">移除</el-button>
            </template>
          </el-table-column>

        </el-table>
      </el-main>
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
  name: 'groups-members',

  data () {
    return {
      load: false,
      groupInfo: {},
      tableData: []
    }
  },

  created () {
    this.groupInfo = this.$route.query.row

    this.load = true
    this.func.ajaxGet('/apis/dashboard/group_user_relations', {group_id: this.groupInfo.id}, res => {
      console.log(res.data)
      this.tableData = res.data
      this.load = false
    })
  },

  methods: {
    // 返回
    handleCancel () {
      this.$router.push('/groups-list')
    },

    // 新增
    add () {
      this.$router.push({path: '/groups-members-add', query: {row: this.groupInfo}})
    },

    // 删除
    handleDelete (row) {
      console.log('handleDelete, ', row)
      this.func.ajaxDel('/apis/dashboard/group_user_relations', [{group_id: this.groupInfo.id, user_id: row.id}], res => {
        if (res.status === 200) {
          let index = this.tableData.indexOf(row)
          this.tableData.splice(index, 1)
          this.$message.success('删除成功')
        }
      })
    },

    multiDelete () {
      let multi = this.multipleSelection
      let id = multi.map(el => {
        return el.id
      })

      this.func.ajaxPost(this.api.deleteMulti, { id }, res => {
        if (res.data.code === 200) {
          this.$message.success('删除成功')
          multi.forEach(el => {
            let i = this.tableData.indexOf(el)
            this.tableData.splice(i, 1)
          })
        }
      })
    }
  }
}

</script>

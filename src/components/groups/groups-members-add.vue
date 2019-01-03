<template>
  <el-container style="height: 900px; border: 1px solid #eee">
    <el-container>
      <el-header style="text-align: left; font-size: 14px">
        <el-button size="small" type="primary" icon="el-icon-back" @click="handleCancel">返回</el-button>
        <el-input v-model="searchName" class="search"></el-input>
        <el-button size="small" type="primary" icon="el-icon-search" @click="handleSearch()">搜索</el-button>
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
              <el-button type="text" size="small" class="el-icon-upload" @click="handleAdd(scope.row)">添加</el-button>
            </template>
          </el-table-column>

        </el-table>

        <div class="block" >
          <span class="demonstration"></span>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handlePageChange"
            :current-page="currentPage"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="count">
          </el-pagination>
        </div>

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

  .search{
    width: 200px;
    height: 60px;
    text-align: left;
  }
</style>

<script>
export default {
  name: 'groups-members-add',

  data () {
    return {
      load: false,
      groupInfo: {},
      tableData: [],
      searchName: '',
      currentPage: 1,
      count: 0,
      pageSize: 50,
      pageSizes: [50, 100, 150, 200]
    }
  },

  created () {
    this.groupInfo = this.$route.query.row

    this.load = true
    this.func.ajaxGet('/apis/dashboard/group_user_relations/available_members', {group_id: this.groupInfo.id, user_name: this.searchName, page: this.currentPage, page_size: this.pageSize}, res => {
      console.log(res.data)
      this.count = res.data.count
      this.tableData = res.data.data
      this.load = false
    })
  },

  methods: {
    handleSizeChange (val) {
      this.load = true
      this.pageSize = val
      console.log(`每页 ${val} 条`)
      this.func.ajaxGet('/apis/dashboard/group_user_relations/available_members', {group_id: this.groupInfo.id, user_name: this.searchName, page: this.currentPage, page_size: val}, res => {
        console.log(res.data)
        this.count = res.data.count
        this.tableData = res.data.data
        this.load = false
      })
    },
    handlePageChange (val) {
      console.log(`当前页: ${val}`)
      this.load = true
      this.currentPage = val
      console.log(`每页 ${val} 条`)
      this.func.ajaxGet('/apis/dashboard/group_user_relations/available_members', {group_id: this.groupInfo.id, user_name: this.searchName, page: val, page_size: this.pageSize}, res => {
        console.log(res.data)
        this.count = res.data.count
        this.tableData = res.data.data
        this.load = false
      })
    },

    // 返回
    handleCancel () {
      this.$router.push({path: '/groups-members', query: {row: this.groupInfo}})
    },

    handleSearch () {
      this.load = true
      this.func.ajaxGet('/apis/dashboard/group_user_relations/available_members',
        {group_id: this.groupInfo.id,
          user_name: this.searchName,
          page: this.currentPage,
          page_size: this.pageSize}, res => {
          console.log(res.data)
          this.tableData = res.data
          this.load = false
        })
    },
    // 删除
    handleAdd (row) {
      console.log('handleAdd, ', row)
      this.func.ajaxPost('/apis/dashboard/group_user_relations', [{group_id: this.groupInfo.id, user_id: row.id}], res => {
        if (res.status === 200) {
          let index = this.tableData.indexOf(row)
          this.tableData.splice(index, 1)
          this.$message.success('添加成功')
        }
      })
    }
  }
}

</script>

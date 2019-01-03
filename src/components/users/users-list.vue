<template>
  <el-container style="height: 900px; border: 1px solid #eee">
    <el-container>
      <el-header style="text-align: left; font-size: 12px">
        <el-button size="small" type="primary" icon="el-icon-upload" @click="add()">新增</el-button>
        <el-button size="small" type="primary" icon="el-icon-search" >搜索</el-button>
        <el-button size="small" type="danger" icon="el-icon-delete">批量删除</el-button>
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

          <el-table-column fixed='right' width="150" label="操作">
            <template scope="scope">
              <el-button size="small" class="el-icon-edit" @click="edit(scope.row)"></el-button>
              <el-button size="small" class="el-icon-delete" type="danger" @click="handleDelete(scope.row)"></el-button>
            </template>
          </el-table-column>

        </el-table>

        <div class="block" >
          <span class="demonstration"></span>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
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

  .el-aside {
    color: #333;
  }
</style>

<script>
export default {
  name: 'users-list',

  data () {
    return {
      load: false,
      tableData: [],
      currentPage: 1,
      count: 0,
      pageSize: 50,
      pageSizes: [50, 100, 150, 200]
    }
  },

  created () {
    this.load = true
    this.func.ajaxGet('/apis/dashboard/users', {page: this.currentPage, page_size: this.pageSize}, res => {
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
      this.func.ajaxGet('/apis/dashboard/users', {page: this.currentPage, page_size: val}, res => {
        console.log(res.data)
        this.count = res.data.count
        this.tableData = res.data.data
        this.load = false
      })
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.load = true
      this.currentPage = val
      console.log(`每页 ${val} 条`)
      this.func.ajaxGet('/apis/dashboard/users', {page: val, page_size: this.pageSize}, res => {
        console.log(res.data)
        this.count = res.data.count
        this.tableData = res.data.data
        this.load = false
      })
    },

    // 新增
    add () {
      this.$router.push('/users-form')
    },

    // 删除
    handleDelete (row) {
      console.log('handleDelete, ', row)
      this.func.ajaxDel('/apis/dashboard/users', row, res => {
        if (res.status === 200) {
          let index = this.tableData.indexOf(row)
          this.tableData.splice(index, 1)
          this.$message.success('删除成功')
        }
      })
    },

    // 修改
    edit (row) {
      this.$router.push({path: '/users-form', query: {row: row}})
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

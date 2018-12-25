<template>
 <el-main>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="用户名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="微信">
        <el-input v-model="form.wechat"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{isNew? "新增": "修改"}}</el-button>
        <el-button @click="onCancel">取消 </el-button>
      </el-form-item>
    </el-form>
  </el-main>
</template>

<script>
export default {
  name: 'users-form',

  data () {
    return {
      isNew: 1, // 是否是添加
      form: {
        id: undefined,
        name: '',
        phone: '',
        email: '',
        wechat: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 100, message: '长度在 5 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },

  created () {
    let edit = this.$route.query.row

    if (edit) {
      this.isNew = 0
      console.log(edit)
      this.form = edit
    }
  },

  methods: {
    onSubmit () {
      if (!this.form.name) {
        this.$message.warning('请填写完整信息')
        return
      }

      console.log('submit!', this.form.name)

      if (this.isNew) {
        this.func.ajaxPost('/apis/dashboard/users', this.form, res => {
          console.log('return:', res)
          if (res.status === 200) {
            this.$message.success('操作成功')
            this.$router.push('/users-list')
          }
        })
      } else {
        this.func.ajaxPut('/apis/dashboard/users', this.form, res => {
          console.log('return:', res)
          if (res.status === 200) {
            this.$message.success('操作成功')
            this.$router.push('/users-list')
          }
        })
      }
    },
    onCancel () {
      this.$router.push('/users-list')
    }
  }
}
</script>

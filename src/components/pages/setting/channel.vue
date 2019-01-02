
<template>
  <!-- 渠道管理 -->
  <div class="Channel">
    <div class="delete">
      <p class="add" @click="openDia('新增渠道')"><img src="../../../assets/img/add.png" alt="">新增</p>
      <p class="shanchu" @click="deleteData"><img src="../../../assets/img/delete.png" alt="">删除</p>
    </div>

    <div class="ower-table">
      <el-table
        ref="multipleTable"
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        height="580">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="channelNo" label="渠道识别码" min-width="120"></el-table-column>
        <el-table-column prop="channelName" label="渠道名称" min-width="120"></el-table-column>
        <el-table-column prop="templateName" label="分期模板" min-width="100"></el-table-column>
        <el-table-column label="操作" width="120" align="center">
          <template slot-scope="scope">
            <el-button type="text" style="color: #5962FF;" @click="openDia('编辑渠道', scope.row.channelId)">编辑</el-button>
            <el-button type="text" style="color: #5962FF;" @click="toDelete(scope.row.channelId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="ower-pages" v-if="pages.total > pages.pageSize">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pages.currentPage"
        :page-sizes="pages.pageSizes"
        :page-size="pages.pageSize"
        layout="sizes, prev, pager, next, total"
        :total="pages.total">
      </el-pagination>
    </div>

    <el-dialog
      :visible.sync="dialogVisible"
      width="683px">
      <div class="dialog-header">{{title}}</div>
      <div class="form">
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="渠道名称：">
            <el-input v-model="form.channelName" auto-complete="off" placeholder="请输入短信标题"></el-input>
          </el-form-item>
          <el-form-item label="渠道识别码：">
            <el-input v-model="form.channelNo" auto-complete="off" placeholder="请输入签名"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addMessage">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Channel',
  data () {
    return {
      value: '',
      options: [],
      multipleSelection: [],
      dialogVisible: false,
      title: '新增模板',
      tableData: [],
      pages: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30, 40],
        total: 10
      },
      form: {}
    }
  },
  mounted () {
    this.pages.total = this.tableData.length
    this.getData()
  },
  methods: {
    // 添加渠道
    addMessage () {
      if (this.title === '新增渠道') {
        this.$post('/admin/channel/insert', this.form).then(res => {
          // console.log(res)
          if (res.code === 0) {
            this.dialogVisible = false
            this.getData()
          } else {
            this.$notify({
              type: 'info',
              message: res.msg
            })
          }
        })
      } else {
        this.$post('/admin/channel/changeChannel', {
          channelId: this.form.channelId,
          channelNo: this.form.channelNo,
          channelName: this.form.channelName
        }).then(res => {
          // console.log(res)
          if (res.code === 0) {
            this.dialogVisible = false
            this.getData()
          } else {
            this.$notify({
              type: 'info',
              message: res.msg
            })
          }
        })
      }
    },
    getData () {
      this.$fetch('/admin/channel/selectAllChannel').then(res => {
        // console.log(res)
        if (res.code === 0) {
          this.tableData = res.data
        }
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pages.pageSize = val
      this.getData()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pages.currentPage = val
      this.getData()
    },
    handleSelectionChange (val) {
      console.log(val)
      this.multipleSelection = val
    },
    openDia (msg, id) {
      this.title = msg
      this.dialogVisible = true
      if (msg === '新增渠道') {
        this.form = {}
      } else {
        this.$fetch('/admin/channel/selectMessageById', {'channelId': id}).then(res => {
          // console.log(res)
          if (res.code === 0) {
            this.dialogVisible = true
            this.msg = '编辑渠道'
            this.form = res.data.message
          }
        })
      }
    },
    // 多选删除
    deleteData () {
      let id = []
      if (this.multipleSelection.length < 1) {
        this.$notify({
          type: 'warning',
          message: '未选择信息!'
        })
      } else {
        this.multipleSelection.forEach(v => {
          id.push(v.channelId)
        })
        this.$confirm(`此操作将永久删除该信息, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          id.forEach(v => {
            this.$fetch('/admin/channel/delete', {'channelId': v}).then(res => {
              if (res.code === 0) {
                this.$notify({
                  type: 'success',
                  title: '删除成功!'
                })
                this.getData()
              } else {
                this.$notify({
                  type: 'error',
                  title: '提醒',
                  message: res.msg
                })
              }
            })
          })
        }).catch(() => {
          this.$notify({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    // 删除
    toDelete (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$fetch('/admin/channel/delete', {'channelId': id}).then(res => {
          console.log(res)
          if (res.code === 0) {
            this.$notify({
              type: 'success',
              message: '删除成功!'
            })
            this.getData()
          } else {
            this.$notify({
              type: 'error',
              message: res.msg
            })
          }
        })
      }).catch(() => {
        this.$notify({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  filters: {
    type (data) {
      if (data === 1) return '渠道验证码'
      if (data === 2) return '渠道申请通过'
      if (data === 3) return '渠道申请未通过'
      if (data === 4) return '个人车险到期提醒'
      if (data === 5) return '企业车险到期'
      return '此状态未知'
    }
  }
}
</script>

<style lang="less" scoped>
.Channel {
  padding: 0 30px 30px 30px;
  box-sizing: border-box;
  overflow: auto;
  height: 100%;
  .form {
    padding: 25px 120px 0 90px;
  }
}
</style>

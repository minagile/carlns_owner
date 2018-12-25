
<template>
  <!-- 短信模板 -->
  <div class="ShortMessage">
    <div class="delete">
      <p class="add" @click="openDia('新增模板')"><img src="../../../assets/img/add.png" alt="">新增</p>
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
        <el-table-column prop="messageName" label="标题" min-width="120"></el-table-column>
        <el-table-column prop="messageText" label="内容" min-width="600"></el-table-column>
        <el-table-column label="类型" width="120">
          <template slot-scope="scope">
            <div>{{ scope.row.messageType | type }}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" style="color: #5962FF;" @click="openDia('编辑模板', scope.row.messageId)">编辑</el-button>
            <el-button type="text" style="color: #5962FF;" @click="toDelete(scope.row.messageId)">删除</el-button>
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
          <el-form-item label="短信标题：">
            <el-input v-model="form.messageName" auto-complete="off" placeholder="请输入短信标题"></el-input>
          </el-form-item>
          <el-form-item label="短信内容：">
            <el-input type="textarea" v-model="form.messageText" placeholder="请输入短信内容"></el-input>
          </el-form-item>
          <el-form-item label="类型：">
            <el-select v-model="form.messageType" placeholder="请选择短信类型">
              <el-option label="渠道验证码" :value="1"></el-option>
              <el-option label="渠道申请通过" :value="2"></el-option>
              <el-option label="渠道申请未通过" :value="3"></el-option>
              <el-option label="个人车险到期" :value="4"></el-option>
              <!-- <el-option label="企业车险到期" :value="5"></el-option> -->
            </el-select>
          </el-form-item>
          <el-form-item label="签名：">
            <el-input v-model="form.messageTitle" auto-complete="off" placeholder="请输入签名"></el-input>
          </el-form-item>
          <el-form-item label="模板CODE：">
            <el-input v-model="form.messageCode" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="参数：">
            <el-input v-model="form.messageParams" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="默认发送模板：">
            <el-radio v-model="form.messageState" :label="1">是</el-radio>
            <el-radio v-model="form.messageState" :label="2">否</el-radio>
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
  name: 'ShortMessage',
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
      form: {
        messageState: 2
      }
    }
  },
  mounted () {
    this.pages.total = this.tableData.length
    this.getData()
  },
  methods: {
    // 添加短信
    addMessage () {
      if (this.title === '新增模板') {
        this.$post('/message/insert', this.form).then(res => {
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
        this.$post('/message/changeMessage', this.form).then(res => {
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
      this.$fetch('/message/selectAllMessage').then(res => {
        // console.log(res)
        if (res.code === 0) {
          this.tableData = res.data
        }
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    handleSelectionChange (val) {
      console.log(val)
      this.multipleSelection = val
    },
    openDia (msg, id) {
      this.title = msg
      this.dialogVisible = true
      if (msg === '新增模板') {
        this.form = {
          'messageState': 2
        }
      } else {
        this.$fetch('/message/selectMessageById', {'messageId': id}).then(res => {
          // console.log(res)
          if (res.code === 0) {
            this.dialogVisible = true
            this.msg = '编辑模板'
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
          id.push(v.messageId)
        })
        this.$confirm(`此操作将永久删除该信息, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          id.forEach(v => {
            this.$fetch('/message/delete', {'messageId': v}).then(res => {
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
        this.$fetch('/message/delete', {'messageId': id}).then(res => {
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
.ShortMessage {
  padding: 0 30px 30px 30px;
  box-sizing: border-box;
  overflow: auto;
  height: 100%;
  .form {
    padding: 25px 120px 0 90px;
  }
}
</style>


<template>
  <!-- 渠道管理 -->
  <div class="log">
    <div class="delete">
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
        <el-table-column prop="adminName" label="账号"></el-table-column>
        <el-table-column prop="logTime" label="操作时间"></el-table-column>
        <el-table-column prop="logText" label="操作项" ></el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" style="color: #5962FF;" @click="toDelete(scope.row.logId)">删除</el-button>
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
  </div>
</template>

<script>
export default {
  name: 'log',
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
    this.getData()
  },
  methods: {
    getData () {
      this.$fetch('/admin/logAd/selectAllLog', {
        page: this.pages.currentPage,
        pageSize: this.pages.pageSize
      }).then(res => {
        // console.log(res)
        if (res.code === 0) {
          this.tableData = res.data.rows
          this.pages.total = res.data.records
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
          id.push(v.logAdId)
        })
        this.$confirm(`此操作将永久删除该信息, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          id.forEach(v => {
            this.$fetch('/admin/logAd/delete', {'logAdId': id}).then(res => {
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
        this.$fetch('/admin/logAd/delete', {'logAdId': id}).then(res => {
          // console.log(res)
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
.log {
  padding: 0 30px 30px 30px;
  box-sizing: border-box;
  overflow: auto;
  height: 100%;
  .form {
    padding: 25px 120px 0 90px;
  }
}
</style>

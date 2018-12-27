<template>
  <!-- 分期模板 -->
  <div class="Instalment">
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
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="templateName"
          label="模板名称">
        </el-table-column>
        <el-table-column
          prop="stages"
          label="期数">
        </el-table-column>
        <el-table-column
          prop="downPayment"
          label="首付款">
        </el-table-column>
        <el-table-column
          prop="platform"
          label="服务费">
        </el-table-column>
        <el-table-column
          prop="firstRate"
          label="利率"
          min-width="300">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" style="color: #5962FF;" @click="openDia('编辑模板', scope.row.rateId)">编辑</el-button>
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
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="模板名称：">
            <el-input v-model="form.templateName"></el-input>
          </el-form-item>
          <el-form-item label="期数：">
            <el-input v-model="form.stages" type="number"></el-input>
          </el-form-item>
          <el-form-item label="首付款：">
            <el-input v-model="form.downPayment" type="number"></el-input>
          </el-form-item>
          <el-form-item label="服务费：">
            <el-input v-model="form.platform" type="number"></el-input>
          </el-form-item>
          <el-form-item label="利率：">
            <el-input v-model="form.firstRate" type="number"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Instalment',
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
        templateName: '',
        stages: '',
        downPayment: '',
        platform: '',
        firstRate: ''
      },
      id: null
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.pages.pageSize = val
      this.getData()
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.pages.currentPage = val
      this.getData()
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    openDia (msg, id) {
      this.title = msg
      this.dialogVisible = true
      if (msg === '新增模板') {
        this.form = {}
      } else {
        this.id = id
        this.$post('/admin/rate/findById', {
          id: id
        }).then(res => {
          if (res.code === 0) {
            // this.$notify.success(res.msg)
            this.form = res.data
          } else if (res.code === 1) {
            this.$notify.error(res.msg)
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
          id.push(v.rateId)
        })
        this.$confirm(`此操作将永久删除该信息, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$post('/admin/rate/deleteRate', {
            id: id.toString()
          }).then(res => {
            if (res.code === 0) {
              this.getData()
              this.$notify({
                type: 'success',
                message: '删除成功!'
              })
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
    getData () {
      this.$fetch('/admin/rate/findAll', {
        page: this.pages.currentPage,
        pageSize: this.pages.pageSize
      }).then(res => {
        if (res.code === 0) {
          this.pages.total = res.data.records
          this.tableData = res.data.rows
        }
      })
    },
    submit () {
      if (this.title === '新增模板') {
        this.$post('/admin/rate/addRate', this.form).then(res => {
          if (res.code === 0) {
            this.$notify.success(res.msg)
            this.dialogVisible = false
            this.getData()
          } else {
            this.$notify.error(res.msg)
          }
        })
      } else {
        this.$post('/admin/rate/updateRate', {
          templateName: this.form.templateName,
          stages: this.form.stages,
          downPayment: this.form.downPayment,
          platform: this.form.platform,
          firstRate: this.form.firstRate,
          id: this.id
        }).then(res => {
          if (res.code === 0) {
            this.$notify.success(res.msg)
            this.dialogVisible = false
            this.getData()
          } else {
            this.$notify.error(res.msg)
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.Instalment {
  padding: 0 30px 30px 30px;
  box-sizing: border-box;
  overflow: auto;
  height: 100%;
  .form {
    padding: 25px 120px 0 90px;
  }
}
</style>

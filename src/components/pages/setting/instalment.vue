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
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="templateName" label="模板名称"></el-table-column>
        <el-table-column prop="stages" label="期数"></el-table-column>
        <el-table-column prop="downPayment" label="首付款"></el-table-column>
        <el-table-column prop="platform" label="服务费"></el-table-column>
        <el-table-column prop="firstRate" label="利率" min-width="100"></el-table-column>
        <el-table-column
          label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" style="color: #5962FF;" @click="openMuban(scope.row.rateId, scope.row.templateName)">分配模板</el-button>
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
            <el-select v-model="form.stages" :disabled="disabled " placeholder="请选择期数" style="width: 100%">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
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
    <!-- 模板分配 -->
    <el-dialog
      :visible.sync="show"
      width="603px">
      <div class="dialog-header">分配模板</div>
      <div class="dialog-select">
        <div class="dialog-select-input disabled">
          <span>模板名称:</span>
          <input type="text" v-model="name" style="background: none;">
        </div>
        <el-button type="primary" @click="tijiao">确 定</el-button>
        <el-button @click="show = false">取 消</el-button>
      </div>
      <div class="dialog-table">
        <table>
          <tr>
            <th class="first"><el-checkbox v-model="checked" :indeterminate="isIndeterminate" :disabled="disabled"></el-checkbox></th>
            <th class="second">渠道</th>
          </tr>
          <tr v-for="item in tableData1" :key="item.name">
            <td class="first"><el-checkbox v-model="item.checkbox" @change="selected(item)" :disabled="disabled"></el-checkbox></td>
            <td class="second">{{item.name}}</td>
          </tr>
        </table>
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
      options: [
        {
          label: '3期',
          value: 3
        },
        {
          label: '6期',
          value: 6
        },
        {
          label: '12期',
          value: 12
        }
      ],
      disabled: false,
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
      id: null,
      show: false,
      tableData1: [],
      checked: false,
      isIndeterminate: false,
      titleName: '',
      deleteId: [],
      all: [],
      name: ''
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
      this.all = val
    },
    openDia (msg, id) {
      this.title = msg
      this.dialogVisible = true
      if (msg === '新增模板') {
        this.form = {}
        this.disabled = false
      } else {
        this.disabled = true
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
      if (this.all.length < 1) {
        this.$notify({
          type: 'warning',
          message: '未选择信息!',
          title: '警告'
        })
      } else {
        this.all.forEach(v => {
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
                title: '成功',
                message: '删除成功!'
              })
            } else {
              this.$notify({
                type: 'error',
                title: '错误',
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
            this.$notify({
              type: 'success',
              message: res.msg,
              title: '成功'
            })
            this.dialogVisible = false
            this.getData()
          } else {
            this.$notify({
              type: 'error',
              title: '错误',
              message: res.msg
            })
          }
        })
      }
    },
    selected (val) {
      if (val.checkbox === true) {
        if (this.multipleSelection.indexOf(val) === -1) {
          this.multipleSelection.push(val)
        }
      } else {
        this.multipleSelection.splice(this.multipleSelection.indexOf(val), 1)
      }
    },
    openMuban (id, name) {
      this.name = name
      this.multipleSelection = []
      this.show = true
      this.id = id
      this.$post('/admin/rate/findChannel', {
        rateId: id
      }).then(res => {
        // console.log(res)
        if (res.code === 0) {
          this.tableData1 = res.data
          res.data.forEach(v => {
            if (v.checkbox === true) {
              this.multipleSelection.push(v)
            }
          })
        }
      })
    },
    tijiao () {
      let channelId = ''
      this.multipleSelection.forEach(v => {
        channelId += `${v.id},`
      })
      this.$post('/admin/rate/matchChannel', {
        rateId: this.id,
        channelId: channelId
      }).then(res => {
        if (res.code === 0) {
          this.$notify({
            type: 'success',
            message: res.msg,
            title: '成功'
          })
          this.show = false
        } else {
          this.$notify({
            type: 'error',
            title: '错误',
            message: res.msg
          })
        }
      })
    }
  },
  watch: {
    checked (val) {
      if (val === true) {
        this.tableData1.forEach(v => {
          v.checkbox = true
          this.selected(v)
        })
      } else {
        this.tableData1.forEach(v => {
          v.checkbox = false
          this.selected(v)
        })
      }
    },
    multipleSelection (val) {
      if (val.length === this.tableData1.length && val.length !== 0) {
        this.checked = true
        this.isIndeterminate = false
      } else if (val.length === 0) {
        this.checked = false
        this.isIndeterminate = false
      } else {
        this.isIndeterminate = true
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
  // height: 100%;
  .form {
    padding: 25px 120px 0 90px;
  }
  .disabled {
    background: #f5f7fa;
    cursor: not-allowed;
    input {
      cursor: not-allowed;
      pointer-events:none
    }
  }
  .dialog-table {
    height: 580px;
    overflow: auto;
    table {
      width: 88%;
      margin: 0 auto;
      th, td {
        // width: 33%;
        text-align: left;
        height: 50px;
      }
      .first {
        width: 238px;
      }
      .second {
        width: 238px;
      }
    }
  }
  .dialog-select {
    box-sizing: border-box;
    padding: 30px 70px 20px 70px;
    border-bottom: 10px solid #F3F3F3;
    .dialog-select-input {
      width: 251px;
      height: 40px;
      border:1px solid rgba(217,217,217,1);
      border-radius:4px;
      padding: 0 15px;
      box-sizing: border-box;
      display: inline-block;
      margin-right: 17px;
      span {
        line-height: 40px;
      }
      input {
        border: none;
        width: 150px;
      }
    }
    .cellStyle {
      border: none!important;
    }
  }
}
</style>

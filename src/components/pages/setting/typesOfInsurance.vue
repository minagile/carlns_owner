<template>
  <!-- 险种模板 -->
  <div class="TypesOfInsurance">
    <div class="delete">
      <p class="add" @click="openDia('新增模板')"><img src="../../../assets/img/add.png" alt="">新增</p>
      <p class="shanchu" :class="{cannotDel: all.length === 0}" @click="deleteData('')"><img src="../../../assets/img/delete.png" alt="">删除</p>
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
          prop="billId"
          label="编号">
        </el-table-column>
        <el-table-column
          prop="templateName"
          label="模板名称"
          min-width="300">
        </el-table-column>
        <!-- <el-table-column
          prop="address"
          label="首付款">
        </el-table-column>
        <el-table-column
          prop="address"
          label="服务费">
        </el-table-column> -->
        <!-- <el-table-column
          prop="address"
          label="利率"
          min-width="300">
        </el-table-column> -->
        <el-table-column
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button type="text" style="color: #5962FF;" @click="openDia('查看模板', scope.row.billId)">查看</el-button>
            <el-button type="text" style="color: #5962FF;" @click="openDia('编辑模板', scope.row.billId)">编辑</el-button>
            <el-button type="text" style="color: #5962FF;" @click="deleteData(scope.row.billId)">删除</el-button>
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
      <div class="dialog-select">
        <div class="dialog-select-input" :class="{disabled: disabled === true}">
          <span>模板名称:</span>
          <input type="text" v-model="titleName" style="background: none;">
        </div>
        <el-button type="primary" @click="submit">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </div>
      <div class="dialog-table">
        <table>
          <tr>
            <th class="first"><el-checkbox v-model="checked" :indeterminate="isIndeterminate" :disabled="disabled"></el-checkbox></th>
            <th class="second">险种</th>
            <th>保额</th>
          </tr>
          <tr v-for="item in tableData1" :key="item.name">
            <td class="first"><el-checkbox v-model="item.checked" @change="selected(item)" :disabled="disabled"></el-checkbox></td>
            <td class="second">{{item.name}}</td>
            <td>
              <el-select v-model="item.money" placeholder="请选择" :disabled="disabled">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </td>
          </tr>
        </table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'TypesOfInsurance',
  data () {
    return {
      value: '',
      options: [
        {
          value: 1,
          label: '1元'
        }
      ],
      tableData: [],
      pages: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30, 40],
        total: 10
      },
      multipleSelection: [],
      dialogVisible: false,
      title: '新增模板',
      form: {
        name: ''
      },
      tableData1: [
        {
          money: '',
          checked: false,
          name: '商业险'
        },
        {
          money: '',
          checked: false,
          name: '交强险'
        },
        {
          money: '',
          checked: false,
          name: '车船税'
        },
        {
          money: '',
          checked: false,
          name: '机动车损失险'
        },
        {
          money: '',
          checked: false,
          name: '第三者责任险'
        },
        {
          money: '',
          checked: false,
          name: '司机责任险'
        },
        {
          money: '',
          checked: false,
          name: '乘客责任险'
        },
        {
          money: '',
          checked: false,
          name: '盗抢险'
        },
        {
          money: '',
          checked: false,
          name: '自燃险'
        },
        {
          money: '',
          checked: false,
          name: '划痕险'
        },
        {
          money: '',
          checked: false,
          name: '涉水险'
        },
        {
          money: '',
          checked: false,
          name: '指定专修厂险'
        },
        {
          money: '',
          checked: false,
          name: '不计免赔险'
        }
      ],
      checked: false,
      isIndeterminate: false,
      disabled: false,
      titleName: '',
      deleteId: [],
      all: [],
      id: null
    }
  },
  mounted () {
    this.getData()
  },
  watch: {
    checked (val) {
      if (val === true) {
        this.tableData1.forEach(v => {
          v.checked = true
          this.selected(v)
        })
      } else {
        this.tableData1.forEach(v => {
          v.checked = false
          this.selected(v)
        })
      }
    },
    multipleSelection (val) {
      if (val.length === this.tableData1.length) {
        this.checked = true
        this.isIndeterminate = false
      } else if (val.length === 0) {
        this.checked = false
        this.isIndeterminate = false
      } else {
        this.isIndeterminate = true
      }
    }
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
    // 点击多选框
    handleSelectionChange (val) {
      this.all = val
    },
    selected (val) {
      if (val.checked === true) {
        if (this.multipleSelection.indexOf(val) === -1) {
          this.multipleSelection.push(val)
        }
      } else {
        this.multipleSelection.splice(this.multipleSelection.indexOf(val), 1)
      }
    },
    // 打开弹窗
    openDia (msg, id) {
      this.title = msg
      this.dialogVisible = true
      this.checked = false
      this.disabled = false
      this.multipleSelection = []
      this.titleName = ''
      this.id = id
      this.tableData1.forEach(v => {
        v.checked = false
        v.money = ''
      })
      if (msg === '新增模板') {
        this.form = {}
      } else {
        this.$post('/admin/billNote/findById', {
          id: id
        }).then(res => {
          if (res.code === 0) {
            this.titleName = res.data.templateName
            res.data.arr.forEach(v => {
              this.tableData1.forEach(o => {
                if (o.name.indexOf(v.name) > -1) {
                  o.checked = true
                  o.money = v.money
                  this.multipleSelection.push(o)
                }
              })
            })
            if (msg === '查看模板') {
              this.disabled = true
            }
          } else if (res.code === 1) {
            this.$notify.error(res.code)
          }
        })
      }
    },
    // 多选删除
    deleteData (id) {
      if (!id) {
        this.all.forEach(v => {
          id += v.billId + ','
        })
      }
      this.$confirm(`此操作将永久删除该信息, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$post('/billNote/delete', {
          id: id
        }).then(res => {
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
    },
    getData () {
      this.$fetch('/admin/billNote/findAll', {
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
        this.$post('/admin/billNote/addBillNote', {
          name: this.titleName,
          multipleSelection: JSON.stringify(this.multipleSelection)
        }).then(res => {
          if (res.code === 0) {
            this.$notify({
              type: 'success',
              message: '添加成功!'
            })
            this.getData()
            this.dialogVisible = false
          } else {
            this.$notify({
              type: 'error',
              message: res.msg
            })
          }
        })
      } else if (this.title === '编辑模板') {
        this.$post('/admin/billNote/updateBillNote', {
          name: this.titleName,
          multipleSelection: JSON.stringify(this.multipleSelection),
          id: this.id
        }).then(res => {
          if (res.code === 0) {
            this.$notify({
              type: 'success',
              message: '修改成功!'
            })
            this.getData()
            this.dialogVisible = false
          } else {
            this.$notify({
              type: 'error',
              message: res.msg
            })
          }
        })
      } else {
        this.dialogVisible = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.TypesOfInsurance {
  padding: 0 30px 30px 30px;
  box-sizing: border-box;
  overflow: auto;
  height: 100%;
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
        width: 100px;
      }
      .second {
        width: 300px;
      }
    }
  }
  .disabled {
    background: #f5f7fa;
    cursor: not-allowed;
    input {
      cursor: not-allowed;
      pointer-events:none
    }
  }
}
</style>

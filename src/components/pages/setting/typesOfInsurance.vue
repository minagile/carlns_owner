<template>
  <!-- 险种模板 -->
  <div class="TypesOfInsurance">
    <div class="delete">
      <p class="add" @click="openDia('新增模板')"><img src="../../../assets/img/add.png" alt="">新增</p>
      <p class="shanchu"><img src="../../../assets/img/delete.png" alt="">删除</p>
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
          prop="date"
          label="编号">
        </el-table-column>
        <el-table-column
          prop="name"
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
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" style="color: #5962FF;" @click="openDia('查看模板')">查看</el-button>
            <el-button type="text" style="color: #5962FF;" @click="openDia('编辑模板')">编辑</el-button>
            <el-button type="text" style="color: #5962FF;" @click="toDelete(scope.row.name)">删除</el-button>
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
        <div class="dialog-select-input">
          <span>模板名称:</span>
          <input type="text">
        </div>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </div>
      <div class="dialog-table">
        <el-table
          ref="multipleTable"
          :data="tableData"
          style="width: 80%; margin: 0 auto"
          @selection-change="handleSelectionChange"
          height="580"
          cell-class-name="cellStyle"
          header-cell-class-name="cellStyle">
          <el-table-column
            type="selection"
            width="100">
          </el-table-column>
          <el-table-column
            prop="date"
            label="险种"
            width="300">
          </el-table-column>
          <el-table-column
            label="金额">
            <template slot-scope="scope">
              <el-select v-model="scope.row.value" placeholder="请选择" @change=ccc>
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
        </el-table>
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
      options: [],
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          value: ''
        }
      ],
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
      }
    }
  },
  mounted () {
    this.pages.total = this.tableData.length
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    // 点击多选框
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 打开弹窗
    openDia (msg) {
      this.title = msg
      this.dialogVisible = true
      // if (msg === '新增模板') {
      //   this.form = {}
      // } else {
      //   this.$post('', {

      //   }).then(res => {
      //     if (res.code === 0) {
      //       this.$message.success(res.code)
      //     } else if (res.code === 1) {
      //       this.$message.error(res.code)
      //     }
      //   })
      // }
    },
    // 删除
    toDelete (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    ccc () {
      console.log(this.tableData)
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
}
</style>

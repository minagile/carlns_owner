<template>
  <!-- 分期模板 -->
  <div class="Instalment">
    <div class="delete">
      <p class="add" @click="openDia('新增模板')">新增</p>
      <p class="shanchu">删除</p>
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
          label="模板名称">
        </el-table-column>
        <el-table-column
          prop="name"
          label="期数">
        </el-table-column>
        <el-table-column
          prop="address"
          label="首付款">
        </el-table-column>
        <el-table-column
          prop="address"
          label="服务费">
        </el-table-column>
        <el-table-column
          prop="address"
          label="利率"
          min-width="300">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" style="color: #5962FF;" @click="openDia('编辑模板')">编辑</el-button>
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
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="期数：">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="首付款：">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="服务费：">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="利率：">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
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
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      pages: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30, 40],
        total: 10
      },
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
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
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

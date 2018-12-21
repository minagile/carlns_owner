<template>
  <!-- 保单列表 -->
  <div class="PolicyList">

    <div class="table-search">
      <el-select v-model="value" clearable placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-input
        placeholder="请输入内容"
        v-model="value"
        clearable
        class="input">
      </el-input>
      <button class="table-btn-search">查询</button>
      <button class="table-btn-clear">清空</button>
    </div>

    <div class="delete">
      <img src="../../assets/img/delete.png" alt="">删除
    </div>

    <div class="ower-table">
      <el-table
        ref="multipleTable"
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        height="575">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="date"
          label="订单号">
        </el-table-column>
        <el-table-column
          prop="name"
          label="保单号">
        </el-table-column>
        <el-table-column
          prop="address"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="address"
          label="手机号">
        </el-table-column>
        <el-table-column
          prop="address"
          label="车牌">
        </el-table-column>
        <el-table-column
          prop="address"
          label="生效日期">
        </el-table-column>
        <el-table-column
          prop="address"
          label="保费合计">
        </el-table-column>
        <el-table-column
          prop="address"
          label="保单状态">
        </el-table-column>
        <el-table-column
          prop="address"
          label="支付状态">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" style="color: #5962FF;" @click="openDia">查看详情</el-button>
            <el-button type="text" style="color: red;">去支付</el-button>
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
      width="30%">
      <div class="dialog-header">详情</div>
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'PolicyList',
  data () {
    return {
      value: '',
      options: [],
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
      multipleSelection: [],
      dialogVisible: false
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
    openDia () {
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="less" scoped>
.PolicyList {
  height: 100%;
  padding: 35px 30px;
  box-sizing: border-box;
  overflow: auto;
}
</style>

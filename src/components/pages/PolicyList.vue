<template>
  <!-- 保单列表 -->
  <div class="PolicyList">
    <router-view/>
    <div v-show="this.$router.history.current.name === 'PolicyList'" class="policy">
      <div class="table-search">
        <el-select
          v-model="value"
          filterable
          placeholder="请输入订单号">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <button class="table-btn-search" @click="search">查询</button>
        <button class="table-btn-clear" @click="value = ''">清空</button>
      </div>

      <div class="delete">
        <img src="../../assets/img/delete.png" alt="">删除
      </div>

      <div class="ower-table">
        <el-table
          v-loading="loading"
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
            prop="orderNo"
            label="订单号">
          </el-table-column>
          <el-table-column
            prop="insureId"
            label="保单号">
          </el-table-column>
          <el-table-column
            prop="userName"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="userPhone"
            label="手机号">
          </el-table-column>
          <el-table-column
            prop="plateNum"
            label="车牌">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="生效日期">
          </el-table-column>
          <el-table-column
            prop="premium"
            label="保费合计">
          </el-table-column>
          <el-table-column
            prop="orderStateName"
            label="保单状态">
          </el-table-column>
          <el-table-column
            prop="stateOfPaymentName"
            label="支付状态">
          </el-table-column>
          <el-table-column
            label="操作"
            width="150">
            <template slot-scope="scope">
              <el-button type="text" style="color: #5962FF;" @click="openDia(scope.row.orderId)">查看详情</el-button>
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'PolicyList',
  data () {
    return {
      value: '',
      options: [],
      tableData: [],
      pages: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30, 40],
        total: 10
      },
      multipleSelection: [],
      loading: false
    }
  },
  mounted () {
    this.getList()
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
    openDia (id) {
      this.$router.push(`/PolicyList/detail/${id}`)
    },
    getList () {
      this.$fetch('/policy/selectAllOrder').then(res => {
        if (res.code === 0) {
          this.options = res.data.map(item => {
            return {value: item.orderNo, label: item.orderNo}
          })
        }
      })
    },
    getData () {
      this.loading = true
      this.$fetch('/policy/showInsureByOrderNo', {
        orderNo: this.value,
        page: this.pages.currentPage,
        pageSize: this.pages.pageSize
      }).then(res => {
        this.loading = false
        this.tableData = res.data.rows
        this.pages.total = res.data.records
      })
    },
    // 查询
    search () {
      this.pages.currentPage = 1
      this.getData()
    }
  }
}
</script>

<style lang="less" scoped>
.PolicyList {
  overflow: auto;
  .policy {
    padding: 35px 30px;
    box-sizing: border-box;
    min-height: 790px;
  }
}
</style>

<template>
  <!-- 保单列表 -->
  <div class="StageManagement">
    <router-view></router-view>

    <div class="stage" v-if="this.$router.history.current.name === 'StageManagement'">
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
        <p class="shanchu" @click="deleteData">
          <img src="../../assets/img/delete.png" ><span>删除</span>
        </p>
      </div>

      <div class="ower-table">
        <el-table
          ref="multipleTable"
          :data="tableData"
          style="width: 100%"
          v-loading="loading"
          @selection-change="handleSelectionChange"
          height="580">
          <el-table-column width="1">
            <template slot-scope="scope">
              <img src="../../assets/img/wait.png" v-if="scope.row.state === 0 && scope.row.moneyState === 1" alt="">
            </template>
          </el-table-column>
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="orderNo" label="订单号"></el-table-column>
          <el-table-column prop="plateNum" label="车牌号"></el-table-column>
          <el-table-column prop="username" label="姓名"></el-table-column>
          <el-table-column prop="tel" label="手机号"></el-table-column>
          <el-table-column prop="channelName" label="订单来源"></el-table-column>
          <el-table-column prop="company" label="保险公司"></el-table-column>
          <el-table-column prop="insureMoney" label="每期金额/总金额" min-width="130"></el-table-column>
          <el-table-column label="还款时间">
            <template slot-scope="scope">
              {{ scope.row.createTime | timeChange }}
            </template>
          </el-table-column>
          <el-table-column prop="orderState" label="保单状态"></el-table-column>
          <el-table-column label="支付状态">
            <template slot-scope="scope">
              {{ scope.row.moneyState | state }}
              <span :style="{'color': scope.row.state === 0 && scope.row.moneyState === 1 ? 'red': ''}">{{ scope.row.overStage.split('/')[0] }}</span>/
              <span>{{ scope.row.overStage.split('/')[1] }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="orderState" label="订单状态"></el-table-column> -->
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button type="text" style="color: #5962FF;" @click="openDia(scope.row.orderId)">查看详情</el-button>
              <el-button type="text" style="color: #FF0000;" v-if="scope.row.state === 0 && scope.row.moneyState === 1" @click="pay(scope.row.stageId)">去支付</el-button>
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

    <el-dialog
      :visible.sync="dialogVisible"
      width="30%">
      <div class="dialog-header">详情</div>
      <span>这是一段信息</span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'StageManagement',
  data () {
    return {
      value: null,
      options: [],
      tableData: [],
      pages: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30, 40],
        total: 10
      },
      multipleSelection: [],
      dialogVisible: false,
      loading: false
    }
  },
  mounted () {
    this.getData()
    this.getList()
  },
  methods: {
    pay (id) {
      this.$confirm('是否已支付此次订单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$post('/admin/insure/update', {'stageId': id}).then(res => {
          console.log(res)
          if (res.code === 0) {
            this.$notify({
              type: 'success',
              title: '支付',
              message: '支付成功!'
            })
            this.getData()
          } else {
            this.$notify({
              type: 'error',
              title: '支付',
              message: res.msg
            })
          }
        })
      }).catch(() => {
        this.$notify({
          type: 'info',
          title: '支付',
          message: '已取消支付'
        })
      })
    },
    // 批量删除
    deleteData () {
      if (this.multipleSelection.length > 0) {
        var ids = ''
        this.multipleSelection.forEach(v => {
          ids += v.orderId + ','
        })
        // GET /fd/insure/deleteOrder
        this.$fetch('/admin/insure/deleteOrder', { orderIds: ids }).then(res => {
          if (res.code === 0) {
            this.$notify({
              type: 'success',
              title: '删除',
              message: res.msg
            })
            this.getData()
          }
        })
      } else {
        this.$notify({
          type: 'info',
          title: '删除',
          message: '您还未选择需要删除的订单'
        })
      }
    },
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
      this.$router.push({name: 'SDetail', query: {id: id}})
    },
    search () {
      this.pages.currentPage = 1
      this.getData()
    },
    getList () {
      this.$fetch('/admin/insure/getOrders').then(res => {
        if (res.code === 0) {
          this.options = res.data.map(item => {
            return {value: item, label: item}
          })
        }
      })
    },
    getData () {
      this.loading = true
      this.$fetch('/admin/insure/managerStage', {
        orderNo: this.value,
        page: this.pages.currentPage,
        pageSize: this.pages.pageSize
      }).then(res => {
        this.loading = false
        this.tableData = res.data.rows
        this.pages.total = res.data.records
      })
    }
  },
  filters: {
    state (data) {
      if (data === 0) return '待还款'
      if (data === 1) return '已还款'
      if (data === 2) return '已逾期'
      return ''
    },
    timeChange (data) {
      let date = new Date(data)
      return date.getFullYear() + '-' + zero(date.getMonth() + 1) + '-' + zero(date.getDate())
    }
  }
}
function zero (data) {
  if (data < 10) return '0' + data
  return data
}
</script>

<style lang="less" scoped>
.StageManagement {
  overflow: auto;
  .stage {
    height: 100%;
    padding: 35px 30px;
    box-sizing: border-box;
  }
  .el-table .cell {
    position: relative;
  }
  .el-table .cell img {
    // width: 10px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
  }
}
</style>

<template>
<!-- 保单列表-详情 -->
  <div class="sdetail">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'StageManagement' }">分期管理</el-breadcrumb-item>
      <el-breadcrumb-item >查看详情</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="content">
      <p class="title">
        <img src="../../../assets/img/baodanxinxi (3).png" alt="">
        基本信息
      </p>
      <div class="basic">
        <table class="noborder">
          <tr>
            <td>被保人姓名：{{ basicMsg.userName }}</td>
            <td>被保人手机号：{{ basicMsg.userPhone }}</td>
            <td>被保人身份证：{{ basicMsg.userIdCard }}</td>
          </tr>
          <tr>
            <td>车架号：{{ basicMsg.carVin }}</td>
            <td>初登日期：{{ basicMsg.firstTime }}</td>
            <td>第一受益人：{{ basicMsg.firstBeneficiary }}</td>
          </tr>
          <tr>
            <td>车牌号：{{ basicMsg.plateNum }}</td>
            <td>订单号：{{ basicMsg.orderId }}</td>
            <td>投保单号：{{ basicMsg.insureNo }}</td>
          </tr>
        </table>
      </div>
      <p class="title">
        <img src="../../../assets/img/baodanxinxi (1).png" alt="">
        保单信息
      </p>
      <div class="basic">
        <table class="noborder">
          <tr>
            <td>保险公司：{{ basicMsg.insuranceCompany }}</td>
            <td>商业险金额：{{ basicMsg.commercialMoney }}</td>
            <td>交强险：{{ basicMsg.SALIMoney }}</td>
            <td>车船税：{{ basicMsg.vesselTaxMoney }}</td>
          </tr>
          <tr>
            <td>车辆使用性质：{{ basicMsg.carPropety }}</td>
            <td>商业险起止日期：{{ basicMsg.commercialStart }}<span v-if="basicMsg.commercialEnd">至</span>{{ basicMsg.commercialEnd }}</td>
            <td colspan="2">交强险起止日期：{{ basicMsg.SALIStart }}<span v-if="basicMsg.SALIEnd">至</span>{{ basicMsg.SALIEnd }}</td>
          </tr>
        </table>
        <table class="border" v-if="tableData.head.length > 0">
          <tr>
            <th>承保险种</th>
            <th>不计免赔</th>
            <th>保险费(元)</th>
          </tr>
          <tr v-for="item in tableData.head" :key="item.name">
            <td>{{ item.name }}</td>
            <td>{{ item.free }}</td>
            <td>{{ item.money }}</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td class="all">合计：{{ tableData.amount }}</td>
          </tr>
        </table>
      </div>
      <p class="title">
        <img src="../../../assets/img/baodanxinxi (2).png" alt="">
        分期方案
      </p>
      <div class="basic">
        <h3><span>分期总金额：{{ basicMsg.amount }}元</span><span>分期期数：{{ basicMsg.stage }}期</span></h3>
        <table class="border">
          <tr>
            <th>分期期数</th>
            <th>还款时间</th>
            <th>还款金额</th>
            <th>还款状态</th>
          </tr>
          <tr v-for="item in stages" :key="item.name">
            <td>{{ item.stagesSequential }}</td>
            <td>{{ item.stagesCutoff | timeChange }}</td>
            <td>{{ item.stagesPrice }}</td>
            <td>
              <span v-if="item.stagesState === 0" style="color:red">待还款</span>
              <span v-if="item.stagesState === 1">已还款</span>
              <span v-if="item.stagesState === 2" style="color:red">已逾期</span>
            </td>
          </tr>
        </table>
      </div>
      <p class="title" v-show="logsAdsList.length > 0">
        <img src="../../../assets/img/aaa.png" alt="">
        操作日志
      </p>
      <div class="basic" v-show="logsAdsList.length > 0">
        <table class="border">
          <tr>
            <th width="150">操作时间</th>
            <th>操作项</th>
          </tr>
          <tr v-for="item in logsAdsList" :key="item.name">
            <td width="150">{{ item.logTime | timeChange1 }}</td>
            <td>{{ item.logText }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SDetail',
  data () {
    return {
      basicMsg: {
        userName: '',
        carVin: '',
        plateNum: '',
        userPhone: '',
        firstTime: '',
        orderId: '',
        userIdCard: '',
        firstBeneficiary: '',
        insureNo: '',
        insuranceCompany: '',
        carPropety: '',
        commercialMoney: '',
        commercialStart: '',
        commercialEnd: '',
        SALIMoney: '',
        SALIStart: '',
        SALIEnd: '',
        vesselTaxMoney: ''
      },
      tableData: {
        amount: 0,
        head: []
      },
      stages: [],
      logsAdsList: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.$fetch('/admin/insure/showOrderDetails', {
        orderId: this.$route.query.id
      }).then(res => {
        // console.log(res)
        if (res.code === 0) {
          this.basicMsg = res.data
          this.tableData = res.data.listShow
          this.stages = res.data.stages
          this.logsAdsList = res.data.logsAdsList
        }
      })
    }
  },
  filters: {
    timeChange (data) {
      let date = new Date(data)
      return date.getFullYear() + '-' + zero(date.getMonth() + 1) + '-' + zero(date.getDate())
    },
    timeChange1 (data) {
      let date = new Date(data)
      return date.getFullYear() + '-' + zero(date.getMonth() + 1) + '-' + zero(date.getDate()) + ' ' + zero(date.getHours()) + ':' + zero(date.getMinutes()) + ':' + zero(date.getSeconds())
    }
  }
}
function zero (data) {
  if (data < 10) return '0' + data
  return data
}
</script>

<style lang="less" scoped>
.sdetail {
  height: 100%;
  min-height: 744px;
  box-sizing: border-box;
  .el-breadcrumb {
    margin: 23px 20px;
  }
  .content {
    margin: 26px 0 0 0;
    .title {
      font-size:14px;
      font-family:MicrosoftYaHei;
      font-weight:Regular;
      color:rgba(51,51,51,1);
      line-height:24px;
      // margin-left: 122px;
      width: 90%;
      text-indent: 3%;
      margin: 0 auto;
      margin-top: 29px;
      img {
        vertical-align: middle;
        margin: -2px 5px 0 0;
      }
    }
    .basic {
      margin: 0 auto;
      h3 {
        width: 81.1%;
        text-indent: 20px;
        margin: 0 auto;
        font-size:14px;
        font-family:MicrosoftYaHei;
        font-weight:bold;
        color:rgba(51,51,51,1);
        line-height:24px;
        padding-top: 30px;
        span:last-child {
          padding-left: 80px;
        }
      }
      // margin-left: 202px;
      table.noborder {
        width: 79%;
        border-collapse: collapse;
        margin: 0 auto;
        tr {
          height: 50px;
          font-size:14px;
          font-family:MicrosoftYaHei;
          font-weight:400;
          color:rgba(119,119,119,1);
        }
        td {
          &:first-of-type, &:nth-of-type(2) {
            width: 33%;
          }
          // border: 1px solid #ccc;
        }
      }
      table.border {
        margin: 10px auto 70px auto;
        width: 81.11%;
        border-collapse:collapse;
        td, th {
          text-align: left;
          height: 60px;
          padding: 0 20px 0 20px;
        }
        th {
          background: #EBEBEB;
          font-size:14px;
          font-family:MicrosoftYaHei;
          font-weight:400;
          color:rgba(51,51,51,1);
        }
        td {
          border-bottom: 1px solid #E8EDEE;
          font-size:14px;
          font-family:MicrosoftYaHei;
          font-weight:400;
          color:rgba(119,119,119,1);
        }
        .all {
          color: #2371FF;
        }
      }
    }
  }
}
</style>

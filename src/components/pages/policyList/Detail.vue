<template>
<!-- 保单列表-详情 -->
  <div class="detail">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'PolicyList' }">保单列表</el-breadcrumb-item>
      <el-breadcrumb-item >查看详情</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="content">
      <p class="title">
        <img src="../../../assets/img/baodanxinxi (3).png" alt="">
        基础信息
      </p>
      <div class="basic">
        <div>
          <p>被保人姓名：{{basicMsg.userName}}</p>
          <p>车架号：{{basicMsg.carVin}}</p>
          <p>车牌号：{{basicMsg.plateNum}}</p>
        </div>
        <div>
          <p>被保人手机号：{{basicMsg.userPhone}}</p>
          <p>初登日期：{{basicMsg.firstTime}}</p>
          <p>订单号：{{basicMsg.orderId}}</p>
        </div>
        <div>
          <p>被保人身份证：{{basicMsg.userIdCard}}</p>
          <p>第一受益人：{{basicMsg.firstBeneficiary}}</p>
          <p>投保单号：{{basicMsg.insureNo}}</p>
        </div>
      </div>
      <p class="title">
        <img src="../../../assets/img/baodanxinxi (1).png" alt="">
        保单信息
      </p>
      <div class="basic">
        <div>
          <p>保险公司：{{basicMsg.insuranceCompany}}</p>
          <p>车辆使用性质：{{basicMsg.carPropety}}</p>
        </div>
        <div>
          <p>商业险金额：{{basicMsg.commercialMoney}}</p>
          <p>商业险起止日期：{{basicMsg.commercialStart}}<span v-if="basicMsg.commercialEnd">至</span>{{basicMsg.commercialEnd}}</p>
        </div>
        <div class="che">
          <p>交强险金额：{{basicMsg.SALIMoney}}</p>
          <p>交强险起止日期：{{basicMsg.SALIStart}}<span v-if="basicMsg.SALIEnd">至</span>{{basicMsg.SALIEnd}}</p>
        </div>
        <div class="che">
          <p>车船税：{{basicMsg.vesselTaxMoney}}</p>
        </div>
      </div>
    </div>

    <table>
      <tr>
        <th>承保险种</th>
        <th>不计免赔</th>
        <th>保险费(元)</th>
      </tr>
      <tr v-for="item in tableData.head" :key="item.name">
        <td>{{item.name}}</td>
        <td>{{item.free}}</td>
        <td>{{item.money}}</td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td class="all">合计：{{tableData.amount}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Detail',
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
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.$fetch('/admin/policy/showInsureDetails', {
        orderId: this.$route.params.id
      }).then(res => {
        if (res.code === 0) {
          this.basicMsg = res.data
          this.tableData = res.data.listShow
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.detail {
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
      margin-left: 122px;
      margin-top: 29px;
      img {
        vertical-align: middle;
        margin: -2px 5px 0 0;
      }
    }
    .basic {
      margin: 0 auto;
      margin-left: 202px;
      div {
        text-align: left;
        display: inline-block;
        width: 400px;
        p {
          margin-top: 37px;
          font-size:14px;
          font-family:MicrosoftYaHei;
          font-weight:400;
          color:rgba(119,119,119,1);
        }
      }
      .che {
        width: 285px;
      }
    }
  }
  table {
    margin: 57px auto 70px auto;
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
</style>

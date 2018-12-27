
<template>
  <!-- 账号管理 -->
  <div class="AccountNumber">
    <div class="delete">
      <p class="add" @click="openDia('新增账号')"><img src="../../../assets/img/add.png" alt="">新增</p>
      <p class="shanchu" @click="deleteData"><img src="../../../assets/img/delete.png" alt="">删除</p>
    </div>

    <div class="ower-table" style="min-height:610px;">
      <el-table
        ref="multipleTable"
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="adminPhone" label="账号"></el-table-column>
        <el-table-column prop="adminPwd" label="密码" min-width="180"></el-table-column>
        <el-table-column label="添加日期">
          <template slot-scope="scope">
            <div>{{ scope.row.createTime | timeChange }}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" style="color: #5962FF;" @click="openDia('设置权限', scope.row.adminId, scope.row.adminName)">设置权限</el-button>
            <el-button type="text" style="color: #5962FF;" @click="toDelete(scope.row.adminId)">删除</el-button>
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
          <el-form-item label="手机号：">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item label="用户名：">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="密码：">
            <el-input type="password" v-model="form.password"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 权限设置 -->
    <el-dialog :visible.sync="childDialogVisible" width="1000px">
      <div class="dialog-header">权限设置</div>
      <div class="top">
        <span>账号：{{name}}</span>
        <el-button class="setBtn" size="small" @click="childDialogVisible = false">返回</el-button>
        <el-button class="setBtn" size="small" type="primary" @click="sureUpdate">确定</el-button>
      </div>
      <el-table :data="tableData5" style="width: 100%" max-height="500">
        <el-table-column type="expand">
            <template slot-scope="props">
              <el-table :data="props.row.object" :show-header="false" style="width: 100%">
                <el-table-column prop="name"></el-table-column>
                <el-table-column>
                  <template slot-scope="prop">
                    <div v-if="prop.row.fp">
                      <el-checkbox v-if="prop.row.fp[0] === null" disabled></el-checkbox>
                      <el-checkbox v-if="prop.row.fp[0]" v-model="prop.row.fp[0][0].status" @change="checkBox(prop.row.fp[0][0].id, $event)"></el-checkbox>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column>
                  <template slot-scope="prop">
                    <div v-if="prop.row.fp">
                      <el-checkbox v-if="prop.row.fp[1] === null" disabled></el-checkbox>
                      <el-checkbox v-if="prop.row.fp[1]" v-model="prop.row.fp[1][0].status" @change="checkBox(prop.row.fp[1][0].id, $event)"></el-checkbox>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column>
                  <template slot-scope="prop">
                    <div v-if="prop.row.fp">
                      <el-checkbox v-if="prop.row.fp[2] === null" disabled></el-checkbox>
                      <el-checkbox v-if="prop.row.fp[2]" v-model="prop.row.fp[2][0].status" @change="checkBox(prop.row.fp[2][0].id, $event)"></el-checkbox>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column>
                  <template slot-scope="prop">
                    <div v-if="prop.row.fp">
                      <el-checkbox v-if="prop.row.fp[3] === null" disabled></el-checkbox>
                      <el-checkbox v-if="prop.row.fp[3]" v-model="prop.row.fp[3][0].status" @change="checkBox(prop.row.fp[3][0].id, $event)"></el-checkbox>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="功能"></el-table-column>
          <el-table-column label="查看">
            <template slot-scope="prop">
              <div v-if="prop.row.fpl">
                <el-checkbox v-if="prop.row.fpl[0] === null" disabled></el-checkbox>
                <el-checkbox v-if="prop.row.fpl[0]" v-model="prop.row.fpl[0][0].status" @change="checkBox(prop.row.fpl[0][0].id, $event)"></el-checkbox>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="新增">
            <template slot-scope="prop">
              <div v-if="prop.row.fpl">
                <el-checkbox v-if="prop.row.fpl[1] === null" disabled></el-checkbox>
                <el-checkbox v-if="prop.row.fpl[1]" v-model="prop.row.fpl[1][0].status" @change="checkBox(prop.row.fpl[1][0].id, $event)"></el-checkbox>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="修改">
            <template slot-scope="prop">
              <div v-if="prop.row.fpl">
                <el-checkbox v-if="prop.row.fpl[2] === null" disabled></el-checkbox>
                <el-checkbox v-if="prop.row.fpl[2]" v-model="prop.row.fpl[2][0].status" @change="checkBox(prop.row.fpl[2][0].id, $event)"></el-checkbox>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="删除">
            <template slot-scope="prop">
              <div v-if="prop.row.fpl">
                <el-checkbox v-if="prop.row.fpl[3] === null" disabled></el-checkbox>
                <el-checkbox v-if="prop.row.fpl[3]" v-model="prop.row.fpl[3][0].status" @change="checkBox(prop.row.fpl[3][0].id, $event)"></el-checkbox>
              </div>
            </template>
          </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'AccountNumber',
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
        phone: '',
        username: '',
        password: ''
      },
      childDialogVisible: false,
      name: '',
      tableData5: [],
      id: '',
      arr: []
    }
  },
  mounted () {
    this.pages.total = this.tableData.length
    this.getData()
  },
  methods: {
    checkBox (id, status) {
      // console.log(id, status)
      if (status === true) {
        this.arr.push(id)
      } else {
        this.arr.forEach((v, k) => {
          if (v === id) {
            this.arr.splice(k, 1)
          }
        })
      }
      // console.log(this.arr)
    },
    // 确定权限
    sureUpdate () {
      if (this.arr.length <= 0) {
        this.$notify({
          message: '您还没有选择任何权限',
          type: 'error'
        })
      } else {
        let ids = ''
        this.arr.forEach(v => {
          ids += v + ','
        })
        // console.log(ids)
        this.$post('/admin/limit/updatePermission', {
          fundIds: ids,
          adminId: this.id
        }).then(res => {
          // console.log(res)
          if (res.code === 0) {
            this.$notify.success({
              title: '权限设置',
              message: '权限设置成功'
            })
            this.childDialogVisible = false
          } else {
            this.$notify.info({
              title: '权限设置',
              message: res.msg
            })
          }
        })
      }
    },
    add () {
      if (this.form.phone === '') {
        this.$notify({
          type: 'info',
          title: '提醒',
          message: '手机号不能为空'
        })
      } else if (this.form.password === '') {
        this.$notify({
          type: 'info',
          title: '提醒',
          message: '密码不能为空'
        })
      } else {
        this.$post('/admin/addAdmin', this.form).then(res => {
          if (res.code === 0) {
            this.$notify({
              type: 'success',
              title: '添加账号',
              message: '添加成功'
            })
            this.dialogVisible = false
            this.getData()
          } else {
            this.$notify.error({message: res.msg})
          }
        })
      }
    },
    getData () {
      this.$fetch('/admin/findAll', {
        page: this.pages.currentPage,
        pageSize: this.pages.pageSize
      }).then(res => {
        // console.log(res)
        this.tableData = res.data.rows
        this.pages.total = res.data.records
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(val)
    },
    openDia (msg, id, name) {
      if (msg === '新增账号') {
        this.title = msg
        this.dialogVisible = true
        this.form = {}
      } else {
        this.name = name
        this.id = id
        this.childDialogVisible = true
        this.$fetch('/admin/limit/findByAdminId', { adminId: id }).then(res => {
          // console.log(res)
          this.tableData5 = res
        })
        // 获取选中权限的id
        this.$fetch('/admin/limit/selectByAdminId', { adminId: id }).then(res => {
          res.data.forEach(v => {
            this.arr.push(v.adauthId)
          })
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
          id.push(v.adminId)
        })
        this.$confirm(`此操作将永久删除该信息, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$notify({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$notify({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    // 删除
    toDelete (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$post('/admin/deleteAdmin', { adminId: id }).then(res => {
          if (res.code === 0) {
            this.$notify({
              type: 'success',
              title: '删除账号',
              message: '删除成功'
            })
            this.getData()
          } else {
            this.$notify.error({message: res.msg})
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
  filters: {
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
.AccountNumber {
  padding: 0 30px 30px 30px;
  box-sizing: border-box;
  overflow: auto;
  height: 100%;
  .form {
    padding: 25px 120px 0 90px;
  }
  .el-dialog {
    .top {
      overflow: hidden;
      line-height: 32px;
      padding: 20px 20px 0;
      .setBtn {
        // background: #282828;
        // color: #fff;
        // border-color: #282828;
        float: right;
        margin-left: 30px;
      }
    }
  }
}
</style>

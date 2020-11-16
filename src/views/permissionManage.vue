<template>
  <div>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 角色列表区域 -->
      <el-table :data="rolelist" border stripe>
        <!-- 索引列 -->
        <el-table-column type="index"></el-table-column>
        <el-table-column label="角色名称" prop="username"></el-table-column>
        <el-table-column label="用户角色" prop="role"></el-table-column>
        <el-table-column label="用户电话" prop="phone"></el-table-column>
        <el-table-column label="用户邮箱" prop="email"></el-table-column>
        <el-table-column label="用户性别" prop="sex"></el-table-column>
        <el-table-column label="用户状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.state" @change="userStateChanged(scope.row)">
            </el-switch>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <el-button size="mini" type="warning" icon="el-icon-setting" @click="showSetRightDialog(scope.row)">分配权限
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分配权限的对话框 -->
    <el-dialog title="修改用户权限" :visible.sync="dialogVisible" width="300px">
      <el-select v-model="changeRole" placeholder="选择类型" style="margin-top: 30px;">
        <el-option v-for='item in option' :value='item' :key="item"></el-option>
      </el-select>
      <div style="margin: 40px 0;"></div>
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="modifyRole">确 定</el-button>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        // 修改权限的表单
        items: [],
        // 所有角色列表数据
        rolelist: {},
        /* 用来分页的 */
        page: {
          "currentPage": "1",
          "pageSize": "20"
        },
        // 控制分配权限对话框的显示与隐藏
        setRightDialogVisible: false,
        // 所有权限的数据
        rightslist: [],
        // 默认选中的节点Id值数组
        defKeys: [],
        // 当前即将分配权限的角色id
        roleId: '',
        // 控制用户状态改变（封号）
        state: false,
        /* 对话框的参数 */
        dialogVisible: false,
        /* 获取修改的id */
        udpId: "",
        changeRole: "",
        option: ["super-adminstrator", "adminstrator", "user"],
        userPermission: []
      }
    },
    created() {
      this.getRolesList()
    },
    methods: {
      // 获取所有角色的列表
      async getRolesList() {
        console.log("--------- 这是开始是获取所有角色的列表 ---------")
        const {
          data: res
        } = await this.$http.post('user/getUser', this.page)

        if (res.code !== 200) {
          return this.$message.error('获取角色列表失败！')
        }
        console.log("接口调用返回的数据：" + res.data)
        //  赋值到rolelist渲染到列表上
        this.rolelist = res.data
        //  赋值后的rolelist
        console.log("赋值后的rolelist：" + this.rolelist)
        //  判断permission中的权限
        //顺便输出一下data中的原始数据
        console.log(this.rightslist)
        console.log("有没有东西")
        for (var i = 0; i < this.rolelist.length; i++) {
          var state = this.rolelist[i].state
          if (state == 1) {
            this.rolelist[i].state = true
          } else if (state == 0) {
            this.rolelist[i].state = false
          }
        }        
        console.log("有没有东西2")
        console.log("--------- 这是是获取所有角色的列表结束 ---------")
      },
      /* switch开关 */
      async userStateChanged(userinfo) {
        console.log("--------- 这是开始是控制开关 ---------")
        console.log(userinfo.state)
        if (userinfo.state == true) {
          const {
            data: res
          } = await this.$http.post("user/setuser", {
            id: userinfo.id,
            state: 1
          })
        } else if (userinfo.state == false) {
          const {
            data: res
          } = await this.$http.post("user/setuser", {
            id: userinfo.id,
            state: 0
          })
        }
        this.getRolesList()
      },
      setClose() {
        this.dialogVisible = false
      },
      // 展示分配权限的对话框
      showSetRightDialog(role) {
        console.log("--------- 这是开始是分配权限 ---------")
        /* 先清空再获取 */
        this.items = []
        this.dialogVisible = true,
        console.log("role:" + role)
        this.udpId = role.id
        console.log("udpId是：" + this.udpId)
        console.log("有没有执行到这里")
        console.log("--------- 这是是分配权限结束 ---------")
      },
      // 分配权限对话框的的确定事件
      async modifyRole() {
        console.log("--------- 这是开始点击分配权限对话框 ---------")
        console.log("分配权限-点击了确定")
        const {
          data: res
        } = await this.$http.post("user/setuser", {
          id: this.udpId,
          role: this.changeRole
        })
        if (res.code !== 200) {
          return this.$message.error('修改权限失败！')
        }
        console.log(res)
        this.$message.success('修改权限成功！')
        /* 关闭对话框 */
        this.dialogVisible = false
        /* 清空选择过的选项 */
        this.changeRole =""
        /* 重新加载页面 */
        this.getRolesList()
        console.log("--------- 这是点击分配权限对话框结束 ---------")
      }
    }
  }
</script>
<style lang="less" scoped>
  .el-tag {
    margin: 7px;
  }

  .bdtop {
    border-top: 1px solid #eee;
  }

  .bdbottom {
    border-bottom: 1px solid #eee;
  }

  .vcenter {
    display: flex;
    align-items: center;
  }

</style>

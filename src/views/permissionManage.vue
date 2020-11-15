<template>
    <div>
  <!-- 卡片视图 -->
  <el-card>
    <!-- 角色列表区域 -->
    <el-table :data="rolelist" border stripe>
      <!-- 索引列 -->
      <el-table-column type="index"></el-table-column>
      <el-table-column label="角色名称" prop="uName"></el-table-column>
      <el-table-column label="用户角色" prop="uRole"></el-table-column>
      <el-table-column label="角色权限" prop="uPermission"></el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.uState" @change="userStateChanged(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300px">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteUser(scope.row.uId)">删除</el-button>
          <el-button size="mini" type="warning" icon="el-icon-setting" @click="showSetRightDialog(scope.row)">分配权限
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <!-- 分配权限的对话框 -->
  <el-dialog title="修改用户权限" :visible.sync="dialogVisible" width="30%">
    <!-- :model="rightslist"  -->
    <el-form label-width="80px" :model="rightslist">
      <el-form-item label="权限列表">
        <el-checkbox-group v-model="items">
          <el-checkbox v-for="i in rightslist.permission" :label="i" :key="i">{{i}}</el-checkbox>
          <el-checkbox label="add" >{{"增"}}</el-checkbox>
              <el-checkbox label="delete">{{"删"}}</el-checkbox>
              <el-checkbox label="update">{{"改"}}</el-checkbox>
              <el-checkbox label="search">{{"查"}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="modifyPermission()">修改</el-button>
        <el-button @click="setClose()">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

</div>
</template>

<script>
  export default {
    data() {
      return {
        // 修改权限的表单
        items: [],
        /* items:["1","2"],
          cities:[
          {id:'add',name:'增'},
          {id:'delete',name:'删'},
          {id:'update',name:'改'},
          {id:'search',name:'查'} 
        ],*/
        // 所有角色列表数据
        rolelist: {},
        rolelistA: {
          "uId": 0,
          "uName": "admin",
          "uRole": "admin",
          "uPermission": true
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
        } = await this.$http.get('user/getUser')

        if (res.code !== 200) {
          return this.$message.error('获取角色列表失败！')
        }
        console.log("接口调用返回的数据：" + res)
        //  赋值到rolelist渲染到列表上
        this.rolelist = res.data
        //  赋值后的rolelist
        console.log("赋值后的rolelist：" + this.rolelist)
        //  判断permission中的权限
        //顺便输出一下data中的原始数据
        console.log(this.rightslist)
        console.log("有没有东西")
        for (var i = 0; i < this.rolelist.length; i++) {

          /* this.rolelistA.uId =this.rolelist[i].uId
            console.log(this.rolelistA.uId)
            
            this.rolelistA.uName=this.rolelist[i].uName
            console.log(this.rolelistA.uName)
  
            this.rolelistA.uRole=this.rolelist[i].uRole
            console.log(this.rolelistA.uRole) */
          var state = this.rolelist[i].uState
          if (state == 0) {
            this.rolelist[i].uState = false
          } else if (state == 1) {
            this.rolelist[i].uState = true
          }
          /*  var a = this.rolelist[i].uPermission
            console.log(a)
            if(a !== 'null'){
              this.rolelist[i].uState = true
            console.log(this.rolelist[i].uPermission)
            console.log(this.rolelist[i].uState)
          } else{
          this.rolelist[i].uState = false
          console.log(this.rolelist[i].uPermission)
          console.log(this.rolelist[i].uState)
          
          } */

          /* 创建修改权限的表格data */
          var tempItems = ["add", "delete", "update", "search"]
          this.rightslist = {}
          this.items = []
          this.rightslist.permission = tempItems
        }
        console.log("有没有东西2")
        console.log("--------- 这是是获取所有角色的列表结束 ---------")
      },
      // 删除用户
      async deleteUser(uId) {
        console.log("--------- 这是开始是删除用户 ---------")
        const confirmResult = await this.$confirm(
          '此操作将永久删除该用户, 是否继续?',
          '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).catch(err => err)

        if (confirmResult !== 'confirm') {
          return this.$message.info('取消了删除！')
        }
        console.log(uId)
        const {
          data: res
        } = await this.$http.post("user/deleteUser", {
          uId: uId
        })
        /* 重新渲染页面 */
        this.getRolesList()
        console.log("--------- 这是是删除用户结束 ---------")

      },
      /* switch开关 */
      async userStateChanged(userinfo) {
        console.log("--------- 这是开始是控制开关 ---------")
        console.log(userinfo.uState)
        if (userinfo.uState == true) {
          const {
            data: res
          } = await this.$http.post("user/setUser", {
            uId: userinfo.uId,
            uState: 1
          })
        } else if (userinfo.uState == false) {
          const {
            data: res
          } = await this.$http.post("user/setUser", {
            uId: userinfo.uId,
            uState: 0
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
          // this.roleId = role.uId
          // 获取所有权限的数据
          // 把获取到的权限数据保存到 data 中
          // this.rightslist = res.data
          console.log("role:" + role)
        this.udpId = role.uId
        console.log("udpId是：" + this.udpId)
        //this.rightslist.permission = role.uPermission
        /* 测试rightslist */
        console.log("role.uPermission:" + role.uPermission)
        /* this.rightslist = {} */
        const arrP = role.uPermission.split(",")
        console.log("arrP：" + arrP)
        /* this.rightslist.permission = arrP */
        for (var i = 0; i < arrP.length; i++) {
          this.items[i] = arrP[i]
          console.log("arrP[i]:" + arrP[i])
          console.log("this.items[i]:" + this.items[i])

        }
        /* this.items = ["add","de"] */
        /* console.log(this.rightslist)
        console.log(this.rightslist.permission) */
        /* this.rightslist.items = [] */
        /* console.log(this.rightslist.permission[0]) */
        console.log("有没有执行到这里")
        console.log("--------- 这是是分配权限结束 ---------")
      },
      // 分配权限对话框的的确定事件
      async modifyPermission() {
        console.log("--------- 这是开始点击分配权限对话框 ---------")

        console.log("分配权限-点击了确定")
        console.log(this.items)
        console.log(this.items)
        console.log(this.udpId)
        const {
          data: res
        } = await this.$http.post("user/setUser", {
          uId: this.udpId,
          uPermission: this.items.toString()
        })
        if (res.code !== 200) {
          return this.$message.error('修改权限失败！')
        }
        console.log(res)
        this.$message.success('修改权限成功！')
        this.dialogVisible = false
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

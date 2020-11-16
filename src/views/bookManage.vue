<template>
  <div>
    <!-- 卡片视图 -->
    <el-card>
      <el-button type="primary" icon="el-icon-edit" style="margin-bottom: 20px;" @click="addBooks">添加书籍</el-button>
      <el-button type="warning" icon="el-icon-edit" style="margin-bottom: 20px;" @click="updKinds">管理类型</el-button>
      <el-input placeholder="请输入内容" suffix-icon="el-icon-search" v-model="searchPage.s"
        style="width: 300px;margin-left: 20px;" @change="searchBook">
      </el-input>
      <!-- 角色列表区域 -->
      <el-table :data="books" border stripe>
        <el-table-column label="书的编号" prop="id"></el-table-column>
        <el-table-column label="书名" prop="bookname"></el-table-column>
        <el-table-column label="出版社" prop="pub"></el-table-column>
        <el-table-column label="日期" prop="date"></el-table-column>
        <el-table-column label="类型" prop="kind"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <el-button size="mini" type="info" icon="el-icon-setting" @click="updBook(scope.row)">修改书籍</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="delBook(scope.row.id)">删除书籍</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 卡片视图结束 -->



    <!-- 新增书籍 -->
    <el-dialog title="书籍信息" :visible.sync="dialogFormVisible">
      <el-form :model="insertTable">
        <el-form-item label="书籍名称" :label-width="formLabelWidth">
          <el-input v-model="insertTable.bookname" autocomplete="off" placeholder="书籍名称"></el-input>
        </el-form-item>
        <el-form-item label="出版社" :label-width="formLabelWidth">
          <el-input v-model="insertTable.pub" autocomplete="off" placeholder="出版社"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input v-model="insertTable.price" autocomplete="off" placeholder="价格"></el-input>
        </el-form-item>
        <el-form-item label="书籍类型" :label-width="formLabelWidth">
          <el-select v-model="insertTable.kind" placeholder="选择类型">
            <el-option v-for='item in option' :value='item.kind' :key="item.id"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出版时间" :label-width="formLabelWidth">
          <el-date-picker type="date" placeholder="选择日期" v-model="insertTable.date" style="width: 100%;">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="数量" :label-width="formLabelWidth">
          <el-input v-model="insertTable.count" autocomplete="off" placeholder="数量"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="insertBook">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增书籍结束 -->

    <!-- 修改书籍 -->
    <el-dialog title="书籍信息" :visible.sync="UDPdialogFormVisible">
      <el-form :model="UDPTable">
        <el-form-item label="书籍名称" :label-width="formLabelWidth">
          <el-input v-model="UDPTable.bookname" autocomplete="off" placeholder="书籍名称"></el-input>
        </el-form-item>
        <el-form-item label="出版社" :label-width="formLabelWidth">
          <el-input v-model="UDPTable.pub" autocomplete="off" placeholder="出版社"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input v-model="UDPTable.price" autocomplete="off" placeholder="价格"></el-input>
        </el-form-item>
        <el-form-item label="书籍类型" :label-width="formLabelWidth">
          <el-select v-model="UDPTable.kind" placeholder="选择类型">
            <el-option v-for='item in option' :value='item.kind' :key="item.id"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出版时间" :label-width="formLabelWidth">
          <el-date-picker type="date" placeholder="选择日期" v-model="UDPTable.date" style="width: 100%;">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="数量" :label-width="formLabelWidth">
          <el-input v-model="UDPTable.count" autocomplete="off" placeholder="数量"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="UDPdialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="UDPBOOK">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改书籍结束 -->

  </div>
</template>
<script>
  export default {
    data() {
      return {
        /* 分页参数 */
        searchPage: {
          currentPage: "1",
          pageSize: "20",
          s: ""
        },
        /* 初始化参数 */
        page: {
          "currentPage": "1",
          "pageSize": "20"
        },
        books: {},
        /* 添加书籍的表单 */
        dialogFormVisible: false,

        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',
        /* 添加书籍的表单 */
        insertTable: {
          bookname: "",
          pub: "",
          price: "",
          date: "",
          count: "",
          kind: ""
        },
        /* 修改书籍的参数 */
        UDPdialogFormVisible: false,
        UDPTable: [],
        /* 分割 */
        option: {},
        appi: {}
      }


    },
    created() {
      this.init()
    },
    methods: {
      async init() {
        const {
          data: res
        } = await this.$http.post('book/getBook', this.page)
        this.books = res.data
      },
      async searchBook() {
        const {
          data: res
        } = await this.$http.post('book/queryBook', this.searchPage)
        if (res.data.length === 0) {
          this.$message.error("查询失败")
        }
        console.log(this.searchPage.s)
        console.log(res)
        console.log(res.data.length)
        this.books = res.data
      },
      async delBook(id) {
        const {
          data: res
        } = await this.$http.post('book/deleteBook', {
          "id": id
        })
        if (res.code != 200) {
          this.$message.error("删除失败")
        }
        this.$message.success("删除成功!")
        this.init()
      },
      async addBooks() {
        this.dialogFormVisible = true
        this.getKinds()
      },
      async insertBook() {
        const {
          data: res
        } = await this.$http.post('book/insertBook', this.insertTable)
        if (res.code != 200) {
          this.$message.error("添加失败")
        }
        console.log("res:" + res)
        console.log(this.insertTable)
        this.$message.success("添加成功!")

        this.dialogFormVisible = false
        this.insertTable = {}
        this.init()
      },
      updKinds() {
        this.dialogFormVisible = true
      },
      /* 修改书籍确定的按钮 */
      async UDPBOOK() {
        const {
          data: res
        } = await this.$http.post('book/updateBook', {
          "id": this.UDPTable
        })
        if (res.code !== 200) {
          this.$message.error("修改失败！")
        }
        this.$message.success("修改成功！")
      },
      /* 打开对话框的操作 */
      updBook(msg) {
        console.log(msg)
        this.UDPTable = msg
        this.UDPdialogFormVisible = true
        this.getKinds()
      },
      /* 获取书籍类型 */
      async getKinds() {
        const {
          data: res
        } = await this.$http.post('book/getKind')
        console.log(res)
        this.option = res.data
      }
    }
  }

</script>
<style></style>

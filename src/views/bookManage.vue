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
            <el-button size="mini" type="info" icon="el-icon-setting" @click="updBook(scope.row.id)">修改书籍</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="delBook(scope.row.id)">删除书籍</el-button>
          </template>
        </el-table-column>
      </el-table>


    </el-card>




    <el-dialog title="书籍信息" :visible.sync="dialogFormVisible">
      <el-form :model="insertTable">
        <el-form-item label="书籍名称" :label-width="formLabelWidth">
          <el-input v-model="insertTable.bookname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="出版社" :label-width="formLabelWidth">
          <el-input v-model="insertTable.pud" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input v-model="insertTable.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="书籍类型" :label-width="formLabelWidth">
          <el-select v-model="insertTable.kind">
            <el-option v-for='item in option' :value='item.kind' :key="item.id"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出版时间" :label-width="formLabelWidth">
          <el-input v-model="insertTable.date" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数量" :label-width="formLabelWidth">
          <el-input v-model="insertTable.count" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
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
        insertTable: {
          bookname: "",
          pud: "",
          price: "",
          date: "",
          count: "",
          kind: {}
        },
        option: {}
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
        const {
          data: res
        } = await this.$http.post('book/getKind')
        this.option = res.data.kind

      },
      async insertBook() {
        const {
          data: res
        } = await this.$http.post('book/insertBook', this.insertTable)
        if (res.code != 200) {
          this.$message.error("删除失败")
        }
        this.$message.success("删除成功!")
        this.init()
      },
      updKinds() {
        this.dialogFormVisible = true
      }
    }
  }

</script>
<style></style>

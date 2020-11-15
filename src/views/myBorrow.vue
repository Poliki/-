<template>
  <!-- 我的借阅区域 -->
  <el-card>
    <el-table :data="borrowlist" border stripe>
      <el-table-column label="借书的编号" prop="id"></el-table-column>
      <el-table-column label="书id" prop="bid"></el-table-column>
      <el-table-column label="书名" prop="bookname"></el-table-column>
      <el-table-column label="出版社" prop="pub"></el-table-column>
      <el-table-column label="日期" prop="date"></el-table-column>
      <el-table-column label="类型" prop="kind"></el-table-column>
      <el-table-column label="操作" width="300px">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-check" @click="returnBook(scope.row.id)">还书</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<style></style>
<script>
  export default {
    data() {
      return {
        /* 获取所有书籍信息赋值到这上面，再渲染上页面 */
        borrowlist: {},
        page: {
          "currentPage": "1",
          "pageSize": "20"
        }
      }
    },
    created() {
      this.init()
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      async init() {
        const {
          data: res
        } = await this.$http.post('book/getMyBook',this.page)
        this.borrowlist = res.data
      },
      async returnBook(id) {
        console.log(id)
        const {
          data: res
        } = await this.$http.post('book/returnBook',{"id":id})
        this.init()
      }
    }
  }

</script>
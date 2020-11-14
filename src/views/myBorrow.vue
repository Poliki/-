<template>
  <!-- 我的借阅区域 -->
  <el-card>
    <el-table :data="borrowlist" border stripe>
      <!-- 索引列 -->
      <el-table-column type="index"></el-table-column>
      <el-table-column label="借书的编号" prop="id"></el-table-column>
      <el-table-column label="书id" prop="bid"></el-table-column>
      <el-table-column label="书名" prop="bookname"></el-table-column>
      <el-table-column label="出版社" prop="pub"></el-table-column>
      <el-table-column label="日期" prop="date"></el-table-column>
      <el-table-column label="类型" prop="kind"></el-table-column>
      <el-table-column label="用户id" prop="userId"></el-table-column>
      <el-table-column label="操作" width="300px">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="returnBook(scope.row.id)">还书</el-button>
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
        obj: {},
        books: [],
        rolelist: [],
        activeIndex: '1',
        activeIndex2: '1',
        admin: false,
        addbooksform: {},
        dialogVisible: false,
        borrowlist: {}
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
        } = await this.$http.post('book/getBook')
        this.borrowlist = res.data
      }
    }
  }

</script>

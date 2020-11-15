<template>
 <!-- 卡片视图 -->
 <el-card>
    <el-button type="primary" icon="el-icon-edit" style="margin-bottom: 20px;" @click="addBooks">添加书籍</el-button>
    <!-- 角色列表区域 -->
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
          <el-button size="mini" type="info" icon="el-icon-setting" @click="updBook(scope.row.id)">修改书籍</el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="delBook(scope.row.id)">删除书籍</el-button>
        </template>
      </el-table-column>
    </el-table>

  </el-card>
  </template>
  <script></script>
  <style></style>

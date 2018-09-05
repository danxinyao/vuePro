<template>
    <div>
        <h1>这是 GoodsList 组件</h1>
        <el-button type="primary" icon="el-icon-search">查询 </el-button>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" align="center" label="日期" min-width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" align="center" min-width="180">
            </el-table-column>
            <el-table-column prop="address" align="center" min-width="180" label="地址">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }]
        }
    }
}
</script>
<style>
</style>
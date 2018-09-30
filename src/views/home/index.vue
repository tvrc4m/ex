<template>
    <div>
        <el-select v-model="selected_coin" placeholder="请选择" style="margin-bottom: 20px">
            <el-option v-for="coin in coins" :key="coin.name" :label="coin.token+'@'+coin.name" :value="coin.name"></el-option>
        </el-select>
        <el-table :data="sellers" style="width: 100%" header-cell-class-name="seller-header">
            <el-table-column prop="seller" label="卖家"></el-table-column>
            <el-table-column prop="amount" label="单价"></el-table-column>
            <el-table-column prop="count" label="数量"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="buy">购买</el-button>
                    <el-button type="primary" size="small" @click="cancel">撤单</el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination :total="total"></pagination>
    </div>
</template>

<script lang="ts">
    import { Component,Provide,Vue } from 'vue-property-decorator'
    import { Row,Col,Select,Option,Table,TableColumn,Button,Pagination } from 'element-ui'
    import pagination from '@/components/common/pagination'
    import { TypeCoin } from '@/type/coin'

    Vue.use(Row)
    Vue.use(Col)
    Vue.use(Select)
    Vue.use(Option)
    Vue.use(Table)
    Vue.use(TableColumn)
    Vue.use(Button)
    Vue.use(Pagination)

    const sellers=[
        {
            seller:"eostonystark",
            amount:"10.0200 EOS",
            count:12,
            coin:"eosbtextoken@bt"
        }
    ]

    @Component({
        components:{
            pagination
        }
    })
    export default class HomeIndex extends Vue{

       @Provide() coins:TypeCoin[]=this.$store.state.coin.coins
       @Provide() selected_coin=this.$store.state.coin.selected
       @Provide() sellers=sellers
       @Provide() total=sellers.length

       buy(){

       }

       cancel(){

       }
    }
</script>

<style lang="scss" scoped>
    
</style>
<style lang="css">
    .ram-calc .ram-input{
        width: 80px !important;
        display: inline-block;
    }
    .ram-calc .el-input__inner{
        height: 32px !important;
        line-height: 32px !important;
        width: 80px !important;
    }
</style>

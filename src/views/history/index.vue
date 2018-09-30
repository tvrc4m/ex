<template>
    <div>
        <el-select v-model="selected_coin" placeholder="请选择" style="margin-bottom: 20px">
            <el-option v-for="coin in coins" :key="coin.name" :label="coin.token+'@'+coin.name" :value="coin.name"></el-option>
        </el-select>
         <el-table :data="histories" style="width: 100%" header-cell-class-name="seller-header">
            <el-table-column prop="buyer" label="买家"></el-table-column>
            <el-table-column prop="seller" label="卖家"></el-table-column>
            <el-table-column prop="amount" label="单价"></el-table-column>
            <el-table-column prop="count" label="数量"></el-table-column>
            <el-table-column label="总价">
                <template slot-scope="scope">
                    <!-- {{}} -->
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts">
    import { Component,Provide,Vue } from 'vue-property-decorator'
    import { Row,Col,Select,Option,Table,TableColumn,Button } from 'element-ui'
    import { TypeCoin } from '@/type/coin'

    Vue.use(Row)
    Vue.use(Col)
    Vue.use(Select)
    Vue.use(Option)
    Vue.use(Table)
    Vue.use(TableColumn)
    Vue.use(Button)

    const histories=[
        {
            buyer:"eosluckystar",
            seller:"eostonystark",
            amount:"10.0200 EOS",
            count:12,
            coin:"eosbtextoken@bt"
        }
    ]

    @Component({})
    export default class HomeIndex extends Vue{

       @Provide() coins:TypeCoin[]=this.$store.state.coin.coins
       @Provide() selected_coin=this.$store.state.coin.selected
       @Provide() histories=histories

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

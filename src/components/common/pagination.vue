<template>
    <el-row class="pagination">
        <el-pagination background layout="pager,total" :page-size="size" :total="total"></el-pagination>
    </el-row>
</template>

<script lang="ts">
    import { Component,Provide,Vue,Prop } from 'vue-property-decorator'
    import { Row,Pagination } from 'element-ui'

    Vue.use(Row)
    Vue.use(Pagination)

    @Component({})
    export default class ComponentPagination extends Vue{

        @Prop({type:Number,default:0}) total:Number
        @Prop({type:Number,default:20}) size:Number
    }
</script>
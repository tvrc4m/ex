<template>
    <el-container class="app-container">
        <el-container>
            <el-header :style="{padding: 0}" height="64px">
                <global-header :logo="logo" :current-user="currentUser" @menu-click="handleMenuClick" @lang-click="handleLangClick"></global-header>
            </el-header>
            <el-main :style="{'padding-bottom': 0}">
                <el-card class="box-card">
                    <router-view :breadcrumbNameMap="breadcrumbNameMap">
                        <div slot="header"></div>    
                    </router-view>
                </el-card>
            </el-main>
        </el-container>
    </el-container>
</template>

<script lang="ts">
    import { Component,Provide,Vue } from 'vue-property-decorator'

    import { Container,Header,Main,Card } from 'element-ui'

    import GlobalHeader from '@/components/global/header.vue'

    Vue.use(Container)
    Vue.use(Header)
    Vue.use(Main)
    Vue.use(Card)

    @Component({
        components:{
            GlobalHeader,
        }
    })
    export default class LayoutBasic extends Vue{

        @Provide() logo:String='@/assets/logo.png'
        @Provide() breadcrumbNameMap=[]

        get currentUser():String{
            return 't.wei'
        }

        handleMenuClick(command: string) {
            if (command === 'logout') {
                this.$store.dispatch('login/logout')
            }else if(command === 'user'){

            }else if(command === 'setting'){

            }
        }

        handleLangClick(command:string){
            console.log('you have changed the language to '+command)
            if(command=='zh'){
                this.$i18n.locale='zh'
            }else if(command=='en'){
                this.$i18n.locale='en'
            }
            localStorage.setItem("lang",command)
        }

        mounted(){
            var lang=localStorage.getItem("lang")
            if(lang){
                this.$i18n.locale=lang
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~theme/theme.scss';

    .app-container {
        position: relative;
        height: 100%;
        background: $layout-body-background;
    }

    .github-icon {
        font-size: 20px;
    }
</style>
<style lang="scss">
    .card-header{
        height: 40px;
        line-height: 40px;
        margin-bottom:20px;
        border-bottom:1px solid #f2f2f2;
        .title{
            font-size:16px;
            font-weight: bold;
        }
        .actions{
            font-size:12px;
            float: right;
            display:inline-block;
            .el-button--text{
                padding: 3px 0;
            }
        }
    }
    .pagination{
        margin:20px 0;
        width:100%;
        text-align:center;
    }
</style>

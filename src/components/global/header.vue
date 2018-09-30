<template>
    <div class="global-header">
        <div class="left">
            <div v-for="action in actions" :class="['actions',{active:action.group==$route.meta.group}]">
                <span class="action account" @click="$router.push(action.href)">
                    {{action.name}}
                </span>
            </div>
        </div>
        <div class="right">
            <div v-if="!islogin" class="actions">
                <span class="action" @click="login">登录</span>
            </div>
            <el-dropdown v-else class="account" @command="onAccountClick">
                <span class="name el-dropdown-link">{{account.name}}</span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown  class="lang" @command="onLangClick">
                <span class="account">
                    <span class="name el-dropdown-link">{{selectedLang}}</span><i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="lang in langs" :command="lang.value">{{lang.name}}</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script lang="ts">

    import { Component,Provide,Watch,Vue } from 'vue-property-decorator'
    import { Dropdown,DropdownMenu,DropdownItem,Loading } from 'element-ui'
    import { mapGetters } from 'vuex'

    Vue.use(Dropdown)
    Vue.use(DropdownMenu)
    Vue.use(DropdownItem)
    Vue.use(Loading)

    const actions=[
        {
            name:"首页",
            href:"/",
            group:"home"
        }
    ]

    const langs=[
        {
            name:"中文",
            value:"zh"
        },
        {
            name:"English",
            value:"en"
        },
    ];

    @Component({})
    export default class GlobalHeader extends Vue{

        @Provide() actions=actions
        @Provide() langs=langs;
        @Provide() selectedLang='中文';

        get islogin(){
            return this.$store.getters['scatter/islogin']
        }

        get account(){
            console.log(this.$store.state)
            return this.$store.state.scatter.account
        }
        
        onLangClick(command:string){
            for(let index in this.langs){
                if(command==this.langs[index].value){
                    this.selectedLang=this.langs[index].name
                    break;
                }
            }
            this.$emit('lang-click',command)
        }

        onAccountClick(command:string){
            if(command=='logout'){
                this.$store.dispatch("scatter/disconnect")
            }
        }

        mounted(){
            var lang=localStorage.getItem("lang")
            if(lang){
                this.langs.forEach(item=>{
                    if(item.value==lang){
                        this.selectedLang=item.name
                    }
                })
            }
        }

        login(){
            this.$store.dispatch('scatter/connect').then(()=>{
                this.$store.dispatch('scatter/identity').then((account)=>{
                    console.log(account)
                })
            })
        }
    }
</script>

<style lang="scss" scoped>
    @import '~theme/theme.scss';

    .global-header {
        height: 64px;
        padding: 0 12px 0 0;
        background: #fff;
        box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
        position: relative;
        display: flex;
        justify-content: space-between;

        .trigger {
            font-size: 20px;
            line-height: 64px;
            cursor: pointer;
            transition: all 0.3s;
            padding: 0 24px;
            &:hover {
                background: $primary-1;
            }
        }
        .actions{
            &.popover-open,
            &:hover {
                background: $primary-1;
            }
            &.active{
                background-color:$primary-1;
            }
        }
        .action {
            cursor: pointer;
            padding: 0 12px;
            transition: all 0.3s;
            height: 100%;
            display: flex;
            align-items: center;
            > i {
                font-size: 16px;
                vertical-align: middle;
            }
        }
        .lang,.account {
            cursor: pointer;
            padding: 0 12px;
            transition: all 0.3s;
            height: 100%;
            display: flex;
            align-items: center;
            text-align: center;
            color:#40a9ff;
            font-size:14px;
            font-weight:bold;
            > i {
                font-size: 16px;
                vertical-align: middle;
            }
            &.popover-open,
            &:hover {
                background: $primary-1;
            }
            .name{
                line-height:64px;
                height:64px;
            }
        }
        .search {
            padding: 0;
            margin: 0 12px;
            &:hover {
                background: transparent;
            }
        }
        .left,.right{
            height: 100%;
            display: flex;
            align-items: center;
            text-align: center;
            padding-left:100px;
            .actions{
                line-height:64px;
                height:64px;
                width:90px;
                padding:0 5px;
                text-align:center;
                .action{
                    display:inline-block;
                    width:100%;
                }
            }
            .item{
                cursor: pointer;
                padding: 0 12px;
                transition: all 0.3s;
                height: 100%;
                padding:0 10px;
                display: flex;
                align-items: center;
                text-align: center;
                font-size:14px;
                font-weight:bold;
                &.first{
                    margin-left:30px;
                }
            }
        }
        .right {
            height: 100%;
            display: flex;
            align-items: center;
            text-align: center;
            .notice {
                padding: 0;
            }
            .account {
                .avatar {
                    margin: 20px 8px 20px 0;
                    color: $primary-color;
                    background: rgba(255, 255, 255, 0.85);
                    vertical-align: middle;
                }
            }
            .loading-wrapper {
                .loading {
                    width: 30px;
                    height: 30px;

                    /deep/ .el-loading-spinner {
                        margin-top: -15px;
                        .circular {
                            width: 30px;
                            height: 30px;
                        }
                    }
                }
            }
        }
    }
</style>

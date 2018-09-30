import vuex from "Vuex"
import ScatterJS from 'scatterjs-core'
import Eos from 'eosjs'

const appname="eosex"

type TypeAccount={
    name:String,
    authority:String,
    blockchain:String
}

type TypeTransfer={
    from:String,
    to:String,
    amount:String,
    memo:String
}

type TypeScatter={
    isExtension:boolean,
    identity:{
        accounts:TypeAccount[],
        hash:String,
        kyc:boolean,
        name:String,
        publicKey:String
    },
    eos:any,
    eth:any,
    connect:any
}

type TypeState={
    connected: boolean
    scatter: TypeScatter,
    account:TypeAccount
}

const state={
    connected:false,
    scatter:<TypeScatter>{},
    account:{
        name:'',
        authority:'',
        blockchain:'eos'
    }
}

const getters={
    permission:state=>{
        return { authorization:[`${state.account.name}@${state.account.authority}`] };
    },
    islogin:state=>{
        return  !!state.account.name?true:false
    }
}

const mutations={
    setIdentity(state:TypeState,account:TypeAccount){
        state.account=account
    },
    setConnected(state:TypeState,connected:boolean){
        state.connected=connected
    },
    setScatter(state:TypeState,scatter:any){
        console.log('scatter',scatter)
        state.scatter=scatter
    }
}

const actions={
    connect({commit},payload:any){
        return new Promise((resolve,reject)=>{
            ScatterJS.scatter.connect(appname).then(connected => {
                if(!connected) {
                    // User does not have Scatter installed/unlocked.
                    commit('setConnected',false)
                    reject()
                }else{
                    commit('setConnected',true)
                    commit('setScatter',ScatterJS.scatter)
                    resolve()
                }
            }).catch(error=>{
                console.log('scatter connect error',error)
                reject(error)
            })
        })
    },
    disconnect({commit}){
        return new Promise((resolve,reject)=>{
            ScatterJS.scatter.forgetIdentity()
            commit('setIdentity',<TypeAccount>{})
            commit('setConnected',false)
            resolve()
        })
    },
    identity({commit,dispatch}){
        return new Promise((resolve,reject)=>{
            ScatterJS.scatter.getIdentity({accounts:[process.env.SCATTER_CONFIG]}).then(()=>{
                if(!ScatterJS.scatter.identity){
                    reject('no account')
                    return
                }
                const account = ScatterJS.scatter.identity.accounts.find(x => x.blockchain === 'eos');
                if(!account){
                    reject('no account')
                    return
                }
                commit('setIdentity',account)
                resolve(account)
                // scatter.authenticate().then(signedOrigin => {
                //     console.log(signedOrigin)
                // }).catch(failedAuthentication => {
                //     console.log(failedAuthentication)
                // })
               
            }).catch(error=>{
                if(error.type=='identity_rejected'){
                    dispatch("disconnect").then(()=>{
                        dispatch("identity")
                    })
                }
            })
        })
    },
    transfer({state,getters,dispatch},payload:TypeTransfer){
        if(!state.connected){
            dispatch("connect").then(()=>{
                if(!state.account.name){
                    dispatch("identity").then(()=>{
                        dispatch("transfer",payload)
                    })
                }
            })
            return
        }
        const eos = ScatterJS.scatter.eos(process.env.SCATTER_CONFIG, Eos, process.env.EOS_CONFIG);
        console.log('permission',getters.permission)
        console.log('account',state.account)
        eos.transfer(state.account.name, payload.to, payload.amount, payload.memo, getters.permission).then(trx => {
            console.log(trx)
            console.log(`Transaction ID: ${trx.transaction_id}`);
        }).catch(error => {
            console.error(error);
        });
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}
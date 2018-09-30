import { TypeCoin } from '@/type/coin'

type State={
    coins:TypeCoin[],
    selected:string
}

const state:State={
    coins:[
        {
            name:"所有币种",
            token:""
        },
        {
            name:"bt",
            token:"eosbtextoken"
        },
        {
            name:"epra",
            token:"epratokenex"
        }
    ],
    selected:"所有币种"
}

export default {
    namespaced: true,
    state,
}
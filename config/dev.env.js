'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    BASE_URL: '"http://localhost:8082"',
    SCATTER_CONFIG:{
        blockchain: '"eos"',
        protocol: '"https"',
        host: '"mainnet.eoscannon.io"',
        port: 443,
        chainId: '"aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906"'
    },
    EOS_CONFIG:{
        chainId: '"aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906"',
        httpEndpoint: '"https://mainnet.eoscannon.io"',
        verbose: true
    }
})

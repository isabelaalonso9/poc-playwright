require('dotenv').config()

const connectionStrings = {
  uat: {
    vxLogin: 'mongodb://vadmin:C%40bul0s0Vortx@cluatvortxsp02-shard-00-00.lozec.mongodb.net:27017,cluatvortxsp02-shard-00-01-lozec.mongodb.net:27017,cluatvortxsp02-shard-00-02-lozec.mongodb.net:27017/admin?authSource=admin&replicaSet=atlas-yjmcin-shard-0&connectTimeoutMS=10000&readPreference=primary&authMechanism=SCRAM-SHA-1&appname=MongoDB%20Compass&ssl=true',
    vxCadastro: 'mongodb://vadmin:C%40bul0s0Vortx@cluatvortxsp01-shard-00-00-lozec.mongodb.net:27017,cluatvortxsp01-shard-00-01-lozec.mongodb.net:27017,cluatvortxsp01-shard-00-02-lozec.mongodb.net:27017/admin?ssl=true&replicaSet=CLUATVORTXSP01-shard-0&connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-1',
  },
  prod: {
    vxLogin: 'mongodb://vadmin:C%40bul0s0Vortx@clprdvortxsp02-shard-00-01.sd7ld.mongodb.net:27017,clprdvortxsp02-shard-00-00.sd7ld.mongodb.net:27017,clprdvortxsp02-shard-00-02.sd7ld.mongodb.net:27017/admin?authSource=admin&replicaSet=atlas-cjxc9k-shard-0&connectTimeoutMS=10000&readPreference=primary&authMechanism=SCRAM-SHA-1&appname=MongoDB%20Compass&ssl=true',
    vxCadastro: 'mongodb://vadmin:C%40bul0s0Vortx@clprdvortxsp01-shard-00-00.sd7ld.mongodb.net:27017,clprdvortxsp01-shard-00-01.sd7ld.mongodb.net:27017,clprdvortxsp01-shard-00-02.sd7ld.mongodb.net:27017/admin?ssl=true&replicaSet=CLPRDVORTXSP01-shard-0&authSource=admin&retryWrites=true',
  },
};

module.exports = connectionStrings;

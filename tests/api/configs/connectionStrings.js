require('dotenv').config()

const connectionStrings = {
  uat: {
    vxLogin: process.env.VXLOGIN_UAT,
    vxCadastro: process.env.VXCADASTRO_UAT,
  },
  prod: {
    vxLogin: process.env.VXLOGIN_PROD,
    vxCadastro: process.env.VXCADASTRO_PROD,
  },
};

module.exports = connectionStrings;

const environments = {
  uat: {
    vxLogin: 'https://apis-stg.vortx.com.br/vxlogin/api',
    vxCadastro: 'https://apis-stg.vortx.com.br/vxcadastro/api',
  },
  prod: {
    vxLogin: 'https://apis.vortx.com.br/vxlogin/api',
    vxCadastro: 'https://apis.vortx.com.br/vxcadastro/api',
  },
  local: {
    vxLogin: 'http://localhost:54951/',
    vxCadastro: 'http://localhost:52296/',
  },
};

module.exports = environments;

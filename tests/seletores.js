const seletores = {
  sidebar: {
    enviaConviteOpcao: 'a[href="/admin/invitation"]',
    analiseCadastralOpcao: 'a[href="/admin/registration"]',
    proximosVencimentosOpcao: 'a[href="/admin/expiration"]',
    motivosReprovacaoOpcao: 'a[href="/admin/return-reasons"]',
    suitabilityOpcao: 'a[href="/admin/suitability"]',
  },

  portal: {
    documentoInput: '[placeholder="Informe seu CPF"]',
    entrarButton: 'button:has-text("Entrar")',
    botaoTeclado: (digito) => `//button[contains(text(), "${digito}")][contains(@class, "btnKeyboars")]`
  },

  escolhaProdutos: {
    bemVindoText: 'h3[class="box-title m-t-20 m-b-0 font-20"]',
  },

  envioConvitePage: {
    documentoInput: '.form-material > :nth-child(1) > .form-control',
    emailInput: '.form-material > :nth-child(2) > .form-control',
    enviaConviteButton: 'div[class="form-group form-default"] button',
    conviteSucessoText: '#swal2-content',
  },
}

module.exports = { seletores }
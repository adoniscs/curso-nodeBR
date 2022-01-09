/*
  0 - Obter um usuário
  1 - Obter o número de telefone de um usuário a partir de seu ID
  2 - Obter o endereço do usuário pelo ID
*/

function obterUsuario(callback) {
  setTimeout(() => {
    return callback(null, {
      id: 1,
      nome: 'Fred',
      dataNascimente: new Date(),
    })
  }, 1000)
}

function obterTelefone(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      telefone: '1123-0430',
      ddd: 11,
    })
  }, 2000)
}

function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: 'São Joaquin',
      numero: 121,
    })
  }, 2000)
}

function resolverUsuario(error, usuario) {
  console.log('usuário', usuario)
}

obterUsuario(function resolverUsuario(error, usuario) {
  // null || "" || 0 === false
  if (error) {
    console.log('Deu ruim em usuário')
    return
  }
  obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
    if (error1) {
      console.log('Deu ruim em usuário')
      return
    }
    obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
      if (error2) {
        console.log('Deu ruim em usuário')
        return
      }

      console.log(`
        Nome: ${usuario.nome},
        Endereço: ${endereco.rua},${endereco.numero},
        Telefone: (${telefone.ddd})${telefone.telefone}
      `);
    })
  })
})

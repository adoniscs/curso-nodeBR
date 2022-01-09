/*
  0 - Obter um usuário
  1 - Obter o número de telefone de um usuário a partir de seu ID
  2 - Obter o endereço do usuário pelo ID
*/
// importar um módulo interno do node.js
const util = require('util')

// converter uma função callback em Promise
const obeterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario() {
  // quander der algum problema -> reject(ERROR)
  // quando sucesso -> resolve
  return new Promise(function resolvePromisse(resolve, reject) {
    setTimeout(() => {
      return resolve({
        id: 1,
        nome: 'Fred',
        dataNascimente: new Date(),
      })
    }, 1000)
  })
}

function obterTelefone(idUsuario) {
  return new Promise(function resolverPromisse(resolve, reject) {
    setTimeout(() => {
      return resolve({
        telefone: '1123-0430',
        ddd: 11,
      })
    }, 2000)
  })
}

function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: 'São Joaquin',
      numero: 121,
    })
  }, 2000)
}

const usuarioPromise = obterUsuario()

// para manipular o sucesso usamos a função .then()
usuarioPromise
  .then(function (usuario) {
    return obterTelefone(usuario.id).then(function resolverTelefone(result) {
      return {
        usuario: {
          nome: usuario.nome,
          id: usuario.id,
        },
        telefone: result,
      }
    })
  })
  .then(function (resultado) {
    const endereco = obeterEnderecoAsync(resultado.usuario.id)
    return endereco.then(function resolverEndereco(result) {
      return {
        usuario: resultado.usuario,
        telefone: resultado.telefone,
        endereco: result
      }
    })
  })
  .then(function (resultado) {
    console.log(`
      Nome: ${resultado.usuario.nome},
      Endereço: ${resultado.endereco.rua}, ${resultado.endereco.numero}
      Telefone: (${resultado.telefone.ddd})${resultado.telefone.telefone}
    `)
  })
  // para manipular o erro, usamos a função .catch()
  .catch(function (error) {
    console.error('Deu ruim', error)
  })

/*
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
*/

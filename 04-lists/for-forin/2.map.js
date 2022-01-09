const service = require('./service')

Array.prototype.meuMap = function (callback) {
  const novoArrayMapeado = []
  for (let indice = 0; indice <= this.length - 1; indice++) {
    const resultado = callback(this[indice], indice)
    novoArrayMapeado.push(resultado)
  }

  return novoArrayMapeado
}

async function main() {
  try {
    const results = await service.obterPessoas(`a`)
    // const names = [] // usando o map, eu não preciso de uma variavel auxiliar

    // results.results.forEach(function (result) {
    //   names.push(result.name)
    // })

    // const names = results.results.map(function(pessoa) {
    //   return pessoa.name
    // })

    // const names = results.results.map(pessoa => pessoa.name)

    // usando o meuMap
    const names = results.results.meuMap(function (pessoa) {
      return pessoa.name
    })
    console.log(names)
  } catch (error) {
    console.error('Deu ruim', error)
  }
}

main()

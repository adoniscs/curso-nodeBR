const { obterPessoas } = require('./service')

// criando minha própria função filter()
Array.prototype.myFilter = function (callback) {
  const lista = []

  for (let index in this) {
    const item = this[index]
    const resultado = callback(item, index, this)
    // 0, "", null, undefined === false
    if (!resultado) continue
    lista.push(item)
  }

  return lista
}

async function main() {
  try {
    const { results } = await obterPessoas('a')

    //const falimiaLars = results.filter(item => {
    // por padrão precisa retornar um booleano
    // para informar se deve manter ou remover da lista
    // false -> remove da lista
    // true -> mantem na lista
    // se não encontrar, retorna -1
    // se encontrar, retorna a posição no array
    //const result = item.name.toLowerCase().indexOf(`lars`) !== -1
    // return result

    const familiaLars = results.myFilter((item, index, lista) => {
      console.log(`index: ${index}`, lista.length)
      return item.name.toLowerCase().indexOf('lars') !== -1
    })

    const names = familiaLars.map(pessoa => pessoa.name)
    console.log(`Os membros da família Lars, são: ${names.join(', ')}.`)
  } catch (error) {
    console.error('Deu erro', error)
  }
}

main()

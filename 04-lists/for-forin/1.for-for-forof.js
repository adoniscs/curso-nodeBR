const service = require('./service')

async function main() {
  try {
    const result = await service.obterPessoas('a')
    const names = []

    console.time('for')
    for (let i = 0; i <= result.results.length - 1; i++) {
      const pessoa = result.results[i]
      names.push(pessoa.name)
    }
    console.timeEnd('for')
    console.log(`names`, names)

    console.time('for in')
    for (let i in result.results) {
      const pessoa = result.results[i]
      names.push(pessoa.name)
    }
    console.timeEnd('for in')
    console.log(`nomes:`, names)

    console.time('for of')
    for (let pessoa of result.results) {
      names.push(pessoa.name)
    }

    console.timeEnd('for of')
    console.log(`nomes:`, names)

  } catch (error) {
    console.error('Erro interno ', error)
  }
}

main()

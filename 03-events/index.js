const EventEmitter = require('events')

class MeuEmissor extends EventEmitter {}

const meuEmissor = new MeuEmissor()
const nomeEvento = 'usuario:click'
meuEmissor.on(nomeEvento, function (click) {
  console.log('um usuário clicou', click)
})

/*
meuEmissor.emit(nomeEvento, 'na barra de rolagem')
meuEmissor.emit(nomeEvento, 'no ok')

let count = 0
setInterval(() => {
  meuEmissor.emit(nomeEvento, 'no ok ' + (++count) + 'x') 
}, 1000)
*/

/*
const stdin = process.openStdin()
stdin.addListener('data', function(value){
  console.log(`Você digitou: ${value.toString().trim()}`)
})
*/

// evitar esse tipo de "erro"
// neste caso de uso, a função será executado apenas
// 1x (padrão da Promise)
const stdin = process.openStdin()

function main() {
  return new Promise(function (resolve, reject) {
    stdin.addListener('data', function (value) {
      // console.log(`Você digitou: ${value.toString().trim()}`)
      return resolve(value.toString())
    })
  })
}

main().then(function (resultdo) {
  console.log('resultado: ', resultdo)
})

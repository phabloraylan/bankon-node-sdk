# BankOn Node SDK

Essa biblioteca permite você se conectar com https://dev.bankon.com.br através do seu sistema.

## Instalando

Usando npm:

```bash
npm install bankon
```

Usando yarn:

```bash
yarn add bankon
```

## Exemplos

```js
const bankon = require('bankon')

const app = bankon.initializeApp({
    tokenConsulta: "45454656456",
    tokenTransferencia: "5546546545"
})

app.consultarSaldo()
    .then(response => {
        console.log(response.data)
    })
    .catch(error => {
        console.log(error)
    })

app.consultarExtrato(new Date(2020, 0), new Date(), "C")
    .then(response => {
        console.log(response.data)
    })
    .catch(error => {
        console.log(error)
    })

app.consultarUsuario("usuario")
    .then(response => {
        console.log(response.data)
    })
    .catch(error => {
        console.log(error)
    })

app.consultarTransferencia("545465655465465")
    .then(response => {
        console.log(response.data)
    })
    .catch(error => {
        console.log(error)
    })

app.transferencia("usuario", 10, "fatura #14")
    .then(response => {
        console.log(response.data)
    })
    .catch(error => {
        console.log(error)
    })
```

## Licença

[MIT](LICENSE)

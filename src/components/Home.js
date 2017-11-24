import React, { Component } from 'react';

import Paper from 'material-ui/Paper';

const paperStyle = {
  height: '100%',
  margin: 20,
  textAlign: 'center',
  padding: '50px 30px 40px 30px'
};

export default class Home extends Component {
  render() {
    return (
      <Paper style={paperStyle} zDepth={2} rounded>
        <div className="container">
          <h2 className="mb-4">Cartão fidelidade digital</h2>
          <h5>Como funciona?</h5>
          <p>
            Basta você se cadastrar em nosso site e pronto! Você poderá utilizar
            em seu estabelecimento o Fideliza Card.
          </p>
          <p>
            Informe seus clientes sobre nosso app disponível na{' '}
            <a href="#">Google Play</a>. Assim que seu cliente utilizar seu
            serviço, ele pode utilizar o App para registrar o uso através de um
            QR Code que você gera. Seja um almoço, um corte de cabelo ou
            qualquer serviço que você fornece.
          </p>
          <p>
            Após a quantidade de uso configurada em seu QR Code, você pode
            fornecer um desconto ou qualquer tipo de reward para seu cliente.
            Fidelize seus clientes!
          </p>
        </div>
      </Paper>
    );
  }
}

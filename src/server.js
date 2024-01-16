const app = require('./app');
const { syncModels } = require('./database/models/index');

function normalizaPort(val) {
    const port = parseInt(val, 10);
    if (Number.isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}

const port = normalizaPort(process.env.PORT || '3001');
// Sincronize os modelos com o banco de dadossistem-ponto
syncModels() // { force: true } usar para dropar o banco
  .then(() => {
    console.log('Modelos sincronizados com o banco de dados.');
    // Inicie o servidor Express após sincronizar os modelos
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao sincronizar modelos:', error);
  });
// Importando o módulo do JSON Server
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db/db.json');  // Caminho para o db.json
const middlewares = jsonServer.defaults();

// Usando os middlewares padrão (para logs e CORS, por exemplo)
server.use(middlewares);

// Servindo o arquivo db.json
server.use('/api', router);  // Acessar os dados pela URL /api

// Definindo a porta do servidor
const PORT = 5000;
server.listen(PORT, () => {
    console.log(`JSON Server está rodando em http://localhost:${PORT}`);
});

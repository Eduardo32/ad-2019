# ad-2019

Projeto para cadas de pessoal para organizar amigo invisível com backend desenvolvido em Node com Express e Mongoose usando banco de dados MongoDB e Frontend em React usando Axios para acessar a API do backend

## Instruções

1. Clonar o repositorio 

`git clone https://github.com/Eduardo32/ad-2019`

2. Entrar na pasta **backend** `cd backend` e executar o comando `npm install` para executar as dependencias do projeto e em seguida `node .\src\server.js` para rodar o backend

3. Entrar na pasta **frontend** `cd frontend` e executar o comndo `npm install` para executar as dependencias do projeto e em seguida `npm start` para rodar o frontend

## Funcionamento

É possivel cadastrar os participantes do amigo invisível no formulario a esquerda, que em seguida será exibido em um card a direita. Apos isso sera possivel editar nome e email dos participantes cadastrados clicando em editar ou exclui-los clicando em excluir. Na parte de opções é possivel realizar o sorteio dos amigos para os participantes, após relizar o sorteio não sera permitido editar ou excluir participantes. É possivel tambem iniciar um novo amigo invisível, nesse caso todos os participantes cadastrados serão excluidos.

### Obs

Envio de email para participantes não implementado

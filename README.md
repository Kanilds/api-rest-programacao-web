API desenvolvida para apresentação na disciplina de Programação Web II lecionada pelo orientador Wesley Ferreira, onde o mesmo pediu para desenvolver uma aplicação com Back-End e Front-End.

# Back-End

Api desenvolvida em NodeJS com acesso a banco de dados não relacional = MongoDB.

- Para buildar o backend é necessário que sigam os seguintes passos:
  &#8594; git clone https://github.com/LeandroJOA/api-rest-programacao-web
  &#8594; cd api-rest-programacao-web/backend
  &#8594; npm install
  &#8594; npm start

As rotas para acessar a API estão na pasta [routes](https://github.com/LeandroJOA/api-rest-programacao-web/tree/main/backend/routes). Você pode testar as rotas antes de usar o frontend com o software Insomnia/Postman passando a [URL](https://localhost:4000) e inserindo a rota desejada.

# Front-End

Frontend web, desenvolvido em Angular11 com o PrimeNG para dar o style na tabela e no CRUD.
  
- Para buildar o frontend para verificar a view sigam os seguintes passos:
  &#8594; git clone https://github.com/LeandroJOA/api-rest-programacao-web
  &#8594; cd api-rest-programacao-web/frontend
  &#8594; npm install
  &#8594; ng serve

A página web normalmente se comunica com a API por meio de requisições http, as quais retornam para o frontend como um objeto json. Podemos visualizar as telas criadas através do [URL](https://localhost:4200)
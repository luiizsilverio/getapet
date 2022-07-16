# GETAPET 🐕🐩🐕‍🦺🐈

## Conteúdo
* [Sobre o Projeto](#sobre-o-projeto)
* [Tecnologias](#hammer_and_wrench-tecnologias)
* [Licença](#balance_scale-licença)
* [Contato](#email-contato)

## Sobre o projeto
API desenvolvida em __Node.js__ com __Mongoose__, durante o curso [Node.js do Zero a Maestria com diversos Projetos](https://www.udemy.com/course/nodejs-do-zero-a-maestria-com-diversos-projetos/), do prof. Matheus Battisti.<br />
Possui autenticação JWT, upload de imagens, cadastro usuários e de animais.<br />

### Rotas da aplicação

| Método | Caminho da Rota | Descrição da Rota |
|---|---|---|
| PATCH | http://localhost:3000/users/edit/:id | Altera os dados do usuário |
| GET | http://localhost:3000/users/:id | Busca os dados do usuário pelo Id |
| GET | http://localhost:3000/users/checkuser | Busca os dados do usuário ref. Token |
| POST | http://localhost:3000/users/login | Login do usuário |
| POST | http://localhost:3000/users/register | Cadastra novo usuário |
| POST | http://localhost:3000/pets/conclude/:id | Conclui a adoção do animal |
| POST | http://localhost:3000/pets/schedule/:id | Agenda uma visita para conhecer o animal |
| PATCH | http://localhost:3000/pets/:id | Altera os dados do animal |
| DELETE | http://localhost:3000/pets/:id | Exclui um animal |
| GET | http://localhost:3000/pets/:id | Busca os dados do animal pelo Id |
| GET | http://localhost:3000/pets/myadoptions | Retorna os animais que eu adotei |
| GET | http://localhost:3000/pets/mypets | Retorna os animais que eu coloquei para adoção |
| GET | http://localhost:3000/pets | Retorna todos os animais |
| POST | http://localhost:3000/pets/create | Cria um novo animal para adoção  |

## :hammer_and_wrench: Tecnologias
* __Node.js__
* __Mongoose ORM__ para acessar o banco
* __Yup__ para fazer a validação das requisições
* __Cors__ para liberar acesso à API
* __jsonwebtoken__ para criar uma sessão
* __Multer__ para fazer upload de imagens

## :balance_scale: Licença
Este projeto está licenciado sob a [licença MIT](LICENSE).

## :email: Contato

E-mail: [**luiiz.silverio@gmail.com**](mailto:luiiz.silverio@gmail.com)

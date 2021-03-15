## Consumindo API de criação e login de usuário
#### Backend/Frontend

O repositório tem como objetivo consumir através de uma aplicação React uma API feita em FastAPI.

## Sumário

- [Principais tecnologias utilizadas](#Principais-tecnologias-utilizadas)
- [Inicialização](#Inicialização)
- [Migrando tabela](#Migrando-tabela)
- [Executando os testes backend](#Executando-os-testes-backend)
- [Documentação API](#Documentação-API)
- [Validando cliente](#Validando-cliente)
- [Modificando os servidores](#Modificando-os-servidores)

## Principais tecnologias utilizadas

#### Backend:

- FastAPI
- Pydantic
- Postgresql
- SQLAlchemy
- Alembic
- JWT

#### Front-end:

- React
- React-Router
- Styled-components
- Axios
- Redux

## Inicialização

### Docker
Na raiz do projeto, execute
```
bash ./server/backend/scripts/env.sh
```
O script irá criar uma arquivo `.env` (contendo as configurações de usuário do projeto).

Após isso, na raiz do projeto, execute:
```
docker-compose up -d
```
O script irá instalar os requisitos do projeto e iniciar a aplicação.

## Migrando tabela

Após iniciar os conteiners, para a aplicação funcionar corretamente e conseguir se comunicar com o banco de dados, é preciso rodar os seguintes comandos no terminal:
```
docker ps
```
Copie o id do servidor backend e execute o próximo comando:
```
docker exec -it "<id_container>" bash
```
E por último, para migrar a tabela de usuários execute:
```
alembic upgrade head
```

## Executando os testes backend

Para executar os testes no backend, é necessário estar dentro do terminal interativo da aplicação docker. Para isso, pode se seguir os comandos citados acima, com exceção o da migração. Após isso, execute:
```
pytest -v
```

## Documentação API

Nossa aplicação backend, feita com FastAPI, disponibiliza automaticamente uma documentação da API através do OpenAPI.

A documentação pode ser encontrada em:

```
localhost:8000/docs
```

## Validando cliente

Após ter inicializado a aplicação e consultado a documentação, podemos acessar a parte do cliente, disponibilizada no endereço:

```
localhost:3000/
```

Acessando esse endereço, estará disponível um formulário onde é possível realizar o login de usuário ou o cadastro do mesmo.

Apertando f12 no teclado e clicando na aba `Network` na ferramenta do desenvolvedor, é possível acompanhar as requisições realizadas. Já na aba `Console`, é possível acompanhar os registros realizados pelo Redux.

## Modificando os servidores

Para modificar o endereço de hospedagem ou a porta de um servidor, altere os seus valores no arquivo `docker-compose.yml`, na raiz do projeto.
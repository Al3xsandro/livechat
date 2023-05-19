## Requisitos
Para continuar, você precisa:

* NODE >= 16
* PNPM >= 7

## Estrutura de pastas
```
|- package.json
|- pnpm-workspace.yaml
|- docker-compose.yml
|- packages
    |- client
    |- server
```

## Instalação

Antes de tudo, garanta que a versão mais recente o pnpm está instalada em sua máquina, após isso:

> `$ cd /livechat` ou `dir \livechat`

> `$ pnpm install`

> por fim, configure .env com base no .env.example em cada uma das aplicações localizadas em `packages`

## Uso

Para iniciar o cliente, use:

`pnpm client dev`

Para iniciar o servidor, use:

`pnpm server dev`

Para rodar os testes, use:
`pnpm server test`


## Requisitos Funcionais

**RF01** - Deverá ser possível fazer login apenas com usuários que estejam cadastrados na base de dados; [x]

**RF02** - Para dados de acesso inválidos, lançar uma exceção com alerta visual ao usuário; [x]

**RF03** - Não deverá ser possível acessar a tela do chat sem estar logado na aplicação; [x]

**RF04** - As conversas entre usuários no chat, devem ser em real time, ou seja, a medida que o usuário envia a mensagem, o outro usuário a recebe no mesmo instante; [x]

**RF05** - Listar os usuários ‘online’; [x]

**RF06** - Ao clicar sobre um usuário, abrir a caixa de digitação de mensagem [x]

**RF07** - Quando um usuário sair da aplicação, a caixa de mensagem para este usuário deverá ser desativada, impossibilitando o envio de novas mensagens; [x]

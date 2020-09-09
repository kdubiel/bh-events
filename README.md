# MERN Starter

## Quickstart

### Requirements

**System**:
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [VSCode](https://code.visualstudio.com/)
- [Yarn](https://yarnpkg.com/)
- [Node.js](https://nodejs.org/en/)

**Extensions**:
- ESLint
- Prettier
- Editorconfig
- Docker \*
- vscode-styled-components \*
- vscode-icons \* _(or any other icons extension)_

```
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "EditorConfig.EditorConfig",

    "ms-azuretools.vscode-docker",
    "ms-vscode-remote.remote-containers",
    "ms-vscode-remote.remote-ssh",
    "ms-vscode-remote.remote-ssh-edit",
    "ms-vscode-remote.remote-wsl",
    "ms-vscode-remote.vscode-remote-extensionpack",

    "jpoissonnier.vscode-styled-components",
    "vscode-icons-team.vscode-icons"
  ]
}
```

### Installation

1. Clone the repository
2. Create `.env.dev` file in root directory:

```
NODE_ENV=production

# MongoDB
MONGO_DATABASE=kdml
MONGO_USERNAME=kamil
MONGO_PASSWORD=dubiel

MONGO_PORT=27017
MONGO_URL=database

# API
API_PORT=4000
API_PORT_DEBUGGER=9229
API_URL=127.0.0.1

# Client
CLIENT_PORT=3000

```

3. Run `yarn install` in root directory
4. Run `yarn build` in root directory

### Running apps

- Run `yarn docker:up:dev` in root directory (this might take some time)
- Visit `http://localhost:3000`

### Running tests

**Client**:

- Run `test:client:watch` in root directory

**API**:

1. Launch app mongo container
   
   ![Mongo Container](https://imgur.com/rq5hDrh.jpg)

2. Run `yarn test:api:watch` in root directory

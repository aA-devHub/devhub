# devhub

[Live](https://aa-devhub.herokuapp.com/)

# Install
```sh
npm install && npm run frontend-install
```
**Note**: check that npm version is ^6. Initially I was using npm version 7.\*, but it doesn't handle npm postinstall correctly, so husky (used to automate linting) doesn't install its git hooks like it should. (( You *should* see messages about husky installing its hooks during installation ))

# Development
```sh
npm run dev
```

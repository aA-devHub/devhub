# devhub

[Live](https://getdevhub.herokuapp.com/)

# Install

```sh
npm install && npm run frontend-install
```

**Note**: check that npm version is ^6. Initially I was using npm version 7.\*, but it doesn't handle npm postinstall correctly, so husky (used to automate linting) doesn't install its git hooks like it should. (( You _should_ see messages about husky installing its hooks during installation ))

recharts 2.0 bug: https://github.com/recharts/recharts/issues/2360

# Development

```sh
npm run dev
```

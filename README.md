# Devhub

### [Live Link](https://getdevhub.herokuapp.com/)

## `About`
Devhub is a professional networking site for developers, empowering them to beautifully showcase their portfolios, connect with other developers, and be scouted for professional opportunities. 
This project was a collaborative effort, built by [Ori Ravid](https://github.com/oriravid), [Noah Peart](https://github.com/nverno), [Will Wang](https://github.com/YizheWill), and [Kevin Bastoul](https://github.com/kaycbas). 

## `Technologies`
### Frontend
- HTML, Sass, React, Redux, MaterialUI

### Backend
- MongoDB, Node.js, Express.js, Mongoose

## `Setup`
### Installation

```sh
npm install && npm run frontend-install
```

**Note**: Check that npm version is ^6. Initially we were using npm version 7.\*, but it doesn't handle npm postinstall correctly, so husky (used to automate linting) doesn't install its git hooks like it should. ( You _should_ see messages about husky installing its hooks during installation )

recharts 2.0 bug: https://github.com/recharts/recharts/issues/2360

### Development

```sh
npm run dev
```

## `Features`
### User Profile Display & Edit

![Viewing and Editing User Profiles](https://github.com/aA-devHub/devhub/blob/master/frontend/public/readme/user_profile.gif)

### Project Display & Edit

![Viewing and Editing Projects](https://github.com/aA-devHub/devhub/blob/master/frontend/public/readme/project_display.gif)

### Messaging

![Messaging](https://github.com/aA-devHub/devhub/blob/master/frontend/public/readme/messaging.gif)

### Commenting & Notifications

![Messaging](https://github.com/aA-devHub/devhub/blob/master/frontend/public/readme/commenting.gif)

### Search

![Search](https://github.com/aA-devHub/devhub/blob/master/frontend/public/readme/search.gif)

## `Future Features`

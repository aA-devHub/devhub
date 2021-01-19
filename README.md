# Devhub

### [Live Link](https://getdevhub.herokuapp.com/)

### ![Home](https://github.com/aA-devHub/devhub/blob/master/frontend/public/readme/home.png)

## `About`
Devhub is a professional networking site for developers, empowering them to beautifully showcase their portfolios, connect with other developers, and be scouted for professional opportunities. 
This project was a collaborative effort, built by [Ori Ravid](https://github.com/oriravid), [Noah Peart](https://github.com/nverno), [Yizhe Wang](https://github.com/YizheWill), and [Kevin Bastoul](https://github.com/kaycbas). 

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
Users can visit other developers' profiles to see more information about them and their projects. Profile pages contain important information about each developer, links to their projects and social medias, and an option to message them directly. A user's own profile can be set up and editted at any time by clicking the pencil icon at the top right of their page.

![Viewing and Editing User Profiles](https://github.com/aA-devHub/devhub/blob/master/frontend/public/readme/user_profile.gif)

### Project Display & Edit
Project display pages are where developers can showcase their work in a clean and dynamic format. Some of the noteworthy features of this page are:
- A project language chart that is auto-generated using the Github api and project repo link
- Carousel images for the banner and features, allowing for the display of up to 8 images without clutter
- A multi-step setup process that walks a user through uploading images and writing section content
- Any section of a project can be edited at any time after initial setup by selecting the 'Edit' option near the top
- Each section of the display page supports multiple different layouts that can be customized during setup, for a total of 18 unique layouts
- The developer's information can be viewed in a popout drawer by clicking their icon on the project page
- Projects can be commented on or favorited, which sends a notification to the owner

![Viewing and Editing Projects](https://github.com/aA-devHub/devhub/blob/master/frontend/public/readme/project_display.gif)

### Messaging

![Messaging](https://github.com/aA-devHub/devhub/blob/master/frontend/public/readme/messaging.gif)

### Commenting & Notifications

![Messaging](https://github.com/aA-devHub/devhub/blob/master/frontend/public/readme/commenting.gif)

### Search

![Search](https://github.com/aA-devHub/devhub/blob/master/frontend/public/readme/search.gif)

## `Future Features`

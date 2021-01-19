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
#### Installation

```sh
npm install && npm run frontend-install
```

#### Development

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
- Any section of a project can be edited by its owner at any time after initial setup by selecting the 'Edit' option near the top
- Each section of the display page supports multiple different layouts that can be customized during setup, for a total of 18 unique layouts
- The developer's information can be viewed in a popout drawer by clicking their icon on the right side of the project page
- Projects can be commented on or favorited, which sends a notification to the owner

![Viewing and Editing Projects](https://github.com/aA-devHub/devhub/blob/master/frontend/public/readme/project_display.gif)

### Messaging
Devhub supports messaging between users. Messages can be initiated from multiple places throughout the app and conversations can be managed from within the Messenger by selecting the mail icon in the navbar. Inside the messenger, users can navigate between their conversation threads, search for a specific thread using the searchbar, and send and receive messages.

![Messaging](https://github.com/aA-devHub/devhub/blob/master/frontend/public/readme/messaging.gif)

### Commenting & Notifications
All projects in Devhub support comments and favorites. Projects can be favorited from the homepage or from the project display page, and the number of favorites a project receives affects its ranking when filtered by popularity on the homepage. Project comments can be accessed and submitted from the popout comment drawer on the project display page.

When any project is favorited or commented on, its owner receives a notification which shows up on the bell in the navbar and navigates the owner to the project in question.

![Messaging](https://github.com/aA-devHub/devhub/blob/master/frontend/public/readme/commenting.gif)

### Search, Tags, & Ordering
On the homepage, projects can be searched for by title, filtered by the languages used, and ordered by popularity or recency. These options allow recruiters and users to find projects and developers they're interested in more quickly.

![Search](https://github.com/aA-devHub/devhub/blob/master/frontend/public/readme/search.gif)

## `Future Features`
- Tutorial Mode - help onboard new users with a walkthrough of key features
- Fully featured messaging - messaging support for images, gifs, and file uploads
- Favorites Page - a page where users can view their favorited projects


<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/lamarjd/Cloud-9-Sound">
    <img src="./frontend/src/components/assets/images/CLOUD9Logo.png" alt="Logo" width="100" height="100" style="background-color:black">
  </a>

  <h3 align="center">Cloud 9</h3>

  <p align="center">
     Cloud 9, a SoundCloud clone, is a music sharing platform designed for artists to share their work with others, and to discover new music. Users are able to upload their songs and share their work with the community.
    <br />
    <a href="https://github.com/lamarjd/Cloud-9-Sound"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://cloud-9.herokuapp.com/">View Live Site</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<!-- <details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details> -->

<!-- ABOUT THE PROJECT -->

## About The Project

[Click here to view Cloud 9 live on the web!](https://cloud-9.herokuapp.com/)
<br>
</br>
<img src="https://res.cloudinary.com/dncypdqkb/image/upload/v1666584676/Cloud-9/homepage_wwvved.jpg" alt="homepage" />

## Overall Structure

### Back End

The app was built using Express and Sequelize on the back end with a PostgreSQL database. 

### Front End

The front end is built with React and Javascript while utilizing Redux architecture, producing a lightning-fast user interface and calling upon dynamically rendered components.

### Built With

- [JavaScript](https://www.javascript.com/)
- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Express](https://expressjs.com/)
- [Node.js](https://nodejs.org/en/)
- [HTML](https://html.com/)
- [CSS](http://www.css3.info/)

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.


### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/lamarjd/Cloud-9-Sound
   ```
2. Install NPM packages (cd into backend and frontend and npm install)
   ```sh
   npm install
   ```
3. Add a '.env' with your environment variables to the root of your local directory

4. Migrate and seed your database
   ```sh
   npx dotenv sequelize db:migrate
   npx dotenv sequelize db:seed:all
   ```

5. In a split terminal, cd into both the frontend and backend directories, respectively, and run npm start 

   ```sh
   cd backend/
   npm start
   ```

      ```sh
   cd frontend/
   npm start
   ```

<!-- ROADMAP -->




<!-- CONTACT -->

<!-- ## Contact & Acknowledgements

- LinkedIn profile link-->


<!-- ACKNOWLEDGEMENTS -->
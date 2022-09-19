
## QUICK_SETUP Method 1 - "out-of-the-box" setup

Use the create-react-app command from inside your frontend folder to initialize React inside of the frontend folder:

>> npx create-react-app . --template @appacademy/react-redux-v17 --use-npm

You will also need to install js-cookie as a dependency to continue. This dependency will allow your frontend to extract cookies from the browser.

>> npm install js-cookie


I decided to create my React file form scratch, using appAcademy's template. 
List of necessary dependencies are below.
<!-- //////////////////////////////////////////////////////////////////////////////////////////////// -->


## React Template - Method 2 - React from scratch

>> npx create-react-app my-front --template @appacademy/react-v17 --use-npm

## Dependencies


>> js-cookie  extracts cookies
>> react-redux  React components and hooks for Redux
>> react-router-dom@^5 - routing for React
>> redux - Redux
>> redux-thunk  add Redux thunk

## npm install -D the following packages as dev-dependencies:

>> redux-logger log Redux actions in the browser's dev tools console


## Running the App

>> npm start:: start the server

<!-- To test a dispatch call, type the following command in the browser's DevTools console 

    window.store.dispatch({ type: 'hello' });

-->



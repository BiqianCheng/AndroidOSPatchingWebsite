# Introduction

<!-- This project is a website for users who would like to che -->

It is written in JavaScript.

## On this website, users can do:

* Choose one CVE from the CVE table on the left
* Choose one phone model from the phone models table on the right
* Click "Generate" button, a corresponding figure is generated based on the choices above.
* Users are able to check each patched date for all CVEs by hovering the curser on each button.
* Users are able to download the image for any further usages.

# Implementations

Implementations of each functionality are explained explicitly and shown as comments in each file.

### Additional Information:
* src/
    
    * App.js: Basic structure of the website
    * components/
        
        * **CVETable.js**: It stores all CVEs data as a dataset
        * **PhoneTable.js**: It stores all phone models data as a dataset
        * **PhoneTimeline.js**: Implementations of the figure in the middle based on choices from CVE table and Phone model table.
    * utils/

        * The datalist contain a list of CVE or Phone Model with attribute of false. Once user select a CVE or Phone Model, the attribute will be set as true. Return the CVE or the Phone Model that is selected. In other word, the specific CVE or Phone Model that has true attribute.

Other files that are not mentioned above should not be changed.

# How to open live web page in local

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

# How to deploy production build

## Available Scripts

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

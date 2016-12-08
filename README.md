## What it can do ?

* Saves image (from context menu)
* Saves text snippet (by selecting text and clicking on plugin icon)
* Saves url (clicking on plugin icon without selected any text)

![](https://raw.githubusercontent.com/swapnilmishra/InstaLater/master/screenshot/screen.gif)

## Folder structure

Folders are divided into sub-parts

* pluggin - Contains code for plugin
* server - Contains code for backend express server which have api to save and show data(Runs on port 3001)
* app - Contains code for React app(UI) which displays saved artifacts (Runs on port 3000 and proxy to server for api calls)


## Building pluggin

```js
cd plugin
npm install or yarn install
gulp build // generated the plugin in plugin/dist directory
```

## Running server

```js
cd server
npm install or yarn install
npm start // runs server on port 3001
```

## Running app(UI)

```js
cd app
npm install or yarn install
npm start // runs server on port 3000
```
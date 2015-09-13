## Hack Oregon Minimum Wage App
Hack Oregon app for exploring minimum wage issues in our state.


### Requirements
* Node 0.10+
* NPM


### Install
1. Make a new project directory and clone the repo:
```
$ mkdir hack_oregon && cd hack_oregon
$ git clone git@github.com:Jobs-Economy/raise-effect.git
```

2. Install dependencies via npm:
```

$ npm install
```


### Running the project locally
There are a handful of npm scripts for running the project locally (found in the 'scripts' object of the package.json), but generally you'll want to run each of these in separate tabs in your console:


```
$ npm run watch
$ npm run watch-css
$ npm run serve
```

Sourcemapping is enabled, so you should be able to Cmd-P in Chrome dev tools to do live debugging.
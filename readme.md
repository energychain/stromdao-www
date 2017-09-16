# STROMDAO website

[![Build Status](https://travis-ci.org/energychain/stromdao-www.svg?branch=master)](https://travis-ci.org/energychain/stromdao-www) [![dependencies Status](https://david-dm.org/energychain/stromdao-www/status.svg)](https://david-dm.org/energychain/stromdao-www)

Repository for www.stromdao.de (work-in-progress)

## Setup

- make sure [node.js](http://nodejs.org) is at version >= `6`
- clone this repo down and `cd` into the folder
- run `npm install`
- run `npm start` to watch changes in browser or `npm run build` to  compile the output just once
- run `npm run prod`  to compile for production (this will run some additional optimisations)

## Testing
Tests are located in `test/**` and are powered by [ava](https://github.com/sindresorhus/ava)
- `npm install` to ensure devDeps are installed
- `npm test` to run test suite


## Notes
 - This website is built with [Spike](https://github.com/static-dev/spike). Documentation of Spike and [Spike Standards](https://spike.readme.io/docs/introduction) is available at [https://spike.readme.io/docs](https://spike.readme.io/docs)
 - Styling is done with [Tachyons](https://github.com/tachyons-css/tachyons/). Find the tacyons documentation at [http://tachyons.io/docs/](http://tachyons.io/docs/)

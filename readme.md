# STROMDAO website

[![Build Status](https://travis-ci.org/energychain/stromdao-www.svg?branch=master)](https://travis-ci.org/energychain/stromdao-www) [![Greenkeeper badge](https://badges.greenkeeper.io/energychain/stromdao-www.svg)](https://greenkeeper.io/)

Repository for www.stromdao.de (work-in-progress)

## Setup

- make sure [node.js](http://nodejs.org) is at version >= `6`
- `npm i spike -g`
- clone this repo down and `cd` into the folder
- run `npm install`
- run `spike watch` or `spike compile`

## Testing
Tests are located in `test/**` and are powered by [ava](https://github.com/sindresorhus/ava)
- `npm install` to ensure devDeps are installed
- `npm test` to run test suite


## Notes
 - This website is built with [Spike](https://github.com/static-dev/spike). Documentation of Spike and [Spike Standards](https://spike.readme.io/docs/introduction) is available at [https://spike.readme.io/docs](https://spike.readme.io/docs)
 - Styling is done with [Tachyons](https://github.com/tachyons-css/tachyons/). Find the tacyons documentation at [http://tachyons.io/docs/](http://tachyons.io/docs/)

// Nerf 1 = 50:f5:da:86:64:c1
'use strict';

const config = require('./utilities/config.json');
const buttons = config.buttons;
const dash_button = require('node-dash-button');
const logger = require('./utilities/logger');
const hue = require('node-hue-api');
const HueApi = hue.HueApi;
const lightState = hue.lightState;
const api = new HueApi(config.hue.hueAddress, config.hue.hueUser);
let on = false;
let state;
const R = require('ramda');

// Display output
const displayResult = function(result) {
  logger.info(JSON.stringify(result, null, 2));
};

// Filters buttons id from array of dash buttons
const returnButtonIds = () => {
  return R.pluck('id')(buttons);
}

state = lightState.create().bri(20);

console.log('Initialising and sniffing for clicks!!');

const dash = dash_button(returnButtonIds(), null, null, 'all');
dash.on('detected', function (dash_id) {
  const buttonName = R.find(R.propEq('id', dash_id))(buttons);
  logger.info('Dash Button Pressed', {message: `Dash button ${buttonName['btn-name']} was clicked!`, buttonObj: buttonName});

  switch(dash_id) {
    // Besty Bedside light
    case '50:f5:da:86:64:c1':
      if (!on) {
        api.setLightState(2, state.on())
          .then(displayResult)
          .done();
      } else {
        api.setLightState(2, state.off())
          .then(displayResult)
          .done();
      }
      on = !on;
      break;
    case '50:f5:da:c6:a8:7a':
      if (!on) {
        api.setLightState(6, state.on())
          .then(displayResult)
          .done();
      } else {
        api.setLightState(6, state.off())
          .then(displayResult)
          .done();
      }
      on = !on;
      break;
  }
});

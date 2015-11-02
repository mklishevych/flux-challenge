import Config from '../config.js';
import PlanetActions from '../actions/PlanetActions.js';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import AppConstants from '../constants/AppConstants.js';

// state
// ==============================
var state = {
    ws: null
};
// ==============================

// private methods
// ==============================
var handleMessage = function (message) {
    var data = JSON.parse(message.data);
    if (data) {
        PlanetActions.change(JSON.parse(message.data));
    }
};

var start = function () {
    state.ws = new WebSocket(Config.PLANET_SOCKET_URL);
    state.ws.onmessage = handleMessage;
};

var stop = function () {
    if (state.ws) {
        state.ws.close();
        state.ws = null;
    }
};
// ==============================

// actions listener
// ==============================
var actionsListener = function (action) {
    switch (action.actionType) {
        case AppConstants.START:
            stop();
            start();
            break;
        case AppConstants.STOP:
            stop();
            break;
    }
};
// ==============================

AppDispatcher.register(actionsListener);

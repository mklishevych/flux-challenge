import AppDispatcher from '../dispatcher/AppDispatcher.js';
import {EventEmitter} from 'events';
import assign from 'object-assign';
import PlanetConstants from '../constants/PlanetConstants.js';

// state
// ==============================
var state = {
    currentPlanet: null
};
// ==============================

// events
// ==============================
var events = {
    change: 'planet:change'
};
// ==============================

// private methods
// ==============================
var update = function (planet) {
    state.currentPlanet = planet;
};
// ==============================

// actions listener
// ==============================
var actionsListener = function (action) {
    switch (action.actionType) {
        case PlanetConstants.CHANGE:
            update(action.planetName);
            PlanetStore.emitChange();
            break;
    }
};
// ==============================

// ==============================
var PlanetStore = assign({}, EventEmitter.prototype, {
    getCurrentPlanet: function () {
        return state.currentPlanet;
    },
    emitChange: function () {
        this.emit(events.change);
    },
    addChangeListener: function (callback) {
        this.on(events.change, callback);
    },
    removeChangeListener: function (callback) {
        this.removeListener(events.change, callback);
    }
});
// ==============================

AppDispatcher.register(actionsListener);

module.exports = PlanetStore;

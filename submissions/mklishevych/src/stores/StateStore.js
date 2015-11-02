import {EventEmitter} from 'events';
import assign from 'object-assign';
import PlanetStore from './PlanetStore.js';
import SithStore from './SithStore.js';

// events
// ==============================
var events = {
    change: 'state:change'
};
// ==============================

// private methods
// ==============================
var getState = function () {
    return {
        currentPlanet: PlanetStore.getCurrentPlanet(),
        sithList: SithStore.getList(),
        canScrollDown: SithStore.canScrollDown(),
        canScrollUp: SithStore.canScrollUp(),
        freezeUI: SithStore.hasSomeOneFrom(PlanetStore.getCurrentPlanet())
    };
};
// ==============================

// ==============================
var listener = function () {
    StateStore.emitChange();
};

PlanetStore.addChangeListener(listener);
SithStore.addChangeListener(listener);
// ==============================

// ==============================
var StateStore = assign({}, EventEmitter.prototype, {
    get: function () {
        return getState();
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

module.exports = StateStore;

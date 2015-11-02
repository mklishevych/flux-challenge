import AppDispatcher from '../dispatcher/AppDispatcher.js';
import PlanetConstants from '../constants/PlanetConstants.js';

var PlanetActions = {
    change: function (planet) {
        AppDispatcher.dispatch({
            actionType: PlanetConstants.CHANGE,
            planetId: planet.id,
            planetName: planet.name
        });
    }
};

module.exports = PlanetActions;
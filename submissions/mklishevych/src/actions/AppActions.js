import AppDispatcher from '../dispatcher/AppDispatcher.js';
import AppConstants from '../constants/AppConstants.js';

var AppActions = {
    start: function () {
        AppDispatcher.dispatch({
            actionType: AppConstants.START
        });
    },
    stop: function () {
        AppDispatcher.dispatch({
            actionType: AppConstants.STOP
        });
    }
};

module.exports = AppActions;

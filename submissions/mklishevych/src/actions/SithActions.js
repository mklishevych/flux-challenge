import AppDispatcher from '../dispatcher/AppDispatcher.js';
import SithConstants from '../constants/SithConstants.js';

var SithActions = {
    receive: function (sith) {
        AppDispatcher.dispatch({
            actionType: SithConstants.RECEIVE,
            sith: sith
        });
    },
    scrollDown: function () {
        AppDispatcher.dispatch({
            actionType: SithConstants.SCROLL_DOWN
        });
    },
    scrollUp: function () {
        AppDispatcher.dispatch({
            actionType: SithConstants.SCROLL_UP
        });
    }
};

module.exports = SithActions;

import {EventEmitter} from 'events';
import assign from 'object-assign';
import Config from '../config.js';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import SithConstants from '../constants/SithConstants.js';

// state
// ==============================
var state = {
    list: []
};

for (var i = 0; i < Config.SITH_LIST_SIZE; i++) {
    state.list.push(null);
}
// ==============================

// events
// ==============================
var events = {
    change: 'sith:change'
};
// ==============================

// private methods
// ==============================
var add = function (sith) {
    var firstItem = first();
    var currentSith;

    if (!firstItem) {
        state.list[0] = sith;
        return true;
    } else {
        for (var i = 0; i < state.list.length; i++) {
            currentSith = state.list[i];
            if (null === currentSith) {
                continue;
            }

            if (currentSith.master.id == sith.id
                && i !== 0
            ) {
                state.list[i - 1] = sith;
                return true;
            }

            if (currentSith.apprentice.id == sith.id
                && i !== Config.SITH_LIST_SIZE - 1
            ) {
                state.list[i + 1] = sith;
                return true;
            }
        }
    }

    return false;
};

var scrollUp = function () {
    var head = [];
    for (var i = 0; i < Config.SITH_LIST_SCROLL_SIZE; i++) {
        head.push(null);
    }
    var tail = state.list.slice(0, state.list.length - Config.SITH_LIST_SCROLL_SIZE);

    state.list = head.concat(tail);
};

var scrollDown = function () {
    var head = state.list.slice(Config.SITH_LIST_SCROLL_SIZE, state.list.length + 1);
    var tail = [];
    for (var i = 0; i < Config.SITH_LIST_SCROLL_SIZE; i++) {
        tail.push(null);
    }

    state.list = head.concat(tail);
};
// ==============================

// public methods
// ==============================
var first = function () {
    for (var i = 0; i < state.list.length; i++) {
        if (null !== state.list[i]) {
            return {
                sith: state.list[i],
                index: i
            };
        }
    }

    return null;
};

var last = function () {
    for (var i = state.list.length - 1; i >= 0; i--) {
        if (null !== state.list[i]) {
            return {
                sith: state.list[i],
                index: i
            };
        }
    }

    return null;
};

var canScrollUp = function () {
    var firstItem = first();
    var min = Config.SITH_LIST_SCROLL_SIZE;
    if (firstItem && firstItem.index <= min && firstItem.sith.master.url) {
        return true;
    }

    return false;
};

var canScrollDown = function () {
    var lastItem = last();
    var min = state.list.length - Config.SITH_LIST_SCROLL_SIZE - 1;
    if (lastItem && lastItem.index >= min && lastItem.sith.apprentice.url) {
        return true;
    }

    return false;
};

var hasSomeOneFrom = function (planet) {
    for (var i = 0; i < state.list.length; i++) {
        if (null !== state.list[i]
            && state.list[i].homeworld.name == planet
        ) {
            return true;
        }
    }

    return false;
};

var getNext = function () {
    var firstItem = first();
    var lastItem = last();
    var url = null;

    // choose new request
    if (firstItem && firstItem.sith.master && firstItem.sith.master.url && firstItem.index !== 0) {
        url = firstItem.sith.master.url;
    } else if (lastItem && lastItem.sith.apprentice && lastItem.sith.apprentice.url && lastItem.index !== state.list.length - 1) {
        url = lastItem.sith.apprentice.url;
    }

    return url;
};
// ==============================

// actions listener
// ==============================
var actionsListener = function (action) {
    switch (action.actionType) {
        case SithConstants.RECEIVE:
            if (add(action.sith)) {
                SithStore.emitChange();
            }
            break;

        case SithConstants.SCROLL_DOWN:
            if (canScrollDown()) {
                scrollDown();
                SithStore.emitChange();
            }
            break;

        case SithConstants.SCROLL_UP:
            if (canScrollUp()) {
                scrollUp();
                SithStore.emitChange();
            }
            break;
    }
};
// ==============================

// ==============================
var SithStore = assign({}, EventEmitter.prototype, {
    getList: function () {
        return state.list;
    },
    getFirst: function () {
        return first();
    },
    getLast: function () {
        return last();
    },
    canScrollUp: function () {
        return canScrollUp();
    },
    canScrollDown: function () {
        return canScrollDown();
    },
    hasSomeOneFrom: function (planet) {
        return hasSomeOneFrom(planet);
    },
    getNext: function () {
        return getNext();
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

module.exports = SithStore;

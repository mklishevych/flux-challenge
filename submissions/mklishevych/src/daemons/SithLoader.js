import SithActions from '../actions/SithActions.js';
import SithStore from '../stores/SithStore.js';
import StateStore from '../stores/StateStore.js';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import AppConstants from '../constants/AppConstants.js';
import PlanetConstants from '../constants/PlanetConstants.js';
import SithConstants from '../constants/SithConstants.js';
import Config from '../config.js';
import * as $ from 'jquery';

// state
// ==============================
var state = {
    queue: []
};
// ==============================

// private methods
// ==============================
var xhr = function (url) {
    return $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        timeout: 3000
    });
};

var enqueue = function (url) {
    var request = {
        url: url,
        xhr: xhr(url)
    };

    state.queue.push(request);

    return request;
};

var exists = function (url) {
    for (var i = 0; i < state.queue.length; i++) {
        if (state.queue[i].url == url) {
            return true;
        }
    }

    return false;
};

var abortObsolete = function (newUrl) {
    var i = state.queue.length;
    while (i--) {
        if (state.queue[i].url != newUrl) {
            state.queue[i].xhr.abort();
            state.queue.splice(i, 1);
        }
    }
};

var removeFinishedRequestFromQueue = function (request) {
    for (var i = 0; i < state.queue.length; i++) {
        if (state.queue[i].url == request.url) {
            state.queue.splice(i, 1);
        }
    }
};

var handleSuccessfulResponse = function (response) {
    SithActions.receive(response);
};
// ==============================

// public methods
// ==============================
var load = function (url) {
    if (exists(url)) {
        return;
    }

    var request = enqueue(url);

    request.xhr
        .always(function () {
            removeFinishedRequestFromQueue(request);
        })
        .done(function (response) {
            handleSuccessfulResponse(response)
        })
    ;
};

var loadNext = function () {
    var url = SithStore.getNext();
    if (!url || exists(url)) {
        return;
    }

    abortObsolete(url);
    load(url);
};

var cancelAll = function () {
    for (var i = 0; i < state.queue.length; i++) {
        state.queue[i].xhr.abort();
    }
    state.queue = [];
};

var handleStateChange = function (state) {
    if (state.freezeUI) {
        cancelAll();
    } else {
        loadNext();
    }
};
// ==============================

// actions listener
// ==============================
var actionsListener = function (action) {
    switch (action.actionType) {
        case AppConstants.START:
            load(Config.FIRST_SITH_URL);
            break;
        case AppConstants.STOP:
            cancelAll();
            break;

        case PlanetConstants.CHANGE:
        case SithConstants.RECEIVE:
        case SithConstants.SCROLL_DOWN:
        case SithConstants.SCROLL_UP:
            handleStateChange(StateStore.get());
            break;
    }
};
// ==============================

AppDispatcher.register(actionsListener);

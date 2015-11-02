import React from 'react';

import PlanetIndicator from './PlanetIndicator';
import SithList from './SithList.js';
import ScrollButton from './ScrollButton.js';

import AppActions from '../actions/AppActions.js';
import SithConstants from '../constants/SithConstants.js';
import StateStore from '../stores/StateStore.js';

import PlanetSocket from '../daemons/PlanetSocket.js';
import SithLoader from '../daemons/SithLoader.js';

var App = React.createClass({
    getInitialState: function () {
        return StateStore.get();
    },
    componentWillMount: function () {
        AppActions.start();
    },
    componentDidMount: function () {
        StateStore.addChangeListener(this.handleStateChange);
    },
    componentWillUnmount: function () {
        AppActions.stop();
    },
    componentDidUnmount: function () {
        StateStore.removeChangeListener(this.handleStateChange);
    },
    render: function () {
        return (
            <div className="app-container">
                <div className="css-root">
                    <PlanetIndicator currentPlanet={this.state.currentPlanet} />
                    <section className="css-scrollable-list">
                        <SithList currentPlanet={this.state.currentPlanet}
                                  sithList={this.state.sithList} />
                        <div className="css-scroll-buttons">
                            <ScrollButton direction={SithConstants.SCROLL_UP}
                                          canScroll={this.state.canScrollUp}
                                          freezeUI={this.state.freezeUI} />
                            <ScrollButton direction={SithConstants.SCROLL_DOWN}
                                          canScroll={this.state.canScrollDown}
                                          freezeUI={this.state.freezeUI} />
                        </div>
                    </section>
                </div>
            </div>
        );
    },
    handleStateChange: function () {
        this.setState(StateStore.get());
    }
});

module.exports = App;

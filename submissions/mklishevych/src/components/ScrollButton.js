import React from 'react';
import SithActions from '../actions/SithActions.js';
import SithConstants from '../constants/SithConstants.js';

var ScrollButton = React.createClass({
    render: function () {
        var className = [
            this.isUp()       ? 'css-button-up'       : '',
            this.isDown()     ? 'css-button-down'     : '',
            this.isDisabled() ? 'css-button-disabled' : ''
        ].join(' ');

        return (
            <button className={className} onClick={this.handleClick}></button>
        );
    },
    handleClick: function (e) {
        e.preventDefault();

        if (this.isDisabled()) {
            return;
        }

        if (this.isUp()) {
            SithActions.scrollUp();
        } else {
            SithActions.scrollDown();
        }
    },
    isUp: function () {
        return this.props.direction == SithConstants.SCROLL_UP;
    },
    isDown: function () {
        return this.props.direction == SithConstants.SCROLL_DOWN;
    },
    isDisabled: function () {
        return !this.props.canScroll || this.props.freezeUI;
    }
});

module.exports = ScrollButton;

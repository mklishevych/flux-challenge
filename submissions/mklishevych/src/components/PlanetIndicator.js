import React from 'react';

var PlanetIndicator = React.createClass({
    render: function () {
        return (
            <h1 className="css-planet-monitor">Obi-Wan currently on {this.props.currentPlanet}</h1>
        );
    }
});

module.exports = PlanetIndicator;

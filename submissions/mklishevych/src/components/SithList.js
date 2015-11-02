import React from 'react';

var SithList = React.createClass({
    render: function () {
        var currentPlanet = this.props.currentPlanet;
        var sithList = this.props.sithList;

        return (
            <ul className="css-slots">
                {sithList.map(function (sith) {
                    var sithName = sith ? sith.name : '';
                    var sithHomeWorld = sith ? ('Homeworld: ' + sith.homeworld.name) : '' ;
                    var sithFromCurrentPlanet = sith && sith.homeworld.name === currentPlanet;

                    var styles = {};
                    if (sithFromCurrentPlanet) {
                        styles['color'] = 'red';
                    }

                    return (
                        <li className="css-slot" style={styles}>
                            <h3>{sithName}</h3>
                            <h6>{sithHomeWorld}</h6>
                        </li>
                    );
                })}
            </ul>
        );
    }
});

module.exports = SithList;

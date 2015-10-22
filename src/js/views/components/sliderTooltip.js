import React from 'react';
import _ from 'lodash';

let SliderTooltip = React.createClass({
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Wage Breakdown</h3>
        </div>
        <div className="panel-body">
          <ul className="list-inline">
            <li>$<span className="hour">{ this.props.value }</span> / hour</li>
            <li>$<span className="day">{ this.props.value * 8 }</span> / day</li>
            <li>$<span className="week">{ Math.round(this.props.value * 8 * 22 * 12 / 52 * 100) / 100 }</span> / week</li>
            <li>$<span className="month">{ this.props.value * 8 * 22 }</span> / month</li>
            <li>$<span className="year">{ this.props.value * 8 * 22 * 12 }</span> / year</li>
          </ul>
        </div>
      </div>
    );
  }
});

export default SliderTooltip;

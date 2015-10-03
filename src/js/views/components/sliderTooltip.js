import React from 'react';
import _ from 'lodash';

let SliderTooltip = React.createClass({
  render() {
    return (
      <div class="panel panel-default">
              <div class="panel-heading">
                <h3 class="panel-title">Wage Breakdown</h3>
              </div>
              <div class="panel-body">
                <ul class="list-inline">
                  <li>$<span class="hour">{ this.props.value }</span> / hour</li>
                  <li>$<span class="day">{ this.props.value * 8 }</span> / day</li>
                  <li>$<span class="week">{ this.props.value * 8 * 5 }</span> / week</li>
                  <li>$<span class="month">{ this.props.value * 8 * 5 * 4 }</span> / month</li>
                  <li>$<span class="year">{ this.props.value * 8 * 5 * 4 * 12 }</span> / year</li>
                </ul>
              </div>
            </div>
    );
  }
});

export default SliderTooltip;

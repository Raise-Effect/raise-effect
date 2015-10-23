import React from 'react';
import _ from 'lodash';

let FamilyLife = React.createClass({
  getDefaultProps: function() {
    return {
      data: []
    };
  },
  getBudgetBreakdown: function() {
    return _.map(this.props.data, (data) => {
      return (
        <div key={data.name} className="row">
          <div className="col-xs-2 text-right">
            <h3>{data.name}</h3>
          </div>
          <div className="col-xs-3 text-center">
            <div className="color-box sufficient">
              ${data.singleAdult}
            </div>
          </div>
          <div className="col-xs-3 text-center">
            <div className="color-box sufficient">
              ${data.singleParent}
            </div>
          </div>
          <div className="col-xs-3 text-center">
            <div className="color-box sufficient">
              ${data.marriedFamily}
            </div>
          </div>
        </div>
      );
    });
  },
	render() {
		return (
      <div>
      <div className="jumbotron">
        <h1>Oregon Family Life</h1>
        <p>Below describes how the Self Sufficiency Wage is calculated per each family type for the state of Oregon.</p>
      </div>
        <div className="row">
          <div className="col-xs-2">

          </div>
          <div className="col-xs-3 text-center">
            <div>
              <img className="icon-height" alt="Single Adult" src="/public/images/family-single-adult.png"/>
            </div>
          </div>
          <div className="col-xs-3 text-center">
            <div>
              <img className="icon-height" alt="Single Parent with Two Children" src="/public/images/family-one-parent.png"/>
            </div>
          </div>
          <div className="col-xs-3 text-center">
            <div>
              <img className="icon-height" alt="Two Parents with Two Children" src="/public/images/family-two-parent.png"/>
            </div>
          </div>
        </div>
        {this.getBudgetBreakdown()}
      </div>
		);
	}
});

export default FamilyLife;

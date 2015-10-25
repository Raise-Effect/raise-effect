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
            <h3 className="row-header">{data.name}</h3>
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
        <h1>Self-Sufficency Breakdown for Households</h1>
        <hr/>
        <p>Looking at our three households (single adult, single parent with two children, and
            two parents with two children), this is how much the self-suffiency study expects
            to be spent on basic needs.</p>
        <form class="form-inline">
          <div class="form-group">
            <label>State/County:&nbsp;</label>
            <div className="btn-group">
              <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {this.props.selectedCounty.name} <span className="caret"></span>
              </button>
              <ul className="dropdown-menu">
                { _.map(this.props.counties, (county) => {
                    return <li key={county.fips} onClick={_.bind(this.props.selectCounty, this, county)}><a>{county.name}</a></li>
                  })
                }
              </ul>
            </div>
          </div>
        </form>
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

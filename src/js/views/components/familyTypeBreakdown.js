import React from 'react';
import ProgressBar from '../components/progressBar';


let Breakdown = React.createClass({
	render() {
		return (
      <div className="row">
          <div className="col-xs-2 family-type-icon">
              <h3><i className="fa fa-4x fa-user"></i></h3>
          </div>

          <div className="col-xs-10">
              <h3 className="row text-left"><div className="col-xs-6"> {this.props.name}</div></h3>
              <ProgressBar completed={this.props.percentage} text={this.props.households + " households"} />
          </div>
      </div>
		);
	}
});

export default Breakdown;

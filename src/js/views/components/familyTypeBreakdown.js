import React from 'react';
import classNames from "classnames";


let Breakdown = React.createClass({
	numberWithCommas: function(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
	},
	render() {
		let color = classNames("progress-bar", "under");
		if (this.props.sufficiency >= 90)
		{
			color = classNames("progress-bar", "over");
		}
		else if (this.props.sufficiency >= 50) {
			color = classNames("progress-bar", "sufficient");
		}
		let img = "/public/images/family-single-adult.png";
		if (this.props.populationKey === "singleParent")
		{
			img = "/public/images/family-one-parent.png";
		}
		else if (this.props.populationKey === "marriedFamily") {
			img = "/public/images/family-two-parent.png";
		}
		return (
      <div className="row">
          <div className="col-xs-2 family-type-icon">
              <h3><img className="icon-height" alt={this.props.name} src={img}/></h3>
          </div>

          <div className="col-xs-10">
              <h3 className="row text-left"><div className="col-xs-6"> {this.props.name}</div></h3>
							<div className="total-divider-container">
								<div className="total-divider" style={{width: this.props.totalPercent + '%'}}/>
								<div className="total-annotation-container" style={{left: this.props.totalPercent + '%'}}>
									<div className="total-annotation"><em>Total Households</em></div>
								</div>
							</div>
							<div className="progress">
									<div className={color} role="progressbar" aria-valuenow={this.props.percentage} style={{width:this.props.percentage + "%"}} aria-valuemin="0" aria-valuemax="100">
											<span className="percentage">{this.numberWithCommas(this.props.households) + " households"}</span>
									</div>
							</div>

          </div>
      </div>
		);
	}
});

export default Breakdown;

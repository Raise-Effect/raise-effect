import React from "react";
import SliderBox from './views/components/sliderBox';
import Households from './views/components/households';
import ProgressBar from './views/components/progressBar';
import MapView from './views/components/MapView';
import counties from './../fixtures/counties';
import _ from 'lodash';

let HomePage = React.createClass({
    getInitialState: function() {
        return {selectedCounty: {fips: "41", name: "Oregon"}}
    },

    selectCounty: function(county) {
        this.setState({selectedCounty: county});
    },

    render: function() {
        return (
            <div className="col-xs-12">
                <div className="row">
                    <div className="col-md-12">
                        <div className="jumbotron">
                            <h1 className="page-header">Raise Effect</h1>
                            <p className="lead">The Oregon minimum wage is currently <a href="#">$9.25</a>. Is that enough? We’ve looked at different types of families in the state of Oregon to see if the current minimum wage supports <a href="#">self-sufficiency</a>.</p>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12 component wage-slider">
                        <h2>How would you raise the minimum wage?</h2>
                        <div id="slider">
                          <SliderBox />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 component map">
                        <div id="impact">
                        </div>
                        <h2>Impact</h2>

                        <div id="impactProgress">
                          <ProgressBar completed={47}/>
                        </div>

                        <h3><span className="impact-percentage">50</span>% meet or exceed self-sufficiency in
                            <div className="btn-group">
                              <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {this.state.selectedCounty.name} <i className="fa fa-angle-down"></i>
                              </button>
                              <ul className="dropdown-menu">
                                { _.map(counties, (county) => {
                                    return <li onClick={_.bind(this.selectCounty, this, county)}>{county.name}</li>
                                }
                                )}
                              </ul>
                            </div>
                        </h3>

                        <div id="map">
                          <MapView selectedCounty={this.state.selectedCounty.fips} />
                        </div>
                    </div>

                    <div className="col-md-6 component households" id="households">
                      <Households />
                    </div>
                </div>
            </div>
        )
    }
})

export default HomePage;

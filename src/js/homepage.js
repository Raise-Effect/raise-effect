import React from "react";
import SliderBox from './views/components/sliderBox';
import Households from './views/components/households';
import ProgressBar from './views/components/progressBar';
import MapView from './views/components/MapView';
import counties from './../fixtures/counties';
import _ from 'lodash';
import $ from 'jquery';
import api from './api';

let singleAdultTypes = [
  "a1i0p0s0t0"
]

let singleParentFamilyTypes = [
  "a1i2p0s0t0",
  "a1i1p1s0t0",
  "a1i1p0s1t0",
  "a1i1p0s0t1",
  "a1i0p2s0t0",
  "a1i0p1s1t0",
  "a1i0p1s0t1",
  "a1i0p0s2t0",
  "a1i0p0s1t1",
  "a1i0p0s0t2",
]

let marriedParentFamilyTypes = [
  "a2i2p0s0t0",
  "a2i1p1s0t0",
  "a2i1p0s1t0",
  "a2i1p0s0t1",
  "a2i0p2s0t0",
  "a2i0p1s1t0",
  "a2i0p1s0t1",
  "a2i0p0s2t0",
  "a2i0p0s1t1",
  "a2i0p0s0t2",
]


let HomePage = React.createClass({
    getInitialState: function() {
        return {
            sliderWage: 13.50,
            selectedCounty: {fips: "41", name: "Oregon"},
            census: {},
            weight: {},
            ssswages: {},
            groups: [
              {populationKey: 'totalSingleAdults', name: 'Single Adult'},
              {populationKey: 'totalSingleParents', name: 'One Adult Two Children'},
              {populationKey: 'totalMarriedParents', name: 'Two Adults One Child'},
            ]
        }
    },
    componentWillMount: function() {
      this.loadData();
    },
    loadData: function() {
      $.when(api.getCensusHousehold(), api.getWeights(), api.getSSSWages())
      .done((censusData, weightData, sssData) => {
        this.setState({
          census: _.indexBy(censusData[0].data, 'fips'),
          weight: _.groupBy(weightData[0].data, 'fips'),
          ssswages: _.groupBy(sssData[0].data, 'fips'),
        });
      })
    },

    handleSliderWageChange: function(value) {
      this.setState({
        sliderWage: value
      });
    },
    selectCounty: function(county) {
      this.setState({
        selectedCounty: county
      });
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
                          <SliderBox
                            value={this.state.sliderWage}
                            onChange={this.handleSliderWageChange}
                          />
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
                                    return <li key={county.fips} onClick={_.bind(this.selectCounty, this, county)}>{county.name}</li>
                                  })
                                }
                              </ul>
                            </div>
                        </h3>

                        <div id="map">
                          <MapView selectedCounty={this.state.selectedCounty.fips} />
                        </div>
                    </div>

                    <div className="col-md-6 component households" id="households">
                      <Households 
                        groups={this.state.groups} 
                        data={{}}
                      />
                    </div>
                </div>
            </div>
        )
    }
})

export default HomePage;

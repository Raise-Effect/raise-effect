import React from "react";
import SliderBox from './views/components/sliderBox';
import Households from './views/components/households';
import ProgressBar from './views/components/progressBar';
import MapView from './views/components/MapView';
import counties from './../fixtures/counties';
import _ from 'lodash';
import api from './api';

let HomePage = React.createClass({
    getInitialState: function() {
        return {
            sliderWage: 13.50,
            selectedCounty: {fips: "41", name: "Oregon"},
            countySSSWages: {},
            groups: [
              {familyCode: 'a1i0p0s0t0', name: 'Single Adult'},
              {familyCode: 'a1i0p2s0t0', name: 'One Adult Two Children'},
              {familyCode: 'a2i0p0s0t1', name: 'Two Adults One Child'},
            ]
        }
    },
    componentWillMount: function() {
      this.applyCountyData(this.state.selectedCounty.fips);
    },
    handleSliderWageChange: function(value) {
      this.setState({
        sliderWage: value
      });
    },
    applyCountyData: function(fips) {
      api.getSSSWages(fips).done((data) => {
        this.state.countySSSWages[fips] = data.data;
        this.setState(this.state);
      })
    },
    selectCounty: function(county) {
        this.setState({selectedCounty: county}, () => {
          this.applyCountyData(this.state.selectedCounty.fips)
        });
    },
    getSSSWageData: function() {
      var data = this.state.countySSSWages[this.state.selectedCounty.fips];
      if (!_.isEmpty(data)) {
        return _.map(this.state.groups, (group) => _.find(data, (item) => item.familyCode == group.familyCode));
      }
      return null;
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
                        annualWage={this.state.sliderWage * 8 * 5 * 4 * 12}
                        groups={this.state.groups} 
                        data={this.getSSSWageData()}
                      />
                    </div>
                </div>
            </div>
        )
    }
})

export default HomePage;

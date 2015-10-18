import React from "react";
import SliderBox from './views/components/sliderBox';
import Households from './views/components/households';
import ProgressBar from './views/components/progressBar';
import SufficiencyBarChart from './views/components/sufficiencyBarChart';
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
            population: {},
            groups: [
              {groupedFamilyCodes: singleAdultTypes, populationKey: 'singleAdult', name: 'Single Adult'},
              {groupedFamilyCodes: singleParentFamilyTypes, populationKey: 'singleParent', name: 'One Adult Two Children'},
              {groupedFamilyCodes: marriedParentFamilyTypes, populationKey: 'marriedFamily', name: 'Two Adults Two Children'},
            ],
            barGroups: [
              {groupedFamilyCodes: singleAdultTypes, populationKey: 'singleAdult', name: 'Single Adult'},
              {groupedFamilyCodes: singleParentFamilyTypes, populationKey: 'singleParent', name: 'One Adult Two Children'},
              {groupedFamilyCodes: singleAdultTypes, populationKey: 'median', name: 'Median'},
              {groupedFamilyCodes: marriedParentFamilyTypes, populationKey: 'marriedFamily', name: 'Two Adults Two Children'},
            ]
        }
    },
    componentWillMount: function() {
      this.loadData();
    },
    loadData: function() {
      $.when(api.getCensusHousehold(), api.getWeights(), api.getSSSWages(), api.getPopulation())
      .done((censusData, weightData, sssData, popData) => {
        this.setState({
          census: _.indexBy(censusData[0].data, 'fips'),
          weight: _.groupBy(weightData[0].data, 'fips'),
          ssswages: _.groupBy(this.getOregonWages(sssData[0].data), 'fips'),
          population: _.groupBy(this.getOregonMedian(popData[0].data), 'fips')
        });
      })
    },
    getOregonWages: function(data) {
      var oregonFipsData = _(data).groupBy('familyCode').map((codeData, key) => {
        return {
                  familyCode: key,
                  fips: '41',
                  annual: _.sum(codeData, (countyData) => countyData.annual) / (_.size(codeData) + 1)
                }
      }).value()

      return data.concat(oregonFipsData);
    },
    getOregonMedian: function(data) {
      var oregonMedian = {
                          fips: '41',
                          mostCommonFamilyType: 'a1i1p1s0t0'
                         }
      return data.concat(oregonMedian);
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
    getPopulationPercents: function() {
      if (!this.state.census[this.state.selectedCounty.fips]) return;

      var {
        totalHouseHolds,
        totalMarriedParents,
        totalSingleAdults,
        totalSingleParents
      } = this.state.census[this.state.selectedCounty.fips];
      return {
        singleAdult: Math.ceil( (totalSingleAdults/totalHouseHolds) * 100 ),
        singleParent: Math.ceil( (totalSingleParents/totalHouseHolds) * 100 ),
        marriedFamily: Math.ceil( (totalMarriedParents/totalHouseHolds) * 100 ),
      }
    },
    getSufficiencyPercents: function() {
      var selectedAnnualWage = this.state.sliderWage * 8 * 5 * 4 * 12;
      var countyWages = this.state.ssswages[this.state.selectedCounty.fips];
      var countyWeights = this.state.weight[this.state.selectedCounty.fips];
      return {
        singleAdult: this.getAggregatePercent(selectedAnnualWage, this.state.groups[0].groupedFamilyCodes, countyWages, countyWeights),
        singleParent: this.getAggregatePercent(selectedAnnualWage, this.state.groups[1].groupedFamilyCodes, countyWages, countyWeights),
        marriedFamily: this.getAggregatePercent(selectedAnnualWage * 2, this.state.groups[2].groupedFamilyCodes, countyWages, countyWeights)
      }
    },
    getBarSufficiencyPercents: function() {
      var selectedAnnualWage = this.state.sliderWage * 8 * 5 * 4 * 12;
      var countyWages = this.state.ssswages[this.state.selectedCounty.fips];
      var countyWeights = this.state.weight[this.state.selectedCounty.fips];
      var median = this.state.population[this.state.selectedCounty.fips];
      let medianFamilyType = median === null ? median.mostCommonFamilyType : "a1i1p1s0t0";

      return {
        singleAdult: this.getBarAggregatePercent(selectedAnnualWage, this.state.groups[0].groupedFamilyCodes, countyWages, countyWeights),
        singleParent: this.getBarAggregatePercent(selectedAnnualWage, this.state.groups[1].groupedFamilyCodes, countyWages, countyWeights),
        median: this.getBarAggregatePercent(selectedAnnualWage, [medianFamilyType], countyWages, countyWeights),
        marriedFamily: this.getBarAggregatePercent(selectedAnnualWage * 2, this.state.groups[2].groupedFamilyCodes, countyWages, countyWeights)
      }
    },
    getAggregatePercent: function(wage, familyCodes, countyWages, countyWeights) {
      //Until the weight becomes correct, the following provides us a reasonably close approximation.
      //TODO: REMOVE THE FOLLOWING LINE
      let totalWeight = _.sum(countyWeights, (weight) => _.some(familyCodes, (code) => weight.familycode === code) ? weight.weight : 0);
      var a = Math.ceil(_(familyCodes).map( (code) => {
        var annual = _.find(countyWages, (wage) => wage.familyCode === code);
        var weight = _.find(countyWeights, (weight) => weight.familycode === code);

        if (!annual) return 0;
        //TODO: Remove / totalWeight
        return Math.ceil(wage) >= Math.ceil(annual.annual) ? (weight && (weight.weight / totalWeight) || 1) : 0;
      }).sum() * 100)

      return a;
    },
    getBarAggregatePercent: function(wage, familyCodes, countyWages, countyWeights) {
      //Until the weight becomes correct, the following provides us a reasonably close approximation.
      //TODO: REMOVE THE FOLLOWING LINE
      let totalWeight = _.sum(countyWeights, (weight) => _.some(familyCodes, (code) => weight.familycode === code) ? weight.weight : 0);
      var a = Math.ceil(wage / _(familyCodes).map( (code) => {
        var annual = _.find(countyWages, (wage) => wage.familyCode === code);
        var weight = _.find(countyWeights, (weight) => weight.familycode === code);

        if (!annual) return 0;
        //TODO: Remove / totalWeight
        return Math.ceil(annual.annual) * (weight && (weight.weight / totalWeight) || 1);
      }).sum() * 100)
      if (a == Infinity) return 0;
      return a;
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
                        population={this.getPopulationPercents()}
                        sufficieny={this.getSufficiencyPercents()}
                      />
                    </div>
                </div>
                <SufficiencyBarChart sufficiency={this.getBarSufficiencyPercents()}
                                     groups={this.state.barGroups}
                                     />
            </div>
        )
    }
})

export default HomePage;

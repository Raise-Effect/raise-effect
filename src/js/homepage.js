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
            wageStats: {},
            population: {},
            groups: [
              {groupedFamilyCodes: singleAdultTypes, populationKey: 'singleAdult', name: 'Single Adult'},
              {groupedFamilyCodes: singleParentFamilyTypes, populationKey: 'singleParent', name: 'One Adult Two Children'},
              {groupedFamilyCodes: marriedParentFamilyTypes, populationKey: 'marriedFamily', name: 'Two Adults Two Children'},
            ],
            barGroups: [
              {groupedFamilyCodes: singleAdultTypes, populationKey: 'singleAdult', name: 'Single Adult'},
              {groupedFamilyCodes: singleParentFamilyTypes, populationKey: 'singleParent', name: 'One Adult Two Children'},
              {groupedFamilyCodes: marriedParentFamilyTypes, populationKey: 'marriedFamily', name: 'Two Adults Two Children'},
            ]
        }
    },
    componentWillMount: function() {
      this.loadData();
    },
    loadData: function() {
      $.when(api.getCensusHousehold(), api.getWeights(), api.getSSSWages(), api.getPopulation(), api.getWageStats())
      .done((censusData, weightData, sssData, popData, wageData) => {
        this.setState({
          census: _.indexBy(censusData[0].data, 'fips'),
          weight: _.groupBy(weightData[0].data, 'fips'),
          wageStats: _.groupBy(wageData[0].data, 'fips'),
          ssswages: _.groupBy(this.getOregonWages(sssData[0].data), 'fips'),
          population: _.groupBy(popData[0].data, 'fips')
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
    getOregonAggregation: function(data) {
      if (!data) return;
      let singleAdult = 0, singleParent = 0, marriedFamily = 0,
          totalLowIncomeHouseholds = 0,totalHouseholds = 0,
          lowIncomeSingleAdults = 0, lowIncomeSingleParents = 0,
          lowIncomeMarriedParents = 0;
      _.each(data, (entry) => {
        singleAdult += entry.singleAdult;
        singleParent += entry.singleParent;
        marriedFamily += entry.marriedFamily;
        lowIncomeSingleAdults += entry.lowIncomeSingleAdults;
        lowIncomeMarriedParents += entry.lowIncomeMarriedParents;
        lowIncomeSingleParents += entry.lowIncomeSingleParents;
        totalLowIncomeHouseholds += entry.totalLowIncomeHouseholds;
        totalHouseholds += entry.totalHouseholds;
      });
      data[41] = {
            fips: 41,
            singleAdult: singleAdult,
            lowIncomeSingleAdults: lowIncomeSingleAdults,
            singleAdultPercent: Math.round(singleAdult/lowIncomeSingleAdults * 100),
            singleParent: singleParent,
            lowIncomeSingleParents: lowIncomeSingleParents,
            singleParentPercent: Math.round(singleParent/lowIncomeSingleParents * 100),
            marriedFamily: marriedFamily,
            lowIncomeMarriedParents: lowIncomeMarriedParents,
            marriedFamilyPercent: Math.round(marriedFamily/lowIncomeMarriedParents * 100),
            totalLowIncomeHouseholds: totalLowIncomeHouseholds,
            totalHouseholds: totalHouseholds,
            totalPercent: Math.round((singleAdult + singleParent + marriedFamily) / totalLowIncomeHouseholds * 100)
          };
      return data;
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
        lowIncomeSingleAdults,
        lowIncomeSingleParents,
        lowIncomeMarriedParents
      } = this.state.census[this.state.selectedCounty.fips];
      var totalHouseHolds = lowIncomeMarriedParents + lowIncomeSingleParents + lowIncomeSingleAdults;
      return {
        singleAdult: Math.ceil( (lowIncomeSingleAdults/totalHouseHolds) * 100 ),
        singleParent: Math.ceil( (lowIncomeSingleParents/totalHouseHolds) * 100 ),
        marriedFamily: Math.ceil( (lowIncomeMarriedParents/totalHouseHolds) * 100 ),
      }
    },
    getMapSufficiencyPercents: function() {
      if (!this.state.census[41]) return;
      var selectedAnnualWage = this.state.sliderWage * 8 * 22 * 12;
      var set = _(this.state.weight).map((weight, key) => {
        var {
          lowIncomeSingleAdults,
          lowIncomeSingleParents,
          lowIncomeMarriedParents,
          totalHouseholds
        } = this.state.census[key];
        var countyWages = this.state.ssswages[key];
        var countyWeights = this.state.weight[key];
        var totalLowIncomeHouseholds = lowIncomeSingleAdults + lowIncomeSingleParents + lowIncomeMarriedParents;
        var singleAdult = this.getAggregate(selectedAnnualWage, this.state.groups[0].groupedFamilyCodes, countyWages, countyWeights,lowIncomeSingleAdults);
        var singleParent = this.getAggregate(selectedAnnualWage, this.state.groups[1].groupedFamilyCodes, countyWages, countyWeights, lowIncomeSingleParents);
        var marriedFamily = this.getAggregate(selectedAnnualWage * 2, this.state.groups[2].groupedFamilyCodes, countyWages, countyWeights, lowIncomeMarriedParents);

        return {
          fips: key,
          singleAdult: singleAdult,
          lowIncomeSingleAdults: lowIncomeSingleAdults,
          singleAdultPercent: Math.round(singleAdult/lowIncomeSingleAdults * 100),
          singleParent: singleParent,
          lowIncomeSingleParents: lowIncomeSingleParents,
          singleParentPercent: Math.round(singleParent/lowIncomeSingleParents * 100),
          marriedFamily: marriedFamily,
          lowIncomeMarriedParents: lowIncomeMarriedParents,
          marriedFamilyPercent: Math.round(marriedFamily/lowIncomeMarriedParents * 100),
          totalLowIncomeHouseholds: totalLowIncomeHouseholds,
          totalHouseholds: totalHouseholds,
          totalPercent: Math.round((singleAdult + singleParent + marriedFamily) / totalLowIncomeHouseholds * 100)
        };
      });
      return _.indexBy(set.value(), 'fips');

    },
    getSufficiencyPercents: function() {
      if (!this.state.census[this.state.selectedCounty.fips]) return;
      var result = this.getOregonAggregation(this.getMapSufficiencyPercents());
      var geo = result[this.state.selectedCounty.fips];
      var cap = Math.max(geo.lowIncomeSingleAdults,geo.lowIncomeSingleParents,geo.lowIncomeMarriedParents);
      return {
        geoPercent: Math.round((geo.totalLowIncomeHouseholds / geo.totalHouseholds) * 100),
        households: {
          singleAdult: geo.singleAdult,
          singleParent: geo.singleParent,
          marriedFamily: geo.marriedFamily
        },
        percents: {
          singleAdult: Math.round(geo.singleAdult / cap * 100),
          singleParent: Math.round(geo.singleParent / cap * 100),
          marriedFamily: Math.round(geo.marriedFamily / cap * 100)
        },
        totalPercents: {
          singleAdult: Math.round(geo.lowIncomeSingleAdults / cap * 100),
          singleParent: Math.round(geo.lowIncomeSingleParents / cap * 100),
          marriedFamily: Math.round(geo.lowIncomeMarriedParents / cap * 100)
        },
        sufficiency: {
          singleAdult: Math.round(geo.singleAdult / geo.lowIncomeSingleAdults * 100),
          singleParent: Math.round(geo.singleParent / geo.lowIncomeSingleParents * 100),
          marriedFamily: Math.round(geo.marriedFamily / geo.lowIncomeMarriedParents * 100)
        }

      }
    },
    getBarSufficiencyPercents: function() {
      var selectedAnnualWage = this.state.sliderWage * 8 * 22 * 12;
      var countyWages = this.state.ssswages[this.state.selectedCounty.fips];
      var countyWeights = this.state.weight[this.state.selectedCounty.fips];

      return {
        singleAdult: this.getBarAggregatePercent(selectedAnnualWage, this.state.groups[0].groupedFamilyCodes, countyWages, countyWeights),
        singleParent: this.getBarAggregatePercent(selectedAnnualWage, this.state.groups[1].groupedFamilyCodes, countyWages, countyWeights),
        marriedFamily: this.getBarAggregatePercent(selectedAnnualWage * 2, this.state.groups[2].groupedFamilyCodes, countyWages, countyWeights)
      }
    },
    getAggregatePercent: function(wage, familyCodes, countyWages, countyWeights) {
      var a = Math.round(_(familyCodes).map( (code) => {
        var annual = _.find(countyWages, (wage) => wage.familyCode === code);
        var weight = _.find(countyWeights, (weight) => weight.familyCode === code);

        if (!annual) return 0;
        //TODO: Remove / totalWeight
        return Math.round(wage) >= Math.ceil(annual.annual) ? (weight && (weight.weight) || 1) : 0;
      }).sum() * 100)

      return a;
    },
    getAggregate: function(wage, familyCodes, countyWages, countyWeights, householdNumber) {
      var a = Math.round(_(familyCodes).map( (code) => {
        var annual = _.find(countyWages, (wage) => wage.familyCode === code);
        var weight = _.find(countyWeights, (weight) => weight.familyCode === code);

        if (!annual) return 0;
        //TODO: Remove / totalWeight
        return Math.round(wage) >= Math.ceil(annual.annual) ? (weight && (weight.weight) || 1) * householdNumber : 0;
      }).sum());

      return a;
    },

    getBarAggregatePercent: function(wage, familyCodes, countyWages, countyWeights) {

      var a = Math.round(wage / _(familyCodes).map( (code) => {
        var annual = _.find(countyWages, (wage) => wage.familyCode === code);
        var weight = _.find(countyWeights, (weight) => weight.familyCode === code);

        if (!annual) return 0;
        //TODO: Remove / totalWeight
        return Math.round(annual.annual) * (weight && (weight.weight) || 1);
      }).sum() * 100)
      if (a == Infinity) return 0;
      return a;
    },
    render: function() {
        return (
            <div className="col-xs-12">
                <div className="row">
                    <div className="col-md-12">
                        <div className="text-center">

                            <h4>The Oregon minimum wage is currently <a href="#">$9.25</a>. Is that enough? We’ve looked at different types of families in the state of Oregon to see if the current minimum wage supports <a href="#">self-sufficiency</a>.</h4>
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
                    <h2>What’s the Regional Impact?</h2>
                    <small>Understanding that some households will meet or exceed self-sufficiency at different rates,
                    the color of the county relates to an average of all low income family types (link) in a county. </small>
                        <h3>
                            <div className="btn-group">
                              <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {this.state.selectedCounty.name} <span className="caret"></span>
                              </button>
                              <ul className="dropdown-menu">
                                { _.map(counties, (county) => {
                                    return <li key={county.fips} onClick={_.bind(this.selectCounty, this, county)}><a>{county.name}</a></li>
                                  })
                                }
                              </ul>
                            </div>
                        </h3>

                        <div id="map">
                          <MapView selectedCounty={this.state.selectedCounty.fips} onMapSelect={this.selectCounty} sufficiency={this.getMapSufficiencyPercents()} />
                        </div>
                    </div>

                    <div className="col-md-6 component households" id="households">
                      <Households
                        groups={this.state.groups}
                        data={this.getSufficiencyPercents()}
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

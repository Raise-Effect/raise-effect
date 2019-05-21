import React from "react";
import StickyDiv from "react-stickydiv";
import SliderBox from './views/components/sliderBox';
import Households from './views/components/households';
import FamilyLife from './views/components/familyLife';
import SufficiencyBarChart from './views/components/sufficiencyBarChart';
import MapView from './views/components/MapView';
import counties from './../fixtures/counties';
import _ from 'lodash';
import $ from 'jquery';
import api from './api';
import { Link } from 'react-router';

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
            sliderWage: 9.25,
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
      $.when(api.getCensusHousehold(), api.getWeights(), api.getSSSWages(), api.getPopulation(), api.getWageStats(), api.getSSSBudget())
      .done((censusData, weightData, sssData, popData, wageData, budget) => {
        this.setState({
          census: _.indexBy(censusData[0].data, 'fips'),
          weight: _.groupBy(weightData[0].data, 'fips'),
          wageStats: _.groupBy(wageData[0].data, 'fips'),
          ssswages: _.groupBy(this.getOregonWages(sssData[0].data), 'fips'),
          population: _.groupBy(popData[0].data, 'fips'),
          budgets: _.groupBy(budget[0].data, 'fips')
        });
      })
    },
    getBudgetData: function() {
      if (this.state.selectedCounty.fips === "41") {
        return [
          {name: "Housing", singleParent: 842, singleAdult: 673, marriedFamily: 842 },
          {name: "Food", singleParent: 608, singleAdult: 250, marriedFamily: 841},
          {name: "Childcare", singleParent: 906, singleAdult: 0, marriedFamily: 944},
          {name: "Healthcare", singleParent: 425, singleAdult: 127, marriedFamily: 480},
          {name: "Transportation", singleParent: 231, singleAdult: 225, marriedFamily: 442},
          {name: "Taxes", singleParent: 691, singleAdult: 332, marriedFamily: 767},
          {name: "Misc", singleParent: 301, singleAdult: 127, marriedFamily: 352}
        ];
      }
      else {
        var budgets = this.state.budgets[this.state.selectedCounty.fips];
        var weights = this.state.weight[this.state.selectedCounty.fips];
        var singleAdult = this.getWeightedBudget(singleAdultTypes,budgets,weights);
        var singleParent = this.getWeightedBudget(singleParentFamilyTypes,budgets,weights);
        var marriedFamily = this.getWeightedBudget(marriedParentFamilyTypes,budgets,weights);
        _.forOwn(singleAdult, function(value, key) { singleAdult[key] = Math.round(value) } );
        _.forOwn(singleParent, function(value, key) { singleParent[key] = Math.round(value) } );
        _.forOwn(marriedFamily, function(value, key) { marriedFamily[key] = Math.round(value) } );
        return [
          {name: "Housing", singleParent: singleParent.housing, singleAdult: singleAdult.housing, marriedFamily: marriedFamily.housing},
          {name: "Food", singleParent: singleParent.food, singleAdult: singleAdult.food, marriedFamily: marriedFamily.food},
          {name: "Childcare", singleParent: singleParent.childcare, singleAdult: singleAdult.childcare, marriedFamily: marriedFamily.childcare},
          {name: "Healthcare", singleParent: singleParent.healthcare, singleAdult: singleAdult.healthcare, marriedFamily: marriedFamily.healthcare},
          {name: "Transportation", singleParent: singleParent.transportation, singleAdult: singleAdult.transportation, marriedFamily: marriedFamily.transportation},
          {name: "Taxes", singleParent: singleParent.taxes, singleAdult: singleAdult.taxes, marriedFamily: marriedFamily.taxes},
          {name: "Misc", singleParent: singleParent.miscellaneous, singleAdult: singleAdult.miscellaneous, marriedFamily: marriedFamily.miscellaneous}
        ];
      }
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

    getAnnualIncome: function() {
      var selectedAnnualWage = this.state.sliderWage * 8 * 22 * 12;

      return {
        singleAdult: selectedAnnualWage,
        singleParent: selectedAnnualWage,
        marriedFamily: selectedAnnualWage * 2
      }
    },

    getBarChartAnnualIncome: function(familyCodes, countyWages, countyWeights) {
      var a = Math.round(_(familyCodes).map( (code) => {
        var annual = _.find(countyWages, (wage) => wage.familyCode === code);
        var weight = _.find(countyWeights, (weight) => weight.familyCode === code);

        if (!annual) return 0;
        //TODO: Remove / totalWeight
        return Math.round(annual.annual) * (weight ? weight.weight : 1);
      }).sum())

      return a;
    },

    getAnnualSufficiencyWage: function() {
      var fips          = this.state.selectedCounty.fips,
          countyWages   = this.state.ssswages[fips],
          countyWeights = this.state.weight[fips];

      if (fips === "41") {
        return {
          singleAdult: Math.round(20815.98732),
          singleParent: Math.round(48044.57333),
          marriedFamily: Math.round(55700.75597)
        }
      } else {
        return {
          singleAdult: this.getBarChartAnnualIncome(singleAdultTypes, countyWages, countyWeights),
          singleParent: this.getBarChartAnnualIncome(singleParentFamilyTypes, countyWages, countyWeights),
          marriedFamily: this.getBarChartAnnualIncome(marriedParentFamilyTypes, countyWages, countyWeights)
        }
      }
    },

    getMedianIncome: function() {
      if (_.isEmpty(this.state.wageStats)) return {};
      var fips = this.state.selectedCounty.fips;

      return {
        singleAdult: this.state.wageStats[fips][0].nonFamilyMedianIncome,
        singleParent: this.state.wageStats[fips][0].familyMedianIncome,
        marriedFamily: this.state.wageStats[fips][0].marriedMedianIncome,
        household: this.state.wageStats[fips][0].householdMedianIncome
      }
    },

    getBarChartIncomeData: function() {
      var sufficiencyWageData = this.getAnnualSufficiencyWage(),
          medianIncomeData    = this.getMedianIncome();

      var data =  {
        singleAdult: {
          povertyLine: 11490,
          sufficiencyWage: sufficiencyWageData.singleAdult,
          medianIncome: medianIncomeData.singleAdult,
          householdMedianIncome: medianIncomeData.household
        },
        singleParent: {
          povertyLine: 19530,
          sufficiencyWage: sufficiencyWageData.singleParent,
          medianIncome: medianIncomeData.singleParent,
          householdMedianIncome: medianIncomeData.household
        },
        marriedFamily: {
          povertyLine: 23550,
          sufficiencyWage: sufficiencyWageData.marriedFamily,
          medianIncome: medianIncomeData.marriedFamily,
          householdMedianIncome: medianIncomeData.household
        }
      }

      return data;
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

    getWeightedBudget: function(familyCodes, countyBudgets, countyWeights) {
      var budgets = _.map(familyCodes,(code) => {
        var budget = _.find(countyBudgets, (wage) => wage.familyCode === code);
        var weight = _.find(countyWeights, (weight) => weight.familyCode === code);

        if (!budget) return 0;

        return {
          food: budget.food * (weight ? weight.weight : 1),
          childcare: budget.childcare * (weight ? weight.weight : 1),
          healthcare: budget.healthcare * (weight ? weight.weight : 1),
          housing: budget.housing * (weight ? weight.weight : 1),
          miscellaneous: budget.miscellaneous * (weight ? weight.weight : 1),
          taxes: budget.taxes * (weight ? weight.weight : 1),
          transportation: budget.transportation * (weight ? weight.weight : 1)
        };
      });
      var result = {food: 0,childcare: 0,healthcare: 0,housing: 0,miscellaneous: 0,
                    taxes: 0,transportation: 0};
      _.each(budgets, (budget) => {
        result.food += budget.food;
        result.childcare += budget.childcare;
        result.healthcare += budget.healthcare;
        result.housing += budget.housing;
        result.miscellaneous += budget.miscellaneous;
        result.taxes += budget.taxes;
        result.transportation += budget.transportation;
      });

      return result;
    },

    render: function() {
        return (
            <div className="col-xs-12">
                <div className="row">
                  <div className="jumbotron">
                    <p>The Oregon minimum wage is <Link to="/discussion">$9.25</Link>. Is that enough? Here are some visualizations to help understand how the quality of life may be affected by a minimum wage increase for different household types in different counties across Oregon.</p>
                  </div>
                </div>

                <div className="row">
                  <div className="jumbotron">
                    <h1>What is the Impact of the Minimum Wage?</h1>
                    <hr/>
                    <p>Does raising the minimum wage affect all low-income households equally? How do location and family composition change the impact of a minimum wage increase? What would you do?</p>

                    <div className="slider-container">
                        <SliderBox
                          value={this.state.sliderWage}
                          onChange={this.handleSliderWageChange}
                        />
                    </div>

                    <div className="col-md-6 component map">
                      <h2>What is the Impact in Oregon and Each County Within the State?</h2>


                        <form className="form-inline">
                          <div className="form-group">
                            <label>State/County:&nbsp;</label>
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
                          </div>
                        </form>



                        <div id="map">
                          <MapView selectedCounty={this.state.selectedCounty.fips} onMapSelect={this.selectCounty} sufficiency={this.getMapSufficiencyPercents()} />
                        </div>
                          <p className="data-hint"><u>Data Hint</u>: Understanding that some households will meet or exceed self-sufficiency
                            at different rates, the color of the county relates to an average of all
                            low income family types in a county.</p>
                      </div>

                      <div className="col-md-6 component households" id="households">
                        <Households
                          groups={this.state.groups}
                          data={this.getSufficiencyPercents()}
                        />
                      </div>
                    </div>
                </div>

                <div className="row">
                  <div className="jumbotron">
                    <h1>Does this Wage Allow Households to Meet or Exceed Basic Benchmarks?</h1>
                    <hr/>
                    <p>To better understand self-sufficiency, the graph below frames it between the Federal Poverty Line
                        and the Median Income for each household type. What happens when one household type easily exceeds a benchmark and others are struggling to reach it? How do these benchmarks change by location?</p>
                      <div className="slider-container">
                          <SliderBox
                            value={this.state.sliderWage}
                            onChange={this.handleSliderWageChange}
                          />
                      </div>
                  </div>
                </div>

                <div className="row">
                  <SufficiencyBarChart income={this.getAnnualIncome()}
                                       wageData={this.getBarChartIncomeData()}
                                       groups={this.state.barGroups}
                  />
                </div>
                <div>
                    <p className="data-hint"><br/><u>Data Hint</u>: Keep in mind the distribution of low income population across different household types will vary from region to region.</p>
                </div>
                <div className="row">
                  <FamilyLife selectCounty={this.selectCounty} counties={counties} selectedCounty={this.state.selectedCounty} data={this.getBudgetData()}/>
                </div>

            </div>
        )
    }
})

export default HomePage;

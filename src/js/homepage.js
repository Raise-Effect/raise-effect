import React from "react";
import SliderBox from './views/components/sliderBox';
import Households from './views/components/households';
import ProgressBar from './views/components/progressBar';
import MapView from './views/components/MapView';

let HomePage = React.createClass({
    selectCounty: function(event) {
        alert("FIPS code: " + event.target.dataset.fips);
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
                                Oregon <i className="fa fa-angle-down"></i>
                              </button>
                              <ul className="dropdown-menu">
                                <li onClick={this.selectCounty} data-fips={"41001"}>Baker</li>
                                <li onClick={this.selectCounty} data-fips={"41003"}>Benton</li>
                                <li onClick={this.selectCounty} data-fips={"41005"}>Clackamas</li>
                                <li onClick={this.selectCounty} data-fips={"41007"}>Clatsop</li>
                                <li onClick={this.selectCounty} data-fips={"41009"}>Columbia</li>
                                <li onClick={this.selectCounty} data-fips={"41011"}>Coos</li>
                                <li onClick={this.selectCounty} data-fips={"41013"}>Crook</li>
                                <li onClick={this.selectCounty} data-fips={"41015"}>Curry</li>
                                <li onClick={this.selectCounty} data-fips={"41017"}>Deschutes</li>
                                <li onClick={this.selectCounty} data-fips={"41019"}>Douglas</li>
                                <li onClick={this.selectCounty} data-fips={"41021"}>Gilliam</li>
                                <li onClick={this.selectCounty} data-fips={"41023"}>Grant</li>
                                <li onClick={this.selectCounty} data-fips={"41025"}>Harney</li>
                                <li onClick={this.selectCounty} data-fips={"41027"}>Hood River</li>
                                <li onClick={this.selectCounty} data-fips={"41029"}>Jackson</li>
                                <li onClick={this.selectCounty} data-fips={"41031"}>Jefferson</li>
                                <li onClick={this.selectCounty} data-fips={"41033"}>Josephine</li>
                                <li onClick={this.selectCounty} data-fips={"41035"}>Klamath</li>
                                <li onClick={this.selectCounty} data-fips={"41037"}>Lake</li>
                                <li onClick={this.selectCounty} data-fips={"41039"}>Lane</li>
                                <li onClick={this.selectCounty} data-fips={"41041"}>Lincoln</li>
                                <li onClick={this.selectCounty} data-fips={"41043"}>Linn</li>
                                <li onClick={this.selectCounty} data-fips={"41045"}>Malheur</li>
                                <li onClick={this.selectCounty} data-fips={"41047"}>Marion</li>
                                <li onClick={this.selectCounty} data-fips={"41049"}>Morrow</li>
                                <li onClick={this.selectCounty} data-fips={"41051"}>Multnomah</li>
                                <li onClick={this.selectCounty} data-fips={"41053"}>Polk</li>
                                <li onClick={this.selectCounty} data-fips={"41055"}>Sherman</li>
                                <li onClick={this.selectCounty} data-fips={"41057"}>Tillamook</li>
                                <li onClick={this.selectCounty} data-fips={"41059"}>Umatilla</li>
                                <li onClick={this.selectCounty} data-fips={"41061"}>Union</li>
                                <li onClick={this.selectCounty} data-fips={"41063"}>Wallowa</li>
                                <li onClick={this.selectCounty} data-fips={"41065"}>Wasco</li>
                                <li onClick={this.selectCounty} data-fips={"41067"}>Washington</li>
                                <li onClick={this.selectCounty} data-fips={"41069"}>Wheeler</li>
                                <li onClick={this.selectCounty} data-fips={"41071"}>Yamhill</li>
                              </ul>
                            </div>
                        </h3>

                        <div id="map">
                          <MapView />
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

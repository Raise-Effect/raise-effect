import React from "react";
import SliderBox from './views/components/sliderBox';
import Households from './views/components/households';
import ProgressBar from './views/components/progressBar';
import MapView from './views/components/MapView';

let HomePage = React.createClass({

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
                        <li><a href="#">Multnomah</a></li>
                        <li><a href="#">Washington</a></li>
                        <li><a href="#">Clackamas</a></li>
                        <li><a href="#">Lane</a></li>
                        <li><a href="#">Marion</a></li>
                        <li><a href="#">Jackson</a></li>
                        <li><a href="#">Deschutes</a></li>
                        <li><a href="#">Linn</a></li>
                        <li><a href="#">Douglas</a></li>
                        <li><a href="#">Yahmill</a></li>
                        <li><a href="#">Benton</a></li>
                        <li><a href="#">Josephine</a></li>
                        <li><a href="#">Umatilla</a></li>
                        <li><a href="#">Polk</a></li>
                        <li><a href="#">Klamath</a></li>
                        <li><a href="#">Coos</a></li>
                        <li><a href="#">...</a></li>
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
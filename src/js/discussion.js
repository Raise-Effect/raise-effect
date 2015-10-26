import React from "react";
import jQuery from "jquery";

let Discussion = React.createClass({
  getInitialState: function() {
    //An unfortunate work around due to a bug in nvd3 that causes a blank tooltip to exist...
    jQuery(".nvtooltip").remove();
    return null;
  },
  render: function() {
    return (
      <div>
      	<h1>Discussion</h1>
      	<p>
            The North Star Civic Foundation provided data for Raise Effect. The <a href="www.northstarcivic.org">North Star Civic Foundation</a>&nbsp;
            is dedicated to supporting better lawmaking with impartial research and community dialogue across ideological lines.
            They focus on wealth inequality and climate change, and they are currently engaged in providing both economic data and community-based
            interviews to support public policy development around increasing the minimum wage.
        </p>
        <p>
            North Star introduced our volunteers to the <a href="http://raiseeffect.org/#/about?_k=vehker">Self Sufficiency Standard</a>, a 20 year old alternative the Federal Poverty Level, developed by the University of Washington Center for Women’s Welfare.
        </p>
        <p>
            We discussed minimum wage and current public policy options with North Star’s executive director, Caitlin Baggott.
        </p>
      	<div>
      		<div>
      			<p className="discussion__question"><span>QUESTION:</span> Do economists think that the minimum wage should be set based on the cost of living?</p>
      			<p className="discussion__answer"><span>CB:</span> At the end of the day, politics sets the minimum wage – in the legislature or at the ballot – not economists. But current economic thinking says that the minimum wage should be set by looking at cost of living, the health of the economy (indicated as a share of the median wage), and regional impacts.</p>
      			<p className="discussion__source-material"><span>SOURCE:</span> <a href="http://www.hamiltonproject.org/assets/legacy/files/downloads_and_links/state_local_minimum_wage_policy_dube.pdf">www.hamiltonproject.org/assets/legacy/files/downloads_and_links/state_local_minimum_wage_policy_dube.pdf</a></p>
      		</div>
      		<div>
      			<p className="discussion__question"><span>QUESTION:</span> Some say that Oregon already has one of the highest minimum wage floors in the nation. Why is $9.25 not enough?</p>
      			<p className="discussion__answer"><span>CB:</span> Again, you need to look at both politics and economics here. From a political point of view, the effort to increase the minimum wage is strong, national, and determined. Why is that? Because the cost of living has so far outpaced increased wages coming out of the last recession. That’s been especially true in places like the Portland metro area where knowledge economy jobs drive up the cost of housing, goods, and services. A third of Oregonian’s aren’t making enough money to pay their bills without public assistance. That inevitably creates political unrest.</p><p>Economically, the minimum wage has not kept up with productivity or the value of the dollar. According to the Pew Research Center, the federal minimum wage peaked for worker buying power in 1968. The Economist recently estimated that, given how rich the U.S. is and the pattern among other advanced economies in the Organization for Economic Cooperation and Development, “one would expect America...to pay a minimum wage around $12 an hour.”</p>
      		</div>
      		<div>
      			<p className="discussion__question"><span>QUESTION:</span> Other cities like Seattle, San Francisco and Chicago have set a higher minimum wage – $13 or $15 an hour – in response to higher costs of living. Why can't Portland do that?</p>
      			<p className="discussion__answer"><span>CB:</span> Under current Oregon law, individual communities like Portland are not allowed to set minimum wage standards that are different than the rest of the state. This was not the case for Seattle, San Francisco or Los Angeles. Oregon’s rule is called “state preemption.” One solution would be to repeal the pre­emption law and let communities set their own minimum wages. Another solution might be to pass a statewide policy that connects minimum wage to the cost of living in different parts of the state – effectively creating a range of wages throughout the state.</p>
      		</div>
      		<div>
      			<h3>Additional Resources</h3>
      			<ul>
      				<li><a href="http://www.theatlantic.com/business/archive/2013/12/should­we­raise­the­minimum­wage­11­questions­and­answers/282326/">http://www.theatlantic.com/business/archive/2013/12/should­we­raise­the­minimum­wage­11­questions­and­answers/282326/</a></li>
      				<li><a href="http://www.raisetheminimumwage.com/pages/qanda">http://www.raisetheminimumwage.com/pages/qanda</a></li>
      				<li><a href="http://www.pewresearch.org/fact­tank/2015/07/23/5­facts­about­the­minimum­wage/">http://www.pewresearch.org/fact­tank/2015/07/23/5­facts­about­the­minimum­wage/</a></li>
      				<li><a href="http://www.economist.com/blogs/economist­explains/2015/06/economist­explains­11">http://www.economist.com/blogs/economist­explains/2015/06/economist­explains­11</a></li>
      				<li><a href="http://www.economist.com/blogs/economist­explains/2015/05/economist­explains­24?zid=311&ah=308cac674cccf554ce65cf926868bbc2">http://www.economist.com/blogs/economist­explains/2015/05/economist­explains­24?zid=311&ah=308cac674cccf554ce65cf926868bbc2</a></li>
      			</ul>
      		</div>
      	</div>
      </div>
    );
  }
})

export default Discussion

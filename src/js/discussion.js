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
      	<p>Caitlin Baggott, Executive Director of North Star Civic Foundation, is the data sponsor for Raise Effect. The focus of Baggott’s current work is wage inequality in Oregon, and the growing share of low wage workers who cannot earn enough to support themselves without a strong public safety net. Prior to helping launch North Star Civic Foundation, Caitlin spent two years as an independent strategy and communications consultant, focused on bringing independent analysis and outcomes­focused problem solving to intractable public­interest issues – from assessing the economic impacts of the Columbia River Crossing project to investigating changes in campaign contributions in Oregon legislative races.</p>
      	<div>
      		<div>
      			<p className="discussion__question"><span>QUESTION:</span> Do economists think that the minimum wage should be set based on the cost of living?</p>
      			<p className="discussion__answer"><span>CB:</span> At the end of the day, politics sets the minimum wage, not economists. But current economic thinking says that the minimum wage should be set by looking at cost of living, the health of the economy (indicated as a share of the median wage), and regional impacts.</p>
      			<p className="discussion__source-material"><span>SOURCE:</span> <a href="http://www.hamiltonproject.org/assets/legacy/files/downloads_and_links/state_local_minimum_wage_policy_dube.pdf">www.hamiltonproject.org/assets/legacy/files/downloads_and_links/state_local_minimum_wage_policy_dube.pdf</a></p>
      		</div>
      		<div>
      			<p className="discussion__question"><span>QUESTION:</span> Some say that Oregon already has one of the highest minimum wage floors in the nation. Why is $9.25 not enough?</p>
      			<p className="discussion__answer"><span>CB:</span> The minimum wage has not kept up with productivity or the value of the dollar. According to the Pew Research Center,  the federal minimum wage peaked in 1968 at $8.54 (in 2014 dollars). Since it was last raised in 2009, to the current $7.25 per hour, the federal minimum has lost about 8.1% of its purchasing power to inflation. The Economist recently estimated that, given how rich the U.S. is and the pattern among other advanced economies in the Organization for Economic Cooperation and Development, “one would expect America...to pay a minimum wage around $12 an hour.”</p>
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

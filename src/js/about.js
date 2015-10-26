import React from "react";
import jQuery from "jquery";
let About = React.createClass({
  getInitialState: function() {
    //An unfortunate work around due to a bug in nvd3 that causes a blank tooltip to exist...
    jQuery('.nvtooltip').remove();
    return null;
  },
  render: function() {
    return (
      <div className="">
      <h1>The Self-Sufficiency Standard</h1>
      <p>
        With this project we wanted to see if and how a higher minimum wage would
        impact the life of someone working full-time at minimum wage. For that,
        we took at look at the the <a href="http://www.selfsufficiencystandard.org/standard.html">Self-Sufficiency Standard</a> — a budget-based measure
        of the real cost of living and an alternative to the federal poverty measure.
        The Self-Sufficiency Standard determines the amount of income required for
        working families to meet basic needs at a minimally adequate level, taking into
        account family composition, ages of children, and geographic differences in costs.
        Self-Sufficiency is defined as how much income families of various sizes and compositions
        need to make ends meet — without public or private assistance.
      </p>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Cost</th>
            <th>Yes</th>
            <th>No</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Housing</td>
            <td>Rent and Utilities</td>
            <td>Cable or Television</td>
          </tr>
          <tr>
            <td>Child Care</td>
            <td>
              Full-time care for infants and preschoolers, and before and after
              school care for school-age children.
            </td>
            <td>
              After school programs for teenagers, extracurricular activities,
              babysitting when not at work
            </td>
          </tr>
          <tr>
            <td>Food</td>
            <td>Food for home preparation</td>
            <td>Take-out, fast-food, or restaurant meals or drinks</td>
          </tr>
          <tr>
            <td>Transportation</td>
            <td>
              Car ownership cost (per adult) - insurance, gas, oil, registration,
              repairs, monthly payments—or public transportation when adequate.
              Assumes only commuting to and from work and day care plus a weekly
              shopping trip
            </td>
            <td>Non-essential travel, vacations, etc.</td>
          </tr>
          <tr>
            <td>Health Care</td>
            <td>Employer-sponsored insurance premium and out-of-pocket costs</td>
            <td>Health savings account, gym memberships, individual health insurance</td>
          </tr>
          <tr>
            <td>Taxes</td>
            <td>
              Federal and state income tax and tax credits, payroll taxes, and
              state and local sales taxes
            </td>
            <td>
              Itemized deductions, tax preparation fees or other taxes (property
              taxes are included in housing costs and gasoline taxes in
              transportation)
            </td>
          </tr>
          <tr>
            <td>Miscellaneous</td>
            <td>
              Clothing, shoes, paper products, diapers, nonprescription medicines,
              cleaning products, household items, personal items, and telephone
              service
            </td>
            <td>
              Recreation, entertainment, savings, emergencies, debt repayment,
              pets, education/ training, gifts, broadband/ internet, student loan
              repayment
            </td>
          </tr>
          <tr>
            <td>Savings</td>
            <td>Rainy day fund after job loss or other short-term crisis.</td>
            <td>Long-term savings for retirement, education, or home-ownership.</td>
          </tr>
        </tbody>
      </table>
      <p>
        Overall, the Self-Sufficiency Standard includes detailed cost of living information for 152 different family compositions
        from a single adult living alone to as many four adults and three children of varying ages.
      </p>
      <p>
        <a href="http://www.selfsufficiencystandard.org/docs/Oregon2014.pdf">Download</a> the 2014 Oregon Self-Sufficiency Standard Report to explore this information for yourself.
      </p>
      <h2>How the self-sufficiency standard has been used</h2>
      <h4>In Local Media</h4>
      <ul>
        <li><a href="http://www.oregonlive.com/portland/index.ssf/2014/06/poverty_in_multnomah_county_a.html">Poverty in Multnomah County: A third of residents can't meet basic needs</a></li>
        <li><a href="http://portlandtribune.com/pt/9-news/275943-151401-kotek-cites-groups-figures-in-pegging-minimum-wage">Kotek cites group's figures in pegging minimum wage</a></li>
        </ul>
    <h4>By Local Agencies and Organizations</h4>
    <ul>
        <li><a href="https://www2.prosperityplanner.org/">The Prosperity Planner for Oregon Residents</a></li>
        <li><a href="http://www.northwesthealth.org/news/archive/2015/10/20/oregon-minimum-wage-boiled-down">Oregon Minimum Wage, Boiled Down</a></li>
        <li><a href="http://www.worksystems.org/self-sufficiency">Regional Analysis of Self-Sufficiency Completed</a></li>
        <li><a href="http://portlandpulse.org/node/352/taxonomy/term/92/">The Self-Sufficiency Standard Indicator by Greater Portland Pulse</a></li>
        <li><a href="http://mkn.research.pdx.edu/2010/01/self-sufficiency/">Where the Ends Don’t Meet: Measuring Poverty and Self-Sufficiency Among Oregon’s Families</a></li>
    </ul>
    <h4>Elsewhere in the US</h4>
    <ul>
        <li><a href="http://www.pbs.org/newshour/making-sense/how-much-is-enough/">How Much Do You Need to Survive: An Interactive Guide to the Living Wage</a></li>
        <li><a href="http://storymaps.esri.com/stories/2015/living-wage-map/">The Living Wage Map</a></li>
    </ul>
    </div>
  );
  }
});

export default About;

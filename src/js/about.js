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
    </div>
  );
  }
});

export default About;

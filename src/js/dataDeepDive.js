import React from "react";
import jQuery from "jquery";
let DataDeepDive = React.createClass({
  getInitialState: function() {
    //An unfortunate work around due to a bug in nvd3 that causes a blank tooltip to exist...
    jQuery('.nvtooltip').remove();
    return null;
  },
  render: function() {
    return (
        <div>
            <h1>Data Deep Dive</h1>
            <p>
            The self sufficiency study has a lot of great information about what it is like to live in this state, as an individual or as a parent, with detailed granular information about the various compositions of a household.
            In thinking about the effect of an increase in the state minimum wage, it is helpful to look at the number of households that are impacted.
            The census data does not reflect the granularity of the self-sufficiency study in terms of household composition which made it a challenge to make accurate comparisons.
            Once a system was developed to equate census and self-sufficiency families, a second challenge was to identify the percentage of households that were supported by low-wage incomes.
            </p>
            <h3>Challenge 1: The definition of family</h3>
            <p>
                In the self-sufficiency study, gender and marital status of parents is ignored. Family types are defined by number of adults, number of infants,
                number of preschoolers, number of school age children and number of teenagers. This creates a range of about 150 family types, for which the study
                has detailed information by county regarding cost of living.
            </p>
            <p>
                Census data groups people together differently. Gender of the head of household and how the household members are related matter in the census definition of family.
                A non-family household can have any number of unrelated individuals of any age. A family household must have at least two people who share a familial relationship (whether by marriage or by birth).
                Furthermore, family households are broken into three categories: married, male head of household with no wife present, and female head of household with no husband present.
                Each of those three divisions can be broken into family households either with or without own children present. Finally, those family households with own children present can be divided into those
                with children under six years old only, six to seventeen years old only, or both children under six and those six to seventeen.
            </p>
            <img className="img-responsive data-deep-dive-img" src="./public/images/data-deep-dive/households-tree.png" />
            <p>
                For the purpose of this project, single adults without children are assumed to equate to non-family households, single parents with two children are an aggregate of
                ten self-sufficiency study family types which equates to the sum of unmarried family households with own children present, and two parent families with two children
                are an aggregate of ten self-sufficiency study family types which equate to married families with own children present. It was necessary to develop a complex weighting system to relate population numbers, in terms of number
                of households, to the self-sufficiency study family types.
            </p>
            <p>
                Census Data set S1101 shows percentage breakdown of age of own children present in married households and unmarried male and unmarried female households.
            </p>
            <img className="img-responsive data-deep-dive-img" src="./public/images/data-deep-dive/census-weights.png" />
            <ol>
                <li>Step one was to express the ratio of unmarried male to unmarried female households with own children present as a percentage of the sum of unmarried households.</li>
                <li>Combine the male and female unmarried parent breakdown percentages by likelihood that unmarried parent is male or female.</li>
                <li>Calculate the likelihood, based on a uniform distribution of child age, to account for the finer granularity of child age in the Self Sufficiency Standard family types. Multiply the SSS age adjustment by the sum of the unmarried parent census age adjustments for each corresponding grouping of two children to achieve the weight. <br/><em>Note:</em> to read SSS family types in the familyCode column a = adult, i = infant, p = preschooler, s = school-age and t = teenager where a1i1p0s1t0 = a single adult householder with one infant and one school-age child present.</li>
                <li>Use the same SSS age adjustment calculation and multiply by the census age adjustment for married parents to achieve the weight. Repeat for every FIPS code.</li>
            </ol>
            <p>
                This does not account for the fact that there are a small number of non-family households in Oregon with children present, nor does it address the fact that census percentages include the presence of any number of children. It also doesn’t account for the fact that some of the unmarried households may have more than one adult contributing income towards the livelihood of the household.
            </p>
            <table className="table-bordered households-table">
                <thead>
                    <tr>
                        <th rowSpan="2">Households with Children</th>
                        <th colSpan="2">Oregon</th>
                    </tr>
                    <tr>
                        <th>Estimate</th><th>Margin of Error</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Total</td><td>859,685</td><td>+/-411</td>
                    </tr>
                    <tr>
                        <td>&nbsp;In family households</td><td>852,132</td><td>+/-1,056</td>
                    </tr>
                    <tr>
                        <td>&nbsp;&nbsp;In married-couple, family</td><td>590,606</td><td>+/-5,277</td>
                    </tr>
                    <tr>
                        <td>&nbsp;&nbsp;In male householder, no wife present, family</td><td>69,343</td><td>+/-2,650</td>
                    </tr>
                    <tr>
                        <td>&nbsp;&nbsp;In female householder, no husband present, family</td><td>192,183</td><td>+/-4,328</td>
                    </tr>
                    <tr>
                       <td>&nbsp;In nonfamily households</td><td>7,553</td><td>+/-897</td>
                   </tr>
                </tbody>
            </table>
            <h3>Challenge 2: Identifying low income households</h3>
            <p>
                Once the appropriate census household types have been identified, another consideration in exploring the impact of a minimum wage increase is identifying how many of those households might be supported by people working minimum wage jobs.
                Most of the census data regarding minimum wage is about workers, and has no data about the types of households those workers are contributing to. Census data sets B19201 and B19131 show the number of households that fall into sixteen income
                brackets from less than $10k to more than $200k. Non-family household income comes from B19201 and in B19131 family income is broken out by married and unmarried households, and additionally by whether or not an adult’s own child or children
                is present. Using this data, all non-family households making less than $19,999 were included as low income single adult families, all unmarried households with children present making less than $19,999 were included as low income single parent
                families, and all married households with children making less than $39,999 were included as low income married parent families. Those breakpoints were chosen because an annual minimum wage at the current Oregon rate of $9.25 equates to an annual income of $19,536,
                and while single adults and single parents represent households supported by only one full-time income, married parents represent households supported by two full-time incomes.
            </p>
            <h4>Oregon Statewide Low Income Households By Family Type:</h4>
            <img className="img-responsive data-deep-dive-img data-deep-dive-pie-chart" src="./public/images/data-deep-dive/low-income-pie-chart.png" />
        </div>
    )
  }
})

export default DataDeepDive

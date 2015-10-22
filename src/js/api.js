import $ from "jquery";

const BASE_URL = 'http://raiseeffect.org/api/v1/counties/';

let api = {
  getCounties: (fips) => {
    return $.ajax({
      url: BASE_URL + (fips || '')
    })
  },
  getLaborStats: (fips) => {
    return $.ajax({
      url: BASE_URL + ( fips ? fips + '/laborstats' : 'laborstats' )
    })
  },
  getPopulation: (fips) => {
    return $.ajax({
      url: BASE_URL + ( fips ? fips + '/populations' : 'populations' )
    })
  },
  getFamilyType: (fips) => {
    return $.ajax({
      url: BASE_URL + '/familytypes'
    })
  },
  getWageStats: (fips, year) => {
    let url = BASE_URL;
    if (!fips) {
      url += 'wagestats';
    } else{
      url += fips + '/wagestats';
      if (year) {
        url += '/' + year;
      }
    }
    return $.ajax({
      url: url
    })
  },
  getCalculatedStats: (fips) => {
    return $.ajax({
      url: BASE_URL + ( fips ? fips + '/calculatedstats' : 'calculatedstats' )
    })
  },
  getSSSBudget: (fips) => {
    return $.ajax({
      url: BASE_URL + ( fips ? fips + '/sssbudgets' : 'sssbudgets' )
    })
  },
  getSSSCredits: (fips) => {
    return $.ajax({
      url: BASE_URL + ( fips ? fips + '/ssscredits' : 'ssscredits' )
    })
  },
  getSSSWages: (fips) => {
    return $.ajax({
      url: BASE_URL + ( fips ? fips + '/ssswages' : 'ssswages' )
    })
  },
  getPuma: (fips) => {
    return $.ajax({
      url: BASE_URL + ( fips ? fips + '/pumas' : 'pumas' )
    })
  },
  getCensusHousehold: (fips) => {
    return $.ajax({
      url: BASE_URL + ( fips ? fips + '/censushouseholds' : 'censushouseholds' )
    })
  },
  getWeights: (fips) => {
    return $.ajax({
      url: BASE_URL + ( fips ? fips + '/familycodeweights' : 'familycodeweights' )
    })
  },
}

export default api

import $ from "jquery";

let api = {
  getCounties: () => {
    return $.ajax({
      url: 'http://raiseeffect.org/api/v1/counties/'
    })
  }
}

export default api
const axios = require('axios'); // for sending request

const urls = require('../assest/helper/urls');
const utilFunction = require('../assest/helper/utils');
const URL_OXFORD = urls.oxfordUrl(); //oxford url
const URL_DOAJ = urls.doajUrl();

const dataModel = require('../models/data'); //dataModel for db

module.exports.home = async function (req, res) {
  // first fetch from urlOxford
  try {
    let response1 = await axios.get(URL_OXFORD);
    let response2 = await axios.get(URL_DOAJ);

    let dataOxford = utilFunction.jsonFormOxford(response1);
    let dataDoaj = utilFunction.jsonFormDoaj(response2);
    console.log(dataOxford, dataDoaj);
  } catch (error) {
    console.log('err', error);
  }
};

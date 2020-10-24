const axios = require('axios'); // for sending request
const Nightmare = require('nightmare');
const urls = require('../assest/helper/urls');
const utilFunction = require('../assest/helper/utils');
const URL_OXFORD = urls.oxfordUrl(); //oxford url
const URL_DOAJ = urls.doajUrl();

//const dataModel = require('../models/data'); //dataModel for db

const nightmare = Nightmare({ show: true });
module.exports.home = async function () {
  //first fetch from urlOxford
  try {
    let response1 = await axios.get(URL_OXFORD);
    let dataOxford = utilFunction.jsonFormOxford(response1.data);

    let response2 = await nightmare
      .goto(URL_DOAJ)
      .wait('body')
      .evaluate(() => document.querySelector('body').innerHTML);

    let dataDoaj = utilFunction.jsonFormDoaj(response2);

    //put data in mongoose
    // console.log('1', dataOxford, '2', dataDoaj);
    await utilFunction.putInDb(dataOxford, dataDoaj);
    await utilFunction.fetchFromDb();
  } catch (error) {
    console.log('err', error);
  }

  // .then((response) => {
  //   console.log(response);
  // })
  // .catch((err) => {
  //   console.log('err', err);
  // });
};

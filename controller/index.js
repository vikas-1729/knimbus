const axios = require('axios'); // for sending request to handle static scraping
const Nightmare = require('nightmare'); // for sending request to handle dynamic scraping
const urls = require('../assest/helper/urls'); // to know urls
const utilFunction = require('../assest/helper/utils'); // util function
const URL_OXFORD = urls.oxfordUrl(); //oxford url
const URL_DOAJ = urls.doajUrl(); // doaj url

const nightmare = Nightmare({ show: true });
module.exports.home = async function () {
  //first fetch from urlOxford
  try {
    let response1 = await axios.get(URL_OXFORD); //get from oxford
    let dataOxford = utilFunction.jsonFormOxford(response1.data); //convert into json form

    let response2 = await nightmare
      .goto(URL_DOAJ)
      .wait('body')
      .evaluate(() => document.querySelector('body').innerHTML); // get from doaj

    let dataDoaj = utilFunction.jsonFormDoaj(response2); // converting into json form

    //put data in mongoose
    await utilFunction.putInDb(dataOxford, dataDoaj);
    await utilFunction.fetchFromDb(); //fetch from mongoose
  } catch (error) {
    console.log('err', error);
  }
};

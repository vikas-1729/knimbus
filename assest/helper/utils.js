const cheerio = require('cheerio'); // cherrio use to help towork with dom
const dataModel = require('../../models/data'); // data Model to handle mogoose databse
module.exports.jsonFormOxford = function (data) {
  let $ = cheerio.load(data);

  return oxfordHelper($); //oxford helper convert into json form
};
module.exports.jsonFormDoaj = function (data) {
  let $ = cheerio.load(data);
  return doajHelper($);
};

function oxfordHelper($) {
  // here we simply fetch from DOM by giving clas sname etc
  let returnArray = [];
  let articleList = $('.al-article-box');
  articleList.each(function (index) {
    let title = $(this).find('.article-link').text();
    let url = $(this).find('.article-link').attr('href');
    let authorList = $(this).find('.al-authors-list');
    let authorArray = [];
    authorList.each(function (index) {
      authorArray.push({
        authorName: $(this).find('.author-link').text(),
        authorLink: $(this).find('.author-link').attr('href'),
      });
    });
    let publishedDate = $(this).find('.al-pub-date').text();
    if (index > 20) {
      return false;
    }
    returnArray.push({
      title: title,
      url: url,
      authorList: authorArray,
      date: publishedDate,
    });
  });
  return returnArray;
}

function doajHelper($) {
  let returnArray = [];
  let articleList = $('.doaj-public-search-record-results');
  articleList.each(function (index) {
    let title = $(this).find('span.title > a').text();
    let author = $(this).find('.title').siblings('em').text();
    let url = $(this)
      .find('.doaj-public-search-abstractaction-results')
      .next()
      .attr('href');
    let date = $('.doaj-public-search-record-results')
      .clone()
      .children()
      .remove()
      .end()
      .text();
    returnArray.push({
      title: title,
      url: url,
      author: author,
      date: 2016,
    });
    if (index > 20) {
      return false;
    }
  });
  return returnArray;
}

module.exports.putInDb = async function (array1, array2) {
  // first delete all previous entry
  try {
    await dataModel.remove({}, function (err, data) {
      if (err) {
        console.log(err);
      }
    });
    await Promise.all(
      // promise.all so that it wait until all promise occur
      array1.map(async (obj, index) => {
        let author = '';
        obj['authorList'].map((value) => {
          author = author + value.authorName + ',';
        });

        await dataModel.create({
          //create object
          title: obj.title,
          url: obj.url,
          author: author,
          date: obj.date,
          from: 'oxford',
        });
      })
    );

    await Promise.all(
      array2.map(async (obj, index) => {
        await dataModel.create({
          title: obj.title,
          url: obj.url,
          author: obj.author,
          date: obj.date,
          from: 'doaj',
        });
      })
    );
  } catch (error) {
    console.log('error', error);
  }
};

module.exports.fetchFromDb = async function () {
  //fetching from databse
  let dataOxford = await dataModel
    .find({ from: 'oxford' })
    .select('-_id -__v -createdAt -updatedAt')
    .limit(10);
  let dataDoaj = await dataModel
    .find({ from: 'doaj' })
    .select('-_id -__v -createdAt -updatedAt')
    .limit(10);

  dataOxford.map((data) => {
    console.log(data);
  });
  dataDoaj.map((data) => {
    console.log(data);
  });
};

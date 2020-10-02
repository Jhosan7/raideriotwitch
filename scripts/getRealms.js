const fs = require('fs');
const BlizzAPI = require('blizzapi');
const config = require('./config.js');

const regions = ['eu', 'us', 'kr', 'tw'];

const AllDatas = {};

function GetDatas(region, callback) {
  const api = new BlizzAPI({
    clientId: config.blizzardKey,
    clientSecret: config.blizzardSecret,
    region,
  });
  AllDatas[region] = [];
  api.query(`/data/wow/realm/index?namespace=dynamic-${region}&locale=en_GB`)
    .then((data) => {
      const json = data.realms.map(item => ([
        item.name,
        item.slug,
      ]));
      AllDatas[region] = json;
      callback();
    })
    .catch((err) => {
      console.error(`Error: ${err}`);
      callback();
    });
}

const requests = regions.map(item => new Promise((resolve) => {
  GetDatas(item, resolve);
}));

Promise.all(requests).then(() => {
  fs.writeFile('./Realms.json', JSON.stringify(AllDatas, null, 2), 'utf8', (err) => {
    if (err) throw err;
    console.log('Realms saved into Realms.json');
  });
});

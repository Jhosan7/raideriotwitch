const fs = require('fs');
const BlizzAPI = require('blizzapi');
const config = require('./config.js');

const AllDatas = {};

const api = new BlizzAPI({
  clientId: config.blizzardKey,
  clientSecret: config.blizzardSecret,
  region: 'eu',
});

function GetDatas(affix, callback) {
  api.query(`/data/wow/media/keystone-affix/${affix.id}?namespace=static-eu&locale=en_GB`)
    .then((data) => {
      AllDatas[affix.name] = data.assets[0].value;
      callback();
    })
    .catch((err) => {
      console.error(`Error: ${err}`);
      callback();
    });
}

api.query('/data/wow/keystone-affix/index?namespace=static-eu&locale=en_GB')
  .then((data) => {
    const requests = data.affixes.map(item => new Promise((resolve) => {
      GetDatas(item, resolve);
    }));

    Promise.all(requests).then(() => {
      fs.writeFile('./Icons.json', JSON.stringify(AllDatas, null, 2), 'utf8', (err) => {
        if (err) throw err;
        console.log('Affixes icons saved into Icons.json');
      });
    });
  })
  .catch((err) => {
    console.error(`Error: ${err}`);
  });

const path = require('path');

exports.nunjucks = {
    enable: true,
    package: 'egg-view-nunjucks'
};

exports.mysql = {
    enable: true,
    package: 'egg-mysql',
};
exports.bos = {
    enable: true,
    path: path.join(__dirname, '../lib/plugin/egg-bos')
}
// module.exports.passport = {
//     enable: true,
//     package: 'egg-passport',
// };

// exports.assets = {
//     enable: true,
//     package: 'egg-view-assets',
// }

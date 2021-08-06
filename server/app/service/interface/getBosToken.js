const Service = require('egg').Service;
class GetBosTokenService extends Service {
    async getToken(userid) {
        console.log(this.app.bos);
    };
}
module.exports = GetBosTokenService;

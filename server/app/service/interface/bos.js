const Service = require('egg').Service;
class BosService extends Service {
    async getBosToken({ext}) {
        const {userInfo} = this.ctx.session;
        const key = `${userInfo.userid}-${new Date().getTime()}.${ext}`;
        const bosToken = await this.app.bos.getSessionToken({key});
        return bosToken;
    };
}
module.exports = BosService;

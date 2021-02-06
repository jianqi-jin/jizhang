const Service = require('egg').Service;
class UserService extends Service {
    async find(userid) {
      // 假如 我们拿到用户 id 从数据库获取用户详细信息
      const user = await this.app.mysql.get('user', { userid });
      return user;
    };
    async login({username, password}) {
      const user = await this.app.mysql.get('user', {username, password});
      if (user) {
        this.ctx.session.userInfo = user;
      }
      return user;
    };
}
module.exports = UserService;

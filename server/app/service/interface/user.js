const Service = require('egg').Service;
const UUID = require('uuid');
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
    async register({username, password}) {
      const findUser = await this.app.mysql.get('user', {username});
      if (findUser) {
        return {
          code: -1,
          msg: '用户名存在~'
        };
      }
      const userid = UUID.v1();
      const {affectedRows} = await this.app.mysql.insert('user', {username, password, userid})
      if (affectedRows !== 1) {
        return {
          code: -1,
          msg: '插入失败~'
        };
      }
      return {
        code: 0
      };
    };
    async update({id, nickname, avatarurl, detail}) {
      return await this.app.mysql.update('user', {id, nickname, avatarurl, detail});
    };
}
module.exports = UserService;

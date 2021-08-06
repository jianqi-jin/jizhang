const Service = require('egg').Service;
class AccountDetailService extends Service {
    async find(userid) {
      // 假如 我们拿到用户 id 从数据库获取用户详细信息
      const accountDetail = await this.app.mysql.get('account_detail', { userid });
      return { accountDetail };
    };
}
module.exports = AccountDetailService;

const Service = require('egg').Service;
class AccountService extends Service {
    async getDetailList({pn = 0, rn = 10, userid}) {
      const detailList = await this.app.mysql.select('account_detail', {
        where: {userid},
        orders: [['create_date','desc'], ['id','desc']], // 排序方式
        limit: rn, // 返回数据量
        offset: pn * rn, // 数据偏移量
    });
    return detailList.map(v => {
      v.create_date = new Date(v.create_date).getTime();
      v.update_date = new Date(v.update_date).getTime();
      return v;
    })
  };
    async add({
      userid,
      name,
      price,
      channel,
      detail
    }) {
      return await this.app.mysql.insert('account_detail', {
        userid,
        name,
        price,
        channel,
        detail
      });
    };
    async edit({
      id,
      name,
      price,
      channel,
      detail
    }) {
      return await this.app.mysql.update('account_detail', {
        id,
        name,
        price,
        channel,
        detail
      });
    }
}
module.exports = AccountService;

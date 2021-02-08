const Service = require('egg').Service;
class AccountService extends Service {
    async getDetailList({pn = 0, rn = 10, userid}) {
      const count = await this.app.mysql.query('select count(*) as total from account_detail where userid = ?', userid);
      const total = count?.[0]?.total || 0;
      let detailList = await this.app.mysql.query('select * from account_detail where userid = ? order by create_date desc, id desc limit ? offset ?',
      [userid, Math.max(rn, 0), Math.max(pn * rn, 0)]);
      detailList = detailList.map(v => {
        v.create_date = new Date(v.create_date).getTime();
        v.update_date = new Date(v.update_date).getTime();
        return v;
      });
      return {
        detailList,
        total
      }
    };
    async getDetail({id}) {
      const detail = await this.app.mysql.get('account_detail', {
        id
    });
    return detail;
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

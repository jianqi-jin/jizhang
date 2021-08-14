const CHART_MAX_DAY = 3650;
const Service = require('egg').Service;
class AccountService extends Service {
    async getList({userid, label = ''}) {
      const count = await this.app.mysql.query('select count(*) as total from channel where userid = ?', [userid]);
      const total = count?.[0]?.total || 0;
      let list = await this.app.mysql.query('select id, label, enable, create_date from channel where userid = ? and label like ? order by create_date desc, id desc',
      [userid, `%${label}%`]);
      list = list.map(v => {
        v.create_date = new Date(v.create_date).getTime();
        return v;
      });
      return {
        list,
        total
      }
    };
    async add({
      userid,
      label
    }) {
      let {affectedRows, message} = await this.app.mysql.insert('channel', {
        userid,
        label
      });
      if (affectedRows !== 1) {
        return ctx.body = {
          code: -1,
          msg: message
        };
      }
      return await this.ctx.service.interface.user.updateAmount();
    };
    async delete({id, userid}) {
      try {
        const {affectedRows} = await this.app.mysql.delete('channel', {
          id,
          userid
        });
        if (affectedRows === 1) {
          return {
            code: 0
          }
        }
        else {
          return {
            code: -1,
            msg: '删除失败~'
          }
        }
      }
      catch (e) {
        return {
          code: -1,
          msg: e.sqlMessage || '删除错误~'
        }
      }
    };
    async edit({
      id,
      label,
      enable,
      userid
    }) {
      let {affectedRows, message} = await this.app.mysql.update('channel', {
        id,
        label,
        enable,
        userid
      });
      if (affectedRows !== 1) {
        return ctx.body = {
          code: -1,
          msg: message
        };
      }
      return {
        code: 0,
        msg: null
      };
    }
}
module.exports = AccountService;

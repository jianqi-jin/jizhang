const CHART_MAX_DAY = 3650;
const Service = require('egg').Service;
class AccountService extends Service {
    async getList({userid, pn = 0, rn = 10, query = '', status = -1}) {
      pn = +pn;
      rn = +rn;
      const statuses = +status === -1 ? [0, 1] : [+status];
      const count = await this.app.mysql.query('select count(*) as total from good where userid = ? and title like ? and status in (?)', [userid, `%${query}%`, statuses]);
      const total = count?.[0]?.total || 0;
      let list = await this.app.mysql.query(['select ',
      'id, title, description, content, img, total, saled_num, price, status, create_date',
      ' from good where userid = ? and title like ? and status in (?) order by create_date desc, id desc limit ? offset ?'].join(''),
      [userid, `%${query}%`, statuses, rn, pn * rn]);
      list = list.map(v => {
        v.create_date = new Date(v.create_date).getTime();
        return v;
      });
      return {
        list,
        total
      }
    };
    async getDetail({userid, id}) {
      let list = await this.app.mysql.query(['select ',
      'id, title, description, content, img, total, saled_num, price, status, create_date',
      ' from good where userid = ? and id = ?'].join(''),
      [userid, id]);
      return {
        data: list.length < 1 ? {} : list[0]
      }
    };
    async add({
      userid,
      title,
      description,
      content,
      img,
      total,
      price,
      status
    }) {
      let {affectedRows, message} = await this.app.mysql.insert('good', {
        userid,
        title,
        description,
        content,
        img,
        total,
        price,
        status
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
        const {affectedRows} = await this.app.mysql.delete('good', {
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
      userid,
      title,
      description,
      content,
      img,
      total,
      price,
      status
    }) {
      let {affectedRows, message} = await this.app.mysql.update('good', {
        title,
        description,
        content,
        img,
        total,
        price,
        status
      }, {
        where: {
          id,
          userid
        }
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

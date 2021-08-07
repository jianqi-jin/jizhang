const CHART_MAX_DAY = 3650;
const Service = require('egg').Service;
class AccountService extends Service {
    async getList({userid, pn = 0, rn = 10, query = '', status = -1}) {
      pn = +pn;
      rn = +rn;
      const statuses = +status === -1 ? [0, 1] : [+status];
      const count = await this.app.mysql.query([
        'select count(*) as total',
        'from sale_detail',
        'LEFT JOIN good',
        'ON sale_detail.goods_id = good.id',
        'where sale_detail.userid = ? and title like ? and sale_detail.status in (?)'
      ].join(' '), [userid, `%${query}%`, statuses]);
      const total = count?.[0]?.total || 0;
      let list = await this.app.mysql.query([
        'SELECT',
        'sale_detail.id,',
        'sale_detail.price,',
        'sale_detail.total,',
        'sale_detail.description,',
        'good.title,',
        'sale_detail.goods_id',
        'FROM sale_detail',
        'LEFT JOIN good',
        'ON sale_detail.goods_id = good.id',
        'where sale_detail.userid = ? and IFNULL(title, "") like ? and sale_detail.status in (?) order by sale_detail.create_date desc limit ? offset ?'
      ].join(' '),
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
    async getSaleInfo({userid}) {
      let totalPrice = await this.app.mysql.query(
        'select sum(price * total) as total_price from sale_detail where userid = ?',
        [userid]
      );
      return {
        data: totalPrice.length < 1 ? {} : totalPrice[0]
      }
    };
    async getDetail({userid, id}) {
      let list = await this.app.mysql.query(['select',
      '*',
      'from sale_detail where userid = ? and id = ?'].join(' '),
      [userid, id]);
      return {
        data: list.length < 1 ? {} : list[0]
      }
    };
    async add({
      userid,
      goods_id,
      total,
      price,
      status
    }) {
      let {affectedRows, message} = await this.app.mysql.insert('sale_detail', {
        userid,
        goods_id,
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
        const {affectedRows} = await this.app.mysql.delete('sale_detail', {
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
      // title,
      goods_id,
      total,
      price
    }) {
      let {affectedRows, message} = await this.app.mysql.update('sale_detail', {
        goods_id,
        total,
        price
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

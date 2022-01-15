// app/controller/news.js
const Controller = require('egg').Controller;

class DetailController extends Controller {
  async getDetailList() {
    const ctx = this.ctx;
    const {pn, rn, type} = ctx.query;
    const {userInfo} = ctx.session;
    const {detailList, total} = await ctx.service.interface.account.getDetailList({
      userid: userInfo.userid,
      pn,
      rn,
      type: +type
    });
    ctx.body = {
      code: 0,
      data: detailList,
      total: total
    };
  };
  async getDetail() {
    const ctx = this.ctx;
    const {id} = ctx.query;
    const detail = await ctx.service.interface.account.getDetail({
      id
    });
    ctx.body = {
      code: 0,
      data: detail
    };
  };
  async add() {
    const ctx = this.ctx;
    const {name, price, channel, detail, type, from} = ctx.query;
    const {userInfo} = ctx.session;
    try {
      return ctx.body = await ctx.service.interface.account.add({
        userid: userInfo.userid,
        name,
        price,
        channel,
        detail,
        type,
        from
      });
    }
    catch (e) {
      return ctx.body = {
        code: 15,
        msg: e.sqlMessage || '添加失败'
      };
    }
  };
  async reconcil() {
    const ctx = this.ctx;
    const {price, channel, type} = ctx.query;
    const {userInfo} = ctx.session;
    try {
      return ctx.body = await ctx.service.interface.account.reconcil({
        userid: userInfo.userid,
        price,
        channel,
        type
      });
    }
    catch (e) {
      return ctx.body = {
        code: 15,
        msg: e.sqlMessage || '对账失败'
      };
    }
  };
  async delete() {
    const {id} = this.ctx.query;
    this.ctx.body = await this.ctx.service.interface.account.delete({id});
  }
  async getChartList() {
    const ctx = this.ctx;
    const {start, end, type} = ctx.query;
    ctx.body = await ctx.service.interface.account.getChartList({start, end, type: +type});
  }
  async edit() {
    const ctx = this.ctx;
    const {name, price, channel, detail, id, type, from = 2} = ctx.query;
    const {userInfo} = ctx.session;
    try {
      return ctx.body = await ctx.service.interface.account.edit({
        id,
        userid: userInfo.userid,
        name,
        price,
        channel,
        detail,
        type,
        from
      });
    }
    catch (e) {
      return ctx.body = {
        code: 15,
        msg: e.sqlMessage || '更改失败'
      };
    }
  };
}

module.exports = DetailController;
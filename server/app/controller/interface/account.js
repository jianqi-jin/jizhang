// app/controller/news.js
const Controller = require('egg').Controller;

class DetailController extends Controller {
  async getDetailList() {
    const ctx = this.ctx;
    const {pn, rn} = ctx.query;
    const {userInfo} = ctx.session;
    const detailList = await ctx.service.interface.account.getDetailList({
      userid: userInfo.userid,
      pn,
      rn
    });
    ctx.body = {
      code: 0,
      data: detailList
    };
  };
  async add() {
    const ctx = this.ctx;
    const {name, price, channel, detail} = ctx.query;
    const {userInfo} = ctx.session;
    try {
      const res = await ctx.service.interface.account.add({
        userid: userInfo.userid,
        name,
        price,
        channel,
        detail
      });
      console.log(res);
      if (res.affectedRows === 1) {
        return ctx.body = {
          code: 0
        };
      }
      ctx.body = {
        code: -1,
        msg: res.message || '添加失败'
      }
    }
    catch (e) {
      return ctx.body = {
        code: 15,
        msg: e?.sqlMessage || '添加失败'
      };
    }
  };
  async edit() {
    const ctx = this.ctx;
    const {name, price, channel, detail, id} = ctx.query;
    const {userInfo} = ctx.session;
    try {
      const res = await ctx.service.interface.account.edit({
        id,
        userid: userInfo.userid,
        name,
        price,
        channel,
        detail
      });
      if (res.affectedRows === 1) {
        return ctx.body = {
          code: 0
        };
      }
      ctx.body = {
        code: -1,
        msg: res.message || '更改失败'
      }
    }
    catch (e) {
      return ctx.body = {
        code: 15,
        msg: e?.sqlMessage || '更改失败'
      };
    }
  };
}

module.exports = DetailController;
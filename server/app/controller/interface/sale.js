// app/controller/news.js
const Controller = require('egg').Controller;

class SaleController extends Controller {
  async getSaleInfo() {
    const ctx = this.ctx;
    const {userInfo} = ctx.session;
    const {data} = await ctx.service.interface.sale.getSaleInfo({
      userid: userInfo.userid
    });
    ctx.body = {
      code: 0,
      data
    }
  }
  async getList() {
    const ctx = this.ctx;
    const {
      pn = 0,
      rn = 10,
      query = '',
      status = -1
    } = ctx.query;
    const {userInfo} = ctx.session;
    const {list, total} = await ctx.service.interface.sale.getList({
      userid: userInfo.userid,
      pn,
      rn,
      query,
      status
    });
    ctx.body = {
      code: 0,
      data: list,
      total: total
    };
  };
  async getDetail() {
    const ctx = this.ctx;
    const {
      id = 0
    } = ctx.query;
    const {userInfo} = ctx.session;
    const {data} = await ctx.service.interface.sale.getDetail({
      userid: userInfo.userid,
      id
    });
    ctx.body = {
      code: 0,
      data
    };
  }
  async add() {
    const ctx = this.ctx;
    const {
      title,
      description,
      content,
      img,
      total = 0,
      price,
      status = 0
    } = ctx.query;
    const {userInfo} = ctx.session;
    try {
      return ctx.body = await ctx.service.interface.sale.add({
        userid: userInfo.userid,
        title,
        description,
        content,
        img,
        total,
        price,
        status
      });
    }
    catch (e) {
      return ctx.body = {
        code: 15,
        msg: e?.sqlMessage || '添加失败'
      };
    }
  };
  async delete() {
    const {id} = this.ctx.query;
    const {userInfo} = this.ctx.session;
    this.ctx.body = await this.ctx.service.interface.sale.delete({id, userid: userInfo.userid});
  }
  async edit() {
    const ctx = this.ctx;
    const {
      title,
      description,
      content,
      img,
      total,
      price,
      id,
      status
    } = ctx.query;
    const {userInfo} = ctx.session;
    try {
      return ctx.body = await ctx.service.interface.sale.edit({
        id,
        userid: userInfo.userid,
        title,
        description,
        content,
        img,
        total,
        price,
        status
      });
    }
    catch (e) {
      console.log(e);
      return ctx.body = {
        code: 15,
        msg: e?.sqlMessage || '更改失败'
      };
    }
  };
}

module.exports = SaleController;
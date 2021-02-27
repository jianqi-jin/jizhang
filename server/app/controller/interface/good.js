// app/controller/news.js
const Controller = require('egg').Controller;

class GoodController extends Controller {
  async getList() {
    const ctx = this.ctx;
    const {
      pn = 0,
      rn = 10,
      query = '',
      status = -1
    } = ctx.query;
    const {userInfo} = ctx.session;
    const {list, total} = await ctx.service.interface.good.getList({
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
    const {data} = await ctx.service.interface.good.getDetail({
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
      return ctx.body = await ctx.service.interface.good.add({
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
    this.ctx.body = await this.ctx.service.interface.good.delete({id, userid: userInfo.userid});
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
      return ctx.body = await ctx.service.interface.good.edit({
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

module.exports = GoodController;
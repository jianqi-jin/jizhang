// app/controller/news.js
const Controller = require('egg').Controller;

class ChannelController extends Controller {
  async getList() {
    const ctx = this.ctx;
    const {label} = ctx.query;
    const {userInfo} = ctx.session;
    const {list, total} = await ctx.service.interface.channel.getList({
      userid: userInfo.userid,
      label: label || ''
    });
    ctx.body = {
      code: 0,
      data: list,
      total: total
    };
  };
  async add() {
    const ctx = this.ctx;
    const {label} = ctx.query;
    const {userInfo} = ctx.session;
    try {
      return ctx.body = await ctx.service.interface.channel.add({
        userid: userInfo.userid,
        label
      });
    }
    catch (e) {
      return ctx.body = {
        code: 15,
        msg: e.sqlMessage || '添加失败'
      };
    }
  };
  async delete() {
    const {id} = this.ctx.query;
    const {userInfo} = this.ctx.session;
    this.ctx.body = await this.ctx.service.interface.channel.delete({id, userid: userInfo.userid});
  }
  async edit() {
    const ctx = this.ctx;
    const {label, id, enable} = ctx.query;
    const {userInfo} = ctx.session;
    try {
      return ctx.body = await ctx.service.interface.channel.edit({
        id,
        userid: userInfo.userid,
        label,
        enable
      });
    }
    catch (e) {
      console.log(e);
      return ctx.body = {
        code: 15,
        msg: e.sqlMessage || '更改失败'
      };
    }
  };
}

module.exports = ChannelController;
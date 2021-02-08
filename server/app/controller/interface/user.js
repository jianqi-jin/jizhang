// app/controller/news.js
const Controller = require('egg').Controller;

class UserController extends Controller {
  async getUserInfo() {
    const ctx = this.ctx;
    const userid = ctx.session?.userInfo?.userid;
    if (!userid) {
      return ctx.body = {
        code: -1,
        data: null,
        msg: '未找到用户信息'
      };
    }
    const userInfo = await ctx.service.interface.user.find(userid);
    ctx.session.userInfo = userInfo;
    userInfo.date = new Date(userInfo.date).getTime();
    return ctx.body = {
      code: 0,
      data: userInfo
    };
  };
  async login() {
    const ctx = this.ctx;
    const {username, password} = ctx.query;
    const res = await ctx.service.interface.user.login({username, password});
    if (!res) {
      return ctx.body = {
        err: -1,
        msg: '登录失败'
      };
    }
    return ctx.body = {
      err: 0,
      data: res
    };
  };
  async register() {
    const ctx = this.ctx;
    const {username, password} = ctx.query;
    const {code, msg, data} = await ctx.service.interface.user.register({username, password});
    if (code !== 0) {
      return ctx.body = {
        code: code,
        msg
      };
    }
    return ctx.body = {
      code: 0,
      data
    };
  };
  async edit() {
    const ctx = this.ctx;
    const {
      id,
      nickname,
      avatarurl,
      detail
    } = ctx.query;
    try {
      const res = await ctx.service.interface.user.update({
        id,
        nickname,
        avatarurl,
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
  async loginout() {
    console.log(234);
    this.ctx.session.userInfo = null;
    return this.ctx.body = {
      code: 0,
      msg: '成功',
      data: this.ctx.session.userInfo
    }
  };
}

module.exports = UserController;

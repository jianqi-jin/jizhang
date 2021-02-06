// app/controller/news.js
const Controller = require('egg').Controller;

class UserController extends Controller {
  async getUserInfo() {
    const ctx = this.ctx;
    const {userInfo} = ctx.session;
    if (!userInfo) {
      return ctx.body = {
        code: -1,
        data: null,
        msg: '未找到用户信息'
      };
    }
    ctx.body = {
      code: 0,
      data: userInfo
    };
    const {userid} = ctx.session.userInfo;
    ctx.service.interface.user.find(userid).then(userInfo => {
      ctx.session.userInfo = userInfo;
    });
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
  }
}

module.exports = UserController;

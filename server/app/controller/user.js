// app/controller/news.js
const Controller = require('egg').Controller;

class UserController extends Controller {
  async get(userid) {
    const ctx = this.ctx;
    const {user} = await ctx.service.interface.user.find(2);
    ctx.body = {
        data: user
    }
  }
}

module.exports = UserController;
// app/controller/news.js
const Controller = require('egg').Controller;

class NewsController extends Controller {
  async list() {
    const ctx = this.ctx;
    const page = ctx.query.page || 1;
    const {user} = await ctx.service.user.find(2);
    await ctx.render('news/list.tpl', { user });
  }
}

module.exports = NewsController;
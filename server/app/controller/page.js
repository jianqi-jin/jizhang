const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index() {
        const ctx = this.ctx;
        await ctx.render('jizhang/index.tpl');
    }
}

module.exports = HomeController;

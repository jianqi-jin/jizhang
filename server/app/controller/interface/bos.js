// app/controller/bos.js
const Controller = require('egg').Controller;

class BosController extends Controller {
    async getBosToken() {
        const ctx = this.ctx;
        const {ext} = ctx.query;
        const bosToken = await ctx.service.interface.bos.getBosToken({ext});
        return ctx.body = bosToken;
    };
}

module.exports = BosController;

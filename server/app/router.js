module.exports = app => {
    const {router, controller, middleware} = app;
    const isLogin = middleware.isLogin();
    router.get('/', controller.page.index);
    // router.get('/news', controller.news.list);
    router.get('/interface/account/getDetailList', isLogin, controller.interface.account.getDetailList);
    router.get('/interface/account/add', isLogin, controller.interface.account.add);
    router.get('/interface/account/reconcil', isLogin, controller.interface.account.reconcil);
    router.get('/interface/account/edit', isLogin, controller.interface.account.edit);
    router.get('/interface/account/delete', isLogin, controller.interface.account.delete);
    router.get('/interface/account/getDetail', isLogin, controller.interface.account.getDetail);
    router.get('/interface/account/getChartList', isLogin, controller.interface.account.getChartList);
    router.get('/interface/user/edit', isLogin, controller.interface.user.edit);
    router.get('/interface/user/register', controller.interface.user.register);
    router.get('/interface/user/getUserInfo', isLogin, controller.interface.user.getUserInfo);
    router.get('/interface/channel/getList', isLogin, controller.interface.channel.getList);
    router.get('/interface/channel/edit', isLogin, controller.interface.channel.edit);
    router.get('/interface/channel/delete', isLogin, controller.interface.channel.delete);
    router.get('/interface/channel/add', isLogin, controller.interface.channel.add);
    router.get('/interface/user/login', controller.interface.user.login);
    router.get('/interface/user/loginout', controller.interface.user.loginout);
    router.get('/interface/bos/getBosToken', isLogin, controller.interface.bos.getBosToken);

    // goods
    router.get('/interface/good/getList', isLogin, controller.interface.good.getList);
    router.get('/interface/good/edit', isLogin, controller.interface.good.edit);
    router.get('/interface/good/delete', isLogin, controller.interface.good.delete);
    router.get('/interface/good/add', isLogin, controller.interface.good.add);
    router.get('/interface/good/getDetail', isLogin, controller.interface.good.getDetail);
    router.get('/interface/good/getGoodInfo', isLogin, controller.interface.good.getGoodInfo);

    // sale
    router.get('/interface/sale/getList', isLogin, controller.interface.sale.getList);
    router.get('/interface/sale/edit', isLogin, controller.interface.sale.edit);
    router.get('/interface/sale/delete', isLogin, controller.interface.sale.delete);
    router.get('/interface/sale/add', isLogin, controller.interface.sale.add);
    router.get('/interface/sale/getDetail', isLogin, controller.interface.sale.getDetail);
    router.get('/interface/sale/getSaleInfo', isLogin, controller.interface.sale.getSaleInfo);
}
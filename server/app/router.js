module.exports = app => {
    const {router, controller, middleware} = app;
    const isLogin = middleware.isLogin();
    router.get('/', controller.page.index);
    // router.get('/news', controller.news.list);
    router.get('/interface/account/getDetailList', isLogin, controller.interface.account.getDetailList);
    router.get('/interface/account/add', isLogin, controller.interface.account.add);
    router.get('/interface/account/edit', isLogin, controller.interface.account.edit);
    router.get('/interface/account/delete', isLogin, controller.interface.account.delete);
    router.get('/interface/account/getDetail', isLogin, controller.interface.account.getDetail);
    router.get('/interface/account/getChartList', isLogin, controller.interface.account.getChartList);
    router.get('/interface/user/edit', isLogin, controller.interface.user.edit);
    router.get('/interface/user/register', controller.interface.user.register);
    router.get('/interface/user/getUserInfo', isLogin, controller.interface.user.getUserInfo);
    router.get('/interface/user/login', controller.interface.user.login);
    router.get('/interface/user/loginout', controller.interface.user.loginout);
    router.get('/interface/bos/getBosToken', isLogin, controller.interface.bos.getBosToken);
}
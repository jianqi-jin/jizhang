module.exports = app => {
    const {router, controller, middleware} = app;
    const isLogin = middleware.isLogin();
    // router.get('/', controller.home.index);
    // router.get('/news', controller.news.list);
    router.get('/interface/account/getDetailList', isLogin, controller.interface.account.getDetailList);
    router.get('/interface/account/add', isLogin, controller.interface.account.add);
    router.get('/interface/account/edit', isLogin, controller.interface.account.edit);
    router.get('/interface/user/getUserInfo', isLogin, controller.interface.user.getUserInfo);
    router.get('/interface/user/login', controller.interface.user.login);
}
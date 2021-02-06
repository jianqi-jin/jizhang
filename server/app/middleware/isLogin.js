module.exports = () => {
    return async function (ctx, next) {
    if (!ctx.session.userInfo) {
        return ctx.body = {
            err: 1001,
            msg: 'not login error'
        };
      }
      await next();
    }
  };
exports.keys = 'asdasdasd';
// 添加 view 配置
exports.view = {
  defaultViewEngine: 'nunjucks',
  mapping: {
    '.tpl': 'nunjucks',
  },
};

exports.news = {
    pageSize: 5,
    serverUrl: 'https://hacker-news.firebaseio.com/v0',
};

// config/config.${env}.js
exports.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '106.12.173.158',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '52Zllshizhu',
      // 数据库名
      database: 'jizhang',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
};

// exports.middleware = ['isLogin'];

const path = require('path');
// 添加 view 配置
module.exports = appInfo => ({
  keys: 'asdasdasd',
  view: {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  },
  static: {
    gzip: true
  },
  middleware: ['compress'],
  compress: {
    threshold: 2048,
    match() {
      return true;
    },
  },
  mysql: {
    // 单数据库信息配置
    client: {
      // host
      host: '106.12.173.158',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '',
      // 数据库名
      database: '',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  },
  listen: {
    port: 3000,
    hostname: '127.0.0.1', // 不建议设置 hostname 为 '0.0.0.0'，它将允许来自外部网络和来源的连接，请在知晓风险的情况下使用
    // path: '/var/run/egg.sock',
  },
  bos: {
    config: {
      ak: '',
      sk: ''
    }
  }
})


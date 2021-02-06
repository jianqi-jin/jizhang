const Service = require('egg').Service;

class NewsService extends Service {
  async list() {
    // read config
    const newsList = [{
        id: 0,
        name: 123
    }]
    return newsList;
  }
}

module.exports = NewsService;
const CHART_MAX_DAY = 365;
const Service = require('egg').Service;
class AccountService extends Service {
    async getDetailList({pn = 0, rn = 10, userid}) {
      const count = await this.app.mysql.query('select count(*) as total from account_detail where userid = ?', userid);
      const total = count?.[0]?.total || 0;
      let detailList = await this.app.mysql.query('select * from account_detail where userid = ? order by create_date desc, id desc limit ? offset ?',
      [userid, Math.max(rn, 0), Math.max(pn * rn, 0)]);
      detailList = detailList.map(v => {
        v.create_date = new Date(v.create_date).getTime();
        v.update_date = new Date(v.update_date).getTime();
        return v;
      });
      return {
        detailList,
        total
      }
    };
    async getChartList({start, end} = {}) {
      try {
        const dayTime = 1e3 * 60 * 60 * 24;
        start = +start || new Date(this.ctx.session?.userInfo?.date).getTime();
        end = (+end || new Date().getTime()) + dayTime;
        let xAxis = [];
        for (let i = start; i < end; i += dayTime) {
          xAxis.push(new Date(i - dayTime).toLocaleDateString());
        }
        // 结束日期加一
        const {userid} = this.ctx.session?.userInfo || {};
        const rows = await this.app.mysql.query(
          'select channel, price, create_date from account_detail where create_date>? and create_date<? and userid=? order by create_date asc',
          [new Date(+start), new Date(+end), userid]
        );
        const resArr = [];
        const channelSet = new Set();
        rows.forEach(v => {
          if (!channelSet.has(v.channel)) {
            channelSet.add(v.channel);
            resArr.push({
              channel: v.channel,
              data: []
            });
          }
          // 追加
          const cur = resArr.find(val => val.channel === v.channel);
          cur.data.push({
            price: v.price,
            time: new Date(v.create_date).getTime()
          });
        });
        const splitToEveryDay = (start, end, dataList) => {
          let i = 0;
          let splitedData = [];
          let length = dataList.length;
          let day = 0;
          for (let date = start; date < end; date += dayTime) {
            day += 1;
            if (day >= CHART_MAX_DAY) {
              throw {msg: '超出最大限度'};
            }
            let total = 0;
            for (let cur = i; cur < length; ++cur) {
              const current = dataList[cur];
              if (current?.time < date) {
                total += current.price;
              }
            }
            splitedData.push(Math.round(total * 1e2) / 1e2);
          }
          return splitedData;
        };
        const list = resArr.map(v => {
          v.splitData = splitToEveryDay(start, end, v.data);
          return v;
        });
        list.push({
          channel: '全部',
          splitData: new Array(xAxis.length)
            .fill(0)
            .map((v, i) => list.reduce((total, val) => Math.round((total + val.splitData[i]) * 1e2) / 1e2, 0))
        })
        return {
          code: 0,
          data: {
            xAxis,
            list
          }
        };
      }
      catch (e) {
        return {
          code: -1,
          msg: e.msg || e.sqlMessage || 'sql错误'
        };
      }
    }
    async getDetail({id}) {
      const detail = await this.app.mysql.get('account_detail', {
        id
    });
    return detail;
  };
    async add({
      userid,
      name,
      price,
      channel,
      detail
    }) {
      let {affectedRows, message} = await this.app.mysql.insert('account_detail', {
        userid,
        name,
        price,
        channel,
        detail
      });
      if (affectedRows !== 1) {
        return ctx.body = {
          code: -1,
          msg: message
        };
      }
      return await this.ctx.service.interface.user.updateAmount();
    };
    async delete({id}) {
      try {
        const {affectedRows} = await this.app.mysql.delete('account_detail', {
          id
        });
        if (affectedRows === 1) {
          return {
            code: 0
          }
        }
        else {
          return {
            code: -1,
            msg: '删除失败~'
          }
        }
      }
      catch (e) {
        return {
          code: -1,
          msg: e.sqlMessage || '删除错误~'
        }
      }
    };
    async edit({
      id,
      name,
      price,
      channel,
      detail
    }) {
      let {affectedRows, message} = await this.app.mysql.update('account_detail', {
        id,
        name,
        price,
        channel,
        detail
      });
      if (affectedRows !== 1) {
        return ctx.body = {
          code: -1,
          msg: message
        };
      }
      return await this.ctx.service.interface.user.updateAmount();
    }
}
module.exports = AccountService;

const Subscription = require('egg').Subscription;

class UpdateAccount extends Subscription {
    static get schedule() {
        return {
            interval: '1m',
            type: 'all'
        };
    }
    async subscribe() {
    };
}

module.exports = UpdateAccount;

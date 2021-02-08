const STS = require('@baiducloud/sdk').STS;
const http = require('http');
const url = require('url');
const util = require('util');
module.exports = app => {
    app.addSingleton('bos', createBos);
};

class Bos {
    ak = '';
    sk = '';
    constructor({ak, sk}) {
        this.ak = ak;
        this.sk = sk;
    }
    async getSessionToken({
        second = 60 * 60 * 24,
        key = 'demo.txt',
        resource = [`jizhang/${key}`],
        permission = ['READ', 'WRITE']
    } = {}) {
        const credentials = {
            ak: this.ak,
            sk: this.sk
        };
        var stsClient = new STS({
            credentials,
            region: 'bj'
        });
        try {
            const {body} = await stsClient.getSessionToken(second, {
                accessControlList: [{
                    service: 'bce:bos',
                    resource,
                    region: '*',
                    effect: 'Allow',
                    permission
                }]
            });
            return {
                code: 0,
                data: {
                    AccessKeyId: body.accessKeyId,
                    SecretAccessKey: body.secretAccessKey,
                    SessionToken: body.sessionToken,
                    Expiration: body.expiration,
                    key
                }
            };
        }
        catch (e) {
            return {
                code: -1,
                msg: e
            };
        }
    }
}

function createBos(config, app) {
    app.beforeStart(async () => {
        app.coreLogger.info(`[egg-bos] init instance success!`);
    });
    return new Bos(config);
}

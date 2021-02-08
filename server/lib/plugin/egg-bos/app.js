module.exports = app => {
    app.addSingleton('bos', createBos);
}

function createBos(config, app) {
    console.log(config);
    app.beforeStart(async () => {
        app.coreLogger.info(`[egg-bos] init instance success!`);
    })
}
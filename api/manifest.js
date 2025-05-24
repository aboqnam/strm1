const { addonBuilder } = require("stremio-addon-sdk");

const manifest = {
    id: "org.ammar.testaddon",
    version: "1.0.0",
    name: "تجربة إضافة ستريميو",
    description: "إضافة تجريبية فقط للتأكد إنها تشتغل",
    types: ["movie"],
    resources: ["subtitles"],
    catalogs: [],
    idPrefixes: ["tt"]
};

const builder = new addonBuilder(manifest);

builder.defineSubtitlesHandler(({ id }) => {
    return Promise.resolve({ subtitles: [] });
});

const { getInterface } = builder;
const handler = getInterface();

module.exports = (req, res) => {
    handler(req, res);
};
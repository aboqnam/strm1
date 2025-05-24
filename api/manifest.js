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
    console.log("طلب ترجمات لـ:", id); // للتتبع
    return Promise.resolve({ subtitles: [] });
});

module.exports = builder.getInterface();

module.exports = (req, res) => {
    handler(req, res);
};

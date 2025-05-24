const { addonBuilder } = require("stremio-addon-sdk");

const manifest = {
    id: "org.ammar.testaddon",
    version: "1.0.0",
    name: "إضافة تجريبية",
    description: "إضافة ستريميو للتجربة",
    types: ["movie"],
    resources: ["subtitles"],
    catalogs: [],
    idPrefixes: ["tt"]
};

const builder = new addonBuilder(manifest);

builder.defineSubtitlesHandler(({ id }) => {
    console.log("Request for subtitles:", id);
    return Promise.resolve({ subtitles: [] });
});

module.exports = builder.getInterface();
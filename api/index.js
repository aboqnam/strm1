
const { addonBuilder } = require("stremio-addon-sdk");
const axios = require("axios");
const cheerio = require("cheerio");

const manifest = {
  id: "subscene-vercel-addon",
  version: "1.0.0",
  name: "Subscene Vercel Addon",
  description: "ترجمات من sub-scene.com لـ Stremio",
  types: ["movie", "series"],
  resources: ["subtitles"],
  idPrefixes: ["tt"],
  catalogs: [],
};

const builder = new addonBuilder(manifest);

builder.defineSubtitlesHandler(async ({ id }) => {
  const imdbId = id.replace("tt", "");
  const searchUrl = `https://sub-scene.com/subtitles/title?q=${imdbId}`;

  try {
    const res = await axios.get(searchUrl, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    const $ = cheerio.load(res.data);
    const subs = [];

    $(".title a").each((_, el) => {
      const title = $(el).text().trim();
      const link = "https://sub-scene.com" + $(el).attr("href");

      subs.push({
        id: link,
        lang: "ar",
        url: link,
      });
    });

    return { subtitles: subs };
  } catch (err) {
    console.error("Error:", err.message);
    return { subtitles: [] };
  }
});

const interface = builder.getInterface();

module.exports = async (req, res) => {
  const { pathname } = new URL(req.url, `http://${req.headers.host}`);
  const handler = interface.getMiddleware();
  handler(req, res);
};

const Polyglot = require("node-polyglot");
const { availableLanguage, defaultLanguage } = require("../i18n");

exports.startPolyglot = (req, res, next) => {
  const locale = req.locale.language;

  req.polyglot = new Polyglot();
  if (Object.keys(availableLanguage).includes(locale)) {
    req.polyglot.extend(availableLanguage[locale]);
  } else {
    req.polyglot.extend(defaultLanguage);
  }

  next();
};

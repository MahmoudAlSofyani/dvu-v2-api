require("dotenv-safe").config({ allowEmptyValues: true });
const _ = require("lodash");
const { Model } = require("sequelize");

class BaseModel extends Model {
  // protected attributes
  static PROTECTED_ATTRIBUTES = [];

  // display values on through options
  static THROUGH_ATTRIBUTES = {};

  // extend toJSON()
  toJSON() {
    // hide protected attributes
    const attributes = { ...this.get() };
    if (this.PROTECTED_ATTRIBUTES && this.PROTECTED_ATTRIBUTES.length > 0) {
      // eslint-disable-next-line no-restricted-syntax
      for (const a of this.PROTECTED_ATTRIBUTES) {
        delete attributes[a];
      }
    }
    return _.omitBy(attributes, _.isNil);
  }
}

module.exports = BaseModel;

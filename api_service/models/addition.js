'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Addition extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Movie}) {
      this.belongsToMany(Movie, {foreignKey: "addition_id", as: "movies", through:"MovieAddition"});
    }
  }

  Addition.init({
    title: {
      type: DataTypes.STRING(120),
      unique: true,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Addition',
  });
  return Addition;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Movie}) {
      this.hasMany(Movie, {foreignKey: "category_id", as: "categories"});
    }
  }
  Category.init({
    title: {
      type: DataTypes.STRING(120),
      unique: true,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};
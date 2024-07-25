'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate({Category, Addition, MovieAddition, OrderItem}) {
      this.belongsTo(Category, {foreignKey: "category_id", as: "categories"});
      this.hasMany(OrderItem, {foreignKey: "movie_id", as: "items"});
      this.belongsToMany(Addition, {
        through: MovieAddition,
        foreignKey: "movie_id",
        otherKey: "addition_id",
        as: "additions",
      });
      this.hasMany(MovieAddition, {foreignKey: "movie_id", as: "movieAdditions"});
    }
  }

    Movie.init({
    title: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }

  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};
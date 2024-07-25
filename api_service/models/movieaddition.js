'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MovieAddition extends Model {
    static associate({ Movie, Addition }) {
      this.belongsTo(Movie, { foreignKey: "movie_id", as: "movies" });
      this.belongsTo(Addition, { foreignKey: "addition_id", as: "additions" });
    }
  }

  MovieAddition.init({
    movie_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    addition_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'MovieAddition',
  });
  return MovieAddition;
};

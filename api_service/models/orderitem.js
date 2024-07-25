'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Order, Movie}) {
      this.belongsTo(Order, {foreignKey: "order_id", as: "order"});
      this.belongsTo(Movie, {foreignKey: "movie_id", as: "movie"});

    }
  }
  OrderItem.init({
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    movie_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  },
  {
    sequelize,
    modelName: 'OrderItem',
  });
  return OrderItem;
};
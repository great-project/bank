'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Account.belongsTo(models.Customer, {foreignKey: 'CustomerId'})
    }
    formattedBalance() {
      return this.balance.toLocaleString("en-ID", {
        style: "currency",
        currency: "IDR",
      });
    }
  };
  Account.init({
    type: DataTypes.STRING,
    balance: {
      type: DataTypes.FLOAT,
      validate: {
        min: {
          args: 500000,
          msg: "Minimum balance for new Account: Rp 500.000"
        },
      },
    },
    accountNumber: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Account',
  });
  Account.beforeCreate((instances, options) => {
    instances.accountNumber = Math.floor(1000000001 + Math.random() * 9000000000);
  });
  Account.beforeValidate((instances, options) => {
    if (!instances.balance && instances.balance !== "0") instances.balance = 500000;
  });
  return Account;
};
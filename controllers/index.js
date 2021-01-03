const {Customer, Account} = require('../models');
const { Op } = require("sequelize");


class Controller {
  static getRootHandler(req, res) {
    res.render('home')
    // res.send('THIS IS HOME')
  }
  static getCustomerHandler(req, res) {
    Customer
    .findAll({
      order:[['fullName', 'ASC']]
    })
    .then(data => {
        // res.send(data)
        res.render('customers-list', {data})
      })
      .catch(err => {
        res.send(err)
      })
  }
  static getCustomerRegisterHandler(req, res) {
    res.render('customer-register')
  }
  static postCustomerRegisterHandler(req, res) {
    // res.send(data)
    const newCustomer = {
      identityNumber : req.body.identityNumber,
      fullName : req.body.fullName,
      address : req.body.address,
      birthDate :req.body.birthDate,
      gender : req.body.gender
    }
    Customer
      .create(newCustomer)
      .then(data => {
        // res.send(data)
        res.redirect('/customers')
      })
      .catch(err => {
        res.send(err)
      })
  }
  static getCustomerEditprofileHandler(req, res) {
    // res.send(`coba iniedit`)
    const id = req.params.idCustomer
    Customer
      .findByPk(id)
      .then(data => {
        // res.send(data)
        res.render('customer-edit-profile', {data})
      })
      .catch(err => {
        res.send(err)
      })
  }
  static postCustomerEditprofileHandler(req, res) {
    const id = req.params.idCustomer
    const updatedCustomer = {
      identityNumber : req.body.identityNumber,
      fullName : req.body.fullName,
      address : req.body.address,
      birthDate :req.body.birthDate,
      gender : req.body.gender
    }
    Customer.update(updatedCustomer, {
      where: {
        id: id
      }
    })
    .then(data => {
      res.redirect('/customers')
    })
    .catch(err => {
      res.send(err)
    })
  }
  static getCustomerAccountHandler(req, res) {
    const id = req.params.idCustomer
    let dataCustomer = null
    Customer
      .findByPk(id)
      .then(data => {
        dataCustomer = data
        return Account
          .findAll({
            where: {
              CustomerId: {
                [Op.eq]: id
              }
            }
          })
      })
      .then(data => {
        // res.send({dataCustomer, data})
        res.render('accounts-customer', {dataCustomer, data})
      })
      .catch(err => {
        res.send(err)
      })
    // res.send('ini accounts customer')
  }
  static postCustomerAccountHandler(req, res) {
    const CustomerId = req.params.idCustomer;
    const newAccount = {
      type : req.body.type,
      balance : req.body.balance,
      CustomerId
    }
    Account
      .create(newAccount)
      .then(data => {
        // res.send(data)
        res.redirect(`/customers/${CustomerId}/accounts`)
      })
      .catch(err => {
        res.send(err)
      })

  }
  static getCustomerAccountDetailHandler(req, res) {
    // res.send('ini home')
    const AccountId = req.params.idAccount;
    let dataAccount = null
    Account
      .findAll({
        where: {
          id: {
            [Op.ne]: AccountId,
          },
        },
        include: Customer,
        order:[["CustomerId", "ASC"]]
      })
        .then(data => {
          dataAccount = data
          return Account
            .findByPk(AccountId)
        })
        .then(data => {
          // res.send({data, dataAccount})
          res.render('account-transfer', {data, dataAccount})
        })
        .catch(err => {
          res.send(err)
        })

  }
  static postCustomerAccountDetailHandler(req, res) {
    const transferToAccountId = req.body.transferToAccountId;
    const amount = req.body.amount;
    const Customerid = req.params.idCustomer;
    const AccountId = req.params.idAccount;

    Account
      .findByPk(AccountId)
      .then(data => {
        if (!checkBalance(amount, data.balance)) {
          res.redirect(`/customers/${CustomerId}/accounts/${AccountId}/transfer?errors=Insufficient Balance`)
        }
        else {
          return Account
            .decrement('balance', {
              by: amount,
              where: {
                id: AccountId
              },
            })
            .then(data => {
              return Account
                .findByPk(transferToAccountId)
            })
            .then(data => {
              return Account
                .increment('balance', {
                  by: amount,
                  where: {
                    id: data.id
                  },
                });
            })
            .then(data => {
              res.redirect(`/customers/${CustomerId}/accounts`)
            })
            .catch(err => {
              res.send(err)
            })
        }
      })
  }

}

module.exports = Controller;
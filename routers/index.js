// const { Router } = require('express')

const router = require('express').Router()
const Controller = require('../controllers')

router.get('/', Controller.getRootHandler)
router.get('/customers', Controller.getCustomerHandler)

router.get('/customers/register', Controller.getCustomerRegisterHandler)
router.post('/customers/register', Controller.postCustomerRegisterHandler)

router.get('/customers/:idCustomer/editProfile', Controller.getCustomerEditprofileHandler)
router.post('/customers/:idCustomer/editProfile', Controller.postCustomerEditprofileHandler)

router.get('/customers/:idCustomer/accounts', Controller.getCustomerAccountHandler)
router.post('/customers/:idCustomer/accounts', Controller.postCustomerAccountHandler)

router.get('/customers/:idCustomer/accounts/:idAccount', Controller.getCustomerAccountDetailHandler)
router.post('/customers/:idCustomer/accounts/:idAccount', Controller.postCustomerAccountDetailHandler)

module.exports = router;
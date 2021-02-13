const express = require('express');
const statusCodes = require('http-status-codes');

// we might need to access all the routing params from parent as well,
// so the better practice is to have mergeParams: true
const router = express.Router({mergeParams: true});

const controller = require('./controller');

router.get('/one', async function (req, res) {
  res.status(statusCodes.OK).send(await controller.getUser());
});

module.exports = router;

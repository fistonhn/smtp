const express = require("express");
const router = express.Router();

const EmailController = require("../controller/emailController");

router.post( "/sendEmail", EmailController.rejectFlexPay );

module.exports = router;

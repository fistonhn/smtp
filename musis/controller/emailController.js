const flexPayNotification = require("../config/email");

const { onError, onSuccess } = require("../utils/response");

class EmailController {
    // reject FlexPay
    static async rejectFlexPay(req, res) {
      try {
        const account= {
          subject: req.body.subject,
          message: req.body.message,
          email: req.body.emails,
          senderEmail: req.body.senderEmail
        }

        if(account.subject === undefined && account.message === undefined && account.email === undefined && account.senderEmail === undefined )

        return onError(res, 500, "please fill all fields");

        console.log(account)

        await flexPayNotification(account, account.message);
  
        return onSuccess(res, 200, `Emails successfully sent`);
      } catch (error) {
        console.log(error)
        return onError(res, 500, "internal server error");
      }
    }
    


}
module.exports = EmailController;

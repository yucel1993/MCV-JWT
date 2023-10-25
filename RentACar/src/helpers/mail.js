const nodemailer = require("nodemailer");

function sendEmail(carInfo, rentedDays, totalPrice, userEmail) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "alpagut1993@gmail.com",
      pass: "vaaz vmqq pusr vgwh",
    },
  });

  const mailOptions = {
    from: { name: "Rent A Car", address: "alpagut1993@gmail.com" },
    to: userEmail,
    subject: "Reservation Confirmation",
    text: `Thank you for your reservation. Car details: ${carInfo}. Total Price: $${totalPrice} for ${rentedDays} day/days`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
module.exports = sendEmail;

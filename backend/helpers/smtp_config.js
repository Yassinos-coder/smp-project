const nodemailer = require("nodemailer");


exports.mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "smp.newpass@gmail.com",
      pass: 'dfdeebbisintdjqd',
    },
  });
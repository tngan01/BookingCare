require("dotenv").config();
import nodemailer from "nodemailer";

let sendSimpleEmail = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Ngân" <htthanhngan01@gmail.com>', // sender address
    to: dataSend.reciverEmail, // list of receivers
    subject: "Thông tin đặt lịch khám bệnh", // Subject line
    html: getBodyHTMlEmail(dataSend),
  });
};

let getBodyHTMlEmail = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = ` 
    <h3>Xin chào ${dataSend.patientName}! </h3>
    <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên "Booking Care"</p>
    <p>Thông tin đặt lịch khám bệnh</p>
    <div><b>Thời gian: ${dataSend.time}</b></div>
    <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>

    <p>Nếu các thông tin trên là đúng, vui lòng click vào đường link bên dưới để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh</p>
    <div><a href=${dataSend.redirectLink} target="_blank" </a>Click here</div>

    <div> Xin chân thành cảm ơn! </div>`; // html body
  }
  if (dataSend.language === "en") {
    result = `
    <h3>Dear ${dataSend.patientName}! </h3>
    <p>You received this email because you booked an online medical appointment on "Booking Care"</p>
    <p>Information to book a medical appointment</p>
    <div><b>Time: ${dataSend.time}</b></div>
    <div><b>Doctor: ${dataSend.doctorName}</b></div>

    <p>If the above information is true, please click on the link below to confirm and complete the procedure to book an appointment.</p>
    <div><a href=${dataSend.redirectLink} target="_blank" </a>Click here</div>

    <div>Thank you!</div>`; // html body
  }
  return result;
};

module.exports = {
  sendSimpleEmail: sendSimpleEmail,
};

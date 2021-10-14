const nodemailer = require("nodemailer");


const sendEmail = (email, token) =>{
    
    let transporter = nodemailer.createTransport({
        server: 'Gmail',
        host: 'smtp.gmail.com',
        auth: {
          user: process.env.EMAIL, // generated ethereal user
          pass: process.env.EMAILPASS, // generated ethereal password
        },
      });

    console.log(email, "Check dayo");
    // console.log(userName);
    transporter.sendMail({
        from: process.env.EMAIL, // sender address
        to: email, // list of receivers
        subject: "Change password", // Subject line
        html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        <style>
        .container{
            padding-left: 20px;
            padding-right: 20px;
            margin-top: 30px;
        }
        .card_Wrapper{
            background-color: white;
            margin-left: auto;
            margin-right: auto;
            height: 300px;
            width: 45%;
            border-radius: 8px;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        }
        img{
            width: 150px;
            height: 50px;
            margin-top: 20px;
            margin-left: 20px;
        }
        .text{
            color: #9c4821;
            margin-top: 20px;
            margin-left: 20px;
            font-size: 20px;
        }
        .text2{
            margin-top: 20px;
            margin-left: 20px;
            font-size: 14x;
        }
        .button{
            color:#F3E3EC;
            margin-top: 20px;
            background-color: #f77436;
            height: 45px;
            width: 30%;
            border-radius: 3px;
            margin-left: 20px;
            border: none;
        }
        .thanmks{
            margin-left: 20px;
            /* padding-top: 20px; */
            font-size: 14px;
        }
        .thanmks1{
            margin-left: 20px;
            /* padding-top: 0; */
            font-size: 14px;
        }
        </style>
        </head>
        <body style="background-color: #F0F0F0; font-family: Metropolis;">
            <div class="container">
                <div class="card_Wrapper">
                    <img src="../asset/Group 1158.png" alt="">
                    <p class="text">Hiya there~</p>
                    <p class="text2">Click the link below to set a new password for your Blanja account</p>
                    <a href="https://blanja-silk.vercel.app//passConfirmation_cust?token=${token}"><input type="button" value="Change Password" class="button"></a>
                    <p class="thanmks">Thanks</p>
                    <p class="thanmks1">-Blanja teams</p>
                </div>
            </div>
        </body>
        </html>`, // html body
      })
      .then((res)=>{
        console.log(res);
      })
      .catch((err)=>{
        console.log('error', err);
      })
    }

module.exports={
    sendEmail
}
const nodemailer = require("nodemailer");


const envoyerEmail = (email, name, token) =>{
    
    let transporter = nodemailer.createTransport({
        server: 'Gmail',
        host: 'smtp.gmail.com',
        auth: {
          user: process.env.EMAIL, // generated ethereal user
          pass: process.env.EMAILPASS, // generated ethereal password
        },
      });

    console.log(email, "Check dayo");
    console.log(name);
    transporter.sendMail({
        from: process.env.EMAIL, // sender address
        to: email, // list of receivers
        subject: "Verify Your Email Address for Blanja", // Subject line
        html: `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Confirmation</title>
            <style>
                body{
                    background-color: #F7F8F3;
                    /* font-family: metropolis; */
                }
                .wrapper{
                    height: 380px;
                    width: 350px;
                    background-color: white;
                    border: 1px solid black;
                    margin-left: auto;
                    margin-right: auto;
                    border-radius: 5px;
                    margin-top: 50px;
                  
                }
                .container{
                    padding-left: 20px;
                    padding-right: 20px;
                }
                .button{
                    color:#F3E3EC;
                    background-color: #4F3267;
                    height: 45px;
                    width: 65%;
                    text-align: center;
                    margin: 35px auto;
                    display: block;
                    border-radius: 8px;
                }
                a{
                    text-decoration: none;
                }
                h1{
                    margin-top: 20px;
                    color: #4F3267;
                    font-size: 28px;
        
                }
                h3{
                    color: #9D78BE;
                    margin-top: 20px;
                    font-size: 20px;
                }
                p{
                    font-size: 14px;
                }

            </style>
        </head>
        <body>
            <div class="wrapper">
                <div class="container">
                    
                    <h1>welcome to Blanja.com</h1>
                    <h3>Greetings ${name}</h3>
                    <p class="text">Your account has been successfully created! To verify your email address and complete your account creation, please click the verification button below or copy and paste the address into your browser:</p>
                    <a href="http://localhost:4000/v1/user/sellerActivation/${token}"><input type="button" value="VERIFY ACOOUNT" class="button"></a>
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
    envoyerEmail
}
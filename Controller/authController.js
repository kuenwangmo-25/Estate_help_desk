const User = require ('../Model/userModel')
const jwt = require('jsonwebtoken')
const AppError = require ('../utils/appError')
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');



const signToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN,
    })
}

const createSendToken = (user, statusCode, res) => {
    const token =signToken(user._id)
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
        ),
        httpOnly: true,
    }
    res.cookie('jwt', token, cookieOptions)

    res.status(statusCode).json({
        status: 'success',
        token,
        data : {
            user
        }
    })

}
const generateOTP = () => {
    return crypto.randomInt(100000, 999999).toString();
  };

  const sendOTPEmail = async (email, otp) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // e.g., 'gmail'
      auth: {
        user: 'kuensw@gmail.com',
        pass: 'qmii uzrb pahl mkxy',
      },
    });
  
    const mailOptions = {
      from: 'kuensw@gmail.com',
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}. It will expire in 5 minutes.Ones the otp is verified, it will be Your default password`,
    };
  
    await transporter.sendMail(mailOptions);
  };

  exports.register = async (req, res) => {
    const { email, otp } = req.body;  

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!otp) {
            const generatedOTP = generateOTP();
            user.otp = generatedOTP;
            user.otpExpires = Date.now() + 5 * 60 * 1000; 
            await user.save();

            await sendOTPEmail(email, generatedOTP);
            return res.status(200).json({ status: "success",message: "OTP sent successfully" });
        }

        if (Date.now() > user.otpExpires) {
            return res.status(400).json({ message: "OTP expired. Request a new one." });
        }

        if (user.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP. Try again." });
        }

        user.password = await bcrypt.hash(otp, 12);
       

        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        return createSendToken(user, 201, res);


    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

exports.login = async (req, res, next) => {
  try {
      const { email, password } = req.body;

      if (!email || !password) {
          return res.status(400).json({ message: "Please provide an email and password!" });
      }

      const user = await User.findOne({ email }).select('+password');
      if (!user) {
          return res.status(401).json({ message: "Incorrect email or password!" });
      }

      const isCorrect = await bcrypt.compare(password, user.password);
      if (!isCorrect) {
          return res.status(401).json({ message: "Incorrect email or password!" });
      }

      createSendToken(user, 200, res);
  } catch (err) {
      console.error("Error in login:", err);
      res.status(500).json({ message: "Server error!" });
  }
};


exports.adminlogin = async (req, res) => {

    try {
        console.log(req.headers)
      const { email, password } = req.body;
  
      // Check if user exists
      const user = await User.findOne({ email }).select("+password");
  
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      // Check if the password is correct using bcrypt
      const isCorrect = await bcrypt.compare(password, user.password);
      if (!isCorrect) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      createSendToken(user, 200, res);

     
    } catch (error) {
      console.error("Login Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  
exports.logout =  (req, res) => {
    res.cookie('token', '',{
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    })
    res.status(200).json({ status: "success", message: "Logged out successfully!" })
}



exports.updatePassword = async (req, res, next)  =>  {
    try{

        const user = await User.findById(req.user.id).select('+password')

        if (!(await user.correctPassword(req.body.passwordCurrent, user.password))){
            return next(new AppError('Your current password is wrong', 401))
        }
        user.password = req.body.password
        user.passwordConfirm = req.body.passwordConfirm
        await user.save()

        createSendToken(user,200,res)

    }catch(err){
        res.status(500).json({error:err.message})
    }
};

exports.protect = async(req, res, next) => {
    try{
        // getting token and check if it is there
        let token
        if(
            // req.headers.authorization && req.headers.authorization.startsWith("Bearer")
            req.headers.authorization?.startsWith("Bearer")

        ){
            token = req.headers.authorization.split(' ')[1]
        }else if(req.cookies.jwt){
            token = req.cookies.jwt
        }
  
        if(!token) {
            return next(
                new AppError('You are not logged in! Please log in to get access.', 401),
            )
        }
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
        console.log(decoded)

        const freshUser= await User.findById(decoded.id)
        if(!freshUser) {
            return next(
                new AppError('The user belonging to this token no longer exist', 401),
            )
        }
        req.user=freshUser
        next()
    }
    catch(err) {
        res.status(500).json({error: err.message});
    }
  }
  

const User = require ('../Model/userModel')
const jwt = require('jsonwebtoken')
const AppError = require ('../utils/appError')
const crypto = require('crypto');
const nodemailer = require('nodemailer');




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
    const { email, otp } = req.body;  // OTP is optional, used for verification

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!otp) {
            const generatedOTP = generateOTP();
            user.otp = generatedOTP;
            user.otpExpires = Date.now() + 5 * 60 * 1000; // 5 minutes expiry
            await user.save();

            await sendOTPEmail(email, generatedOTP);

            return res.json({ message: "OTP sent successfully" });
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

        return res.json({ message: "OTP verified. It has been set as your default password." });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

exports.login = async (req,res, next) => {
    try{
        const {email, password} = req.body
        if (!email || !password) {
            return next(new AppError('Please provide an email and password!', 400))
        }
        const user = await User.findOne({email}).select('+password')
        // const correct = await User.correctPassword(password, user.password)

        if (!user || !(await user.correctPassword(password, user.password))) {
            return next(new AppError('Incorrect email or password!', 401))
        }
        const correct = await user.correctPassword(password,user.password)

        if (!user || !correct){
            return next(new AppError('Incorrect email or password!', 401))
        }

        createSendToken(newUser,201,res)
    }catch(err) {
        res.status(500).json(new AppError('Please provide an email and password!', 400))
    }
}








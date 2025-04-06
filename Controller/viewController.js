const path = require ('path')

exports.getLoginForm=(req, res) => {
    res.sendFile(path.join(__dirname, '../','View', 'Admin',"pages",'SignIn.html'))
}

exports.home = (req,res) => {
    res.sendFile(path.join(__dirname, '../','View', 'Admin',"pages", 'Dashboard.html'))
}

exports.emailform = (req,res) => {
    res.sendFile(path.join(__dirname, '../','View', 'Admin',"pages", 'OTPemail.html'))
}

exports.otpform = (req,res) => {
    res.sendFile(path.join(__dirname, '../','View', 'Admin',"pages", 'OTP.html'))
}


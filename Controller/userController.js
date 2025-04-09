const  User = require('./../Model/userModel')
const multer = require("multer");
const xlsx = require("xlsx");
const AppError = require('../utils/appError');

// Multer storage for handling Excel uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

exports.getAllUsers = async (req,res,next) =>{
    try {
        const users = await User.find()
        res.status(200).json({data:users, status:'success'})
    }catch(err){
        res.status(500).json({message:err.message});
    }

}

exports.createUser = async (req,res) => {
    try {
        const user = await User.create(req.body);
        console.log(req.body.name)
        res.json ({data: user, status:"success"});
    }catch(err){
        res.status(500).json({message:err.message});

    }
}
exports.bulkUploadUsers = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "Please upload an Excel file" });
        }

        // Read Excel file
        const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0]; // First sheet
        const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        // Format data (users should not have passwords)
        const users = data.map(user => ({
            name: user.name,
            email: user.email,
            role: user.role,
            password: null // No password initially (user logs in via OTP)
        }));

        // Insert users into database
        const createdUsers = await User.insertMany(users);

        res.status(201).json({ status: "success", data: createdUsers });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Multer middleware for file upload
exports.uploadExcel = upload.single("file");

exports.getUser = async (req, res) => {
    try {
      const user = req.user; // added by the middleware
      res.status(200).json({ data: user, status: "success" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

exports.updateUser = async(req,res) => {
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body);
        res.json({data:user, status:"success"});
    }catch(err){
        res.status(500).json({message:err.message});
    }
}

exports.deleteUser = async(req,res) =>{
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        res.json({data:user, status:"success"});

    }catch (err){
        res.status(500).json({message:err.message});
    }
}

exports.findUserByEmail = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ data: user, status: "success" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getUserCount = async (req, res) => {
    try {
        const count = await User.countDocuments(); // Get total count of users
        res.status(200).json({ totalUsers: count, status: 'success' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

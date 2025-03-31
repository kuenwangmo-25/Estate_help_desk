const Equipment = require ('../Model/equipmentModel')
const Category = require ('../Model/IssueCategoryModel');
const Status = require('../Model/StatusModel')


exports.createStatus = async (req,res) => {
    try {
        const status= await Status.create(req.body);
        console.log(req.body.name)
        res.json ({data: status, status:"status added successfully"});
    }catch(err){
        res.status(500).json({message:err.message});

    }
}

exports.getAllStatus = async (req, res) => {
    try {
        const status = await Status.find().select('name'); // Fetch all categories
        res.status(200).json({ data: status, status: 'success' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.createEquipment = async (req,res) => {
    try {
        const equipment = await Equipment.create(req.body);
        console.log(req.body.name)
        res.json ({data: equipment, status:"Equipment name added successfully"});
    }catch(err){
        res.status(500).json({message:err.message});

    }
}
exports.getAllEquipment = async (req, res) => {
    try {
        const equipments = await Equipment.find().select('name'); // Fetch all categories
        res.status(200).json({ data: equipments, status: 'success' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.createCategory = async (req,res) => {
    try {
        const category = await Category.create(req.body);
        console.log(req.body.name)
        res.json ({data: category, status:"Category added successfully"});
    }catch(err){
        res.status(500).json({message:err.message});

    }
}

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().select('name'); // Fetch all categories
        res.status(200).json({ data: categories, status: 'success' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


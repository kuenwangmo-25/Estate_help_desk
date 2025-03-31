const mongoose = require('mongoose');

const EquipmentSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }
});

const Equipment = mongoose.model('Equipment', EquipmentSchema);

module.exports = Equipment;

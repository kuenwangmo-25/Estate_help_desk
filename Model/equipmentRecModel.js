const mongoose = require('mongoose');

const EquipmentRecordSchema = new mongoose.Schema({
    estateIssue: { type: mongoose.Schema.Types.ObjectId, ref: 'EstateIssue', required: true },
    equipment: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipment', required: true }, // Foreign key
    quantity: { type: Number,required: true, default: 0},

});

const EquipmentRecord = mongoose.model('EquipmentRecord', EquipmentRecordSchema);

module.exports = EquipmentRecord;

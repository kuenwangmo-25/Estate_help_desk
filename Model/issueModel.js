const mongoose = require('mongoose');

const EstateIssueSchema = new mongoose.Schema({
    reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User reference
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }, // Category reference
    photo: { type: String },
    contactNo: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    dateReported: { type: Date, default: Date.now },
    status: { type: mongoose.Schema.Types.ObjectId,
         ref: 'Status', 
         default: '67e98ec9fc4f0a18b3619101',// default status
         required: true }, // Status reference
    equipmentUsedRecords: [{ type: mongoose.Schema.Types.ObjectId, ref: 'EquipmentUsedRecord' }], // Reference EquipmentUsedRecord
    remark: [{  
        message: { type: String, required: true }, 
        sentAt: { type: Date, default: Date.now }  
    }] 
});

const EstateIssue = mongoose.model('EstateIssue', EstateIssueSchema);
module.exports = EstateIssue;

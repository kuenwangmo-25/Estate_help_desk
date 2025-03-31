const mongoose = require('mongoose');

const IssueCategorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }
});

const IssueCategory = mongoose.model('issuecategory', IssueCategorySchema);

module.exports = IssueCategory;

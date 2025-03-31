const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    Feedback: { type: String, required: true },
    date: { type: Date, default: Date.now },

});
const Feedback = mongoose.model('Feedback', FeedbackSchema);
module.exports = Feedback;

const Issue = require("../Model/issueModel")

const Feedback = require('../Model/feedbackModel')

exports.createFeedback = async (req,res) => {
    try {
        const feedback= await Feedback.create(req.body);
        console.log(req.body.Feedback)
        res.json ({data:feedback, status:"success"});
    } catch (error) {
        res.status(500).json({message:err.message});
    }
    
}

exports.getAllFeedback= async (req,res,next) =>{
    try {
        const feedbacks = await Feedback.find()
        res.status(200).json({data:feedbacks, status:'success'})
    }catch(err){
        res.status(500).json({message:err.message});
    }

}
exports.deleteFeedback = async(req,res) =>{
    try{
        const feedback = await Feedback.findByIdAndDelete(req.params.id);
        res.json({data: feedback, status:"success"});

    }catch (err){
        res.status(500).json({message:err.message});
    }
}



exports.createIssue = async (req,res) => {
    try {
        const issue = await Issue.create(req.body);
        console.log(req.body.name)
        res.json ({data: issue, status:"success"});
    }catch(err){
        res.status(500).json({message:err.message});

    }
}


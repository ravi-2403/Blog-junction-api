const express = require('express');

const router = express.Router();
require('dotenv').config();

//Home page
router.get('/',(req, res)=>{
    res.status(200).json({"msg":"Welcome to the blog junction api!!!"});
});

//post the blogs
router.post('/post-a-blog',async (req,res)=>{
    const data = req.body;
    try{
        await db.collection('blogs').insertOne(data);
        res.status(200).json({"msg":"Blogs has been submitted successfully!!!"});
    }catch(err){
        res.status(500).json({"mssg":`An Error has occured ${err.message}`});
    }
});


//get all the blogs
router.get('/blogs',async (req,res)=>{
    const blogs = [];
    try{
        await db.collection('blogs')
            .find({})
            .forEach((blog)=>{
                delete blog._id;
                delete blog.__v;
                blogs.push(blog);
        })
        res.status(200).json(blogs);
    }catch(err){
        console.log("Error in getting the blogs ",err);
    }
})


//posting the feedback to the database
router.post('/give-feedback',async (req,res)=>{
    const data = req.body;
    try{
        await db.collection('feedback').insertOne(data);
        res.status(200).json({"msg":"Feedback posted successfully"});
    }catch(err){
        res.status(500).json({"msg":"Error Occured"});
    }
});

//posting the request a call-back details to database
router.post('/get-a-call',async (req,res)=>{
    const data = req.body;
    try{
        await db.collection('contacts').insertOne(data);
        res.status(200).json({"msg":"Contact details are recieved by the admin . We will contact you within 2 working days"});
    }catch(err){
        res.status(500).json({"msg":`An error occured ${err.message}`});
    }
})

/*
These are the admin privilages
As of now we have only one admin so I am harcoding the api key but, 
when we have more than one admin we need to generate the unique api key in order to access the secured content.
*/

//get the feedback submitted by the users
router.get(`/showfeedbacks/${process.env.API_KEY}`,async (req,res)=>{
    let feedbacks = []
    try{
        await db.collection('feedback')
            .find()
            .forEach((feedback)=>{
                delete feedback._id;
                delete feedback.__v;
                feedbacks.push(feedback);
            })
        res.status(200).json(feedbacks);
    }catch(err){
        res.status(500).json({"msg":`Error ${err.message}`})
    }
});

//get the contact details submitted by the users
router.get(`/show-get-a-call-back/${process.env.API_KEY}`,async (req,res)=>{
    const contacts = [];
    try{
        await db.collection('contacts')
            .find()
            .forEach(async (contact)=>{
                delete contact._id;
                // contact.phoneNo = contact.phoneNo;
                await contacts.push(contact);
            });
        res.status(200).json(contacts);
    }catch(err){
        res.status(500).json({"msg":`Error ${err.message}!!!`});
    }
})


/*
    Api for the condicting the test
*/ 
router.post("/newregistration-for-test",async (req,res)=>{
    const data = req.body;
    try{
        console.log(data)
        await db.collection('vitaraTest').insertOne(data)
        res.status(200).json({msg:"data sent!!! you can proceed for the test"})
    }catch(err){
        res.status(404).json({msg:`${err.message}`})
    }
    
});

module.exports = router;
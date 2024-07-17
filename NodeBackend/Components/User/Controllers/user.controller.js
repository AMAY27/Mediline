const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../schemas/user.schema.js');
const Report = require('../schemas/report.schema.js');
const { createToken } = require('../../../util/TokenCreation.js');
const multer = require('multer');
const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { v4: uuidv4 } = require('uuid');

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
    },
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


const userController = {
    registerUser: async (req,res) => {
        try {
            const user = await User.findOne({email : req.body.email});
            if(user){
                res.status(400).json({status : 'unavail'});
            }else{
                const salt = await bcrypt.genSalt(10);
                let encryptPassword = req.body.password
                encryptPassword = await bcrypt.hash(encryptPassword, salt);
                const user = await User.create({
                    email: req.body.email,
                    password: encryptPassword,
                    name: req.body.name,
                    is_active: req.body.is_active,
                    date_joined: Date.now()
                });
                res.status(201).json({status : 'ok'})
            }
        } catch (error) {
            res.status(400).json({status :'error'})
            console.log(error);
        }
    },

    loginUser: async (req,res) => {
        try {
            const user = await User.findOne({email: req.body.email});
            if(!user){
                return res.status(400).json({status:'email incorrect'})
            }
            const isPass = await bcrypt.compare(req.body.password, user.password);
            if(!isPass){
                return res.status(400).json({status:'password incorrect'})
            }
            const token = createToken(user._id)
            res.cookie("token", token,{
                withCredentials: true,
                httpOnly: false,
            });
            res.status(201).json({message: "User logged in sucsessfully", success: true, user_id: user._id});
        } catch (error) {
            console.error(error);
        }
    },
    uploadReport: async (req, res) => {
        upload.array('files')(req, res, async (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: 'File upload failed.' });
            }

            const files = req.files;
            const userId = req.headers['userid'];

            if (!files || files.length === 0) {
                return res.status(400).json({ error: 'No files provided.' });
            }

            try {
                const uploadPromises = files.map(async (file) => {
                    const { originalname, buffer } = file;
                    const fileId = uuidv4();
                    const fileKey = `${fileId}_${originalname}`;

                    const params = {
                        Bucket: process.env.AWS_S3_BUCKET,
                        Key: fileKey,
                        Body: buffer,
                        ContentType: 'application/pdf',
                    };

                    await s3.send(new PutObjectCommand(params));
                    return {
                        key: fileKey,
                        name: file.originalname
                    };
                });

                const uploadedFiles = await Promise.all(uploadPromises);
                console.log(uploadedFiles);
                uploadedFiles.map((file)=>{
                    const report = Report.create({
                        title: file.name,
                        // description: req.body.description,
                        date: Date.now(),
                        userId : userId,
                        s3Key: file.key
                    })
                })

                res.status(200).json({ message: 'Files uploaded successfully.', files: uploadedFiles });
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Error uploading files.' });
            }
        });
    },
    getReportsForUser : async(req,res) => {
        try {
            const reports = await Report.find({userId : req.query.userid})
            if (!reports.length) {
                return res.status(404).json({ message: 'No reports found for this user.' });
            }

            const reportUrls = await Promise.all(reports.map(async (report) => {
                const params = {
                    Bucket: process.env.AWS_S3_BUCKET,
                    Key: report.s3Key,
                };

                const url = await getSignedUrl(s3, new GetObjectCommand(params), { expiresIn: 3600 });
                return { ...report.toObject(), url };
            }));

            console.log(reportUrls);
            res.status(200).json({reports: reportUrls})
        } catch (error) {
            console.error(error);
            res.status(500).json({error:'Internal server error'})
        }
    }
}

module.exports = userController
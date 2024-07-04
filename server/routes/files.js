const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const File = require('../models/File');
const { v4: uuid4 } = require('uuid');


let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        // 34556738383-4739539574739.zip
        cb(null, uniqueName);
    }
});

let upload = multer({
    // storage: storage,
    storage,
    limits: { fileSize: 1000000 * 100 },

}).single('myfile');

router.post('/', async (req, res) => {

    // Store file
    upload(req, res, async (error) => {

        // Validate Request
        if (!req.file) {
            return res.status(404).json({ error: "All fields are required!" });
        }

        if (error) {
            return res.status(500).send({ error: error.message });
        }

        // Store into Database
        const file = new File({
            filename: req.file.filename,
            uuid: uuid4(),
            path: req.file.path,
            size: req.file.size
        });

        const response = await file.save();

        return res.json({ file: `${process.env.APP_BASE_URL}/files/${response.uuid}` });
        // http://localhost:5000/files/46477847743-4775743374.zip
    })

    // Response => Link
    // res.status(200).json({ message: 'File uploaded' })

});

module.exports = router;
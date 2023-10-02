import multer from "multer"
import path from "path";
import fs from "fs";
import registerModel from "../models/register.model";

export const multerFunction = (dest) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            if (fs.existsSync(dest)) {
                cb(null, dest)
            }
            else {
                fs.mkdirSync(dest)
                cb(null, dest)
            }
        },
        filename: function (req, file, cb) {
            const ext = path.extname(file.originalname)
            const fileArr = file.originalname.split('.')
            fileArr.pop();

            const newfilename = fileArr.join('.') + '-' + Date.now() + ext;

            cb(null, newfilename)
        }
    })

    return multer({ storage: storage })
}


export const addRegister = (req, res) => {
    try {
        const uploadFile = multerFunction("./uploads").single("resume")

        uploadFile(req, res, function (err) {
            const { name, date, hobby, state, address, gender } = req.body;

            let imagename = ""
            console.log(req.file)
            console.log(req.body)
            if (req.file != undefined) {
                imagename = req.file.filename
            }
            const data = new registerModel({
                name: name,
                date: date,
                hobby: hobby,
                state: state,
                address: address,
                gender: gender,
                resume: imagename
            })
            data.save()
            if (data) {
                res.status(201).json({
                    data: data,
                    message: "successfull Added"
                })
            }
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}

export const getRegister = async (req, res) => {
    try {

        const data = await registerModel.find()

        if (data) {
            res.status(201).json({
                data: data,
                message: "successfull Added"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}
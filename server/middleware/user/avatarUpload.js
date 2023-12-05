import fs from 'fs';
import multer from 'multer';
import path from 'path';

function avatarUpload(req, res, next) {
    
    const up_avatars = path.join(__dirname, "../../assets/usersAvatars");
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            if (!fs.existsSync(up_avatars)) {
                fs.mkdirSync(up_avatars, { recursive: true });
            }
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * "1e9");
            const ext = path.extname(file.originalname);
            
            cb(null, file.fieldname + "-" + uniqueSuffix + ext);
        },
    });

    const upload = multer({
        storage: storage,
        limits: {
            fileSize: 20 * 1024 * 1024,
        },
        fileFilter: (req, file, cb) => {
            if (
                file.mimetype === "image/jpeg" ||
                file.mimetype === "image/jpg" ||
                file.mimetype === "image/png"
            ) {
                cb(null, true)
            } else {
                cb(null, false);
            }
        }
    });

    upload.any()(req, res, (error) => {
        if (error) {
            res.status(500).json({
                success: false,
                message: "Error uploading file",
                error: error.message,
            });
        } else {
            next();
        }
    });
}

export { avatarUpload };
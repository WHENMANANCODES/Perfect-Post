import multer from 'multer';
import path from 'path';

// 1. Storage setup: Files server par kahan aur kis naam se save hongi
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Yeh hamare local server folder path me files bhejega
  },
  filename: (req, file, cb) => {
    // File ko ek unique naam dene ke liye timestamp joda (e.g., image-17182928.png)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// 2. File validation filter system
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true); // File accepted
  } else {
    cb(new Error('Only standard image assets (JPG, JPEG, PNG, WEBP) are authorized! ❌'));
  }
};

// 3. Compiling the complete middleware module pipeline object
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // Strict safety cap: max 5MB payload allowed
});

export default upload;
import multer from 'multer';
import path from 'path';

// 1. Storage setup: Shifted from local disk to temporary RAM Memory buffer stream 🚀
// Isse Render cloud container par directory crash (ENOENT) ka jhanjhat 100% khatam!
const storage = multer.memoryStorage();

// 2. File validation filter system (Aapka clean core filter logic intact hai)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true); // File accepted safely in memory buffer
  } else {
    cb(new Error('Only standard image assets (JPG, JPEG, PNG, WEBP) are authorized! ❌'), false);
  }
};

// 3. Compiling the complete middleware module pipeline object
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // Strict safety cap: max 5MB payload allowed
});

export default upload;
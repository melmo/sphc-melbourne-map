const aws = require('aws-sdk');
const multer = require("multer");
const multerS3 = require('multer-s3');
const slugify = require("slugify");
const path  = require('path');

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, 
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, 
  region: 'ap-southeast-2'
});

const s3 = new aws.S3({
  apiVersion: "2006-03-01"
});

var setFileName = (name) => {
  var first = name.substring(0, name.lastIndexOf(".") );
  var ext = name.substring(name.lastIndexOf(".") , name.length);
  var fileName = slugify(first) + '-' + Date.now() + ext;
  return fileName; 
}


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, setFileName(file.originalname) )
  }
});

var imageFileFilter = (req, file, cb) => {
  var ext = path.extname(file.originalname);
  if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return callback(new Error('Only images are allowed'));
  }
  cb(null, true);
};

var textFileFilter = (req, file, cb) => {
  var ext = path.extname(file.originalname);
  if(ext !== '.pdf' && ext !== '.txt' && ext !== '.doc' && ext !== '.docx') {
      return callback(new Error('Only text, pdf and Word files are allowed'));
  }
  cb(null, true);
};

var limits = {
  files: 1, // allow only 1 file per request
  fileSize: 1024 * 1024 * 5, // 5 MB (max file size)
};

const upload = multer({ 
  storage: storage ,
  fileFilter: imageFileFilter,
  limits:limits
});


const uploadImageS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {
        location: req.body.locationId,
        copyright: req.body.copyright,
        caption: req.body.caption
      });
    },
    key: function (req, file, cb) {
      cb(null, setFileName(file.originalname));
    }
  }),
  fileFilter: imageFileFilter,
  limits:limits
});

const uploadFileS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {
        location: req.body.locationId,
        name: req.body.name,
        description: req.body.description
      });
    },
    key: function (req, file, cb) {
      cb(null, setFileName(file.originalname));
    }
  }),
  fileFilter: textFileFilter,
  limits:limits
});




saveImage = (req, res, next) => {

  return upload.single('file')(req, res, () => {
    // Remember, the middleware will call it's next function
    // so we can inject our controller manually as the next()

    if (!req.file) return res.json({ error: "File upload unsuccessful" })
    next();
  });
};


saveImageS3 = (req, res, next) => {
  return uploadImageS3.single('file')(req, res, () => {
    // Remember, the middleware will call it's next function
    // so we can inject our controller manually as the next()

    if (!req.file) return res.json({ error: "File upload unsuccessful" })
    next();
  });
};


saveFileS3 = (req, res, next) => {
  return uploadFileS3.any()(req, res, () => {
    // Remember, the middleware will call it's next function
    // so we can inject our controller manually as the next()

    if (!req.files) return res.json({ error: "File upload unsuccessful" })
    next();
  });
};



const fileStorage = {
  saveImage: saveImage,
  saveImageS3:saveImageS3,
  saveFileS3:saveFileS3
};

module.exports = fileStorage;
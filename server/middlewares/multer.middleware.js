import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //console.log(file);
    return cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
    return cb(null, file.fieldname + "_" + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });

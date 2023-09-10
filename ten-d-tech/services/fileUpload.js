const multer = require("multer")


//upload image
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/mediaFiles/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Math.round(Math.random() * 1E9)
      cb(null,uniqueSuffix+'-'+file.originalname)
    }
  })

       
// Define the maximum size for uploading
// picture i.e. 1 MB. it is optional
const maxSize = 1 * 1000 * 1000;
    
var upload = multer({ 
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: function (req, file, cb){
    
        // Set the filetypes, it is optional
        var filetypes = /jpeg|jpg|png/;
        var mimetype = filetypes.test(file.mimetype);
  
        var extname = filetypes.test(path.extname(
                    file.originalname).toLowerCase());
        
        if (mimetype && extname) {
            return cb(null, true);
        }
      
        cb("Error: File upload only supports the "
                + "following filetypes - " + filetypes);
      } 

})


const singleFileUpload = async (fileInputName) => {
    return upload.single(fileInputName)
}


module.exports = {
    singleFileUpload
}
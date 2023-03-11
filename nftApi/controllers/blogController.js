const multer = require("multer");
const APIFeatures = require("../Utils/apiFeatures");
const catchAsync = require("../Utils/catchAsync");
const Blog = require("./../models/blogModel");


exports.getAllBlogs = catchAsync(async (req, res, next) => {

  const features = new APIFeatures(Blog.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .pagination();
  const blogs = await features.query;

  // /SEND QUERY
  res.status(200).json({
    status: "success",
    results: blogs.length,
    data: {
      blogs,
    },
  });
});


// exports.uploadImg = multer({
//   storage:multer.diskStorage({
//     destination: function(req, file, cb){
//       cb(null,"uploads")
//     },
//     filename: function(req, file, cb){
//       console.log('file',file);
//   cb(null, file.originalname)
//     }
//   })
//   }).single('filename');


//POST METHOD
exports.createBlog = catchAsync(async (req, res, next) => {
  let image1 = req.files.filename
  const newBlog = new Blog({
    title: req.body.title,
    content: req.body.content,
    categories: req.body.categories,
    filename: image1.name,
    time: new Date().toLocaleTimeString(),
  });
  image1.mv('../FrontEnd/img/' + image1.name + '.jpg', (err, done) => {
    if (!err) {
      console.log("image saved")
    } else {
      console.log(err)
    }
  })
  newBlog.save().then(
    () => {
      res.status(201).json({
        status: "success",
        data: {
          blog: newBlog,
        },
      })
    })
});

// GET SINGLE Blog
exports.getSingleBlog = catchAsync(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return next(new AppError('No blog found with that ID', 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      blog,
    },
  });
});

//DELETE METHOD
exports.deleteBlog = catchAsync(async (req, res, next) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);

  if (!blog) {
    return next(new AppError('No blog found with that ID', 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      message: "Blog deleted",
    },
  })
});


//  const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//       cb(null, 'uploads');
//     },
//   filename: function (req, file, cb) {
//       cb(null, file.filename +"-" + ".jpg");
//   }
// });

// exports.uploadImg = multer({storage: storage}).single('filename');
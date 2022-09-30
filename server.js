const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const port = 8000;
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, '/uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname);
  }
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const handleError = (err, res) => {
  console.log(err);
  res
    .status(500)
    .contentType("text/plain")
    .end("Oops! Something went wrong!");
};

app.get('/', (req, res) => {
  app.render('index.html');
})

app.post('/', upload.single('file'), async (req, res) => {
  if (!req.file) {
    console.log("No file received");
  } else {
    console.log('file received');
    const tempPath = req.file.path;
    const ext = path.extname(req.file.originalname).toLowerCase();
    const targetPath = path.join(__dirname, tempPath+ext);
    console.log(tempPath);
    console.log(targetPath);
    fs.rename(tempPath, targetPath, err => {
      if (err) return handleError(err, res);
    });

    var spawn = require('child_process').spawn;
    var ans = "";
    var process = spawn('python', [
      './process.py',
      targetPath
    ]);
    process.stdout.on('data', await function(data) {
      // console.log(data.toString());
      ans = data;
      // console.log(ans);
      res.status(200);
      res.send(ans);
    });
  }
});

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});
const bodyParser= require('body-parser')
const express = require("express");

const app = express();
const multer = require("multer");

let image="", title =""
app.set("view engine", "ejs"); 
var publicDir = require('path').join(__dirname,'/public');
app.use(express.static(publicDir));
app.set("views", __dirname + "/"); 
app.use(bodyParser.urlencoded({extended: false}))

app.get('/', function(req, res) {
    res.render('index', {imagef: image, stat: "hidden", err: "", title: title});
});
let store = multer.diskStorage({
   
    destination: function (req, file, cb) {
      cb(null, 'public/images/')
    },
    filename: function (req, file, cb) {
        let namearr = file.originalname.split('.');
        image = namearr[0] + '-' + Date.now() + "." + namearr[1];
      cb(null, image)
    }
  })

  let upload = multer({ storage: store })
  app.post('/display', upload.single('imageU'), (req, res, next) => {
      title = req.body.title
    const file = req.file
    let tit = title;
 
    if (!file) {
        res.render('index', {imagef: image, stat: "hidden", err: "Please add file to enter", title: tit});
     
    }
    if(!title){
        tit = "[No description available]"
        console.log("mjmj")
    }
    image ="/images/" + image;
    res.render('index', {imagef: image,  stat: "", err: "", title: tit});
    
  })

app.listen(8080, () => console.log('Server started'));
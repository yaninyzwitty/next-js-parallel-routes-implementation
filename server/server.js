require("dotenv").config();
const express = require("express");
const cloudinary = require("cloudinary").v2;
const cors = require("cors");
const Multer = require("multer");

const cassandraClient = require('./cassandra');
const app = express();

app.use(cors());
app.use(express.json())




cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = new Multer.memoryStorage();
const upload = Multer({
  storage,
});

async function handleUpload(file) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });




  
  return res;

}



app.get('/', function(req, res) {
    res.send('Hi')
})

app.post("/upload", upload.single("my_file"), async (req, res) => {
  try {

    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = await handleUpload(dataURI);

      const insertQuery = `INSERT INTO posts_by_user (post_id, media_url, playback_url, created_at, time_id) VALUES (uuid(), ?, ?, ?, now())`;

  const inserParams = [ cldRes.secure_url, cldRes.playback_url, cldRes.created_at];

  await cassandraClient.execute(insertQuery, inserParams, { prepare: true }).catch(err => console.log(err));


    console.log(cldRes);
    // try uploading to cassandra
    res.json(cldRes);
  } catch (error) {
    console.log(error);
    res.send({
      message: error.message,
    });
  }
});
const port = 3001;
cassandraClient.connect()
.then(() => {
    app.listen(port, () => {
        console.log(`Listening on port ${port} 😂`);
    })
})
.catch(err => {
    console.log(`Error connecting to db and starting the server😢`);
})
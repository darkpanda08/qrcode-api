const express = require('express')
const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')
const cloudinary = require('cloudinary').v2
const qr = require('qrcode')
const connectDB = require('./config/db')
require('dotenv').config()

const app = express()

// Connect to MongoDB
connectDB()

const Code = require('./models/codes')

// Cloudinary Configs
cloudinary.config({ 
  cloud_name: process.env.cloud_name, 
  api_key: process.env.api_key, 
  api_secret: process.env.api_secret 
});

// Bodyparser
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Routes
app.get('/', (req, res) => {
  return res.status(200).send('Thanks for visting the QR Code API. To use the API read the docs at: https://github.com/darkpanda08/qrcode-api')
})

// Get QR Code
app.get('/:uid', async (req, res) => {
  const { uid } = req.params
  try {
    const result = await Code.findOne({ uid: uid})
    if (result != null) {
      res.send({ link: result.link })
    } else {
      return res.status(404).send({ status: '404 Not Found', error: 'QR Code with this UID does not exist or has been deleted' })
    }
  } catch (err) {
    return res.status(500).send({ status: 'Something Went Wrong' })
  }
})

// Create QR Code
app.post('/', async (req, res) => {
  const uid = uuidv4()

  const code = new Code({
    uid,
    link :  `https://res.cloudinary.com/${process.env.cloud_name}/image/upload/${uid}.png`
  })
  
  try {
    var stream = cloudinary.uploader.upload_stream({ public_id: uid}, (err, result) => { 
      //console.log(result)
    });
    var file_reader = qr.toFileStream(stream, req.body.text, { scale: 10 })

    await code.save()
    return res.send({ status: "Successful", uid: uid, link: `https://res.cloudinary.com/${process.env.cloud_name}/image/upload/${uid}.png`})
  } catch (err) {
    return res.status(500).send({ status: 'Something Went Wrong' })
  }
})

// Delete QR Code
app.delete('/', async (req, res) => {
  const { uid } = req.query
  cloudinary.uploader.destroy(uid, (err, result) => {
    //console.log(result)
  });
  try {
    await Code.findOneAndRemove({uid: uid})
    return res.send({ status: "QR Code Deleted" })
  } catch (err) {
    return res.status(500).send({ status: 'Something Went Wrong' })
  }
})

const PORT = process.env.PORT || 5000

app.listen(PORT , console.log(`Server running on http://localhost:${PORT}/`))

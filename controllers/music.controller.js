const MusicDB = require("../models/music.model");
const multer = require("multer");
const fs = require("fs");


// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (file.fieldname === 'songImage') {
        cb(null, 'uploads/images'); // Use forward slashes for paths
      } else if (file.fieldname === 'audioFile') {
        cb(null, 'uploads/audio'); // Use forward slashes for paths
      }
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // File name
    }
  });
  
  const upload = multer({ storage: storage }).fields([
    { name: 'songImage', maxCount: 1 },
    { name: 'audioFile', maxCount: 1 }
  ]);

/**
 * @DESC Add Music Controller
 */
exports.addMusic = async (req, res) => {
    try {
      upload(req, res, async function(err) {
        if (err instanceof multer.MulterError) {
          return res.status(400).json({
            success: false,
            message: "Error uploading files"
          });
        } else if (err) {
          return res.status(500).json({
            success: false,
            message: "Internal Server Error"
          });
        }
  
        // Files uploaded successfully, now create a new document in MongoDB
        const { title, subtitle, artistName, isCheck, albumName } = req.body;
        const songImage = req.files['songImage'] ? req.files['songImage'][0].path : ''; // Get the image file path
        const audioFile = req.files['audioFile'] ? req.files['audioFile'][0].path : ''; // Get the audio file path
  
        const newMusic = new MusicDB({
          title,
          subtitle,
          artistName,
          isCheck,
          albumName,
          songImage,
          audioFile
        });
  
        await newMusic.save();
  
        return res.status(201).json({
          success: true,
          message: "Music added successfully",
        });
      });
    } catch (error) {
      console.error("Error adding music:", error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };

/**
 * @DESC Get Music Controller
 */
exports.getAllMusics = async (req, res) => {
    try {
      const music = await MusicDB.find();
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      const formattedMusic = music.map(music => ({
        ...music.toJSON(),
        songImage: music.songImage ? `${baseUrl}/${music.songImage.replace(/\\/g, '/')}` : null,
        audioFile: music.audioFile ? `${baseUrl}/${music.audioFile.replace(/\\/g, '/')}` : null
      }));
      res.status(200).json({
        success: true,
        music: formattedMusic
      });
    } catch (error) {
      console.error("Error getting music:", error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error"
      });
    }
  };
  
  

/**
 * @DESC Get Music Details Controller
 */
exports.getMusicDetails = async (req, res) => {
  try {

  } catch (error) {
    console.error("Error getting property details:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

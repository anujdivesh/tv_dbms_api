const uploadFile = require("../middleware/dataset");
const fs = require("fs");
const path = require('path');
const baseUrl = "https://localhost/ocean-api/api/dataset/";
const __basedir = path.resolve();

// Database simulation (in a real app, use a proper database)
const fileDatabase = new Map();

const upload = async (req, res) => {
  try {
    await uploadFile(req, res);

    if (!req.file) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    // Generate a unique ID for the file
    const fileId = Date.now().toString();
    const fileInfo = {
      id: fileId,
      originalName: req.file.originalname,
      filename: req.file.filename,
      size: req.file.size,
      mimetype: req.file.mimetype,
      uploadDate: new Date(),
      path: path.join(__basedir, "resources/static/assets/dataset/", req.file.filename)
    };

    // Store file metadata
    fileDatabase.set(fileId, fileInfo);

    res.status(201).send({
      id: fileId,
      message: "Uploaded the file successfully",
      originalName: req.file.originalname,
      downloadUrl: `${baseUrl}${fileId}`
    });
  } catch (err) {
    console.error(err);

    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(413).send({
        message: "File size cannot be larger than 2MB!",
      });
    }

    res.status(500).send({
      message: `Could not upload the file: ${err.message}`,
    });
  }
};

const getListFiles = (req, res) => {
  const directoryPath = path.join(__basedir, "resources/static/assets/dataset/");

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).send({
        message: "Unable to scan files!",
        error: err.message
      });
    }

    const fileInfos = Array.from(fileDatabase.values()).map(fileInfo => ({
      id: fileInfo.id,
      name: fileInfo.originalName,
      size: fileInfo.size,
      uploadDate: fileInfo.uploadDate,
      url: `${baseUrl}${fileInfo.id}`
    }));

    res.status(200).send(fileInfos);
  });
};

const download = (req, res) => {
  const fileId = req.params.id;
  const fileInfo = fileDatabase.get(fileId);

  if (!fileInfo) {
    return res.status(404).send({
      message: "File not found"
    });
  }

  res.download(fileInfo.path, fileInfo.originalName, (err) => {
    if (err) {
      console.error("Download error:", err);
      res.status(500).send({
        message: "Could not download the file",
        error: err.message
      });
    }
  });
};

const remove = async (req, res) => {
  const fileId = req.params.id;
  const fileInfo = fileDatabase.get(fileId);

  if (!fileInfo) {
    return res.status(404).send({
      message: "File not found"
    });
  }

  try {
    await fs.promises.unlink(fileInfo.path);
    fileDatabase.delete(fileId);
    
    res.status(200).send({
      message: "File deleted successfully",
      deletedFile: fileInfo.originalName
    });
  } catch (err) {
    console.error("Delete error:", err);
    
    if (err.code === 'ENOENT') {
      fileDatabase.delete(fileId);
      return res.status(404).send({
        message: "File not found on disk (was removed from database)"
      });
    }
    
    res.status(500).send({
      message: "Could not delete the file",
      error: err.message
    });
  }
};

module.exports = {
  upload,
  getListFiles,
  download,
  remove
};
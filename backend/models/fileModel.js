const mongoose = require('mongoose')

const fileSchema = mongoose.Schema(
  {
    uploader: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    fileName: {
      type: String,
      required: true,
    },
    downloadLink: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true,
  }
)
const File = mongoose.model( 'File', fileSchema);

module.exports =  {File}

//module.exports = mongoose.model('File', fileSchema)
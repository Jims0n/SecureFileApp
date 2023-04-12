import React from 'react'
import { Link } from 'react-router-dom'

const FileItem = ({file}) => {
  return (
    <div className='goals'>
        <div>
            {new Date(file.createdAt).toLocaleString("en-US")}
        </div>
        <h2>{file.fileName}</h2>
        
        <Link to={file.downloadLink}><h2 className='btn'>Download</h2></Link>
    </div>
  )
}

export default FileItem
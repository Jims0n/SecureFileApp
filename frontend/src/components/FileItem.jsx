import React from 'react'
import {useDispatch, useSelector } from "react-redux"
import {downloadFile} from "../features/file/fileSlice"



const FileItem = ({file}) => {
  const dispatch = useDispatch()

  const {fileUrl} = useSelector(state => state.files);
  const handleButtonClick = (event) => {
    
    const fileName = event.target.value;

    dispatch(downloadFile(fileName))

    const url = window.URL.createObjectURL(new Blob([fileUrl]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
  }
  
  return (
    <div className='goalss'>
         {/* <div> */}
            {new Date(file.createdAt).toLocaleString("en-US")}
        {/* </div> */}
        <h2>{file.fileName}</h2>
        {/* <div> */}
      <button className='btn' value= {file.fileName}  onClick={handleButtonClick}>Download</button>
     
    {/* </div>  */}
       
        
    </div>
  )
}

export default FileItem
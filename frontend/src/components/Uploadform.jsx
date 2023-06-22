import {React, useState, useEffect} from 'react';
import {useDispatch} from "react-redux"
import {createFile} from "../features/file/fileSlice"

import Spinner from "../components/Spinner"




const Uploadform = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isDisabled, setIsDisabled] = useState(true);
    const [isLoading, ] = useState(false);
    const [isError, ] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [buttonText, setButtonText] = useState('Select your file first');
   
    const dispatch = useDispatch()
// Handling file selection from input
const onFileSelected = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
      setIsDisabled(false); // Enabling upload button
      setButtonText("Let's upload this!");
    }
  };

// Setting image preview
useEffect(() => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);
    }
  }, [selectedFile]);


  const handleFileUpload =  async (e) => {
    e.preventDefault();
    
    setButtonText("Wait we're uploading your file...");

    if (selectedFile !== '') {
        // Creating a FormData object
        let fileData = new FormData();
       
     
        // Adding the 'image' field and the selected file as value to our FormData object
        // Changing file name to make it unique and avoid potential later overrides
        
        fileData.set(
          'fileName',
          selectedFile,
          `${Date.now()}-${selectedFile.name}`
        );
 
dispatch(createFile(fileData))
        
  }
  // Reset to default values after 3 seconds
  setTimeout(() => {
    setSelectedFile(null);
    setPreview(null);
    setIsSuccess(false);
    setFileName(null);
    setButtonText('Select your file first');
  }, 3000);
  }
  return (
    <div>
        <form onSubmit={(e) => handleFileUpload(e)} >
            <label className='uploader'>
              <div className='upload-space'>
                {isLoading ? (
                  <Spinner />
                ) : (
                  <>
                    {isError || isSuccess ? (
                      <i
                        className={`icon-${isSuccess ? 'success' : 'error'}`}
                      ></i>
                    ) : (
                      <>
                        {preview ? (
                          <div className='preview'>
                            <img
                              src={preview}
                              alt='Preview of the file to be uploaded'
                            />
                          </div>
                        ) : (
                          <i className='icon-upload'></i>
                        )}
                        <input type='file' onChange={onFileSelected}  />
                      </>
                    )}
                  </>
                )}
              </div>
                {isError || isSuccess ? (
                
                <p className={isSuccess ? 'success' : 'error'}>
                  {isSuccess ? 'Upload successful!' : 'Something went wrong ...'}
                </p>
              ) : (
                <p className='filename'>
                  {fileName ? fileName : 'No file selected yet'}
                </p>
                
              )}
            </label>
  
            <button
              type='submit'
              className='btn'
              disabled={isDisabled}
              tabIndex={0}
            >
              {buttonText}
            </button>
          </form>
    </div>
  )


}
export default Uploadform
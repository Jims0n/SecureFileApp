import axios from "axios"

const API_URL = "/api/file/"

// Create file
const createFile = async (fileData, token) => {
    const config = {
        headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data' },
    }

    const response = await axios.post(API_URL, fileData, config)
    return response.data
}

// Get user files
const getFiles = async ( token) => {
    const config = {
        headers: { 
            Authorization: `Bearer ${token}`,
            },
    }

    const response = await axios.get(API_URL, config)
    return response.data
}


// Download user file
const downloadFile = async (fileName, token) => {
    const config = {
        headers: { 
            Authorization: `Bearer ${token}`,
            },
            responseType: 'blob'
    }

  const response = await axios.get(API_URL + `download?fileName=${fileName}`, config)
  
    return response.data
    
}

const fileService = {
    createFile,
    getFiles,
    downloadFile
}

export default fileService
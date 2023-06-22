import {createAsyncThunk, createSlice, } from "@reduxjs/toolkit"
import fileService  from "./fileService"

const initialState = {
    files: [],
    fileUrl: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    isDisabled: true,
    message: ''
}
// create file
export const createFile = createAsyncThunk('files/create', async (fileData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await fileService.createFile(fileData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
        error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Get user Files
export const getFiles = createAsyncThunk('files/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await fileService.getFiles( token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
        error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


// Download user File
export const downloadFile = createAsyncThunk('files/download', async (fileName, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await fileService.downloadFile(fileName, token)
        
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
        error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const fileSlice = createSlice({
    name: "file",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(createFile.pending, (state) => {
            state.isLoading =true
            state.isDisabled = true
        })
        .addCase(createFile.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.files.push(action.payload)
        })
        .addCase(createFile.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
         .addCase(getFiles.pending, (state) => {
            state.isLoading =true
            
        })
        .addCase(getFiles.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.files = action.payload
        })
        .addCase(getFiles.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(downloadFile.pending, (state) => {
            state.isLoading =true
            
        })
        .addCase(downloadFile.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.fileUrl = action.payload
        })
        .addCase(downloadFile.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
           
        })
    }
})


export const {reset} = fileSlice.actions
export default fileSlice.reducer
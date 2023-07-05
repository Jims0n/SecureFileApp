import {React, useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import Uploadform from '../components/Uploadform';
import { getFiles } from '../features/file/fileSlice';
import FileItem from '../components/FileItem';
import { useReactTable, getCoreRowModel, } from '@tanstack/react-table';

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'


const heading = ['ID', 'File Name', 'Created At', 'Download']

const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)
  const {files,  isError, message} = useSelector((state) => state.files)
  

  useEffect(() => {
    if(isError) {
      console.log(message);
    }

    if (!user) {
      navigate('/login')
    }

    
    dispatch(getFiles())
  }, [user, navigate, isError, message, dispatch])

  // const table = useReactTable({
    // data: files,
    // columns,
    // initialState: { pageIndex: 0 },
    // getCoreRowModel: getCoreRowModel(),
  // });

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name }</h1>

      </section>
     <Uploadform />
    
     <TableContainer>
      <Table variant='striped' colorScheme='teal'>
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th >multiply by</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>inches</Td>
            <Td>millimetres (mm)</Td>
            <Td >25.4</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>

    <section className='content'>
    <table style={{ width: 500 }}>
                <thead>
                    <tr>
                        {heading.map((head, headID) =>
                            <th key={headID} >{head}</th>)
                        }
                    </tr>
                </thead>
                {/* <tbody>
                  <tr> 
                  {files.map((file, rowID) =>
                        // <TableRow rowContent={rowContent} key={rowID} />)}
                        <FileItem key={file._id} file={file}/>
                    )}
                  </tr> 
                    
                </tbody> */}
                <tbody>
                {/* <tr> */}
                {files.map((file, rowID) =>
                    <tr>
                        <td>{file._id}</td>
                        <td>{file.fileName}</td>
                        <td>{new Date(file.createdAt).toLocaleString("en-US")}</td>
                        <td><button className='btn' value= {file.fileName} >Download</button></td>
                    </tr>
                    )}
                  
                {/* </tr> */}
                </tbody>
            </table>
            
      {/* {files.length > 0 ? (
        <div className='goals'>
        <table>
        {files.map((file) => (
          <tr>
          <td>
          <FileItem key={file._id} file={file}/>
          </td>
          </tr>
           
          ))}
          
        </table>
          
        </div>
      ) : (<h3>You don't have any files</h3>)} */}
    </section>
     
    </>
  )
}

export default Dashboard
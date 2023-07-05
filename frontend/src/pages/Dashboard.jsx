import {React, useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import Uploadform from '../components/Uploadform';
import { downloadFile, getFiles } from '../features/file/fileSlice';

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
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
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name }</h1>

      </section>
     <Uploadform />
     <section className='table-content'>
    
     <TableContainer>
      <Table variant='striped' colorScheme='teal'>
        <Thead>
          <Tr>
            {heading.map((head, headID) =>
             <Th key={headID} >{head}</Th>
            )}
          </Tr>
        </Thead>
        <Tbody>
          {files.map((file, rowID) =>
            <Tr key={rowID}>
                <Td>{file._id}</Td>
                <Td>{file.fileName}</Td>
                <Td>{new Date(file.createdAt).toLocaleString("en-US")}</Td>
                <Td><button onClick={handleButtonClick} className='btn' value= {file.fileName} >Download</button></Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </TableContainer>

   
            
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
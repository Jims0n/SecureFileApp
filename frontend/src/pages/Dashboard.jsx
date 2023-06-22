import {React, useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import Uploadform from '../components/Uploadform';
import { getFiles } from '../features/file/fileSlice';
import FileItem from '../components/FileItem';





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
  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name }</h1>

      </section>
     <Uploadform />
    
    <section className='content'>
      {files.length > 0 ? (
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
      ) : (<h3>You don't have any files</h3>)}
    </section>
     
    </>
  )
}

export default Dashboard
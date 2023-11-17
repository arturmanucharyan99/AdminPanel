import React, { useEffect } from 'react'
import { changeError } from '../../store/slices/editUser/editUserSlice'
import { useDispatch } from 'react-redux'
import "./Error.css";


function Error() {
  const dispatch = useDispatch();
  // const 
  useEffect(() => {
    dispatch(changeError());
  }, [])
  return (
    <div className='error'>
      <div className='centered'>
        <h1>Oops!</h1>
      </div>
      <div className='centered'>
        <h3>404 - PAGE NOT FOUND</h3>
      </div>
      <div className='centered'>
        <p>The page you are looking for might have been removed had its name changed or is temporarity unvaible</p>
      </div>
    </div>
  )
}

export default Error
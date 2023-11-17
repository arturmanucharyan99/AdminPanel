import React, { memo, useEffect, useRef, useState } from 'react'
import "./AddUser.css";
import { useDispatch, useSelector } from 'react-redux';
import { userPost } from '../../store/slices/userInfoValidation/userPost';
import { useNavigate, useParams } from 'react-router-dom';
import { changeLoading, clearInput, editUserSelector } from '../../store/slices/editUser/editUserSlice';
import { editUserGet } from '../../store/slices/editUser/editUserGet';
import { editUserUpdate } from '../../store/slices/userInfoValidation/editUserUpdate';
// import { MoonLoader } from 'react-spinners';
import { userPostError, userValidationSelect } from '../../store/slices/userInfoValidation/userInfoValidation';
import Error from "../Error/Error";



function AddUser({ }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const editUser = useSelector(editUserSelector);
  const { errorValidation } = useSelector(userValidationSelect);
  // const errorUpdate = useSelector()
  const { id } = useParams();
  const formRef = useRef(null);


  useEffect(()=>{
    if(editUser?.error){
      navigate('/NotFound')
    }
  },[editUser?.error])
  // console.log(editUser?.error);

  useEffect(() => {
    // dispatch(changeLoading(false));

    if (id) {
      dispatch(editUserGet(id));
    }
    return async () => {
      
      await dispatch(userPostError())
      dispatch(clearInput());
      formRef.current?.reset();
      // console.log('valod');
    }
  }, [id]);

  

  async function handleSubmit(e) {
    e.preventDefault();


    const info = {
      firstName: e.target[0].value.trim(),
      lastName: e.target[1].value.trim(),
      userName: e.target[2].value.trim(),
      email: e.target[3].value.trim(),
      password: e.target[4].value.trim(),
    };

    try {
      const resultAction = await dispatch(userPost(info));

      if (userPost.fulfilled.match(resultAction)) {
        await dispatch(clearInput());
        navigate('/');
      }

    }
    catch (err) {
      console.log(err);
    }

  }


  async function handleEdit(e) {
    e.preventDefault();

    // const [name,value] = e.target;
    const info = {
      id: id,
      firstName: e.target[0].value.trim(),
      lastName: e.target[1].value.trim(),
      userName: e.target[2].value.trim(),
      email: e.target[3].value.trim(),
      password: e.target[4].value.trim(),
    };

    try {
      const resultAction = await dispatch(editUserUpdate(info));
      if (editUserUpdate.fulfilled.match(resultAction)) {
        await dispatch(clearInput());
        navigate('/');
      }
      // await dispatch(clearInput());

    } catch (error) {
      console.log(error);
    }
  }

  return (

    <div className='add-user-container common'>
      {/* {editUser?.loading ? <h2>Loading...</h2> : */}
        <form ref={formRef} className='form-add' onSubmit={id ? handleEdit : handleSubmit} >
          <h1>{id ? "Edit User" : "Add User"}</h1>
          <div className='input-div commonInput'>
            <input type="text" style={{
              border: errorValidation?.path === "firstName" && '2px solid red'
            }} defaultValue={editUser.data?.firstName} name="firstName" placeholder='First Name' required />
          </div>
          <div className='input-div commonInput'>
            <input type="text" style={{
              border: errorValidation?.path === "lastName" && '2px solid red'
            }} defaultValue={editUser.data?.lastName} name="lastName" placeholder='Last Name' required />
          </div>
          <div className='username-div commonInput'>
            <input type="text" style={{
              border: errorValidation?.path === "userName" && '2px solid red'
            }} defaultValue={editUser.data?.userName} name="userName" placeholder='Username' required />
          </div>
          <div className='email-div commonInput'>
            <input type="email" style={{
              border: errorValidation?.path === "email" && '2px solid red'
            }} defaultValue={editUser.data?.email} name="email" placeholder='Email' required />
          </div>
          <div className='password-div commonInput'>
            <input type={showPassword ? 'text' : 'password'} style={{
              border: errorValidation?.path === "password" && '2px solid red'
            }} defaultValue={editUser.data?.password} name="password" placeholder='Password' required />
          </div>
          <div className='checkboxDiv'>
            <input type='checkbox' onClick={(e) => setShowPassword(!showPassword)} />
            <label>Show password</label>
          </div>
          <div className='add-button'>
            <button type='submit'>{id ? "Edit" : "Add-User"}</button>
          </div>
          {errorValidation?.msg && <div className='errorMessage'>{errorValidation?.msg}</div>}
        </form>
      {/* } */}

    </div>
  )
}

export default memo(AddUser)
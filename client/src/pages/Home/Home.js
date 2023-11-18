import React, { useEffect, useState } from 'react'
import "./Home.css";
import { useDispatch, useSelector } from 'react-redux';
import { usersGet } from '../../store/slices/users/usersGet';
import { selectUsers } from '../../store/slices/users/usersSlice';
import UsersMap from './UsersMap/UsersMap';
import { userDelete } from '../../store/slices/users/userDelete';
import { MoonLoader } from 'react-spinners';
import Error from "../Error/Error";

function Home() {
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector(selectUsers);
    const [searchQuery, setSearchQuery] = useState('');


    useEffect(() => {
        dispatch(usersGet());

    }, []);


    function handleDelete(userId) {
        dispatch(userDelete(userId));
    }
    const filteredUsers = users.filter(
        (user) =>
            user.firstName.toLowerCase().trim().includes(searchQuery.toLowerCase().trim()) ||
            user.lastName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    
    if(users.length === 0){
        return <h1 className='users-empty'>We don't have users</h1>
    }

    if(error){
        return <Error/>
    }
    return (
        <>
            <div className='search-div'>
                <form className='search-form'>
                    <div className='search'>
                        <input
                            type='text'
                            name="search"
                            placeholder='Search'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)} />
                    </div>
                </form>
            </div>
            <div className='div-container common'>
                {
                    filteredUsers.length === 0 && <h1 className='search-emty'>We don't have a user with that name</h1> 
                }
                {
                    loading ? <MoonLoader color='#fff' size={100}/> : 
                        <div>
                            {
                                filteredUsers.map(el => {
                                    return <UsersMap key={el._id} handleDelete={handleDelete} {...el} />
                                })
                            }

                        </div>
                }
            </div>
        </>
    )
}

export default Home
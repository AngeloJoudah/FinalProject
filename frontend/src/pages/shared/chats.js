import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Template } from './template';
import { PersonCard } from './../../components/Messages/PersonCard';
import { SpinnerLoader } from '../../components/misc/Spinner';
import { Routes, useRoutes } from 'react-router';
import { Text } from './Text';

export const Chats = () => {
  const [chats, setChats] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [routes, setRoutes] = useState([]);
  const [searchResults,setSearchResults] = useState([]);
  const [showDropdown,setShowDropdown] = useState(false)
  const [noneFound,setNoneFound] = useState(true);
  const myId = localStorage.getItem('_id')
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://ofcourse.website/api/v2/chats/user/${localStorage.getItem('_id')}`);
        const chatData = response.data.chats;
        const otherUsers = chatData.map(chat => chat.user1._id === myId ? chat.user2 : chat.user1);
        setChats(otherUsers);
        const routeData = chatData.length > 0 ? chatData.map((chat) => ({
          path: `/chats/messages/${chat.id}`,
          element: <Text />,
        })) : [];
        setRoutes(routeData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const routeConfiguration = useRoutes(routes);
  const handleSearchChange = async (event) => {
    if(event.target.value.length > 0 ){
      await event.preventDefault()
      await axios.get(`https://ofcourse.website/api/v2/users/search/${event.target.value}`,{headers:{"Content-Type":"application/json"}}).then(e =>{
        setSearchResults(e.data)
        console.log(e.data)
        setShowDropdown(true)
      }).catch(err =>{
        if(err.response.status === 404){
          setNoneFound(true)
        }
      })
    }
  };
  return (
    <Template>
      <div className='container' onClick={()=>{setShowDropdown(false)}}>
        {routes.length > 0 ? <Routes>{routeConfiguration}</Routes> : null}
        <div className='search-dropdown'>
          <input
            type="text"
            placeholder="Search..."
            onChange={handleSearchChange}
          />
          
        {showDropdown && searchResults.length > 0 && (
          <div className="dropdown-content mb-5">
              {searchResults.map((result) => (
                <PersonCard otherId={result._id} name={result.username} image={result.profilePicture}/>
              ))}
          </div>
        )}
        </div>
 
        {isLoading ? <SpinnerLoader /> : null}
        {chats.length > 0 && !isLoading
          ? chats.map(person => (
              <PersonCard chatId={person._id} name={person.username} image={person.profilePicture} />
            ))
          : !isLoading ? <h1 style={{ textAlign: "center" }}>There are no chats here!</h1> : null}
          </div>
    </Template>
  );
};


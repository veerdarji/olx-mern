import { useEffect, useState } from 'react';
import axios from 'axios';
import { FiSearch } from "react-icons/fi";
import './App.css';
import Navbar from './Navbar';
import Items from './Items';
import Login from './Login';
import Register from './Register';
import UserPage from './UserPage';
import ItemPage from './ItemPage';
import Footer from './Footer';
import {Toaster,toast} from 'sonner'
function App() {
  const [logOrRegister, setLogOrRegister] = useState(true);
  const [isSignClick, setSignClick] = useState(false);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState('');
  const [items, setItems] = useState();
  const [filteredItems,setFilteredItems] = useState()
  const [seed, setSeed] = useState(1);

  const [viewItem, setViewItem] = useState('');

  const [search,setSearch] = useState('')

  function handleHome() {
    window.location.reload();
  }
  function handleSignInClick() {
    setSignClick((value) => !value);
  }
  function handleUserData(data) {
    setUserInfo(data);
    setAuthenticated((value) => !value);
  }
  function refreshUserData(data) {
    setUserInfo(data);
  }
  function login() {
    setSignClick(false);
  }
  function loginError() {
    toast("User not found,please register or try again",{type:'error'})
    // window.alert('user not found,please register or try again');
  }
  function register() {
    toast('Registered, You Can Login Now',{type:'success',style:{backgroundColor:'#002e35',color:'white',height:'50px',fontSize:'10px',fontWeight:'bold',borderRadius:'10px',padding:'10px'}})
    // window.alert('Registered, You Can Login Now');
  }
  function goToLogin() {
    setLogOrRegister(true);
  }
  function goToRegister() {
    setLogOrRegister(false);
  }
  function handleSignOut() {
    setAuthenticated((value) => !value);
    setUserInfo('');
    setViewItem('');
  }
  function handleView(item) {
    setViewItem(item);
  }
  function handleBack() {
    setViewItem('');
  }

     const getItems = async () => {
      try{
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/items/get/data`)
        setItems(res.data)
      }catch(err){
        console.log(err);
      }
    }


  useEffect(() => {
    getItems();
  }, [seed]);


  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      // Only perform the search if at least three characters are entered
      if (search.length >= 3) {
        const filteredResults = items.filter((item) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredItems(filteredResults);
      } else {
        setFilteredItems(items);
      }
    }, 1000);
    // Cleanup the timer when the input changes
    return () => clearTimeout(debounceTimer);
  }, [search, items]);
  return (
    <div className=" text-slate-700 font-allerta">
    <Toaster />
      {isAuthenticated ? (
        <UserPage
        items={items}
          newUserData={refreshUserData}
          userId={userInfo._id}
          userName={userInfo.username}
          boughtItems={userInfo.boughtItems}
          listedItems={userInfo.listedItems}
          wishlist={userInfo.wishlist}
          cartItems={userInfo.cartItems}
          handleSignOut={handleSignOut}
          handleRender={setSeed}
        />
      ) : (
        <div className="homePageDiv">
          {isSignClick &&
            (logOrRegister ? (
              <Login
                onLogin={login}
                onError={loginError}
                userData={handleUserData}
                onGoToRegister={goToRegister}
                onCut={handleSignInClick}
              />
            ) : (
              <Register
                onRegister={register}
                onGoToLogin={goToLogin}
                onCut={handleSignInClick}
              />
            ))}
          <Navbar
            Nav3={'Home'}
            onNav3={handleHome}
            Nav4={'Login/Signup'}
            onNav4={handleSignInClick}
            // Nav3={}
            // onNav3={handleSignClick}
          />
          {viewItem ? (
            <ItemPage
              itemName={viewItem.name}
              itemPrice={viewItem.price}
              itemImg={viewItem.imageUrl}
              itemDescription={viewItem.description}
              onBuy={handleSignInClick}
              onCart={handleSignInClick}
              onBack={handleBack}
            />
          ) : (
            <>
              <div className="welcome grid grid-cols-1 sm:grid-cols-2 bg-gradient-to-r from-cyan-400 to-gray-500 py-4 lg:p-10">
                <center className="py-10 sm:py-20">
                  <p className="text-3xl lg:text-5xl my-4 font-fredoka text-white">
                    Welcome to
                  </p>
                  <p className="text-6xl lg::text-7xl font-bold font-fredoka text-white">
                    Olx Clone
                  </p>
                </center>
                <div className="px-4 flex justify-center lg:p-0">
                  <img
                    className={`rounded-3xl h-[20rem] lg:h-[30rem] ${
                      !isSignClick ? 'animate-slow-bounce' : ''
                    } transition-transform`}
                    src="/woman2.webp"
                    alt=""
                  />
                </div>

              </div>
              <div className="flex justify-center gap-2 bg-gradient-to-r from-cyan-400 to-gray-500 w-full py-8 lg:py-4 font-fredoka text-lg text-white">
            <FiSearch fontSize={24} className='mt-5'/> 
             <input 
              className='p-3 rounded-full m-2 w-2/3 text-slate-400 outline-none' 
              placeholder='Search for something...'
              onChange={(e)=>setSearch(e.target.value)}
              value={search}
              />
              
                {/* Let's Browse{' '}
                <b className="bg-purple-400 px-2 py-1 rounded-3xl">☀️</b> */}
              </div>
              <Items
              items={filteredItems}
                onViewClick={handleView}
                onWishlist={handleSignInClick}
                isSignClicked={isSignClick}
              />
            </>
          )}
        </div>
      )}
      <Footer />
    </div>
  );
}

export default App;

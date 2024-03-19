import { useEffect, useState } from 'react';
import './App.css';
import { GoHeart,GoHeartFill } from "react-icons/go";

function ItemCard({
  isSignClicked,
  showViewBtn,
  showWishlistBtn,
  onWishlist,
  item,
  wishlist,
  onViewClick
}) {
  const [imgLoad, setLoad] = useState(false);
  let simpleHeart = <GoHeart fontSize={18} className='pt-2/3'/>
  let filledHeart = <GoHeartFill fontSize={20} className='pt-2/3 text-red-400'/>
  const [heart, setHeart] = useState(simpleHeart);

  function handleError() {
    setLoad(true);
  }

function handleHeart() {
  setHeart((prevHeart) => (prevHeart === simpleHeart ? filledHeart : simpleHeart));
}
const isWishlisted = wishlist?.some((wish) => wish._id === item._id)
useEffect(()=>{
  if (isWishlisted){
setHeart(filledHeart)
  } else{
    setHeart(simpleHeart)
  }

},[])
  return (
    <div className="shadow-[0_10px_30px_rgba(80, 200,120, 0.9)] bg-[#ffffff] sm:w-[16rem] mx-2 sm:mx-4 my-8 text-center rounded-lg px-1 sm:hover:-translate-y-2 hover:transition-transform">
      <button
        className=" bg-gradient-to-r from-pink-500  absolute cursor-default text-[rgb(253,253,253)] text-xs sm:text-sm px-2 py-1 sm:ml-6 mt-2 rounded-2xl shadow-lg border-none"
        style={!isSignClicked ? {} : { display: 'none' }}
        type="button"
      >
        {item?.isSold ? (
          <p>
            sold <b>✓</b>{' '}
          </p>
        ) : (
          <p>
            assured <b>✓</b>{' '}
          </p>
        )}
      </button>
      {!imgLoad ? (
        <img
          className="h-[9rem] sm:h-[12rem] object-cover w-full shadow-[0_8px_40px_rgb(0,0,0,0.12)] rounded-t-lg rounded-b-lg"
          onError={handleError}
          src={item?.imageUrl}
          alt="item-img"
        />
      ) : (
        <img
          className="h-[9rem] sm:h-[12rem] w-full shadow-[0_8px_40px_rgb(0,0,0,0.12)] rounded-lg"
          src={item?.imageUrl ? '/noLoad.png' : '/noImg.png'}
          alt="item-img"
        />
      )}
      <p className="text-md sm:text-lg my-2 font-sans font-semibold">
        ₹ {item?.price}
      </p>
      <p className="text-md sm:text-xl sm:mb-2"> {item?.name}</p>

      <div className="grid grid-cols-2 gap-4 p-2">
        {showWishlistBtn && (
          <button
            type="button"
            onClick={() => onWishlist() && handleHeart()}
            className="bg-[#fff5fe] flex justify-center gap-1 shadow-md hover:bg-[#ffffff] text-slate-600 active:translate-y-1 text-xs sm:text-base py-3 rounded-2xl border-none"
          >
       <p>{heart}</p>    <p>Wish</p>  
          </button>
        )}
        {showViewBtn && (
          <button
            type="button"
            // onClick={onBuyClick}
            onClick={onViewClick}
            className="bg-pink-400 shadow-xl hover:bg-red-400 active:translate-y-1 text-white text-xs sm:text-base py-3 rounded-2xl border-none"
          >
            View
          </button>
        )}
      </div>
    </div>
  );
}

export default ItemCard;

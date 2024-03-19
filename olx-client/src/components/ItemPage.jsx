import { useState } from 'react';

function ItemPage({onBack,onBuy,onCart,itemDescription,itemName,itemPrice,itemImg}) {
  const [imgLoad, setLoad] = useState(false);

  return (
    <div className="p-4 md:p-12 bg-pink-50">
      <button
        onClick={onBack}
        className=" px-4 py-2 bg-[#fff5fe] shadow-md hover:bg-[#ffffff] active:translate-y-1 rounded-2xl border-none"
      >
        Go Back
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="imgColumn flex justify-center p-4 md:px-8 md:py-12">
          {!imgLoad ? (
            <img
              className="h-[15rem] w-[20rem] md:w-[35rem] md:h-[32rem] rounded-md shadow-lg"
              onError={()=>setLoad(true)}
              src={itemImg}
              alt="item-img"
            />
          ) : (
            <img
              className="h-[15rem] w-[20rem] md:w-[35rem] md:h-[32rem] rounded-md shadow-lg"
              src={itemImg ? '/noLoad.png' : '/noImg.png'}
              alt="item-img"
            />
          )}
        </div>
        <div className="detailsColumn px-4 py-1 md:py-12">
          <div className="info md:text-start">
            <p className="text-3xl md:text-3xl py-2">{itemName}</p>
            <p className="text-xl font-fira">₹ {itemPrice}</p>
          </div>

          <div className="itemDescription mt-4 md:mt-8 py-12 px-4 rounded-xl text-slate-600 bg-pink-100">
            <p className="italic">
              {itemDescription
                ? itemDescription
                : 'Item description not provided'}
            </p>
          </div>

          <div className="buttons mb-12 flex justify-between md:justify-start py-4 md:py-12">
            <button
              type="button"
              onClick={onCart}
              className="bg-[#fff5fe] shadow-md hover:bg-[#ffffff] text-slate-600 active:translate-y-1 text-base p-3 mr-2 rounded-2xl border-none"
            >
              Add to Cart
            </button>
            <button
              type="button"
              onClick={onBuy}
              className="bg-pink-400 shadow-xl hover:bg-red-400 active:translate-y-1 text-white text-base p-3 rounded-2xl border-none"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemPage;

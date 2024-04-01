import ItemCard from './ItemCard';

function MyAccount({wishlist,onWishlist,onViewClick,cartItems,listedItems,addNewItem,boughtItems}) {
  return (
    <div className="myAccountDiv px-2 sm:px-[15%] lg:px-[12%] pt-[5%]">
      <div className="wishlistDiv ">
        <p className="myAccountText text-2xl inline-block text-pink-400">Wishlist</p>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {wishlist?.length ? (
            wishlist.map((item, index) => (
              <ItemCard
                key={index}
                item={item}
                wishlist={wishlist}
                showWishlistBtn={true}
                showViewBtn={true}
                onWishlist={() => onWishlist(item)}
                onViewClick={() => onViewClick(item)}
              />
            ))
          ) : (
            <p
              className="noDataText 
          m-[5%_2%]"
            >
              No wishlisted items!
            </p>
          )}
        </div>
      </div>
      <div className="CartDiv ">
        <p className="myAccountText text-2xl inline-block text-pink-400">Cart</p>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {cartItems?.length ? (
            cartItems.map((item, index) => (
              <ItemCard
                key={index}
               item={item}
                showWishlistBtn={true}
                showViewBtn={true}
                onViewClick={() => onViewClick(item)}
              />
            ))
          ) : (
            <p
              className="noDataText 
          m-[5%_2%]"
            >
              No items in Cart!
            </p>
          )}
        </div>
      </div>
      <div
        className="listedItemsDiv 
      min-h-80"
      >
        <p className="myAccountText text-2xl inline-block text-pink-400">Listed for Sale</p>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {listedItems?.length ? (
            listedItems.map((item, index) => (
              <ItemCard
                key={index}
             item={item}
              />
            ))
          ) : (
            <p
              className="noDataText 
          m-[5%_2%]"
            >
              No Listed items!
            </p>
          )}
        </div>

        <div className="addNewItemDiv text-center">
          <button
            className="listNewItemBtn 
            bg-pink-400 hover:bg-red-400 text-white text-lg mb-8 p-[2%] lg:p-[1%] rounded-lg shadow-md"
            onClick={addNewItem}
          >
            List New Item
          </button>
        </div>
      </div>
      <div
        className="boughtItemsDiv 
      min-h-80"
      >
        <p className="myAccountText text-2xl inline-block text-pink-400">Bought</p>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-8">
          {console.log(boughtItems)}
          {
          boughtItems?.length ? (
            boughtItems.map((item, index) => (
              <ItemCard
                key={index}
                item={item}
                notShowBuyBtn={true}
                notShowCartBtn={true}
              />
            ))
          ) : (
            <p className="noDataText m-[5%_2%]">
              such empty, No items bought... yet!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyAccount;

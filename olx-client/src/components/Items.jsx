import SkeletonCard from './SkeletonCard';
import ItemCard from './ItemCard';

function Items({items,isSignClicked,onViewClick,onWishlist,wishlist}) {
  return (
    <>
      {items ? (
        <div className="bg-pink-100 px-2 md:px-28 lg:px-36 gap-8 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-8">
          {items.map((item, index) => (
            <ItemCard
              key={index}
              item={item}
              wishlist={wishlist}
              showViewBtn={!item.isSold}
              showWishlistBtn={true}
              isSignClicked={isSignClicked}
              onWishlist={() => onWishlist(item)}
              onViewClick={() => onViewClick(item)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-pink-100 px-2 md:px-28 lg:px-40 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-8">
          <SkeletonCard />
          <SkeletonCard /> <SkeletonCard /> <SkeletonCard /> <SkeletonCard />
          <SkeletonCard /> <SkeletonCard /> <SkeletonCard /> <SkeletonCard />
          <SkeletonCard /> <SkeletonCard /> <SkeletonCard /> <SkeletonCard />
        </div>
      )}
    </>
  );
}

export default Items;
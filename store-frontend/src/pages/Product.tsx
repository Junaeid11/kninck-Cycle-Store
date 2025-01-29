
import { ICycle, ProductCard } from "../components/pages/ProductCard";
import Skeleton from "../components/singleComponent/Skeleton/Skeleton";
import { useGetProductQuery } from "../redux/services/API/productMangementApi";

const Product = () => {
  const { isLoading, data } = useGetProductQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });


  const products: ICycle[] = data?.data?.result || [];

  console.log(products)


  return (
    <div className="text-black place-self-center">
      {isLoading ? (
        <Skeleton />
      ) : (
        <div  className="container mx-auto place-content-center">
          <h2  className="text-center text-5xl font-extrabold my-10">Products</h2>
          <div  className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {products.map((product, i) => (
              <ProductCard key={i} product={product} />
            ))}
          </div>
          <div className="mt-5 text-center">
         
          </div>
        </div>
      )}
      
    </div>
  );
};

export default Product;

import { useState } from "react";
import Header from "../../components/pages/Header";
import { ICycle, ProductCard } from "../../components/pages/ProductCard";
import Skeleton from "../../components/singleComponent/Skeleton/Skeleton";
import { useGetProductQuery } from "../../redux/services/API/productMangementApi";

const AllProducts = () => {
  const [filters, setFilters] = useState({
    type: "",
    brand: "",
  });
  const { isLoading, data } = useGetProductQuery([]);
  const products: ICycle[] = data?.data?.result || [];
  const filter = products.filter((product) => {
    return (
      (filters.type ? product.type === filters.type : true) &&
      (filters.brand ? product.brand === filters.brand : true)
    );
  });

  return (
    <div className="text-black place-self-center min-w-full">
      <Header />
      {isLoading ? (
        <Skeleton />
      ) : (
        <div className="container mx-auto ">
          <div className="text-right ">
            <h1 className="text-2xl mx-auto p-2 ">Categories</h1>
            <div>
              <select
                value={filters.type}
                onChange={(item) => setFilters({ ...filters, type: item.target.value })}
                className="p-2 m-2"
              >
                <option value="">All Types</option>
                <option value="Bmx">BMX</option>
                <option value="Road">Road</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Electric">Electric</option>
              </select>
              <select
                value={filters.brand}
                onChange={(item) => setFilters({ ...filters, brand: item.target.value })}
                className="p-2 m-2"
              >
                <option value="">All Brands</option>
                <option value="SpeedX">SpeedX</option>
                <option value="Trek">Trek</option>
                <option value="Specialized">Specialized</option>
                <option value="Scott">Scott</option>
                <option value="Cervélo">Cervélo</option>
              </select>
            </div>
          </div>

          <h2 className="text-center text-5xl font-extrabold  my-10">Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filter.map((product, i) => (
              <ProductCard key={i} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProducts;

import { Button } from "@/components/ui/button";
import NMContainer from "@/components/ui/core/NMContainer";
import ProductCard from "@/components/ui/core/ProductCard";
import { getAllMeal } from "@/services/meal";
import { IProduct } from "@/types/product";
import Link from "next/link";

const FeatureProducts = async () => {
  const { data: meals } = await getAllMeal();

  return (
   <NMContainer>
     <div className="  bg-white  pb-8">

<div className="relative text-center mb-16">
  {/* Background Large Word */}
  <h2 className="text-[9rem]  font-extrabold text-gray-200 uppercase absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none z-0">
    PRODUCTS
  </h2>

  {/* Foreground Heading */}
  <div className="relative z-10 ">
    <h3 className="text-4xl font-bold text-gray-800">Lets Go Shopping</h3>
    <div className="w-10 h-1 bg-orange-500 mx-auto mt-2" />
  </div>
</div>

<div className="grid mx-5 grid-cols-1 gap-6 lg:grid-cols-4 ">
  {meals?.slice(0, 4).map((product: IProduct, idx: number) => (
    <ProductCard key={idx} meal={product} />
  ))}
</div>
<div className="text-center mt-5">
  <Link href="/find-meals">
    <Button
      variant="outline"
      className="px-6 py-3 text-lg font-semibold rounded-full border-1 border-black text-black  hover:text-black transition duration-300 shadow-md"
    >
     View All 
    </Button>
  </Link>
</div>


</div>

   </NMContainer>
  );
};

export default FeatureProducts;

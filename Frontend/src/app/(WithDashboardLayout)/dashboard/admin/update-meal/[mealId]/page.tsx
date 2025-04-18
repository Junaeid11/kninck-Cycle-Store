
import UpdateProductForm from "@/components/ui/core/UpdateMealForm";
import { getSingleMeal } from "@/services/meal";

const UpdateMeal = async ({params}:{params: any}) => {
  const { mealId } = await params;

  const { data: product } = await getSingleMeal(mealId);


  return (
    
      <div className="">
        <UpdateProductForm product={product} />
     
 
      </div>
  );
};

export default UpdateMeal;

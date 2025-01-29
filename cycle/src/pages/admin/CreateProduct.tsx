/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, SubmitHandler } from "react-hook-form"
import { toast } from "sonner"
import PHForm from "../../components/form/PHForm"
import { Button, Col, Divider, Flex, Row } from "antd"
import PHSelect from "../../components/form/PHSelect"
import { useAddProductMutation } from "../../redux/services/API/productMangementApi"
import PHInput from "../../components/form/PHInput"
import Header from "../../components/pages/Header"


const biCycleOption = [
  { value: "Trek Marlin", label: "Trek Marlin" },
  { value: "Specialized Rockhopper", label: "Specialized Rockhopper" },
  { value: "Giant Talon", label: "Giant Talon" },
  { value: "Cannondale Trail", label: "Cannondale Trail" },
  { value: "Santa Cruz Chameleon", label: "Santa Cruz Chameleon" },
  { value: "Cannondale Synapse", label: "Cannondale Synapse" },
  { value: "Specialized Allez", label: "Specialized Allez" },
 
];
const biCycleBrands = [
  { value: "Trek", label: "Trek" },
  { value: "Specialized", label: "Specialized" },
  { value: "Giant", label: "Giant" },
  { value: "Cannondale", label: "Cannondale" },
  { value: "Santa Cruz", label: "Santa Cruz" },
  { value: "Scott", label: "Scott" },
  { value: "Bianchi", label: "Bianchi" },
  { value: "Cervélo", label: "Cervélo" },

];
const biCycleTypes = [
  { value: "Mountain", label: "Mountain" },
  { value: "Road", label: "Road" },
  { value: "Hybrid", label: "Hybrid" },
  { value: "Bmx", label: "BMX" },
  { value: "Electric", label: "Electric" },
];





const CreateProduct = () => {

const [addProduct] = useAddProductMutation()



  const onSubmit: SubmitHandler<FieldValues> =async (data) => {
   const toastId =   toast.loading("Creating Academic Semester")





    const ProductData = {
        name: data.name,
        price:Number(data.price),
        brand:data.brand,
        type: data.type,
        quantity:Number(data.quantity),
        image: data.image,
        description: data.description


    }

    try{
      const res= await addProduct(ProductData) 
      console.log(res)
       if(res.error){
        toast.error( `Invalid ` ,{id:toastId})
        console.log(toast.error)
       }
       else{
        toast.success("Product Created Successfully",{id:toastId})
       }

        
    }catch(err: any){
      toast.error(err.data.message ,{id:toastId})
    }
   
  }

  return (
    <div>
      <Header/>
      <Flex className="bg-base-content"  justify="center" align="center" >
      <Col span={20}>
        <PHForm  onSubmit={onSubmit} >
        <Divider>Product Information</Divider>
          <Row gutter={8}>
            <Col span={24} md={{span:12}} lg={{span: 8}}>
            <PHSelect  label="Name" name="name" options={biCycleOption} disabled={false}/>
            </Col>
            <Col span={24} md={{span:12}} lg={{span: 8}}>
            <PHSelect  label="Brand" name="brand" options={biCycleBrands} disabled={false}/>
            </Col>
            <Col span={24} md={{span:12}} lg={{span: 8}}>
            <PHSelect  label="Type" name="type" options={biCycleTypes} disabled={false}/>
            </Col>
            <Col span={24} md={{span:12}} lg={{span: 8}}>
              <PHInput type="number" name="price" label="Price" />
            </Col>
            <Col span={24} md={{span:12}} lg={{span: 8}}>
              <PHInput type="text" name="description" label="Description" />
            </Col>
            <Col span={24} md={{span:12}} lg={{span: 8}}>
              <PHInput type="number" name="quantity" label="Quantity" />
            </Col>
           
            <Col span={24} md={{span:12}} lg={{span: 8}}>
            <PHInput type="text" name="image" label="Image(Must be URL)" />
            </Col>
            
          </Row>
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
    </div>
  )
}

export default CreateProduct

import logo from './../../assets/ef2e91149015821 1.png'
import logo1 from "./../../assets/pexels-jack-redgate-3014002 1.png"
const ExtraSection = () => {
  return (
    <div className='container t py-10 rounded-2xl mt-20 items-center mx-auto justify-center'>
      <div>
        <h1 className=' text-center text-3xl text-gray-400'>Forget about problem, ride your new Cycle</h1>
      </div>
      <div className=''>
      <img src={logo} alt="" className='w-1/2 lg:w-1/3 pl-10  place-content-center absolute ' />
      <img src={logo1} alt="" className='mt-20' />
      </div>
    </div>
  )
}

export default ExtraSection


import Header from '../components/pages/Header';

const About = () => {
  return (
    <div className="text-black">
      <Header />
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2
              className="font-heading mb-4 bg-orange-100  px-4 py-2 rounded-lg md:w-64 md:mx-auto text-xs font-semibold tracking-widest text-black uppercase title-font"
            >
              Why Choose Krinck?
            </h2>
            <p className="font-heading mt-2 text-3xl leading-8 font-semibold tracking-tight text-gray-900 sm:text-4xl">
              Your Trusted Bicycle Store
            </p>
            <p className="mt-4 max-w-2xl text-lg text-gray-500 lg:mx-auto">
              At Krinck, we're passionate about cycling. From high-performance bikes to essential accessories, we provide everything you need for your next cycling adventure. Quality, innovation, and customer satisfaction are at the heart of what we do.
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
    
              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                   
                  </div>
                  <p className="font-heading ml-16 text-lg leading-6 font-bold text-gray-700">
                    High-Quality Bicycles
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Explore a wide range of top-quality bicycles, including mountain bikes, road bikes, and e-bikes, designed for every type of rider.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                  
                  </div>
                  <p className="font-heading ml-16 text-lg leading-6 font-bold text-gray-700">
                    Trusted Brands
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  We stock bicycles and accessories from the most trusted brands, ensuring durability, reliability, and excellent performance.
                </dd>
              </div>
              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
               
                  </div>
                  <p className="font-heading ml-16 text-lg leading-6 font-bold text-gray-700">
                    Accessories & Gear
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  From helmets and lights to locks and apparel, we offer a complete range of cycling gear to enhance your riding experience.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">

                  </div>
                  <p className="font-heading ml-16 text-lg leading-6 font-bold text-gray-700">
                    Expert Repairs & Service
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Our experienced technicians provide expert maintenance and repair services to keep your bike in peak condition.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

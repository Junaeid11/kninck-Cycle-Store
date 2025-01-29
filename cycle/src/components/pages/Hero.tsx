
import { NavLink } from "react-router-dom";
import logo from "../../assets/pngwing.com (1).png";
import logo1 from "../../assets/Vector 1.png";

const Hero = () => {
  return (
    <div className="hero my-10 mx-auto">
      <div style={{
              background: `url(${logo1})`,
              backgroundSize: "cover",
            }}  className="hero-content lg:w-[1050px] flex-col lg:flex-row">
        <img src={logo} className="lg:max-w-lg lg:ml-15 " alt="Bike" />
        <div className=" items-center " >
          <h1
            className="text-5xl text-black lg:text-white font-bold text-center lg:text-right  bg-clip-text"
           
          >
            Let's go outside and ride <span className="text-white lg:text-black">
              Cycle
            </span>
          </h1>
          <p className="py-6 text-gray-300">
          Discover top-quality cycle and expert services at here. Whether you're a pro or a beginner, we have everything you need to ride with confidence and style
          </p>
          <NavLink to="/all-products">
            <button className="btn btn-primary">View All</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Hero;

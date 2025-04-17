import { ChevronRight } from "lucide-react"; // Importing an icon
import Category from "@/components/modules/home/Category";
import DeliverySection from "@/components/modules/home/delevery";
import FAQSection from "@/components/modules/home/FAQ";
import FeatureMeals from "@/components/modules/home/FeaturedProducts";
import HeroSection from "@/components/modules/home/HeroSection";
import NewsLatterSection from "@/components/modules/home/Newslatter";
import OfferMeals from "@/components/modules/home/Offer";
import PartnersSection from "@/components/modules/home/Partner";
import Blogs from "@/components/modules/home/Recipe-Blog";
import Testimonial from "@/components/modules/home/Testimonial";
import TopSellingDishes from "@/components/modules/home/TopSelling";
import FeatureSection from "@/components/modules/home/Feature";

const HomePage = async () => {
  return (
    <div>
      <HeroSection />

      <Category />
      <section id="top-selling">
        <TopSellingDishes />
      </section>
      <FeatureSection/>


      <section id="feature-meals">
        <FeatureMeals />
      </section>
      <section id="blogs">
        <Blogs />
      </section>
      {/* <section id="partners">
        <PartnersSection />
      </section>
      <section id="offers">
        <OfferMeals />
      </section>
   
      <section id="testimonials">
        <Testimonial />
      </section> */}

      <section id="faq">
        <FAQSection />
      </section>
      <section id="newsletter">
        <NewsLatterSection />
      </section>
    </div>
  );
};

export default HomePage;

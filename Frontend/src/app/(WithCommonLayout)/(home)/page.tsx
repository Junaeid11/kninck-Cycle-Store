import { ChevronRight, Section } from "lucide-react"; // Importing an icon
import Category from "@/components/modules/home/Category";
import FAQSection from "@/components/modules/home/FAQ";
import FeatureProducts from "@/components/modules/home/FeaturedProducts";
import HeroSection from "@/components/modules/home/HeroSection";
import NewsLatterSection from "@/components/modules/home/Newslatter";
import Blogs from "@/components/modules/home/Recipe-Blog";
import TopSellingDishes from "@/components/modules/home/TopSelling";
import FeatureSection from "@/components/modules/home/Feature";

const HomePage = async () => {
  return (
    <div>
      <HeroSection />
     <section id="category">
     <Category />
     </section>
      <section id="top-selling">
        <TopSellingDishes />
      </section>

     <FeatureSection/>



      <section id="products">
        <FeatureProducts />
      </section>
      <section id="blogs">
        <Blogs />
      </section>
 

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

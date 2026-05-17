import Header from "@/components/Header";
import Intro from "@/components/Intro";
import Favoris from "@/components/Favoris";
import Marques from "@/components/Marques";
import WhyRevline from "@/components/WhyRevline";
import Showroom from "@/components/Showroom";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Intro />
      <Favoris />
      <div className="divider-red mx-6 max-w-7xl md:mx-auto" />
      <Marques />
      <WhyRevline />
      <Showroom />
      <Footer />
    </>
  );
}

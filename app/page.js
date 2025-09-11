import Image from "next/image";
import Header from "@/components/Header";
import Intro from "@/components/Intro";
import Favoris from "@/components/Favoris";
import Showroom from "@/components/Showroom";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Intro />
      <Favoris />
      <Showroom />
      <Footer />
    </>
  );
}

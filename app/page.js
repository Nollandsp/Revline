import Image from "next/image";
import Header from "@/components/Header";
import Intro from "@/components/Intro";
import Favoris from "@/components/Favoris";

export default function Home() {
  return (
    <>
      <Header />
      <Intro />
      <Favoris />
    </>
  );
}

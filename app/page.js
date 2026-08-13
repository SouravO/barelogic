import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Technology from "@/components/Technology";
import HowItWorks from "@/components/HowItWorks";
import Services from "@/components/Services";
import WhoIsKys from "@/components/WhoIsKys";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Technology />
        <HowItWorks />
        <Services />
        <WhoIsKys />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

import { FeaturedCourses } from "../components/featured-courses";
import { Footer } from "../components/footer";

import { Header } from "../components/header";
import { HeroSection } from "../components/hero-section";



export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturedCourses />

      </main>
      <Footer />
    </div>
  )
}

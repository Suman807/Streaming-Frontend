import Backdrop from '../components/ui/Backdrop'
import LandingNav from '../components/landing/LandingNav'
import Hero from '../components/landing/Hero'
import MenuBar from '../components/landing/MenuBar'
import PlayerMockup from '../components/landing/PlayerMockup'
import FeatureStreaming from '../components/landing/FeatureStreaming'
import TechCloud from '../components/landing/TechCloud'
import Testimonials from '../components/landing/Testimonials'
import Pricing from '../components/landing/Pricing'
import FinalCTA from '../components/landing/FinalCTA'
import Footer from '../components/landing/Footer'
import { pageShell } from '../theme/styles'

export default function Landing() {
  return (
    <div className={pageShell}>
      <Backdrop />
      <div className="relative z-10">
        <LandingNav />
        <main>
          <Hero />
          <MenuBar />
          <PlayerMockup />
          <FeatureStreaming />
          <TechCloud />
          <Testimonials />
          <Pricing />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </div>
  )
}

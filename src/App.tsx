import './styles/site.css';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { TechStrip } from './components/TechStrip';
import { RoleSection } from './components/RoleSection';
import { ProcessSection } from './components/ProcessSection';
import { WorkSection } from './components/WorkSection';
import { ProofSection } from './components/ProofSection';
import { StackSection } from './components/StackSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection, Footer } from './components/ContactSection';

export default function App() {
  return (
    <>
      <a className="skip-link" href="#work">
        프로젝트로 바로 가기
      </a>
      <Nav />
      <main>
        <Hero />
        <TechStrip />
        <RoleSection />
        <ProcessSection />
        <WorkSection />
        <ProofSection />
        <StackSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

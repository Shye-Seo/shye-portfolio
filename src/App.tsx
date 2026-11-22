import { useState } from 'react';
import './styles/site.css';
import { PROJECTS } from './content';
import { Nav } from './components/Nav';
import { Opening } from './components/Opening';
import { CaseWorkspace } from './components/CaseWorkspace';
import { Career } from './components/Career';
import { Bento } from './components/Bento';
import { Contact, Footer } from './components/Contact';

export default function App() {
  const [activeCase, setActiveCase] = useState<string | null>(PROJECTS[0].id);

  return (
    <>
      <a className="skip" href="#work">
        프로젝트로 바로 가기
      </a>
      <Nav />
      <main>
        <Opening onSelect={setActiveCase} />
        <CaseWorkspace activeId={activeCase} onChange={setActiveCase} />
        <Career />
        <Bento />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

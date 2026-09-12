import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import NavBar from './components/NavBar.jsx';
import Hero from './components/Hero.jsx';
import Features from './components/Features.jsx';
import InstallSteps from './components/InstallSteps.jsx';
import Changelog from './components/Changelog.jsx';
import Faq from './components/Faq.jsx';
import Footer from './components/Footer.jsx';

const base = import.meta.env.BASE_URL;

export default function App() {
  const [version, setVersion] = useState(null);
  const [changelog, setChangelog] = useState([]);

  useEffect(() => {
    fetch(`${base}download/version.json?t=${Date.now()}`, { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setVersion(d))
      .catch(() => {});
    fetch(`${base}download/changelog.json?t=${Date.now()}`, { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => Array.isArray(d) && setChangelog(d))
      .catch(() => {});
  }, []);

  const downloadUrl = `${base}download/passcode.zip`;

  return (
    <Box>
      <NavBar version={version?.version} downloadUrl={downloadUrl} />
      <Hero version={version?.version} downloadUrl={downloadUrl} />
      <Features />
      <InstallSteps />
      <Changelog version={version} items={changelog} />
      <Faq />
      <Footer />
    </Box>
  );
}

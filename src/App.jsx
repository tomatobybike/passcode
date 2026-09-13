import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import NavBar from './components/NavBar.jsx';
import Hero from './components/Hero.jsx';
import Features from './components/Features.jsx';
import InstallSteps from './components/InstallSteps.jsx';
import Changelog from './components/Changelog.jsx';
import Faq from './components/Faq.jsx';
import Footer from './components/Footer.jsx';
import { useI18n } from './i18n/I18nProvider.jsx';

const base = import.meta.env.BASE_URL;

export default function App() {
  const { t, lang } = useI18n();
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

  // 标签页标题、页面描述与 <html lang> 跟随语言；index.html 里的中文是禁用 JS 时的兜底
  useEffect(() => {
    document.documentElement.lang = lang === 'en' ? 'en' : 'zh-CN';
    document.title = t('meta.title');
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', t('meta.description'));
  }, [lang, t]);

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

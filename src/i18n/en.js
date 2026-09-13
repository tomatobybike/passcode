// English dictionary. Keys mirror zh.js one-to-one (checked by the dev guard in core.js).
// Brand name follows the extension's own _locales: "Passcode Vault".
export const en = {
  /* ---------------------------------- Meta ---------------------------------- */
  'meta.title': 'Passcode Vault · A locally encrypted Chrome password manager',
  'meta.description':
    'Passcode Vault — a locally encrypted Chrome password and URL manager. Everything stays on your own computer: no sync, no upload, no server.',

  /* --------------------------------- NavBar --------------------------------- */
  'nav.brand': 'Passcode Vault',
  'nav.downloadFull': 'Download latest',
  'nav.downloadShort': 'Download',
  'nav.github': 'GitHub repository',
  'nav.langSwitch': 'Switch language',
  'nav.themeSwitch': 'Switch theme',
  'nav.themeToDark': 'Switch to dark mode',
  'nav.themeToLight': 'Switch to light mode',

  /* ---------------------------------- Hero ---------------------------------- */
  'hero.badge': 'Locally encrypted · Fully offline',
  'hero.title': 'Passcode Vault',
  'hero.subtitle':
    'A locally encrypted Chrome password and URL manager. Your data lives on this computer only — no sync, no upload, no server.',
  'hero.download': 'Download latest',
  'hero.aes': 'AES-GCM-256 encryption',

  /* -------------------------------- Features -------------------------------- */
  'features.title': 'Why Passcode Vault',
  'features.subtitle': 'A small tool that takes both security and everyday usability seriously — all on your machine.',

  'features.aes.title': 'AES-GCM encryption, locally',
  'features.aes.desc':
    'Your master password is stretched with PBKDF2-SHA256 (310,000 iterations) and the vault is sealed with AES-GCM-256. Only ciphertext ever reaches the disk.',

  'features.offline.title': 'Offline by default',
  'features.offline.desc':
    'No network calls, no uploads, no servers. The only request it ever makes is a single version check when you click "Check for updates".',

  'features.fill.title': 'One-click autofill',
  'features.fill.desc':
    'Open a login page and the popup matches entries by domain — one click fills the form, including React / Vue controlled inputs.',

  'features.cross.title': 'Cross-platform',
  'features.cross.desc':
    'Runs on Windows, macOS and Linux, in Chrome, Edge, Brave and any other Chromium-based browser.',

  'features.org.title': 'Organizations and entry types',
  'features.org.desc':
    'Group everything by organization (work, personal). Entries can be accounts, links, clients, commands or notes; pin the ones you use daily and filter "pinned only" across every organization.',

  'features.generator.title': 'Strong password generator',
  'features.generator.desc':
    'Hit the star button next to the password field to generate a 12 / 16 / 20 / 24 / 32-character password, optionally with symbols, and free of look-alike characters.',

  'features.audit.title': 'Password health check',
  'features.audit.desc':
    'Scans locally for weak passwords, reused passwords and passwords older than a year, then scores your vault 0–100 with a fix-it list. Entries without passwords are ignored.',

  'features.search.title': 'Search with highlighting',
  'features.search.desc':
    'Search across titles, URLs, accounts, commands, notes and organization names, with matches highlighted (never on passwords), plus filtering by type.',

  'features.backup.title': 'Backup, restore and import',
  'features.backup.desc':
    'Export an AES-GCM encrypted backup, restore it on another computer with the same master password, or import a CSV from Chrome or another password manager — duplicates are merged by organization, URL, account and password.',

  'features.clipboard.title': 'Self-clearing clipboard',
  'features.clipboard.desc':
    'After you copy an account or password the clipboard is wiped 30 seconds later (2 minutes for notes), with a live countdown — and it is still cleared after you close the popup.',

  'features.extrasTitle': 'And also',
  'features.extrasDesc': 'The small touches you only notice once you start using it.',

  'features.extra.badge':
    'Icon badge: a green ✓ when the current login page has a matching account, an amber ↓ when a backup is due, a grey ! when the vault is locked',
  'features.extra.backupNotify':
    'Backup reminders with optional desktop notifications (30+ days without an export, or after a master-password change) — notifications never contain accounts or URLs',
  'features.extra.autoLock':
    'Auto-locks after 15 minutes idle, or lock it yourself anytime; the unlocked key stays in session storage only',
  'features.extra.shortcuts':
    'Shortcuts: Ctrl+Shift+P opens the popup, Alt+L locks instantly (⌘ / ⌥ on macOS; remap them in chrome://extensions/shortcuts)',
  'features.extra.contextMenu':
    'Right-click menu on any page: fill account and password, fill the password only, or generate and copy a strong password',
  'features.extra.undoDelete': 'Deleted entries can be undone for 8 seconds, so a slip of the mouse costs nothing',
  'features.extra.shareOrg':
    'Share an organization as a name + URL list — no accounts, passwords or notes included',
  'features.extra.tabToggle':
    'Choose which popup tabs to show: links, clients, commands, notes; the accounts tab always stays',
  'features.extra.onboarding':
    'A four-step first-run guide: create an organization, add an entry, fill it on a page, export a backup',
  'features.extra.uiLang':
    'The extension interface itself is available in Chinese and English, following your browser or set manually',

  /* ----------------------------- Install steps ------------------------------ */
  'install.title': 'Installation',
  'install.subtitle': 'Unzip it into a fixed folder — later updates are just an overwrite, and your data survives.',
  'install.warnStrong': 'Always update into the same folder.',
  'install.warnRest':
    'Unzipping into a new folder (say passcode-v2/) makes Chrome treat it as a brand-new extension: it cannot see your old data, and it looks like every password is gone. Do it this way instead — unzip the new build over the original folder, then click "Reload" on the extension card in chrome://extensions.',
  'install.winTitle': 'Windows',
  'install.macTitle': 'macOS / Linux',
  'install.win1':
    'Unzip the passcode-v*.zip you received into a fixed folder, e.g. C:\\Users\\<you>\\chrome-extensions\\passcode\\',
  'install.win2': 'Type chrome://extensions in Chrome, press Enter, and turn on "Developer mode" in the top right',
  'install.win3': 'Click "Load unpacked" in the top left and pick the folder you just unzipped',
  'install.win4':
    'Open the puzzle icon → find "Passcode Vault" → "Pin to toolbar", then click it and set your master password',
  'install.mac1': 'Unzip the passcode-v*.zip you received into a fixed folder, e.g. ~/chrome-extensions/passcode/',
  'install.mac2': 'Type chrome://extensions in Chrome, press Enter, and turn on "Developer mode" in the top right',
  'install.mac3': 'Click "Load unpacked" in the top left and pick the folder you just unzipped',
  'install.mac4':
    'Open the puzzle icon → find "Passcode Vault" → "Pin to toolbar", then click it and set your master password',

  /* -------------------------------- Changelog ------------------------------- */
  'changelog.title': 'Changelog',
  'changelog.empty': '(No release notes yet)',

  /* ----------------------------------- FAQ ---------------------------------- */
  'faq.title': 'FAQ',
  'faq.q1': 'What if GitHub is unreachable?',
  'faq.a1':
    'If tomatobybike.github.io/passcode does not open (GitHub is blocked on some networks), use the server mirror address instead, or ask a colleague to send you passcode-v*.zip directly. Installation is identical either way: unzip over the original folder, then click "Reload" in chrome://extensions.',
  'faq.q2': 'Where are my passwords stored? Is that safe?',
  'faq.a2':
    'Everything lives in this computer\'s Chrome storage (chrome.storage.local), separate from the extension files. Your master password is stretched with PBKDF2 and the data is sealed with AES-GCM-256 — only ciphertext is stored, and the master password itself is never saved or uploaded.',
  'faq.q3': 'Will my passwords survive an update?',
  'faq.a3':
    'Yes. As long as you unzip over the same folder, the data in chrome.storage.local is untouched. Never unzip into a new folder: Chrome would treat it as a different extension and the old data would be invisible.',
  'faq.q4': 'I forgot my master password — what now?',
  'faq.a4':
    'The master password is never stored, and nobody can recover it. If you lose it, the only option is to re-initialise the vault (which loses the data). Write it down and keep it somewhere safe, and export an encrypted backup regularly from "Backup & restore" — that is the only real safety net.',
  'faq.q5': 'Does "Check for updates" leak anything?',
  'faq.a5':
    'No. The extension stays offline in normal use; when you click it, it asks the update server for a version number only — no accounts, URLs or passwords are ever sent.',

  /* ---------------------------------- Footer -------------------------------- */
  'footer.brand': 'Passcode Vault',
  'footer.tagline': 'A locally encrypted Chrome password and URL manager · your data stays on your machine',
  'footer.github': 'GitHub repository',
  'footer.mirror': 'Server mirror',
  'footer.license':
    'MIT License · The extension collects nothing; every encryption and decryption happens on your machine.',
};

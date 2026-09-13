import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Link from '@mui/material/Link';
import SvgIcon from '@mui/material/SvgIcon';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import DownloadIcon from '@mui/icons-material/Download';
import logo from '../assets/logo-128.png';
import { useI18n } from '../i18n/I18nProvider.jsx';

const GITHUB = 'https://github.com/tomatobybike/passcode';

function GitHubMark(props) {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" />
    </SvgIcon>
  );
}

export default function NavBar({ version, downloadUrl }) {
  const { t, lang, setLang } = useI18n();

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: 'rgba(255,255,255,0.82)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid',
        borderColor: 'divider',
        color: 'text.primary',
      }}
    >
      <Toolbar sx={{ maxWidth: 1200, width: '100%', mx: 'auto', px: { xs: 1.5, sm: 3 }, gap: { xs: 0.5, sm: 1 } }}>
        <Box
          component="img"
          src={logo}
          alt="Passcode"
          sx={{ width: { xs: 24, sm: 28 }, height: { xs: 24, sm: 28 }, mr: 1, flexShrink: 0 }}
        />
        <Typography
          variant="h6"
          noWrap
          sx={{ fontWeight: 700, fontSize: { xs: '0.95rem', sm: '1.25rem' }, minWidth: 0 }}
        >
          {t('nav.brand')}
        </Typography>
        {version && (
          <Chip
            size="small"
            label={`v${version}`}
            color="primary"
            variant="outlined"
            sx={{ ml: 1.5, display: { xs: 'none', sm: 'inline-flex' } }}
          />
        )}
        <Box sx={{ flexGrow: 1 }} />

        {/* 语言切换：宽屏为「中 / EN」分段控件，窄屏收敛成单个按钮（显示可切换到的另一种语言） */}
        <ToggleButtonGroup
          size="small"
          exclusive
          value={lang}
          onChange={(_event, next) => next && setLang(next)}
          aria-label={t('nav.langSwitch')}
          sx={{
            display: { xs: 'none', sm: 'inline-flex' },
            '& .MuiToggleButton-root': {
              px: 1.25,
              py: 0.25,
              fontSize: 12,
              lineHeight: 1.7,
              textTransform: 'none',
            },
          }}
        >
          <ToggleButton value="zh" aria-label="中文">
            中
          </ToggleButton>
          <ToggleButton value="en" aria-label="English">
            EN
          </ToggleButton>
        </ToggleButtonGroup>
        <Button
          size="small"
          variant="outlined"
          onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
          aria-label={t('nav.langSwitch')}
          sx={{
            display: { xs: 'inline-flex', sm: 'none' },
            minWidth: 0,
            px: 1,
            fontSize: 12,
            lineHeight: 1.7,
            textTransform: 'none',
          }}
        >
          {lang === 'zh' ? 'EN' : '中'}
        </Button>

        <Tooltip title={t('nav.github')}>
          <IconButton
            component={Link}
            href={GITHUB}
            target="_blank"
            rel="noreferrer"
            size="small"
            sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
          >
            <GitHubMark />
          </IconButton>
        </Tooltip>
        <Button
          variant="contained"
          startIcon={<DownloadIcon />}
          href={downloadUrl}
          sx={{ ml: 1, borderRadius: 999, px: { xs: 1.75, sm: 2.5 }, minWidth: 0, whiteSpace: 'nowrap' }}
        >
          <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
            {t('nav.downloadFull')}
          </Box>
          <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>
            {t('nav.downloadShort')}
          </Box>
        </Button>
      </Toolbar>
    </AppBar>
  );
}

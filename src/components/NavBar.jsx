import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Link from '@mui/material/Link';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import DownloadIcon from '@mui/icons-material/Download';
import GitHubIcon from '@mui/icons-material/GitHub';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import logo from '../assets/logo-128.png';
import { useI18n } from '../i18n/I18nProvider.jsx';
import { useColorMode } from '../colorMode.jsx';

const GITHUB = 'https://github.com/tomatobybike/passcode';

// 移动端也要够大的点击区域（40px），桌面端收敛到 34px
const iconButtonSx = {
  width: { xs: 40, sm: 34 },
  height: { xs: 40, sm: 34 },
  borderRadius: '4px',
  color: 'text.secondary',
  '&:hover': { color: 'primary.main', bgcolor: 'action.hover' },
};

export default function NavBar({ version, downloadUrl }) {
  const { t, lang, setLang } = useI18n();
  const { mode, toggleMode } = useColorMode();
  const isDark = mode === 'dark';

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: isDark ? 'rgba(17,17,17,0.82)' : 'rgba(255,255,255,0.82)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid',
        borderColor: 'divider',
        color: 'text.primary',
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          maxWidth: 1200,
          width: '100%',
          mx: 'auto',
          minHeight: { xs: 56, sm: 64 },
          px: { xs: 1.25, sm: 3 },
          gap: { xs: 0.5, sm: 1 },
          flexWrap: 'nowrap',
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="Passcode"
          sx={{ width: { xs: 24, sm: 28 }, height: { xs: 24, sm: 28 }, mr: 1, flexShrink: 0 }}
        />
        <Typography
          variant="h6"
          component="div"
          noWrap
          sx={{
            fontWeight: 700,
            fontSize: { xs: '0.95rem', sm: '1.25rem' },
            minWidth: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {t('nav.brand')}
        </Typography>
        {version && (
          <Chip
            size="small"
            label={`v${version}`}
            color="primary"
            variant="outlined"
            sx={{ ml: 1, display: { xs: 'none', sm: 'inline-flex' }, flexShrink: 0 }}
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
            flexShrink: 0,
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
            flexShrink: 0,
            minWidth: 40,
            height: 40,
            px: 1,
            fontSize: 12,
            lineHeight: 1.7,
            textTransform: 'none',
          }}
        >
          {lang === 'zh' ? 'EN' : '中'}
        </Button>

        {/* 明暗主题切换 */}
        <Tooltip title={isDark ? t('nav.themeToLight') : t('nav.themeToDark')}>
          <IconButton
            onClick={toggleMode}
            aria-label={isDark ? t('nav.themeToLight') : t('nav.themeToDark')}
            sx={{ ...iconButtonSx, flexShrink: 0 }}
          >
            {isDark ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
          </IconButton>
        </Tooltip>

        <Tooltip title={t('nav.github')}>
          <IconButton
            component={Link}
            href={GITHUB}
            target="_blank"
            rel="noreferrer"
            aria-label={t('nav.github')}
            sx={{ ...iconButtonSx, display: { xs: 'none', sm: 'inline-flex' }, flexShrink: 0 }}
          >
            <GitHubIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Button
          variant="contained"
          size="small"
          startIcon={<DownloadIcon />}
          href={downloadUrl}
          sx={{
            ml: { xs: 0.5, sm: 1 },
            px: { xs: 1.5, sm: 2.5 },
            height: 40,
            minWidth: 0,
            flexShrink: 0,
            whiteSpace: 'nowrap',
          }}
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

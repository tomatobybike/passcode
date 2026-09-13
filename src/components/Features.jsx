import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import LockIcon from '@mui/icons-material/Lock';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import DevicesIcon from '@mui/icons-material/Devices';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import SearchIcon from '@mui/icons-material/Search';
import BackupIcon from '@mui/icons-material/Backup';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useI18n } from '../i18n/I18nProvider.jsx';

// 图标与文案解耦：新增一项只需改这里 + i18n/zh.js 与 i18n/en.js 各补两条
const FEATURES = [
  { icon: <LockIcon />, key: 'features.aes' },
  { icon: <CloudOffIcon />, key: 'features.offline' },
  { icon: <AutoAwesomeMotionIcon />, key: 'features.fill' },
  { icon: <DevicesIcon />, key: 'features.cross' },
  { icon: <AccountTreeIcon />, key: 'features.org' },
  { icon: <AutoFixHighIcon />, key: 'features.generator' },
  { icon: <HealthAndSafetyIcon />, key: 'features.audit' },
  { icon: <SearchIcon />, key: 'features.search' },
  { icon: <BackupIcon />, key: 'features.backup' },
  { icon: <ContentCopyIcon />, key: 'features.clipboard' },
];

// 「还有这些」清单项，同样只存 key
const EXTRAS = [
  'badge',
  'backupNotify',
  'autoLock',
  'shortcuts',
  'contextMenu',
  'undoDelete',
  'shareOrg',
  'tabToggle',
  'onboarding',
  'uiLang',
];

function IconBadge({ children }) {
  return (
    <Stack
      sx={{
        width: 52,
        height: 52,
        borderRadius: '14px',
        background: 'linear-gradient(135deg,#0EA5A4,#2563EB)',
        color: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        mb: 2,
      }}
    >
      {children}
    </Stack>
  );
}

const cardSx = {
  height: '100%',
  border: '1px solid',
  borderColor: 'divider',
  borderRadius: 4,
  transition: 'transform .2s, box-shadow .2s',
  '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 16px 40px rgba(15,23,42,0.12)' },
};

export default function Features() {
  const { t } = useI18n();

  return (
    <Box sx={{ py: { xs: 6, md: 9 }, background: 'background.default' }}>
      <Container maxWidth="lg">
        <Typography variant="h2" align="center" sx={{ mb: 1 }}>
          {t('features.title')}
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 5 }}>
          {t('features.subtitle')}
        </Typography>
        <Grid container spacing={3}>
          {FEATURES.map((f) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={f.key}>
              <Card elevation={0} sx={cardSx}>
                <CardContent>
                  <IconBadge>{f.icon}</IconBadge>
                  <Typography variant="h3" sx={{ mb: 1 }}>
                    {t(`${f.key}.title`)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t(`${f.key}.desc`)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}

          {/* 末行右侧的宽面板：桌面下与第 10 张卡正好填满一行，不留空位 */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Card elevation={0} sx={cardSx}>
              <CardContent>
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
                  <CheckCircleIcon sx={{ color: 'primary.main' }} />
                  <Typography variant="h3">{t('features.extrasTitle')}</Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {t('features.extrasDesc')}
                </Typography>
                <Box
                  component="ul"
                  sx={{
                    m: 0,
                    pl: 0,
                    listStyle: 'none',
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                    gap: 1.25,
                  }}
                >
                  {EXTRAS.map((key) => (
                    <Stack key={key} component="li" direction="row" spacing={1} alignItems="flex-start">
                      <Box
                        sx={{
                          flexShrink: 0,
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          bgcolor: 'primary.main',
                          mt: 1,
                        }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {t(`features.extra.${key}`)}
                      </Typography>
                    </Stack>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

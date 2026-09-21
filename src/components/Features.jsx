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
import HistoryIcon from '@mui/icons-material/History';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { brand, enterSx, ghostCard, radius } from '../theme.js';
import { useI18n } from '../i18n/I18nProvider.jsx';

// 图标与文案解耦：新增一项只需改这里 + i18n/zh.js 与 i18n/en.js 各补两条
//
// 张数必须保持 12 的倍数逻辑：桌面每行 3 张（md:4），末尾的「还有这些」面板占整行。
// 12 张 = 4 个满行 + 面板整行，首尾都没有空位；一旦变成 11 张，末行只剩 1 个 4 格空位。
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
  { icon: <HistoryIcon />, key: 'features.clipHistory' },
  { icon: <AutorenewIcon />, key: 'features.refresh' },
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
        width: 48,
        height: 48,
        borderRadius: `${radius.card}px`,
        background: `linear-gradient(135deg, ${brand.green} 0%, ${brand.greenDark} 100%)`,
        color: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        mb: 2,
        flexShrink: 0,
      }}
    >
      {children}
    </Stack>
  );
}

/** 依次出现的延迟：前几张错开，后面的统一封顶，避免长列表动画拖沓 */
const delayOf = (index) => Math.min(index, 5) * 0.05;

export default function Features() {
  const { t } = useI18n();

  return (
    <Box sx={{ py: { xs: 6, md: 9 }, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Typography variant="h2" align="center" sx={{ mb: 1 }}>
          {t('features.title')}
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: { xs: 4, md: 5 } }}>
          {t('features.subtitle')}
        </Typography>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {FEATURES.map((f, i) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={f.key}>
              <Card elevation={0} sx={(theme) => ({ ...ghostCard(theme), ...enterSx(delayOf(i)) })}>
                <CardContent sx={{ p: { xs: 2.5, md: 3 }, '&:last-child': { pb: { xs: 2.5, md: 3 } } }}>
                  <IconBadge>{f.icon}</IconBadge>
                  <Typography variant="h3" sx={{ mb: 1 }}>
                    {t(`${f.key}.title`)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    {t(`${f.key}.desc`)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}

          {/* 「还有这些」面板：上面 12 张卡在桌面下正好排满 4 行，这里占满第 5 行整行，
              首尾都不留空位。清单做成 3 列，整行宽度下每列约 1/3，长句不至于拉成一整行 */}
          <Grid size={{ xs: 12, md: 12 }}>
            <Card elevation={0} sx={(theme) => ({ ...ghostCard(theme), ...enterSx(0.1) })}>
              <CardContent sx={{ p: { xs: 2.5, md: 3 }, '&:last-child': { pb: { xs: 2.5, md: 3 } } }}>
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
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
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
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
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

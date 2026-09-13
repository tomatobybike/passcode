import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { useI18n } from '../i18n/I18nProvider.jsx';

const GITHUB = 'https://github.com/tomatobybike/passcode';
// 自有服务器镜像（国内兜底下载 + 插件更新源），与插件 UPDATE_SOURCES 第一个源一致
const MIRROR = 'https://passcode.hisread.com/passcode/';

export default function Footer() {
  const { t } = useI18n();

  return (
    <Box
      component="footer"
      sx={{
        py: { xs: 5, md: 6 },
        background: (theme) => (theme.palette.mode === 'dark' ? '#0B0B0B' : '#111111'),
        color: 'rgba(255,255,255,0.8)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
        >
          <Box>
            <Typography variant="h6" component="div" sx={{ color: '#fff', fontWeight: 700 }}>
              {t('footer.brand')}
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mt: 0.5 }}>
              {t('footer.tagline')}
            </Typography>
          </Box>
          <Stack
            direction="row"
            spacing={3}
            divider={<Divider orientation="vertical" flexItem sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />}
          >
            <Link
              href={GITHUB}
              target="_blank"
              rel="noreferrer"
              sx={{ color: 'rgba(255,255,255,0.85)', '&:hover': { color: '#fff' } }}
            >
              {t('footer.github')}
            </Link>
            <Link
              href={MIRROR}
              target="_blank"
              rel="noreferrer"
              sx={{ color: 'rgba(255,255,255,0.85)', '&:hover': { color: '#fff' } }}
            >
              {t('footer.mirror')}
            </Link>
          </Stack>
        </Stack>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.55)', display: 'block', mt: 3 }}>
          {t('footer.license')}
        </Typography>
      </Container>
    </Box>
  );
}

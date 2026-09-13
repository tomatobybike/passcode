import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import ShieldIcon from '@mui/icons-material/Shield';
import DownloadIcon from '@mui/icons-material/Download';
import LockIcon from '@mui/icons-material/Lock';
import { heroGradient } from '../theme.js';

export default function Hero({ version, downloadUrl }) {
  return (
    <Box
      sx={{
        pt: { xs: '88px', md: '96px' },
        pb: { xs: 6, md: 10 },
        background: heroGradient,
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(60% 60% at 80% 0%, rgba(255,255,255,0.18), transparent 60%), radial-gradient(50% 50% at 0% 100%, rgba(0,0,0,0.18), transparent 60%)',
        }}
      />
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={6} alignItems="center">
          <Box sx={{ flex: 1 }}>
            <Chip
              icon={<ShieldIcon />}
              label="本地加密 · 全程离线"
              sx={{ bgcolor: 'rgba(255,255,255,0.18)', color: '#fff', mb: 2, border: '1px solid rgba(255,255,255,0.3)' }}
            />
            <Typography variant="h1" sx={{ color: '#fff', mb: 2 }}>
              Passcode 密码箱
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 400, color: 'rgba(255,255,255,0.92)', maxWidth: 520, fontSize: { xs: '0.95rem', sm: '1.05rem' } }}>
              本地加密的 Chrome 密码与常用网址管理器。数据只在你这台电脑，不联网、不上传、不经过任何服务器。
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mt: 4 }} alignItems="center" flexWrap="wrap">
              <Button
                variant="contained"
                size="large"
                startIcon={<DownloadIcon />}
                href={downloadUrl}
                sx={{ bgcolor: '#fff', color: 'primary.main', borderRadius: 999, px: 4, '&:hover': { bgcolor: '#f1f5f9' } }}
              >
                下载最新版{version ? ` v${version}` : ''}
              </Button>
              <Chip
                icon={<LockIcon />}
                label="AES-GCM-256 加密"
                variant="outlined"
                sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.5)' }}
              />
            </Stack>
          </Box>
          <Box
            sx={{
              flex: '0 0 auto',
              width: 200,
              height: 200,
              borderRadius: '32px',
              background: 'rgba(255,255,255,0.14)',
              border: '1px solid rgba(255,255,255,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
            }}
          >
            <LockIcon sx={{ fontSize: 110, color: '#fff' }} />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

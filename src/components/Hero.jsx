import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import ShieldIcon from '@mui/icons-material/Shield';
import DownloadIcon from '@mui/icons-material/Download';
import LockIcon from '@mui/icons-material/Lock';
import {
  controlHeight,
  enterSx,
  fadeInUp,
  float,
  heroAccent,
  heroGradient,
  heroGradientDark,
} from '../theme.js';
import { useI18n } from '../i18n/I18nProvider.jsx';

export default function Hero({ version, downloadUrl }) {
  const { t } = useI18n();

  return (
    <Box
      sx={{
        // 顶部内边距按固定导航高度（xs 56 / sm 64）重算，既不遮挡也不贴住
        pt: { xs: '92px', sm: '104px', md: '112px' },
        pb: { xs: 7, md: 10 },
        background: (theme) => (theme.palette.mode === 'dark' ? heroGradientDark : heroGradient),
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 径向装饰：右上提亮 + 左下压暗，兼顾体积感与白字对比度
          暗色下压掉白色提亮、加深左下压暗，避免压暗后的渐变发灰发雾 */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? 'radial-gradient(60% 60% at 80% 0%, rgba(255,255,255,0.10), transparent 60%), radial-gradient(50% 50% at 0% 100%, rgba(0,0,0,0.28), transparent 60%)'
              : 'radial-gradient(60% 60% at 80% 0%, rgba(255,255,255,0.18), transparent 60%), radial-gradient(50% 50% at 0% 100%, rgba(0,0,0,0.18), transparent 60%)',
          pointerEvents: 'none',
        }}
      />
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 4, md: 6 }} alignItems="center">
          <Box sx={{ flex: 1 }}>
            <Chip
              icon={<ShieldIcon />}
              label={t('hero.badge')}
              sx={{
                bgcolor: 'rgba(255,255,255,0.18)',
                color: '#fff',
                mb: 2,
                border: '1px solid rgba(255,255,255,0.3)',
                '& .MuiChip-icon': { color: 'inherit' },
                ...enterSx(0.06),
              }}
            />
            <Typography variant="h1" sx={{ color: '#fff', mb: 2, ...enterSx(0.12) }}>
              {t('hero.title')}
            </Typography>
            <Typography
              variant="h6"
              component="p"
              sx={{
                fontWeight: 400,
                color: 'rgba(255,255,255,0.92)',
                maxWidth: 520,
                fontSize: { xs: '0.95rem', sm: '1.05rem' },
                lineHeight: 1.7,
                ...enterSx(0.18),
              }}
            >
              {t('hero.subtitle')}
            </Typography>
            <Stack
              direction="row"
              spacing={1.5}
              sx={{ mt: 4, ...enterSx(0.24) }}
              alignItems="center"
              flexWrap="wrap"
              useFlexGap
            >
              <Button
                variant="contained"
                size="large"
                startIcon={<DownloadIcon />}
                href={downloadUrl}
                sx={{
                  bgcolor: '#fff',
                  color: heroAccent,
                  px: 4,
                  height: `${controlHeight}px`,
                  boxShadow: '0 6px 18px rgba(0,0,0,0.18)',
                  '&:hover': { bgcolor: '#F1F5F9', boxShadow: '0 8px 22px rgba(0,0,0,0.22)' },
                }}
              >
                {t('hero.download')}
                {version ? ` v${version}` : ''}
              </Button>
              <Chip
                icon={<LockIcon />}
                label={t('hero.aes')}
                variant="outlined"
                sx={{
                  // 与下载按钮共用同一高度，并排时上下严格对齐
                  height: `${controlHeight}px`,
                  color: '#fff',
                  borderColor: 'rgba(255,255,255,0.5)',
                  '& .MuiChip-icon': { color: 'inherit', fontSize: 18 },
                  '& .MuiChip-label': { fontSize: '0.9375rem' },
                }}
              />
            </Stack>
          </Box>

          {/* 主视觉：半透明玻璃方块 + 大号锁图标（入场淡入后持续轻微浮动） */}
          <Box
            sx={{
              flex: '0 0 auto',
              width: { xs: 160, sm: 200 },
              height: { xs: 160, sm: 200 },
              // 首屏主视觉的刻意例外：方块圆角保留原版的 32px，不随全站 6px 收敛
              borderRadius: '32px',
              background: 'rgba(255,255,255,0.14)',
              border: '1px solid rgba(255,255,255,0.3)',
              backdropFilter: 'blur(6px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              // 深色底上 0.25 的黑影几乎看不见，会丢掉方块的悬浮层次
              boxShadow: (theme) =>
                theme.palette.mode === 'dark'
                  ? '0 20px 60px rgba(0,0,0,0.50)'
                  : '0 20px 60px rgba(0,0,0,0.25)',
              animation: `${fadeInUp} .5s ease both, ${float} 5s ease-in-out .5s infinite`,
              '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
            }}
          >
            <LockIcon sx={{ fontSize: { xs: 88, sm: 110 }, color: '#fff' }} />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

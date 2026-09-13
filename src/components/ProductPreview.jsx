import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ProductMock from './ProductMock.jsx';
import FeatureCarousel from './FeatureCarousel.jsx';
import { brand, enterSx } from '../theme.js';
import { useI18n } from '../i18n/I18nProvider.jsx';

const GITHUB = 'https://github.com/tomatobybike/passcode';

// 要点只存 key，文案在 i18n 字典里；顺序即展示顺序
const POINTS = ['preview.point1', 'preview.point2', 'preview.point3'];

/**
 * 产品预览区块：Otis 式交替图文 —— 左栏文案与 CTA，右栏产品示意弹窗。
 * 放在 Hero 与功能区之间，用 background.paper 与相邻区块的浅灰底形成灰白交替。
 */
export default function ProductPreview() {
  const { t } = useI18n();

  return (
    <Box sx={{ py: { xs: 6, md: 9 }, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 4, md: 7 }} alignItems="center">
          <Box sx={{ flex: 1, ...enterSx(0.05) }}>
            <Stack
              sx={{
                width: 36,
                height: 36,
                borderRadius: '8px',
                bgcolor: brand.greenTint,
                color: 'primary.main',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2,
              }}
            >
              <VisibilityOutlinedIcon sx={{ fontSize: 18 }} />
            </Stack>
            <Typography variant="h2" sx={{ mb: 1 }}>
              {t('preview.title')}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.7 }}>
              {t('preview.subtitle')}
            </Typography>
            <Stack spacing={1.25} sx={{ mb: 3.5 }}>
              {POINTS.map((key) => (
                <Stack key={key} direction="row" spacing={1.25} alignItems="flex-start">
                  <CheckCircleIcon sx={{ fontSize: 18, color: 'primary.main', mt: 0.25, flexShrink: 0 }} />
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    {t(key)}
                  </Typography>
                </Stack>
              ))}
            </Stack>
            <Stack direction="row" spacing={{ xs: 1.5, sm: 2 }} alignItems="center" flexWrap="wrap" useFlexGap>
              <Button
                variant="text"
                endIcon={<ArrowForwardIcon />}
                href={GITHUB}
                target="_blank"
                rel="noreferrer"
                sx={{ px: 1 }}
              >
                {t('nav.github')}
              </Button>
            </Stack>
          </Box>

          <Box sx={{ flex: '0 0 auto', width: { xs: '100%', md: 'auto' }, ...enterSx(0.12) }}>
            <ProductMock />
          </Box>
        </Stack>

        {/* 段②：条目类型轮播 —— 用分隔线 + 大间距与段①分开，读作同一模块的两部分 */}
        <Box
          sx={{
            mt: { xs: 7, md: 10 },
            pt: { xs: 6, md: 8 },
            borderTop: '1px solid',
            borderColor: 'divider',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="overline"
            component="p"
            sx={{ display: 'block', fontWeight: 700, letterSpacing: '0.08em', color: 'primary.main' }}
          >
            {t('types.overline')}
          </Typography>
          <Typography variant="h2" sx={{ mt: 0.5, mb: 1 }}>
            {t('types.title')}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: { xs: 3, md: 4 } }}>
            {t('types.subtitle')}
          </Typography>
          <Box sx={{ ...enterSx(0.08) }}>
            <FeatureCarousel />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

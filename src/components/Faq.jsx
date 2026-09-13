import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { enterSx, radius } from '../theme.js';
import { useI18n } from '../i18n/I18nProvider.jsx';

// 问答以 key 序号组织，中英文案分别放在 i18n 字典里，顺序即展示顺序
const FAQ_KEYS = ['1', '2', '3', '4', '5'];

export default function Faq() {
  const { t } = useI18n();

  return (
    <Box sx={{ py: { xs: 6, md: 9 }, bgcolor: 'background.default' }}>
      <Container maxWidth="md">
        <Typography variant="h2" align="center" sx={{ mb: { xs: 3, md: 4 } }}>
          {t('faq.title')}
        </Typography>
        <Box sx={enterSx(0.05)}>
          {FAQ_KEYS.map((key) => (
            <Accordion
              key={key}
              elevation={0}
              disableGutters
              sx={{
                // 与「为什么选它」一致：去掉线框与底色，条目直接融进区块的浅灰底。
                // Accordion 继承自 Paper，深色模式下 Paper 自带一层叠加渐变，只写 bgcolor 会残留淡色，故一并关掉。
                bgcolor: 'transparent',
                backgroundImage: 'none',
                border: 0,
                boxShadow: 'none',
                borderRadius: `${radius.card}px`,
                mb: 1.5,
                overflow: 'hidden',
                '&:before': { display: 'none' },
                '&.Mui-expanded': { mb: 1.5 },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  px: { xs: 1.75, md: 2.25 },
                  py: 0.5,
                  borderRadius: `${radius.card}px`,
                  // 无底色后靠这层极浅 hover 底提示可点（MUI 已内置 background-color 过渡）
                  '&:hover': { bgcolor: 'action.hover' },
                }}
              >
                <Typography variant="subtitle1" component="h3" sx={{ fontWeight: 600 }}>
                  {t(`faq.q${key}`)}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: { xs: 1.75, md: 2.25 }, pt: 0, pb: 2 }}>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  {t(`faq.a${key}`)}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

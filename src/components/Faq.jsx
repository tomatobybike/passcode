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
    <Box sx={{ py: { xs: 6, md: 9 }, background: 'background.paper' }}>
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
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: `${radius.card}px`,
                mb: 1.5,
                overflow: 'hidden',
                '&:before': { display: 'none' },
                '&.Mui-expanded': { mb: 1.5 },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{ px: { xs: 1.75, md: 2.25 }, py: 0.5 }}
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

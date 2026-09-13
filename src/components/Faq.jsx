import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useI18n } from '../i18n/I18nProvider.jsx';

// 问答以 key 序号组织，中英文案分别放在 i18n 字典里，顺序即展示顺序
const FAQ_KEYS = ['1', '2', '3', '4', '5'];

export default function Faq() {
  const { t } = useI18n();

  return (
    <Box sx={{ py: { xs: 6, md: 9 }, background: '#fff' }}>
      <Container maxWidth="md">
        <Typography variant="h2" align="center" sx={{ mb: 4 }}>
          {t('faq.title')}
        </Typography>
        {FAQ_KEYS.map((key) => (
          <Accordion
            key={key}
            elevation={0}
            sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, mb: 1.5, '&:before': { display: 'none' } }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1" component="h3" sx={{ fontWeight: 600 }}>
                {t(`faq.q${key}`)}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary">
                {t(`faq.a${key}`)}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </Box>
  );
}

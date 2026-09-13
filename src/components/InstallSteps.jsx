import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useI18n } from '../i18n/I18nProvider.jsx';

// 文案 key 而非文案本身：翻译在组件内按当前语言取
const COLUMNS = [
  { titleKey: 'install.winTitle', stepKeys: ['install.win1', 'install.win2', 'install.win3', 'install.win4'] },
  { titleKey: 'install.macTitle', stepKeys: ['install.mac1', 'install.mac2', 'install.mac3', 'install.mac4'] },
];

function StepList({ title, steps }) {
  return (
    <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 4, height: '100%' }}>
      <CardContent>
        <Typography variant="h3" sx={{ mb: 2 }}>
          {title}
        </Typography>
        <Stack component="ol" spacing={1.5} sx={{ pl: 0, m: 0, listStyle: 'none' }}>
          {steps.map((s, i) => (
            <Stack key={i} direction="row" spacing={1.5} alignItems="flex-start" component="li">
              <Box
                sx={{
                  flexShrink: 0,
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg,#0EA5A4,#2563EB)',
                  color: '#fff',
                  fontSize: 13,
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mt: 0.3,
                }}
              >
                {i + 1}
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
                {s}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function InstallSteps() {
  const { t } = useI18n();

  return (
    <Box sx={{ py: { xs: 6, md: 9 }, background: '#fff' }}>
      <Container maxWidth="lg">
        <Typography variant="h2" align="center" sx={{ mb: 1 }}>
          {t('install.title')}
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
          {t('install.subtitle')}
        </Typography>
        <Alert
          severity="warning"
          icon={<FiberManualRecordIcon />}
          sx={{ maxWidth: 820, mx: 'auto', mb: 4, borderRadius: 3, overflowWrap: 'anywhere' }}
        >
          <strong>{t('install.warnStrong')}</strong> {t('install.warnRest')}
        </Alert>
        <Grid container spacing={3}>
          {COLUMNS.map((column) => (
            <Grid size={{ xs: 12, md: 6 }} key={column.titleKey}>
              <StepList title={t(column.titleKey)} steps={column.stepKeys.map((key) => t(key))} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

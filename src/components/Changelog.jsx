import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { brand, enterSx } from '../theme.js';
import { useI18n } from '../i18n/I18nProvider.jsx';

function Entry({ entry, last }) {
  return (
    <Stack direction="row" spacing={2} alignItems="flex-start">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', alignSelf: 'stretch' }}>
        <Box
          sx={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${brand.green} 0%, ${brand.greenDark} 100%)`,
            mt: 0.8,
            flexShrink: 0,
          }}
        />
        {!last && <Box sx={{ flexGrow: 1, width: 2, bgcolor: 'divider', my: 0.75 }} />}
      </Box>
      <Box sx={{ pb: 3.5, minWidth: 0 }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.75, flexWrap: 'wrap' }}>
          <Typography variant="h3">v{entry.version}</Typography>
          {entry.date && <Chip size="small" label={entry.date} variant="outlined" />}
        </Stack>
        <Box component="ul" sx={{ m: 0, pl: 2.5, color: 'text.secondary' }}>
          {entry.notes.map((n, j) => (
            <li key={j}>
              <Typography variant="body2" sx={{ lineHeight: 1.7, overflowWrap: 'anywhere' }}>
                {n}
              </Typography>
            </li>
          ))}
        </Box>
      </Box>
    </Stack>
  );
}

export default function Changelog({ version, items }) {
  const { t } = useI18n();
  // 更新日志内容由 changelog.json 提供（中英共用一份），这里只负责标题与空状态
  const list = items?.length
    ? items
    : [{ version: version?.version || '—', date: version?.releaseDate || '', notes: [t('changelog.empty')] }];

  return (
    <Box sx={{ py: { xs: 6, md: 9 }, background: 'background.default' }}>
      <Container maxWidth="md">
        <Typography variant="h2" align="center" sx={{ mb: { xs: 3, md: 4 } }}>
          {t('changelog.title')}
        </Typography>
        <Box sx={enterSx(0.05)}>
          {list.map((entry, i) => (
            <Entry key={`${entry.version}-${i}`} entry={entry} last={i === list.length - 1} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

function Entry({ entry, last }) {
  return (
    <Stack direction="row" spacing={2} alignItems="flex-start">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box
          sx={{
            width: 14,
            height: 14,
            borderRadius: '50%',
            background: 'linear-gradient(135deg,#0EA5A4,#2563EB)',
            mt: 0.8,
            flexShrink: 0,
          }}
        />
        {!last && <Box sx={{ flexGrow: 1, width: 2, background: 'divider', my: 0.5 }} />}
      </Box>
      <Box sx={{ pb: 3 }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
          <Typography variant="h3">v{entry.version}</Typography>
          {entry.date && <Chip size="small" label={entry.date} variant="outlined" />}
        </Stack>
        <Box component="ul" sx={{ m: 0, pl: 2.5, color: 'text.secondary' }}>
          {entry.notes.map((n, j) => (
            <li key={j}>
              <Typography variant="body2">{n}</Typography>
            </li>
          ))}
        </Box>
      </Box>
    </Stack>
  );
}

export default function Changelog({ version, items }) {
  const list = items?.length
    ? items
    : [{ version: version?.version || '—', date: version?.releaseDate || '', notes: ['（暂无更新日志）'] }];

  return (
    <Box sx={{ py: { xs: 6, md: 9 }, background: 'background.default' }}>
      <Container maxWidth="md">
        <Typography variant="h2" align="center" sx={{ mb: 4 }}>
          更新日志
        </Typography>
        {list.map((entry, i) => (
          <Entry key={`${entry.version}-${i}`} entry={entry} last={i === list.length - 1} />
        ))}
      </Container>
    </Box>
  );
}

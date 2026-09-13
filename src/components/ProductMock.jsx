import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import MockWindow from './MockWindow.jsx';
import { brand } from '../theme.js';
import { useI18n } from '../i18n/I18nProvider.jsx';

// 示意卡片里的样本数据：语言中立，仅用于呈现「弹窗里长什么样」
const MOCK_ACCOUNTS = [
  { site: 'github.com', account: 'alex@example.com' },
  { site: 'mail.google.com', account: 'alex@example.com' },
  { site: 'aws.amazon.com', account: 'devops@example.com' },
];

const SEARCH_RADIUS = '6px';
const CHIP_RADIUS = '4px';

/** 「一键自动填充」弹窗示意：搜索行 + 匹配徽标 + 账号行 + 一键填充按钮条 */
export default function ProductMock() {
  const { t } = useI18n();

  return (
    <MockWindow title={t('hero.title')}>
      {/* 搜索行 + 匹配徽标 */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{ px: 1.5, py: 1.25, borderBottom: '1px solid', borderColor: 'divider' }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={0.75}
          sx={{
            flex: 1,
            minWidth: 0,
            px: 1,
            py: 0.75,
            borderRadius: SEARCH_RADIUS,
            bgcolor: 'action.hover',
            color: 'text.secondary',
          }}
        >
          <SearchIcon sx={{ fontSize: 14 }} />
          <Typography variant="caption" noWrap sx={{ fontSize: 12 }}>
            {t('mock.search')}
          </Typography>
        </Stack>
        <Box
          sx={{
            flexShrink: 0,
            px: 0.75,
            py: 0.25,
            borderRadius: CHIP_RADIUS,
            fontSize: 11,
            fontWeight: 600,
            whiteSpace: 'nowrap',
            bgcolor: (theme) =>
              theme.palette.mode === 'dark' ? 'rgba(22,179,100,0.16)' : 'rgba(22,179,100,0.10)',
            // 浅色取深绿保证 11px 小字对比度，暗色取亮绿
            color: (theme) => (theme.palette.mode === 'dark' ? brand.greenLight : brand.greenDark),
          }}
        >
          {/* 窄屏隐藏第 3 行账号，徽标数字同步收敛，避免「说 3 个却只显示 2 行」 */}
          <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>
            {t('mock.matched', { n: 2 })}
          </Box>
          <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
            {t('mock.matched', { n: 3 })}
          </Box>
        </Box>
      </Stack>

      {/* 账号行：站点 / 账号 / 掩码密码 / 复制图标 */}
      {MOCK_ACCOUNTS.map((row, i) => (
        <Stack
          key={row.site}
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{
            px: 1.5,
            py: 1.25,
            // 首行紧贴搜索行的下边框，避免出现 2px 双线
            borderTop: i === 0 ? 'none' : '1px solid',
            borderColor: 'divider',
            display: { xs: i === 2 ? 'none' : 'flex', sm: 'flex' },
          }}
        >
          <Stack
            sx={{
              flexShrink: 0,
              width: 20,
              height: 20,
              borderRadius: CHIP_RADIUS,
              bgcolor: 'action.hover',
              color: 'text.secondary',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            {row.site.charAt(0).toUpperCase()}
          </Stack>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography noWrap sx={{ fontSize: 13, fontWeight: 600, lineHeight: 1.4 }}>
              {row.site}
            </Typography>
            <Typography noWrap variant="caption" sx={{ display: 'block', fontSize: 12, color: 'text.secondary' }}>
              {row.account}
            </Typography>
          </Box>
          <Typography sx={{ flexShrink: 0, fontSize: 13, letterSpacing: '2px', color: 'text.secondary' }}>
            ••••••••
          </Typography>
          <ContentCopyIcon sx={{ flexShrink: 0, fontSize: 14, color: 'text.disabled' }} />
        </Stack>
      ))}

      {/* 一键填充：窗口内唯一的高饱和色，承担行动点语义 */}
      <Box sx={{ p: 1.25 }}>
        <Box
          sx={{
            height: 34,
            borderRadius: CHIP_RADIUS,
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            fontSize: 13,
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {t('features.fill.title')}
        </Box>
      </Box>
    </MockWindow>
  );
}

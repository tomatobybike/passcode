import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LanguageIcon from '@mui/icons-material/Language';
import KeyIcon from '@mui/icons-material/Key';
import BoltIcon from '@mui/icons-material/Bolt';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import MockWindow from './MockWindow.jsx';
import { brand } from '../theme.js';
import { useI18n } from '../i18n/I18nProvider.jsx';

const CODE_FONT = 'Menlo, Consolas, "Courier New", monospace';
const BLOCK_RADIUS = '6px';
const CHIP_RADIUS = '4px';
/** 说明文字预留两行高度，避免某张卡折行把框体压矮、破坏几张卡等高 */
const CAPTION_MIN_HEIGHT = 40;

// 示意数据：语言中立，仅用于呈现「这类条目在弹窗里长什么样」。
// 每类给到三行/三块，让五张卡的视觉重量接近（便签是一首诗，本身就是最高的一张）。
const TYPE_CONTENT = {
  account: [
    { site: 'github.com', account: 'alex@example.com' },
    { site: 'mail.google.com', account: 'alex@gmail.com' },
    { site: 'aws.amazon.com', account: 'alex-root' },
  ],
  link: [
    'https://github.com/tomatobybike/passcode',
    'https://dash.cloudflare.com/overview',
    'https://vercel.com/tomato/passcode-site',
  ],
  command: [
    'npm run build && rsync -av dist/ prod:/var/www/',
    'ssh deploy@10.0.0.12 -p 22',
    'systemctl restart passcode',
  ],
  client: { conn: 'ssh deploy@10.0.0.12 -p 22', key: '~/.ssh/passcode_ed25519', secret: '••••••••' },
  note: {},
};

const BODIES = {
  account: AccountBody,
  link: LinkBody,
  command: CommandBody,
  client: ClientBody,
  note: NoteBody,
};

/** 账号：站点 / 用户名 / 掩码密码 / 填充（三行示例） */
function AccountBody({ content }) {
  return (
    <Stack spacing={1}>
      {content.map((row) => (
        <Stack
          key={row.site}
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ px: 1.25, py: 1, borderRadius: BLOCK_RADIUS, bgcolor: 'action.hover' }}
        >
          <LanguageIcon sx={{ fontSize: 16, color: 'text.secondary', flexShrink: 0 }} />
          <Typography noWrap sx={{ fontSize: 13, fontWeight: 600, flexShrink: 0 }}>
            {row.site}
          </Typography>
          <Typography noWrap sx={{ flex: 1, minWidth: 0, fontSize: 12, color: 'text.secondary' }}>
            {row.account}
          </Typography>
          <Typography
            sx={{ flexShrink: 0, fontSize: 13, letterSpacing: '2px', color: 'text.secondary' }}
          >
            ••••••••
          </Typography>
          {/* 账号是「填充」：域名匹配后点一下即填入登录表单，不是复制 */}
          <BoltIcon sx={{ flexShrink: 0, fontSize: 15, color: 'text.disabled' }} />
        </Stack>
      ))}
    </Stack>
  );
}

/** 链接：三行网址，每行带复制与在新标签打开 */
function LinkBody({ content }) {
  return (
    <Stack spacing={1}>
      {content.map((url) => (
        <Stack
          key={url}
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ px: 1.25, py: 1, borderRadius: BLOCK_RADIUS, bgcolor: 'action.hover' }}
        >
          <LanguageIcon sx={{ fontSize: 16, color: 'text.secondary', flexShrink: 0 }} />
          <Typography noWrap sx={{ flex: 1, minWidth: 0, fontSize: 13, color: 'text.primary' }}>
            {url}
          </Typography>
          <ContentCopyIcon sx={{ fontSize: 14, color: 'text.disabled', flexShrink: 0 }} />
          <OpenInNewIcon sx={{ fontSize: 14, color: 'text.disabled', flexShrink: 0 }} />
        </Stack>
      ))}
    </Stack>
  );
}

/** 命令：三块等宽代码 + 复制 */
function CommandBody({ content }) {
  return (
    <Stack spacing={1}>
      {content.map((cmd) => (
        <Stack
          key={cmd}
          direction="row"
          spacing={1}
          sx={{ p: 1.25, borderRadius: BLOCK_RADIUS, bgcolor: 'action.hover' }}
        >
          <Typography
            sx={{
              flex: 1,
              minWidth: 0,
              fontFamily: CODE_FONT,
              fontSize: 12,
              lineHeight: 1.6,
              color: 'text.primary',
              overflowWrap: 'anywhere',
            }}
          >
            {cmd}
          </Typography>
          <ContentCopyIcon sx={{ fontSize: 14, color: 'text.disabled', flexShrink: 0 }} />
        </Stack>
      ))}
    </Stack>
  );
}

/** 客户端：连接串 / 身份文件 / 掩码凭据 */
function ClientBody({ content }) {
  return (
    <Stack spacing={1}>
      <Box sx={{ p: 1.25, borderRadius: BLOCK_RADIUS, bgcolor: 'action.hover' }}>
        <Typography sx={{ fontFamily: CODE_FONT, fontSize: 12, lineHeight: 1.6, overflowWrap: 'anywhere' }}>
          {content.conn}
        </Typography>
      </Box>
      <Box sx={{ p: 1.25, borderRadius: BLOCK_RADIUS, bgcolor: 'action.hover' }}>
        <Typography sx={{ fontFamily: CODE_FONT, fontSize: 12, lineHeight: 1.6, overflowWrap: 'anywhere' }}>
          {content.key}
        </Typography>
      </Box>
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{
          px: 1.25,
          py: 0.75,
          borderRadius: BLOCK_RADIUS,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <KeyIcon sx={{ fontSize: 14, color: 'text.secondary', flexShrink: 0 }} />
        <Typography
          noWrap
          sx={{ flex: 1, minWidth: 0, fontSize: 13, letterSpacing: '2px', color: 'text.secondary' }}
        >
          {content.secret}
        </Typography>
        <ContentCopyIcon sx={{ fontSize: 14, color: 'text.disabled', flexShrink: 0 }} />
      </Stack>
    </Stack>
  );
}

/**
 * 便签：按 markdown 渲染后的排版效果呈现一首诗 —— 加粗标题、斜体署名、保留换行的诗句。
 * 只还原排版观感，不显示 `#` / `**` 这类原始语法符号，也不引入 markdown 解析库。
 */
function NoteBody() {
  const { t } = useI18n();

  return (
    <Box sx={{ position: 'relative', p: 1.25, pr: 4, borderRadius: BLOCK_RADIUS, bgcolor: 'action.hover' }}>
      <Typography sx={{ fontSize: 14, fontWeight: 700, lineHeight: 1.5, color: 'text.primary' }}>
        {t('mock.note.heading')}
      </Typography>
      <Typography sx={{ mt: 0.25, fontSize: 12, fontStyle: 'italic', color: 'text.secondary' }}>
        {t('mock.note.byline')}
      </Typography>
      {/* pre-line：让文案里的 \n 渲染成真实换行 */}
      <Typography
        sx={{ mt: 1, fontSize: 13, lineHeight: 1.85, color: 'text.primary', whiteSpace: 'pre-line' }}
      >
        {t('mock.note.body')}
      </Typography>
      <StickyNote2OutlinedIcon
        sx={{ position: 'absolute', right: 10, bottom: 10, fontSize: 14, color: 'text.disabled' }}
      />
    </Box>
  );
}

/**
 * 单张条目类型的产品预览：公共窗口外壳 + 绿色类型徽标 + 按 type 分支的正文。
 * 卡面是「产品界面」而不是说明卡，真正的解释文案放在卡下方的灰色小字。
 *
 * 等高机制：幻灯片（li）是伸缩列容器 → 根节点 `flex: 1` 拿到确定高度 →
 * MockWindow 开启 fill 吃掉剩余高度 → 正文区垂直居中。五张卡的框体因此天然等高。
 */
export default function TypeMock({ type }) {
  const { t } = useI18n();
  const content = TYPE_CONTENT[type];
  const Body = BODIES[type];

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
      <MockWindow title={t('hero.title')} maxWidth="100%" fill>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, px: 1.5, pt: 1.5, pb: 1.5 }}>
          <Box
            sx={{
              display: 'inline-block',
              alignSelf: 'flex-start',
              px: 0.75,
              py: 0.25,
              borderRadius: CHIP_RADIUS,
              fontSize: 11,
              fontWeight: 600,
              bgcolor: (theme) =>
                theme.palette.mode === 'dark' ? 'rgba(22,179,100,0.16)' : 'rgba(22,179,100,0.10)',
              color: (theme) => (theme.palette.mode === 'dark' ? brand.greenLight : brand.greenDark),
            }}
          >
            {t(`types.${type}.title`)}
          </Box>
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              mt: 1.25,
              minWidth: 0,
            }}
          >
            <Body content={content} />
          </Box>
        </Box>
      </MockWindow>
      <Typography
        variant="caption"
        sx={{
          display: 'block',
          mt: 1.5,
          minHeight: CAPTION_MIN_HEIGHT,
          textAlign: 'center',
          color: 'text.secondary',
        }}
      >
        {t(`types.${type}.desc`)}
      </Typography>
    </Box>
  );
}

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQS = [
  {
    q: '打不开 GitHub 怎么下载？',
    a: '如果 tomatobybike.github.io/passcode 打不开（部分网络环境访问不了 GitHub），请使用内部提供的服务器下载地址，或让同事把 passcode-v*.zip 直接发给你。两种方式的安装步骤完全一样：解压覆盖到原目录 → 回 chrome://extensions 点「刷新」。',
  },
  {
    q: '我的密码存在哪里？安全吗？',
    a: '数据只存在你这台电脑的 Chrome 存储区（chrome.storage.local），与扩展文件分开。主密码经 PBKDF2 派生密钥，数据以 AES-GCM-256 加密，本地只存密文，主密码本身不保存、不上传。',
  },
  {
    q: '更新后我的密码还在吗？',
    a: '在。只要解压到同一个目录覆盖更新，密码数据（在 chrome.storage.local）完全不受影响。千万别解压到新目录，否则 Chrome 会把它当成全新扩展，读不到旧数据。',
  },
  {
    q: '忘记主密码怎么办？',
    a: '主密码不会被保存，也没有任何人能帮你找回。忘记只能重新初始化（数据会丢失）。请务必牢记，或写下来锁进抽屉——这是官方推荐做法。定期在管理页「备份与恢复」导出加密备份文件，是防丢的唯一办法。',
  },
  {
    q: '「检查更新」会泄露我的数据吗？',
    a: '不会。插件平时不联网；只有你主动点击「检查更新」时，才会向更新服务器请求一次版本号，不回传任何账号、网址或密码。',
  },
];

export default function Faq() {
  return (
    <Box sx={{ py: { xs: 6, md: 9 }, background: '#fff' }}>
      <Container maxWidth="md">
        <Typography variant="h2" align="center" sx={{ mb: 4 }}>
          常见问题
        </Typography>
        {FAQS.map((item, i) => (
          <Accordion key={i} elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, mb: 1.5, '&:before': { display: 'none' } }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {item.q}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary">
                {item.a}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </Box>
  );
}

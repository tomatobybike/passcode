import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import LockIcon from '@mui/icons-material/Lock';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import AutoFillIcon from '@mui/icons-material/AutoAwesomeMotion';
import DevicesIcon from '@mui/icons-material/Devices';

const FEATURES = [
  {
    icon: <LockIcon />,
    title: '本地 AES-GCM 加密',
    desc: '主密码经 PBKDF2-SHA256（31 万次迭代）派生密钥，数据以 AES-GCM-256 加密后写入本机，本地只存密文。',
  },
  {
    icon: <CloudOffIcon />,
    title: '全程离线',
    desc: '不联网、不上传、不经过任何服务器。只有你主动点击「检查更新」时，才会请求一次版本号。',
  },
  {
    icon: <AutoFillIcon />,
    title: '一键自动填充',
    desc: '打开登录页，弹窗按域名自动匹配账号密码，点一下即填入表单，兼容 React / Vue 受控输入框。',
  },
  {
    icon: <DevicesIcon />,
    title: '跨平台',
    desc: 'Windows / macOS / Linux 均可；Chrome、Edge、Brave 等基于 Chromium 的浏览器都能用。',
  },
];

export default function Features() {
  return (
    <Box sx={{ py: { xs: 6, md: 9 }, background: 'background.default' }}>
      <Container maxWidth="lg">
        <Typography variant="h2" align="center" sx={{ mb: 1 }}>
          为什么选它
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 5 }}>
          一个把「安全」和「好用」都做在本地的小工具。
        </Typography>
        <Grid container spacing={3}>
          {FEATURES.map((f) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={f.title}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 4,
                  transition: 'transform .2s, box-shadow .2s',
                  '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 16px 40px rgba(15,23,42,0.12)' },
                }}
              >
                <CardContent>
                  <Stack
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: '14px',
                      background: 'linear-gradient(135deg,#0EA5A4,#2563EB)',
                      color: '#fff',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                    }}
                  >
                    {f.icon}
                  </Stack>
                  <Typography variant="h3" sx={{ mb: 1 }}>
                    {f.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {f.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

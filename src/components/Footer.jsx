import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

const GITHUB = 'https://github.com/tomatobybike/passcode';
// 自有服务器镜像（国内兜底下载 + 插件更新源），与插件 UPDATE_SOURCES 第一个源一致
const MIRROR = 'https://passcode.hisread.com/passcode/';

export default function Footer() {
  return (
    <Box sx={{ py: 6, background: '#0F172A', color: 'rgba(255,255,255,0.8)' }}>
      <Container maxWidth="lg">
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700 }}>
              Passcode 密码箱
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mt: 0.5 }}>
              本地加密的 Chrome 密码与网址管理器 · 数据只在你本机
            </Typography>
          </Box>
          <Stack direction="row" spacing={3} divider={<Divider orientation="vertical" flexItem sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />}>
            <Link href={GITHUB} target="_blank" rel="noreferrer" sx={{ color: 'rgba(255,255,255,0.85)' }}>
              GitHub 仓库
            </Link>
            <Link href={MIRROR} target="_blank" rel="noreferrer" sx={{ color: 'rgba(255,255,255,0.85)' }}>
              服务器镜像
            </Link>
          </Stack>
        </Stack>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.45)', display: 'block', mt: 3 }}>
          MIT License · 本插件不收集任何数据，所有加解密均在本机完成。
        </Typography>
      </Container>
    </Box>
  );
}

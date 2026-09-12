import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const STEPS = {
  Windows: [
    '把收到的 passcode-v*.zip 解压到一个固定目录，例如 C:\\Users\\你的用户名\\chrome-extensions\\passcode\\',
    'Chrome 地址栏输入 chrome://extensions 并回车，打开右上角「开发者模式」',
    '点左上角「加载已解压的扩展程序」，选择刚解压出来的 passcode 目录',
    '拼图图标 → 找到「Passcode 密码箱」→「在工具栏中显示」，点击图标设置主密码即可',
  ],
  macOS: [
    '把收到的 passcode-v*.zip 解压到一个固定目录，例如 ~/chrome-extensions/passcode/',
    'Chrome 地址栏输入 chrome://extensions 并回车，打开右上角「开发者模式」',
    '点左上角「加载已解压的扩展程序」，选择刚解压出来的 passcode 目录',
    '拼图图标 → 找到「Passcode 密码箱」→「在工具栏中显示」，点击图标设置主密码即可',
  ],
};

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
              <Typography variant="body2" color="text.secondary">
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
  return (
    <Box sx={{ py: 9, background: '#fff' }}>
      <Container maxWidth="lg">
        <Typography variant="h2" align="center" sx={{ mb: 1 }}>
          安装步骤
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
          解压到固定目录后，覆盖更新即可，数据不会丢。
        </Typography>
        <Alert
          severity="warning"
          icon={<FiberManualRecordIcon />}
          sx={{ maxWidth: 820, mx: 'auto', mb: 4, borderRadius: 3 }}
        >
          <strong>更新必须覆盖到同一个目录。</strong> 解压到新目录（如 passcode-v2/）会被 Chrome 当作全新扩展，
          旧数据读不到、像「密码全没了」。正确做法：新 zip 解压覆盖原目录 → 回 chrome://extensions 点扩展卡片上的「刷新」。
        </Alert>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <StepList title="Windows" steps={STEPS.Windows} />
          </Grid>
          <Grid item xs={12} md={6}>
            <StepList title="macOS / Linux" steps={STEPS.macOS} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

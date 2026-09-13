import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// 插图专用尺度，不进全站圆角令牌
const FRAME_RADIUS = '14px';
const WINDOW_RADIUS = '10px';

/**
 * 产品示意窗口的公共外壳：设备外框 + 实心窗口 + 标题栏。
 * 供「一键自动填充」弹窗与四种条目类型预览复用，避免同一套边框/圆角/投影写多遍。
 *
 * fill：仅在轮播里开启。开启后整块向上撑满父级高度（用于让几张卡片等高），
 *       并给内容区包一层可分配剩余高度的容器；默认关闭，段① 的弹窗 DOM 逐字不变。
 *
 * 两个易错点：
 * 1. 内层窗口必须显式声明 color，否则会继承外层文字色（例如首屏的白字）而在白底上不可见；
 * 2. 整块是装饰性插图，故 aria-hidden，语义由外层的文案列承担。
 */
export default function MockWindow({ title, maxWidth = { xs: 380, md: 420 }, fill = false, children }) {
  return (
    <Box
      aria-hidden="true"
      sx={{
        flex: fill ? 1 : '0 0 auto',
        display: fill ? 'flex' : 'block',
        flexDirection: fill ? 'column' : undefined,
        width: '100%',
        maxWidth,
        mx: 'auto',
        p: '12px',
        borderRadius: FRAME_RADIUS,
        // 设备外框：与首屏的玻璃方块不同，这里要在普通浅色/深色区块上都有清晰边界
        bgcolor: 'background.default',
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: (theme) =>
          theme.palette.mode === 'dark'
            ? '0 16px 48px rgba(0,0,0,0.50)'
            : '0 16px 40px rgba(15,23,42,0.08)',
        transition: 'transform .25s ease, box-shadow .25s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: (theme) =>
            theme.palette.mode === 'dark'
              ? '0 22px 56px rgba(0,0,0,0.58)'
              : '0 22px 48px rgba(15,23,42,0.14)',
        },
        '@media (prefers-reduced-motion: reduce)': {
          transition: 'none',
          '&:hover': { transform: 'none' },
        },
      }}
    >
      <Box
        sx={{
          flex: fill ? 1 : undefined,
          display: fill ? 'flex' : 'block',
          flexDirection: fill ? 'column' : undefined,
          borderRadius: WINDOW_RADIUS,
          bgcolor: 'background.paper',
          color: 'text.primary',
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: (theme) =>
            theme.palette.mode === 'dark'
              ? '0 2px 8px rgba(0,0,0,0.40)'
              : '0 2px 8px rgba(15,23,42,0.06)',
          overflow: 'hidden',
        }}
      >
        {/* 标题栏：三个中性圆点 + 标题 */}
        <Stack
          direction="row"
          alignItems="center"
          spacing={0.75}
          sx={{ px: 1.5, height: 34, flexShrink: 0, borderBottom: '1px solid', borderColor: 'divider' }}
        >
          {[0, 1, 2].map((dot) => (
            <Box key={dot} sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'divider' }} />
          ))}
          <Typography variant="caption" noWrap sx={{ ml: 0.5, fontWeight: 600, color: 'text.secondary' }}>
            {title}
          </Typography>
        </Stack>
        {fill ? (
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>{children}</Box>
        ) : (
          children
        )}
      </Box>
    </Box>
  );
}

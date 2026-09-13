import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { enterSx, timelineAccents } from '../theme.js';
import { useI18n } from '../i18n/I18nProvider.jsx';

/* 中轴时间线的几何常量：圆点 12px，圆心落在首行日期小字的中线上（日期行高 20px → 圆心 10px） */
const DOT_SIZE = 12;
const DOT_TOP = 4;
const LINE_TOP = 20; // 竖线起点：圆点下方留 4px 间隙，与「圆点—上一段竖线」的间隙对称
const GUTTER = 24; // 桌面下内容与中轴的间距

/** 单条版本的内容：日期小字（颜色同圆点）+ 版本号 + 更新要点 */
function EntryBody({ entry, accent, align }) {
  return (
    <Box sx={{ textAlign: align, minWidth: 0 }}>
      {entry.date && (
        <Typography
          variant="overline"
          component="p"
          sx={{ color: accent, fontWeight: 700, lineHeight: '20px', mb: 0.5 }}
        >
          {entry.date}
        </Typography>
      )}
      <Typography variant="h3" sx={{ mb: 1 }}>
        v{entry.version}
      </Typography>
      <Box
        component="ul"
        sx={{
          m: 0,
          pl: 0,
          listStyleType: 'disc',
          listStylePosition: 'inside',
          color: 'text.secondary',
        }}
      >
        {entry.notes.map((n, j) => (
          <li key={j}>
            {/* inline 让圆点标记与文案同行（block 子元素会把标记挤到自己一行） */}
            <Typography
              component="span"
              variant="body2"
              sx={{ display: 'inline', lineHeight: 1.7, overflowWrap: 'anywhere' }}
            >
              {n}
            </Typography>
          </li>
        ))}
      </Box>
    </Box>
  );
}

/**
 * 一条时间线记录：桌面左右交替（偶数条靠右、奇数条靠左），窄屏统一收敛到竖线右侧单列。
 * 圆点与竖线用绝对定位画在留白里，正文只有一份 DOM，不靠占位格子撑版式。
 */
function Entry({ entry, index, last }) {
  const theme = useTheme();
  const tone = timelineAccents[index % timelineAccents.length];
  const accent = theme.palette.mode === 'dark' ? tone.dark : tone.light;
  const onRight = index % 2 === 0;

  return (
    <Box
      sx={{
        position: 'relative',
        pl: { xs: `${DOT_SIZE + 16}px`, md: 0 },
        pb: { xs: 4, md: 5 },
      }}
    >
      {/* 中轴竖线：贯穿本条，最后一条不画（不再向下悬空） */}
      {!last && (
        <Box
          sx={{
            position: 'absolute',
            top: `${LINE_TOP}px`,
            bottom: 0,
            left: { xs: `${DOT_SIZE / 2 - 1}px`, md: '50%' },
            ml: { md: '-1px' },
            width: 2,
            bgcolor: 'divider',
          }}
        />
      )}
      {/* 圆点：与首行日期小字垂直居中 */}
      <Box
        sx={{
          position: 'absolute',
          top: `${DOT_TOP}px`,
          left: { xs: 0, md: '50%' },
          ml: { md: `-${DOT_SIZE / 2}px` },
          width: DOT_SIZE,
          height: DOT_SIZE,
          borderRadius: '50%',
          bgcolor: accent,
        }}
      />
      <Box
        sx={{
          ml: { md: onRight ? `calc(50% + ${GUTTER}px)` : 0 },
          mr: { md: onRight ? 0 : `calc(50% + ${GUTTER}px)` },
        }}
      >
        <EntryBody entry={entry} accent={accent} align={{ xs: 'left', md: onRight ? 'left' : 'right' }} />
      </Box>
    </Box>
  );
}

export default function Changelog({ version, items }) {
  const { t } = useI18n();
  // 更新日志内容由 changelog.json 提供（中英共用一份），这里只负责标题与空状态
  const list = items?.length
    ? items
    : [{ version: version?.version || '—', date: version?.releaseDate || '', notes: [t('changelog.empty')] }];

  return (
    <Box sx={{ py: { xs: 6, md: 9 }, bgcolor: 'background.paper' }}>
      <Container maxWidth="md">
        <Typography variant="h2" align="center" sx={{ mb: { xs: 3, md: 4 } }}>
          {t('changelog.title')}
        </Typography>
        <Box sx={enterSx(0.05)}>
          {list.map((entry, i) => (
            <Entry key={`${entry.version}-${i}`} entry={entry} index={i} last={i === list.length - 1} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}

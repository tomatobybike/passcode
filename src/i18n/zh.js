// 中文字典。key 与 en.js 严格一一对应（开发期由 core.js 的守卫比对，漏翻会 console.warn）。
// 按区块前缀分组，便于日后整体抽出或删除某个区块。
export const zh = {
  /* -------------------------------- 文档级 -------------------------------- */
  'meta.title': 'Passcode 密码箱 · 本地加密的 Chrome 密码管理器',
  'meta.description':
    'Passcode 密码箱 —— 本地加密的 Chrome 密码与网址管理器，全程离线、不联网、不上传。',

  /* ---------------------------------- 导航 ---------------------------------- */
  'nav.brand': 'Passcode 密码箱',
  'nav.downloadFull': '下载最新版',
  'nav.downloadShort': '下载',
  'nav.github': 'GitHub 仓库',
  'nav.langSwitch': '切换语言',
  'nav.themeSwitch': '切换主题',
  'nav.themeToDark': '切换到深色模式',
  'nav.themeToLight': '切换到浅色模式',

  /* ---------------------------------- 首屏 ---------------------------------- */
  'hero.badge': '本地加密 · 全程离线',
  'hero.title': 'Passcode 密码箱',
  'hero.subtitle':
    '本地加密的 Chrome 密码与常用网址管理器。数据只在你这台电脑，不联网、不上传、不经过任何服务器。',
  'hero.download': '下载最新版',
  'hero.aes': 'AES-GCM-256 加密',
  /* ------------------------ 功能模块：一键自动填充 ------------------------ */
  'preview.title': '一键自动填充',
  'preview.subtitle': '打开登录页，弹窗按域名自动匹配账号——不用再翻密码本，也不用记网址。',
  'preview.point1': '按域名自动匹配账号，无需手动搜索',
  'preview.point2': '点一下填入表单，兼容 React / Vue 受控输入框',
  'preview.point3': '复制密码后剪贴板 30 秒自动清空',

  /* --------------------------- 产品示意弹窗（装饰） --------------------------- */
  'mock.search': '搜索账号',
  'mock.matched': '匹配到 {n} 个账号',

  /* -------------------------- 便签示例（markdown 渲染） -------------------------- */
  'mock.note.heading': '静夜思',
  'mock.note.byline': '李白 · 唐',
  'mock.note.body': '床前明月光，\n疑是地上霜。\n举头望明月，\n低头思故乡。',

  /* ---------------------------- 功能模块：条目类型 ---------------------------- */
  'types.overline': '条目类型',
  'types.title': '一个密码箱，装得下五种内容',
  'types.subtitle': '账号、链接、命令、客户端与便签——每种都有对应的展示方式。',
  'types.account.title': '账号',
  'types.account.desc': '域名自动匹配账号，点一下即填入登录表单。',
  'types.link.title': '链接',
  'types.link.desc': '一行网址，需要时直接打开或复制。',
  'types.command.title': '命令',
  'types.command.desc': '常用 shell 片段，随时复制到终端执行。',
  'types.client.title': '客户端',
  'types.client.desc': '地址、端口与凭据一屏搞定。',
  'types.note.title': '便签',
  'types.note.desc': '一段纯文本，放那些归不了类的信息。',
  'types.prev': '上一张',
  'types.next': '下一张',
  'types.dot': '第 {n} 张，共 {total} 张',

  /* --------------------------------- 功能介绍 -------------------------------- */
  'features.title': '为什么选它',
  'features.subtitle': '一个把「安全」和「好用」都做在本地的小工具。',

  'features.aes.title': '本地 AES-GCM 加密',
  'features.aes.desc':
    '主密码经 PBKDF2-SHA256（31 万次迭代）派生密钥，数据以 AES-GCM-256 加密后写入本机，本地只存密文。',

  'features.offline.title': '全程离线',
  'features.offline.desc':
    '不联网、不上传、不经过任何服务器。只有你主动点击「检查更新」时，才会请求一次版本号。',

  'features.fill.title': '一键自动填充',
  'features.fill.desc':
    '打开登录页，弹窗按域名自动匹配账号密码，点一下即填入表单，兼容 React / Vue 受控输入框。',

  'features.cross.title': '跨平台',
  'features.cross.desc':
    'Windows / macOS / Linux 均可；Chrome、Edge、Brave 等基于 Chromium 的浏览器都能用。',

  'features.org.title': '组织与条目类型',
  'features.org.desc':
    '按组织（公司 / 个人）归档；条目分账号、链接、客户端、命令、便签五类，常用项可置顶，也能跨组织只看置顶。',

  'features.generator.title': '强密码生成',
  'features.generator.desc':
    '新增或编辑条目时点一下星形按钮，即可生成 12 / 16 / 20 / 24 / 32 位随机密码，可选是否含符号，并自动避开易混淆字符。',

  'features.audit.title': '密码体检',
  'features.audit.desc':
    '本机扫描弱密码、重复密码与超过一年未更换的密码，给出 0–100 健康分与问题清单，可一键跳到编辑；只统计带密码的条目。',

  'features.search.title': '搜索与高亮',
  'features.search.desc':
    '跨标题、网址、账号、命令、备注与组织名搜索，命中关键词高亮显示（密码不高亮），并支持按类型筛选。',

  'features.backup.title': '备份与恢复',
  'features.backup.desc':
    '导出的是 AES-GCM 密文备份；换电脑时选入备份并输入当时的主密码即可恢复；也能直接导入 Chrome 或其他管理器导出的 CSV，按「组织 + 网址 + 账号 + 密码」自动去重。',

  'features.clipboard.title': '剪贴板自动清空',
  'features.clipboard.desc':
    '复制账号或密码后，剪贴板会在 30 秒后自动清空（便签为 2 分钟），顶栏显示剩余秒数；关掉弹窗也会由后台兜底清除。',

  'features.clipHistory.title': '剪贴板历史',
  'features.clipHistory.desc':
    '自动记下你在网页里复制过的文本，弹窗顶栏点一下就能重新复制回剪贴板；最多保留最近 20 条，超出淘汰最旧的一条。想长期留住的片段点「存入便签」，即刻转成可搜索、可备份的便签条目。',

  'features.refresh.title': '自动刷新',
  'features.refresh.desc':
    '给内网看板这类页面配一条「网址 + 间隔」，到点自动重载，不用一直手点刷新；命中页面的右下角会出现浮标显示下次刷新还剩几秒，可就地停止或恢复。',

  'features.extrasTitle': '还有这些',
  'features.extrasDesc': '细节处的体贴，用起来才知道。',

  'features.extra.badge':
    '图标角标提醒：登录页有匹配账号显示绿色 ✓，该备份了显示琥珀 ↓，未解锁显示灰色 !',
  'features.extra.backupNotify':
    '备份提醒与可选桌面通知：超过 30 天未导出、或改过主密码都会提醒，通知内容不含任何账号或网址',
  'features.extra.autoLock':
    '按会话时长自动上锁（默认 24 小时，可在管理页调整），也可随时手动锁定；解锁密钥只留在内存里，关掉浏览器即失效',
  'features.extra.shortcuts':
    '快捷键：Ctrl+Shift+P 打开弹窗、Alt+L 立即锁定（macOS 映射为 ⌘ / ⌥，可在 chrome://extensions/shortcuts 改键）',
  'features.extra.contextMenu': '网页右键菜单：填充账号与密码、只填充密码、生成并复制强密码',
  'features.extra.undoDelete': '删除条目后有 8 秒撤销窗口，误删可一键找回',
  'features.extra.shareOrg':
    '可导出「名称 + 网址」的组织清单分享给新同事，不含账号、密码与备注',
  'features.extra.tabToggle':
    '弹窗页签可自定义显隐：链接 / 客户端 / 命令 / 便签各自开关，账号页签固定显示',
  'features.extra.onboarding':
    '首次使用有四步引导：创建组织 → 新增条目 → 在网页里填充 → 导出备份',
  'features.extra.uiLang': '扩展界面支持中英文切换，可跟随浏览器或手动指定',

  /* --------------------------------- 安装步骤 -------------------------------- */
  'install.title': '安装步骤',
  'install.subtitle': '解压到固定目录后，覆盖更新即可，数据不会丢。',
  'install.warnStrong': '更新必须覆盖到同一个目录。',
  'install.warnRest':
    '解压到新目录（如 passcode-v2/）会被 Chrome 当作全新扩展，旧数据读不到、像「密码全没了」。正确做法：新 zip 解压覆盖原目录 → 回 chrome://extensions 点扩展卡片上的「刷新」。',
  'install.winTitle': 'Windows',
  'install.macTitle': 'macOS / Linux',
  'install.win1':
    '把收到的 passcode-v*.zip 解压到一个固定目录，例如 C:\\Users\\你的用户名\\chrome-extensions\\passcode\\',
  'install.win2': 'Chrome 地址栏输入 chrome://extensions 并回车，打开右上角「开发者模式」',
  'install.win3': '点左上角「加载已解压的扩展程序」，选择刚解压出来的 passcode 目录',
  'install.win4':
    '拼图图标 → 找到「Passcode 密码箱」→「在工具栏中显示」，点击图标设置主密码即可',
  'install.mac1': '把收到的 passcode-v*.zip 解压到一个固定目录，例如 ~/chrome-extensions/passcode/',
  'install.mac2': 'Chrome 地址栏输入 chrome://extensions 并回车，打开右上角「开发者模式」',
  'install.mac3': '点左上角「加载已解压的扩展程序」，选择刚解压出来的 passcode 目录',
  'install.mac4':
    '拼图图标 → 找到「Passcode 密码箱」→「在工具栏中显示」，点击图标设置主密码即可',

  /* --------------------------------- 更新日志 -------------------------------- */
  'changelog.title': '更新日志',
  'changelog.empty': '（暂无更新日志）',

  /* --------------------------------- 常见问题 -------------------------------- */
  'faq.title': '常见问题',
  'faq.q1': '打不开 GitHub 怎么下载？',
  'faq.a1':
    '如果 tomatobybike.github.io/passcode 打不开（部分网络环境访问不了 GitHub），请使用内部提供的服务器下载地址，或让同事把 passcode-v*.zip 直接发给你。两种方式的安装步骤完全一样：解压覆盖到原目录 → 回 chrome://extensions 点「刷新」。',
  'faq.q2': '我的密码存在哪里？安全吗？',
  'faq.a2':
    '数据只存在你这台电脑的 Chrome 存储区（chrome.storage.local），与扩展文件分开。主密码经 PBKDF2 派生密钥，数据以 AES-GCM-256 加密，本地只存密文，主密码本身不保存、不上传。',
  'faq.q3': '更新后我的密码还在吗？',
  'faq.a3':
    '在。只要解压到同一个目录覆盖更新，密码数据（在 chrome.storage.local）完全不受影响。千万别解压到新目录，否则 Chrome 会把它当成全新扩展，读不到旧数据。',
  'faq.q4': '忘记主密码怎么办？',
  'faq.a4':
    '主密码不会被保存，也没有任何人能帮你找回。忘记只能重新初始化（数据会丢失）。请务必牢记，或写下来锁进抽屉；同时定期在管理页「备份与恢复」导出加密备份，这是防丢的唯一办法。',
  'faq.q5': '「检查更新」会泄露我的数据吗？',
  'faq.a5':
    '不会。插件平时不联网；只有你主动点击「检查更新」时，才会向更新服务器请求一次版本号，不回传任何账号、网址或密码。',

  /* ---------------------------------- 页脚 ---------------------------------- */
  'footer.brand': 'Passcode 密码箱',
  'footer.tagline': '本地加密的 Chrome 密码与网址管理器 · 数据只在你本机',
  'footer.github': 'GitHub 仓库',
  'footer.mirror': '服务器镜像',
  'footer.license': 'MIT License · 本插件不收集任何数据，所有加解密均在本机完成。',
};

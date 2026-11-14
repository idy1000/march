/* ============ 模块五：长征路线图（四路红军行军路线 · 地图画布） ============
 * 底图：中国省级 GeoJSON（本地 data/100000_full.json，失败时回退阿里云 DataV）；
 * 交互：滚轮缩放 · 拖拽平移 · 悬停节点查看事件 · 点击图例显隐路线 · 顶栏"复位"回到路线总览。
 */

const ROUTE_GEO_BASES = ['data', 'https://geo.datav.aliyun.com/areas_v3/bound'];
const ROUTE_GEO_FILE = '100000_full.json';
const ROUTE_FONT = "'PingFang SC','Hiragino Sans GB','Microsoft YaHei',system-ui,sans-serif";

const ROUTES = [
  {
    id: 'r1',
    name: '红一方面军',
    period: '1934.10 — 1935.10',
    mileage: '二万五千里',
    line: '#e57373',
    text: '#ef9a9a',
    arrowSkip: [
      { lng: [104.95, 107.0], lat: [27.8, 28.45] },
      { lng: [110.0, 111.4], lat: [25.3, 26.1] },
    ],
    arrowAt: [
      { between: ['于都出发', '突破三道封锁线'] },
      { between: ['南渡乌江', '巧渡金沙江'] },
    ],
    nodes: [
      { lng: 115.44, lat: 25.95, major: true, name: '于都出发', date: '1934.10.17', desc: '中共中央和中央红军主力8.6万余人从瑞金、于都等地出发，开始战略转移。' },
      { lng: 113.08, lat: 25.43, name: '突破三道封锁线', date: '1934.10 — 11', desc: '连续突破国民党军在赣南、湘粤边、湘南设置的三道封锁线。' },
      { lng: 110.75, lat: 25.70, major: true, name: '血战湘江', date: '1934.11.27 — 12.1', desc: '血战湘江，红军由8万余人锐减至3万余人，江为之赤。',
        heroes: [
          { pid: 'person_chen_shuxiang', title: '红34师师长 · 断肠明志', flag: 'kia' },
          { pid: 'person_han_wei', title: '红34师100团团长 · 跳崖幸存' },
          { pid: 'person_geng_biao', title: '红4团团长 · 掩护中央纵队' },
        ] },
      { lng: 109.70, lat: 26.16, name: '通道转兵', date: '1934.12.12', desc: '在通道召开负责人紧急会议，采纳毛泽东建议，放弃北进湘西的原定计划，转兵西进贵州。' },
      { lng: 109.14, lat: 26.23, name: '黎平会议', date: '1934.12.18', desc: '采纳毛泽东建议，放弃与红二、六军团会合的原定计划，转兵贵州。' },
      { lng: 107.45, lat: 27.00, name: '猴场会议', date: '1934.12.31 — 1935.1.1', desc: '在瓮安猴场召开会议，决定强渡乌江、进军遵义，被称为"伟大转折的前夜"。' },
      { lng: 107.15, lat: 27.05, name: '北渡乌江', date: '1935.1.1 — 3', desc: '在江界河、茶山关等渡口强渡乌江天险，突破黔军乌江防线，随即攻占遵义。',
        heroes: [
          { pid: 'person_mao_zhen_hua', title: '红4团3连连长 · 夜渡乌江第一人' },
          { pid: 'person_geng_biao', title: '红4团团长 · 指挥架桥' },
        ] },
      { lng: 106.93, lat: 27.73, major: true, name: '遵义会议', date: '1935.1.15 — 17', desc: '纠正"左"倾军事错误，确立毛泽东在党和红军中的领导地位，是党的历史上生死攸关的转折点。' },
      { lng: 105.88, lat: 28.32, name: '土城战斗', date: '1935.1.28', desc: '土城战斗受阻，红军果断撤出战斗，随即一渡赤水摆脱敌军。' },
      { lng: 105.73, lat: 28.31 },
      { lng: 105.40, lat: 28.10 },
      { lng: 105.08, lat: 27.85, name: '扎西整编', date: '1935.2.5 — 9', desc: '在扎西召开会议并整编部队，缩编机关、充实连队，作出回师东进的决策。' },
      { lng: 105.55, lat: 28.00 },
      { lng: 106.03, lat: 28.15 },
      { lng: 106.87, lat: 28.02, name: '娄山关大捷', date: '1935.2.25 — 26', desc: '二渡赤水后回师黔北，先取桐梓、再夺娄山关，为再占遵义扫清通道。',
        heroes: [
          { pid: 'person_peng_de_huai', title: '红三军团军团长 · 前敌指挥' },
          { pid: 'person_deng_ping', title: '红三军团参谋长 · 遵义战役中牺牲', flag: 'kia' },
        ] },
      { lng: 107.05, lat: 27.52, name: '二战遵义', date: '1935.2.27 — 28', desc: '乘胜再占遵义，并在城南老鸦山、忠庄铺击溃吴奇伟纵队，遵义战役共歼敌两个师又八个团，是长征以来最大的一次胜利。' },
      { lng: 106.42, lat: 27.97 },
      { lng: 106.30, lat: 27.95 },
      { lng: 105.95, lat: 28.02 },
      { lng: 105.98, lat: 28.12 },
      { lng: 106.03, lat: 28.14, major: true, labelDir: 'N', name: '四渡赤水', date: '1935.1 — 3', desc: '在川黔滇边往返穿插，四渡赤水出奇兵，跳出数十万敌军的围追堵截。' },
      { lng: 106.42, lat: 27.97 },
      { lng: 106.20, lat: 27.20, name: '南渡乌江', date: '1935.3.31', desc: '在金沙县江口渡口南渡乌江，兵临贵阳、虚指昆明，把滇军调出云南。' },
      { lng: 107.15, lat: 26.45, name: '佯攻贵阳', date: '1935.4', desc: '兵锋直指贵阳，蒋介石急调滇军援黔"救驾"，红军乘虚挥师西进云南。' },
      { lng: 106.40, lat: 25.80 },
      { lng: 104.90, lat: 25.40 },
      { lng: 103.30, lat: 25.35, name: '逼近昆明', date: '1935.4.27 — 29', desc: '大军直逼昆明，迫使滇军回防，红军虚晃一枪转向西北，直插金沙江。' },
      { lng: 102.35, lat: 25.92, major: true, name: '巧渡金沙江', date: '1935.5.3 — 9', desc: '在皎平渡凭7只小船七天七夜渡过金沙江，将追兵远远甩在江南。' },
      { lng: 102.25, lat: 26.58, name: '会理会议', date: '1935.5.12', desc: '统一了思想，决定继续北上，与红四方面军会合。' },
      { lng: 102.16, lat: 28.54, name: '彝海结盟', date: '1935.5.22', desc: '刘伯承与彝族果基家支首领小叶丹歃血结盟，红军顺利通过彝区。' },
      { lng: 102.31, lat: 29.16, major: true, name: '强渡大渡河', date: '1935.5.24 — 25', desc: '安顺场十七勇士强渡大渡河，占领北岸渡口。',
        heroes: [
          { pid: 'person_yang_dezhi', title: '红1团团长 · 渡河指挥' },
          { pid: 'person_sun_ji_xian', title: '1营营长 · 率队强渡' },
          { pid: 'person_xiong_shang_lin', title: '2连连长 · 首批八勇士领渡' },
        ] },
      { lng: 102.23, lat: 29.91, major: true, name: '飞夺泸定桥', date: '1935.5.29', desc: '红四团昼夜兼程240里，二十二勇士攀着铁索夺占泸定桥。',
        heroes: [
          { pid: 'person_huang_kaixiang', title: '红4团团长' },
          { pid: 'person_yang_chengwu', title: '红4团政治委员' },
          { pid: 'person_liao_da_zhu', title: '1营2连连长 · 突击队队长' },
          { pid: 'person_liu_jin_shan', title: '3连支书 · 突击队副队长' },
          { pid: 'person_liu_zi_hua', title: '2连突击队员 · 二十二勇士之一' },
          { pid: 'person_li_you_lin', title: '2连突击队员 · 二十二勇士之一' },
          { pid: 'person_yang_tian_ming', title: '2连突击队员 · 二十二勇士之一' },
        ] },
      { lng: 102.55, lat: 30.50, major: true, name: '翻越夹金山', date: '1935.6.8 — 12', desc: '翻越长征路上第一座大雪山夹金山。' },
      { lng: 102.36, lat: 30.97, major: true, name: '懋功会师', date: '1935.6.12 — 18', desc: '与红四方面军在达维、懋功地区胜利会师。' },
      { lng: 102.35, lat: 31.30, name: '两河口会议', date: '1935.6.26', desc: '确定集中主力向北进攻、创造川陕甘革命根据地的战略方针；张国焘依仗人多枪多，企图南下川康边，北上南下之争自此公开。' },
      { lng: 102.95, lat: 32.05 },
      { lng: 103.30, lat: 32.62, name: '沙窝会议', date: '1935.8.4 — 6', desc: '重申北上方针，将红一、四方面军混编为左、右两路军，分路北上过草地。' },
      { lng: 102.85, lat: 33.05, major: true, name: '过草地', date: '1935.8.21 — 28', desc: '从毛儿盖出发穿越松潘草地，环境极其恶劣，许多战士长眠于此。' },
      { lng: 103.25, lat: 33.38 },
      { lng: 103.93, lat: 34.09, major: true, name: '激战腊子口', date: '1935.9.17', desc: '攻克天险腊子口，打开了北进甘陕的通道。',
        heroes: [
          { pid: 'person_huang_kaixiang', title: '红4团团长' },
          { pid: 'person_yang_chengwu', title: '红4团政治委员' },
          { pid: 'person_mao_zhen_hua', title: '3连连长 · 率全连攀崖迂回立大功' },
          { pid: 'person_yun_gui_chuan', title: '苗族小战士 · 率先攀上绝壁' },
        ] },
      { lng: 104.47, lat: 34.37, name: '哈达铺整编', date: '1935.9.18 — 22', desc: '从报纸上获知陕北有红军根据地，部队整编为陕甘支队，决定落脚陕北。' },
      { lng: 106.25, lat: 35.50, name: '翻越六盘山', date: '1935.10.7', desc: '翻越长征途中最后一座大山六盘山。' },
      { lng: 107.13, lat: 36.75, name: '洪德城战斗', date: '1935.10.14', desc: '在环县洪德城消灭地主武装的战斗中，"乌江英雄"毛振华壮烈牺牲，年仅25岁。',
        heroes: [
          { pid: 'person_mao_zhen_hua', title: '红4团3连连长 · 壮烈牺牲', flag: 'kia' },
        ] },
      { lng: 108.38, lat: 36.55, major: true, name: '到达吴起镇', date: '1935.10.19', desc: '抵达陕北吴起镇，与陕北红军会合，中央红军长征胜利结束。' }
    ]
  },
  {
    id: 'r2',
    name: '红二方面军',
    period: '1935.11 — 1936.10',
    mileage: '近二万里',
    line: '#64b5f6',
    text: '#90caf9',
    nodes: [
      { lng: 110.16, lat: 29.40, major: true, name: '桑植出发', date: '1935.11.19', desc: '红二、六军团1.7万余人从桑植刘家坪出发，开始长征。',
        heroes: [
          { pid: 'person_he_long', title: '红二、六军团总指挥' },
          { pid: 'person_ren_bishi', title: '红二、六军团政治委员' },
          { pid: 'person_xiao_ke', title: '红六军团军团长' },
        ] },
      { lng: 110.45, lat: 28.85, name: '突破澧水沅江', date: '1935.11.20 — 21', desc: '一夜之间连续突破澧水、沅江两道封锁线。' },
      { lng: 110.90, lat: 27.85, major: true, name: '湘中转战', date: '1935.12', desc: '进占辰溪、溆浦、新化、蓝田等地，威震湘中，筹粮扩红。' },
      { lng: 108.22, lat: 27.51, name: '石阡会议', date: '1936.1.11 — 19', desc: '在石阡召开会议，决定转移到黔西、大定、毕节地区创建根据地。' },
      { lng: 106.15, lat: 26.88, name: '突破鸭池河', date: '1936.2.2', desc: '抢渡鸭池河天险，进占黔西县城。' },
      { lng: 105.29, lat: 27.28, major: true, name: '进占毕节', date: '1936.2', desc: '在大定、毕节创建川滇黔根据地，成立中华苏维埃共和国川滇黔省革命委员会，扩红5000余人。' },
      { lng: 104.25, lat: 27.00, major: true, name: '乌蒙回旋战', date: '1936.2 — 3', desc: '在乌蒙山区与敌周旋近月，转战千余里，跳出重围。',
        heroes: [
          { pid: 'person_he_long', title: '红二、六军团总指挥' },
          { pid: 'person_xiao_ke', title: '红六军团军团长' },
        ] },
      { lng: 104.50, lat: 25.72, name: '盘县会议', date: '1936.3.30', desc: '决定放弃在南盘江一带建立根据地的计划，北上与红四方面军会合。' },
      { lng: 102.55, lat: 25.35 },
      { lng: 99.95, lat: 26.98, major: true, name: '石鼓渡金沙江', date: '1936.4.25 — 28', desc: '从丽江石鼓镇一线渡过金沙江，跳出重围。' },
      { lng: 99.70, lat: 27.83, name: '中甸休整', date: '1936.5.1 — 5', desc: '翻越雅哈雪山，进占中甸（今香格里拉），休整筹粮。' },
      { lng: 99.70, lat: 28.10, name: '翻越大小雪山', date: '1936.5 — 6', desc: '穿越沙鲁里山大小雪山，经乡城、稻城分两路北上。' },
      { lng: 99.99, lat: 31.62, major: true, name: '甘孜会师', date: '1936.6.30 — 7.2', desc: '与红四方面军在甘孜胜利会师，7月5日组成红二方面军。' },
      { lng: 101.90, lat: 32.95, major: true, name: '过草地', date: '1936.7 — 8', desc: '经阿坝横跨松潘草地，月底到达包座地区。' },
      { lng: 105.73, lat: 33.75, name: '成徽两康战役', date: '1936.9', desc: '发动成徽两康战役，占领成县、徽县、两当、康县，建立临时根据地。' },
      { lng: 105.80, lat: 35.95, major: true, name: '将台堡会师', date: '1936.10.22', desc: '与红一方面军在将台堡会师，红军三大主力长征胜利结束。' }
    ]
  },
  {
    id: 'r3',
    name: '红四方面军',
    period: '1935.3 — 1936.10',
    mileage: '一万余里',
    line: '#81c784',
    text: '#a5d6a7',
    nodes: [
      { lng: 105.94, lat: 31.73, major: true, name: '强渡嘉陵江', date: '1935.3.28 — 4.21', desc: '于苍溪塔子山强渡嘉陵江，发起嘉陵江战役，撤离川陕根据地，开始长征。',
        heroes: [
          { pid: 'person_xu_xiangqian', title: '红四方面军总指挥' },
        ] },
      { lng: 105.35, lat: 32.20, major: true, name: '攻克剑门关', date: '1935.4.2', desc: '攻克"天下雄关"剑门关，控制嘉陵江西岸。' },
      { lng: 103.90, lat: 31.95, name: '土门战役', date: '1935.5.1 — 16', desc: '发起土门战役，进占茂县，为接应中央红军北上打开通道。' },
      { lng: 102.36, lat: 30.97 },
      { lng: 102.17, lat: 31.91 },
      { lng: 101.90, lat: 32.95 },
      { lng: 103.25, lat: 31.82 },
      { lng: 103.05, lat: 30.95 },
      { lng: 102.62, lat: 30.35 },
      { lng: 103.09, lat: 30.12, major: true, name: '百丈关战役', date: '1935.11', desc: '南下转战宝兴、天全、芦山，百丈关决战失利，被迫西撤康北。' },
      { lng: 101.13, lat: 31.00 },
      { lng: 100.68, lat: 31.40, name: '西进康北', date: '1936.2 — 4', desc: '翻越折多山，转进道孚、炉霍、甘孜地区，休整等待红二方面军。' },
      { lng: 99.99, lat: 31.62 },
      { lng: 102.30, lat: 32.60, major: true, name: '三过草地', date: '1936.7 — 8', desc: '与红二方面军共同北上，红四方面军第三次穿越松潘草地。' },
      { lng: 104.03, lat: 34.37, name: '岷洮西战役', date: '1936.8 — 9', desc: '发起岷洮西战役，控制岷县、洮州、西固间广大地区。' },
      { lng: 105.35, lat: 35.70, major: true, name: '会宁会师', date: '1936.10.9', desc: '与红一方面军在甘肃会宁会师。' }
    ]
  },
  {
    id: 'r4',
    name: '红二十五军',
    period: '1934.11 — 1935.9',
    mileage: '近万里',
    line: '#9575cd',
    text: '#b39ddb',
    nodes: [
      { lng: 114.45, lat: 32.10, major: true, name: '何家冲出发', date: '1934.11.16', desc: '从罗山县何家冲出发，作为长征"北上先锋"开始转移。',
        heroes: [
          { pid: 'person_cheng_zihua', title: '军长' },
          { pid: 'person_wu_huan_xian', title: '政治委员' },
          { pid: 'person_xu_haidong', title: '副军长' },
        ] },
      { lng: 113.01, lat: 33.25, major: true, name: '独树镇战斗', date: '1934.11.26', desc: '血战方城独树镇，突破重围，经由伏牛山区西进。',
        heroes: [
          { pid: 'person_xu_haidong', title: '副军长 · 一线督战' },
          { pid: 'person_wu_huan_xian', title: '政治委员 · 持刀率队反击' },
        ] },
      { lng: 110.61, lat: 33.70, name: '庾家河战斗', date: '1934.12.10', desc: '恶战丹凤庾家河，击退敌军轮番进攻，徐海东、程子华身负重伤。',
        heroes: [
          { pid: 'person_xu_haidong', title: '副军长 · 负重伤仍指挥' },
          { pid: 'person_cheng_zihua', title: '军长 · 双手负重伤' },
        ] },
      { lng: 109.70, lat: 33.65, major: true, name: '开辟鄂豫陕苏区', date: '1935.1 — 4', desc: '创建鄂豫陕革命根据地，部队由2900余人发展到3700余人。' },
      { lng: 108.85, lat: 34.05, major: true, name: '威逼西安', date: '1935.7.13 — 16', desc: '北出秦岭，前锋直抵西安以南子午镇，调动敌军西援。' },
      { lng: 106.25, lat: 33.92 },
      { lng: 105.73, lat: 35.48, major: true, name: '切断西兰公路', date: '1935.8.15 — 17', desc: '攻克静宁县城，切断西兰公路交通线达18天，有力配合主力红军行动。' },
      { lng: 107.37, lat: 35.11, name: '四坡村战斗', date: '1935.8.21', desc: '泾川四坡村战斗歼敌一部，军政委吴焕先壮烈牺牲。',
        heroes: [
          { pid: 'person_wu_huan_xian', title: '政治委员 · 身先士卒', flag: 'kia' },
        ] },
      { lng: 110.05, lat: 36.72, major: true, name: '永坪会师', date: '1935.9.15', desc: '到达延川永坪镇，与红二十六、二十七军会师，合编为红十五军团。' }
    ]
  }
];

/* 节点详情扩写（key: 路线id|节点名；detail 为正文段落，significance 为历史意义） */
const ROUTE_NODE_DETAILS = {
  /* —— 红一方面军（中央红军） —— */
  'r1|于都出发': {
    detail: [
      '1934年10月，第五次反"围剿"失败，中央苏区日益缩小。中共中央、中革军委机关及直属队编为两个纵队，与红一、红三、红五、红八、红九军团共8.6万余人，从瑞金、于都、会昌等地出发，准备向湘西转移，与红二、六军团会合。',
      '出发前，于都河上架起数座浮桥，苏区百姓连夜送粮送草、送儿参军。为隐蔽意图，红军主力夜行晓宿，连渡数日夜，踏上漫漫长征路。'
    ],
    significance: '长征开始的标志。此后两年间，红军纵横十余省，完成了人类历史上的伟大远征。'
  },
  'r1|突破三道封锁线': {
    detail: [
      '国民党军在红军西进路上预设三道封锁线：第一道在安远、信丰间的赣南桃江一线，第二道在汝城、城口间的湘粤边，第三道在良田、宜章间的湘南。',
      '红军先头部队接连破关夺隘，并借道粤军防区，于11月中旬全部通过三道封锁线。但"大搬家"式的转移使部队行动迟缓，五天行程仅百余里，也为此后湘江之险埋下隐患。'
    ]
  },
  'r1|血战湘江': {
    detail: [
      '蒋介石调集近30万兵力，在湘江以东布下第四道封锁线，妄图将红军歼灭于湘江东岸。11月27日起，红一、红三军团分别在脚山铺、新圩、光华铺与优势敌军展开血战，掩护中央纵队抢渡湘江。',
      '界首渡口的浮桥数次被炸又数次修复，江面浮满遗体，当地至今流传"三年不食湘江鱼"之说。担任总后卫的红五军团第34师全军覆没，师长陈树湘被俘后从伤口绞断肠子，壮烈牺牲。',
      '12月1日，中央机关和红军主力渡过湘江，兵力由出发时的8.6万余人锐减至3万余人。'
    ],
    significance: '长征初期最惨烈的一战。惨痛的损失促使广大指战员反思"左"倾错误路线，为遵义会议的召开埋下伏笔。'
  },
  'r1|通道转兵': {
    detail: [
      '湘江之战后，蒋介石判明红军将北出湘西与红二、六军团会合，集结近20万重兵布好口袋阵。危急关头，中革军委于12月12日在通道县城召开负责人紧急会议。',
      '毛泽东力主放弃原定计划，转兵敌人兵力薄弱的贵州。这一建议得到多数与会者赞同，红军遂改道西进，避免了一次覆灭性的危机。'
    ],
    significance: '长征中战略方针的首次重大转变，是毛泽东正确主张重新影响中央决策的开端。'
  },
  'r1|黎平会议': {
    detail: [
      '12月18日，中共中央在贵州黎平召开政治局会议，经过激烈争论，否定博古、李德坚持北上湘西的原定计划，通过《中央政治局关于战略方针之决定》，确定在川黔边建立新根据地。',
      '会后红军经剑河、台江进抵乌江南岸，把十几万追兵远远甩在湘西。'
    ]
  },
  'r1|猴场会议': {
    detail: [
      '1935年1月1日，中央政治局在瓮安猴场召开会议，重申黎平会议决议，作出《关于渡江后新的行动方针的决定》，确定强渡乌江、攻占遵义的行动方针。',
      '会议明确规定作战方针等重大问题须由政治局讨论，实际上开始限制"左"倾领导人的独断指挥，被称为"伟大转折的前夜"。'
    ]
  },
  'r1|北渡乌江': {
    detail: [
      '乌江两岸绝壁千仞、江流湍急，素有"天险"之称。红4团在江界河渡口组织强渡：毛振华率8名战士趁夜潜入刺骨江水，拉着长绳奋力游向对岸，不料被敌发觉，绳索被打断，一名战士牺牲，被迫折返；深夜天降大雪，再放三只竹筏，因水流太急，只有毛振华和其他4名战士乘坐的竹筏悄悄过了江，上岸后潜伏在岩洞中。',
      '天亮后主力发起强攻，毛振华等突然冲入敌人战壕，以迅雷不及掩耳之势压住敌方前沿火力，工兵趁势架起浮桥，红军跨过乌江天险。红三军团亦在茶山关等渡口过江，黔军江防全线崩溃，红军乘胜于1月7日智取遵义城。'
    ]
  },
  'r1|遵义会议': {
    detail: [
      '1935年1月15日至17日，中共中央政治局扩大会议在遵义召开，集中纠正"左"倾军事路线错误，取消博古、李德的最高军事指挥权，增选毛泽东为政治局常委。',
      '会后确定毛泽东、周恩来、王稼祥组成三人军事指挥小组，负责全权处理军事指挥问题。'
    ],
    significance: '党的历史上一个生死攸关的转折点，标志着中国共产党第一次独立自主地解决中国革命的重大问题。'
  },
  'r1|土城战斗': {
    detail: [
      '遵义会议后，中央决定北渡长江与红四方面军会合。1月28日，红三、红五军团在土城以东青杠坡对尾追的川军郭勋祺部发起攻击，因情报有误，敌兵力实为万余人而非预估的四个团，战斗陷入胶着。',
      '毛泽东当机立断撤出战斗，率红军一渡赤水，改道川南，摆脱了被动局面。'
    ]
  },
  'r1|扎西整编': {
    detail: [
      '2月上旬，中央政治局在扎西（今云南威信）连续召开会议，讨论通过《遵义会议决议》，决定暂缓执行北渡长江计划，回师东进、再渡赤水，并部署创建川滇黔根据地。',
      '部队同时进行整编：缩编机关、精简笨重器材、充实连队，全军轻装利行，机动能力大为增强。'
    ]
  },
  'r1|娄山关大捷': {
    detail: [
      '2月下旬，红军二渡赤水回师黔北，红三军团先取桐梓，再夺娄山关。娄山关雄踞大娄山脉最高处，是扼守遵义的北大门。',
      '红12、13团与守敌反复争夺关口，彭德怀亲临前线指挥。夺关后红军乘胜追击，再占遵义城，此役歼灭和击溃敌军两个师又八个团，俘敌约3000人。'
    ],
    significance: '长征以来最大的一次胜利，极大振奋了全军士气。毛泽东过关后写下《忆秦娥·娄山关》："雄关漫道真如铁，而今迈步从头越。"'
  },
  'r1|四渡赤水': {
    detail: [
      '1月至3月，毛泽东指挥中央红军在川黔滇边往返穿插：一渡赤水入川南，二渡赤水回黔北，三渡赤水再入川南，四渡赤水折返黔北。',
      '随后红军南渡乌江、兵临贵阳、虚指昆明，把数十万追堵之敌拖得团团转，最终巧渡金沙江，彻底跳出包围圈。'
    ],
    significance: '毛泽东军事指挥艺术的"得意之笔"，以3万之师牵着数十万敌军走，成为运动战的典范。'
  },
  'r1|南渡乌江': {
    detail: [
      '3月31日，红军主力在金沙县江口、大塘等渡口南渡乌江，跳出了敌军在川黔边的合围圈。',
      '此时蒋介石正坐镇贵阳督战，城内兵力空虚。红军兵锋直指贵阳，又突然折向西南做出攻打昆明之势，调动滇军回援云南，为北渡金沙江创造了战机。'
    ]
  },
  'r1|巧渡金沙江': {
    detail: [
      '4月29日，中革军委发出速渡金沙江的指示。红1军团直插龙街渡、红3军团抢占洪门渡，军委纵队直趋皎平渡。',
      '皎平渡仅有7只小船，大船每次载30余人、小船载10余人，37名船工轮班摆渡、昼夜不停。5月3日至9日，3万红军七天七夜全部渡江，追兵赶到江边时，红军早已远去。'
    ]
  },
  'r1|会理会议': {
    detail: [
      '5月12日，中央政治局在会理城郊铁厂召开扩大会议，统一对机动作战方针的认识，批评了林彪"尽走弓背路"的抱怨情绪，决定继续北上与红四方面军会合。',
      '会后红军经西昌、冕宁北上，进入大凉山彝族聚居区。'
    ]
  },
  'r1|彝海结盟': {
    detail: [
      '5月22日，红军先遣队进入大凉山彝区。因历史上民族隔阂较深，先头部队一度被彝民阻拦、物资被夺，红军坚持不向受苦的彝民开枪。',
      '刘伯承与彝族果基家支首领小叶丹在冕宁彝海边歃血为盟、结为兄弟，并授予"中国夷民红军沽鸡支队"旗帜。小叶丹派人护送红军顺利通过百里彝区，为抢渡大渡河赢得了宝贵时间。'
    ],
    significance: '党的民族政策的第一次伟大实践，"彝海结盟"成为民族团结的千古佳话。'
  },
  'r1|强渡大渡河': {
    detail: [
      '大渡河水深流急、两岸群山陡峭，70年前太平天国石达开的20万大军即覆灭于此。5月24日夜，红1团冒雨奔袭安顺场，歼守敌两个连，夺得一只木船。',
      '25日晨，2连连长熊尚林率8名勇士乘仅有的一只木船第一批强渡，营长孙继先率第二批跟进，在"神炮手"赵章成仅存三发炮弹三发三中的掩护下抢占北岸滩口，击溃守敌，控制渡口。但因水流太急无法架桥，几只小船难以在短期内渡过数万大军，全军遂沿大渡河西岸奔袭泸定桥。'
    ]
  },
  'r1|飞夺泸定桥': {
    detail: [
      '5月28日晨，红4团接到"29日夺取泸定桥"的命令，此时距泸定桥还有240里山路。全团昼夜兼程，翻山越岭，还击退沿途阻敌，于29日晨按时赶到桥头。',
      '泸定桥由13根铁索横跨大渡河，桥板已被拆除，只剩铁索寒光。下午4时，2连连长廖大珠率22名突击队员携带短枪、马刀和手榴弹，在全团火力掩护下攀踏铁索向对岸冲击；接近桥头时川军突然施放火障，廖大珠率先冲过火墙，率队攻入泸定城展开巷战，后续部队跟进占领该城，魏小三、刘大贵、王洪山、李富仁4名队员牺牲。与此同时，红1师和干部团击溃川军阻击，胜利到达泸定城策应。',
      '中央红军主力由此从泸定桥上越过天险大渡河，粉碎了蒋介石歼灭红军于大渡河以南的企图。',
      '战事惨烈、行军仓促，突击队22人的姓名当时未及完整登记。经党史文物工作者多年查证，现已确认廖大珠、刘金山、刘梓华、李友林、杨田铭、云贵川、王海云、赵长发及牺牲的魏小三、刘大贵、王洪山、李富仁等12人，其中5人为江西籍。如今泸定桥畔的纪念碑公园竖立着22根石柱，尚未查明的勇士以无名英雄的形式永受瞻仰。'
    ],
    significance: '彻底粉碎了蒋介石让红军做"石达开第二"的图谋，是长征中具有战略意义的胜利。'
  },
  'r1|翻越夹金山': {
    detail: [
      '6月8日红军突破芦山、宝兴防线，来到夹金山下。夹金山海拔4900多米，终年积雪、空气稀薄，当地民谣称"夹金山，夹金山，鸟儿飞不过，人不攀"。',
      '6月12日起，红军将士单衣草鞋、拄棍执冰，顶着风雪冰雹翻越雪山，体弱的战士坐下歇息便再没能站起来。翻过山顶，先头部队在达维镇与红四方面军接应部队会合。'
    ]
  },
  'r1|懋功会师': {
    detail: [
      '6月12日，红一方面军先头部队在达维与红四方面军一部会师；18日，中共中央与红四方面军主力在懋功（今小金）地区会合。',
      '两大主力会师使红军总兵力达10万余人，士气大振。会师后中央确定北上建立川陕甘根据地的战略方针，但张国焘主张向川康边退却，双方展开激烈争论。'
    ]
  },
  'r1|过草地': {
    detail: [
      '8月21日，红军从毛儿盖出发进入松潘草地。草地纵横约600里、海拔3500米以上，河道迂回，草甸之下泥潭深不见底，"人陷不见颈，马陷不见头"。',
      '红军行军七昼夜，缺粮断炊，以野菜、草根乃至皮带充饥；夜晚风雨雹雪交加，战士们背靠背坐着过夜。无数伤病体弱的战士长眠于此。'
    ],
    significance: '长征中最艰苦的一段行程，红军以惊人的毅力战胜了死亡的威胁。'
  },
  'r1|激战腊子口': {
    detail: [
      '腊子口是岷山山脉的重要隘口，两壁绝峰对峙，隘口宽不过数丈，腊子河从中奔涌而下，一座木桥连接两山，是北上的唯一通道。红4团正面强攻屡屡受挫，敌军凭险固守。',
      '夜间，外号"云贵川"的苗族小战士用带铁钩的长竿率先攀上腊子口东南侧的绝壁，放下绳索接应迂回部队；毛振华亦带全连解下绑腿拧成绳索攀上悬崖，神兵天降般出现在敌人背后。拂晓时分，正面强攻与背后奇袭上下夹击，红军攻占腊子口，打开了北进甘陕的大门。'
    ]
  },
  'r1|哈达铺整编': {
    detail: [
      '9月18日，红军进占岷县哈达铺。毛泽东等从缴获的《大公报》等报纸上得知陕北有刘志丹领导的红军和根据地，遂作出把长征落脚点放在陕北的重大决策。',
      '22日，部队整编为陕甘支队，彭德怀任司令员、毛泽东任政治委员，全军7000余人。毛泽东向干部宣布：到陕北去，那里就是我们的落脚点。'
    ]
  },
  'r1|翻越六盘山': {
    detail: [
      '10月7日，陕甘支队在固原青石嘴歼灭敌骑兵两个连，缴获战马百余匹，红军自此有了自己的骑兵侦察连。',
      '随后部队翻越长征途中最后一座大山——六盘山。毛泽东立于山巅，望长空雁阵，吟出"不到长城非好汉"的豪迈词章。'
    ]
  },
  'r1|洪德城战斗': {
    detail: [
      '10月14日，陕甘支队行至甘肃省环县洪德城，在消灭当地地主武装的战斗中，"乌江英雄"、红4团3连连长毛振华壮烈牺牲，年仅25岁。',
      '5天后，中央红军到达吴起镇，胜利结束长征——毛振华却没能看到这一天。杨成武悲痛地说："我们失去了一员虎将。"'
    ]
  },
  'r1|到达吴起镇': {
    detail: [
      '10月19日，陕甘支队抵达陕北苏区门户吴起镇，与陕北红军会合。敌骑兵四个团一路尾追，红军在吴起镇附近设伏将其击溃，"切掉了尾巴"。',
      '至此，中央红军历时一年、纵横11省、行程二万五千里的长征胜利结束。毛泽东总结说："长征是宣言书，长征是宣传队，长征是播种机。"'
    ],
    significance: '中央红军长征胜利结束的标志，陕北由此成为中国革命的大本营。'
  },

  /* —— 红二方面军（红二·六军团） —— */
  'r2|桑植出发': {
    detail: [
      '1935年11月19日，贺龙、任弼时率红二、六军团1.7万余人，从桑植刘家坪等地出发，告别经营两年的湘鄂川黔根据地，开始战略转移。',
      '出发前部队扩充新兵数千，赶制冬衣、筹足粮弹。为掩护主力，红18师先期留在根据地牵制敌军，一个多月后才辗转归队。'
    ]
  },
  'r2|突破澧水沅江': {
    detail: [
      '11月20日夜，前卫部队以突然动作抢渡澧水，炸毁敌军江防工事；21日又强渡沅江，一夜之间连破两道封锁线。',
      '红军随即兵分两路直插湘中，把追剿的重兵远远甩在身后。'
    ]
  },
  'r2|湘中转战': {
    detail: [
      '12月初，红军进占辰溪、溆浦、新化、蓝田等地，休整一周，发动群众、筹粮筹款、扩充新兵3000余人。',
      '红军在湘中的突然出现令国民党当局震动，急调重兵合围。红二、六军团乘敌合围未成，毅然撤出湘中，向黔东转移。'
    ]
  },
  'r2|石阡会议': {
    detail: [
      '1936年1月，红军连克石阡、镇远，在石阡休整并召开两次军委会议。此时敌军重兵压境，原拟在石阡、镇远一带创建根据地的计划已难以实现。',
      '会议决定西渡乌江，转移到黔西、大定、毕节地区建立新的根据地。'
    ]
  },
  'r2|突破鸭池河': {
    detail: [
      '2月2日拂晓，红军便衣队化装成赶集百姓混占鸭池河渡口，控制对岸险要，主力乘船筏抢渡，一举突破乌江上游天险。',
      '红军乘胜进占黔西县城，打开了进入黔大毕地区的大门。'
    ]
  },
  'r2|进占毕节': {
    detail: [
      '2月上旬，红军连克大定、毕节，随即展开创建根据地的工作：成立中华苏维埃人民共和国川滇黔省革命委员会，建立数十个区乡苏维埃政权，扩红5000余人。',
      '部队在此休整近20天，补充被服给养，是红二、六军团长征途中难得的黄金时期。'
    ]
  },
  'r2|乌蒙回旋战': {
    detail: [
      '2月底，敌军重兵进逼，红军撤出毕节向乌蒙山区转移。乌蒙山层峦叠嶂、气候严寒，红军在方圆千里的山区与十倍之敌兜圈子。',
      '一个月间，部队转战千余里，时而南下、时而西进，声东击西，把敌军拖得疲惫不堪，终于从敌军两纵队之间的空隙穿插而出，跳出重围。',
      '毛泽东后来称赞：二、六军团在乌蒙山打转转，你们一万人，走过来还是一万人，没有蚀本，是个了不起的奇迹。'
    ]
  },
  'r2|盘县会议': {
    detail: [
      '3月30日，红军进占滇黔交界的盘县，军委分会召开会议。此时已确知红四方面军位于西康道孚、炉霍一线，会议决定放弃在南盘江一带建立根据地的计划，北上与红四方面军会合。',
      '次日全军西进，以神速动作越过敌人封锁线，直趋金沙江岸。'
    ]
  },
  'r2|石鼓渡金沙江': {
    detail: [
      '4月25日起，红军在丽江石鼓至巨甸一线的江面上，凭仅有的几只木船和几十只木筏昼夜摆渡，四天三夜全部渡过金沙江。',
      '追兵赶到江边，红军已进入康藏高原，敌人追剿计划再度落空。'
    ]
  },
  'r2|中甸休整': {
    detail: [
      '5月初，红军翻越海拔4000多米的雅哈雪山，进占中甸（今香格里拉）。红军严守纪律、尊重藏俗，赢得僧俗群众信任。',
      '部队在中甸休整筹粮，归化寺开仓售粮数万斤。随后全军分两路北上，经乡城、稻城向甘孜进发。'
    ]
  },
  'r2|翻越大小雪山': {
    detail: [
      '5月至6月，红军穿越沙鲁里山的大小雪山群，翻越海拔4500米以上的雪山多座，严寒缺氧、粮秣不济。',
      '沿途藏区人烟稀少，部队以青稞野菜充饥，病员增多，但全军仍保持建制完整、士气高昂，被赞为"一支打不垮、拖不烂的钢铁部队"。'
    ]
  },
  'r2|甘孜会师': {
    detail: [
      '6月30日，红二、六军团与红四方面军在甘孜会师；7月2日举行庆祝大会，朱德、刘伯承亲临讲话。',
      '7月5日，中革军委电令红二、六军团与红32军组成红二方面军，贺龙任总指挥，任弼时任政治委员。会师后红二方面军坚决拥护中央北上方针，随即与红四方面军共同北上。'
    ],
    significance: '红二方面军正式组建，三大主力之一的旗帜由此确立，也直接推动了红四方面军共同北上。'
  },
  'r2|过草地': {
    detail: [
      '7月上旬，红二、红四方面军分三路纵队北上，再度穿越松潘草地。时值雨季，沼泽弥漫，红军备粮不足，以野菜充饥，比第一次过草地更为艰苦。',
      '月底，部队到达包座、巴西地区，打开了出甘南的通道。'
    ]
  },
  'r2|成徽两康战役': {
    detail: [
      '9月初，红二方面军乘敌兵力分散，发动成徽两康战役，半月之内连克成县、徽县、两当、康县四城，歼敌一部，扩大队伍2000余人。',
      '红军在新区建立苏维埃政权、组织游击队，形成临时根据地，有力配合了红一、红四方面军的行动。'
    ]
  },
  'r2|将台堡会师': {
    detail: [
      '10月上中旬，国民党军重兵进犯，红二方面军仓促撤离成徽两康地区，连日抢渡渭水，突破敌军堵截，兼程北上。',
      '10月22日，红二方面军主力在将台堡与红一方面军会师。至此，红军三大主力全部会师陕甘，长征胜利结束。'
    ],
    significance: '红军三大主力会师的最后一步，宣告整个长征以胜利告终。'
  },

  /* —— 红四方面军 —— */
  'r3|强渡嘉陵江': {
    detail: [
      '1935年3月28日夜，红四方面军以苍溪塔子山为主渡口发起嘉陵江战役，百余只木船齐发，强渡成功后连夺对岸险要。',
      '至4月21日，红军攻克阆中、南部、剑阁等九座县城，控制嘉陵江西岸广大地区。战役期间，后方机关、地方武装被全部带走，红四方面军由此撤离川陕根据地，开始长征。'
    ]
  },
  'r3|攻克剑门关': {
    detail: [
      '剑门关号称"天下雄关"，七十二峰如剑插天，是川军江防的支点。4月2日，红军一部攀绝壁迂回关后，与正面部队前后夹击。',
      '经半日激战，红军全歼守军三个团。剑门关既克，敌嘉陵江防线全面崩溃。'
    ]
  },
  'r3|土门战役': {
    detail: [
      '5月上旬，红四方面军发起土门战役，连破敌军封锁，相继攻占茂县、汶川、理番（今理县）一带。',
      '战役打开了向岷江上游前进的通道，红四方面军随即分路西进，策应中央红军北上，为懋功会师创造了条件。'
    ]
  },
  'r3|百丈关战役': {
    detail: [
      '1935年10月，红四方面军按"天芦名雅邛大"战役计划南下，连克宝兴、天全、芦山，兵锋直指名山重镇百丈关。',
      '11月中旬，红军与优势敌军在百丈关一带决战，血战七昼夜，毙伤敌1.5万余人，自身亦伤亡近万。因敌援兵不断，红军被迫撤出战斗，转入防御。',
      '百丈关失利宣告南下方针难以实现，此后红四方面军西撤康北，重新酝酿北上。'
    ],
    significance: '红四方面军南下由盛而衰的转折点，实践证明"南下是绝路"。'
  },
  'r3|西进康北': {
    detail: [
      '1936年2月至4月，红四方面军翻越折多山等大雪山，先后进占道孚、炉霍、甘孜，控制康北广大地区。',
      '部队就地整训，筹集粮秣被服，等待红二、六军团北上。期间朱德、刘伯承等坚持党内团结方针，最终促成红四方面军与红二方面军共同北上。'
    ]
  },
  'r3|三过草地': {
    detail: [
      '7月初，红二、红四方面军分左中右三路纵队北上，红四方面军第三次穿越松潘草地。',
      '时值雨季，草地泥沼更深，部队备粮更少，以野菜、蘑菇乃至皮革充饥，艰苦程度甚于以往。月底全军通过草地，进入包座地区。'
    ]
  },
  'r3|岷洮西战役': {
    detail: [
      '8月上旬至9月中旬，红四方面军发起岷洮西战役，先后攻占漳县、临潭、渭源、通渭等地，控制岷县、洮州、西固间的广大地区。',
      '红军在新开辟的地区建立地方政权、扩大队伍，为三军会师陕甘建立了前进基地。'
    ]
  },
  'r3|会宁会师': {
    detail: [
      '10月9日，红四方面军指挥部抵达会宁，与红一方面军会师。会宁城头红旗招展，两军将士相拥而泣。',
      '红四方面军自1935年3月撤离川陕根据地，历时一年半、三过草地，行程一万余里，至此与中央红军胜利会合。'
    ]
  },

  /* —— 红二十五军 —— */
  'r4|何家冲出发': {
    detail: [
      '1934年11月16日，红25军2980余人从罗山县何家冲出发，打着"中国工农红军北上抗日第二先遣队"的旗帜，开始长征。',
      '出发前部队整编，撤销师一级建制，军长程子华、政委吴焕先、副军长徐海东直接指挥四个团。指战员多为13至18岁的少年，被称"童子军"，却是一支打不垮的钢铁队伍。'
    ]
  },
  'r4|独树镇战斗': {
    detail: [
      '11月26日，红军进至方城县独树镇附近，突遭敌军步骑兵伏击。时值风雪交加，战士们手指冻僵拉不开枪栓，一度陷入被动。',
      '危急时刻，吴焕先手持大刀高呼"坚决顶住"，率队白刃反击；徐海东率223团赶到，反复冲杀，稳住阵线。入夜后红军从敌军间隙突围，穿越许南公路，转入伏牛山区。'
    ],
    significance: '红25军生死攸关的一战，与血战湘江、飞夺泸定桥并称长征中的著名恶仗、血仗。'
  },
  'r4|庾家河战斗': {
    detail: [
      '12月10日，省委在庾家河开会研究建立鄂豫陕根据地问题，敌军一个团突然袭来。红军抢占东山坳口，与敌反复争夺，激战竟日。',
      '副军长徐海东头部负重伤仍坚持指挥，军长程子华双手被打穿。红军打退敌军20余次进攻，将其击溃，站稳了脚跟。'
    ]
  },
  'r4|开辟鄂豫陕苏区': {
    detail: [
      '1935年1月至4月，红25军在鄂豫陕边连续作战，打破敌军两次"围剿"，攻克镇安、山阳、柞水、雒南等县城。',
      '部队由2900余人发展到3700余人，建立了一批县、区、乡苏维埃政权，鄂豫陕根据地初具规模，成为长征途中一块重要的新根据地。'
    ]
  },
  'r4|威逼西安': {
    detail: [
      '7月中旬，红25军北出终南山，前锋直抵西安以南的子午镇，古城为之震动。',
      '在获知中央红军与红四方面军已在川西会师、并将北上的消息后，红25军毅然决定西进甘肃，牵制敌军、配合主力北上，当起了"北上先锋"。'
    ]
  },
  'r4|切断西兰公路': {
    detail: [
      '8月中旬，红军进抵静宁县境，攻占西兰公路沿线要点，拆桥毁路，切断这条通往西北的大动脉达18天，使敌军无法利用公路快速调动。',
      '在兴隆镇、单家集一带的回民聚居区，红军尊重宗教习俗，赢得"仁义之师"的口碑，阿訇率群众抬着礼品慰问红军。'
    ]
  },
  'r4|四坡村战斗': {
    detail: [
      '8月21日，红25军在泾川县城西南的四坡村附近渡汭河时，后卫223团突遭敌军一个团袭击。',
      '军政委吴焕先率军部交通队与学兵连百余人直插敌侧后，激战中身中数弹，壮烈牺牲，年仅28岁。红军随后全歼该敌，为政委报了仇。',
      '吴焕先是长征中牺牲的最高级别红军指挥员之一，被誉为"红二十五军之魂"。'
    ]
  },
  'r4|永坪会师': {
    detail: [
      '9月15日，红25军到达延川县永坪镇，与陕甘苏区的红26、27军会师，成为长征中第一支到达陕北的红军部队。',
      '9月18日，三军合编为红十五军团，徐海东任军团长、程子华任政委。随后劳山、榆林桥两战两捷，为中央红军落脚陕北准备了条件。'
    ],
    significance: '红25军"小长征"胜利结束，为党中央把中国革命的大本营放在陕北作出了重要贡献。'
  }
};

/* 扩写内容并入对应节点 */
ROUTES.forEach(r => r.nodes.forEach(n => {
  const d = ROUTE_NODE_DETAILS[r.id + '|' + n.name];
  if (d) Object.assign(n, d);
}));

const ROUTE_CAPITALS = {
  '北京市': '北京', '天津市': '天津', '上海市': '上海', '重庆市': '重庆',
  '香港特别行政区': '香港', '澳门特别行政区': '澳门',
  '河北省': '石家庄', '山西省': '太原', '内蒙古自治区': '呼和浩特',
  '辽宁省': '沈阳', '吉林省': '长春', '黑龙江省': '哈尔滨',
  '江苏省': '南京', '浙江省': '杭州', '安徽省': '合肥', '福建省': '福州',
  '江西省': '南昌', '山东省': '济南', '河南省': '郑州', '湖北省': '武汉',
  '湖南省': '长沙', '广东省': '广州', '广西壮族自治区': '南宁', '海南省': '海口',
  '四川省': '成都', '贵州省': '贵阳', '云南省': '昆明', '西藏自治区': '拉萨',
  '陕西省': '西安', '甘肃省': '兰州', '青海省': '西宁', '宁夏回族自治区': '银川',
  '新疆维吾尔自治区': '乌鲁木齐', '台湾省': '台北'
};

const ROUTE_RIVERS = [
  {
    name: '赤水河',
    points: [
      [104.65, 27.45], [104.95, 27.52], [105.30, 27.60], [105.62, 27.67],
      [105.95, 27.75], [106.20, 27.84], [106.30, 27.95], [106.18, 28.08],
      [105.98, 28.16], [105.83, 28.25], [105.68, 28.38], [105.62, 28.55]
    ]
  }
];

const RouteMap = {
  svg: null,
  legendEl: null,
  tipEl: null,
  loadingEl: null,
  errorEl: null,
  errorTextEl: null,
  viewport: null,
  projection: null,
  mapWidth: 0,
  mapHeight: 0,
  nodeBBox: null,
  view: { k: 1, x: 0, y: 0 },
  zoomSensitive: [],
  userMoved: false,
  built: false,
  failed: false,
  loadPromise: null,
  loadStart: 0,
  loadingTimer: null,
  resizeTimer: null,
  selected: null,       // { route, node } 当前选中的路线节点
  selMarker: null,
  selReg: null,

  init() {
    this.svg = document.getElementById('route-map');
    this.legendEl = document.getElementById('route-legend');
    this.tipEl = document.getElementById('route-tip');
    this.loadingEl = document.getElementById('route-loading');
    this.errorEl = document.getElementById('route-error');
    this.errorTextEl = document.getElementById('route-error-text');
    document.getElementById('route-retry').addEventListener('click', () => this.load());
    this.bindPanZoom();
    window.addEventListener('resize', () => {
      if (App.view !== 'map' || !this.built) return;
      clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(() => { if (!this.userMoved) this.fitToNodes(); }, 150);
    });
    this.load();
  },

  show() {
    this.svg.classList.remove('hidden');
    this.toggleOverlay('route-title', false);
    this.toggleOverlay('route-note', false);
    this.toggleOverlay('route-hint', false);
    if (this.built) {
      this.legendEl.classList.remove('hidden');
      if (!this.userMoved) this.fitToNodes();
    } else if (this.failed) {
      this.errorEl.classList.remove('hidden');
    } else {
      this.load();
      // 已加载超过 1s 仍未完成 → 立即显示提示；否则交给 load 内部定时器
      if (this.loadPromise && performance.now() - this.loadStart > 1000) this.loadingEl.classList.remove('hidden');
    }
    this.renderPanel();
  },

  hide() {
    this.svg.classList.add('hidden');
    this.toggleOverlay('route-title', true);
    this.toggleOverlay('route-note', true);
    this.toggleOverlay('route-hint', true);
    this.legendEl.classList.add('hidden');
    this.tipEl.classList.add('hidden');
    this.loadingEl.classList.add('hidden');
    this.errorEl.classList.add('hidden');
  },

  toggleOverlay(id, hide) {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('hidden', hide);
  },

  reset() {
    this.userMoved = false;
    this.fitToNodes();
  },

  /* ---------- 节点选中与右侧面板 ---------- */
  selectNode(routeId, idx) {
    const route = ROUTES.find(r => r.id === routeId);
    if (!route) return;
    const n = route.nodes[idx];
    if (!n || !n.name) return;
    this.selected = { route, node: n };
    this.updateSelMarker(route, idx);
    this.renderNodeDetail(route, n);
  },

  clearSelection() {
    this.selected = null;
    if (this.selMarker) this.selMarker.setAttribute('display', 'none');
    this.renderOverview();
  },

  updateSelMarker(route, idx) {
    const pt = this.projection(route.nodes[idx].lng, route.nodes[idx].lat);
    if (!this.selMarker) {
      this.selMarker = svgEl('circle', { class: 'route-sel', fill: 'none', 'stroke-width': 1.6 }, route.gNode);
      this.selReg = { el: this.selMarker, r: 8, sw: 1.6 };
      this.zoomSensitive.push(this.selReg);
    }
    route.gNode.appendChild(this.selMarker);   // 标记随路线显隐
    this.selMarker.removeAttribute('display');
    this.selMarker.setAttribute('cx', pt[0].toFixed(1));
    this.selMarker.setAttribute('cy', pt[1].toFixed(1));
    this.applyDotScale(this.selReg, this.view.k);
  },

  renderPanel() {
    if (App.focusPerson) { Profiler.renderPerson(App.focusPerson); return; }
    if (this.selected) this.renderNodeDetail(this.selected.route, this.selected.node);
    else this.renderOverview();
  },

  renderOverview() {
    document.getElementById('detail-sec-title').textContent = '长征路线 · 总览';
    const rows = ROUTES.map(r => `
      <div class="rm-route-row">
        <span class="legend-sample"><span class="legend-dot" style="background:${r.line}"></span></span>
        <div>
          <div class="legend-name">${r.name}</div>
          <div class="legend-period">${r.period} · <span class="legend-mile">${r.mileage}</span></div>
        </div>
      </div>`).join('');
    document.getElementById('detail-body').innerHTML = `
      <div class="unit-detail">
        <div class="ud-note">1934.10 — 1936.10，红一方面军（中央红军）、红二方面军、红四方面军与红二十五军四路大军先后踏上战略转移之路，纵横十余省、长驱数万里，最终实现三大主力会师陕北的伟大战略转移。</div>
        <div class="rm-routes">${rows}</div>
        <div class="ud-note" style="border-left-color:var(--gold)">点击地图上的路线节点，查看该节点的详细经过与相关人物；点击左上角图例可显隐各路红军路线。</div>
      </div>`;
  },

  renderNodeDetail(route, n) {
    document.getElementById('detail-sec-title').textContent = '路线节点 · 详情';
    const paras = (n.detail && n.detail.length ? n.detail : [n.desc])
      .map(t => `<p class="rm-para">${t}</p>`).join('');
    const heroes = (n.heroes || []).map(h => {
      const p = PEOPLE_MAP[h.pid];
      if (!p) return '';
      return `
        <div class="ud-person" data-pid="${h.pid}">
          <div class="avatar">${p.name[0]}</div>
          <div>
            <div class="p-title">${h.title}</div>
            <div class="p-name">${p.name}${h.flag === 'kia' ? '<span class="p-flag red">（牺牲）</span>' : ''}</div>
          </div>
        </div>`;
    }).join('');
    document.getElementById('detail-body').innerHTML = `
      <div class="unit-detail">
        <div class="ud-name">${n.name}</div>
        <div class="ud-meta">
          <span class="ud-chip" style="color:${route.line};border-color:${route.line}">${route.name}</span>
          <span class="ud-chip" style="color:var(--gold);border-color:rgba(240,165,0,.4)">${n.date}</span>
        </div>
        <h4 class="rm-h4">经 过</h4>
        <div class="rm-detail">${paras}</div>
        ${n.significance ? `<div class="rm-signi"><span class="rs-label">历史意义</span>${n.significance}</div>` : ''}
        ${heroes ? `<div class="ud-changes"><h4>战斗英雄 · 相关人物</h4><div class="ud-persons">${heroes}</div></div>` : ''}
        <button class="rm-back" type="button">‹ 返回路线总览</button>
      </div>`;
    document.getElementById('detail-body').querySelectorAll('.ud-person').forEach(el => {
      el.addEventListener('click', () => App.selectPerson(el.dataset.pid));
    });
    const back = document.querySelector('#detail-body .rm-back');
    if (back) back.addEventListener('click', () => this.clearSelection());
  },

  /* ---------- 数据加载 ---------- */
  load() {
    if (this.built || this.loadPromise) return;
    this.failed = false;
    this.errorEl.classList.add('hidden');
    this.loadStart = performance.now();
    this.scheduleLoadingTip();   // 加载超过 1s 才显示提示
    this.loadPromise = this.fetchGeo()
      .then(geo => { this.buildMap(geo); })
      .catch(err => {
        this.failed = true;
        this.errorTextEl.textContent = (err && err.message) || '地图数据加载失败';
        if (App.view === 'map') this.errorEl.classList.remove('hidden');
      })
      .finally(() => {
        clearTimeout(this.loadingTimer);
        this.loadingTimer = null;
        this.loadPromise = null;
        this.loadingEl.classList.add('hidden');
      });
  },

  /* 1000ms 内加载成功则提示完全不出现，超时仍在加载才显示 */
  scheduleLoadingTip() {
    clearTimeout(this.loadingTimer);
    this.loadingTimer = setTimeout(() => {
      if (!this.built && !this.failed && App.view === 'map') this.loadingEl.classList.remove('hidden');
    }, 1000);
  },

  async fetchGeo() {
    // for (const base of ROUTE_GEO_BASES) {
    //   try {
    //     const res = await fetch(base + '/' + ROUTE_GEO_FILE);
    //     if (!res.ok) continue;
    //     return await res.json();
    //   } catch (err) {
    //     /* 尝试下一个数据源 */
    //   }
    // }
    // throw new Error('地图数据加载失败，请检查本地 data/100000_full.json 或网络连接');
    return Promise.resolve(geoData);
  },

  /* ---------- 几何工具 ---------- */
  mercatorRaw(lng, lat) {
    return [
      (lng - 105) * Math.PI / 180,
      Math.log(Math.tan(Math.PI / 4 + lat * Math.PI / 360))
    ];
  },

  eachRing(geometry, cb) {
    if (geometry.type === 'Polygon') geometry.coordinates.forEach(cb);
    else geometry.coordinates.forEach(poly => poly.forEach(cb));
  },

  eachPoint(geometry, cb) {
    this.eachRing(geometry, ring => ring.forEach(cb));
  },

  ringPath(ring) {
    let d = '';
    for (let i = 0; i < ring.length; i++) {
      const p = this.projection(ring[i][0], ring[i][1]);
      d += (i === 0 ? 'M' : 'L') + p[0].toFixed(1) + ' ' + p[1].toFixed(1);
    }
    return d + 'Z';
  },

  featurePath(geometry) {
    let d = '';
    this.eachRing(geometry, ring => { d += this.ringPath(ring); });
    return d;
  },

  smoothPath(pts) {
    const p = [pts[0]];
    for (let i = 1; i < pts.length - 1; i++) {
      const prev = pts[i - 1], cur = pts[i], next = pts[i + 1];
      const v1x = cur[0] - prev[0], v1y = cur[1] - prev[1];
      const v2x = next[0] - cur[0], v2y = next[1] - cur[1];
      const l1 = Math.hypot(v1x, v1y), l2 = Math.hypot(v2x, v2y);
      const cos = l1 && l2 ? (v1x * v2x + v1y * v2y) / (l1 * l2) : 1;
      if (cos < -0.17) {
        p.push([prev[0] + v1x * 0.7, prev[1] + v1y * 0.7]);
        p.push(cur);
        p.push([cur[0] + v2x * 0.3, cur[1] + v2y * 0.3]);
      } else {
        p.push(cur);
      }
    }
    p.push(pts[pts.length - 1]);
    let d = 'M' + p[0][0].toFixed(1) + ' ' + p[0][1].toFixed(1);
    for (let i = 0; i < p.length - 1; i++) {
      const p0 = p[Math.max(0, i - 1)];
      const p1 = p[i];
      const p2 = p[i + 1];
      const p3 = p[Math.min(p.length - 1, i + 2)];
      const c1x = p1[0] + (p2[0] - p0[0]) / 6;
      const c1y = p1[1] + (p2[1] - p0[1]) / 6;
      const c2x = p2[0] - (p3[0] - p1[0]) / 6;
      const c2y = p2[1] - (p3[1] - p1[1]) / 6;
      d += 'C' + c1x.toFixed(1) + ' ' + c1y.toFixed(1) + ' ' + c2x.toFixed(1) + ' ' + c2y.toFixed(1) + ' ' + p2[0].toFixed(1) + ' ' + p2[1].toFixed(1);
    }
    return d;
  },

  directionAt(pts, i) {
    const prev = pts[Math.max(0, i - 1)];
    const next = pts[Math.min(pts.length - 1, i + 1)];
    const dx = next[0] - prev[0];
    const dy = next[1] - prev[1];
    const len = Math.hypot(dx, dy) || 1;
    return [dx / len, dy / len];
  },

  addArrows(pathEl, gLine, route, pts) {
    const color = route.line;
    const total = pathEl.getTotalLength();
    const n = Math.max(2, Math.min(8, Math.round(total / 160)));
    const skips = (route.arrowSkip || []).map(box => {
      const a = this.projection(box.lng[0], box.lat[1]);
      const b = this.projection(box.lng[1], box.lat[0]);
      return {
        x0: Math.min(a[0], b[0]), x1: Math.max(a[0], b[0]),
        y0: Math.min(a[1], b[1]), y1: Math.max(a[1], b[1])
      };
    });
    const inSkip = p => skips.some(s => p.x >= s.x0 && p.x <= s.x1 && p.y >= s.y0 && p.y <= s.y1);
    const place = t => {
      const p = pathEl.getPointAtLength(t);
      const p1 = pathEl.getPointAtLength(Math.max(0, t - 1));
      const p2 = pathEl.getPointAtLength(Math.min(total, t + 1));
      const ang = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
      const tr = 'translate(' + p.x.toFixed(1) + ' ' + p.y.toFixed(1) + ') rotate(' + ang.toFixed(1) + ')';
      const arrow = svgEl('path', {
        d: 'M0 0 L-10 4.5 L-10 -4.5 Z',
        fill: color,
        opacity: 0.9,
        transform: tr
      }, gLine);
      this.zoomSensitive.push({ el: arrow, arrow: tr });
    };

    let atTs = [];
    if (route.arrowAt && pts) {
      const nodeLens = this.nodeLengths(pathEl, pts);
      atTs = route.arrowAt.map(a => {
        const i0 = route.nodes.findIndex(nd => nd.name === a.between[0]);
        const i1 = route.nodes.findIndex(nd => nd.name === a.between[1]);
        if (i0 < 0 || i1 < 0) return -1;
        return (nodeLens[i0] + nodeLens[i1]) / 2;
      }).filter(t => t >= 0);
      atTs.forEach(place);
    }

    for (let i = 0; i < n; i++) {
      const t = total * (i + 0.5) / n;
      if (atTs.some(tt => Math.abs(tt - t) < 36)) continue;
      const p = pathEl.getPointAtLength(t);
      if (inSkip(p)) continue;
      place(t);
    }
  },

  nodeLengths(pathEl, pts) {
    const total = pathEl.getTotalLength();
    const res = pts.map(() => ({ t: 0, d: Infinity }));
    for (let t = 0; t <= total; t += 3) {
      const p = pathEl.getPointAtLength(t);
      for (let i = 0; i < pts.length; i++) {
        const dx = p.x - pts[i][0], dy = p.y - pts[i][1];
        const d = dx * dx + dy * dy;
        if (d < res[i].d) { res[i].t = t; res[i].d = d; }
      }
    }
    return res.map(r => r.t);
  },

  /* ---------- 标注避让 ---------- */
  textWidth(text, fontSize) {
    let w = 0;
    for (let i = 0; i < text.length; i++) {
      w += fontSize * (text.charCodeAt(i) > 0x2e7f ? 1.0 : 0.58);
    }
    return w;
  },

  labelRect(item, cand) {
    const w = this.textWidth(item.text, item.fontSize);
    let x0;
    if (cand.anchor === 'start') x0 = cand.x;
    else if (cand.anchor === 'end') x0 = cand.x - w;
    else x0 = cand.x - w / 2;
    const pad = 1.4;
    return {
      x0: x0 - pad,
      y0: cand.y - item.fontSize * 0.827 - pad,
      x1: x0 + w + pad,
      y1: cand.y + item.fontSize * 0.111 + pad
    };
  },

  overlapArea(a, b) {
    const ix = Math.min(a.x1, b.x1) - Math.max(a.x0, b.x0);
    const iy = Math.min(a.y1, b.y1) - Math.max(a.y0, b.y0);
    return ix > 0 && iy > 0 ? ix * iy : 0;
  },

  resolveCollisions(items, obstacles) {
    const mapWidth = this.mapWidth, mapHeight = this.mapHeight;
    items.forEach(it => {
      it.rects = it.candidates.map(c => this.labelRect(it, c));
    });
    const contextCost = (it, ci, skip) => {
      const r = it.rects[ci];
      let total = 0;
      if (r.x0 < 2 || r.y0 < 2 || r.x1 > mapWidth - 2 || r.y1 > mapHeight - 2) total += 1e6;
      for (let k = 0; k < obstacles.length; k++) total += this.overlapArea(r, obstacles[k]) * 4;
      for (let k = 0; k < items.length; k++) {
        if (items[k] === it || items[k] === skip) continue;
        total += this.overlapArea(r, items[k].rects[items[k].choice]);
      }
      return total;
    };
    const sweep = () => {
      let improved = false;
      for (let i = 0; i < items.length; i++) {
        const it = items[i];
        let best = it.choice;
        let bestCost = contextCost(it, it.choice, null) + it.choice * 0.4;
        for (let ci = 0; ci < it.candidates.length; ci++) {
          const c = contextCost(it, ci, null) + ci * 0.4;
          if (c < bestCost - 0.5) { bestCost = c; best = ci; }
        }
        if (best !== it.choice) { it.choice = best; improved = true; }
      }
      return improved;
    };
    for (let pass = 0; pass < 12; pass++) {
      if (!sweep()) break;
    }
    const blacklist = new Set();
    for (let round = 0; round < 30; round++) {
      let bi = -1, bj = -1, bArea = 6;
      for (let i = 0; i < items.length; i++) for (let j = i + 1; j < items.length; j++) {
        if (blacklist.has(i + '-' + j)) continue;
        const ar = this.overlapArea(items[i].rects[items[i].choice], items[j].rects[items[j].choice]);
        if (ar > bArea) { bArea = ar; bi = i; bj = j; }
      }
      if (bi < 0) break;
      const it1 = items[bi], it2 = items[bj];
      let bestC1 = it1.choice, bestC2 = it2.choice;
      let bestCost = this.overlapArea(it1.rects[bestC1], it2.rects[bestC2]) +
        contextCost(it1, bestC1, it2) + contextCost(it2, bestC2, it1) + (bestC1 + bestC2) * 0.4;
      let improvedPair = false;
      for (let c1 = 0; c1 < it1.candidates.length; c1++) for (let c2 = 0; c2 < it2.candidates.length; c2++) {
        const cost = this.overlapArea(it1.rects[c1], it2.rects[c2]) +
          contextCost(it1, c1, it2) + contextCost(it2, c2, it1) + (c1 + c2) * 0.4;
        if (cost < bestCost - 0.5) { bestCost = cost; bestC1 = c1; bestC2 = c2; improvedPair = true; }
      }
      if (improvedPair) {
        it1.choice = bestC1;
        it2.choice = bestC2;
      } else {
        blacklist.add(bi + '-' + bj);
      }
    }
    sweep();
    sweep();
  },

  rectPointDist(px, py, rect) {
    const dx = Math.max(rect.x0 - px, 0, px - rect.x1);
    const dy = Math.max(rect.y0 - py, 0, py - rect.y1);
    return Math.hypot(dx, dy);
  },

  nodeLabelCandidates(pt, dir, side, text, fontSize, r, labelDir) {
    const G = 1.5;
    const DIR_ANGLES = { N: -Math.PI / 2, S: Math.PI / 2, E: 0, W: Math.PI };
    const base = labelDir && DIR_ANGLES[labelDir] !== undefined
      ? DIR_ANGLES[labelDir]
      : Math.atan2(dir[0] * side, -dir[1] * side);
    const item = { text, fontSize };
    const out = [];
    for (let i = 0; i < 8; i++) {
      const ux = Math.cos(base + i * Math.PI / 4);
      const uy = Math.sin(base + i * Math.PI / 4);
      let anchor, lx, ly;
      if (Math.abs(ux) >= Math.abs(uy)) {
        anchor = ux > 0 ? 'start' : 'end';
        lx = pt[0] + ux * (r + G + 2);
        ly = pt[1] + uy * 5 + 3;
      } else {
        anchor = 'middle';
        lx = pt[0] + ux * 5;
        ly = pt[1] + uy * (r + G + 6);
      }
      let vx = lx - pt[0];
      let vy = ly - pt[1];
      for (let k = 0; k < 6; k++) {
        const rect = this.labelRect(item, { x: pt[0] + vx, y: pt[1] + vy, anchor });
        const err = this.rectPointDist(pt[0], pt[1], rect) - (r + G);
        if (Math.abs(err) < 0.15) break;
        const len = Math.hypot(vx, vy) || 1;
        const newLen = Math.max(1, len - err);
        vx *= newLen / len;
        vy *= newLen / len;
      }
      out.push({ x: pt[0] + vx, y: pt[1] + vy, anchor });
    }
    return out;
  },

  /* ---------- 画布构建 ---------- */
  buildMap(geo) {
    let minX = 1e9, maxX = -1e9, minY = 1e9, maxY = -1e9;
    geo.features.forEach(f => this.eachPoint(f.geometry, pt => {
      const p = this.mercatorRaw(pt[0], pt[1]);
      if (p[0] < minX) minX = p[0];
      if (p[0] > maxX) maxX = p[0];
      if (p[1] < minY) minY = p[1];
      if (p[1] > maxY) maxY = p[1];
    }));

    const PAD = 12;
    const W = 1080;
    const scale = (W - PAD * 2) / (maxX - minX);
    const H = Math.round((maxY - minY) * scale + PAD * 2);
    this.mapWidth = W;
    this.mapHeight = H;

    this.projection = (lng, lat) => {
      const p = this.mercatorRaw(lng, lat);
      return [(p[0] - minX) * scale + PAD, (maxY - p[1]) * scale + PAD];
    };
    const projection = this.projection;

    const svg = this.svg;
    svg.innerHTML = '';
    this.zoomSensitive.length = 0;
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    svg.setAttribute('font-family', ROUTE_FONT);

    this.viewport = svgEl('g', { id: 'route-viewport' }, svg);

    const gProv = svgEl('g', { fill: 'none', stroke: '#4a443c', 'stroke-width': 0.9, 'stroke-linejoin': 'round' }, this.viewport);
    const gJD = svgEl('g', { fill: '#5f594f', stroke: 'none' }, this.viewport);
    const gRiver = svgEl('g', { fill: 'none', stroke: '#44607c', 'stroke-width': 2.2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, this.viewport);
    this.gRiver = gRiver;
    const gRouteLines = svgEl('g', { fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, this.viewport);
    const gCap = svgEl('g', { 'font-size': 8.5, 'font-weight': 500, fill: '#948d7d', 'paint-order': 'stroke', stroke: '#151515', 'stroke-width': 1.8, 'stroke-linejoin': 'round' }, this.viewport);
    const gRouteNodes = svgEl('g', {}, this.viewport);

    const labelItems = [];

    geo.features.forEach(f => {
      const p = f.properties;
      const isJD = p.adchar === 'JD' || p.adcode === '100000_JD';
      const d = this.featurePath(f.geometry);
      if (isJD) {
        svgEl('path', { d }, gJD);
        return;
      }
      svgEl('path', { d, 'vector-effect': 'non-scaling-stroke' }, gProv);

      const capital = ROUTE_CAPITALS[p.name];
      if (capital && p.center) {
        const t = projection(p.center[0], p.center[1]);
        const capDot = svgEl('circle', { cx: t[0].toFixed(1), cy: t[1].toFixed(1), r: 1.7, fill: '#948d7d', stroke: '#151515', 'stroke-width': 0.8 }, gCap);
        this.zoomSensitive.push({ el: capDot, r: 1.7, sw: 0.8 });
        labelItems.push({
          text: capital,
          fontSize: 8.5,
          candidates: [
            { x: t[0], y: t[1] + 9.5, anchor: 'middle' },
            { x: t[0] + 6, y: t[1] + 9.5, anchor: 'start' },
            { x: t[0] - 6, y: t[1] + 9.5, anchor: 'end' },
            { x: t[0], y: t[1] - 6, anchor: 'middle' }
          ],
          choice: 0,
          create: (cand) => {
            const capText = svgEl('text', { x: cand.x.toFixed(1), y: cand.y.toFixed(1), 'text-anchor': cand.anchor, 'pointer-events': 'none', text: capital }, gCap);
            this.zoomSensitive.push({ el: capText, fs: 8.5, sw: 1.8, nx: t[0], ny: t[1], bx: cand.x, by: cand.y });
          }
        });
      }
    });

    ROUTE_RIVERS.forEach(river => {
      const pts = river.points.map(p => projection(p[0], p[1]));
      svgEl('path', { d: this.smoothPath(pts), 'vector-effect': 'non-scaling-stroke' }, gRiver);
      const ep = pts[pts.length - 1];
      const lx = ep[0] - 3.5;
      const ly = ep[1] + 3;
      const riverLabel = svgEl('text', {
        x: lx.toFixed(1), y: ly.toFixed(1),
        'text-anchor': 'end', 'font-size': 10, 'font-weight': 600, fill: '#7d94ab',
        'paint-order': 'stroke', stroke: '#151515', 'stroke-width': 2.7, 'stroke-linejoin': 'round',
        'pointer-events': 'none', text: river.name
      }, gRiver);
      this.zoomSensitive.push({ el: riverLabel, fs: 10, sw: 2.7, nx: ep[0], ny: ep[1], bx: lx, by: ly });
    });

    ROUTES.forEach(route => {
      const gLine = svgEl('g', { fill: 'none' }, gRouteLines);
      const gNode = svgEl('g', {}, gRouteNodes);
      route.gLine = gLine;
      route.gNode = gNode;
      route.visible = route.id === 'r1';
      if (!route.visible) {
        gLine.setAttribute('display', 'none');
        gNode.setAttribute('display', 'none');
      }
      const pts = route.nodes.map(n => projection(n.lng, n.lat));
      const d = this.smoothPath(pts);
      svgEl('path', { d, stroke: '#151515', 'stroke-width': 5.0, opacity: 0.9, 'vector-effect': 'non-scaling-stroke' }, gLine);
      const linePath = svgEl('path', { d, stroke: route.line, 'stroke-width': 2.8, opacity: 1, 'vector-effect': 'non-scaling-stroke' }, gLine);
      this.addArrows(linePath, gLine, route, pts);

      let labeledIdx = 0;
      route.nodes.forEach((n, i) => {
        if (!n.name) return;
        const pt = pts[i];
        const isEnd = i === 0 || i === route.nodes.length - 1;
        const dotR = n.major ? (isEnd ? 3.6 : 3.0) : 2.5;
        const dot = svgEl('circle', {
          cx: pt[0].toFixed(1), cy: pt[1].toFixed(1),
          r: dotR,
          fill: route.line, stroke: '#151515', 'stroke-width': 1.2
        }, gNode);
        const reg = { el: dot, r: dotR, sw: 1.2 };
        this.zoomSensitive.push(reg);
        const hit = svgEl('circle', {
          cx: pt[0].toFixed(1), cy: pt[1].toFixed(1), r: 10,
          fill: 'none', stroke: 'none', 'pointer-events': 'all', cursor: 'pointer', 'class': 'hit'
        }, gNode);
        hit.dataset.route = route.id;
        hit.dataset.node = i;
        this.zoomSensitive.push({ el: hit, r: 10, sw: 0 });
        this.bindTooltip(hit, route, n, reg);

        if (!n.major) return;
        const dir = this.directionAt(pts, i);
        const side = labeledIdx % 2 === 0 ? 1 : -1;
        labeledIdx++;
        labelItems.push({
          text: n.name,
          fontSize: 10,
          candidates: this.nodeLabelCandidates(pt, dir, side, n.name, 10, isEnd ? 3.6 : 3.0, n.labelDir),
          choice: 0,
          create: (cand) => {
            const t = svgEl('text', {
              x: cand.x.toFixed(1), y: cand.y.toFixed(1),
              'text-anchor': cand.anchor,
              'font-size': 10, 'font-weight': 600, fill: route.text,
              'pointer-events': 'none',
              'paint-order': 'stroke', stroke: '#151515', 'stroke-width': 2.7, 'stroke-linejoin': 'round',
              text: n.name
            }, gNode);
            this.zoomSensitive.push({ el: t, fs: 10, sw: 2.7, nx: pt[0], ny: pt[1], bx: cand.x, by: cand.y });
          }
        });
      });
    });

    this.nodeBBox = { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity };
    ROUTES.forEach(route => route.nodes.forEach(n => {
      const p = projection(n.lng, n.lat);
      if (p[0] < this.nodeBBox.minX) this.nodeBBox.minX = p[0];
      if (p[0] > this.nodeBBox.maxX) this.nodeBBox.maxX = p[0];
      if (p[1] < this.nodeBBox.minY) this.nodeBBox.minY = p[1];
      if (p[1] > this.nodeBBox.maxY) this.nodeBBox.maxY = p[1];
    }));

    this.resolveCollisions(labelItems, []);
    labelItems.forEach(it => it.create(it.candidates[it.choice]));

    const nanhai = projection(112.0, 13.5);
    const nanhaiText = svgEl('text', { x: nanhai[0].toFixed(1), y: nanhai[1].toFixed(1), 'text-anchor': 'middle', 'font-size': 10.5, fill: '#6a665c', text: '南海诸岛' }, this.viewport);
    this.zoomSensitive.push({ el: nanhaiText, fs: 10.5 });

    this.built = true;
    this.buildLegend();
    if (App.view === 'map') {
      this.legendEl.classList.remove('hidden');
      this.fitToNodes();
    }
  },

  /* ---------- 图例 ---------- */
  buildLegend() {
    const legendEl = this.legendEl;
    legendEl.innerHTML = '';
    ROUTES.forEach(route => {
      const item = document.createElement('button');
      item.className = 'legend-item';
      item.type = 'button';
      const sample = document.createElement('span');
      sample.className = 'legend-sample';
      sample.style.background = route.line;
      const dot = document.createElement('span');
      dot.className = 'legend-dot';
      dot.style.background = route.line;
      sample.appendChild(dot);
      const texts = document.createElement('span');
      texts.className = 'legend-texts';
      const name = document.createElement('span');
      name.className = 'legend-name';
      name.textContent = route.name;
      texts.appendChild(name);
      item.appendChild(sample);
      item.appendChild(texts);
      item.addEventListener('click', () => this.toggleRoute(route, item));
      item.classList.toggle('off', !route.visible);
      legendEl.appendChild(item);
    });
  },

  toggleRoute(route, item) {
    route.visible = !route.visible;
    const display = route.visible ? '' : 'none';
    route.gLine.setAttribute('display', display);
    route.gNode.setAttribute('display', display);
    if (route.id === 'r1' && this.gRiver) this.gRiver.setAttribute('display', display);   // 赤水河随红一方面军显隐
    item.classList.toggle('off', !route.visible);
  },

  /* ---------- 悬停提示 ---------- */
  applyDotScale(reg, k) {
    const inv = 1 / k;
    reg.el.setAttribute('r', (reg.r * (reg.hs || 1) * inv).toFixed(3));
    reg.el.setAttribute('stroke-width', (reg.sw * (reg.hs || 1) * inv).toFixed(3));
  },

  bindTooltip(node, route, data, reg) {
    node.addEventListener('pointerenter', e => {
      reg.hs = 1.5;
      this.applyDotScale(reg, this.view.k);
      this.tipEl.innerHTML = '<div class="tip-title">' + data.name + '<span class="tip-date">' + data.date + '</span></div>' +
        '<div class="tip-route" style="color:' + route.line + '">' + route.name + '</div>' +
        '<div class="tip-desc">' + data.desc + '</div>';
      this.tipEl.classList.remove('hidden');
      this.moveTip(e);
    });
    node.addEventListener('pointermove', e => this.moveTip(e));
    node.addEventListener('pointerleave', () => {
      reg.hs = 1;
      this.applyDotScale(reg, this.view.k);
      this.tipEl.classList.add('hidden');
    });
  },

  moveTip(e) {
    const wrap = document.getElementById('canvas-wrap');
    const r = wrap.getBoundingClientRect();
    const pad = 16;
    let x = e.clientX - r.left + pad;
    let y = e.clientY - r.top + pad;
    const tw = this.tipEl.offsetWidth, th = this.tipEl.offsetHeight;
    if (x + tw > wrap.clientWidth - 10) x = e.clientX - r.left - tw - pad;
    if (y + th > wrap.clientHeight - 10) y = e.clientY - r.top - th - pad;
    this.tipEl.style.left = Math.max(8, x) + 'px';
    this.tipEl.style.top = Math.max(8, y) + 'px';
  },

  /* ---------- 平移 / 缩放 / 复位 ---------- */
  setZoomScale(k) {
    const inv = 1 / k;
    for (let i = 0; i < this.zoomSensitive.length; i++) {
      const it = this.zoomSensitive[i];
      if (it.arrow) {
        it.el.setAttribute('transform', it.arrow + ' scale(' + inv.toFixed(4) + ')');
      } else if (it.r !== undefined) {
        this.applyDotScale(it, k);
      } else {
        it.el.setAttribute('font-size', (it.fs * inv).toFixed(3));
        if (it.sw !== undefined) it.el.setAttribute('stroke-width', (it.sw * inv).toFixed(3));
        if (it.nx !== undefined) {
          it.el.setAttribute('x', (it.nx + (it.bx - it.nx) * inv).toFixed(2));
          it.el.setAttribute('y', (it.ny + (it.by - it.ny) * inv).toFixed(2));
        }
      }
    }
  },

  applyView() {
    if (!this.viewport) return;
    this.viewport.setAttribute('transform', 'translate(' + this.view.x + ' ' + this.view.y + ') scale(' + this.view.k + ')');
    this.setZoomScale(this.view.k);
  },

  clientScale() {
    const rect = this.svg.getBoundingClientRect();
    return Math.min(rect.width / this.mapWidth, rect.height / this.mapHeight);
  },

  clientToView(cx, cy) {
    const rect = this.svg.getBoundingClientRect();
    const s = this.clientScale();
    const ox = (rect.width - this.mapWidth * s) / 2;
    const oy = (rect.height - this.mapHeight * s) / 2;
    return [(cx - rect.left - ox) / s, (cy - rect.top - oy) / s];
  },

  zoomAt(qx, qy, factor) {
    const k2 = Math.min(14, Math.max(0.6, this.view.k * factor));
    const ratio = k2 / this.view.k;
    this.view.x = qx - (qx - this.view.x) * ratio;
    this.view.y = qy - (qy - this.view.y) * ratio;
    this.view.k = k2;
    this.applyView();
  },

  fitToNodes() {
    if (!this.viewport || !this.nodeBBox) return;
    const rect = this.svg.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const s0 = Math.min(rect.width / this.mapWidth, rect.height / this.mapHeight);
    const ox = (rect.width - this.mapWidth * s0) / 2;
    const oy = (rect.height - this.mapHeight * s0) / 2;
    const FILL = 0.8;
    const bw = this.nodeBBox.maxX - this.nodeBBox.minX;
    const bh = this.nodeBBox.maxY - this.nodeBBox.minY;
    const k = Math.min(FILL * rect.width / (bw * s0), FILL * rect.height / (bh * s0));
    this.view.k = Math.min(14, Math.max(0.6, k));
    const cx = (this.nodeBBox.minX + this.nodeBBox.maxX) / 2;
    const cy = (this.nodeBBox.minY + this.nodeBBox.maxY) / 2;
    this.view.x = (rect.width / 2 - ox) / s0 - cx * this.view.k;
    this.view.y = (rect.height / 2 - oy) / s0 - cy * this.view.k;
    this.applyView();
  },

  bindPanZoom() {
    const svg = this.svg;
    svg.addEventListener('wheel', e => {
      e.preventDefault();
      this.userMoved = true;
      const q = this.clientToView(e.clientX, e.clientY);
      this.zoomAt(q[0], q[1], Math.pow(1.0016, -e.deltaY));
    }, { passive: false });

    let dragging = null;
    let downInfo = null;
    svg.addEventListener('pointerdown', e => {
      if (e.button !== 0) return;
      downInfo = { x: e.clientX, y: e.clientY, target: e.target };
      dragging = { px: e.clientX, py: e.clientY, vx: this.view.x, vy: this.view.y };
      svg.classList.add('dragging');
      svg.setPointerCapture(e.pointerId);
    });
    svg.addEventListener('pointermove', e => {
      if (!dragging) return;
      this.userMoved = true;
      const s = this.clientScale();
      this.view.x = dragging.vx + (e.clientX - dragging.px) / s;
      this.view.y = dragging.vy + (e.clientY - dragging.py) / s;
      this.applyView();
    });
    const endDrag = e => {
      // 点按（几乎未拖动）且落在节点命中区 → 选中该节点
      if (downInfo && e && Math.hypot(e.clientX - downInfo.x, e.clientY - downInfo.y) < 6) {
        const hit = downInfo.target && downInfo.target.closest ? downInfo.target.closest('.hit') : null;
        if (hit) this.selectNode(hit.dataset.route, +hit.dataset.node);
      }
      downInfo = null;
      dragging = null;
      svg.classList.remove('dragging');
    };
    svg.addEventListener('pointerup', endDrag);
    svg.addEventListener('pointercancel', () => {
      downInfo = null;
      dragging = null;
      svg.classList.remove('dragging');
    });

    svg.addEventListener('dblclick', e => {
      this.userMoved = true;
      const q = this.clientToView(e.clientX, e.clientY);
      this.zoomAt(q[0], q[1], 1.8);
    });
  },
};

/* ============ 模块六：番外 · 二级 tab ============
 * 子 tab 1「根据地」：与四路长征大军同时代的红军部队与根据地；
 * 子 tab 2「战役」：长征结束（以各路军先后到达之日计，而非 1936.10 会师）
 *   至全面抗战爆发（1937.7.7）之间的 8 场战役，含背景/意图、经过、
 *   伤亡情况、牺牲将领与英雄、战略目标达成等详情；
 * 子 tab 3「整编」：八路军、新四军的序列——分别由哪些部队整编而来，
 *   逐卡标注来源血统（红一方面军/红15军团/红二方面军/红四方面军/陕北红军/南方游击队）；
 * 子 tab 4「角色谱」：电视剧《伟大的长征》全部角色，按阵营分组；
 *   点击角色卡片 → 右侧面板展示其履历时光机。
 */

/* ---------- 战役数据：长征之后 · 抗战之前 ---------- */
const POST_MARCH_BATTLES = [
  {
    id: 'laoshan', name: '劳山战役', date: '1935.9.28 — 10.1', place: '陕西甘泉 · 劳山峡谷',
    forces: '红15军团（红25军 + 陕北红26、27军）', enemy: '东北军第57军第110师',
    commanders: '军团长徐海东 · 政委程子华 · 副军团长兼参谋长刘志丹',
    result: '全歼1个师部又2个团',
    bg: '红25军于 1935.9.15 先期到达陕北，与红26、27军合编为红15军团。蒋介石调东北军 5 个师对陕甘苏区发动第三次「围剿」，企图趁中央红军未到、苏区兵力单薄之机，将这块仅存的根据地一举摧毁。',
    intent: '红15军团采取「围城打援」：以红81师围困甘泉县城，诱使延安之敌出援，主力预伏劳山峡谷公路两侧山地，在运动中聚歼援敌。',
    course: '9.28 红81师包围甘泉。10.1 晨，第110师师长何立中率部由延安沿咸榆公路南援，14 时许全部进入伏击圈。红75师、红78师东西对进、南北夹击，激战至 18 时许，将其师部及第628、629团全歼于劳山山谷。',
    casualties: '毙伤俘敌 3000 余人，击毙师长何立中，缴获大批枪械弹药；红军伤亡数百人。',
    martyrs: [],
    martyrsNote: '此役无高级将领牺牲。长眠劳山的数百名指战员中，既有从鄂豫皖一路远征而来的红25军老战士，也有刚放下锄头参军的陕北子弟。',
    goals: [
      '红15军团成立后的首战全胜，粉碎东北军对陕甘苏区第三次「围剿」的南线进攻',
      '与榆林桥、直罗镇并称陕北「三战三捷」，苏区民心士气大振',
      '为一个月后中央红军落脚陕北扫清了外围、备好了落脚点',
    ],
  },
  {
    id: 'wuqi', name: '吴起镇「切尾巴」战斗', date: '1935.10.21', place: '陕西吴起 · 头道川',
    forces: '陕甘支队（红一方面军主力）', enemy: '东北军骑兵军所部及马鸿宾部骑兵',
    commanders: '司令员彭德怀 · 政治委员毛泽东',
    result: '击溃尾追骑兵4个团',
    bg: '10.19 中央红军抵达吴起镇，结束二万五千里长征。东北军何柱国骑兵军及马鸿宾第35师骑兵共 4 个团一路尾追至苏区边缘，企图趁红军立足未稳突入根据地。毛泽东指出「不能把敌人带进苏区来」，决心打好这「切尾巴」的一仗。',
    intent: '在中央红军与红15军团会师前，干净利落地打掉尾追之敌，使久战之师得以休整，使苏区不受袭扰。',
    course: '10.21 拂晓，陕甘支队在吴起镇附近头道川一带山地设伏，以步兵分割围歼敌骑兵，经数小时激战将其击溃，残敌狼狈退出苏区边缘。',
    casualties: '击溃敌骑兵 4 个团，毙伤俘敌约 1000 人，缴获战马数百匹及大批枪械；红军伤亡甚小。',
    martyrs: [],
    martyrsNote: '此役无将领牺牲。它是中央红军长征的收官之仗——从于都河畔到吴起山下，二万五千里的最后一战。',
    goals: [
      '彻底甩掉尾追之敌，中央红军从此在苏区站稳脚跟',
      '保卫了刚落脚的陕北根据地，为与红15军团会师扫清障碍',
      '战后毛泽东赋诗赠彭德怀：「谁敢横刀立马？唯我彭大将军！」',
    ],
  },
  {
    id: 'yulin', name: '榆林桥战斗', date: '1935.10.25', place: '陕西鄜县（今富县）· 榆林桥',
    forces: '红15军团', enemy: '东北军第107师第619团及620团一个营',
    commanders: '军团长徐海东 · 政委程子华 · 副军团长兼参谋长刘志丹',
    result: '全歼1个团又1个营',
    bg: '劳山失利后，东北军重整部署，以第107师第619团等部进驻榆林桥，企图沿洛河一线构筑堡垒线，从西南方向逼近苏区中心。红15军团决心乘其立足未稳，再歼一股。',
    intent: '拔掉楔在苏区西南门户的这颗钉子，打断东北军的堡垒推进；并继续「以打促谈」——用战场上的胜利，推动东北军官兵反思内战、倾向抗日。',
    course: '10.25 拂晓发起攻击，守敌凭村寨土堡顽抗，红军经反复冲杀突入寨内，激战至午间全歼守敌，俘团长高福源。',
    casualties: '全歼第619团及第620团一个营，俘敌团长高福源以下千余人，缴枪千余支；红军亦付出数百人伤亡。',
    martyrs: [],
    martyrsNote: '此役无将领牺牲。阵亡的数百名指战员与劳山英烈一起，用生命为中央红军守住了陕北的大门。',
    goals: [
      '与劳山、直罗镇并称陕北「三战三捷」，东北军自此转入守势',
      '被俘团长高福源经教育后主动充当红军与张学良之间的信使，促成 1936 年初周恩来与张学良延安（肤施）会谈，为西北大联合与西安事变埋下伏笔',
    ],
  },
  {
    id: 'zhiluo', name: '直罗镇战役', date: '1935.11.20 — 24', place: '陕西鄜县（今富县）· 直罗镇',
    forces: '红一方面军（红1军团 + 红15军团）', enemy: '东北军第57军第109师等5个师',
    commanders: '毛泽东、周恩来、彭德怀亲临前线指挥',
    result: '歼敌1个师又1个团',
    bg: '中央红军与红15军团会师、恢复红一方面军番号后，蒋介石调东北军 5 个师，企图沿葫芦河构筑东西封锁线，趁红军立足未稳将主力围歼于陕北。',
    intent: '毛泽东在战前动员中说，这一仗「就是要给党中央把全国革命大本营放在西北的任务，举行一个奠基礼」。',
    course: '11.20 敌第109师孤军进占直罗镇，当夜红军完成包围。21 日拂晓发起总攻，红1军团由北向南、红15军团由南向北夹击，激战至 14 时许歼其大部；师长牛元峰率残部数百人突围，旋被歼灭，牛元峰毙命。23 日又在张家湾方向歼灭来援的第106师一个团，24 日战役胜利结束。',
    casualties: '毙伤敌约 1000 人，俘敌 5300 余人，击毙师长牛元峰，缴获大批枪械弹药；红军伤亡数百人。',
    martyrs: [],
    martyrsNote: '数百名从长征路上走来的老红军，牺牲在了「大本营」奠基的最后一战中，多数连姓名都未留下。',
    goals: [
      '彻底粉碎国民党军对陕北苏区的第三次「围剿」，「奠基礼」如期完成',
      '沉重打击东北军，促其此后与红军秘密停战、渐趋联共抗日',
      '巩固陕北根据地，为红军东征创造了条件',
    ],
  },
  {
    id: 'dongzheng', name: '东征战役', date: '1936.2.20 — 5.5', place: '山西 · 转战50余县',
    forces: '中国人民红军抗日先锋军（红1军团、红15军团、红28军）',
    enemy: '阎锡山晋绥军；后期蒋介石中央军10个师入晋',
    commanders: '总司令彭德怀 · 政治委员毛泽东',
    result: '歼敌约7个团 · 扩红8000余人',
    bg: '瓦窑堡会议（1935.12）确立抗日民族统一战线与「以发展求巩固」方针。为打通抗日路线、粉碎蒋军对陕北的封锁，红军主力组成「中国人民红军抗日先锋军」，准备东渡黄河、直接对日作战。',
    intent: '在发展中求巩固：到山西扩红、筹款、发动群众，把抗日旗帜插到华北前沿；同时以军事压力逼迫蒋阎在「停止内战、一致抗日」上让步。',
    course: '2.20 夜突破黄河天险入晋，首战关上村、蓬门告捷；随后分兵南下北上，席卷同蒲路两侧。阎锡山急调重兵堵截，蒋介石又派 10 个师中央军入晋。4.14 红28军军长刘志丹在中阳县三交镇战斗中牺牲。面对重兵围堵，红军为顾全抗日大局于 5.5 主动回师河西，发表《停战议和一致抗日通电》。',
    casualties: '历时 75 天，歼敌约 7 个团，毙伤俘敌数千人；红军亦有伤亡，军长刘志丹以下数百名指战员长眠三晋。',
    martyrs: [
      { n: '刘志丹', t: '红28军军长', d: '1936.4.14 中阳县三交镇战斗中牺牲，年仅 33 岁。毛泽东题词「群众领袖，民族英雄」；党中央将其故乡保安县改名志丹县' },
    ],
    martyrsNote: '另有数百名指战员牺牲于东征战场，鲜血洒在了抗日的最前沿。',
    goals: [
      '扩大红军 8000 余人、筹款 30 余万元——长征以来最大的一次补充',
      '在山西 20 余县发动群众、组建地方游击队 30 余支，播下抗日火种',
      '回师通电标志中共政策由「抗日反蒋」转向「逼蒋抗日」，赢得全国政治主动',
    ],
  },
  {
    id: 'xizheng', name: '西征战役', date: '1936.5.18 — 7月底', place: '陕甘宁交界 · 豫旺、盐池、同心一线',
    forces: '西方野战军（红1军团、红15军团、红28军等）', enemy: '马鸿逵、马鸿宾部（宁马）',
    commanders: '司令员兼政委彭德怀',
    result: '开辟纵横400余里新根据地',
    bg: '东征回师后，蒋介石调集重兵封锁陕北。陕北地瘠民贫，难以供养数万大军；红二、四方面军正挥师北上，亦需落脚通道。5.18 西北革命军事委员会发布西征命令，红军组成西方野战军西出。',
    intent: '以发展求巩固：夺取长城沿线产盐富庶之地，扩大苏区；打击马家军，迎接红二、四方面军北上会师；并为尔后宁夏方向的作战预作铺垫。',
    course: '红1军团西出陇东，首战曲子镇歼马鸿宾部一部；红15军团绕出敌后，连克定边、盐池、豫旺等城，直插同心、海原。7 月底第一阶段结束，此后红军在新区建政扩红；10 月前出打拉池、静宁方向接应二、四方面军，11 月又配合山城堡战役。',
    casualties: '毙伤俘敌 2000 余人，缴获大批枪械战马；红军伤亡较小。',
    martyrs: [],
    martyrsNote: '此役红军伤亡较小，无将领牺牲；倒下的指战员多长眠于荒漠边堡。',
    goals: [
      '陕北苏区扩展为陕甘宁根据地——后来陕甘宁边区的前身',
      '打通并保障了三大主力会师的通道，红一、二、四方面军得以齐聚陇东',
      '新辟根据地盐粮丰足，为红军赢得全面抗战前近一年的宝贵休整',
    ],
  },
  {
    id: 'xilu', name: '西路军血战河西', date: '1936.10.24 — 1937.4', place: '甘肃河西走廊（古浪—高台—倪家营子—梨园口）',
    forces: '西路军（红5、红9、红30军及总部直属队，共21800人）',
    enemy: '马步芳、马步青部及甘青民团约十余万（多为骑兵）',
    commanders: '总指挥徐向前 · 政委陈昌浩 · 副总指挥王树声',
    result: '歼敌约2.5万 · 全军折损殆尽',
    bg: '三大主力会师前夕，中央制定宁夏战役计划，拟夺取宁夏、打通苏联。10.24 起，红30、红9、红5军共 21800 人奉命西渡黄河；因胡宗南部突进，河东主力未能跟进，宁夏战役计划中止。11.11 中央电令渡河部队组成西路军，在河西创立根据地、相机打通新疆。',
    intent: '独立完成西进任务，建立河西立足点并打通新疆方向的国际通道；同时牵制甘青宁三省之敌，策应河东主力与西安事变前夜的全局。',
    course: '一条山初战告捷后，红9军血战古浪（11 月中旬，伤亡 2400 余人）；全军转战永昌、山丹，鏖战月余。1937.1.1 红5军攻占高台，1.20 城破，董振堂、杨克明以下 3000 守城将士大部殉难。此后全军血战临泽、倪家营子，歼敌近万，自身亦伤亡枕藉。3 月中旬梨园口再战，陈海松等牺牲；3.14 石窝分兵，余部分三路突围。李先念率左支队翻越祁连雪山，4 月底抵达星星峡，尚存 400 余人。',
    casualties: '西路军 21800 人，孤军深入、无根据地依托、弹尽粮绝，血战近半年，毙伤俘敌约 2.5 万人；全军牺牲 7000 余人，被俘 9000 余人（其中 5600 余人遭马家军残害），失散流落者千余人；经营救陆续归队者数千人，左支队 400 余人抵达新疆。',
    martyrs: [
      { n: '董振堂', t: '红5军军长', d: '1937.1.20 高台城破，率部巷战至最后一刻，壮烈殉难，年 42 岁' },
      { n: '杨克明', t: '红5军政治部主任', d: '1937.1.20 与董振堂同殉高台，年 32 岁' },
      { n: '陈伯稚', t: '红9军参谋长', d: '1936.11 古浪血战中牺牲' },
      { n: '陈海松', t: '红9军政治委员', d: '1937.3 梨园口血战中牺牲，年仅 23 岁——红四方面军最年轻的军级干部之一' },
      { n: '孙玉清', t: '红9军军长', d: '突围中负伤被俘，坚贞不屈，1937.5 就义于青海西宁' },
      { n: '熊厚发', t: '红30军第88师师长', d: '1937.3 祁连山突围中负伤被俘，英勇就义' },
      { n: '郑义斋', t: '西路军总供给部部长', d: '1937.3 护送全军经费突围时牺牲' },
    ],
    martyrsNote: '妇女抗日先锋团千余名女战士大部牺牲或被俘，被俘者备受酷刑仍坚贞不屈。两万余名将士中，有名可考的烈士仅是少数——祁连山麓、戈壁滩上，处处是西路军的忠骨。',
    goals: [
      '牵制甘青宁三省十余万之敌，策应了河东红军的部署调整与西安事变的和平解决',
      '歼敌约 2.5 万人，重创马家军有生力量',
      '左支队入疆后组成「新兵营」，培养出人民军队第一批航空、装甲、无线电等特种技术骨干；历尽劫难归队的将士成为抗战中坚',
    ],
  },
  {
    id: 'shanchengbu', name: '山城堡战役', date: '1936.11.17 — 22', place: '甘肃环县 · 山城堡',
    forces: '红一方面军主力 + 红四方面军第4、31军', enemy: '胡宗南第1军第78师等',
    commanders: '前敌总指挥部总指挥彭德怀统一指挥',
    result: '全歼1个旅又2个团',
    bg: '三大主力会师后，蒋介石认为红军长途远征、疲惫不堪，调集嫡系胡宗南第1军等部乘虚进攻陕甘宁苏区，企图将红军主力聚歼于陇东。胡部骄狂冒进，孤军深入。',
    intent: '集中三大主力会师后的兵力优势，歼灭蒋军嫡系一部，打掉其进攻锋芒，粉碎这「最后一击」式的围剿。',
    course: '11.17 红4军、红31军在萌城、甜水堡设伏，重创胡部第1师第2旅，击落敌机 1 架。敌第78师仍冒进，20 日其第232旅进占山城堡。21 日黄昏，红军冒严寒发起总攻，激战一夜，至 22 日上午全歼第232旅全部及第234旅两个团。',
    casualties: '歼敌 1 个旅又 2 个团，毙伤俘敌数千人，缴获大批枪械；红军伤亡数百人。',
    martyrs: [],
    martyrsNote: '此役无将领牺牲；倒下的是刚走完长征、尚未及喘息的数百名老兵与少年。',
    goals: [
      '沉重打击蒋介石嫡系「天下第一军」，迫使各路「围剿」之敌停止进攻、仓皇后撤',
      '史称「长征最后一战」——三大主力会师后的首次联合作战，也是全面抗战爆发前红军主力的最后一仗',
      '极大增强了张学良、杨虎城联共抗日的信心，一个月后西安事变爆发',
    ],
  },
];

/* ---------- 根据地数据：四路长征大军之外的红军部队与根据地 ----------
 * 人物 pid 显式指定（pid: null 表示不链接，防止同名误链，如挺进师政委刘英
 * 与项目中人物「刘英」张闻天夫人并非一人）。
 */
const OTHER_BASES = [
  {
    id: 'shaanbei', name: '陕北红军（西北红军）', date: '1932 — 1936', place: '陕甘边（南梁）· 陕北',
    units: '红26军 · 红27军 → 红15军团', badge: '长征落脚点',
    leaders: [
      { n: '谢子长', t: '陕北红军创建人 · 西北军委主席', pid: 'person_xie_zi_chang' },
      { n: '刘志丹', t: '陕甘边红军创建人 · 红28军军长', pid: 'person_liu_zhidan' },
      { n: '习仲勋', t: '陕甘边区苏维埃政府主席（时年仅21岁）', pid: 'person_xi_zhong_xun' },
    ],
    desc: '清涧起义、渭华起义失败后，谢子长、刘志丹自 1932 年底起先后组建红26军（陕甘边）、红27军（陕北），在照金、南梁一带开创根据地。1935.2 两块苏区统一领导，先后粉碎国民党军两次「围剿」，连成一片的陕甘苏区成为全国硕果仅存的根据地。1935.9.18，红25、26、27军在永坪合编为红15军团（红75、78、81师），随后劳山、榆林桥、直罗镇三战三捷，为中央红军备好了落脚点。',
    martyrs: [
      { n: '谢子长', t: '西北革命军事委员会主席', d: '1934.8 河口战斗负伤，1935.2 伤重不治病逝——安定县改子长县', pid: 'person_xie_zi_chang' },
      { n: '刘志丹', t: '红28军军长', d: '1936.4.14 东征三交镇牺牲——保安县改志丹县，毛泽东题「群众领袖，民族英雄」', pid: 'person_liu_zhidan' },
    ],
    martyrsNote: '陕北红军先后有数千名指战员牺牲，多系本地农家子弟；谢、刘二人之外，团营级烈士难以尽录。',
    fate: '红15军团于 1935.11 编入红一方面军；陕北红军后又组建红28军（刘志丹任军长、宋任穷任政委）、红29军、红30军（阎红彦任军长）等部，先后参加东征、西征。陕甘苏区由此成为长征落脚点、抗日前进阵地，后发展为陕甘宁边区。',
  },
  {
    id: 'xianqi', name: '北上抗日先遣队（红7军团 → 红10军团）', date: '1934.7 — 1935.1', place: '闽浙皖赣边 · 赣东北（闽浙赣）苏区',
    units: '红7军团 6000余人 → 红10军团', badge: '策应长征的先遣',
    leaders: [
      { n: '寻淮洲', t: '红7军团军团长 → 红19师师长', pid: 'person_xun_huai_zhou' },
      { n: '方志敏', t: '红10军团军政委员会主席 · 赣东北苏区创建人', pid: 'person_fang_zhi_min' },
      { n: '刘畴西', t: '红10军团军团长', pid: 'person_liu_chou_xi' },
      { n: '粟裕', t: '红10军团参谋长 · 先头部队指挥', pid: 'person_su_yu' },
    ],
    desc: '1934.7，红7军团 6000 余人从瑞金出发，打出「北上抗日先遣队」旗帜，转战闽浙皖赣四省，宣传抗日主张、牵制围攻中央苏区之敌，策应主力战略转移。11 月与方志敏创建的红10军在赣东北合编为红10军团。12.14 谭家桥战斗失利，寻淮洲身先士卒负重伤牺牲；1935.1 主力在怀玉山被围，弹尽粮绝，方志敏、刘畴西先后被俘，8.6 同日在南昌英勇就义。方志敏狱中写下《可爱的中国》《清贫》。',
    martyrs: [
      { n: '寻淮洲', t: '红10军团第19师师长', d: '1934.12 谭家桥战斗牺牲，年仅 22 岁', pid: 'person_xun_huai_zhou' },
      { n: '方志敏', t: '红10军团军政委员会主席', d: '1935.8.6 南昌就义，年 36 岁——《可爱的中国》《清贫》作者', pid: 'person_fang_zhi_min' },
      { n: '刘畴西', t: '红10军团军团长', d: '1935.8.6 与方志敏同日就义于南昌', pid: 'person_liu_chou_xi' },
      { n: '胡天桃', t: '红10军团第21师师长', d: '怀玉山突围中负伤被俘，坚贞不屈，英勇就义', pid: 'person_hu_tian_tao' },
    ],
    martyrsNote: '全军近万人中，突围者仅数百人；闽浙赣苏区随之陷落，无数苏区干部群众罹难。',
    fate: '粟裕、刘英率先头部队数百人突围，成为红军挺进师的火种（见下）。先遣队虽败，却牵动了围攻中央苏区的敌军，把中共的抗日主张传遍东南四省。',
  },
  {
    id: 'tingjin', name: '浙南挺进师', date: '1935.2 — 1937.10', place: '浙南 · 闽浙边',
    units: '红军挺进师（500余人）', badge: '怀玉山的火种',
    leaders: [
      { n: '粟裕', t: '挺进师师长', pid: 'person_su_yu' },
      { n: '刘英', t: '挺进师政治委员（与张闻天夫人刘英同名不同人）', pid: 'person_liu_ying_tdjs' },
    ],
    desc: '1935.2，红10军团突围的先头部队 500 余人组成红军挺进师，粟裕任师长、刘英任政委，孤军深入国民党统治腹地浙江，在浙南开创游击根据地，粉碎国民党军多次大规模「进剿」，游击区扩展至浙闽赣边数十县，与闽东、闽北游击区互为掎角。',
    martyrs: [],
    martyrsNote: '三年游击战中数百名将士牺牲于浙南的山水之间；幸存者不足半数，成为后来新四军的骨干。',
    fate: '1937 年与浙江地方当局达成合作抗日协议，部队集中整训；1938 年春编入新四军第二支队（粟裕任副司令员），开赴皖南抗日前线。刘英留浙南任中共浙江省委书记，1942 年在温州被捕，英勇就义。',
  },
  {
    id: 'youji', name: '南方八省三年游击战争（留守中央苏区）', date: '1934.10 — 1937.10', place: '赣粤闽湘鄂豫皖浙八省 · 十余个游击区',
    units: '红24师及地方武装 1.6万余人 → 各地红军游击队', badge: '新四军前身',
    leaders: [
      { n: '项英', t: '中央分局书记 · 中央军区司令员兼政委', pid: 'person_xiang_ying' },
      { n: '陈毅', t: '中央政府办事处主任', pid: 'person_chen_yi' },
      { n: '张鼎丞', t: '闽西南军政委员会主席', pid: 'person_zhang_ding_cheng' },
      { n: '谭震林', t: '闽西南军政委员会副主席', pid: 'person_tan_zhen_lin' },
      { n: '邓子恢', t: '闽西南军政委员会副主席', pid: 'person_deng_zi_hui' },
      { n: '叶飞', t: '闽东游击区领导人（闽东独立师）', pid: 'person_ye_fei' },
      { n: '傅秋涛', t: '湘鄂赣游击区领导人（红16师）', pid: 'person_fu_qiu_tao' },
    ],
    desc: '中央红军长征后，项英、陈毅率红24师及地方武装共 1.6 万余人留守中央苏区，掩护主力转移。1935.2，遵义会议精神传达后，部队分九路突围，转入游击战争。突围与转战中，何叔衡、贺昌、阮啸仙、刘伯坚、毛泽覃等相继牺牲，瞿秋白被俘就义。此后三年，项英、陈毅在赣粤边油山，张鼎丞、邓子恢、谭震林在闽西，叶飞在闽东，傅秋涛在湘鄂赣……散布八省十余个游击区，与数十倍之敌周旋。1936 年冬，陈毅梅山被围二十余日，写下绝笔《梅岭三章》：「断头今日意如何？创业艰难百战多……」',
    martyrs: [
      { n: '何叔衡', t: '中央执行委员 · 中共一大代表', d: '1935.2 长汀水口突围时为不拖累战友纵身跳崖牺牲，年 59 岁——长征时期牺牲的党内最年长者', pid: 'person_he_shu_heng' },
      { n: '贺昌', t: '中央军区政治部主任', d: '1935.3 会昌仁凤山区突围中牺牲，年 29 岁', pid: 'person_he_chang' },
      { n: '阮啸仙', t: '赣南省委书记兼军区政委', d: '1935.3 信丰突围中牺牲——中央苏区审计制度奠基人', pid: 'person_ruan_xiao_xian' },
      { n: '刘伯坚', t: '赣南军区政治部主任', d: '1935.3 突围负伤被俘，狱中写下《带镣行》，3.21 于大余就义', pid: 'person_liu_bo_jian' },
      { n: '毛泽覃', t: '红军独立师师长', d: '1935.4 瑞金红林山区游击战中牺牲，年 29 岁——毛泽东之弟', pid: 'person_mao_ze_tan' },
      { n: '瞿秋白', t: '中央分局宣传部长', d: '1935.2 转移途中被俘，6.18 于长汀就义——「此地甚好」，高唱《国际歌》走向刑场', pid: 'person_qu_qiu_bai' },
      { n: '古柏', t: '闽粤赣边游击纵队司令员', d: '1935 广东龙川鸳鸯坑战斗中牺牲，年 29 岁——「寻乌调查」重要助手', pid: 'person_gu_bai' },
    ],
    martyrsNote: '八省游击区数年间牺牲的县团级以上干部数以百计，无名游击战士更难以计数——三年游击战争与长征一样，是一段用鲜血写成的历史。',
    fate: '1937 年国共合作后，各游击区部队陆续下山整编；1938.1 新四军军部成立于南昌，八省游击健儿 1 万余人编为四个支队（军长叶挺、副军长项英），开赴大江南北敌后战场。',
  },
  {
    id: 'hong28', name: '鄂豫皖红28军', date: '1935.2 — 1937.7', place: '鄂豫皖边 · 大别山',
    units: '红28军（千余人）+ 便衣队', badge: '大别山红旗不倒',
    leaders: [
      { n: '高敬亭', t: '红28军政治委员（统一领导）', pid: 'person_gao_jing_ting' },
    ],
    desc: '1934.11 红25军主力长征后，高敬亭将留下的部队与地方武装于 1935.2 重建红28军，在大别山坚持三年游击战争。以「便衣队」与主力相结合的灵活战术，粉碎国民党军反复「清剿」，使大别山的红旗始终不倒。',
    martyrs: [],
    martyrsNote: '三年间数千名将士与便衣队员牺牲于大别山中，多无姓名可考。',
    fate: '抗战爆发后与国民党当局达成停战协议；1937 年改编为新四军第 4 支队（司令员高敬亭，3100 余人），为新四军初创时兵力最多的一个支队。高敬亭后于 1939 年遭错杀，1977 年平反昭雪。',
  },
  {
    id: 'hong74', name: '鄂豫陕红74师', date: '1935.10 — 1937', place: '陕南 · 鄂豫陕边',
    units: '红74师（红25军留守部队）', badge: '红25军的火种',
    leaders: [
      { n: '陈先瑞', t: '红74师师长', pid: 'person_chen_xian_rui' },
    ],
    desc: '1935.7 红25军主力西征北上后，留在鄂豫陕根据地的游击队、伤员近 2000 人，由鄂豫陕特委于 1935.10 合编为红74师（师长陈先瑞），在陕南坚持游击战争两年，牵制陕军与中央军一部，保障了陕北苏区的侧翼安全。',
    martyrs: [],
    martyrsNote: '两年间数百名将士牺牲于秦岭山中。',
    fate: '西安事变后随红一方面军行动；抗战爆发后改编为八路军第115师炮兵营、辎重营，留驻陕甘宁。',
  },
  {
    id: 'qiongya', name: '琼崖红军', date: '1927 — 1938', place: '海南岛 · 母瑞山',
    units: '琼崖红军独立师（后为游击队）', badge: '二十三年红旗不倒',
    leaders: [
      { n: '冯白驹', t: '琼崖特委书记 · 琼崖纵队奠基人', pid: 'person_feng_bai_ju' },
    ],
    desc: '1927 年琼崖暴动后，王文明、冯平、冯白驹等在海南岛建立红军与苏维埃政权。1932 年国民党军重兵「围剿」，根据地大部丧失，冯白驹率百余人退入母瑞山，坚持八个多月，最后仅存 25 人下山——火种不灭，数年间又发展至数百人，重新点燃全岛游击战争。',
    martyrs: [],
    martyrsNote: '从 1927 到 1938，琼崖牺牲的干部战士难计其数；母瑞山围困中，下山者仅二十五人。',
    fate: '1938.12.5 琼崖红军在云龙墟改编为广东民众抗日自卫团第14区独立队（队长冯白驹，300 余人），此后发展为琼崖抗日独立总队、琼崖纵队，坚持至 1950 年海南解放，「二十三年红旗不倒」。',
  },
  {
    id: 'kanglian', name: '东北抗日联军（延伸）', date: '1931.9 — 1945.8', place: '南满 · 北满 · 东满 · 吉东',
    units: '东北人民革命军 → 抗联11个军（极盛3万余人）', badge: '白山黑水',
    leaders: [
      { n: '杨靖宇', t: '抗联第1路军总司令兼政委', pid: 'person_yang_jing_yu' },
      { n: '赵尚志', t: '抗联第3军军长', pid: 'person_zhao_shang_zhi' },
      { n: '周保中', t: '抗联第2路军总指挥', pid: 'person_zhou_bao_zhong' },
      { n: '李兆麟', t: '抗联第3路军总指挥', pid: 'person_li_zhao_lin' },
    ],
    desc: '九一八事变后，中共满洲省委组织东北各地抗日游击战争，1936 年起陆续改编为东北抗日联军，先后编成 11 个军。抗联将士在零下三四十度的林海雪原中与数十万日伪军周旋，牵制其兵力——南有长征，北有抗联，南北两线共同支撑着中国革命。',
    martyrs: [
      { n: '赵一曼', t: '东北人民革命军第3军第2团政委', d: '1935.11 负伤被俘，受尽酷刑坚贞不屈，1936.8.2 就义——「未惜头颅新故国，甘将热血沃中华」', pid: 'person_zhao_yi_man' },
      { n: '杨靖宇', t: '抗联第1路军总司令', d: '1940.2.23 濛江突围战中孤身战至最后牺牲——敌人剖开其胃，只有棉絮、草根与树皮', pid: 'person_yang_jing_yu' },
      { n: '赵尚志', t: '抗联第3军军长', d: '1942.2 遭潜伏特务暗算重伤被俘，宁死不屈，壮烈牺牲，年 34 岁', pid: 'person_zhao_shang_zhi' },
    ],
    martyrsNote: '十四年间，抗联牺牲将士数以万计，军级干部殉国者过半。',
    fate: '1940 年前后余部退入苏联整训为抗联教导旅（第88旅），1945.8 随苏军反攻东北，配合八路军、新四军开辟东北解放区。',
  },
];

/* ---------- 整编数据：八路军 · 新四军（1937—1938） ----------
 * rows.src 来源血统徽章：h1 红一方面军 · h25 红15军团 · h2 红二方面军
 *                       h4 红四方面军 · sb 陕北及地方红军 · gj 南方八省游击队
 */
const ARMY_SRC_LABEL = { h1: '红一', h25: '红15', h2: '红二', h4: '红四', sb: '陕北', gj: '游击' };

const ARMY_REORG = [
  /* ===== 八路军 ===== */
  {
    id: '8lu', group: 'ba', name: '八路军总指挥部', badge: '全军 4.6万余人',
    date: '1937.8.25 改编 · 9.11 改称第十八集团军', place: '陕西三原 · 云阳镇誓师',
    from: '红军三大主力及西北红军',
    leaders: [
      { n: '朱德', t: '总指挥（后改称总司令）' },
      { n: '彭德怀', t: '副总指挥（后改称副总司令）' },
      { n: '叶剑英', t: '参谋长' },
      { n: '左权', t: '副参谋长 · 1942.5 反「扫荡」中牺牲于辽县十字岭——抗战中八路军牺牲的最高将领' },
      { n: '任弼时', t: '政治部主任' },
      { n: '邓小平', t: '政治部副主任' },
    ],
    rows: [
      { src: 'h1', from: '红军前敌总指挥部', to: '八路军总指挥部', note: '朱德、彭德怀分任正副总指挥' },
      { src: 'h1', from: '红一方面军（第1、15军团及红74师）', to: '第115师', note: '1.55万余人' },
      { src: 'h2', from: '红二方面军及红27、28、32军等', to: '第120师', note: '1.4万余人' },
      { src: 'h4', from: '红四方面军第4、31军及红29、30军等', to: '第129师', note: '1.3万余人' },
      { src: 'sb', from: '各师留守部队', to: '后方留守兵团', note: '约9000人 · 保卫陕甘宁' },
    ],
    desc: '西安事变后，国共两党由十年内战转向谈判合作。1937.7.7 卢沟桥事变、8.13 淞沪会战相继爆发，国难当头，8.22 国民政府军事委员会宣布红军主力改编为国民革命军第八路军，8.25 中共中央军委发布改编命令。三原、泾阳一带的红军将士摘下红五星帽徽、换上国民革命军臂章，许多老战士抚摸军帽上的红星落泪——但为了抗日救国，这支队伍义无反顾地誓师东进。9.11 按第二战区战斗序列改称第十八集团军，习惯上仍称「八路军」。',
    fate: '1937.9—10 三个师先后东渡黄河开赴山西前线，首战平型关告捷；此后分兵挺进敌后，先后开创晋察冀、晋绥、晋冀鲁豫、山东四大根据地，至 1945 年抗战胜利时，八路军已由 4.6 万人发展为百万大军。',
  },
  {
    id: '115', group: 'ba', name: '第115师', badge: '平型关首捷',
    date: '1937.8.25', place: '由红一方面军改编',
    from: '红一方面军第1、15军团及陕南红74师',
    leaders: [
      { n: '林彪', t: '师长（红1军团军团长）' },
      { n: '聂荣臻', t: '副师长（红1军团政委）· 后任晋察冀军区司令员' },
      { n: '罗荣桓', t: '政训处主任 · 后任师政治委员' },
      { n: '陈光', t: '第343旅旅长（后代理师长）' },
      { n: '徐海东', t: '第344旅旅长（红15军团军团长）' },
    ],
    rows: [
      { src: 'h1', from: '红1军团第1师', to: '师直独立团', note: '团长杨成武 · 腰站阻击战' },
      { src: 'h1', from: '红1军团第2师', to: '第343旅第685团', note: '团长杨得志 · 平型关主攻' },
      { src: 'h1', from: '红1军团第4师', to: '第343旅第686团', note: '团长李天佑 · 平型关主攻' },
      { src: 'h25', from: '红15军团第73师', to: '第344旅第687团', note: '团长张绍东' },
      { src: 'h25', from: '红15军团第75师', to: '第344旅第688团', note: '团长陈锦绣' },
      { src: 'h25', from: '687、688团各抽一部', to: '第344旅第689团', note: '1937.12 新编 · 团长韩先楚' },
      { src: 'sb', from: '陕南红74师', to: '师直炮兵营、辎重营', note: '留守陕甘宁' },
    ],
    desc: '从于都河畔出发、纵横十一省的中央红军主力（1935.11 与红15军团会师后恢复红一方面军番号），与红15军团合编为第115师，是三个师中兵力最众、资历最老的一师。红1军团即陕甘支队恢复的番号——第1师、第2师为中央红军骨干部队，第4师由原红三军团（平江起义红五军血脉）余部编成；红15军团则是红25军——长征中兵力不减反增、最先到达陕北的「童子军」——与陕北红26、27军 1935.9 永坪合编的部队。',
    fate: '1937.9.25 平型关伏击战歼灭日军精锐第5师团第21旅团辎重部队千余人——八路军出师首捷，也是全国抗战以来中国军队的第一个歼灭战胜利。11 月聂荣臻率独立团等 3000 余人留守五台山下，开创晋察冀根据地；1939 年师主力随罗荣桓、陈光东进山东，成为山东抗战的脊梁。',
  },
  {
    id: '120', group: 'ba', name: '第120师', badge: '雁门关伏击',
    date: '1937.8.25', place: '由红二方面军及陕北红军等改编',
    from: '红二方面军（红2、6军团）及红27、28、32军等',
    leaders: [
      { n: '贺龙', t: '师长（红二方面军总指挥）' },
      { n: '萧克', t: '副师长（红六军团军团长）' },
      { n: '关向应', t: '政训处主任 · 后任师政治委员' },
      { n: '张宗逊', t: '第358旅旅长' },
      { n: '陈伯钧', t: '第359旅旅长（红6军军长）' },
    ],
    rows: [
      { src: 'h2', from: '红2军团第4师', to: '第358旅第715团', note: '团长王尚荣' },
      { src: 'h2', from: '红2军团第6师', to: '第358旅第716团', note: '团长贺炳炎 · 雁门关伏击战主力' },
      { src: 'h2', from: '红6军团', to: '第359旅第717团', note: '团长刘转连 · 副旅长王震' },
      { src: 'h1', from: '红32军（原红一方面军第9军团）', to: '第359旅第718团', note: '团长文年生 · 留守陕甘宁' },
      { src: 'sb', from: '红27军、红28军及陕北独立第1、2师', to: '师直教导团', note: '总部特务团一部亦编入' },
    ],
    desc: '1936.7 甘孜组成的长征劲旅红二方面军——红2军团源自湘鄂西苏区的红4军、红6军（洪湖赤卫队的队伍），红6军团出自湘赣、湘鄂赣苏区并率先西征为中央红军探路——与陕北红27军、红28军等合编为第120师。红32军即长征中孤军钳制敌军、掩护主力抢渡金沙江与乌江的红九军团（军团长罗炳辉），甘孜会师后编入红二方面军，至此随贺龙部改编。',
    fate: '1937.9 东渡黄河进入晋西北；10.18 第716团在雁门关黑石头沟伏击日军汽车队，切断其大同—忻口交通线，随后开创晋西北（晋绥）根据地；1939 年贺龙率主力东出冀中，1940 年回师晋西北。第359旅 1941 年回师陕北，屯垦南泥湾，「自己动手、丰衣足食」。',
  },
  {
    id: '129', group: 'ba', name: '第129师', badge: '夜袭阳明堡',
    date: '1937.8.25', place: '由红四方面军河东部队改编',
    from: '红四方面军第4、31军及红29、30军等',
    leaders: [
      { n: '刘伯承', t: '师长（援西军司令员）' },
      { n: '徐向前', t: '副师长（红四方面军总指挥）' },
      { n: '张浩', t: '政训处主任（原名林育英 · 援西军政委）' },
      { n: '陈赓', t: '第386旅旅长' },
      { n: '王宏坤', t: '第385旅旅长' },
    ],
    rows: [
      { src: 'h4', from: '红4军第10师', to: '第385旅第769团', note: '团长陈锡联 · 夜袭阳明堡' },
      { src: 'h4', from: '红4军第12师', to: '第385旅第770团', note: '团长张才千 · 旅部及770团留守陇东' },
      { src: 'h4', from: '红31军第91师', to: '第386旅第771团', note: '团长徐深吉' },
      { src: 'h4', from: '红31军第93师', to: '第386旅第772团', note: '团长叶成焕' },
      { src: 'sb', from: '红29军、红30军及陕北独立第1—4团', to: '师直教导团及特务、工兵、辎重营', note: '多留守陕甘宁' },
    ],
    desc: '三大主力会师后，红四方面军第30、9、5军西渡黄河组成西路军，血战河西几乎全军折损；留在河东的红4军、红31军组成援西军（司令员刘伯承、政委张浩），星夜驰援而未及。1937.8 即以这两军为骨干，与陕北红29军、红30军等合编为第129师；原红四方面军总指挥徐向前任副师长——对这支从鄂豫皖带出来的老部队而言，他是旗帜般的存在。',
    fate: '1937.10.19 第769团夜袭代县阳明堡机场，击毁击伤日机 24 架——步兵打飞机的传奇；此后刘伯承与邓小平（1938.1 接替病重的张浩任师政委）率部转战太行，开创晋冀鲁豫根据地，发展为抗战中歼敌数字最多的八路军劲旅。',
  },
  {
    id: 'liushou', group: 'ba', name: '八路军后方留守兵团', badge: '保卫河防',
    date: '1937 年秋设留守处 · 年底扩编为留守兵团', place: '延安',
    from: '各师留守部队（多为陕北红军改编）',
    leaders: [
      { n: '萧劲光', t: '司令员兼政治委员' },
    ],
    rows: [
      { src: 'h1', from: '红32军 → 第120师第718团', to: '留守兵团', note: '团长文年生' },
      { src: 'h4', from: '红4军第12师 → 第129师第770团', to: '留守兵团', note: '与385旅旅部驻陇东' },
      { src: 'sb', from: '陕南红74师 → 第115师炮兵营、辎重营', to: '留守兵团', note: '红25军的火种' },
      { src: 'sb', from: '红27、28、29、30军及陕北独立团 → 各师直属营', to: '警备第1—8团', note: '1937 年底整编为八个警备团' },
    ],
    desc: '三个师东渡黄河后，各师均留一部守卫陕甘宁边区——多为刚由陕北红军改编的部队。1937 年秋，留守部队组成八路军后方留守处（主任萧劲光），年底扩编为留守兵团，辖警备第1—8团等约 9000 人，担负保卫中共中央、保卫边区、把守黄河千里河防的任务。',
    fate: '八年抗战中，留守兵团肃清边区匪患，粉碎日军对河防的数十次进攻；1942 年与第120师兼晋西北军区合组陕甘宁晋绥联防军，成为保卫延安、保卫党中央的基干力量。',
  },
  /* ===== 新四军 ===== */
  {
    id: 'x4', group: 'xj', name: '新四军军部', badge: '全军 1.03万余人',
    date: '1937.10.12 改编令 · 1938.1 军部成立于南昌', place: '汉口 → 南昌 → 皖南云岭',
    from: '南方八省红军游击队',
    leaders: [
      { n: '叶挺', t: '军长（北伐名将 · 南昌起义前敌总指挥 · 广州起义红军总司令）' },
      { n: '项英', t: '副军长（中央分局书记 · 赣粤边三年游击战争主要领导人）' },
      { n: '张云逸', t: '参谋长' },
      { n: '周子昆', t: '副参谋长' },
      { n: '袁国平', t: '政治部主任' },
      { n: '邓子恢', t: '政治部副主任' },
    ],
    rows: [
      { src: 'gj', from: '赣粤边游击队（项英、陈毅部）', to: '军部机关', note: '油山——三年游击战争的中枢' },
      { src: 'gj', from: '湘南、闽中游击队', to: '军部特务营', note: '' },
      { src: 'gj', from: '八省十四个游击区部队', to: '第1—4支队', note: '详见下四卡' },
    ],
    desc: '1937.10.12，国民政府军委会宣布：南方八省（赣、粤、闽、浙、皖、湘、鄂、豫）十四个游击区的红军游击队，改编为「国民革命军陆军新编第四军」。军长由叶挺出任——他既是北伐铁军的名将，也是南昌起义前敌总指挥；副军长项英则是油山游击队的主心骨、三年游击战争的中枢人物。12.25 军部于汉口成立，1938.1 移驻南昌，4 月全军集结皖南岩寺、皖中，计 1.03 万余人、枪 6200 余支，军部后驻泾县云岭。',
    fate: '1941.1 皖南事变，军部及皖南部队 9000 余人遭国民党军重兵围袭，血战七昼夜大部损失，叶挺下山谈判被扣，项英、周子昆突围后遇害；1.25 军部在苏北盐城重建（代军长陈毅、政治委员刘少奇），此后新四军愈挫愈奋，至抗战胜利时已发展为 30 余万人的华中主力。',
  },
  {
    id: 'x4-1', group: 'xj', name: '新四军第1支队', badge: '韦岗首捷',
    date: '1938 春', place: '湘鄂赣边 · 湘赣边 · 赣粤边',
    from: '湘鄂赣、湘赣边、赣粤边游击队',
    leaders: [
      { n: '陈毅', t: '司令员（中央政府办事处主任 · 《梅岭三章》作者）' },
      { n: '罗炳辉', t: '副司令员（原红32军军长）' },
    ],
    rows: [
      { src: 'gj', from: '湘鄂赣边游击队（红16师余部 · 傅秋涛部）', to: '第1团', note: '红16师三起三落的火种' },
      { src: 'gj', from: '湘赣边、赣粤边游击队（谭余保部 · 项英陈毅油山部）', to: '第2团', note: '团长张正坤' },
    ],
    desc: '第1支队的两个团，来自中央苏区失守后坚持在湘鄂赣、湘赣边和赣粤边的三支游击队——湘鄂赣边的红16师余部曾三起三落，九死一生；赣粤边的油山，正是项英、陈毅坚持三年游击战争的大本营。支队长陈毅即《梅岭三章》的作者——1936 年冬他被围梅山二十余日，写下「断头今日意如何」的绝笔，如今带着劫后余生的队伍走向抗日前线。',
    fate: '1938.6 挺进苏南敌后，开创茅山根据地；6.17 粟裕率先遣支队于镇江韦岗伏击日军车队——新四军江南首战告捷，陈毅赋诗「故国旌旗到江南，终夜喧呼敌胆寒」。',
  },
  {
    id: 'x4-2', group: 'xj', name: '新四军第2支队', badge: '东进江南',
    date: '1938 春', place: '闽西南 · 闽粤边 · 浙南',
    from: '闽西南、闽粤边、浙南游击队',
    leaders: [
      { n: '张鼎丞', t: '司令员（闽西南军政委员会主席）' },
      { n: '粟裕', t: '副司令员（浙南挺进师师长）' },
    ],
    rows: [
      { src: 'gj', from: '闽西南游击队（张鼎丞、邓子恢、谭震林部）', to: '第3团', note: '闽西——二十年红旗不倒' },
      { src: 'gj', from: '闽粤边、浙南游击队（含粟裕、刘英挺进师）', to: '第4团', note: '怀玉山突围的火种' },
    ],
    desc: '第2支队的基干是闽西南游击队——中央红军长征后，张鼎丞、邓子恢、谭震林率部在闽西坚持三年游击战争，保住了「二十年红旗不倒」的土地；第4团中则编入了浙南挺进师——红10军团怀玉山失败后，粟裕、刘英率 500 余人绝境重生的火种。',
    fate: '1938.6 与第1支队并肩东进江宁、当涂、溧水，共同开创苏南根据地；1939.11 新四军江南指挥部成立，陈毅、粟裕分任正副指挥，此后粟裕率部北渡长江，黄桥决战定苏北。',
  },
  {
    id: 'x4-3', group: 'xj', name: '新四军第3支队', badge: '血战繁昌',
    date: '1938 春', place: '闽北 · 闽东',
    from: '闽北、闽东游击队',
    leaders: [
      { n: '张云逸', t: '司令员（军参谋长兼）' },
      { n: '谭震林', t: '副司令员' },
      { n: '叶飞', t: '第6团团长（闽东独立师出身）' },
    ],
    rows: [
      { src: 'gj', from: '闽北游击队（崇安 · 黄道部）', to: '第5团', note: '方志敏赣东北的余脉' },
      { src: 'gj', from: '闽东游击队（叶飞 · 闽东独立师）', to: '第6团', note: '叶飞任团长' },
    ],
    desc: '第3支队由闽北、闽东两块游击区的部队编成。闽北游击队是方志敏创建的赣东北（闽浙赣）苏区的余脉——红10军团失败后，黄道等在武夷山中把火种保存了三年；闽东独立师则是叶飞等人拉起的队伍，一直坚持到国共停战协议达成，建制完整地等来了改编。谭震林率部驻防皖南，扼守军部门户。',
    fate: '1939 年间五次繁昌保卫战，谭震林部血战日军，打出了「血战繁昌」的威名；第6团 1939.5 东进，夜袭浒墅关、火烧虹桥机场，发展为「江抗」主力。',
  },
  {
    id: 'x4-4', group: 'xj', name: '新四军第4支队', badge: '对日第一仗',
    date: '1938 春', place: '鄂豫皖 · 鄂豫边',
    from: '鄂豫皖红28军及鄂豫边游击队',
    leaders: [
      { n: '高敬亭', t: '司令员（红28军政治委员）' },
    ],
    rows: [
      { src: 'gj', from: '鄂豫皖红28军（大别山三年游击）', to: '第7、9团及手枪团', note: '3100余人 · 新四军兵力最众' },
      { src: 'gj', from: '鄂豫边游击队（桐柏山 · 周骏鸣部）', to: '第8团', note: '' },
    ],
    desc: '红25军主力长征后，高敬亭以千余人重建红28军，在大别山坚持三年游击战争，以「便衣队」战术粉碎国民党军反复「清剿」，使鄂豫皖的红旗始终不倒；改编时红28军与鄂豫边（桐柏山）游击队合编为第4支队，共 3100 余人——新四军初创时兵力最多的一个支队。',
    fate: '1938.5 挺进皖中，5.12 蒋家河口伏击战全歼日军一小队——新四军对日作战第一枪；部队后发展为淮南根据地的新四军第2师主力。高敬亭 1939.6 遭错杀，1977 年平反昭雪。',
  },
];

const Cast = {
  el: null,
  subTab: 'bases',            // 二级 tab：'bases'（根据地） | 'battles'（战役） | 'army'（整编） | 'cast'（角色谱）
  openBattles: new Set(['laoshan', 'shaanbei', '8lu']),   // 默认展开首张卡片（战役/根据地/整编共用展开状态）
  _pidMap: null,

  init() {
    this.el = document.getElementById('cast-view');
    this.renderSub();
  },

  show() {
    this.el.classList.remove('hidden');
    this.renderSub();
    this.renderPanel();
  },

  hide() {
    this.el.classList.add('hidden');
  },

  /* 二级 tab 栏（页内元素，随内容渲染） */
  subTabsHTML() {
    return `
      <div id="cast-subtabs">
        <button type="button" data-sub="bases"${this.subTab === 'bases' ? ' class="active"' : ''}>根据地</button>
        <button type="button" data-sub="battles"${this.subTab === 'battles' ? ' class="active"' : ''}>战役</button>
        <button type="button" data-sub="army"${this.subTab === 'army' ? ' class="active"' : ''}>整编</button>
        <button type="button" data-sub="cast"${this.subTab === 'cast' ? ' class="active"' : ''}>角色谱</button>
      </div>`;
  },

  bindSubTabs() {
    this.el.querySelectorAll('#cast-subtabs button').forEach(btn => {
      btn.addEventListener('click', () => this.setSubTab(btn.dataset.sub));
    });
  },

  /* ---------- 二级 tab 切换 ---------- */
  setSubTab(sub) {
    if (this.subTab === sub) return;
    this.subTab = sub;
    this.renderSub();
    this.renderPanel();
  },

  renderSub() {
    if (this.subTab === 'battles') this.renderBattles();
    else if (this.subTab === 'bases') this.renderBases();
    else if (this.subTab === 'army') this.renderArmy();
    else this.renderCast();
  },

  /* 姓名 → person_id（点击牺牲将领人名打开履历时光机） */
  pidOf(name) {
    if (!this._pidMap) {
      this._pidMap = {};
      PEOPLE.forEach(p => { this._pidMap[p.name] = p.person_id; });
    }
    return this._pidMap[name] || null;
  },

  /* ============ 子 tab 1：角色卡片墙（原有功能） ============ */
  renderCast() {
    const groups = SERIES_CAST.map(g => {
      const cards = g.cast.map(c => {
        const p = PEOPLE_MAP[c.p];
        if (!p) return '';
        return `
          <button class="cast-card ${g.side}" type="button" data-pid="${c.p}">
            <span class="avatar">${p.name[0]}</span>
            <span class="cast-info">
              <span class="cast-name">${p.name}</span>
              <span class="cast-role">${c.r}</span>
            </span>
          </button>`;
      }).join('');
      return `
        <div class="cast-group ${g.side}">
          <div class="cast-group-head">
            <span class="cg-bar"></span>
            <span class="cg-name">${g.name}</span>
            <span class="cg-count">${g.cast.length} 人</span>
          </div>
          <div class="cast-grid">${cards}</div>
        </div>`;
    }).join('');

    const total = SERIES_CAST.reduce((s, g) => s + g.cast.length, 0);
    this.el.innerHTML = `
      <div class="cast-wrap">
        ${this.subTabsHTML()}
        <div class="cast-title">
          <h1>《伟大的长征》· 角色谱</h1>
          <p>共 ${total} 位角色 —— 领袖、将帅、战士、群众与对手，共同构成这部史诗</p>
        </div>
        ${groups}
      </div>`;

    this.el.querySelectorAll('.cast-card').forEach(card => {
      card.addEventListener('click', () => App.selectPerson(card.dataset.pid));
    });
    this.bindSubTabs();
  },

  /* ============ 子 tab 2：战役（长征之后 · 抗战之前） ============ */
  renderBattles() {
    const cards = POST_MARCH_BATTLES.map((b, i) => this.battleCard(b, i)).join('');
    this.el.innerHTML = `
      <div class="cast-wrap">
        ${this.subTabsHTML()}
        <div class="cast-title">
          <h1>长征之后 · 抗战之前</h1>
          <p>1935.9 — 1937.7 · 各路红军到达陕北后的八场战役 —— 从「切尾巴」到山城堡</p>
        </div>
        <div class="bt-intro">
          <div class="bt-intro-head">时间口径与脉络</div>
          <div class="bt-intro-grid">
            <div class="bt-kv"><span>红25军</span><b>1935.9.15</b><i>永坪会师 · 先期到达</i></div>
            <div class="bt-kv"><span>红一方面军</span><b>1935.10.19</b><i>抵达吴起镇</i></div>
            <div class="bt-kv"><span>红四方面军</span><b>1936.10.9</b><i>会宁会师</i></div>
            <div class="bt-kv"><span>红二方面军</span><b>1936.10.22</b><i>将台堡会师</i></div>
            <div class="bt-kv end"><span>全面抗战</span><b>1937.7.7</b><i>卢沟桥事变</i></div>
          </div>
          <p>本页不以 1936.10 三大主力会师为界，而以<b style="color:var(--gold)">各路军先后到达之日</b>起计，收录至 1937.7.7 全面抗战爆发前的 8 场战役，按时间排序。其中西路军战事一直延续到 1937.4，与山城堡战役时间交叠；会师之际的大墩梁阻击战（1936.10.23，红5军副军长罗南辉牺牲）已收录于「牺牲英烈」名录。1936.12.12 西安事变后，国共达成合作；1937.8 红军主力改编为八路军、10 月南方游击队改编为新四军——长征的队伍，就此开赴抗日前线。</p>
        </div>
        ${cards}
      </div>`;

    this.el.querySelectorAll('.bt-head').forEach(head => {
      head.addEventListener('click', () => {
        const card = head.closest('.battle-card');
        const id = card.dataset.id;
        if (this.openBattles.has(id)) { this.openBattles.delete(id); card.classList.remove('open'); }
        else { this.openBattles.add(id); card.classList.add('open'); }
      });
    });
    this.el.querySelectorAll('.bt-m-name.link').forEach(n => {
      n.addEventListener('click', e => {
        e.stopPropagation();
        App.selectPerson(n.dataset.pid);
      });
    });
    this.bindSubTabs();
  },

  /* 人物行：显式 pid 优先（pid: null 强制不链接，避免同名误链），否则按姓名自动匹配 */
  personRow(m, cls = '') {
    const pid = m.pid !== undefined ? m.pid : this.pidOf(m.n);
    const nameHtml = pid
      ? `<span class="bt-m-name link" data-pid="${pid}">${m.n}</span>`
      : `<span class="bt-m-name">${m.n}</span>`;
    return `<div class="bt-martyr${cls ? ' ' + cls : ''}">${nameHtml}`
      + (m.t ? `<span class="bt-m-title">${m.t}</span>` : '')
      + (m.d ? `<span class="bt-m-note">${m.d}</span>` : '')
      + `</div>`;
  },

  /* 牺牲名录块：知名烈士行 + 概述 */
  martyrRows(martyrs, note) {
    return (martyrs.length ? martyrs.map(m => this.personRow(m)).join('') : '')
      + `<p class="bt-m-extra">${note}</p>`;
  },

  battleCard(b, i) {
    const idx = String(i + 1).padStart(2, '0');
    const martyrsHtml = this.martyrRows(b.martyrs, b.martyrsNote);
    return `
      <div class="battle-card${this.openBattles.has(b.id) ? ' open' : ''}" data-id="${b.id}">
        <button class="bt-head" type="button">
          <span class="bt-idx">${idx}</span>
          <span class="bt-head-main">
            <span class="bt-name">${b.name}</span>
            <span class="bt-meta">${b.date} · ${b.place}</span>
          </span>
          <span class="bt-chips">
            <span class="bt-chip f">${b.forces}</span>
            <span class="bt-chip e">${b.enemy}</span>
          </span>
          <span class="bt-result">${b.result}</span>
          <span class="bt-caret">▾</span>
        </button>
        <div class="bt-body">
          <div class="bt-cmd"><span>指挥</span>${b.commanders}</div>
          <div class="bt-sec"><h5>背景</h5><p>${b.bg}</p></div>
          <div class="bt-sec"><h5>意图</h5><p>${b.intent}</p></div>
          <div class="bt-sec"><h5>经过</h5><p>${b.course}</p></div>
          <div class="bt-sec"><h5>伤亡情况</h5><p>${b.casualties}</p></div>
          <div class="bt-sec"><h5>牺牲将领与英雄</h5>${martyrsHtml}</div>
          <div class="bt-sec"><h5>战略目标达成</h5><ul>${b.goals.map(g => `<li>${g}</li>`).join('')}</ul></div>
        </div>
      </div>`;
  },

  /* ============ 子 tab 3：根据地（四路大军之外的红军部队与根据地） ============ */
  renderBases() {
    const cards = OTHER_BASES.map((b, i) => this.baseCard(b, i)).join('');
    this.el.innerHTML = `
      <div class="cast-wrap">
        ${this.subTabsHTML()}
        <div class="cast-title">
          <h1>长征之外 · 全国红军与根据地</h1>
          <p>与四路长征大军同时代的部队与根据地 —— 陕北、先遣队、游击战争、白山黑水</p>
        </div>
        <div class="bt-intro">
          <div class="bt-intro-head">收录口径</div>
          <p>本页收录与四路长征大军（红一、红二、红四方面军、红25军）同时代的全国其他红军部队与根据地：陕北红军（长征落脚点）、北上抗日先遣队（红10军团）、浙南挺进师、南方八省三年游击战争、鄂豫皖红28军、鄂豫陕红74师、琼崖红军，以及同属中共武装、在白山黑水间坚持抗战的东北抗日联军（延伸）。</p>
          <p>红二、六军团长征前段经营的湘鄂川黔根据地、红四方面军长征前经营的川陕根据地，已在主时间轴覆盖，不在此单列；左右江（红7军、红8军主力 1930 年北上后根据地于 1932 年失陷，韦拔群牺牲）、海陆丰等早期根据地此时已不复存在，仅存于史册。</p>
        </div>
        ${cards}
      </div>`;

    this.el.querySelectorAll('.bt-head').forEach(head => {
      head.addEventListener('click', () => {
        const card = head.closest('.battle-card');
        const id = card.dataset.id;
        if (this.openBattles.has(id)) { this.openBattles.delete(id); card.classList.remove('open'); }
        else { this.openBattles.add(id); card.classList.add('open'); }
      });
    });
    this.el.querySelectorAll('.bt-m-name.link').forEach(n => {
      n.addEventListener('click', e => {
        e.stopPropagation();
        App.selectPerson(n.dataset.pid);
      });
    });
    this.bindSubTabs();
  },

  baseCard(b, i) {
    const idx = String(i + 1).padStart(2, '0');
    const leadersHtml = b.leaders.map(l => this.personRow(l, 'ld')).join('');
    const martyrsHtml = this.martyrRows(b.martyrs, b.martyrsNote);
    return `
      <div class="battle-card${this.openBattles.has(b.id) ? ' open' : ''}" data-id="${b.id}">
        <button class="bt-head" type="button">
          <span class="bt-idx">${idx}</span>
          <span class="bt-head-main">
            <span class="bt-name">${b.name}</span>
            <span class="bt-meta">${b.date} · ${b.place}</span>
          </span>
          <span class="bt-chips">
            <span class="bt-chip f">${b.units}</span>
          </span>
          <span class="bt-result">${b.badge}</span>
          <span class="bt-caret">▾</span>
        </button>
        <div class="bt-body">
          <div class="bt-sec"><h5>领导人</h5>${leadersHtml}</div>
          <div class="bt-sec"><h5>兴衰经过</h5><p>${b.desc}</p></div>
          <div class="bt-sec"><h5>牺牲将领与英雄</h5>${martyrsHtml}</div>
          <div class="bt-sec"><h5>归宿</h5><p>${b.fate}</p></div>
        </div>
      </div>`;
  },

  /* ============ 子 tab 3：整编（八路军 · 新四军） ============ */
  renderArmy() {
    const baCards = ARMY_REORG.filter(u => u.group === 'ba').map(u => this.armyCard(u)).join('');
    const xjCards = ARMY_REORG.filter(u => u.group === 'xj').map(u => this.armyCard(u)).join('');
    this.el.innerHTML = `
      <div class="cast-wrap">
        ${this.subTabsHTML()}
        <div class="cast-title">
          <h1>红星换青天 · 整编序列</h1>
          <p>1937—1938 · 长征的队伍走向抗日前线 —— 每一支八路军、新四军部队，都能在长征与三年游击战争中找到它的来路</p>
        </div>
        <div class="bt-intro">
          <div class="bt-intro-head">改编时间线</div>
          <div class="bt-intro-grid">
            <div class="bt-kv"><span>西安事变</span><b>1936.12.12</b><i>由内战转向合作</i></div>
            <div class="bt-kv"><span>卢沟桥事变</span><b>1937.7.7</b><i>全面抗战爆发</i></div>
            <div class="bt-kv"><span>八路军改编</span><b>1937.8.25</b><i>红军主力 → 三个师</i></div>
            <div class="bt-kv"><span>新四军改编令</span><b>1937.10.12</b><i>南方游击队 → 四个支队</i></div>
            <div class="bt-kv end"><span>新四军军部</span><b>1938.1</b><i>成立于南昌</i></div>
          </div>
          <p>本页回答一个问题：<b style="color:var(--gold)">开赴抗日前线的八路军、新四军，分别由哪些部队整编而来？</b>——长征到达陕北的三大红军方面军与陕北红军合编为八路军三个师，南方八省十四个游击区的红军游击队编为新四军四个支队。每张卡片内的对照行都标注来源部队的「血统」徽章，四路长征大军与三年游击战争的血脉，就此汇入民族解放战争的洪流。</p>
          <div class="am-legend">
            <span><i class="am-src h1">红一</i>红一方面军 · 中央红军</span>
            <span><i class="am-src h25">红15</i>红15军团（红25军+陕北红26、27军）</span>
            <span><i class="am-src h2">红二</i>红二方面军（红2、6军团及红32军）</span>
            <span><i class="am-src h4">红四</i>红四方面军</span>
            <span><i class="am-src sb">陕北</i>陕北及地方红军</span>
            <span><i class="am-src gj">游击</i>南方八省红军游击队</span>
          </div>
        </div>
        <div class="am-group-head">
          <span class="ag-bar"></span>
          <span class="ag-name">国民革命军第八路军</span>
          <span class="ag-sub">1937.8.25 · 红军主力改编 · 全军 4.6 万余人 · 辖三个师</span>
        </div>
        ${baCards}
        <div class="am-group-head xj">
          <span class="ag-bar"></span>
          <span class="ag-name">国民革命军陆军新编第四军</span>
          <span class="ag-sub">1937.10.12 改编令 · 南方八省游击队 · 全军 1.03 万余人 · 辖四个支队</span>
        </div>
        ${xjCards}
      </div>`;

    this.el.querySelectorAll('.bt-head').forEach(head => {
      head.addEventListener('click', () => {
        const card = head.closest('.battle-card');
        const id = card.dataset.id;
        if (this.openBattles.has(id)) { this.openBattles.delete(id); card.classList.remove('open'); }
        else { this.openBattles.add(id); card.classList.add('open'); }
      });
    });
    this.el.querySelectorAll('.bt-m-name.link').forEach(n => {
      n.addEventListener('click', e => {
        e.stopPropagation();
        App.selectPerson(n.dataset.pid);
      });
    });
    this.bindSubTabs();
  },

  armyCard(u) {
    const i = ARMY_REORG.indexOf(u);
    const idx = String(i + 1).padStart(2, '0');
    const leadersHtml = u.leaders.map(l => this.personRow(l, 'ld')).join('');
    const rowsHtml = u.rows.map(r => `
      <div class="am-row">
        <i class="am-src ${r.src}">${ARMY_SRC_LABEL[r.src]}</i>
        <span class="am-from">${r.from}</span>
        <span class="am-arrow">➜</span>
        <span class="am-to">${r.to}</span>
        <span class="am-note">${r.note || ''}</span>
      </div>`).join('');
    return `
      <div class="battle-card${this.openBattles.has(u.id) ? ' open' : ''}" data-id="${u.id}">
        <button class="bt-head" type="button">
          <span class="bt-idx">${idx}</span>
          <span class="bt-head-main">
            <span class="bt-name">${u.name}</span>
            <span class="bt-meta">${u.date} · ${u.place}</span>
          </span>
          <span class="bt-chips">
            <span class="bt-chip f">${u.from}</span>
          </span>
          <span class="bt-result">${u.badge}</span>
          <span class="bt-caret">▾</span>
        </button>
        <div class="bt-body">
          <div class="bt-sec"><h5>主官</h5>${leadersHtml}</div>
          <div class="bt-sec"><h5>整编来源对照</h5><div class="am-table">${rowsHtml}</div></div>
          <div class="bt-sec"><h5>来路</h5><p>${u.desc}</p></div>
          <div class="bt-sec"><h5>去向</h5><p>${u.fate}</p></div>
        </div>
      </div>`;
  },

  /* ---------- 右侧面板：说明 / 履历 ---------- */
  renderPanel() {
    if (App.focusPerson) { Profiler.renderPerson(App.focusPerson); return; }
    if (this.subTab === 'battles') this.renderBattlesPanel();
    else if (this.subTab === 'bases') this.renderBasesPanel();
    else if (this.subTab === 'army') this.renderArmyPanel();
    else this.renderCastPanel();
  },

  /* 面板 · 角色谱说明 */
  renderCastPanel() {
    document.getElementById('detail-sec-title').textContent = '番外 · 角色谱说明';
    const rows = SERIES_CAST.map(g => `
      <div class="ud-change-item" style="display:flex;justify-content:space-between">
        <span class="c-event">${g.name}</span><span class="c-date">${g.cast.length} 人</span>
      </div>`).join('');
    document.getElementById('detail-body').innerHTML = `
      <div class="unit-detail">
        <div class="ud-note">电视剧《伟大的长征》以长征为主线，再现了这段历史中的领袖、将帅、战士、群众，以及围追堵截的对手。本谱罗列剧中出现的全部角色，并按阵营分组。</div>
        <div class="ud-changes">
          <h4>角色分组</h4>
          ${rows}
        </div>
        <div class="ud-note" style="border-left-color:var(--gold)">点击左侧任意角色卡片，查看其履历时光机；国民党方面人物单列分组，履历条以蓝色呈现。</div>
      </div>`;
  },

  /* 面板 · 战役说明与速览 */
  renderBattlesPanel() {
    document.getElementById('detail-sec-title').textContent = '番外 · 战役说明';
    const rows = POST_MARCH_BATTLES.map((b, i) => `
      <div class="ud-change-item bt-nav" data-id="${b.id}" style="display:flex;justify-content:space-between;cursor:pointer">
        <span class="c-event">${String(i + 1).padStart(2, '0')} ${b.name}</span>
        <span class="c-date">${b.date.split('—')[0].trim()}</span>
      </div>`).join('');
    document.getElementById('detail-body').innerHTML = `
      <div class="unit-detail">
        <div class="ud-note"><b>时间口径</b>：不以 1936.10 会师为界，而以各路军先后到达之日计——红25军 1935.9.15 永坪、红一方面军 1935.10.19 吴起镇、红四方面军 1936.10.9 会宁、红二方面军 1936.10.22 将台堡；下限为 1937.7.7 卢沟桥事变。</div>
        <div class="ud-note"><b>收录</b>：区间内红军主力战役 8 场，按时间排序。西路军战事延续至 1937.4，与山城堡战役时间交叠；会师之际的大墩梁阻击战（1936.10.23，红5军副军长罗南辉牺牲）已收录于「牺牲英烈」名录。</div>
        <div class="ud-note"><b>合计</b>：八役毙伤俘敌 4 万余人；牺牲军、师级将领 8 位——刘志丹、董振堂、杨克明、陈伯稚、陈海松、孙玉清、熊厚发、郑义斋。</div>
        <div class="ud-changes">
          <h4>战役速览 · 点击定位展开</h4>
          ${rows}
        </div>
        <div class="ud-note" style="border-left-color:var(--gold)">点击画布中带下划线的人名（如董振堂、刘志丹），可打开其履历时光机；点击战役卡片头部可展开/收起详情。</div>
      </div>`;
    document.getElementById('detail-body').querySelectorAll('.bt-nav').forEach(row => {
      row.addEventListener('click', () => {
        const id = row.dataset.id;
        this.openBattles.add(id);
        const card = this.el.querySelector(`.battle-card[data-id="${id}"]`);
        if (!card) return;
        card.classList.add('open');
        card.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  },

  /* 面板 · 根据地说明与速览 */
  renderBasesPanel() {
    document.getElementById('detail-sec-title').textContent = '番外 · 根据地说明';
    const rows = OTHER_BASES.map((b, i) => `
      <div class="ud-change-item bt-nav" data-id="${b.id}" style="display:flex;justify-content:space-between;cursor:pointer">
        <span class="c-event">${String(i + 1).padStart(2, '0')} ${b.name}</span>
        <span class="c-date">${b.date.split('—')[0].trim()}</span>
      </div>`).join('');
    document.getElementById('detail-body').innerHTML = `
      <div class="unit-detail">
        <div class="ud-note"><b>收录范围</b>：与四路长征大军同时代的全国其他红军部队与根据地，共 8 处——陕北红军、北上抗日先遣队（红10军团）、浙南挺进师、南方八省三年游击战争、鄂豫皖红28军、鄂豫陕红74师、琼崖红军，及延伸介绍东北抗日联军。</div>
        <div class="ud-note"><b>不单列</b>：湘鄂川黔（红二、六军团长征前段）、川陕（红四方面军长征前经营）已在主时间轴覆盖；左右江、海陆丰等早期根据地此时已失陷。</div>
        <div class="ud-note"><b>结局</b>：南方八省游击队与鄂豫皖红28军 1938 年改编为新四军；红74师编入八路军留守部队；琼崖、东北坚持至抗战胜利乃至海南解放。</div>
        <div class="ud-changes">
          <h4>根据地速览 · 点击定位展开</h4>
          ${rows}
        </div>
        <div class="ud-note" style="border-left-color:var(--gold)">本页出现的领导人、牺牲将领均已录入人物库——点击带下划线的人名即可打开其履历时光机（杨靖宇、赵一曼、高敬亭、张鼎丞等亦可通过顶栏搜索直达）；抗联等超出长征时间轴的履历条收敛于轴两端。</div>
      </div>`;
    document.getElementById('detail-body').querySelectorAll('.bt-nav').forEach(row => {
      row.addEventListener('click', () => {
        const id = row.dataset.id;
        this.openBattles.add(id);
        const card = this.el.querySelector(`.battle-card[data-id="${id}"]`);
        if (!card) return;
        card.classList.add('open');
        card.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  },

  /* 面板 · 整编说明与速览 */
  renderArmyPanel() {
    document.getElementById('detail-sec-title').textContent = '番外 · 整编说明';
    const rows = ARMY_REORG.map((u, i) => `
      <div class="ud-change-item bt-nav" data-id="${u.id}" style="display:flex;justify-content:space-between;cursor:pointer">
        <span class="c-event">${String(i + 1).padStart(2, '0')} ${u.name}</span>
        <span class="c-date">${u.badge}</span>
      </div>`).join('');
    document.getElementById('detail-body').innerHTML = `
      <div class="unit-detail">
        <div class="ud-note"><b>八路军</b>（1937.8.25）：红一方面军（红1、15军团及红74师）→ 第115师；红二方面军及红27、28、32军 → 第120师；红四方面军第4、31军及红29、30军 → 第129师。全军 4.6 万余人，各师留守部队合编为留守兵团。</div>
        <div class="ud-note"><b>新四军</b>（1937.10.12 改编令）：南方八省十四个游击区部队编为四个支队——第1支队←湘鄂赣等游击队，第2支队←闽西南及浙南游击队，第3支队←闽北、闽东游击队，第4支队←鄂豫皖红28军。1938.1 军部成立于南昌，全军 1.03 万余人。</div>
        <div class="ud-note"><b>徽章血统</b>：红一（中央红军）、红15（红25军+陕北红军）、红二、红四（方面军）、陕北（地方红军）、游击（南方游击队）——长征的每一路人马，都能在这里找到归宿。</div>
        <div class="ud-changes">
          <h4>整编速览 · 点击定位展开</h4>
          ${rows}
        </div>
        <div class="ud-note" style="border-left-color:var(--gold)">卡片中带下划线的人名可打开其履历时光机；点击卡片头部可展开/收起整编来源对照。</div>
      </div>`;
    document.getElementById('detail-body').querySelectorAll('.bt-nav').forEach(row => {
      row.addEventListener('click', () => {
        const id = row.dataset.id;
        this.openBattles.add(id);
        const card = this.el.querySelector(`.battle-card[data-id="${id}"]`);
        if (!card) return;
        card.classList.add('open');
        card.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  },
};

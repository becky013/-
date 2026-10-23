/* ═══════════════════════════════════════════════════════════════
   i18n.js — 首页中英文切换
   纯展示层:只替换文本节点,不改任何数据、链接或交互逻辑
   ═══════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  var ZH = {
    /* ── 顶栏 / 导航 ── */
    "3D Site Selection & Investment Platform": "三维选址与投资决策平台",
    "Project Overview": "项目总览",
    "Start of workflow": "工作流起点",
    "End of workflow": "工作流终点",
    "Current Context": "当前上下文",
    "Next": "下一步",
    "Previous": "上一步",
    "Vertiport Planner": "Vertiport Planner",
    "Overview": "总览",
    "Site Screening": "选址筛查",
    "Site Detail": "点位详情",
    "Configurator": "方案配置",
    "Route Simulation": "航线仿真",
    "Investment Decision": "投资决策",

    /* ── 首屏 ── */
    "Low-Altitude Economy Infrastructure Planning": "低空经济基础设施规划",
    "Site selection, scheme generation, simulation and investment — in a single closed loop.":
      "选址、方案生成、仿真与投资 —— 在同一个闭环里完成。",
    "This is not a map viewer. It is a decision system for organisations building vertiport infrastructure — developers, operators, campus owners and government partners. It answers whether a location is viable, what it should look like, what it costs, whether it can get regulatory approval, and whether it is worth prioritising.":
      "这不是一个地图浏览器,而是一套面向垂直起降场基础设施建设方的决策系统 —— 服务于开发商、运营方、园区业主与政府伙伴。它回答四个问题:这个位置是否可行、应该建成什么样、造价多少、能否通过监管审批,以及是否值得优先推进。",
    "Start Site Screening": "开始选址筛查",
    "Investment Ranking": "投资排序",
    "Configurator Demo": "配置器演示",
    "Candidate Sites": "候选点位",
    "Passed Hard Gates": "通过硬性门槛",
    "Priority Sites": "优先点位",
    "Plate 01 — HK Network Section": "图版 01 — 香港网络剖面",
    "PAK SHEK KOK": "白石角",
    "CYBERPORT": "数码港",
    "HKCEC · ROOFTOP CONVERSION": "会展中心 · 屋顶改建",
    "CONTOUR / WIND ENVELOPE": "等高线 / 风环境包络",

    /* ── 章节标题 ── */
    "City Projects": "城市项目",
    "Run the full decision chain through a single city demo first": "先用一个城市样板跑通完整决策链",
    "The first prototype focuses on Hong Kong — it simultaneously demonstrates rooftop, waterfront, campus and airport-connection site types in one dense, data-rich environment.":
      "首个原型聚焦香港 —— 在一个高密度、数据充分的环境里,同时演示屋顶、滨水、园区与机场衔接四类点位形态。",

    "Recent Analyses": "近期分析",
    "Recently analysed sites and project snapshots": "近期分析过的点位与项目快照",
    "Return directly to a previously analysed candidate, continue configuring a scheme, or review a specific investment scenario.":
      "直接回到此前分析过的候选点位,继续配置方案,或复核某个具体的投资情景。",

    "Six-Step Workflow": "六步工作流",
    "From project modelling to investment recommendation — one connected path": "从项目建模到投资建议 —— 一条连贯的路径",
    "The platform is a sequential six-step workflow, not six isolated pages. Each step carries context — site, scheme, scenario and persona — into the next.":
      "平台是一条有先后顺序的六步工作流,而不是六个孤立页面。每一步都会把上下文 —— 点位、方案、情景与角色权重 —— 带入下一步。",

    "Scoring Model": "评分模型",
    "Hard gates first, then role-weighted composite score": "先过硬性门槛,再算角色加权综合分",
    "Geometry, airspace, obstacles, wind environment and fire egress are treated as binary gate conditions — not blended into an average. Only sites that pass all hard gates enter the weighted scoring model.":
      "几何条件、空域、障碍物、风环境与消防疏散均按「通过 / 不通过」的门槛条件处理,不并入平均分。只有全部通过硬性门槛的点位才进入加权评分模型。",

    "Platform Highlights": "平台亮点",
    "Evidence chains as a product, not a slide deck": "把证据链做成产品,而不是一套 PPT",
    "This prototype already connects recommended sites, scheme tiers, implementation timelines and next actions into a single navigable interface — ready for product review or investor briefing.":
      "该原型已经把推荐点位、方案档位、实施周期与下一步动作串成一个可导航的界面 —— 可直接用于产品评审或投资人路演。",

    /* ── 城市卡片 ── */
    "City Project": "城市项目",
    "Primary Demo": "主样板",
    "Phase 2": "第二阶段",
    "Route Demo": "航线演示",
    "Hong Kong": "香港",
    "Shenzhen": "深圳",
    "GBA Corridor": "大湾区走廊",
    "Five operationally-grounded candidates spanning rooftop heliport conversion, open-surface campus node, urban marina floating platform, waterfront logistics wharf, and a remote island medical node — covering the full typology spectrum in one dense, regulation-mature environment.":
      "五个具备运营基础的候选点位,覆盖屋顶直升机场改建、开放地面园区节点、城市码头浮式平台、滨水物流码头与离岛医疗节点 —— 在一个高密度、监管成熟的环境中跑通全部点位形态。",
    "Strong fit for GBA expansion: tech campuses, headquarters clusters and cross-border commuter demand.":
      "非常契合大湾区扩张场景:科技园区、总部集群与跨境通勤需求。",
    "Regional network lens — illustrates alternate-site coverage, energy relay and inter-city corridor value.":
      "区域网络视角 —— 用于说明备降点覆盖、能源中继与城际走廊价值。",
    "Priority corridors: HKCEC CBD → Pak Shek Kok, Cyberport → Cheung Chau medical chain":
      "优先走廊:会展中心 CBD → 白石角;数码港 → 长洲医疗链路",
    "Best paired with Hong Kong for cross-city network analysis": "建议与香港配合做跨城网络分析",
    "Suitable for investment and regional-partnership briefings": "适用于投资与区域合作路演",
    "Open Hong Kong Demo": "打开香港样板",
    "View Framework": "查看框架",

    /* ── 近期分析 ── */
    "Recommended for Advancement": "建议推进",
    "Priority Due-Diligence": "优先尽调",
    "Demo-Ready": "可演示",
    "HKCEC CBD Passenger Hub": "会展中心 CBD 客运枢纽",
    "Existing shared-use heliport makes HKCEC the most realistic near-term CBD passenger node. FAA EB 105A explicitly supports existing helicopter facility conversion — regulatory pathway is shorter than a greenfield rooftop.":
      "已有的共用直升机场让会展中心成为近期最现实的 CBD 客运节点。FAA EB 105A 明确支持既有直升机设施改建,审批路径比新建屋顶场址更短。",
    "Pak Shek Kok Cargo & Research Node": "白石角货运与科研节点",
    "AIP Supplement lists Pak Shek Kok / HKSTP as an operationalised BVLOS sandbox zone. Active drone delivery to Tai Po Waterfront Pier already running. Ideal open-surface medium vertiport for phased cargo-to-passenger upgrade.":
      "航行资料汇编补充资料已将白石角 / 科学园列为已投入运行的超视距沙盒区,飞往大埔滨水码头的无人机配送已在运行。是分阶段「货运转客运」升级的理想开放地面中型场址。",
    "Cyberport Cross-Sea Medical Link": "数码港跨海医疗链路",
    "AIP-listed sandbox zone. Active Cyberport–Cheung Chau delivery ops including medical supplies to St. John Hospital. South HK Island's critical maritime logistics and emergency node.":
      "航行资料汇编在列的沙盒区。数码港—长洲配送业务已在运行,包含运往圣约翰医院的医疗物资。是港岛南重要的海上物流与应急节点。",
    "Open Site Detail": "打开点位详情",
    "Continue Configuration": "继续配置方案",

    /* ── 六步工作流 ── */
    "Project Modelling": "项目建模",
    "Define city, budget, use-case, aircraft type assumptions and risk appetite to set project boundaries.":
      "确定城市、预算、使用场景、机型假设与风险偏好,划定项目边界。",
    "Overlay airspace rules, obstacles, wind environment, connectivity and energy access to filter viable candidates.":
      "叠加空域规则、障碍物、风环境、接驳条件与能源接入,筛出可行候选点位。",
    "Site Assessment": "点位评估",
    "Output hard-gate status, composite score, key risks and recommended scheme tier for each candidate.":
      "为每个候选点位输出硬性门槛状态、综合评分、关键风险与推荐方案档位。",
    "Module Configuration": "模块配置",
    "Assemble flight, energy, passenger, safety and digital modules on the rooftop or ground plan.":
      "在屋顶或地面平面上装配飞行、能源、旅客、安全与数字化模块。",
    "Link range, charging, turnaround, fleet size, alternates, weather and airspace to verify operational viability.":
      "把航程、充电、周转、机队规模、备降、气象与空域串联起来,验证运营可行性。",
    "Compare CAPEX, OPEX, throughput and payback across multiple sites, schemes and scenarios.":
      "在多点位、多方案、多情景之间比较建设投资、运营成本、吞吐与回收期。",
    "Go to this step": "进入该步骤",

    /* ── 评分维度 ── */
    "Safety & Airspace": "安全与空域",
    "Obstacle clearance, approach/departure surfaces, wind & turbulence, downwash impact, emergency landing & alternate support":
      "障碍物净空、进近 / 离场面、风与湍流、下洗气流影响、迫降与备降支持",
    "Implementation Feasibility": "实施可行性",
    "Structural retrofit difficulty, construction complexity, equipment access, disruption to existing tenants":
      "结构加固难度、施工复杂度、设备进场条件、对既有使用者的干扰",
    "Regulatory Readiness": "监管成熟度",
    "Applicable guidance compliance, approval pathway clarity, night ops / automation / high-frequency requirements":
      "适用规范的符合性、审批路径清晰度、夜航 / 自动化 / 高频次运行要求",
    "Operational Fit": "运营适配度",
    "Aircraft compatibility, stand organisation, charging & turnaround efficiency, time-slot capacity":
      "机型兼容性、机位组织、充电与周转效率、时刻容量",
    "Connectivity & Network": "接驳与网络",
    "Ground transport links, connection value to airports, CBD, campuses, hospitals and waterfront nodes":
      "地面交通接驳,以及与机场、CBD、园区、医院和滨水节点的连接价值",
    "Investment Attractiveness": "投资吸引力",
    "Per-capacity CAPEX, construction timeline, revenue potential and risk-adjusted return":
      "单位产能投资、建设周期、收入潜力与风险调整后回报",

    /* ── 平台亮点 ── */
    "Current Top Recommendation": "当前首选推荐",
    "No. 1": "第 1 名",
    "Composite Score": "综合评分",
    "Recommended Scheme": "推荐方案",
    "Delivery Timeline": "交付周期",
    "View Top Site": "查看首选点位",
    "Platform Logic": "平台逻辑",
    "Decision System": "决策系统",
    "Screen, Configure, Simulate — Then Decide": "筛查、配置、仿真 —— 然后决策",
    "The homepage links site screening, assessment, module configuration, route validation and investment comparison into a single closed loop — not isolated sub-systems.":
      "首页把选址筛查、点位评估、模块配置、航线验证与投资比选连成一个闭环,而不是彼此割裂的子系统。",
    "Lean": "精简型",
    "Standard": "标准型",
    "Enhanced": "增强型",

    /* ── 点位名称 ── */
    "HKCEC / Wan Chai Waterfront Vertiport": "会展中心 / 湾仔滨水垂直起降场",
    "HKSTP / Pak Shek Kok Waterfront Node": "科学园 / 白石角滨水节点",
    "Cyberport / East Lamma Channel Node": "数码港 / 东博寮海峡节点",
    "China Merchants Wharf / West Victoria Harbour": "招商码头 / 维港西",
    "Cheung Chau / St. John Hospital Node": "长洲 / 圣约翰医院节点",
    "Hong Kong's most realistic early-stage CBD node — conversion of an existing shared-use heliport into a fully-compliant vertiport under FAA EB 105A guidance.":
      "香港近期最现实的 CBD 节点 —— 依据 FAA EB 105A 指引,把既有共用直升机场改建为完全合规的垂直起降场。",
    "Hong Kong's most operationally-proven site — AIP-listed BVLOS sandbox with active drone delivery runs already validating this exact corridor.":
      "香港运营验证最充分的点位 —— 航行资料汇编在列的超视距沙盒区,已有实际无人机配送航班在验证这条走廊。",
    "South HK Island's cross-sea medical and logistics gateway — an AIP-listed sandbox node with active Cheung Chau–St. John Hospital drone delivery already running.":
      "港岛南的跨海医疗与物流门户 —— 航行资料汇编在列的沙盒节点,长洲—圣约翰医院的无人机配送已在运行。",
    "West Victoria Harbour's cargo and logistics node — an AIP-listed sandbox site where approach paths run over water, away from residential and CBD zones.":
      "维港西的货运与物流节点 —— 航行资料汇编在列的沙盒点位,进近航径全程沿水面,避开住宅区与 CBD。",
    "The terminal node that proves the network's social value — an island medical and emergency vertistop serving a community that cannot be reached by road.":
      "证明整个网络社会价值的末端节点 —— 服务无法通过陆路抵达社区的离岛医疗与应急起降点。",

    /* ── 页脚 ── */
    "Site Screening Map": "选址筛查地图"
  };
  /* ══ 内页词条(点位详情 / 方案配置 / 航线仿真 / 投资决策 / 地图) ══ */
  Object.assign(ZH, {
    /* ── 通用 ── */
    "Scheme Tier": "方案档位",
    "Stakeholder View": "角色视角",
    "Stakeholder Perspective": "角色视角",
    "City / Region": "城市 / 区域",
    "Investment Scenario": "投资情景",
    "Standard Tier": "标准档",
    "Recommended Tier": "推荐档位",
    "Recommended": "推荐",
    "Optional": "可选",
    "Add Module": "添加模块",
    "Remove Module": "移除模块",
    "Throughput": "吞吐能力",
    "Turnaround": "周转时间",
    "Green": "绿灯",
    "Amber": "黄灯",
    "Red": "红灯",
    "Medium": "中",
    "High": "高",
    "Low": "低",
    "Status": "状态",
    "Payback": "回收期",
    "IRR": "内部收益率",
    "Score": "评分",
    "Site": "点位",
    "CAPEX": "建设投资",
    "Annual Cash": "年度现金流",
    "Risk-Adj.": "风险调整后",
    "Priority Index": "优先指数",
    "Back to Map": "返回地图",
    "← Back to Map": "← 返回地图",
    "← Site Screening": "← 选址筛查",
    "← Site Detail": "← 点位详情",
    "← Configurator": "← 方案配置",
    "← Route Simulation": "← 航线仿真",
    "Configurator →": "方案配置 →",
    "Route Simulation →": "航线仿真 →",
    "Investment Decision →": "投资决策 →",
    "Back to Overview": "返回总览",
    "Open Configurator": "打开方案配置",
    "Validate Routes": "验证航线",
    "Investment Board": "投资看板",
    "Site Detail ·": "点位详情 ·",
    "Configurator Workspace ·": "方案配置工作区 ·",
    "Route Simulation Workspace ·": "航线仿真工作区 ·",
    "Investment Decision Workspace ·": "投资决策工作区 ·",

    /* ── 点位类型代码 ── */
    "R-M · Rooftop Medium": "R-M · 屋顶中型",
    "O-M · Open-Surface Medium": "O-M · 开放地面中型",
    "F-S2 · Urban Marina Floating": "F-S2 · 城市码头浮式",
    "O-S · Open-Surface Small / F-S2": "O-S · 开放地面小型 / F-S2",
    "F-S1 · Remote Coastal Floating": "F-S1 · 离岛滨海浮式",
    "C.M. Wharf": "招商码头",
    "Cheung Chau": "长洲",
    "Pak Shek Kok": "白石角",
    "Cyberport": "数码港",
    "HKCEC": "会展中心",
    "Standard · Green": "标准型 · 绿灯",

    /* ── 点位详情页 ── */
    "Step 3 — Site Detail": "第 3 步 — 点位详情",
    "Why this site is viable — or why it is not": "这个点位为什么可行 —— 或者为什么不可行",
    "This page presents the evidence chain for each candidate: hard gate status, scored dimensions, key risks, literature references and implementation recommendations. Switch between sites and scheme tiers using the tabs below.":
      "本页给出每个候选点位的完整证据链:硬性门槛状态、各维度评分、关键风险、文献依据与实施建议。用下方标签在不同点位和方案档位之间切换。",
    "Wan Chai / CBD · Existing Shared-Use Heliport Conversion": "湾仔 / CBD · 既有共用直升机场改建",
    "Available Area": "可用面积",
    "~1,850 sqm rooftop": "约 1,850 平方米屋顶",
    "Power Supply": "供电条件",
    "11 kV building feeder — expandable": "11 kV 楼宇馈线 —— 可扩容",
    "Ground Access": "地面接驳",
    "4 min — Wan Chai MTR / 6 min — Admiralty MTR": "步行 4 分钟至湾仔站 / 6 分钟至金钟站",
    "Alternate Sites": "备降点位",
    "Pak Shek Kok & China Merchants Wharf both within network": "白石角与招商码头均在网络覆盖范围内",
    "Recommended Starting Configuration · Rooftop Medium — Heliport Conversion": "推荐起步配置 · 屋顶中型 —— 直升机场改建",
    "Initial Vertiport Layout Reference": "初始场址布局参考",
    "A 2-FATO Standard configuration is the recommended entry point. The ~1,850 sqm rooftop accommodates two FATO pads with required safety areas within the existing structural envelope. UAV operations are not recommended at this stage: the dense CBD approach environment prioritises passenger eVTOL over cargo UAV. Phased upgrade to Enhanced is achievable within 24 months upon demand confirmation.":
      "建议以「双 FATO 标准型」作为起步配置。约 1,850 平方米的屋顶可在既有结构范围内容纳两个 FATO 起降坪及所需安全区。现阶段不建议开展无人机业务:密集的 CBD 进近环境应优先保障载人 eVTOL 而非货运无人机。需求确认后,可在 24 个月内分阶段升级至增强型。",
    "Pad Layout": "起降坪布置",
    "eVTOL FATO (2 pads)": "eVTOL FATO(2 个)",
    "Configuration Metrics": "配置指标",
    "eVTOL FATO Pads": "eVTOL FATO 起降坪",
    "UAV Pads": "无人机起降坪",
    "eVTOL Pads": "eVTOL 起降坪",
    "2 FATO": "2 个 FATO",
    "Module CAPEX": "模块投资",
    "Pad Infra. CAPEX": "起降坪基建投资",
    "Total Est. CAPEX": "预估总投资",
    "Site-Specific Constraints": "该点位专属约束",
    "Structural recertification for eVTOL MTOW — FAA EB 105A §5.3 live-load compliance":
      "需按 eVTOL 最大起飞重量重新做结构认证 —— 满足 FAA EB 105A §5.3 活荷载要求",
    "CFD wind study mandatory — corner-flow and tower downwash assessment":
      "必须开展 CFD 风环境研究 —— 评估拐角流与塔楼下洗气流",
    "FATO orientation procedure required — CBD tower cluster constrains south-east approach":
      "需制定 FATO 朝向程序 —— CBD 塔楼群限制东南向进近",
    "Recommended Immediate Actions": "建议立即执行的动作",
    "Commission structural survey and load recertification for eVTOL equipment":
      "委托结构勘察并针对 eVTOL 设备重新做荷载认证",
    "Engage specialist for rooftop CFD wind simulation and FATO orientation study":
      "聘请专业机构开展屋顶 CFD 风环境模拟与 FATO 朝向研究",
    "Apply to Buildings Department for rooftop alteration permit": "向屋宇署申请屋顶改建许可",
    "FAA EB 105A §1.3 — Scope: existing helicopter landing facility conversion":
      "FAA EB 105A §1.3 —— 适用范围:既有直升机起降设施改建",
    "EASA PTS-VPT-DSN §7.2 — Elevated FATO wind environment assessment":
      "EASA PTS-VPT-DSN §7.2 —— 高架 FATO 风环境评估",
    "CAD Shared-Use Heliport Register — HKCEC existing registration":
      "民航处共用直升机场登记册 —— 会展中心既有登记",
    "Customise This Configuration →": "自定义该配置 →",
    "11-Dimension Technical Scoring": "十一维技术评分",
    "Score Breakdown": "评分拆解",
    "Scored 0–100 across 11 dimensions grouped into four clusters: Airspace & Physical Safety, Regulatory & Connectivity, Operational Performance, and Commercial Viability. Weights shift by active stakeholder persona. Scores above 85 are highlighted green; below 70 amber or red.":
      "按 11 个维度、0–100 分制评分,归入四个集群:空域与物理安全、监管与接驳、运营表现、商业可行性。权重随当前角色视角变化。85 分以上标绿,70 分以下标黄或标红。",
    "Airspace & Physical Safety": "空域与物理安全",
    "Flyability, load-bearing capacity and electrical infrastructure": "可飞性、承载能力与电力基础设施",
    "Structural Load": "结构荷载",
    "Power Grid Capacity": "电网容量",
    "Regulatory & Connectivity": "监管与接驳",
    "Approval likelihood, last-mile access and communications coverage": "审批通过概率、最后一公里接驳与通信覆盖",
    "Ground Transport Access": "地面交通接驳",
    "5G / EMI Environment": "5G / 电磁环境",
    "Operational Performance": "运营表现",
    "Throughput capacity and estimated annual operational uptime": "吞吐容量与预估年度可运行时长",
    "Weather Reliability": "气象可靠性",
    "Commercial Viability": "商业可行性",
    "Network centrality, IRR ceiling and buildability": "网络中心度、内部收益率上限与可建性",
    "Network & Route Value": "网络与航线价值",
    "Binary Feasibility Gates": "二元可行性门槛",
    "Hard Gate Status": "硬性门槛状态",
    "Hard gates are pass/warn/fail conditions — not weighted averages. A site with a single fail gate is classified":
      "硬性门槛是「通过 / 警示 / 不通过」的判定条件,不做加权平均。只要有一项不通过,该点位即判定为",
    "Not Feasible": "不可行",
    "regardless of its scored dimensions.": ",与其各维度得分无关。",
    "FATO + Safety Area Envelope": "FATO 与安全区包络",
    "Existing helipad geometry is compliant with 1-FATO Lean layout. Standard tier (2 FATOs) requires edge-clearance optimisation confirmed by survey.":
      "既有直升机坪的几何条件满足单 FATO 精简型布局。标准档(双 FATO)需通过实测确认边缘净空优化方案。",
    "Approach / Departure Obstacle Constraint": "进近 / 离场障碍物约束",
    "Requires Justification": "需专项论证",
    "CBD tower cluster to the south constrains preferred approach bearing. Procedure design and FATO orientation must account for the Central–Admiralty skyline.":
      "南侧 CBD 塔楼群限制了首选进近方位角。程序设计与 FATO 朝向必须考虑中环—金钟一线的天际线。",
    "Wind & Turbulence Conditions": "风与湍流条件",
    "Waterfront corner-flow and adjacent tower downwash require a dedicated CFD wind study per EASA PTS-VPT-DSN §7.2 before commercial approval.":
      "滨水拐角流与邻近塔楼的下洗气流,要求在商业审批前按 EASA PTS-VPT-DSN §7.2 开展专项 CFD 风环境研究。",
    "Emergency Egress & Fire Access": "应急疏散与消防通道",
    "Convention centre infrastructure includes independent vertical circulation and direct Fire Services access; egress design is above baseline requirements.":
      "会展中心自身具备独立垂直交通与消防处直达通道,疏散设计高于基线要求。",
    "Risk Register": "风险台账",
    "Key Risk Signals": "关键风险信号",
    "Each risk is classified High / Medium / Low. High risks may block advancement without specific mitigation. Evidence for each risk is traceable to the reference literature.":
      "每项风险按高 / 中 / 低分级。高风险若无针对性缓解措施,可能直接阻断推进。每项风险的依据均可回溯到参考文献。",
    "Convention Centre Operational Conflict": "会展中心运营冲突",
    "Major events fill the building and roof access routes; flight scheduling must be coordinated with HKCEC event calendar to avoid peak conflicts.":
      "大型活动期间楼体与屋顶通道均被占用,航班排期须与会展中心活动日历协同,避开高峰冲突。",
    "CBD Tower Turbulence": "CBD 塔楼湍流",
    "High-rise canyon effect in Wan Chai creates variable wind conditions at rooftop level. Mandatory pre-approval CFD study and real-time monitoring required.":
      "湾仔高楼峡谷效应使屋顶层风况多变。审批前必须完成 CFD 研究,并配置实时监测。",
    "Structural Load Certification": "结构荷载认证",
    "Existing helipad load rating must be independently recertified for eVTOL MTOW and battery charging equipment per FAA EB 105A §5.3.":
      "既有直升机坪的荷载等级须按 FAA EB 105A §5.3,针对 eVTOL 最大起飞重量与充电设备重新独立认证。",
    "Literature Trace": "文献回溯",
    "Evidence References": "证据来源",
    "Every scoring decision links to at least one reference document — FAA EB 105A, EASA PTS-VPT-DSN, Uber Elevate, Bluenest UAM, ConOps AAM, UKRI Future Flight or EHang City Air Transport.":
      "每一项评分判断都至少关联一份参考文献 —— FAA EB 105A、EASA PTS-VPT-DSN、Uber Elevate、Bluenest UAM、ConOps AAM、UKRI Future Flight 或亿航城市空中交通白皮书。",
    "Literature Reference": "文献依据",
    "FAA EB 105A §1.3 explicitly states guidance applies to existing helicopter landing facilities proposed for conversion to vertiport use.":
      "FAA EB 105A §1.3 明确指出,该指引适用于拟改建为垂直起降场的既有直升机起降设施。",
    "Bluenest UAM typology classifies R-M nodes as ideal for business/commercial areas carrying combined passenger and emergency functions.":
      "Bluenest UAM 分类体系把 R-M 节点定位为商务 / 商业区的理想形态,可同时承担客运与应急功能。",
    "HKCEC is listed in CAD's shared-use heliport register — regulatory baseline exists; amendment pathway is defined, not novel.":
      "会展中心已列入民航处共用直升机场登记册 —— 监管基线已经存在,变更路径是既有流程而非全新审批。",
    "Implementation Recommendation": "实施建议",
    "Start with Standard, scale to the next tier on demand": "先上标准档,按需求再升档",
    "The current recommendation is to enter at the Standard tier with a 12-month delivery target, establish operational proof-of-concept, then upgrade based on load factor and schedule reliability data.":
      "当前建议以标准档进入,交付目标 12 个月,先跑通运营验证,再根据客座率与班次可靠性数据决定升级。",
    "Permit Readiness": "许可成熟度",
    "Revenue Index": "收入指数",
    "Next Actions": "下一步动作",
    "Key uncertainties to resolve before advancing": "推进前需要先解决的关键不确定性",
    "The primary risk is": "首要风险是",
    ". The recommended next step is to enter the configurator, adjust energy, fire, sensor and RMSS modules, then validate the leading route in the simulation page.":
      "。建议下一步进入方案配置页,调整能源、消防、传感与 RMSS 模块,再到仿真页验证首选航线。",

    /* ── 方案配置页 ── */
    "Step 4 — Rooftop Workspace & Vertiport Configurator": "第 4 步 — 屋顶工作区与场址配置器",
    "Every module change updates cost, throughput, power demand and feasibility status": "每次模块增减都会即时更新造价、吞吐、用电需求与可行性状态",
    "Five module categories — Flight Operations, Energy Systems, Passenger & Cargo, Safety & Environment, and Digital & Control — are drawn from FAA EB 105A, EASA PTS-VPT-DSN and the ConOps AAM framework. Adding fast charging automatically flags the need for cooling, ESS and elevated fire-separation requirements.":
      "五个模块大类 —— 飞行运行、能源系统、旅客与货运、安全与环境、数字化与管控 —— 取自 FAA EB 105A、EASA PTS-VPT-DSN 与 ConOps AAM 框架。一旦加入快充,系统会自动提示需要配套冷却、储能与更高等级的防火分隔。",
    "Lean — Early demo, low-frequency": "精简型 —— 早期演示、低频次",
    "Standard — Stable commercial": "标准型 —— 稳定商业运营",
    "Enhanced — High-capacity hub": "增强型 —— 高容量枢纽",
    "Module Library": "模块库",
    "Vertiport Module Catalogue": "场址模块目录",
    "Each module shows its indicative CAPEX increment, throughput contribution and power requirement. Modules marked":
      "每个模块标注了其指示性投资增量、吞吐贡献与用电需求。标记为",
    "are included in the selected scheme tier by default. Adding or removing a module immediately recalculates the summary panel on the right.":
      "的模块默认包含在所选方案档位中。增删任一模块,右侧汇总面板会立即重算。",
    "Flight Ops": "飞行运行",
    "FATO / TLOF Dual Zone": "FATO / TLOF 双区",
    "Provides the basic geometry for touchdown, lift-off and the required safety/protection area per EASA PTS-VPT-DSN and FAA AC 150/5390-3.":
      "按 EASA PTS-VPT-DSN 与 FAA AC 150/5390-3 提供接地、离地的基本几何条件及所需安全 / 保护区。",
    "Dual Aircraft Stands": "双机位停机坪",
    "Adds taxi-through / parking / parallel-turnaround flexibility. Increases throughput without proportional energy cost.":
      "增加穿行滑行 / 停放 / 并行周转的灵活度,在不成比例增加能耗的前提下提升吞吐。",
    "Passenger Processing": "旅客处理",
    "Integrates check-in, security screening, holding lounge and boarding interface. Required for commercial passenger operations.":
      "整合值机、安检、候机厅与登机接口。商业客运运营的必备模块。",
    "Light Cargo Module": "轻型货运模块",
    "Supports cargo loading / unloading physically segregated from passenger flow. Adds UAV and last-mile delivery capability.":
      "支持与客流物理分隔的货物装卸,增加无人机与最后一公里配送能力。",
    "Megawatt Fast Charging": "兆瓦级快充",
    "Reduces turnaround charging time significantly but raises peak demand and requires dedicated cooling and fire separation (per FAA EB 105A).":
      "显著缩短周转充电时间,但会抬高峰值负荷,并需配套专用冷却与防火分隔(依据 FAA EB 105A)。",
    "Overnight AC Charging": "夜间交流慢充",
    "Lowers daytime peak load. Suited to overnight balancing and lower-frequency operations.":
      "降低白天峰值负荷,适合夜间调峰与低频次运营。",
    "ESS + Backup Power": "储能 + 备用电源",
    "Energy storage for peak shaving, black-start support and resilient operations. Aligns with FAA EB 105A backup power guidance.":
      "用于削峰填谷、黑启动支持与韧性运营的储能系统,符合 FAA EB 105A 备用电源指引。",
    "Battery Cooling Loop": "电池冷却回路",
    "Mandatory safety ancillary for high-frequency fast-charging environments. Reduces fire risk and extends cell life.":
      "高频快充环境下的强制安全配套,降低火灾风险并延长电芯寿命。",
    "Micro-Weather & Turbulence Sensing": "微气象与湍流感知",
    "Wind environment monitoring suited to rooftop and waterfront sites. Feeds real-time data to RMSS and pilot decision support.":
      "适用于屋顶与滨水点位的风环境监测,向 RMSS 与飞行员决策支持系统实时输送数据。",
    "Battery Fire & Emergency Egress": "电池消防与应急疏散",
    "Covers battery fire suppression, access control, egress routes and first-responder interface. Required for all commercial schemes.":
      "覆盖电池灭火、门禁管控、疏散路径与救援对接。所有商业方案的必备模块。",
    "Digital & Operations": "数字化与运营",
    "RMSS — Resource Scheduler": "RMSS —— 资源调度系统",
    "Handles reservation, resource allocation, turnaround coordination and contingency management (per ConOps AAM guidance).":
      "负责预约、资源分配、周转协同与应急处置(依据 ConOps AAM 指引)。",
    "VAS / Situational Awareness": "VAS / 态势感知",
    "Fuses FATO occupancy, weather feeds, sensor health and aircraft state into an operational picture for controllers.":
      "融合 FATO 占用、气象数据、传感器健康与航空器状态,为管控人员生成统一运行态势图。",
    "Zone Layout Preview": "分区布局预览",
    "Operational Floor Plan": "运行平面图",
    "Set eVTOL FATO pads and UAV drone pads below, then activate modules from the catalogue. The floor plan updates in real time — zones activate as you add modules. Pricing from FAA EB 105A benchmarks and 2024 APAC market rates.":
      "在下方设置 eVTOL FATO 起降坪与无人机起降坪数量,再从目录中激活模块。平面图会实时更新 —— 添加模块后对应分区随即点亮。价格取自 FAA EB 105A 基准与 2024 年亚太市场行情。",
    "eVTOL FATO / TLOF Pads": "eVTOL FATO / TLOF 起降坪",
    "HK$2.8M per pad (TLOF surface, safety area,": "每个 HK$2.8M(TLOF 铺面、安全区、",
    "drainage, edge lighting, obstacle marking)": "排水、边灯、障碍标识)",
    "1 – 4 pads · FAA EB 105A Table 4-1": "1 – 4 个 · FAA EB 105A 表 4-1",
    "UAV / Drone Landing Pads": "无人机起降坪",
    "HK$0.45M per pad (dock, charging rail,": "每个 HK$0.45M(机巢、充电导轨、",
    "weather seal, landing sensors)": "防风雨封装、降落传感器)",
    "0 – 6 pads · ConOps AAM §3.2": "0 – 6 个 · ConOps AAM §3.2",
    "FLIGHT OPERATIONS": "飞行运行区",
    "UAV DECK": "无人机平台",
    "PASSENGER & CARGO": "旅客与货运区",
    "ENERGY SYSTEMS": "能源系统区",
    "SAFETY & ENVIRONMENT": "安全与环境区",
    "DIGITAL & CONTROL": "数字化与管控区",
    "TAXIWAY / APRON LANE": "滑行道 / 机坪通道",
    "STAND": "机位",
    "Passenger Lounge": "候机厅",
    "Pax Processing": "旅客处理",
    "Fast Charging": "快速充电",
    "Overnight Chg": "夜间充电",
    "AC Slow": "交流慢充",
    "Fire & Egress System": "消防与疏散系统",
    "Battery Suppression": "电池灭火",
    "Weather Sensor Array": "气象传感阵列",
    "Wind / Visibility": "风况 / 能见度",
    "RMSS Scheduler": "RMSS 调度",
    "Dispatch / Reserve": "派班 / 预留",
    "2 eVTOL FATO": "2 个 eVTOL FATO",
    "2 Aircraft Stands": "2 个机位",
    "2 UAV Pads": "2 个无人机起降坪",
    "@ HK$0.45M ea. · Pad subtotal:": "@ 每个 HK$0.45M · 起降坪小计:",
    "Layout reference: FAA EB 105A §4.3 · EASA PTS-VPT-DSN §5.2 · ConOps AAM §3.1":
      "布局依据:FAA EB 105A §4.3 · EASA PTS-VPT-DSN §5.2 · ConOps AAM §3.1",
    "Scheme Summary": "方案汇总",
    "Total CAPEX (modules + pads)": "总建设投资(模块 + 起降坪)",
    "Modules & systems": "模块与系统",
    "Pad infrastructure (2 FATO + 2 stands + 2 UAV)": "起降坪基建(2 FATO + 2 机位 + 2 无人机坪)",
    "OPEX / yr": "年运营成本",
    "Peak Power": "峰值功率",
    "Fast charging selected without Battery Cooling Loop — fire separation risk elevated.":
      "已选快充但未配电池冷却回路 —— 防火分隔风险升高。",
    "Fast charging without ESS Backup Power — peak demand and grid resilience unmitigated.":
      "已选快充但未配储能备电 —— 峰值负荷与电网韧性缺乏缓解手段。",
    "Once fast charging, ESS and cooling are added, layout constraints shift from pad count to power routing, fire separation and equipment access — per FAA EB 105A §4.5 and EASA PTS-VPT-DSN §6.3.":
      "一旦加入快充、储能与冷却,布局的主要约束就从起降坪数量转向电力路由、防火分隔与设备进场通道 —— 依据 FAA EB 105A §4.5 与 EASA PTS-VPT-DSN §6.3。",
    "Validate Route Operability": "验证航线可运营性",

    /* ── 航线仿真页 ── */
    "Step 5 — Route & Reachability Simulation": "第 5 步 — 航线与可达性仿真",
    "Not \"can it fly?\" — \"can it operate reliably at scale?\"": "问题不是「能不能飞」,而是「能不能规模化稳定运营」",
    "This simulation connects flight distance, charging time, turnaround, fleet size, alternate sites, weather windows and airspace constraints to answer whether daily operations are viable. It reflects the operational framework described in the ConOps AAM document and aligns with UKRI findings on the sensitivity of vertiport economics to occupancy, turnaround and infrastructure cost.":
      "本仿真把航距、充电时间、周转、机队规模、备降点、气象窗口与空域约束串联起来,回答日常运营是否可行。其运行框架取自 ConOps AAM 文件,并与 UKRI 关于「场址经济性对客座率、周转时间和基建成本高度敏感」的结论保持一致。",
    "Operational Parameters": "运营参数",
    "Simulation Assumptions": "仿真假设",
    "Adjust fleet size, turnaround time and weather conditions. Results update immediately. These three variables are the highest-sensitivity drivers of daily capacity and annual revenue, per UKRI socio-economic analysis.":
      "调整机队规模、周转时间与气象条件,结果即时更新。按 UKRI 社会经济分析,这三个变量是日容量与年收入敏感度最高的驱动因素。",
    "Fleet Size": "机队规模",
    "4 aircraft": "4 架",
    "More aircraft = higher daily throughput, but also more stand and charger demand.":
      "机队越大,日吞吐越高,但对机位与充电桩的需求也同步上升。",
    "Turnaround Time": "周转时间",
    "14 min": "14 分钟",
    "Shorter turnaround increases cycles per day but may require higher-spec charging equipment.":
      "周转越短,日循环次数越多,但可能需要更高规格的充电设备。",
    "Weather Conditions": "气象条件",
    "Clear — Full operations": "晴好 —— 全量运行",
    "Normal — Moderate constraint": "一般 —— 中度受限",
    "Constrained — Severe weather": "受限 —— 恶劣天气",
    "Adverse weather adds to the cycle time and reduces reserve margin.": "恶劣天气会拉长单次循环时间并压缩备用裕度。",
    "Available Routes": "可选航线",
    "Route Set": "航线集合",
    "Each route includes distance, flight time, reserve requirement, charging estimate and alternate sites. Select a route to run the simulation.":
      "每条航线包含航距、飞行时间、备份电量要求、充电估算与备降点。选择一条航线即可运行仿真。",
    "CBD–Airport Business Shuttle": "CBD—机场商务穿梭",
    "CBD–New Territories Express": "CBD—新界快线",
    "HKIA SkyCity": "香港国际机场航天城",
    "11 min flight": "飞行 11 分钟",
    "9 min flight": "飞行 9 分钟",
    "Load 74%": "客座率 74%",
    "Load 70%": "客座率 70%",
    "Alternates: Pak Shek Kok Node, China Merchants Wharf": "备降:白石角节点、招商码头",
    "Alternates: China Merchants Wharf, Cyberport": "备降:招商码头、数码港",
    "Network Coverage": "网络覆盖",
    "Node Map": "节点地图",
    "Origin": "起点",
    "Destination": "终点",
    "Alternate": "备降",
    "Simulation Result — CBD–Airport Business Shuttle": "仿真结果 —— CBD—机场商务穿梭",
    "HKCEC → HKIA SkyCity": "会展中心 → 机场航天城",
    "Stable Operations": "运营稳定",
    "Daily Passengers": "日旅客量",
    "Cycles / Aircraft / Day": "单机日循环次数",
    "Energy Reserve": "备份电量",
    "Network Resilience": "网络韧性",
    "Charger Occupancy": "充电桩占用率",
    "Stand Occupancy": "机位占用率",
    "Pak Shek Kok Node": "白石角节点",
    "Carry Parameters to Investment Board": "把参数带入投资看板",
    "Back to Configurator": "返回方案配置",
    "Cycle Time Breakdown": "循环时间拆解",
    "Flight Cycle Analysis": "飞行循环分析",
    "The total cycle time — outbound flight, turnaround, charging and weather buffer — determines how many complete cycles each aircraft can execute per day. Reducing any segment increases daily capacity.":
      "单次循环总时长 —— 去程飞行、周转、充电与气象缓冲 —— 决定了每架飞机每天能完成多少个完整循环。压缩任一环节都能提升日容量。",
    "Outbound flight": "去程飞行",
    "Charging window": "充电窗口",
    "Weather buffer": "气象缓冲",
    "Total cycle": "循环总时长",

    /* ── 投资决策页 ── */
    "Step 6 — Multi-Site Comparison & Investment Decision": "第 6 步 — 多点位比选与投资决策",
    "Sites, schemes and financials compared in one decision interface": "在同一个决策界面里比较点位、方案与财务",
    "This page is designed for investment committee, project steering and public-sector briefing scenarios. Switch between scheme tiers, investment scenarios (Base / Growth / Conservative) and stakeholder perspectives (Operator / Asset Owner / Government / Investor) to understand why a particular site ranks first under specific conditions and what sensitivity the recommendation has to demand and cost assumptions.":
      "本页面向投资委员会、项目决策会与政府汇报场景设计。切换方案档位、投资情景(基准 / 增长 / 保守)与角色视角(运营方 / 资产方 / 政府 / 投资人),即可看清某个点位为什么在特定条件下排名第一,以及该建议对需求与成本假设的敏感程度。",
    "Base Case": "基准情景",
    "Growth Case": "增长情景",
    "Conservative Case": "保守情景",
    "Operator": "运营方",
    "Asset Owner": "资产方",
    "Government": "政府",
    "Investor": "投资人",
    "Priority Ranking": "优先级排序",
    "Top 3 Candidates": "前三候选点位",
    "Rank #1": "第 1 名",
    "Rank #2": "第 2 名",
    "Rank #3": "第 3 名",
    "Multi-Site Comparison": "多点位比选",
    "All Candidates": "全部候选点位",
    "Financial metrics are computed from scheme throughput, load factor and scenario multipliers. IRR and payback are indicative — suitable for prioritisation and sensitivity analysis, not binding valuations.":
      "财务指标由方案吞吐、客座率与情景系数推算。内部收益率与回收期仅供参考 —— 适用于优先级排序与敏感性分析,不构成正式估值。",
    "Investor Perspective · Base Case": "投资人视角 · 基准情景",
    "Recommended: Advance Pak Shek Kok First": "建议:优先推进白石角",
    "New Territories East": "新界东",
    "HKSTP's Pak Shek Kok Promenade is one of very few sites in Hong Kong with AIP-acknowledged drone operations currently running. The open waterfront surface offers the lowest implementation complexity of any medium-scale node and is structured for a cargo-first, passenger-ready upgrade model aligned with Bluenest O-M typology.":
      "科学园白石角海滨长廊是香港极少数已有航行资料汇编认可、无人机业务正在运行的点位。其开放滨水地面是所有中等规模节点中实施复杂度最低的,并且天然适合「先货后客」的升级模型,与 Bluenest O-M 分类一致。",
    "Why ranked first": "为什么排第一",
    "Most balanced network value and implementation feasibility under current persona weights":
      "在当前角色权重下,网络价值与实施可行性最为均衡",
    "Primary risk": "首要风险",
    "Standalone Demand Depth — Medium priority": "单点需求深度 —— 中等优先级",
    "Recommended action": "建议动作",
    "Enter at Standard tier; retain Enhanced upgrade interface": "以标准档进入,并预留增强档升级接口",
    "Optimistic demand (+18%)": "乐观需求(+18%)",
    "Payback 0.8 yr": "回收期 0.8 年",
    "Base case": "基准情景",
    "Payback 0.9 yr": "回收期 0.9 年",
    "Conservative (−14%)": "保守情景(−14%)",
    "Payback 1.1 yr": "回收期 1.1 年",
    "Open Recommended Site": "打开推荐点位",
    "Configure Scheme": "配置方案",
    "⬡ Generate Investment Report": "⬡ 生成投资报告",
    "Investment Committee Report": "投资委员会报告",
    "Vertiport Planner · Hong Kong Network": "Vertiport Planner · 香港网络",
    "Financials are indicative only — suitable for prioritisation and sensitivity analysis, not binding valuations.":
      "财务数据仅供参考 —— 适用于优先级排序与敏感性分析,不构成正式估值。",
    "IRR and payback derived from scenario multipliers. Refer to site-level due-diligence packages for binding estimates.":
      "内部收益率与回收期由情景系数推算。正式测算请参阅点位级尽调材料。",
    "⎙ Print / Export PDF": "⎙ 打印 / 导出 PDF",
    "Executive Summary": "执行摘要",

    /* ── 地图页 ── */
    "3D Site Selection Platform": "三维选址平台",
    "Hong Kong Demo · 5 Sites": "香港样板 · 5 个点位",
    "Simulation": "仿真",
    "Investment": "投资",
    "Ranked by score": "按评分排序",
    "Map Layers": "地图图层",
    "3D Buildings": "三维建筑",
    "Airspace Constraints": "空域限制",
    "Wind / Turbulence Zones": "风 / 湍流区",
    "Coverage Radius": "覆盖半径",
    "Route Network": "航线网络",
    "Airspace Operations": "空域运行",
    "Waypoint Network": "航路点网络",
    "Live Traffic Simulation": "实时交通仿真",
    "eVTOL / UAV Traffic": "eVTOL / 无人机流量",
    "Route Animation": "航线动画",
    "Real-time Data": "实时数据",
    "🌤 HK Observatory Weather": "🌤 香港天文台气象",
    "🌬 Multi-altitude Wind (Open-Meteo)": "🌬 多高度层风场(Open-Meteo)",
    "System ready — Victoria Harbour Digital Twin": "系统就绪 —— 维多利亚港数字孪生",
    "Click a site marker or candidate from the left panel to view its full scoring assessment.":
      "点击地图上的点位标记,或左侧面板中的候选点位,查看其完整评分评估。",
    "3D View": "三维视角",
    "Satellite": "卫星影像",
    "↺ Reset View": "↺ 重置视角",
    "Reset View": "重置视角",
    "Define Vertiport Area": "圈定场址范围",
    "Module Palette": "模块面板",
    "▦ Module Palette": "▦ 模块面板",
    "Based on FAA EB 105A, EASA PTS-VPT-DSN & ConOps AAM specifications.":
      "依据 FAA EB 105A、EASA PTS-VPT-DSN 与 ConOps AAM 规范。",
    "Total CAPEX Placed": "已放置模块总投资",
    "Drag any module onto the red workspace. Modules must stay within the boundary. Right-click a placed module to remove it.":
      "把任意模块拖到红色工作区内。模块必须保持在边界以内。右键点击已放置的模块可将其移除。",
    "Drag modules from palette · Right-click placed module to remove": "从面板拖出模块 · 右键点击已放置模块可移除",
    "⬛ Rooftop Configurator": "⬛ 屋顶配置器",
    "Rooftop Configurator": "屋顶配置器",
    "✕ Exit": "✕ 退出",
    "eVTOL FATO Pad": "eVTOL FATO 起降坪",
    "eVTOL Stand": "eVTOL 机位",
    "UAV Landing Pad": "无人机起降坪",
    "eVTOL Charger": "eVTOL 充电桩",
    "UAV Charger Array": "无人机充电阵列",
    "Wind Mast + Sensors": "风塔与传感器",
    "Site Area Selected": "已选定场址范围",
    "Vertiport Workspace": "场址工作区",
    "Confirm the selected area to enter Vertiport Configurator. The map shifts to bird's-eye view — preset modules for this site type are pre-placed and fully draggable.":
      "确认所选范围后进入场址配置器。地图会切换到俯视视角 —— 该点位类型的预设模块已预先放置,可自由拖动。",
    "Enter Configurator →": "进入配置器 →",
    "Cancel": "取消",
    "Use preset footprint for this site type": "使用该点位类型的预设轮廓"
  });
  Object.assign(ZH, {
    "Feasibility": "可行性",
    "Delivery": "交付",
    "Pass": "通过",
    "Warn": "警示",
    "Fail": "不通过",
    "Priority": "优先",
    "Configure": "配置",
    "Energy": "能源",
    "Passenger & Cargo": "旅客与货运",
    "Safety & Environment": "安全与环境",
    "HKCEC \u00b7 Standard": "\u4f1a\u5c55\u4e2d\u5fc3 \u00b7 \u6807\u51c6\u578b",
    "Pak Shek Kok / HKSTP": "白石角 / 科学园",
    "China Merchants Wharf": "招商码头",
    "\ud83c\udded\ud83c\uddf0 Hong Kong": "\ud83c\udded\ud83c\uddf0 香港",
    "\ud83c\udfd9 Shenzhen": "\ud83c\udfd9 深圳",
    "\ud83c\udf0a GZ \u00b7 Zhuhai": "\ud83c\udf0a 广州 \u00b7 珠海",
    "Click a site marker or candidate": "点击地图上的点位标记,",
    "from the left panel to view its": "或左侧面板中的候选点位,",
    "full scoring assessment.": "查看完整评分评估。",
    "\u2b1b Define Vertiport Area": "\u2b1b 圈定场址范围",
    "Use site preset \u2192": "使用点位预设 \u2192",
    "\u2715 Cancel": "\u2715 取消",
    "Power \u2014": "功率 \u2014"
  });
  Object.assign(ZH, {
    "Site Screening \u2192": "选址筛查 \u2192",
    "Site Detail \u2192": "点位详情 \u2192",
    "\u2190 Overview": "\u2190 总览",
    "Start of workflow": "工作流起点",
    "End of workflow": "工作流终点"
  });




  /* 带数字的模式规则 */
  var RULES = [
    [/^(\d+) pts$/,                        "$1 分"],
    [/^(\d+) candidate sites identified$/, "已识别 $1 个候选点位"],
    [/^(\d+) pre-configured sites$/,       "$1 个预置点位"],
    [/^(\d+) cross-city anchor nodes$/,    "$1 个跨城锚点"],
    [/^(\d+) months$/,                     "$1 个月"],
    [/^(\d+) min$/,                        "$1 分钟"],
    [/^(\d+(?:\.\d+)?) yr$/,               "$1 年"],
    [/^(\d+) aircraft$/,                   "$1 架"],
    [/^(\d+) pax\/h$/,                     "$1 人次/时"],
    [/^(\d+) mvts\/d$/,                    "$1 架次/日"],
    [/^(\d+)\/d$/,                         "$1 架次/日"],
    [/^CAPEX ±HK\$ (.+)$/,                 "投资 ±HK$ $1"],
    [/^Throughput ±(\S+) pax\/h$/,         "吞吐 ±$1 人次/时"],
    [/^Power (\S+) kW$/,                   "功率 $1 kW"],
    [/^Load (\d+)%$/,                      "客座率 $1%"],
    [/^Point (\d) \/ (\d) — click (.+)$/,  "第 $1 / $2 点 — 点击$3"],
    [/^Vertiport Planner · Prototype ·\s*$/, "Vertiport Planner · 原型 · "]
  ];

  var lang = "en";
  var originals = new Map();   // textNode -> 原始英文
  var applying = false;

  function translate(raw) {
    var key = raw.trim().replace(/\s+/g, " ");
    if (!key) return null;
    if (Object.prototype.hasOwnProperty.call(ZH, key)) return ZH[key];
    for (var i = 0; i < RULES.length; i++) {
      if (RULES[i][0].test(key)) return key.replace(RULES[i][0], RULES[i][1]);
    }
    return null;
  }

  function walk(root, fn) {
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        var p = n.parentNode;
        if (!p) return NodeFilter.FILTER_REJECT;
        var tag = p.nodeName;
        if (tag === "SCRIPT" || tag === "STYLE") return NodeFilter.FILTER_REJECT;
        return n.nodeValue && n.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    var list = [], n;
    while ((n = w.nextNode())) list.push(n);
    list.forEach(fn);
  }

  function toZh(root) {
    walk(root || document.body, function (node) {
      if (originals.has(node)) return;                 // 已译过
      var out = translate(node.nodeValue);
      if (out === null) return;
      originals.set(node, node.nodeValue);
      var lead = node.nodeValue.match(/^\s*/)[0];
      var tail = node.nodeValue.match(/\s*$/)[0];
      node.nodeValue = lead + out + tail;
    });
  }

  function toEn() {
    originals.forEach(function (val, node) { node.nodeValue = val; });
    originals.clear();
  }

  function apply() {
    applying = true;
    if (lang === "zh") toZh(document.body); else toEn();
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    var btn = document.getElementById("langToggle");
    if (btn) {
      btn.textContent = lang === "zh" ? "EN" : "中文";
      btn.setAttribute("data-lang", lang);
    }
    setTimeout(function () { applying = false; }, 0);
  }

  function setLang(next) {
    if (next === lang) return;
    lang = next;
    try { localStorage.setItem("vp-lang", lang); } catch (e) {}
    apply();
  }

  function init() {
    var btn = document.getElementById("langToggle");
    if (btn) {
      btn.addEventListener("click", function () { setLang(lang === "zh" ? "en" : "zh"); });
    }
    var saved = null;
    try { saved = localStorage.getItem("vp-lang"); } catch (e) {}
    if (saved === "zh") { lang = "zh"; apply(); }
    else if (btn) { btn.textContent = "中文"; }

    // 动态渲染后补翻(卡片由 app.js 生成)
    var pending = null;
    new MutationObserver(function () {
      if (applying || lang !== "zh") return;
      clearTimeout(pending);
      pending = setTimeout(function () {
        applying = true;
        toZh(document.body);
        applying = false;
      }, 40);
    }).observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { setTimeout(init, 60); });
  } else {
    setTimeout(init, 60);
  }
})();

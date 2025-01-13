const examinations = {
    "心理评估量表": {
        "情绪量表": [
            { name: "汉密尔顿抑郁量表(HAMD)", desc: "评估抑郁症状严重程度", price: 150 },
            { name: "汉密尔顿焦虑量表(HAMA)", desc: "评估焦虑症状严重程度", price: 150 },
            { name: "蒙哥马利抑郁量表(MADRS)", desc: "评估抑郁症状", price: 150 },
            { name: "贝克抑郁量表(BDI)", desc: "自评抑郁症状", price: 100 },
            { name: "抑郁自评量表(SDS)", desc: "自评抑郁程度", price: 100 },
            { name: "焦虑自评量表(SAS)", desc: "自评焦虑程度", price: 100 },
            { name: "广泛性焦虑量表(GAD-7)", desc: "筛查焦虑症状", price: 100 },
            { name: "医院焦虑抑郁量表(HAD)", desc: "医院环境下的情绪评估", price: 120 }
        ],
        "认知功能": [
            { name: "韦氏成人智力量表(WAIS)", desc: "智力评估", price: 500 },
            { name: "瑞文标准推理测验", desc: "智力和推理能力评估", price: 200 },
            { name: "蒙特利尔认知评估(MoCA)", desc: "认知功能筛查", price: 150 },
            { name: "简易精神状态检查(MMSE)", desc: "认知功能筛查", price: 100 },
            { name: "临床痴呆评定量表(CDR)", desc: "痴呆程度评估", price: 200 },
            { name: "成人注意力缺陷评定量表", desc: "ADHD评估", price: 150 },
            { name: "威斯康星卡片分类测验", desc: "执行功能评估", price: 200 }
        ],
        "人格测评": [
            { name: "明尼苏达多相人格测验(MMPI)", desc: "全面人格评估", price: 300 },
            { name: "艾森克人格问卷(EPQ)", desc: "人格特质评估", price: 200 },
            { name: "卡特尔16项人格测验", desc: "人格特质评估", price: 200 },
            { name: "人格障碍诊断量表(PDQ-4+)", desc: "筛查人格障碍", price: 200 },
            { name: "大五人格量表(NEO)", desc: "五因素人格评估", price: 180 }
        ],
        "特殊症状评估": [
            { 
                name: "耶鲁布朗强迫量表(Y-BOCS)", 
                desc: "评估强迫症状严重程度",
                detail: "评估强迫思维和强迫行为的严重程度，包括时间占用、干扰程度、痛苦程度等",
                contraindication: "急性精神病发作期患者不宜",
                price: 150 
            },
            { 
                name: "创伤后应激障碍量表(PCL-5)", 
                desc: "评估PTSD症状",
                detail: "评估创伤后应激障碍的核心症状，包括再体验、回避、认知情绪改变和警觉性增高",
                contraindication: "急性应激状态下不宜",
                price: 150 
            },
            { 
                name: "社交焦虑量表(LSAS)", 
                desc: "评估社交焦虑",
                detail: "评估社交场合的焦虑和回避程度，包括表现性和社交互动情境",
                contraindication: "无特殊禁忌",
                price: 150 
            },
            { 
                name: "进食障碍量表(EAT-26)", 
                desc: "评估进食行为",
                detail: "筛查异常进食行为和态度，包括节食、暴食和食物专注度",
                contraindication: "无特殊禁忌",
                price: 150 
            }
        ],
        "儿童青少年评估": [
            {
                name: "儿童行为量表(CBCL)",
                desc: "评估儿童行为问题",
                detail: "全面评估儿童的情绪和行为问题，包括内化和外化行为",
                contraindication: "需要家长配合完成",
                price: 200
            },
            {
                name: "青少年生活事件量表",
                desc: "评估生活压力源",
                detail: "评估青少年近期经历的重要生活事件和压力源",
                contraindication: "无特殊禁忌",
                price: 150
            }
        ]
    },
    "神经系统检查": {
        "脑电图检查": [
            { name: "常规脑电图", desc: "基础脑电活动", price: 400 },
            { name: "视频脑电图", desc: "长程脑电记录", price: 1000 },
            { name: "睡眠脑电图", desc: "睡眠期脑电", price: 800 },
            { name: "动态脑电图", desc: "24小时监测", price: 1200 },
            { name: "定量脑电图", desc: "脑电活动定量分析", price: 600 }
        ],
        "诱发电位": [
            { name: "视觉诱发电位", desc: "视觉通路功能", price: 300 },
            { name: "听觉诱发电位", desc: "听觉通路功能", price: 300 },
            { name: "体感诱发电位", desc: "感觉通路功能", price: 300 },
            { name: "运动诱发电位", desc: "运动功能评估", price: 400 },
            { name: "事件相关电位P300", desc: "认知功能评估", price: 500 }
        ],
        "神经心理测验": [
            {
                name: "连线测验(TMT)",
                desc: "评估注意力和执行功能",
                detail: "测试视觉搜索速度、注意力、心理灵活性和执行功能",
                contraindication: "严重视觉障碍者不宜",
                price: 100
            },
            {
                name: "数字广度测验",
                desc: "评估工作记忆",
                detail: "测试即时记忆广度和工作记忆容量",
                contraindication: "严重听力障碍者不宜",
                price: 100
            }
        ]
    },
    "影像学检查": {
        "MRI检查": [
            { name: "头颅MRI平扫", desc: "基础脑部结构", price: 2000 },
            { name: "头颅MRI增强", desc: "详细脑部检查", price: 3000 },
            { name: "功能性磁共振(fMRI)", desc: "脑功能成像", price: 4000 },
            { name: "磁共振波谱(MRS)", desc: "脑代谢检查", price: 3000 },
            { name: "磁共振弥散张量成像", desc: "白质纤维束检查", price: 3500 },
            { name: "磁共振血管成像", desc: "脑血管检查", price: 2500 }
        ],
        "CT检查": [
            { name: "头颅CT平扫", desc: "快速脑部检查", price: 1000 },
            { name: "头颅CT增强", desc: "详细脑部检查", price: 1500 },
            { name: "CT血管造影", desc: "脑血管检查", price: 2000 },
            { name: "颈部CT", desc: "颈部结构检查", price: 1000 }
        ],
        "其他影像": [
            { name: "经颅多普勒", desc: "脑血流检查", price: 500 },
            { name: "颈动脉超声", desc: "颈部血管检查", price: 300 },
            { name: "SPECT", desc: "脑血流灌注显像", price: 3000 },
            { name: "PET-CT", desc: "脑功能代谢检查", price: 5000 }
        ]
    },
    "实验室检查": {
        "常规检查": [
            { name: "血常规", desc: "基础血液检查", price: 100 },
            { name: "尿常规", desc: "基础尿液检查", price: 50 },
            { name: "大便常规", desc: "消化道检查", price: 50 },
            { name: "血沉", desc: "炎症指标", price: 40 },
            { name: "C反应蛋白", desc: "炎症指标", price: 60 }
        ],
        "生化检查": [
            { name: "肝功能", desc: "肝脏功能评估", price: 200 },
            { name: "肾功能", desc: "肾脏功能评估", price: 200 },
            { name: "血脂", desc: "血脂代谢评估", price: 150 },
            { name: "血糖", desc: "糖代谢评估", price: 100 },
            { name: "电解质", desc: "电解质平衡", price: 100 },
            { name: "心肌酶谱", desc: "心肌损伤评估", price: 200 }
        ],
        "内分泌检查": [
            { name: "甲状腺功能", desc: "甲状腺激素六项", price: 200 },
            { name: "性激素六项", desc: "激素水平检查", price: 400 },
            { name: "皮质醇", desc: "应激反应评估", price: 200 },
            { name: "催乳素", desc: "内分泌功能评估", price: 150 },
            { name: "生长激素", desc: "内分泌功能评估", price: 200 }
        ],
        "免疫学检查": [
            { name: "自身抗体谱", desc: "自身免疫疾病筛查", price: 500 },
            { name: "补体检测", desc: "免疫功能评估", price: 300 },
            { name: "免疫球蛋白测定", desc: "免疫功能评估", price: 400 }
        ],
        "特殊检查": [
            { name: "脑脊液常规", desc: "中枢神经系统检查", price: 800 },
            { name: "脑脊液生化", desc: "神经系统感染", price: 600 },
            { name: "病毒抗体检测", desc: "病毒感染筛查", price: 400 },
            { name: "重金属检测", desc: "重金属中毒筛查", price: 600 },
            { name: "药物浓度监测", desc: "药物血药浓度", price: 300 },
            { name: "毒物筛查", desc: "毒物药物检测", price: 500 },
            { name: "基因检测", desc: "遗传风险评估", price: 1000 }
        ],
        "药物代谢基因检测": [
            {
                name: "CYP2D6基因检测",
                desc: "评估抗抑郁药代谢能力",
                detail: "检测影响SSRIs等药物代谢的关键酶基因多态性",
                contraindication: "无特殊禁忌",
                price: 1000
            },
            {
                name: "CYP2C19基因检测",
                desc: "评估药物代谢能力",
                detail: "检测影响多种精神科药物代谢的关键酶基因",
                contraindication: "无特殊禁忌",
                price: 1000
            }
        ],
        "神经递质检测": [
            {
                name: "血清5-HT水平",
                desc: "检测血清五羟色胺水平",
                detail: "评估与抑郁、焦虑相关的神经递质水平",
                contraindication: "服用相关药物需停药",
                price: 300
            },
            {
                name: "尿儿茶酚胺测定",
                desc: "检测儿茶酚胺水平",
                detail: "评估与应激相关的神经递质代谢",
                contraindication: "需24小时尿液收集",
                price: 400
            }
        ]
    },
    "睡眠相关检查": {
        "睡眠监测": [
            {
                name: "多导睡眠图(PSG)",
                desc: "全面睡眠监测",
                detail: "记录睡眠期间的脑电、眼动、肌电、心电、呼吸等多项生理指标",
                contraindication: "急性感染期不宜",
                price: 1000
            },
            {
                name: "体动图监测",
                desc: "评估睡眠-觉醒规律",
                detail: "连续记录活动和静止状态，评估睡眠觉醒节律",
                contraindication: "无特殊禁忌",
                price: 500
            }
        ],
        "昼夜节律评估": [
            {
                name: "褪黑激素检测",
                desc: "评估生理节律",
                detail: "检测影响睡眠的关键激素水平变化",
                contraindication: "服用相关药物需停药",
                price: 300
            }
        ]
    }
}; 
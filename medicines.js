const medicines = {
    "抗抑郁药": {
        "SSRIs": [
            { name: "艾司西酞普兰", type: "SSRI", desc: "抗抑郁首选", detail: "选择性五羟色胺再摄取抑制剂", price: 280 },
            { name: "帕罗西汀", type: "SSRI", desc: "抗抑郁、社交焦虑", detail: "对社交焦虑特别有效", price: 250 },
            { name: "舍曲林", type: "SSRI", desc: "抗抑郁、强迫症", detail: "对强迫症状有特效", price: 200 },
            { name: "氟伏沙明", type: "SSRI", desc: "抗抑郁、强迫症", detail: "特别适用于强迫症", price: 250 },
            { name: "氟西汀", type: "SSRI", desc: "抗抑郁", detail: "最早上市的SSRI类药物", price: 200 }
        ],
        "SNRIs": [
            { name: "文拉法辛", type: "SNRI", desc: "抗抑郁、焦虑", detail: "双重作用机制", price: 300 },
            { name: "度洛西汀", type: "SNRI", desc: "抗抑郁、疼痛", detail: "对躯体症状特别有效", price: 300 },
            { name: "米那普仑", type: "SNRI", desc: "抗抑郁", detail: "对意志力降低有改善", price: 280 }
        ],
        "其他新型抗抑郁药": [
            { name: "米氮平", type: "NaSSA", desc: "抗抑郁、改善睡眠", detail: "适合伴有失眠的患者", price: 300 },
            { name: "阿戈美拉汀", type: "褪黑素激动剂", desc: "抗抑郁、改善睡眠", detail: "调节生理节律", price: 450 },
            { name: "伏硫西汀", type: "多模式", desc: "抗抑郁", detail: "对认知功能改善明显", price: 400 }
        ]
    },
    "抗焦虑药": {
        "苯二氮卓类": [
            { name: "阿普唑仑", type: "短效", desc: "抗焦虑、惊恐", detail: "适用于急性焦虑", price: 100 },
            { name: "劳拉西泮", type: "中效", desc: "抗焦虑", detail: "镇静效果好", price: 100 },
            { name: "氯硝西泮", type: "长效", desc: "抗焦虑、失眠", detail: "适合慢性焦虑", price: 90 },
            { name: "艾司唑仑", type: "短效", desc: "抗焦虑、失眠", detail: "改善睡眠", price: 120 },
            { name: "地西泮", type: "长效", desc: "抗焦虑、肌肉松弛", detail: "具有肌肉松弛作用", price: 80 }
        ],
        "非苯二氮卓类": [
            { name: "丁螺环酮", type: "非成瘾性", desc: "抗焦虑", detail: "无成瘾性，适合长期服用", price: 150 },
            { name: "普萘洛尔", type: "β受体阻滞剂", desc: "躯体症状", detail: "改善心悸等躯体症状", price: 100 }
        ]
    },
    "抗精神病药": {
        "非典型抗精神病药": [
            { name: "奥氮平", type: "第二代", desc: "精神分裂、双相", detail: "镇静作用强", price: 400 },
            { name: "利培酮", type: "第二代", desc: "精神分裂", detail: "副作用较小", price: 350 },
            { name: "喹硫平", type: "第二代", desc: "精神分裂、双相", detail: "对情感症状有效", price: 400 },
            { name: "阿立哌唑", type: "第三代", desc: "精神分裂、双相", detail: "对认知功能影响小", price: 450 },
            { name: "齐拉西酮", type: "第二代", desc: "精神分裂", detail: "体重增加风险小", price: 500 }
        ],
        "典型抗精神病药": [
            { name: "氟哌啶醇", type: "第一代", desc: "精神分裂", detail: "强效型", price: 100 },
            { name: "氯丙嗪", type: "第一代", desc: "精神分裂", detail: "镇静作用强", price: 80 }
        ]
    },
    "心境稳定剂": {
        "锂盐和抗癫痫药": [
            { name: "碳酸锂", type: "锂盐", desc: "双相障碍", detail: "预防躁狂复发", price: 150 },
            { name: "丙戊酸钠", type: "抗癫痫药", desc: "双相障碍", detail: "急性躁狂发作", price: 200 },
            { name: "拉莫三嗪", type: "抗癫痫药", desc: "双相抑郁", detail: "预防抑郁复发", price: 300 },
            { name: "卡马西平", type: "抗癫痫药", desc: "双相障碍", detail: "情感稳定", price: 180 }
        ]
    },
    "中成药": {
        "解郁类": [
            { name: "逍遥散", desc: "舒肝解郁", detail: "肝郁气滞证", price: 80 },
            { name: "柴胡舒肝散", desc: "疏肝理气", detail: "肝气郁结证", price: 100 },
            { name: "加味逍遥散", desc: "疏肝解郁", detail: "肝郁血虚证", price: 85 },
            { name: "越鞠丸", desc: "理气解郁", detail: "气郁痰阻证", price: 95 }
        ],
        "安神类": [
            { name: "酸枣仁汤", desc: "养心安神", detail: "心血虚证失眠", price: 90 },
            { name: "天王补心丹", desc: "养心安神", detail: "心神不宁", price: 120 },
            { name: "朱砂安神丸", desc: "镇静安神", detail: "心火亢盛", price: 130 },
            { name: "柏子养心丸", desc: "养心安神", detail: "心肾不交", price: 110 }
        ],
        "补益类": [
            { name: "归脾汤", desc: "补气养血", detail: "心脾两虚证", price: 110 },
            { name: "人参养荣汤", desc: "补气养血", detail: "气血两虚证", price: 150 },
            { name: "七福饮", desc: "补气养血", detail: "气血亏虚证", price: 130 },
            { name: "补中益气丸", desc: "补气健脾", detail: "脾胃虚弱证", price: 100 }
        ]
    }
}; 
// 创建一个新文件存储病例库
const caseLibrary = [
    {
        id: 1,
        basicInfo: {
            age: 28,
            gender: "女",
            occupation: "平面设计师",
            maritalStatus: "未婚",
            education: "本科",
            nationality: "中国"
        },
        mainComplaint: "感觉自己快要崩溃了，最近总是控制不住地胡思乱想",
        background: "独生女，父母离异，与母亲同住。工作压力大，最近升职失败。",
        symptoms: "失眠、焦虑、注意力难以集中、食欲下降",
        history: "无精神疾病史，母亲有抑郁症病史"
    },
    {
        id: 2,
        basicInfo: {
            age: 35,
            gender: "跨性别女性",
            occupation: "软件工程师",
            maritalStatus: "单身",
            education: "硕士",
            nationality: "中国"
        },
        mainComplaint: "社交场合极度不适，担心他人的眼光",
        background: "正在进行性别转换治疗，工作环境支持度一般，与原生家庭关系紧张",
        symptoms: "社交焦虑、失眠、情绪起伏大",
        history: "青少年时期有轻度抑郁症病史"
    },
    // 可以继续添加更多案例...
];

// 使用 DeepSeek API 生成新病例的模板
const caseTemplates = [
    `生成一个精神科病例，患者特征如下：
    - 年龄范围：18-25岁
    - 身份：在校大学生
    - 可能的问题：学业压力、人际关系、性别认同等
    请提供详细的背景故事和症状描述。`,
    
    `生成一个精神科病例，患者特征如下：
    - 年龄范围：35-45岁
    - 身份：职场人士
    - 可能的问题：工作倦怠、婚姻问题、育儿压力等
    请提供详细的背景故事和症状描述。`,
    
    `生成一个精神科病例，患者特征如下：
    - 年龄范围：50-65岁
    - 身份：退休或准备退休人士
    - 可能的问题：适应问题、空巢综合征、健康焦虑等
    请提供详细的背景故事和症状描述。`
]; 
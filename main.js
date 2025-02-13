const API_KEY = 'sk-85ff13681e564528b5ef765a9d934835';
const API_URL = 'https://api.deepseek.com/v1/chat/completions';

let conversationCount = 0;
let currentCase = null;
let totalScore = 0;
let selectedDiagnoses = new Set();

// 检查项目列表会从 examinations.js 文件加载
// examinations 变量将在 examinations.js 中定义

// 药物列表会从 medicines.js 文件加载
// medicines 变量将在 medicines.js 中定义

let selectedExams = new Set();
let selectedMedicines = new Set();

function makeDiagnosis() {
    try {
        const modal = document.getElementById('diagnosisModal');
        const diagnosisList = document.getElementById('diagnosisList');
        diagnosisList.innerHTML = '';

        // 添加已选诊断显示区域
        const selectedArea = document.createElement('div');
        selectedArea.id = 'selectedDiagnoses';
        selectedArea.className = 'selected-items';
        diagnosisList.appendChild(selectedArea);
        updateSelectedDiagnoses();

        // 遍历所有诊断类别
        Object.entries(diagnoses).forEach(([category, subCategories]) => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'diagnosis-category';
            categoryDiv.innerHTML = `<h3>${category}</h3>`;
            
            // 遍历子类别
            Object.entries(subCategories).forEach(([subCategory, items]) => {
                const subCategoryDiv = document.createElement('div');
                subCategoryDiv.className = 'diagnosis-subcategory';
                subCategoryDiv.innerHTML = `<h4>${subCategory}</h4>`;
                
                // 添加诊断项目
                items.forEach(diag => {
                    const itemDiv = document.createElement('div');
                    itemDiv.className = 'diagnosis-item';
                    itemDiv.innerHTML = `
                        <input type="checkbox" id="diag_${diag.name}" 
                               ${selectedDiagnoses.has(diag.name) ? 'checked' : ''}>
                        <label for="diag_${diag.name}">
                            <strong>${diag.name}</strong><br>
                            ${diag.desc}<br>
                            ${diag.detail ? `<small>${diag.detail}</small><br>` : ''}
                        </label>
                    `;
                    itemDiv.querySelector('input').onchange = (e) => toggleDiagnosis(diag.name, e.target.checked);
                    subCategoryDiv.appendChild(itemDiv);
                });
                
                categoryDiv.appendChild(subCategoryDiv);
            });
            
            diagnosisList.appendChild(categoryDiv);
        });

        modal.style.display = 'block';
        translate.execute(); // 添加翻译调用
    } catch (error) {
        console.error('打开诊断弹窗失败:', error);
    }
}

function toggleDiagnosis(diagName, isSelected) {
    if (isSelected) {
        selectedDiagnoses.add(diagName);
    } else {
        selectedDiagnoses.delete(diagName);
    }
    updateSelectedDiagnoses();
}

function updateSelectedDiagnoses() {
    const selectedArea = document.getElementById('selectedDiagnoses');
    if (!selectedArea) return;

    let selectedDiagList = [];
    selectedDiagnoses.forEach(diagName => {
        Object.values(diagnoses).forEach(subCategories => {
            Object.values(subCategories).forEach(items => {
                const diag = items.find(d => d.name === diagName);
                if (diag) {
                    selectedDiagList.push(`${diag.name}（${diag.desc}）`);
                }
            });
        });
    });

    selectedArea.innerHTML = `
        <div class="selected-summary">
            <h4>已选诊断 (${selectedDiagnoses.size}项)</h4>
            <div class="selected-list">${selectedDiagList.join('<br>')}</div>
        </div>
    `;
    translate.execute(); // 添加翻译调用
}

function psychotherapy() {
    const message = "请选择心理治疗方法：\n" +
        "1. 认知行为治疗(CBT)\n" +
        "2. 人际关系治疗(IPT)\n" +
        "3. 支持性心理治疗\n" +
        "4. 正念疗法\n";
    addMessage(message, 'system');
}

function updateScore(score) {
    totalScore += score;
    document.getElementById('score').textContent = totalScore;
    document.getElementById('rounds').textContent = conversationCount;
}

function endCase() {
    const summary = `本次病例总结：
    总得分：${totalScore}
    对话回合：${conversationCount}
    是否继续新的病例？`;
    addMessage(summary, 'system');
}

// 添加病例生成和管理相关函数
async function generateNewCase() {
    const prompt = `请生成一个详细的精神科就诊病例，从以下疾病类型中随机选择一种：

    1. 精神分裂症谱系障碍：
       - 妄想型：系统性妄想
       - 偏执型：被害妄想为主
       - 瓦解型：思维散漫、言语混乱
       - 紧张型：运动性症状为主
    
    2. 情感障碍谱系：
       - 双相情感障碍：躁狂发作或抑郁发作
       - 重度抑郁障碍：单次或复发性
       - 持续性心境障碍
    
    3. 分裂情感障碍：
       - 同时具有精神分裂症和情感障碍症状
    
    4. 解离性障碍：
       - 解离性身份障碍（多重人格）
       - 解离性遗忘
       - 解离性漫游
    
    5. 精神病性障碍：
       - 急性短暂性精神病性障碍
       - 妄想性障碍
       - 共享性精神病性障碍
    
    基本信息：
    - 年龄：${age}岁
    - 性别：${gender}
    - 职业：${job}
    - 婚姻状况：${maritalStatus}
    - 教育程度：${education}
    - 居住情况：${livingConditions}
    - 经济状况：${financialStatus}

    根据选择的疾病类型，请详细描述：
    1. 核心症状表现：
       - 思维障碍（如有）：逻辑混乱、联想障碍、思维散漫等
       - 知觉障碍（如有）：幻听、幻视、幻嗅等
       - 妄想症状（如有）：被害妄想、关系妄想、夸大妄想等
       - 情感症状（如有）：情感平淡、情感不协调、心境改变等
       - 行为症状（如有）：兴奋、木僵、刻板等
    
    2. 发病过程：
       - 急性或慢性起病
       - 症状出现的顺序和发展
       - 诱因和应激因素
    
    3. 病前人格特征
    4. 既往发作史
    5. 家族史
    6. 社会功能损害情况
    7. 治疗经历

    要求：
    1. 使用第一人称叙述
    2. 增加具体的生活场景
    3. 加入情感表达
    4. 体现人物性格特点
    5. 如果是思维障碍患者，需要体现出语言逻辑的混乱
    6. 如果是妄想患者，需要详细描述妄想内容
    7. 如果是解离性患者，需要描述不同人格特征
    8. 字数不少于800字`;

    try {
        const response = await callAPI(prompt);
        return parseGeneratedCase(response);
    } catch (error) {
        console.error('生成病例失败:', error);
        return caseLibrary[Math.floor(Math.random() * caseLibrary.length)];
    }
}

function parseGeneratedCase(response) {
    // 解析生成的文本，提取关键信息
    const lines = response.split('\n');
    const caseData = {
        basicInfo: {},
        mainComplaint: '',
        background: '',
        symptoms: '',
        history: ''
    };

    lines.forEach(line => {
        if (line.includes('年龄：')) caseData.basicInfo.age = line.split('：')[1].trim();
        if (line.includes('性别：')) caseData.basicInfo.gender = line.split('：')[1].trim();
        if (line.includes('职业：')) caseData.basicInfo.occupation = line.split('：')[1].trim();
        if (line.includes('主诉：')) caseData.mainComplaint = line.split('：')[1].trim();
        if (line.includes('背景：')) caseData.background = line.split('：')[1].trim();
        if (line.includes('症状：')) caseData.symptoms = line.split('：')[1].trim();
        if (line.includes('病史：')) caseData.history = line.split('：')[1].trim();
    });

    return caseData;
}

function displayPatientInfo(caseData) {
    const patientInfo = document.getElementById('patientInfo');
    patientInfo.innerHTML = `
        <div class="info-section">
            <h3>基本信息</h3>
            <p>年龄：${caseData.basicInfo.age}</p>
            <p>性别：${caseData.basicInfo.gender}</p>
            <p>职业：${caseData.basicInfo.occupation}</p>
        </div>
        <div class="info-section">
            <h3>主诉</h3>
            <p>${caseData.mainComplaint}</p>
        </div>
        <div class="info-section">
            <h3>背景信息</h3>
            <p>${caseData.background}</p>
        </div>
        <div class="info-section">
            <h3>症状表现</h3>
            <p>${caseData.symptoms}</p>
        </div>
        <div class="info-section">
            <h3>既往病史</h3>
            <p>${caseData.history}</p>
        </div>
    `;
}

// 更新原有函数
async function startNewCase() {
    totalScore = 0;
    conversationCount = 0;
    updateScore(0);
    
    showLoading();

    // 生成随机基本信息
    const age = Math.floor(Math.random() * (80 - 18) + 18);
    const genders = ["男", "女", "跨性别男性", "跨性别女性"];
    const gender = genders[Math.floor(Math.random() * genders.length)];
    
    // 生成随机职业背景
    const occupations = [
        { role: "学生", details: ["大学生", "研究生", "医学生", "留学生"] },
        { role: "职场人士", details: ["程序员", "教师", "医生", "销售", "设计师", "会计", "律师"] },
        { role: "管理者", details: ["部门主管", "创业者", "公司高管"] },
        { role: "自由职业者", details: ["作家", "艺术家", "自媒体", "摄影师"] }
    ];
    const occupation = occupations[Math.floor(Math.random() * occupations.length)];
    const job = occupation.details[Math.floor(Math.random() * occupation.details.length)];

    // 生成随机婚姻状况
    const maritalStatus = ["未婚", "已婚", "离异", "丧偶", "恋爱中", "分手后"][Math.floor(Math.random() * 6)];
    
    // 生成随机教育背景
    const education = ["高中", "大专", "本科", "硕士", "博士"][Math.floor(Math.random() * 5)];
    
    // 生成随机生活状况
    const livingConditions = ["独居", "与父母同住", "与配偶同住", "与室友合租", "学生宿舍"][Math.floor(Math.random() * 5)];
    
    // 生成随机经济状况
    const financialStatus = ["经济宽裕", "收入稳定", "经济压力较大", "负债", "依靠家庭支持"][Math.floor(Math.random() * 5)];

    // 生成随机症状组合（2-4个）
    const possibleSymptoms = [
        "情绪低落", "兴趣减退", "睡眠障碍", "食欲改变", 
        "焦虑不安", "注意力难以集中", "疲劳乏力", "自责自罪",
        "社交退缩", "易怒易激动", "强迫想法", "记忆力下降",
        "心慌胸闷", "头晕头痛", "肌肉紧张", "出汗多"
    ];
    const symptomCount = Math.floor(Math.random() * 3) + 2; // 2-4个症状
    const selectedSymptoms = [];
    for(let i = 0; i < symptomCount; i++) {
        const index = Math.floor(Math.random() * possibleSymptoms.length);
        selectedSymptoms.push(possibleSymptoms.splice(index, 1)[0]);
    }

    // 生成随机创伤经历（0-2个）
    const possibleTrauma = [
        "童年创伤", "校园霸凌", "职场受挫", "感情失败",
        "亲人离世", "重大疾病", "意外事故", "经济损失",
        "家庭矛盾", "人际冲突"
    ];
    const traumaCount = Math.floor(Math.random() * 3);
    const selectedTrauma = [];
    for(let i = 0; i < traumaCount; i++) {
        const index = Math.floor(Math.random() * possibleTrauma.length);
        selectedTrauma.push(possibleTrauma.splice(index, 1)[0]);
    }

    const prompt = `请基于以下信息生成一个详细的精神科就诊病例，要求生动真实，富有细节：

基本信息：
- 年龄：${age}岁
- 性别：${gender}
- 职业：${job}
- 婚姻状况：${maritalStatus}
- 教育程度：${education}
- 居住情况：${livingConditions}
- 经济状况：${financialStatus}

主要症状：${selectedSymptoms.join("、")}
${selectedTrauma.length > 0 ? `重要经历：${selectedTrauma.join("、")}` : ''}

请详细描述：
1. 症状的具体表现和发展过程
2. 这些问题对生活的影响
3. 个人的应对方式和求助经历
4. 对未来的担忧和期待

要求：
1. 使用第一人称叙述
2. 增加具体的生活场景
3. 加入情感表达
4. 体现人物性格特点
5. 字数不少于800字`;

    try {
        const response = await callAPI(prompt, 0.9); // 增加随机性参数
        currentCase = response;
        
        hideLoading();
        const formattedCase = formatCaseDisplay(response);
        document.getElementById('patientInfo').innerHTML = formattedCase;
        
        // 清空之前的对话
        document.getElementById('chatContainer').innerHTML = '';
        document.getElementById('expertFeedback').innerHTML = '';
        
        // 提取主诉作为开场白
        const mainComplaint = extractMainComplaint(response);
        addMessage("新的病人已到达，请开始问诊。", 'system');
        addMessage(mainComplaint, 'patient');
        translate.execute(); // 添加翻译调用
    } catch (error) {
        console.error('生成病例失败:', error);
        hideLoading();
        addMessage('系统错误，请稍后重试', 'system');
    }
}

async function sendMessage() {
    const userInput = document.getElementById('userInput');
    const message = userInput.value.trim();
    if (!message) return;

    // 添加用户消息
    addMessage(message, 'user');
    userInput.value = '';
    conversationCount++;

    try {
        // 获取专家对医生问诊的评估
        const expertPrompt = `作为精神科专家，请对以下医生的问诊进行简短评估：
        医生的问诊：${message}

        请从以下几个方面简要评价（总字数50字以内）：
        1. 专业度评分（1-10分）
        2. 问诊技巧评分（1-10分）
        3. 改进建议`;

        // 同时获取病人回复和专家评估
        const [patientResponse, expertFeedback] = await Promise.all([
            callAPI(`作为一个病人，请根据以下背景信息回复医生的问题：
                ${currentCase ? JSON.stringify(currentCase) : ''}
                医生的问题：${message}`),
            callAPI(expertPrompt)
        ]);

        // 添加病人回复
        addMessage(patientResponse, 'assistant');

        // 添加专家评估
        addMessage(expertFeedback, 'expert');

        // 更新分数（根据专家评分）
        try {
            const scoreMatch = expertFeedback.match(/专业度评分[：:]\s*(\d+)/);
            if (scoreMatch) {
                const score = parseInt(scoreMatch[1]);
                updateScore(score);
            }
        } catch (error) {
            console.error('解析评分失败:', error);
        }
        translate.execute(); // 添加翻译调用
    } catch (error) {
        console.error('发送消息失败:', error);
        addMessage('系统错误，请稍后重试。', 'system');
    }
}

async function callAPI(prompt, temperature = 0.7) {
    console.log('Calling API with prompt:', prompt);
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "deepseek-chat",
                messages: [{
                    role: "user",
                    content: prompt
                }],
                temperature: temperature,
                max_tokens: 2000,  // 增加输出长度限制
                presence_penalty: 0.6,
                frequency_penalty: 0.7
            })
        });

        console.log('API Response status:', response.status);

        if (!response.ok) {
            throw new Error(`API 请求失败: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('API Response data:', data);

        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
            throw new Error('API 返回数据格式错误');
        }

        return data.choices[0].message.content;
    } catch (error) {
        console.error('API 调用错误:', error);
        throw error;
    }
}

function addMessage(message, type) {
    const chatContainer = document.getElementById('chatContainer');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    
    // 根据消息类型添加前缀
    let prefix = '';
    switch(type) {
        case 'patient': prefix = '👤 患者：'; break;
        case 'user': prefix = '👨‍⚕️ 医生：'; break;
        case 'expert': prefix = '👨‍🏫 专家：'; break;
        case 'system': prefix = '💻 系统：'; break;
        case 'assistant': prefix = '👤 患者：'; break;
    }
    
    messageDiv.innerHTML = `<span class="message-prefix">${prefix}</span>${message}`;
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function openExamination() {
    try {
        const modal = document.getElementById('examModal');
        const examList = document.getElementById('examList');
        examList.innerHTML = '';
        
        // 添加已选检查项目显示区域
        const selectedArea = document.createElement('div');
        selectedArea.id = 'selectedExams';
        selectedArea.className = 'selected-items';
        examList.appendChild(selectedArea);
        updateSelectedExams();

        // 遍历所有检查类别
        Object.entries(examinations).forEach(([category, subCategories]) => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'exam-category';
            categoryDiv.innerHTML = `<h3>${category}</h3>`;
            
            // 遍历子类别
            Object.entries(subCategories).forEach(([subCategory, items]) => {
                const subCategoryDiv = document.createElement('div');
                subCategoryDiv.className = 'exam-subcategory';
                subCategoryDiv.innerHTML = `<h4>${subCategory}</h4>`;
                
                // 添加检查项目
                items.forEach(exam => {
                    const itemDiv = document.createElement('div');
                    itemDiv.className = 'exam-item';
                    itemDiv.innerHTML = `
                        <input type="checkbox" id="exam_${exam.name}" 
                               ${selectedExams.has(exam.name) ? 'checked' : ''}>
                        <label for="exam_${exam.name}">
                            <strong>${exam.name}</strong><br>
                            ${exam.desc}<br>
                            ${exam.detail ? `<small>${exam.detail}</small><br>` : ''}
                            ${exam.contraindication ? `<small class="contraindication">禁忌：${exam.contraindication}</small><br>` : ''}
                            <span class="price">￥${exam.price}</span>
                        </label>
                    `;
                    itemDiv.querySelector('input').onchange = (e) => toggleExam(exam.name, e.target.checked);
                    subCategoryDiv.appendChild(itemDiv);
                });
                
                categoryDiv.appendChild(subCategoryDiv);
            });
            
            examList.appendChild(categoryDiv);
        });

        modal.style.display = 'block';
        translate.execute(); // 添加翻译调用
    } catch (error) {
        console.error('打开检查弹窗失败:', error);
        console.log('examinations:', examinations);
    }
}

function toggleExam(examName, isSelected) {
    if (isSelected) {
        selectedExams.add(examName);
    } else {
        selectedExams.delete(examName);
    }
    updateSelectedExams();
}

function updateSelectedExams() {
    const selectedArea = document.getElementById('selectedExams');
    if (!selectedArea) return;

    const totalPrice = Array.from(selectedExams).reduce((sum, name) => {
        const exam = [...examinations.psychological, ...examinations.physical]
            .find(e => e.name === name);
        return sum + (exam ? exam.price : 0);
    }, 0);

    selectedArea.innerHTML = `
        <div class="selected-summary">
            <h4>已选检查项目 (${selectedExams.size}项)</h4>
            <div class="selected-list">${Array.from(selectedExams).join('<br>')}</div>
            <div class="total-price">总价：￥${totalPrice}</div>
        </div>
    `;
    translate.execute(); // 添加翻译调用
}

async function confirmExams() {
    if (selectedExams.size === 0) {
        alert('请至少选择一项检查');
        return;
    }

    const examsList = Array.from(selectedExams).join('、');
    addMessage(`医生开具了以下检查：${examsList}`, 'system');

    // 专家评估检查项目的合理性
    const expertEvalPrompt = `作为精神科专家，请对以下检查安排进行专业评估：
    检查项目：${examsList}
    
    请从以下几个方面进行评价（200字以内）：
    1. 完整性评分（1-10分）：检查项目是否完整，是否遗漏重要检查
    2. 必要性评分（1-10分）：开具的检查是否必要，是否存在冗余检查
    3. 检查安排的合理性：
       - 优点：哪些检查安排很必要
       - 不足：是否遗漏了关键检查
       - 冗余：是否存在不必要的检查
    4. 具体建议：
       - 建议增加的检查项目
       - 建议减少的检查项目
       - 检查的优先顺序建议`;

    try {
        // 先获取专家评估
        const expertFeedback = await callAPI(expertEvalPrompt);
        addMessage(expertFeedback, 'expert');

        // 再生成检查结果
        const resultsPrompt = `请针对以下检查项目生成检查结果报告：${examsList}
        要求：
        1. 每项检查单独一段
        2. 突出异常指标
        3. 使用医学专业用语
        4. 总字数控制在200字以内`;

        const results = await callAPI(resultsPrompt);
        addMessage(results, 'system');
        translate.execute(); // 添加翻译调用
    } catch (error) {
        console.error('生成检查评估失败:', error);
    }

    closeModal('examModal');
    selectedExams.clear();
}

// 诊断功能
function openDiagnosis() {
    const modal = document.getElementById('diagnosisModal');
    const diagnosisList = document.getElementById('diagnosisList');
    diagnosisList.innerHTML = '';

    diagnoses.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'diagnosis-category';
        categoryDiv.innerHTML = `<h3>${category.category}</h3>`;

        category.items.forEach(item => {
            const div = document.createElement('div');
            div.className = 'diagnosis-item';
            div.innerHTML = `
                <input type="checkbox" id="diag_${item}">
                <label for="diag_${item}">${item}</label>
            `;
            categoryDiv.appendChild(div);
        });
        diagnosisList.appendChild(categoryDiv);
    });

    modal.style.display = 'block';
    translate.execute(); // 添加翻译调用
}

function prescribeMedicine() {
    try {
        const modal = document.getElementById('medicineModal');
        const medicineList = document.getElementById('medicineList');
        medicineList.innerHTML = '';

        // 添加已选药物显示区域
        const selectedArea = document.createElement('div');
        selectedArea.id = 'selectedMedicines';
        selectedArea.className = 'selected-items';
        medicineList.appendChild(selectedArea);
        updateSelectedMedicines();

        // 遍历所有药物类别
        Object.entries(medicines).forEach(([category, subCategories]) => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'medicine-category';
            categoryDiv.innerHTML = `<h3>${category}</h3>`;
            
            // 遍历子类别
            Object.entries(subCategories).forEach(([subCategory, items]) => {
                const subCategoryDiv = document.createElement('div');
                subCategoryDiv.className = 'medicine-subcategory';
                subCategoryDiv.innerHTML = `<h4>${subCategory}</h4>`;
                
                // 添加药物项目
                items.forEach(med => {
                    const itemDiv = document.createElement('div');
                    itemDiv.className = 'medicine-item';
                    itemDiv.innerHTML = `
                        <input type="checkbox" id="med_${med.name}" 
                               ${selectedMedicines.has(med.name) ? 'checked' : ''}>
                        <label for="med_${med.name}">
                            <strong>${med.name}</strong>
                            <span class="medicine-type">${med.type || ''}</span><br>
                            ${med.desc}<br>
                            ${med.detail ? `<small>${med.detail}</small><br>` : ''}
                            <span class="price">￥${med.price}</span>
                        </label>
                    `;
                    itemDiv.querySelector('input').onchange = (e) => toggleMedicine(med.name, e.target.checked);
                    subCategoryDiv.appendChild(itemDiv);
                });
                
                categoryDiv.appendChild(subCategoryDiv);
            });
            
            medicineList.appendChild(categoryDiv);
        });

        // 添加确认按钮
        const confirmButton = document.createElement('button');
        confirmButton.className = 'confirm-button';
        confirmButton.textContent = '确认处方';
        confirmButton.onclick = confirmPrescription;
        medicineList.appendChild(confirmButton);

        modal.style.display = 'block';
        translate.execute(); // 添加翻译调用
    } catch (error) {
        console.error('打开药物弹窗失败:', error);
    }
}

function toggleMedicine(medName, isSelected) {
    if (isSelected) {
        selectedMedicines.add(medName);
    } else {
        selectedMedicines.delete(medName);
    }
    updateSelectedMedicines();
}

function updateSelectedMedicines() {
    const selectedArea = document.getElementById('selectedMedicines');
    if (!selectedArea) return;

    // 计算总价
    let totalPrice = 0;
    let selectedMedsList = [];

    selectedMedicines.forEach(medName => {
        Object.values(medicines).forEach(subCategories => {
            Object.values(subCategories).forEach(items => {
                const med = items.find(m => m.name === medName);
                if (med) {
                    totalPrice += med.price;
                    selectedMedsList.push(`${med.name}（${med.desc}）`);
                }
            });
        });
    });

    selectedArea.innerHTML = `
        <div class="selected-summary">
            <h4>已选药物 (${selectedMedicines.size}项)</h4>
            <div class="selected-list">${selectedMedsList.join('<br>')}</div>
            <div class="total-price">总价：￥${totalPrice}</div>
        </div>
    `;
    translate.execute(); // 添加翻译调用
}

function closeModal(modalId) {
    try {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
        }
    } catch (error) {
        console.error('关闭弹窗失败:', error);
    }
}

function selectExam(examName) {
    addMessage(`医生开具了 ${examName} 检查`, 'system');
    closeModal('examModal');
}

function selectMedicine(medicineName) {
    addMessage(`医生开具了 ${medicineName}`, 'system');
    closeModal('medicineModal');
}

// 页面加载完成后自动开始第一个病例
window.onload = startNewCase;

// 添加点击模态框外部关闭功能
window.onclick = function(event) {
    if (event.target.className === 'modal') {
        event.target.style.display = 'none';
    }
}

// 添加加载状态显示函数
function showLoading() {
    const loadingHtml = `
        <div class="loading-container">
            <div class="loading-spinner"></div>
            <div class="loading-text">正在生成新病例...</div>
        </div>
    `;
    document.getElementById('patientInfo').innerHTML = loadingHtml;
}

function hideLoading() {
    const loadingElement = document.querySelector('.loading-container');
    if (loadingElement) {
        loadingElement.remove();
    }
}

// 添加格式化显示函数
function formatCaseDisplay(response) {
    try {
        // 移除所有的星号
        response = response.replace(/\*\*/g, '');
        
        const sections = response.split('\n\n');
        let formattedHtml = '<div class="case-info">';
        
        // 基本信息部分
        formattedHtml += `
            <div class="info-section">
                <div class="section-header">基本信息</div>
                <div class="section-content">
        `;
        
        // 处理基本信息的每一行
        const basicInfoLines = sections[0].split('\n');
        basicInfoLines.forEach(line => {
            if (line.includes('：')) {
                const [label, value] = line.split('：').map(s => s.trim());
                formattedHtml += `
                    <div class="info-item">
                        <span class="info-label">${label}</span>
                        <span class="info-value">${value}</span>
                    </div>
                `;
            }
        });
        
        formattedHtml += '</div></div>';
        
        // 症状部分
        if (sections[1] && sections[1].includes('症状')) {
            formattedHtml += `
                <div class="info-section">
                    <div class="section-header">主要症状</div>
                    <div class="section-content">
            `;
            
            const symptoms = sections[1].split('、');
            symptoms.forEach(symptom => {
                if (symptom.trim()) {
                    formattedHtml += `<span class="symptom-tag">${symptom.trim()}</span>`;
                }
            });
            
            formattedHtml += '</div></div>';
        }
        
        // 其他部分
        sections.slice(2).forEach(section => {
            if (section.trim()) {
                const sectionTitle = section.split('\n')[0];
                const sectionContent = section.split('\n').slice(1).join('<br>');
                formattedHtml += `
                    <div class="info-section">
                        <div class="section-header">${sectionTitle}</div>
                        <div class="section-content">${sectionContent}</div>
                    </div>
                `;
            }
        });
        
        formattedHtml += '</div>';
        return formattedHtml;
    } catch (error) {
        console.error('格式化显示错误:', error);
        return response;
    }
}

// 添加主诉提取函数
function extractMainComplaint(response) {
    try {
        const lines = response.split('\n');
        for (let line of lines) {
            if (line.includes('主诉') || line.includes('症状')) {
                return line.trim();
            }
        }
        // 如果没找到主诉，返回第一段
        const firstParagraph = response.split('\n\n')[0];
        return firstParagraph.trim();
    } catch (error) {
        console.error('提取主诉错误:', error);
        return '医生您好，我最近感觉很不舒服...';
    }
}

async function confirmPrescription() {
    if (selectedMedicines.size === 0) {
        alert('请至少选择一种药物');
        return;
    }

    const medicineList = Array.from(selectedMedicines).join('、');
    addMessage(`医生开具的处方：${medicineList}`, 'system');

    // 专家评估处方的合理性
    const expertPrompt = `作为精神科专家，请对以下处方进行专业评估：
    处方内容：${medicineList}
    患者诊断：${Array.from(selectedDiagnoses).join('、')}
    患者背景：${currentCase}
    
    请从以下几个方面进行评价（200字以内）：
    1. 用药合理性评分（1-10分）：药物选择是否合适
    2. 用药安全性评分（1-10分）：是否考虑了药物相互作用和禁忌症
    3. 处方分析：
       - 用药优点：哪些用药选择恰当
       - 用药风险：可能存在的不良反应
       - 药物相互作用：是否存在配伍禁忌
    4. 剂量建议：
       - 是否需要调整剂量
       - 给药时间建议
    5. 改进建议：
       - 建议增加的药物
       - 建议调整的用药
       - 需要特别监测的指标`;

    try {
        const expertFeedback = await callAPI(expertPrompt);
        addMessage(expertFeedback, 'expert');
        translate.execute(); // 添加翻译调用
    } catch (error) {
        console.error('获取专家评估失败:', error);
    }

    closeModal('medicineModal');
    selectedMedicines.clear();
}

async function confirmDiagnosis() {
    if (selectedDiagnoses.size === 0) {
        alert('请至少选择一个诊断');
        return;
    }

    const diagnosisList = Array.from(selectedDiagnoses).join('、');
    addMessage(`医生的诊断：${diagnosisList}`, 'system');

    // 专家评估诊断的合理性
    const expertPrompt = `作为精神科专家，请对以下诊断进行专业评估：
    诊断：${diagnosisList}
    患者背景：${currentCase}
    
    请从以下几个方面进行评价（200字以内）：
    1. 诊断准确性评分（1-10分）：诊断是否符合患者症状表现
    2. 诊断完整性评分（1-10分）：是否覆盖了所有临床表现
    3. 诊断分析：
       - 符合诊断的关键症状
       - 需要进一步明确的方面
       - 是否存在共病可能
    4. 鉴别诊断建议：
       - 需要排除的其他诊断
       - 建议进一步关注的症状
    5. 具体改进建议`;

    try {
        const expertFeedback = await callAPI(expertPrompt);
        addMessage(expertFeedback, 'expert');
        translate.execute(); // 添加翻译调用
    } catch (error) {
        console.error('获取专家评估失败:', error);
    }

    closeModal('diagnosisModal');
    selectedDiagnoses.clear();
} 

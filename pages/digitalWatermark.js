// 数字水印页面模块
window.digitalWatermark = {
    id: 'digitalWatermark',
    title: '数字水印',
    
    // 水印配置数据
    config: {
        enabled: true, // 水印开关，默认开启
        type: 'visible', // 水印类型：visible-明水印，invisible-暗水印
        content: [
            { type: 'name', label: '姓名' },
            { type: 'time', label: '时间' }
        ], // 水印内容
        style: {
            color: '#000000',
            opacity: '20%',
            fontSize: '28px',
            rotation: '45°',
            rowSpacing: '100px',
            columnSpacing: '100px'
        }, // 样式设置
        timing: {
            upload: true,
            download: false,
            external: false
        }, // 生效时间
        scope: {
            type: 'all', // all-全部员工和设备，specific-指定部门/设备
            selectedDepartments: [], // 选中的部门ID列表
            selectedDevices: [] // 选中的设备ID列表
        } // 生效范围
    },
    
    // 预览状态
    previewState: {
        isActive: false
    },
    
    // 内容类型选项
    contentOptions: [
        { value: 'name', label: '姓名' },
        { value: 'company', label: '公司' },
        { value: 'time', label: '时间' },
        { value: 'department', label: '部门' },
        { value: 'ip', label: 'IP地址' },
        { value: 'device', label: '设备信息' },
        { value: 'userid', label: '用户ID' },
        { value: 'custom', label: '自定义文本' }
    ],
    
    // 部门数据
    departments: [
        { id: 'dept001', name: '技术部', code: 'TECH', manager: '张技术', employeeCount: 25, description: '负责产品研发和技术架构' },
        { id: 'dept002', name: '产品部', code: 'PROD', manager: '李产品', employeeCount: 12, description: '负责产品规划和需求管理' },
        { id: 'dept003', name: '设计部', code: 'DESIGN', manager: '王设计', employeeCount: 8, description: '负责UI/UX设计和视觉创意' },
        { id: 'dept004', name: '运营部', code: 'OPS', manager: '赵运营', employeeCount: 15, description: '负责产品运营和用户增长' },
        { id: 'dept005', name: '市场部', code: 'MKT', manager: '钱市场', employeeCount: 10, description: '负责品牌推广和市场活动' },
        { id: 'dept006', name: '销售部', code: 'SALES', manager: '孙销售', employeeCount: 20, description: '负责客户开发和业务拓展' },
        { id: 'dept007', name: '人事部', code: 'HR', manager: '周人事', employeeCount: 6, description: '负责人力资源管理和招聘' },
        { id: 'dept008', name: '财务部', code: 'FIN', manager: '吴财务', employeeCount: 8, description: '负责财务管理和资金运作' },
        { id: 'dept009', name: '法务部', code: 'LEGAL', manager: '郑法务', employeeCount: 4, description: '负责法律事务和合规管理' },
        { id: 'dept010', name: '行政部', code: 'ADMIN', manager: '王行政', employeeCount: 5, description: '负责日常行政和后勤保障' },
        { id: 'dept011', name: '客服部', code: 'CS', manager: '刘客服', employeeCount: 12, description: '负责客户服务和售后支持' },
        { id: 'dept012', name: '质量部', code: 'QA', manager: '陈质量', employeeCount: 6, description: '负责质量控制和测试管理' }
    ],
    
    devices: [
        { id: 'dev001', name: '办公电脑-001', type: '台式机', location: '技术部办公区', ip: '192.168.1.101' },
        { id: 'dev002', name: '办公电脑-002', type: '台式机', location: '产品部办公区', ip: '192.168.1.102' },
        { id: 'dev003', name: '办公电脑-003', type: '台式机', location: '设计部办公区', ip: '192.168.1.103' },
        { id: 'dev004', name: '办公电脑-004', type: '台式机', location: '技术部办公区', ip: '192.168.1.104' },
        { id: 'dev005', name: '办公电脑-005', type: '台式机', location: '技术部办公区', ip: '192.168.1.105' },
        { id: 'dev006', name: '笔记本-001', type: '笔记本电脑', location: '移动办公', ip: '192.168.1.106' },
        { id: 'dev007', name: '笔记本-002', type: '笔记本电脑', location: '移动办公', ip: '192.168.1.107' },
        { id: 'dev008', name: '服务器-001', type: '服务器', location: '机房A', ip: '192.168.1.201' },
        { id: 'dev009', name: '服务器-002', type: '服务器', location: '机房B', ip: '192.168.1.202' },
        { id: 'dev010', name: '平板-001', type: '平板电脑', location: '会议室', ip: '192.168.1.108' }
    ],
    
    // 页面内容模板
    content: function() {
        return `
            <div class="digital-watermark-page">
                <!-- 页面头部 -->
                <div class="page-header">
                    <div class="header-content">
                        <h1 class="page-title">数字水印</h1>
                        <p class="page-desc">数字水印嵌入参数设置，支持明水印和暗水印，可自定义内容和样式</p>
                    </div>
                </div>

                <!-- 主要内容区域 -->
                <div class="main-content">
                    <!-- 开关控制卡片 -->
                    <div class="config-card">
                        <div class="card-header">
                            <h3 class="card-title">功能开关</h3>
                        </div>
                        <div class="card-body">
                            <div class="switch-container">
                                <label class="modern-switch">
                                    <input type="checkbox" id="watermarkEnabled" ${this.config.enabled ? 'checked' : ''}>
                                    <span class="switch-slider"></span>
                                </label>
                                <div class="switch-info">
                                    <span class="switch-label">启用数字水印</span>
                                    <span class="switch-desc">开启后，可以对指定对象嵌入水印，并自定义嵌入水印的内容和展现时间</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 水印配置卡片 -->
                    <div class="config-card">
                        <div class="card-header">
                            <h3 class="card-title">水印配置</h3>
                        </div>
                        <div class="card-body">
                            <!-- 水印类型 -->
                            <div class="config-section">
                                <div class="section-header">
                                    <h4 class="section-title">水印类型</h4>
                                    <span class="section-desc">选择水印的显示方式</span>
                                </div>
                                <div class="type-selector">
                                    <label class="type-card ${this.config.type === 'visible' ? 'selected' : ''}">
                                        <input type="radio" name="watermarkType" value="visible" ${this.config.type === 'visible' ? 'checked' : ''}>
                                        <div class="type-content">
                                            <div class="type-icon">👁️</div>
                                            <div class="type-info">
                                                <span class="type-name">明水印</span>
                                                <span class="type-desc">可见的水印标识</span>
                                            </div>
                                        </div>
                                    </label>
                                    <label class="type-card ${this.config.type === 'invisible' ? 'selected' : ''}">
                                        <input type="radio" name="watermarkType" value="invisible" ${this.config.type === 'invisible' ? 'checked' : ''}>
                                        <div class="type-content">
                                            <div class="type-icon">🔍</div>
                                            <div class="type-info">
                                                <span class="type-name">暗水印</span>
                                                <span class="type-desc">隐藏的水印标识</span>
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <!-- 内容设置 -->
                            <div class="config-section">
                                <div class="section-header">
                                    <h4 class="section-title">内容设置</h4>
                                    <span class="section-desc">配置水印显示的内容信息</span>
                                </div>
                                <div class="content-builder">
                                    ${this.config.content.map((item, index) => `
                                        <div class="content-item" data-index="${index}">
                                            <div class="item-header">
                                                <span class="item-label">第${index + 1}行内容</span>
                                                <button class="btn-remove" data-index="${index}">
                                                    <span class="remove-icon">×</span>
                                                </button>
                                            </div>
                                            <div class="item-content">
                                                <select class="content-select" data-index="${index}">
                                                    ${this.contentOptions.map(option => 
                                                        `<option value="${option.value}" ${item.type === option.value ? 'selected' : ''}>${option.label}</option>`
                                                    ).join('')}
                                                </select>
                                            </div>
                                        </div>
                                    `).join('')}
                                    <button class="btn-add-content">
                                        <span class="add-icon">+</span>
                                        <span>添加内容行</span>
                                    </button>
                                </div>
                            </div>

                            <!-- 样式设置 -->
                            <div class="config-section">
                                <div class="section-header">
                                    <h4 class="section-title">样式设置</h4>
                                    <span class="section-desc">自定义水印的视觉效果</span>
                                </div>
                                <div class="style-grid">
                                    <div class="style-item">
                                        <label class="style-label">字体颜色</label>
                                        <div class="color-picker">
                                            <input type="color" value="${this.config.style.color}" class="color-input">
                                        </div>
                                    </div>
                                    <div class="style-item">
                                        <label class="style-label">透明度</label>
                                        <select class="style-select" id="opacitySelect">
                                            <option value="5%" ${this.config.style.opacity === '5%' ? 'selected' : ''}>5%</option>
                                            <option value="10%" ${this.config.style.opacity === '10%' ? 'selected' : ''}>10%</option>
                                            <option value="15%" ${this.config.style.opacity === '15%' ? 'selected' : ''}>15%</option>
                                            <option value="20%" ${this.config.style.opacity === '20%' ? 'selected' : ''}>20%</option>
                                            <option value="25%" ${this.config.style.opacity === '25%' ? 'selected' : ''}>25%</option>
                                            <option value="30%" ${this.config.style.opacity === '30%' ? 'selected' : ''}>30%</option>
                                            <option value="35%" ${this.config.style.opacity === '35%' ? 'selected' : ''}>35%</option>
                                            <option value="40%" ${this.config.style.opacity === '40%' ? 'selected' : ''}>40%</option>
                                            <option value="45%" ${this.config.style.opacity === '45%' ? 'selected' : ''}>45%</option>
                                            <option value="50%" ${this.config.style.opacity === '50%' ? 'selected' : ''}>50%</option>
                                        </select>
                                    </div>
                                    <div class="style-item">
                                        <label class="style-label">字号</label>
                                        <select class="style-select" id="fontSizeSelect">
                                            <option value="12px" ${this.config.style.fontSize === '12px' ? 'selected' : ''}>12px</option>
                                            <option value="14px" ${this.config.style.fontSize === '14px' ? 'selected' : ''}>14px</option>
                                            <option value="16px" ${this.config.style.fontSize === '16px' ? 'selected' : ''}>16px</option>
                                            <option value="18px" ${this.config.style.fontSize === '18px' ? 'selected' : ''}>18px</option>
                                            <option value="20px" ${this.config.style.fontSize === '20px' ? 'selected' : ''}>20px</option>
                                            <option value="24px" ${this.config.style.fontSize === '24px' ? 'selected' : ''}>24px</option>
                                            <option value="28px" ${this.config.style.fontSize === '28px' ? 'selected' : ''}>28px</option>
                                            <option value="32px" ${this.config.style.fontSize === '32px' ? 'selected' : ''}>32px</option>
                                            <option value="36px" ${this.config.style.fontSize === '36px' ? 'selected' : ''}>36px</option>
                                            <option value="40px" ${this.config.style.fontSize === '40px' ? 'selected' : ''}>40px</option>
                                            <option value="48px" ${this.config.style.fontSize === '48px' ? 'selected' : ''}>48px</option>
                                            <option value="56px" ${this.config.style.fontSize === '56px' ? 'selected' : ''}>56px</option>
                                            <option value="64px" ${this.config.style.fontSize === '64px' ? 'selected' : ''}>64px</option>
                                        </select>
                                    </div>
                                    <div class="style-item">
                                        <label class="style-label">旋转角度</label>
                                        <select class="style-select" id="rotationSelect">
                                            <option value="0°" ${this.config.style.rotation === '0°' ? 'selected' : ''}>0° (水平)</option>
                                            <option value="15°" ${this.config.style.rotation === '15°' ? 'selected' : ''}>15°</option>
                                            <option value="30°" ${this.config.style.rotation === '30°' ? 'selected' : ''}>30°</option>
                                            <option value="45°" ${this.config.style.rotation === '45°' ? 'selected' : ''}>45°</option>
                                            <option value="60°" ${this.config.style.rotation === '60°' ? 'selected' : ''}>60°</option>
                                            <option value="75°" ${this.config.style.rotation === '75°' ? 'selected' : ''}>75°</option>
                                            <option value="90°" ${this.config.style.rotation === '90°' ? 'selected' : ''}>90° (垂直)</option>
                                            <option value="105°" ${this.config.style.rotation === '105°' ? 'selected' : ''}>105°</option>
                                            <option value="120°" ${this.config.style.rotation === '120°' ? 'selected' : ''}>120°</option>
                                            <option value="135°" ${this.config.style.rotation === '135°' ? 'selected' : ''}>135°</option>
                                            <option value="150°" ${this.config.style.rotation === '150°' ? 'selected' : ''}>150°</option>
                                            <option value="165°" ${this.config.style.rotation === '165°' ? 'selected' : ''}>165°</option>
                                            <option value="180°" ${this.config.style.rotation === '180°' ? 'selected' : ''}>180° (倒置)</option>
                                        </select>
                                    </div>
                                    <div class="style-item">
                                        <label class="style-label">行间距</label>
                                        <select class="style-select" id="rowSpacingSelect">
                                            <option value="40px" ${this.config.style.rowSpacing === '40px' ? 'selected' : ''}>40px</option>
                                            <option value="50px" ${this.config.style.rowSpacing === '50px' ? 'selected' : ''}>50px</option>
                                            <option value="60px" ${this.config.style.rowSpacing === '60px' ? 'selected' : ''}>60px</option>
                                            <option value="70px" ${this.config.style.rowSpacing === '70px' ? 'selected' : ''}>70px</option>
                                            <option value="80px" ${this.config.style.rowSpacing === '80px' ? 'selected' : ''}>80px</option>
                                            <option value="90px" ${this.config.style.rowSpacing === '90px' ? 'selected' : ''}>90px</option>
                                            <option value="100px" ${this.config.style.rowSpacing === '100px' ? 'selected' : ''}>100px</option>
                                            <option value="120px" ${this.config.style.rowSpacing === '120px' ? 'selected' : ''}>120px</option>
                                            <option value="140px" ${this.config.style.rowSpacing === '140px' ? 'selected' : ''}>140px</option>
                                            <option value="160px" ${this.config.style.rowSpacing === '160px' ? 'selected' : ''}>160px</option>
                                            <option value="180px" ${this.config.style.rowSpacing === '180px' ? 'selected' : ''}>180px</option>
                                            <option value="200px" ${this.config.style.rowSpacing === '200px' ? 'selected' : ''}>200px</option>
                                        </select>
                                    </div>
                                    <div class="style-item">
                                        <label class="style-label">列间距</label>
                                        <select class="style-select" id="columnSpacingSelect">
                                            <option value="40px" ${this.config.style.columnSpacing === '40px' ? 'selected' : ''}>40px</option>
                                            <option value="50px" ${this.config.style.columnSpacing === '50px' ? 'selected' : ''}>50px</option>
                                            <option value="60px" ${this.config.style.columnSpacing === '60px' ? 'selected' : ''}>60px</option>
                                            <option value="70px" ${this.config.style.columnSpacing === '70px' ? 'selected' : ''}>70px</option>
                                            <option value="80px" ${this.config.style.columnSpacing === '80px' ? 'selected' : ''}>80px</option>
                                            <option value="90px" ${this.config.style.columnSpacing === '90px' ? 'selected' : ''}>90px</option>
                                            <option value="100px" ${this.config.style.columnSpacing === '100px' ? 'selected' : ''}>100px</option>
                                            <option value="120px" ${this.config.style.columnSpacing === '120px' ? 'selected' : ''}>120px</option>
                                            <option value="140px" ${this.config.style.columnSpacing === '140px' ? 'selected' : ''}>140px</option>
                                            <option value="160px" ${this.config.style.columnSpacing === '160px' ? 'selected' : ''}>160px</option>
                                            <option value="180px" ${this.config.style.columnSpacing === '180px' ? 'selected' : ''}>180px</option>
                                            <option value="200px" ${this.config.style.columnSpacing === '200px' ? 'selected' : ''}>200px</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <!-- 水印预览 -->
                            <div class="config-section">
                                <div class="section-header">
                                    <h4 class="section-title">水印预览</h4>
                                    <span class="section-desc">实时预览水印效果</span>
                                </div>
                                <div class="preview-container">
                                    <div class="preview-area">
                                        <div class="preview-placeholder">
                                            <span class="preview-icon">👁️</span>
                                            <span class="preview-text">点击预览水印效果</span>
                                        </div>
                                        <button class="preview-close-btn" style="display: none;">
                                            <span class="close-icon">×</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 生效设置卡片 -->
                    <div class="config-card">
                        <div class="card-header">
                            <h3 class="card-title">生效设置</h3>
                        </div>
                        <div class="card-body">
                            <!-- 水印生效时间 -->
                            <div class="config-section">
                                <div class="section-header">
                                    <h4 class="section-title required">水印生效时间</h4>
                                    <span class="section-desc">选择水印在哪些操作时生效</span>
                                </div>
                                <div class="timing-grid">
                                    <label class="timing-option">
                                        <input type="checkbox" id="uploadTiming" ${this.config.timing.upload ? 'checked' : ''}>
                                        <div class="timing-content">
                                            <div class="timing-icon">📤</div>
                                            <div class="timing-info">
                                                <span class="timing-name">上传</span>
                                                <span class="timing-desc">文件上传时添加水印</span>
                                            </div>
                                        </div>
                                    </label>
                                    <label class="timing-option">
                                        <input type="checkbox" id="downloadTiming" ${this.config.timing.download ? 'checked' : ''}>
                                        <div class="timing-content">
                                            <div class="timing-icon">📥</div>
                                            <div class="timing-info">
                                                <span class="timing-name">下载</span>
                                                <span class="timing-desc">文件下载时添加水印</span>
                                            </div>
                                        </div>
                                    </label>
                                    <label class="timing-option">
                                        <input type="checkbox" id="externalTiming" ${this.config.timing.external ? 'checked' : ''}>
                                        <div class="timing-content">
                                            <div class="timing-icon">🌐</div>
                                            <div class="timing-info">
                                                <span class="timing-name">外发</span>
                                                <span class="timing-desc">文件外发时添加水印</span>
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <!-- 生效范围 -->
                            <div class="config-section">
                                <div class="section-header">
                                    <h4 class="section-title">生效范围</h4>
                                    <span class="section-desc">设置水印的适用范围</span>
                                </div>
                                <div class="scope-container">
                                    <div class="scope-header">
                                        <span class="scope-title">生效对象</span>
                                    </div>
                                    <div class="scope-options">
                                        <label class="scope-option">
                                            <input type="radio" name="scopeType" value="all" ${this.config.scope.type === 'all' ? 'checked' : ''}>
                                            <div class="scope-content">
                                                <div class="scope-icon">👥</div>
                                                <div class="scope-info">
                                                    <span class="scope-name">全部员工和设备</span>
                                                    <span class="scope-desc">对所有用户和设备生效</span>
                                                </div>
                                            </div>
                                        </label>
                                        <label class="scope-option">
                                            <input type="radio" name="scopeType" value="specific" ${this.config.scope.type === 'specific' ? 'checked' : ''}>
                                            <div class="scope-content">
                                                <div class="scope-icon">🎯</div>
                                                <div class="scope-info">
                                                    <span class="scope-name">指定部门/设备</span>
                                                    <span class="scope-desc">仅对特定部门或设备生效</span>
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                    
                                    <!-- 指定部门和设备选择 -->
                                    <div class="specific-selection" style="display: ${this.config.scope.type === 'specific' ? 'block' : 'none'};">
                                        <div class="selection-tabs">
                                            <button class="tab-btn active" data-tab="departments">部门选择</button>
                                            <button class="tab-btn" data-tab="devices">设备选择</button>
                                        </div>
                                        
                                        <!-- 部门选择面板 -->
                                        <div class="tab-panel active" id="departments-panel">
                                            <div class="selection-header">
                                                <span class="selection-title">选择部门</span>
                                                <span class="selection-count">已选择 ${(this.config.scope?.selectedDepartments || []).length} 个部门</span>
                                            </div>
                                            <div class="selection-list">
                                                ${this.departments.map(dept => `
                                                    <label class="selection-item">
                                                        <input type="checkbox" value="${dept.id}" ${(this.config.scope?.selectedDepartments || []).includes(dept.id) ? 'checked' : ''}>
                                                        <div class="item-content">
                                                            <div class="item-name">${dept.name}</div>
                                                            <div class="item-info">${dept.manager} · ${dept.employeeCount}人 · ${dept.description}</div>
                                                        </div>
                                                    </label>
                                                `).join('')}
                                            </div>
                                        </div>
                                        
                                        <!-- 设备选择面板 -->
                                        <div class="tab-panel" id="devices-panel">
                                            <div class="selection-header">
                                                <span class="selection-title">选择设备</span>
                                                <span class="selection-count">已选择 ${(this.config.scope?.selectedDevices || []).length} 台</span>
                                            </div>
                                            <div class="selection-list">
                                                ${this.devices.map(dev => `
                                                    <label class="selection-item">
                                                        <input type="checkbox" value="${dev.id}" ${(this.config.scope?.selectedDevices || []).includes(dev.id) ? 'checked' : ''}>
                                                        <div class="item-content">
                                                            <div class="item-name">${dev.name}</div>
                                                            <div class="item-info">${dev.type} · ${dev.location}</div>
                                                        </div>
                                                    </label>
                                                `).join('')}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>

                    <!-- 操作按钮 -->
                    <div class="action-bar">
                        <div class="action-content">
                            <button class="btn-secondary" id="btnReset">重置</button>
                            <button class="btn-primary" id="btnSave">保存配置</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    // 数字水印页面样式
    styles: `
        .digital-watermark-page {
            background: #f8fafc;
            min-height: 100vh;
            padding: 0;
        }

        /* 页面头部 */
        .digital-watermark-page .page-header {
            background: white;
            padding: 20px 0;
            margin-bottom: 20px;
            border-bottom: 1px solid #e8e8e8;
        }

        .digital-watermark-page .header-content {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }

        .digital-watermark-page .page-title {
            color: #333;
            font-size: 24px;
            font-weight: 600;
            margin: 0 0 8px 0;
        }

        .digital-watermark-page .page-desc {
            color: #666;
            font-size: 14px;
            margin: 0;
        }

        /* 主要内容区域 */
        .digital-watermark-page .main-content {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px 20px;
            display: flex;
            flex-direction: column;
            gap: 16px;
        }

        /* 配置卡片 */
        .digital-watermark-page .config-card {
            background: white;
            border-radius: 4px;
            margin-bottom: 16px;
            border: 1px solid #e8e8e8;
        }

        .digital-watermark-page .card-header {
            padding: 16px 24px;
            border-bottom: 1px solid #f0f0f0;
        }

        .digital-watermark-page .card-title {
            font-size: 16px;
            font-weight: 500;
            color: #333;
            margin: 0;
        }

        .digital-watermark-page .card-body {
            padding: 24px;
        }

        /* 开关控制 */
        .digital-watermark-page .switch-container {
            display: flex;
            align-items: center;
            gap: 20px;
        }

        .digital-watermark-page .modern-switch {
            position: relative;
            display: inline-block;
            width: 56px;
            height: 32px;
            flex-shrink: 0;
        }

        .digital-watermark-page .modern-switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }

        .digital-watermark-page .switch-slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #cbd5e1;
            transition: 0.3s ease;
            border-radius: 32px;
            box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .digital-watermark-page .switch-slider:before {
            position: absolute;
            content: "";
            height: 24px;
            width: 24px;
            left: 4px;
            bottom: 4px;
            background-color: white;
            transition: 0.3s ease;
            border-radius: 50%;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }

        .digital-watermark-page input:checked + .switch-slider {
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
        }

        .digital-watermark-page input:checked + .switch-slider:before {
            transform: translateX(24px);
        }

        .digital-watermark-page .switch-info {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }

        .digital-watermark-page .switch-label {
            font-size: 16px;
            font-weight: 600;
            color: #1e293b;
        }

        .digital-watermark-page .switch-desc {
            font-size: 14px;
            color: #64748b;
            line-height: 1.5;
        }

        /* 配置区域 */
        .digital-watermark-page .config-section {
            margin-bottom: 40px;
        }

        .digital-watermark-page .config-section:last-child {
            margin-bottom: 0;
        }

        .digital-watermark-page .section-header {
            margin-bottom: 24px;
        }

        .digital-watermark-page .section-title {
            font-size: 18px;
            font-weight: 600;
            color: #1e293b;
            margin: 0 0 8px 0;
        }

        .digital-watermark-page .section-title.required::after {
            content: " *";
            color: #ef4444;
        }

        .digital-watermark-page .section-desc {
            font-size: 14px;
            color: #64748b;
            line-height: 1.5;
        }

        /* 水印类型选择器 */
        .digital-watermark-page .type-selector {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 16px;
        }

        .digital-watermark-page .type-card {
            position: relative;
            cursor: pointer;
            border: 2px solid #e2e8f0;
            border-radius: 12px;
            padding: 20px;
            transition: all 0.3s ease;
            background: white;
        }

        .digital-watermark-page .type-card:hover {
            border-color: #3b82f6;
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(59, 130, 246, 0.15);
        }

        .digital-watermark-page .type-card.selected {
            border-color: #3b82f6;
            background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
            box-shadow: 0 8px 25px rgba(59, 130, 246, 0.15);
        }

        .digital-watermark-page .type-card input {
            position: absolute;
            opacity: 0;
        }

        .digital-watermark-page .type-content {
            display: flex;
            align-items: center;
            gap: 16px;
        }

        .digital-watermark-page .type-icon {
            font-size: 24px;
            width: 48px;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f1f5f9;
            border-radius: 12px;
        }

        .digital-watermark-page .type-info {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }

        .digital-watermark-page .type-name {
            font-size: 16px;
            font-weight: 600;
            color: #1e293b;
        }

        .digital-watermark-page .type-desc {
            font-size: 14px;
            color: #64748b;
        }

        /* 内容构建器 */
        .digital-watermark-page .content-builder {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }

        .digital-watermark-page .content-item {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 20px;
            transition: all 0.3s ease;
        }

        .digital-watermark-page .content-item:hover {
            border-color: #3b82f6;
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
        }

        .digital-watermark-page .item-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
        }

        .digital-watermark-page .item-label {
            font-size: 14px;
            font-weight: 600;
            color: #475569;
        }

        .digital-watermark-page .btn-remove {
            background: none;
            border: none;
            color: #ff4d4f;
            cursor: pointer;
            padding: 4px;
            border-radius: 2px;
        }

        .digital-watermark-page .btn-remove:hover {
            color: #ff7875;
        }

        .digital-watermark-page .remove-icon {
            font-size: 18px;
            font-weight: bold;
        }

        .digital-watermark-page .content-select {
            width: 100%;
            height: 32px;
            padding: 4px 11px;
            border: 1px solid #d9d9d9;
            border-radius: 4px;
            font-size: 14px;
            background: white;
        }

        .digital-watermark-page .content-select:focus {
            outline: none;
            border-color: #1890ff;
        }

        .digital-watermark-page .btn-add-content {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 16px;
            background: white;
            border: 1px solid #d9d9d9;
            border-radius: 4px;
            color: #666;
            font-size: 14px;
            cursor: pointer;
        }

        .digital-watermark-page .btn-add-content:hover {
            border-color: #1890ff;
            color: #1890ff;
        }

        .digital-watermark-page .add-icon {
            font-size: 18px;
            font-weight: bold;
        }

        /* 样式网格 */
        .digital-watermark-page .style-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 24px;
        }

        .digital-watermark-page .style-item {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .digital-watermark-page .style-label {
            font-size: 14px;
            font-weight: 600;
            color: #475569;
        }

        .digital-watermark-page .color-picker {
            display: flex;
            align-items: center;
            height: 40px;
        }

        .digital-watermark-page .color-input {
            width: 50px;
            height: 32px;
            padding: 0;
            border: 1px solid #d9d9d9;
            border-radius: 4px;
            background: white;
            cursor: pointer;
        }

        .digital-watermark-page .color-input:focus {
            outline: none;
            border-color: #1890ff;
        }

        .digital-watermark-page .color-input::-webkit-color-swatch-wrapper {
            padding: 0;
        }

        .digital-watermark-page .color-input::-webkit-color-swatch {
            border: none;
            border-radius: 6px;
        }



        .digital-watermark-page .style-select {
            height: 32px;
            padding: 4px 11px;
            border: 1px solid #d9d9d9;
            border-radius: 4px;
            font-size: 14px;
            background: white;
        }

        .digital-watermark-page .style-select:focus {
            outline: none;
            border-color: #1890ff;
        }

        /* 预览区域 */
        .digital-watermark-page .preview-container {
            background: #f8fafc;
            border-radius: 12px;
            padding: 24px;
        }

        .digital-watermark-page .preview-area {
            width: 100%;
            height: 200px;
            border: 2px dashed #cbd5e1;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            background: white;
        }

        .digital-watermark-page .preview-area:hover {
            border-color: #3b82f6;
            background: #eff6ff;
        }

        .digital-watermark-page .preview-placeholder {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 12px;
            color: #64748b;
        }

        .digital-watermark-page .preview-icon {
            font-size: 32px;
        }

        .digital-watermark-page .preview-text {
            font-size: 16px;
            font-weight: 500;
        }

        .digital-watermark-page .preview-close-btn {
            position: absolute;
            top: 8px;
            right: 8px;
            width: 32px;
            height: 32px;
            border: none;
            border-radius: 50%;
            background: rgba(0, 0, 0, 0.6);
            color: white;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            z-index: 10;
        }

        .digital-watermark-page .preview-close-btn:hover {
            background: rgba(0, 0, 0, 0.8);
            transform: scale(1.1);
        }

        .digital-watermark-page .close-icon {
            font-size: 18px;
            font-weight: bold;
        }

        /* 时间选择网格 */
        .digital-watermark-page .timing-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 16px;
        }

        .digital-watermark-page .timing-option {
            position: relative;
            cursor: pointer;
            border: 2px solid #e2e8f0;
            border-radius: 12px;
            padding: 20px;
            transition: all 0.3s ease;
            background: white;
        }

        .digital-watermark-page .timing-option:hover {
            border-color: #3b82f6;
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(59, 130, 246, 0.15);
        }

        .digital-watermark-page .timing-option input:checked + .timing-content {
            border-color: #3b82f6;
            background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
            box-shadow: 0 8px 25px rgba(59, 130, 246, 0.15);
        }

        .digital-watermark-page .timing-option input {
            position: absolute;
            opacity: 0;
        }

        .digital-watermark-page .timing-content {
            display: flex;
            align-items: center;
            gap: 16px;
            padding: 16px;
            border: 2px solid transparent;
            border-radius: 8px;
            transition: all 0.3s ease;
        }

        .digital-watermark-page .timing-icon {
            font-size: 24px;
            width: 48px;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f1f5f9;
            border-radius: 12px;
        }

        .digital-watermark-page .timing-info {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }

        .digital-watermark-page .timing-name {
            font-size: 16px;
            font-weight: 600;
            color: #1e293b;
        }

        .digital-watermark-page .timing-desc {
            font-size: 14px;
            color: #64748b;
        }

        /* 范围选择 */
        .digital-watermark-page .scope-container {
            background: #f8fafc;
            border-radius: 12px;
            padding: 24px;
        }

        .digital-watermark-page .scope-header {
            margin-bottom: 20px;
        }

        .digital-watermark-page .scope-title {
            font-size: 16px;
            font-weight: 600;
            color: #475569;
        }

        .digital-watermark-page .scope-options {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }

        .digital-watermark-page .scope-option {
            position: relative;
            cursor: pointer;
            border: 2px solid #e2e8f0;
            border-radius: 12px;
            padding: 20px;
            transition: all 0.3s ease;
            background: white;
        }

        .digital-watermark-page .scope-option:hover {
            border-color: #3b82f6;
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(59, 130, 246, 0.15);
        }

        .digital-watermark-page .scope-option input:checked + .scope-content {
            border-color: #3b82f6;
            background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
            box-shadow: 0 8px 25px rgba(59, 130, 246, 0.15);
        }

        .digital-watermark-page .scope-option input {
            position: absolute;
            opacity: 0;
        }

        .digital-watermark-page .scope-content {
            display: flex;
            align-items: center;
            gap: 16px;
            padding: 16px;
            border: 2px solid transparent;
            border-radius: 8px;
            transition: all 0.3s ease;
        }

        .digital-watermark-page .scope-icon {
            font-size: 24px;
            width: 48px;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f1f5f9;
            border-radius: 12px;
        }

        .digital-watermark-page .scope-info {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }

        .digital-watermark-page .scope-name {
            font-size: 16px;
            font-weight: 600;
            color: #1e293b;
        }

        .digital-watermark-page .scope-desc {
            font-size: 14px;
            color: #64748b;
        }

        /* 指定选择样式 */
        .digital-watermark-page .specific-selection {
            margin-top: 20px;
            border: 1px solid #e8e8e8;
            border-radius: 4px;
            background: #fafafa;
        }

        .digital-watermark-page .selection-tabs {
            display: flex;
            border-bottom: 1px solid #e8e8e8;
        }

        .digital-watermark-page .tab-btn {
            flex: 1;
            padding: 12px 16px;
            background: none;
            border: none;
            cursor: pointer;
            font-size: 14px;
            color: #666;
            transition: all 0.3s ease;
        }

        .digital-watermark-page .tab-btn.active {
            background: white;
            color: #1890ff;
            border-bottom: 2px solid #1890ff;
        }

        .digital-watermark-page .tab-panel {
            display: none;
            padding: 16px;
            background: white;
        }

        .digital-watermark-page .tab-panel.active {
            display: block;
        }

        .digital-watermark-page .selection-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
            padding-bottom: 8px;
            border-bottom: 1px solid #f0f0f0;
        }

        .digital-watermark-page .selection-title {
            font-size: 14px;
            font-weight: 500;
            color: #333;
        }

        .digital-watermark-page .selection-count {
            font-size: 12px;
            color: #666;
        }

        .digital-watermark-page .selection-list {
            max-height: 300px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .digital-watermark-page .selection-item {
            display: flex;
            align-items: center;
            padding: 8px 12px;
            border: 1px solid #e8e8e8;
            border-radius: 4px;
            background: white;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .digital-watermark-page .selection-item:hover {
            border-color: #1890ff;
            background: #f6ffed;
        }

        .digital-watermark-page .selection-item input[type="checkbox"] {
            margin-right: 12px;
        }

        .digital-watermark-page .item-content {
            flex: 1;
        }

        .digital-watermark-page .item-name {
            font-size: 14px;
            font-weight: 500;
            color: #333;
            margin-bottom: 2px;
        }

        .digital-watermark-page .item-info {
            font-size: 12px;
            color: #666;
        }



        /* 操作栏 */
        .digital-watermark-page .action-bar {
            background: white;
            border-radius: 4px;
            padding: 16px 24px;
            margin-top: 24px;
            border-top: 1px solid #f0f0f0;
            text-align: right;
        }

        .digital-watermark-page .action-content {
            display: flex;
            justify-content: flex-end;
            gap: 8px;
        }

        .digital-watermark-page .btn-secondary {
            margin-right: 8px;
            padding: 8px 16px;
            border: 1px solid #d9d9d9;
            background: white;
            border-radius: 4px;
            color: #666;
            font-size: 14px;
            cursor: pointer;
        }

        .digital-watermark-page .btn-secondary:hover {
            border-color: #1890ff;
            color: #1890ff;
        }

        .digital-watermark-page .btn-primary {
            padding: 8px 16px;
            background: #1890ff;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 14px;
            cursor: pointer;
        }

        .digital-watermark-page .btn-primary:hover {
            background: #40a9ff;
        }

        /* 响应式设计 */
        @media (max-width: 768px) {
            .digital-watermark-page .main-content {
                padding: 0 16px 24px;
            }
            
            .digital-watermark-page .card-body {
                padding: 24px 20px;
            }
            
            .digital-watermark-page .type-selector,
            .digital-watermark-page .timing-grid {
                grid-template-columns: 1fr;
            }
            
            .digital-watermark-page .style-grid {
                grid-template-columns: 1fr;
            }
            
            .digital-watermark-page .action-content {
                flex-direction: column;
            }
        }
    `,

    // 初始化页面
    init: function() {
        this.ensureStyles();
        this.loadConfig();
        // 确保配置对象完整
        this.ensureConfigIntegrity();
        this.bindEvents();
    },

    // 确保配置对象完整性
    ensureConfigIntegrity: function() {
        // 确保scope对象存在
        if (!this.config.scope) {
            this.config.scope = {
                type: 'all',
                selectedDepartments: [],
                selectedDevices: []
            };
        }
        
        // 确保selectedDepartments数组存在
        if (!Array.isArray(this.config.scope.selectedDepartments)) {
            this.config.scope.selectedDepartments = [];
        }
        
        // 确保selectedDevices数组存在
        if (!Array.isArray(this.config.scope.selectedDevices)) {
            this.config.scope.selectedDevices = [];
        }
        
        // 确保其他必要的配置项存在
        if (!this.config.content) {
            this.config.content = [
                { type: 'name', label: '姓名' },
                { type: 'time', label: '时间' }
            ];
        }
        
        if (!this.config.style) {
            this.config.style = {
                color: '#000000',
                opacity: '20%',
                fontSize: '28px',
                rotation: '45°',
                rowSpacing: '100px',
                columnSpacing: '100px'
            };
        }
        
        if (!this.config.timing) {
            this.config.timing = {
                upload: true,
                download: false,
                external: false
            };
        }
    },

    // 确保样式只添加一次
    ensureStyles: function() {
        if (!document.getElementById('digital-watermark-styles')) {
            const styleElement = document.createElement('style');
            styleElement.id = 'digital-watermark-styles';
            styleElement.textContent = this.styles;
            document.head.appendChild(styleElement);
        }
    },

    // 加载配置
    loadConfig: function() {
        const savedConfig = localStorage.getItem('digitalWatermarkConfig');
        if (savedConfig) {
            try {
                const parsedConfig = JSON.parse(savedConfig);
                // 使用深度合并确保所有嵌套属性都被正确保留
                this.config = this.deepMerge(this.config, parsedConfig);
            } catch (e) {
                console.error('加载水印配置失败:', e);
            }
        }
    },

    // 深度合并函数
    deepMerge: function(target, source) {
        const result = { ...target };
        for (const key in source) {
            if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                result[key] = this.deepMerge(target[key] || {}, source[key]);
            } else {
                result[key] = source[key];
            }
        }
        return result;
    },

    // 保存配置
    saveConfig: function() {
        try {
            localStorage.setItem('digitalWatermarkConfig', JSON.stringify(this.config));
            return true;
        } catch (e) {
            console.error('保存水印配置失败:', e);
            return false;
        }
    },

    // 绑定事件
    bindEvents: function() {
        // 检查是否已经绑定过事件，避免重复绑定
        if (this.eventsBound) {
            return;
        }
        // 绑定水印开关事件
        const watermarkEnabled = document.getElementById('watermarkEnabled');
        if (watermarkEnabled) {
            watermarkEnabled.addEventListener('change', (e) => {
                this.config.enabled = e.target.checked;
            });
        }

        // 绑定水印类型选择事件
        const typeCards = document.querySelectorAll('.type-card');
        typeCards.forEach(card => {
            card.addEventListener('click', () => {
                // 移除其他选项的选中状态
                typeCards.forEach(c => c.classList.remove('selected'));
                // 添加当前选项的选中状态
                card.classList.add('selected');
                // 选中对应的radio
                const radio = card.querySelector('input[type="radio"]');
                if (radio) {
                    radio.checked = true;
                    this.config.type = radio.value;
                }
            });
        });

        // 绑定内容选择事件
        document.addEventListener('change', (e) => {
            if (e.target.classList.contains('content-select')) {
                const index = parseInt(e.target.dataset.index);
                const selectedOption = this.contentOptions.find(option => option.value === e.target.value);
                if (selectedOption && this.config.content[index]) {
                    this.config.content[index].type = e.target.value;
                    this.config.content[index].label = selectedOption.label;
                }
            }
        });

        // 绑定内容删除按钮事件
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-remove') || e.target.closest('.btn-remove')) {
                e.preventDefault();
                const button = e.target.classList.contains('btn-remove') ? e.target : e.target.closest('.btn-remove');
                const index = parseInt(button.dataset.index);
                if (this.config.content.length > 1) {
                    this.config.content.splice(index, 1);
                    this.renderContentSettings();
                }
            }
        });

        // 绑定添加内容按钮事件
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-add-content') || e.target.closest('.btn-add-content')) {
                e.preventDefault();
                const button = e.target.classList.contains('btn-add-content') ? e.target : e.target.closest('.btn-add-content');
                this.addContentRow(button);
            }
        });



        // 绑定样式设置事件
        const opacitySelect = document.getElementById('opacitySelect');
        if (opacitySelect) {
            opacitySelect.addEventListener('change', (e) => {
                this.config.style.opacity = e.target.value;
            });
        }

        const fontSizeSelect = document.getElementById('fontSizeSelect');
        if (fontSizeSelect) {
            fontSizeSelect.addEventListener('change', (e) => {
                this.config.style.fontSize = e.target.value;
            });
        }

        const rotationSelect = document.getElementById('rotationSelect');
        if (rotationSelect) {
            rotationSelect.addEventListener('change', (e) => {
                this.config.style.rotation = e.target.value;
            });
        }

        const rowSpacingSelect = document.getElementById('rowSpacingSelect');
        if (rowSpacingSelect) {
            rowSpacingSelect.addEventListener('change', (e) => {
                this.config.style.rowSpacing = e.target.value;
            });
        }

        const columnSpacingSelect = document.getElementById('columnSpacingSelect');
        if (columnSpacingSelect) {
            columnSpacingSelect.addEventListener('change', (e) => {
                this.config.style.columnSpacing = e.target.value;
            });
        }

        // 绑定颜色选择器事件
        const colorInputs = document.querySelectorAll('.color-input');
        colorInputs.forEach(input => {
            input.addEventListener('change', (e) => {
                this.config.style.color = e.target.value;
            });
        });

        // 绑定生效时间事件
        const uploadTiming = document.getElementById('uploadTiming');
        if (uploadTiming) {
            uploadTiming.addEventListener('change', (e) => {
                this.config.timing.upload = e.target.checked;
            });
        }

        const downloadTiming = document.getElementById('downloadTiming');
        if (downloadTiming) {
            downloadTiming.addEventListener('change', (e) => {
                this.config.timing.download = e.target.checked;
            });
        }

        const externalTiming = document.getElementById('externalTiming');
        if (externalTiming) {
            externalTiming.addEventListener('change', (e) => {
                this.config.timing.external = e.target.checked;
            });
        }

        // 绑定生效范围事件
        document.addEventListener('change', (e) => {
            if (e.target.name === 'scopeType') {
                this.config.scope.type = e.target.value;
                this.toggleSpecificSelection();
            }
        });

        // 绑定标签页切换事件
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('tab-btn')) {
                this.switchTab(e.target);
            }
        });

        // 绑定部门和设备选择事件
        document.addEventListener('change', (e) => {
            if (e.target.closest('.selection-item')) {
                this.updateSelectionCount();
            }
        });

        // 绑定预览区域点击事件
        const previewArea = document.querySelector('.preview-area');
        if (previewArea) {
            previewArea.addEventListener('click', (e) => {
                // 如果点击的是关闭按钮，不触发预览
                if (e.target.closest('.preview-close-btn')) {
                    return;
                }
                this.togglePreview();
            });
        }

        // 绑定预览关闭按钮事件
        const previewCloseBtn = document.querySelector('.preview-close-btn');
        if (previewCloseBtn) {
            previewCloseBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.hidePreview();
            });
        }

        // 绑定保存按钮事件
        const saveButton = document.getElementById('btnSave');
        if (saveButton) {
            saveButton.addEventListener('click', () => {
                this.saveWatermarkConfig();
            });
        }

        // 绑定重置按钮事件
        const resetButton = document.getElementById('btnReset');
        if (resetButton) {
            resetButton.addEventListener('click', () => {
                this.resetForm();
            });
        }
        
        // 标记事件已绑定
        this.eventsBound = true;
    },

    // 重新渲染内容设置
    renderContentSettings: function() {
        const contentBuilder = document.querySelector('.content-builder');
        if (contentBuilder) {
            contentBuilder.innerHTML = this.config.content.map((item, index) => `
                <div class="content-item" data-index="${index}">
                    <div class="item-header">
                        <span class="item-label">第${index + 1}行内容</span>
                        <button class="btn-remove" data-index="${index}">
                            <span class="remove-icon">×</span>
                        </button>
                    </div>
                    <div class="item-content">
                        <select class="content-select" data-index="${index}">
                            ${this.contentOptions.map(option => 
                                `<option value="${option.value}" ${item.type === option.value ? 'selected' : ''}>${option.label}</option>`
                            ).join('')}
                        </select>
                    </div>
                </div>
            `).join('') + `
                <button class="btn-add-content">
                    <span class="add-icon">+</span>
                    <span>添加内容行</span>
                </button>
            `;
        }
    },

    // 添加内容行
    addContentRow: function(button) {
        const contentBuilder = button.closest('.content-builder');
        if (contentBuilder) {
            const newContent = { type: 'name', label: '姓名' };
            this.config.content.push(newContent);
            this.renderContentSettings();
        }
    },

    // 切换预览
    togglePreview: function() {
        if (this.previewState.isActive) {
            this.hidePreview();
        } else {
            this.showPreview();
        }
    },

    // 显示预览
    showPreview: function() {
        console.log('显示水印预览');
        this.previewState.isActive = true;
        
        // 生成预览内容
        const previewText = this.config.content.map(item => item.label).join(' ');
        const previewArea = document.querySelector('.preview-area');
        const closeBtn = document.querySelector('.preview-close-btn');
        
        if (previewArea) {
            const opacity = parseInt(this.config.style.opacity) / 100;
            const rotation = parseInt(this.config.style.rotation);
            previewArea.innerHTML = `
                <div style="
                    color: ${this.config.style.color};
                    opacity: ${opacity};
                    font-size: ${this.config.style.fontSize};
                    transform: rotate(${rotation}deg);
                    text-align: center;
                    line-height: ${this.config.style.rowSpacing};
                    letter-spacing: ${this.config.style.columnSpacing};
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: repeating-linear-gradient(
                        45deg,
                        transparent,
                        transparent 20px,
                        rgba(0,0,0,0.02) 20px,
                        rgba(0,0,0,0.02) 40px
                    );
                ">
                    ${previewText}
                </div>
                <button class="preview-close-btn">
                    <span class="close-icon">×</span>
                </button>
            `;
            
            // 重新绑定关闭按钮事件
            const newCloseBtn = previewArea.querySelector('.preview-close-btn');
            if (newCloseBtn) {
                newCloseBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.hidePreview();
                });
            }
        }
    },

    // 隐藏预览
    hidePreview: function() {
        console.log('隐藏水印预览');
        this.previewState.isActive = false;
        
        const previewArea = document.querySelector('.preview-area');
        if (previewArea) {
            previewArea.innerHTML = `
                <div class="preview-placeholder">
                    <span class="preview-icon">👁️</span>
                    <span class="preview-text">点击预览水印效果</span>
                </div>
                <button class="preview-close-btn" style="display: none;">
                    <span class="close-icon">×</span>
                </button>
            `;
        }
    },

    // 保存水印配置
    saveWatermarkConfig: function() {
        if (this.saveConfig()) {
            this.showMessage('配置保存成功');
        } else {
            this.showMessage('配置保存失败');
        }
    },

    // 重置表单
    resetForm: function() {
        console.log('重置表单');
        
        // 重置为默认配置
        this.config = {
            enabled: true,
            type: 'visible',
            content: [
                { type: 'name', label: '姓名' },
                { type: 'time', label: '时间' }
            ],
            style: {
                color: '#000000',
                opacity: '20%',
                fontSize: '28px',
                rotation: '45°',
                rowSpacing: '100px',
                columnSpacing: '100px'
            },
            timing: {
                upload: true,
                download: false,
                external: false
            },
            scope: {
                type: 'all',
                selectedDepartments: [],
                selectedDevices: []
            }
        };
        
        // 重置预览状态
        this.previewState.isActive = false;
        
        // 更新页面上的表单元素
        this.updateFormElements();
        
        // 隐藏预览
        this.hidePreview();
        
        // 显示重置成功消息
        this.showMessage('配置已重置为默认值');
    },

    // 更新表单元素
    updateFormElements: function() {
        // 更新功能开关
        const watermarkEnabled = document.getElementById('watermarkEnabled');
        if (watermarkEnabled) {
            watermarkEnabled.checked = this.config.enabled;
        }
        
        // 更新水印类型
        const watermarkTypeInputs = document.querySelectorAll('input[name="watermarkType"]');
        watermarkTypeInputs.forEach(input => {
            input.checked = input.value === this.config.type;
        });
        
        // 更新类型卡片的选中状态
        const typeCards = document.querySelectorAll('.type-card');
        typeCards.forEach(card => {
            card.classList.remove('selected');
            if (card.querySelector('input').value === this.config.type) {
                card.classList.add('selected');
            }
        });
        
        // 更新内容设置
        this.renderContentSettings();
        
        // 更新样式设置
        const colorInput = document.querySelector('.color-input');
        if (colorInput) {
            colorInput.value = this.config.style.color;
        }
        
        const opacitySelect = document.getElementById('opacitySelect');
        if (opacitySelect) {
            opacitySelect.value = this.config.style.opacity;
        }
        
        const fontSizeSelect = document.getElementById('fontSizeSelect');
        if (fontSizeSelect) {
            fontSizeSelect.value = this.config.style.fontSize;
        }
        
        const rotationSelect = document.getElementById('rotationSelect');
        if (rotationSelect) {
            rotationSelect.value = this.config.style.rotation;
        }
        
        const rowSpacingSelect = document.getElementById('rowSpacingSelect');
        if (rowSpacingSelect) {
            rowSpacingSelect.value = this.config.style.rowSpacing;
        }
        
        const columnSpacingSelect = document.getElementById('columnSpacingSelect');
        if (columnSpacingSelect) {
            columnSpacingSelect.value = this.config.style.columnSpacing;
        }
        
        // 更新生效时间
        const uploadTiming = document.getElementById('uploadTiming');
        if (uploadTiming) {
            uploadTiming.checked = this.config.timing.upload;
        }
        
        const downloadTiming = document.getElementById('downloadTiming');
        if (downloadTiming) {
            downloadTiming.checked = this.config.timing.download;
        }
        
        const externalTiming = document.getElementById('externalTiming');
        if (externalTiming) {
            externalTiming.checked = this.config.timing.external;
        }
        
        // 更新生效范围
        const scopeTypeInputs = document.querySelectorAll('input[name="scopeType"]');
        scopeTypeInputs.forEach(input => {
            input.checked = input.value === this.config.scope.type;
        });
        
        // 更新范围选项的选中状态
        const scopeOptions = document.querySelectorAll('.scope-option');
        scopeOptions.forEach(option => {
            option.classList.remove('selected');
            if (option.querySelector('input').value === this.config.scope.type) {
                option.classList.add('selected');
            }
        });
        
        // 更新指定选择显示状态
        this.toggleSpecificSelection();
    },

    // 切换指定选择显示状态
    toggleSpecificSelection: function() {
        const specificSelection = document.querySelector('.specific-selection');
        if (specificSelection) {
            specificSelection.style.display = this.config.scope.type === 'specific' ? 'block' : 'none';
        }
    },

    // 切换标签页
    switchTab: function(clickedTab) {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabPanels = document.querySelectorAll('.tab-panel');
        
        // 移除所有活动状态
        tabBtns.forEach(btn => btn.classList.remove('active'));
        tabPanels.forEach(panel => panel.classList.remove('active'));
        
        // 添加当前活动状态
        clickedTab.classList.add('active');
        const targetPanel = document.getElementById(clickedTab.dataset.tab + '-panel');
        if (targetPanel) {
            targetPanel.classList.add('active');
        }
    },

    // 更新选择计数
    updateSelectionCount: function() {
        // 更新部门选择计数
        const departmentCheckboxes = document.querySelectorAll('#departments-panel input[type="checkbox"]');
        const selectedDepartments = Array.from(departmentCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);
        this.config.scope.selectedDepartments = selectedDepartments;
        
        const departmentCount = document.querySelector('#departments-panel .selection-count');
        if (departmentCount) {
            departmentCount.textContent = `已选择 ${selectedDepartments.length} 个部门`;
        }
        
        // 更新设备选择计数
        const deviceCheckboxes = document.querySelectorAll('#devices-panel input[type="checkbox"]');
        const selectedDevices = Array.from(deviceCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);
        this.config.scope.selectedDevices = selectedDevices;
        
        const deviceCount = document.querySelector('#devices-panel .selection-count');
        if (deviceCount) {
            deviceCount.textContent = `已选择 ${selectedDevices.length} 台`;
        }
    },

    // 显示消息
    showMessage: function(msg) {
        let tip = document.getElementById('watermark-tip');
        if (!tip) {
            tip = document.createElement('div');
            tip.id = 'watermark-tip';
            tip.style.cssText = 'position:fixed;top:32px;right:32px;z-index:99999;background:rgba(0,0,0,0.75);color:#fff;padding:10px 24px;border-radius:4px;font-size:16px;box-shadow:0 2px 8px rgba(0,0,0,0.15);transition:all .3s;opacity:0;pointer-events:none;';
            document.body.appendChild(tip);
        }
        tip.textContent = msg;
        tip.style.opacity = '1';
        setTimeout(() => { tip.style.opacity = '0'; }, 1800);
    }
}; 
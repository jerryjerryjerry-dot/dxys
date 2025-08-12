// 数字水印页面模块 V2 - 完整的数据持久化和无闪屏更新系统
window.digitalWatermarkV2 = {
  id: 'digitalWatermark',
  title: '数字水印',

  // 初始化状态
  initialized: false,

  // 状态管理
  state: {
    // 当前配置
    currentConfig: null,

    // 预览状态  
    preview: {
      isActive: false,
      renderedContent: null
    },

    // 部门设备数据
    departments: [],
    devices: [],

    // 选择状态
    selection: {
      departments: new Set(),
      devices: new Set()
    },

    // 标签页状态
    activeTab: 'departments', // departments | devices

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
    ]
  },

  // ===== 初始化 =====
  async init() {
    if (this.initialized) return;

    try {
      console.log('🚀 初始化digitalWatermarkV2...');

      // 等待数据管理器初始化
      if (!window.AppDataManagerV2 || !AppDataManagerV2.initialized) {
        console.log('等待AppDataManagerV2初始化...');
        await this.waitForDataManager();
      }

      // 注册数据更新监听
      this.registerDataListeners();

      // 注入样式（保持与原版完全一致）
      this.injectStyles();

      // 绑定事件
      this.bindEvents();

      // 加载数据
      await this.loadData();

      this.initialized = true;
      console.log('✅ digitalWatermarkV2初始化完成');

      // 初始渲染 - 稍微延迟确保DOM就绪
      setTimeout(() => this.initialRender(), 300);

    } catch (error) {
      console.error('❌ digitalWatermarkV2初始化失败:', error);
      throw error;
    }
  },

  // 等待数据管理器初始化
  async waitForDataManager() {
    let attempts = 0;
    const maxAttempts = 100; // 最多等待10秒

    return new Promise((resolve, reject) => {
      const check = () => {
        if (window.AppDataManagerV2 && AppDataManagerV2.initialized) {
          resolve();
        } else if (attempts < maxAttempts) {
          attempts++;
          setTimeout(check, 100);
        } else {
          reject(new Error('AppDataManagerV2初始化超时'));
        }
      };
      check();
    });
  },

  // 注册数据更新监听
  registerDataListeners() {
    // 监听水印配置数据变化
    AppDataManagerV2.onUpdate('watermarkConfigs', (event) => {
      console.log('水印配置数据更新:', event);
      this.handleDataUpdate('watermarkConfigs', event);
    });

    // 监听部门数据变化
    AppDataManagerV2.onUpdate('departments', (event) => {
      console.log('部门数据更新:', event);
      this.handleDataUpdate('departments', event);
    });

    // 监听设备数据变化
    AppDataManagerV2.onUpdate('devices', (event) => {
      console.log('设备数据更新:', event);
      this.handleDataUpdate('devices', event);
    });
  },

  // 处理数据更新
  async handleDataUpdate(type, event) {
    try {
      switch (type) {
        case 'watermarkConfigs':
          await this.loadWatermarkConfig();
          this.updateConfigDisplay();
          break;
        case 'departments':
          await this.loadDepartments();
          this.updateDepartmentSelection();
          break;
        case 'devices':
          await this.loadDevices();
          this.updateDeviceSelection();
          break;
      }
    } catch (error) {
      console.error('❌ 处理数据更新失败:', error);
    }
  },

  // 初始渲染
  async initialRender() {
    try {
      // 等待一下确保DOM完全加载
      await new Promise(resolve => setTimeout(resolve, 200));

      // 更新配置显示
      this.updateConfigDisplay();

      console.log('✅ 数字水印初始渲染完成');
    } catch (error) {
      console.error('❌ 数字水印初始渲染失败:', error);
    }
  },

  // 加载数据
  async loadData() {
    try {
      // 并行加载所有数据
      await Promise.all([
        this.loadWatermarkConfig(),
        this.loadDepartments(),
        this.loadDevices()
      ]);

      console.log('✅ 数据加载完成');
    } catch (error) {
      console.error('❌ 数据加载失败:', error);
      throw error;
    }
  },

  // 加载水印配置
  async loadWatermarkConfig() {
    try {
      const config = await AppDataManagerV2.watermarkConfigs.getDefaultConfig();
      if (config) {
        this.state.currentConfig = config;
      } else {
        // 创建默认配置
        this.state.currentConfig = {
          id: null,
          name: '默认水印配置',
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
      }
    } catch (error) {
      console.error('❌ 加载水印配置失败:', error);
      throw error;
    }
  },

  // 加载部门数据
  async loadDepartments() {
    try {
      const departments = await AppDataManagerV2.departments.getAll();
      this.state.departments = departments || [];
    } catch (error) {
      console.error('❌ 加载部门数据失败:', error);
      this.state.departments = [];
    }
  },

  // 加载设备数据
  async loadDevices() {
    try {
      const devices = await AppDataManagerV2.devices.getAll();
      this.state.devices = devices || [];
    } catch (error) {
      console.error('❌ 加载设备数据失败:', error);
      this.state.devices = [];
    }
  },

  // ===== 页面内容模板（保持与原版完全一致的HTML结构） =====
  content() {
    if (!this.state.currentConfig) {
      return '<div class="loading">数据加载中...</div>';
    }

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
                                    <input type="checkbox" id="watermarkEnabled" ${this.state.currentConfig.enabled ? 'checked' : ''}>
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
                                    <label class="type-card ${this.state.currentConfig.type === 'visible' ? 'selected' : ''}">
                                        <input type="radio" name="watermarkType" value="visible" ${this.state.currentConfig.type === 'visible' ? 'checked' : ''}>
                                        <div class="type-content">
                                            <div class="type-icon">👁️</div>
                                            <div class="type-info">
                                                <span class="type-name">明水印</span>
                                                <span class="type-desc">可见的水印标识</span>
                                            </div>
                                        </div>
                                    </label>
                                    <label class="type-card ${this.state.currentConfig.type === 'invisible' ? 'selected' : ''}">
                                        <input type="radio" name="watermarkType" value="invisible" ${this.state.currentConfig.type === 'invisible' ? 'checked' : ''}>
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
                                <div class="content-builder" id="contentBuilder">
                                    ${this.renderContentRows()}
                                    <button class="btn-add-content" data-action="add-content">
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
                                    ${this.renderStyleControls()}
                                </div>
                            </div>

                            <!-- 水印预览 -->
                            <div class="config-section">
                                <div class="section-header">
                                    <h4 class="section-title">水印预览</h4>
                                    <span class="section-desc">实时预览水印效果</span>
                                </div>
                                <div class="preview-container">
                                    <div class="preview-area" id="previewArea" data-action="toggle-preview">
                                        ${this.renderPreviewContent()}
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
                                    ${this.renderTimingOptions()}
                                </div>
                            </div>

                            <!-- 生效范围 -->
                            <div class="config-section">
                                <div class="section-header">
                                    <h4 class="section-title">生效范围</h4>
                                    <span class="section-desc">设置水印的适用范围</span>
                                </div>
                                <div class="scope-container">
                                    ${this.renderScopeOptions()}
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 操作按钮 -->
                    <div class="action-bar">
                        <div class="action-content">
                            <button class="btn-secondary" data-action="reset">重置</button>
                            <button class="btn-primary" data-action="save">保存配置</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
  },

  // ===== 渲染子组件方法 =====
  renderContentRows() {
    if (!this.state.currentConfig || !this.state.currentConfig.content) {
      return '';
    }

    return this.state.currentConfig.content.map((item, index) => `
            <div class="content-item" data-index="${index}">
                <div class="item-header">
                    <span class="item-label">第${index + 1}行内容</span>
                    <button class="btn-remove" data-action="remove-content" data-index="${index}">
                        <span class="remove-icon">×</span>
                    </button>
                </div>
                <div class="item-content">
                    <select class="content-select" data-index="${index}" data-action="change-content-type">
                        ${this.state.contentOptions.map(option =>
      `<option value="${option.value}" ${item.type === option.value ? 'selected' : ''}>${option.label}</option>`
    ).join('')}
                    </select>
                </div>
            </div>
        `).join('');
  },

  renderStyleControls() {
    if (!this.state.currentConfig || !this.state.currentConfig.style) {
      return '';
    }

    const style = this.state.currentConfig.style;

    return `
            <div class="style-item">
                <label class="style-label">字体颜色</label>
                <div class="color-picker">
                    <input type="color" value="${style.color}" class="color-input" data-action="change-style" data-field="color">
                </div>
            </div>
            <div class="style-item">
                <label class="style-label">透明度</label>
                <select class="style-select" data-action="change-style" data-field="opacity">
                    <option value="5%" ${style.opacity === '5%' ? 'selected' : ''}>5%</option>
                    <option value="10%" ${style.opacity === '10%' ? 'selected' : ''}>10%</option>
                    <option value="15%" ${style.opacity === '15%' ? 'selected' : ''}>15%</option>
                    <option value="20%" ${style.opacity === '20%' ? 'selected' : ''}>20%</option>
                    <option value="25%" ${style.opacity === '25%' ? 'selected' : ''}>25%</option>
                    <option value="30%" ${style.opacity === '30%' ? 'selected' : ''}>30%</option>
                    <option value="35%" ${style.opacity === '35%' ? 'selected' : ''}>35%</option>
                    <option value="40%" ${style.opacity === '40%' ? 'selected' : ''}>40%</option>
                    <option value="45%" ${style.opacity === '45%' ? 'selected' : ''}>45%</option>
                    <option value="50%" ${style.opacity === '50%' ? 'selected' : ''}>50%</option>
                </select>
            </div>
            <div class="style-item">
                <label class="style-label">字号</label>
                <select class="style-select" data-action="change-style" data-field="fontSize">
                    <option value="12px" ${style.fontSize === '12px' ? 'selected' : ''}>12px</option>
                    <option value="14px" ${style.fontSize === '14px' ? 'selected' : ''}>14px</option>
                    <option value="16px" ${style.fontSize === '16px' ? 'selected' : ''}>16px</option>
                    <option value="18px" ${style.fontSize === '18px' ? 'selected' : ''}>18px</option>
                    <option value="20px" ${style.fontSize === '20px' ? 'selected' : ''}>20px</option>
                    <option value="24px" ${style.fontSize === '24px' ? 'selected' : ''}>24px</option>
                    <option value="28px" ${style.fontSize === '28px' ? 'selected' : ''}>28px</option>
                    <option value="32px" ${style.fontSize === '32px' ? 'selected' : ''}>32px</option>
                    <option value="36px" ${style.fontSize === '36px' ? 'selected' : ''}>36px</option>
                    <option value="40px" ${style.fontSize === '40px' ? 'selected' : ''}>40px</option>
                    <option value="48px" ${style.fontSize === '48px' ? 'selected' : ''}>48px</option>
                    <option value="56px" ${style.fontSize === '56px' ? 'selected' : ''}>56px</option>
                    <option value="64px" ${style.fontSize === '64px' ? 'selected' : ''}>64px</option>
                </select>
            </div>
            <div class="style-item">
                <label class="style-label">旋转角度</label>
                <select class="style-select" data-action="change-style" data-field="rotation">
                    <option value="0°" ${style.rotation === '0°' ? 'selected' : ''}>0° (水平)</option>
                    <option value="15°" ${style.rotation === '15°' ? 'selected' : ''}>15°</option>
                    <option value="30°" ${style.rotation === '30°' ? 'selected' : ''}>30°</option>
                    <option value="45°" ${style.rotation === '45°' ? 'selected' : ''}>45°</option>
                    <option value="60°" ${style.rotation === '60°' ? 'selected' : ''}>60°</option>
                    <option value="75°" ${style.rotation === '75°' ? 'selected' : ''}>75°</option>
                    <option value="90°" ${style.rotation === '90°' ? 'selected' : ''}>90° (垂直)</option>
                    <option value="105°" ${style.rotation === '105°' ? 'selected' : ''}>105°</option>
                    <option value="120°" ${style.rotation === '120°' ? 'selected' : ''}>120°</option>
                    <option value="135°" ${style.rotation === '135°' ? 'selected' : ''}>135°</option>
                    <option value="150°" ${style.rotation === '150°' ? 'selected' : ''}>150°</option>
                    <option value="165°" ${style.rotation === '165°' ? 'selected' : ''}>165°</option>
                    <option value="180°" ${style.rotation === '180°' ? 'selected' : ''}>180° (倒置)</option>
                </select>
            </div>
            <div class="style-item">
                <label class="style-label">行间距</label>
                <select class="style-select" data-action="change-style" data-field="rowSpacing">
                    <option value="40px" ${style.rowSpacing === '40px' ? 'selected' : ''}>40px</option>
                    <option value="50px" ${style.rowSpacing === '50px' ? 'selected' : ''}>50px</option>
                    <option value="60px" ${style.rowSpacing === '60px' ? 'selected' : ''}>60px</option>
                    <option value="70px" ${style.rowSpacing === '70px' ? 'selected' : ''}>70px</option>
                    <option value="80px" ${style.rowSpacing === '80px' ? 'selected' : ''}>80px</option>
                    <option value="90px" ${style.rowSpacing === '90px' ? 'selected' : ''}>90px</option>
                    <option value="100px" ${style.rowSpacing === '100px' ? 'selected' : ''}>100px</option>
                    <option value="120px" ${style.rowSpacing === '120px' ? 'selected' : ''}>120px</option>
                    <option value="140px" ${style.rowSpacing === '140px' ? 'selected' : ''}>140px</option>
                    <option value="160px" ${style.rowSpacing === '160px' ? 'selected' : ''}>160px</option>
                    <option value="180px" ${style.rowSpacing === '180px' ? 'selected' : ''}>180px</option>
                    <option value="200px" ${style.rowSpacing === '200px' ? 'selected' : ''}>200px</option>
                </select>
            </div>
            <div class="style-item">
                <label class="style-label">列间距</label>
                <select class="style-select" data-action="change-style" data-field="columnSpacing">
                    <option value="40px" ${style.columnSpacing === '40px' ? 'selected' : ''}>40px</option>
                    <option value="50px" ${style.columnSpacing === '50px' ? 'selected' : ''}>50px</option>
                    <option value="60px" ${style.columnSpacing === '60px' ? 'selected' : ''}>60px</option>
                    <option value="70px" ${style.columnSpacing === '70px' ? 'selected' : ''}>70px</option>
                    <option value="80px" ${style.columnSpacing === '80px' ? 'selected' : ''}>80px</option>
                    <option value="90px" ${style.columnSpacing === '90px' ? 'selected' : ''}>90px</option>
                    <option value="100px" ${style.columnSpacing === '100px' ? 'selected' : ''}>100px</option>
                    <option value="120px" ${style.columnSpacing === '120px' ? 'selected' : ''}>120px</option>
                    <option value="140px" ${style.columnSpacing === '140px' ? 'selected' : ''}>140px</option>
                    <option value="160px" ${style.columnSpacing === '160px' ? 'selected' : ''}>160px</option>
                    <option value="180px" ${style.columnSpacing === '180px' ? 'selected' : ''}>180px</option>
                    <option value="200px" ${style.columnSpacing === '200px' ? 'selected' : ''}>200px</option>
                </select>
            </div>
        `;
  },

  renderPreviewContent() {
    if (this.state.preview.isActive) {
      const previewText = this.state.currentConfig.content.map(item => item.label).join(' ');
      const style = this.state.currentConfig.style;
      const opacity = parseInt(style.opacity) / 100;
      const rotation = parseInt(style.rotation);

      return `
                <div style="
                    color: ${style.color};
                    opacity: ${opacity};
                    font-size: ${style.fontSize};
                    transform: rotate(${rotation}deg);
                    text-align: center;
                    line-height: ${style.rowSpacing};
                    letter-spacing: ${style.columnSpacing};
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
                <button class="preview-close-btn" data-action="hide-preview">
                    <span class="close-icon">×</span>
                </button>
            `;
    } else {
      return `
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

  renderTimingOptions() {
    if (!this.state.currentConfig || !this.state.currentConfig.timing) {
      return '';
    }

    const timing = this.state.currentConfig.timing;

    return `
            <label class="timing-option">
                <input type="checkbox" data-action="change-timing" data-field="upload" ${timing.upload ? 'checked' : ''}>
                <div class="timing-content">
                    <div class="timing-icon">📤</div>
                    <div class="timing-info">
                        <span class="timing-name">上传</span>
                        <span class="timing-desc">文件上传时添加水印</span>
                    </div>
                </div>
            </label>
            <label class="timing-option">
                <input type="checkbox" data-action="change-timing" data-field="download" ${timing.download ? 'checked' : ''}>
                <div class="timing-content">
                    <div class="timing-icon">📥</div>
                    <div class="timing-info">
                        <span class="timing-name">下载</span>
                        <span class="timing-desc">文件下载时添加水印</span>
                    </div>
                </div>
            </label>
            <label class="timing-option">
                <input type="checkbox" data-action="change-timing" data-field="external" ${timing.external ? 'checked' : ''}>
                <div class="timing-content">
                    <div class="timing-icon">🌐</div>
                    <div class="timing-info">
                        <span class="timing-name">外发</span>
                        <span class="timing-desc">文件外发时添加水印</span>
                    </div>
                </div>
            </label>
        `;
  },

  renderScopeOptions() {
    if (!this.state.currentConfig || !this.state.currentConfig.scope) {
      return '';
    }

    const scope = this.state.currentConfig.scope;

    return `
            <div class="scope-header">
                <span class="scope-title">生效对象</span>
            </div>
            <div class="scope-options">
                <label class="scope-option">
                    <input type="radio" name="scopeType" value="all" data-action="change-scope-type" ${scope.type === 'all' ? 'checked' : ''}>
                    <div class="scope-content">
                        <div class="scope-icon">👥</div>
                        <div class="scope-info">
                            <span class="scope-name">全部员工和设备</span>
                            <span class="scope-desc">对所有用户和设备生效</span>
                        </div>
                    </div>
                </label>
                <label class="scope-option">
                    <input type="radio" name="scopeType" value="specific" data-action="change-scope-type" ${scope.type === 'specific' ? 'checked' : ''}>
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
            <div class="specific-selection" id="specificSelection" style="display: ${scope.type === 'specific' ? 'block' : 'none'};">
                <div class="selection-tabs">
                    <button class="tab-btn ${this.state.activeTab === 'departments' ? 'active' : ''}" data-action="switch-tab" data-tab="departments">部门选择</button>
                    <button class="tab-btn ${this.state.activeTab === 'devices' ? 'active' : ''}" data-action="switch-tab" data-tab="devices">设备选择</button>
                </div>
                
                <!-- 部门选择面板 -->
                <div class="tab-panel ${this.state.activeTab === 'departments' ? 'active' : ''}" id="departments-panel">
                    <div class="selection-header">
                        <span class="selection-title">选择部门</span>
                        <span class="selection-count">已选择 ${(scope.selectedDepartments || []).length} 个部门</span>
                    </div>
                    <div class="selection-list">
                        ${this.renderDepartmentSelection()}
                    </div>
                </div>
                
                <!-- 设备选择面板 -->
                <div class="tab-panel ${this.state.activeTab === 'devices' ? 'active' : ''}" id="devices-panel">
                    <div class="selection-header">
                        <span class="selection-title">选择设备</span>
                        <span class="selection-count">已选择 ${(scope.selectedDevices || []).length} 台</span>
                    </div>
                    <div class="selection-list">
                        ${this.renderDeviceSelection()}
                    </div>
                </div>
            </div>
        `;
  },

  renderDepartmentSelection() {
    return this.state.departments.map(dept => `
            <label class="selection-item">
                <input type="checkbox" value="${dept.id}" data-action="change-department-selection" ${(this.state.currentConfig.scope.selectedDepartments || []).includes(dept.id) ? 'checked' : ''}>
                <div class="item-content">
                    <div class="item-name">${dept.name}</div>
                    <div class="item-info">${dept.manager} · ${dept.employeeCount}人 · ${dept.description}</div>
                </div>
            </label>
        `).join('');
  },

  renderDeviceSelection() {
    return this.state.devices.map(device => `
            <label class="selection-item">
                <input type="checkbox" value="${device.id}" data-action="change-device-selection" ${(this.state.currentConfig.scope.selectedDevices || []).includes(device.id) ? 'checked' : ''}>
                <div class="item-content">
                    <div class="item-name">${device.name}</div>
                    <div class="item-info">${device.type} · ${device.location}</div>
                </div>
            </label>
        `).join('');
  },

  // ===== 无闪屏更新方法 =====
  // 更新配置显示（无重新渲染）
  updateConfigDisplay() {
    // 更新功能开关
    const enabledSwitch = document.getElementById('watermarkEnabled');
    if (enabledSwitch) {
      enabledSwitch.checked = this.state.currentConfig.enabled;
    }

    // 更新水印类型选择
    this.updateTypeSelection();

    // 更新内容行
    this.updateContentRows();

    // 更新样式控件
    this.updateStyleControls();

    // 更新生效时间
    this.updateTimingOptions();

    // 更新生效范围
    this.updateScopeOptions();

    // 如果预览是激活的，更新预览
    if (this.state.preview.isActive) {
      this.updatePreviewArea();
    }
  },

  // 更新水印类型选择状态
  updateTypeSelection() {
    const typeCards = document.querySelectorAll('.type-card');
    const typeRadios = document.querySelectorAll('input[name="watermarkType"]');

    typeCards.forEach(card => {
      const radio = card.querySelector('input[type="radio"]');
      if (radio.value === this.state.currentConfig.type) {
        card.classList.add('selected');
        radio.checked = true;
      } else {
        card.classList.remove('selected');
        radio.checked = false;
      }
    });
  },

  // 更新内容行（增量更新）
  updateContentRows() {
    const contentBuilder = document.getElementById('contentBuilder');
    if (!contentBuilder) return;

    // 重新渲染内容区域（保留添加按钮）
    const addButton = contentBuilder.querySelector('.btn-add-content');
    const newContent = this.renderContentRows();

    // 清空除了添加按钮外的内容
    const contentItems = contentBuilder.querySelectorAll('.content-item');
    contentItems.forEach(item => item.remove());

    // 插入新的内容行
    if (addButton && newContent) {
      addButton.insertAdjacentHTML('beforebegin', newContent);
    }
  },

  // 更新样式控件值
  updateStyleControls() {
    const style = this.state.currentConfig.style;

    // 更新颜色选择器
    const colorInput = document.querySelector('.color-input');
    if (colorInput) colorInput.value = style.color;

    // 更新下拉选择框
    const styleSelects = document.querySelectorAll('.style-select');
    styleSelects.forEach(select => {
      const field = select.dataset.field;
      if (field && style[field]) {
        select.value = style[field];
      }
    });
  },

  // 更新生效时间选项
  updateTimingOptions() {
    const timing = this.state.currentConfig.timing;

    const timingCheckboxes = document.querySelectorAll('[data-action="change-timing"]');
    timingCheckboxes.forEach(checkbox => {
      const field = checkbox.dataset.field;
      if (field && timing.hasOwnProperty(field)) {
        checkbox.checked = timing[field];
      }
    });
  },

  // 更新生效范围选项
  updateScopeOptions() {
    const scope = this.state.currentConfig.scope;

    // 更新范围类型选择
    const scopeRadios = document.querySelectorAll('input[name="scopeType"]');
    scopeRadios.forEach(radio => {
      radio.checked = radio.value === scope.type;
    });

    // 更新指定选择面板显示状态
    const specificSelection = document.getElementById('specificSelection');
    if (specificSelection) {
      specificSelection.style.display = scope.type === 'specific' ? 'block' : 'none';
    }

    // 更新选择计数
    this.updateSelectionCount();
  },

  // 更新选择计数显示
  updateSelectionCount() {
    const scope = this.state.currentConfig.scope;

    // 更新部门选择计数
    const deptCount = document.querySelector('#departments-panel .selection-count');
    if (deptCount) {
      deptCount.textContent = `已选择 ${(scope.selectedDepartments || []).length} 个部门`;
    }

    // 更新设备选择计数
    const deviceCount = document.querySelector('#devices-panel .selection-count');
    if (deviceCount) {
      deviceCount.textContent = `已选择 ${(scope.selectedDevices || []).length} 台`;
    }
  },

  // 更新部门选择列表
  updateDepartmentSelection() {
    const departmentsList = document.querySelector('#departments-panel .selection-list');
    if (departmentsList) {
      departmentsList.innerHTML = this.renderDepartmentSelection();
    }
    this.updateSelectionCount();
  },

  // 更新设备选择列表
  updateDeviceSelection() {
    const devicesList = document.querySelector('#devices-panel .selection-list');
    if (devicesList) {
      devicesList.innerHTML = this.renderDeviceSelection();
    }
    this.updateSelectionCount();
  },

  // 更新预览区域
  updatePreviewArea() {
    const previewArea = document.getElementById('previewArea');
    if (previewArea) {
      previewArea.innerHTML = this.renderPreviewContent();
    }
  },

  // 切换标签页（无闪屏）
  switchTab(targetTab) {
    if (this.state.activeTab === targetTab) return;

    this.state.activeTab = targetTab;

    // 更新标签按钮状态
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
      if (btn.dataset.tab === targetTab) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // 更新面板显示状态
    const tabPanels = document.querySelectorAll('.tab-panel');
    tabPanels.forEach(panel => {
      if (panel.id === targetTab + '-panel') {
        panel.classList.add('active');
      } else {
        panel.classList.remove('active');
      }
    });
  },

  // ===== 事件系统（使用事件委托） =====
  // 绑定事件
  bindEvents() {
    // 移除之前的事件监听器（避免重复绑定）
    document.removeEventListener('click', this.handleClick.bind(this));
    document.removeEventListener('change', this.handleChange.bind(this));
    document.removeEventListener('input', this.handleInput.bind(this));

    // 使用事件委托在文档级别监听
    document.addEventListener('click', this.handleClick.bind(this));
    document.addEventListener('change', this.handleChange.bind(this));
    document.addEventListener('input', this.handleInput.bind(this));

    console.log('🎯 数字水印事件绑定完成');
  },

  // 在DOM内容插入后重新绑定事件
  rebindEventsAfterRender() {
    // 延迟绑定，确保DOM已完全渲染
    setTimeout(() => {
      this.bindEvents();
      console.log('🔄 数字水印事件重新绑定完成');
    }, 100);
  },

  // 统一点击事件处理
  handleClick(e) {
    const target = e.target;
    const action = target.dataset.action || target.closest('[data-action]')?.dataset.action;

    if (!action) return;

    switch (action) {
      case 'toggle-preview':
        this.togglePreview();
        break;
      case 'hide-preview':
        this.hidePreview();
        e.stopPropagation();
        break;
      case 'add-content':
        this.addContentRow();
        break;
      case 'remove-content':
        const index = parseInt(target.dataset.index || target.closest('[data-index]')?.dataset.index);
        this.removeContentRow(index);
        break;
      case 'switch-tab':
        const tab = target.dataset.tab;
        this.switchTab(tab);
        break;
      case 'save':
        this.saveConfig();
        break;
      case 'reset':
        this.resetConfig();
        break;
    }
  },

  // 统一变化事件处理
  handleChange(e) {
    const target = e.target;
    const action = target.dataset.action;

    console.log('🔄 数字水印change事件:', {
      target: target,
      tagName: target.tagName,
      type: target.type,
      name: target.name,
      value: target.value,
      action: action,
      checked: target.checked
    });

    if (!action) {
      // 特殊处理：功能开关和水印类型
      if (target.id === 'watermarkEnabled') {
        console.log('🔘 功能开关切换:', target.checked);
        this.updateConfigField('enabled', target.checked);
        return;
      } else if (target.name === 'watermarkType') {
        console.log('🎨 水印类型切换:', target.value);
        this.updateConfigField('type', target.value);
        this.updateTypeSelection();
        return;
      }
      return;
    }

    switch (action) {
      case 'change-content-type':
        const index = parseInt(target.dataset.index);
        this.updateContentType(index, target.value);
        break;
      case 'change-style':
        const field = target.dataset.field;
        this.updateStyleField(field, target.value);
        break;
      case 'change-timing':
        const timingField = target.dataset.field;
        this.updateTimingField(timingField, target.checked);
        break;
      case 'change-scope-type':
        this.updateScopeType(target.value);
        break;
      case 'change-department-selection':
        this.updateDepartmentSelectionState(target.value, target.checked);
        break;
      case 'change-device-selection':
        this.updateDeviceSelectionState(target.value, target.checked);
        break;
    }
  },

  // 统一输入事件处理
  handleInput(e) {
    // 这里可以添加实时输入处理，如搜索防抖等
  },

  // ===== 配置更新方法 =====
  // 更新配置字段
  updateConfigField(field, value) {
    if (this.state.currentConfig) {
      this.state.currentConfig[field] = value;

      // 如果预览激活，实时更新预览
      if (this.state.preview.isActive && (field === 'type' || field === 'content' || field === 'style')) {
        this.updatePreviewArea();
      }
    }
  },

  // 更新内容类型
  updateContentType(index, newType) {
    if (this.state.currentConfig && this.state.currentConfig.content[index]) {
      const option = this.state.contentOptions.find(opt => opt.value === newType);
      if (option) {
        this.state.currentConfig.content[index] = {
          type: newType,
          label: option.label
        };

        // 如果预览激活，更新预览
        if (this.state.preview.isActive) {
          this.updatePreviewArea();
        }
      }
    }
  },

  // 更新样式字段
  updateStyleField(field, value) {
    if (this.state.currentConfig && this.state.currentConfig.style) {
      this.state.currentConfig.style[field] = value;

      // 如果预览激活，实时更新预览
      if (this.state.preview.isActive) {
        this.updatePreviewArea();
      }
    }
  },

  // 更新生效时间字段
  updateTimingField(field, value) {
    if (this.state.currentConfig && this.state.currentConfig.timing) {
      this.state.currentConfig.timing[field] = value;
    }
  },

  // 更新生效范围类型
  updateScopeType(type) {
    if (this.state.currentConfig && this.state.currentConfig.scope) {
      this.state.currentConfig.scope.type = type;
      this.updateScopeOptions();
    }
  },

  // 更新部门选择状态
  updateDepartmentSelectionState(deptId, isSelected) {
    if (!this.state.currentConfig || !this.state.currentConfig.scope) return;

    const selectedDepartments = this.state.currentConfig.scope.selectedDepartments || [];

    if (isSelected) {
      if (!selectedDepartments.includes(deptId)) {
        selectedDepartments.push(deptId);
      }
    } else {
      const index = selectedDepartments.indexOf(deptId);
      if (index > -1) {
        selectedDepartments.splice(index, 1);
      }
    }

    this.state.currentConfig.scope.selectedDepartments = selectedDepartments;
    this.updateSelectionCount();
  },

  // 更新设备选择状态
  updateDeviceSelectionState(deviceId, isSelected) {
    if (!this.state.currentConfig || !this.state.currentConfig.scope) return;

    const selectedDevices = this.state.currentConfig.scope.selectedDevices || [];

    if (isSelected) {
      if (!selectedDevices.includes(deviceId)) {
        selectedDevices.push(deviceId);
      }
    } else {
      const index = selectedDevices.indexOf(deviceId);
      if (index > -1) {
        selectedDevices.splice(index, 1);
      }
    }

    this.state.currentConfig.scope.selectedDevices = selectedDevices;
    this.updateSelectionCount();
  },

  // 添加内容行
  addContentRow() {
    if (this.state.currentConfig && this.state.currentConfig.content) {
      this.state.currentConfig.content.push({
        type: 'name',
        label: '姓名'
      });
      this.updateContentRows();
    }
  },

  // 删除内容行
  removeContentRow(index) {
    if (this.state.currentConfig && this.state.currentConfig.content && this.state.currentConfig.content.length > 1) {
      this.state.currentConfig.content.splice(index, 1);
      this.updateContentRows();

      // 如果预览激活，更新预览
      if (this.state.preview.isActive) {
        this.updatePreviewArea();
      }
    }
  },

  // 切换预览
  togglePreview() {
    if (this.state.preview.isActive) {
      this.hidePreview();
    } else {
      this.showPreview();
    }
  },

  // 显示预览
  showPreview() {
    this.state.preview.isActive = true;
    this.updatePreviewArea();
  },

  // 隐藏预览
  hidePreview() {
    this.state.preview.isActive = false;
    this.updatePreviewArea();
  },

  // ===== 数据持久化方法 =====
  // 保存配置
  async saveConfig() {
    try {
      if (!this.state.currentConfig) {
        throw new Error('没有配置数据可保存');
      }

      let savedConfig;
      const isUpdate = !!this.state.currentConfig.id;

      if (isUpdate) {
        // 更新现有配置
        savedConfig = await AppDataManagerV2.watermarkConfigs.update(
          this.state.currentConfig.id,
          this.state.currentConfig
        );
      } else {
        // 创建新配置
        savedConfig = await AppDataManagerV2.watermarkConfigs.create(this.state.currentConfig);
      }

      this.state.currentConfig = savedConfig;

      // 生成详细的保存信息
      const saveDetails = this.generateSaveDetails(savedConfig, isUpdate);
      this.showDetailedMessage(saveDetails, 'success');

    } catch (error) {
      console.error('❌ 保存配置失败:', error);
      this.showMessage('配置保存失败: ' + error.message, 'error');
    }
  },

  // 生成保存详情
  generateSaveDetails(config, isUpdate) {
    const operation = isUpdate ? '更新' : '创建';
    const details = [];

    // 基本信息
    details.push(`✅ 成功${operation}数字水印配置`);
    details.push(`📝 配置名称: ${config.name || '默认水印配置'}`);
    details.push(`🔘 功能状态: ${config.enabled ? '已启用' : '已禁用'}`);
    details.push(`🎨 水印类型: ${config.type === 'visible' ? '明水印 (可见)' : '暗水印 (隐藏)'}`);

    // 内容设置
    if (config.content && config.content.length > 0) {
      details.push(`📋 水印内容 (${config.content.length}项):`);
      config.content.forEach((item, index) => {
        details.push(`   ${index + 1}. ${item.label}`);
      });
    }

    // 样式设置
    if (config.style) {
      details.push(`🎯 样式设置:`);
      details.push(`   • 字体颜色: ${config.style.color}`);
      details.push(`   • 透明度: ${config.style.opacity}`);
      details.push(`   • 字号: ${config.style.fontSize}`);
      details.push(`   • 旋转角度: ${config.style.rotation}`);
      details.push(`   • 行间距: ${config.style.rowSpacing}`);
      details.push(`   • 列间距: ${config.style.columnSpacing}`);
    }

    // 生效时间
    if (config.timing) {
      const timingItems = [];
      if (config.timing.upload) timingItems.push('上传');
      if (config.timing.download) timingItems.push('下载');
      if (config.timing.external) timingItems.push('外发');

      if (timingItems.length > 0) {
        details.push(`⏰ 生效时间: ${timingItems.join(' + ')}`);
      } else {
        details.push(`⏰ 生效时间: 未设置`);
      }
    }

    // 生效范围
    if (config.scope) {
      if (config.scope.type === 'all') {
        details.push(`👥 生效范围: 全部员工和设备`);
      } else if (config.scope.type === 'specific') {
        const deptCount = (config.scope.selectedDepartments || []).length;
        const deviceCount = (config.scope.selectedDevices || []).length;
        details.push(`🎯 生效范围: 指定对象 (${deptCount}个部门 + ${deviceCount}台设备)`);
      }
    }

    details.push(`🕒 保存时间: ${new Date().toLocaleString('zh-CN')}`);

    return details;
  },

  // 重置配置
  resetConfig() {
    if (confirm('确定要重置为默认配置吗？这将丢失当前的所有修改。')) {
      // 重置为默认配置
      this.state.currentConfig = {
        id: null,
        name: '默认水印配置',
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
      this.state.preview.isActive = false;

      // 更新显示
      this.updateConfigDisplay();

      this.showMessage('配置已重置为默认值', 'info');
    }
  },

  // 显示消息
  showMessage(message, type = 'info') {
    let tip = document.getElementById('watermark-tip');
    if (!tip) {
      tip = document.createElement('div');
      tip.id = 'watermark-tip';
      tip.style.cssText = 'position:fixed;top:32px;right:32px;z-index:99999;background:rgba(0,0,0,0.75);color:#fff;padding:10px 24px;border-radius:4px;font-size:16px;box-shadow:0 2px 8px rgba(0,0,0,0.15);transition:all .3s;opacity:0;pointer-events:none;';
      document.body.appendChild(tip);
    }

    // 根据类型设置不同颜色
    const colors = {
      success: 'rgba(76, 175, 80, 0.9)',
      error: 'rgba(244, 67, 54, 0.9)',
      warning: 'rgba(255, 152, 0, 0.9)',
      info: 'rgba(0, 0, 0, 0.75)'
    };

    tip.style.background = colors[type] || colors.info;
    tip.textContent = message;
    tip.style.opacity = '1';

    setTimeout(() => {
      tip.style.opacity = '0';
    }, 2000);
  },

  // 显示详细消息（大段内容）
  showDetailedMessage(details, type = 'info') {
    // 创建详细消息弹窗
    const modal = document.createElement('div');
    modal.id = 'watermark-detailed-message';
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;

    const content = document.createElement('div');
    content.style.cssText = `
      background: white;
      border-radius: 8px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      max-width: 600px;
      max-height: 80vh;
      overflow-y: auto;
      margin: 20px;
      position: relative;
      transform: scale(0.9);
      transition: transform 0.3s ease;
    `;

    // 根据类型设置头部颜色
    const headerColors = {
      success: '#52c41a',
      error: '#ff4d4f',
      warning: '#faad14',
      info: '#1890ff'
    };

    const headerIcons = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️'
    };

    content.innerHTML = `
      <div style="
        background: ${headerColors[type] || headerColors.info};
        color: white;
        padding: 16px 24px;
        border-radius: 8px 8px 0 0;
        display: flex;
        align-items: center;
        gap: 8px;
      ">
        <span style="font-size: 20px;">${headerIcons[type] || headerIcons.info}</span>
        <h3 style="margin: 0; font-size: 18px; font-weight: 500;">配置保存详情</h3>
        <button id="close-detailed-message" style="
          margin-left: auto;
          background: none;
          border: none;
          color: white;
          font-size: 24px;
          cursor: pointer;
          padding: 0;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          transition: background 0.2s;
        " onmouseover="this.style.background='rgba(255,255,255,0.2)'" onmouseout="this.style.background='none'">×</button>
      </div>
      <div style="
        padding: 24px;
        line-height: 1.6;
        font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
        font-size: 14px;
        color: #333;
      ">
        ${details.map(detail => `<div style="margin-bottom: 8px;">${detail}</div>`).join('')}
      </div>
      <div style="
        padding: 16px 24px;
        border-top: 1px solid #f0f0f0;
        text-align: right;
      ">
        <button id="confirm-detailed-message" style="
          background: ${headerColors[type] || headerColors.info};
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          transition: opacity 0.2s;
        " onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='1'">确定</button>
      </div>
    `;

    modal.appendChild(content);
    document.body.appendChild(modal);

    // 显示动画
    requestAnimationFrame(() => {
      modal.style.opacity = '1';
      content.style.transform = 'scale(1)';
    });

    // 绑定关闭事件
    const closeModal = () => {
      modal.style.opacity = '0';
      content.style.transform = 'scale(0.9)';
      setTimeout(() => {
        if (modal.parentNode) {
          modal.parentNode.removeChild(modal);
        }
      }, 300);
    };

    document.getElementById('close-detailed-message').addEventListener('click', closeModal);
    document.getElementById('confirm-detailed-message').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    // 自动关闭（10秒后）
    setTimeout(closeModal, 10000);
  },

  // ===== 样式注入（保持与原版完全一致） =====
  injectStyles() {
    // 确保样式只添加一次
    if (!document.getElementById('digital-watermark-v2-styles')) {
      // 尝试加载外部CSS文件
      const linkElement = document.createElement('link');
      linkElement.id = 'digital-watermark-v2-styles';
      linkElement.rel = 'stylesheet';
      linkElement.href = 'digitalWatermarkV2.css';
      linkElement.onerror = () => {
        // 如果外部CSS加载失败，使用内联样式
        console.log('外部CSS加载失败，使用内联样式');
        this.injectInlineStyles();
      };
      document.head.appendChild(linkElement);
    }
  },

  // 注入内联样式作为后备方案
  injectInlineStyles() {
    if (document.getElementById('digital-watermark-v2-styles')) {
      document.getElementById('digital-watermark-v2-styles').remove();
    }

    const styleElement = document.createElement('style');
    styleElement.id = 'digital-watermark-v2-styles';
    styleElement.textContent = this.getFallbackStyles();
    document.head.appendChild(styleElement);
  },

  // 获取后备样式（简化版，确保基本功能）
  getFallbackStyles() {
    return `
        .digital-watermark-page {
            background: #f8fafc;
            min-height: 100vh;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        }
        
        .digital-watermark-page .page-header {
            background: white;
            padding: 20px 0;
            margin-bottom: 20px;
            border-bottom: 1px solid #e8e8e8;
        }
        
        .digital-watermark-page .main-content {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px 20px;
        }
        
        .digital-watermark-page .config-card {
            background: white;
            border-radius: 4px;
            margin-bottom: 16px;
            border: 1px solid #e8e8e8;
            padding: 24px;
        }
        
        .digital-watermark-page .btn-primary {
            padding: 8px 16px;
            background: #1890ff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        
        .digital-watermark-page .btn-secondary {
            padding: 8px 16px;
            border: 1px solid #d9d9d9;
            background: white;
            border-radius: 4px;
            color: #666;
            cursor: pointer;
        }
        `;
  }
};

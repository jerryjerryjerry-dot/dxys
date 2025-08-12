// 水印溯源页面V2 - 具备数据持久化和无闪屏更新功能
window.watermarkTraceV2 = {
  id: 'watermarkTrace',
  title: '水印溯源',

  // 初始化状态
  initialized: false,

  // 状态管理
  state: {
    // 当前选中的标签页
    activeTab: 'record', // 'record' | 'analysis' | 'management'

    // 当前上传的文件信息
    currentFiles: {
      record: null,     // 水印标记页面的文件
      analysis: null    // 水印分析页面的文件
    },

    // 水印记录数据
    watermarkRecords: [],

    // 水印分析数据
    watermarkAnalysis: [],

    // 搜索和过滤状态
    search: {
      keyword: '',
      status: '',
      fileType: '',
      dateFrom: '',
      dateTo: ''
    },

    // 分页状态
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0
    },

    // 选择状态
    selection: {
      selectedRecords: new Set(),
      selectAll: false
    },

    // 面板状态
    panel: {
      isVisible: false,
      mode: 'view', // 'view' | 'edit' | 'add'
      currentRecord: null
    },

    // 统计数据
    statistics: {
      total: 0,
      completed: 0,
      failed: 0,
      totalDownloads: 0,
      byFileType: {},
      recentActivity: []
    }
  },

  // ===== 初始化 =====
  async init() {
    if (this.initialized) return;

    try {
      console.log('🚀 初始化watermarkTraceV2...');

      // 等待数据管理器初始化
      if (!window.AppDataManagerV2 || !AppDataManagerV2.initialized) {
        console.log('等待AppDataManagerV2初始化...');
        await this.waitForDataManager();
      }

      // 注册数据更新监听
      this.registerDataListeners();

      // 注入样式
      this.injectStyles();

      // 绑定事件
      this.bindEvents();

      // 加载数据
      await this.loadData();

      this.initialized = true;
      console.log('✅ watermarkTraceV2初始化完成');

    } catch (error) {
      console.error('❌ watermarkTraceV2初始化失败:', error);
      throw error;
    }
  },

  // 等待数据管理器初始化
  async waitForDataManager() {
    let attempts = 0;
    const maxAttempts = 100;

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

  // 注册数据更新监听（优化版本，添加防抖和批量处理）
  registerDataListeners() {
    // 防抖处理器映射
    this._debouncedHandlers = new Map();

    // 监听水印记录数据变化（防抖处理）
    AppDataManagerV2.onUpdate('watermarkRecords', (event) => {
      console.log('水印记录数据更新:', event);
      this.debouncedDataUpdate('watermarkRecords', event);
    });

    // 监听水印分析数据变化（防抖处理）
    AppDataManagerV2.onUpdate('watermarkAnalysis', (event) => {
      console.log('水印分析数据更新:', event);
      this.debouncedDataUpdate('watermarkAnalysis', event);
    });

    // 设置内存监控
    this.setupMemoryMonitoring();

    // 监听页面可见性变化（用于优化性能）
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pauseBackgroundTasks();
      } else {
        this.resumeBackgroundTasks();
      }
    });

    // 监听文件上传数据变化
    AppDataManagerV2.onUpdate('uploadedFiles', (event) => {
      console.log('文件上传数据更新:', event);
      this.handleDataUpdate('uploadedFiles', event);
    });
  },

  // 处理数据更新
  async handleDataUpdate(type, event) {
    try {
      switch (type) {
        case 'watermarkRecords':
          await this.loadWatermarkRecords();
          this.updateRecordsTable();
          this.updateStatistics();
          break;
        case 'watermarkAnalysis':
          await this.loadWatermarkAnalysis();
          break;
        case 'uploadedFiles':
          // 文件上传完成，可能需要更新UI
          break;
      }
    } catch (error) {
      console.error('❌ 处理数据更新失败:', error);
    }
  },

  // 加载数据
  async loadData() {
    try {
      console.log('🔄 开始加载数据...');

      // 先检查数据库是否已初始化
      if (!AppDataManagerV2.initialized) {
        console.log('⚠️ 数据库未初始化，跳过数据加载');
        return;
      }

      // 逐个加载数据，便于调试
      console.log('📄 加载水印记录...');
      await this.loadWatermarkRecords();

      console.log('🔍 加载水印分析记录...');
      await this.loadWatermarkAnalysis();

      console.log('📊 加载统计数据...');
      await this.loadStatistics();

      console.log('✅ 数据加载完成');
    } catch (error) {
      console.error('❌ 数据加载失败:', error);
      // 不抛出错误，允许页面继续初始化
    }
  },

  // 加载水印记录
  async loadWatermarkRecords() {
    try {
      const filters = this.buildFilters();
      const records = await AppDataManagerV2.watermarkRecords.getAll(filters);
      this.state.watermarkRecords = records;
      this.state.pagination.total = records.length;
    } catch (error) {
      console.error('❌ 加载水印记录失败:', error);
      this.state.watermarkRecords = [];
    }
  },

  // 加载水印分析记录
  async loadWatermarkAnalysis() {
    try {
      const analyses = await AppDataManagerV2.watermarkAnalysis.getAll();
      this.state.watermarkAnalysis = analyses;
    } catch (error) {
      console.error('❌ 加载水印分析记录失败:', error);
      this.state.watermarkAnalysis = [];
    }
  },

  // 加载统计数据
  async loadStatistics() {
    try {
      const stats = await AppDataManagerV2.watermarkRecords.getStatistics();
      this.state.statistics = stats;
    } catch (error) {
      console.error('❌ 加载统计数据失败:', error);
      this.state.statistics = {
        total: 0, completed: 0, failed: 0, totalDownloads: 0,
        byFileType: {}, recentActivity: []
      };
    }
  },

  // 构建过滤条件
  buildFilters() {
    const filters = {};

    if (this.state.search.keyword) {
      filters.search = this.state.search.keyword;
    }
    if (this.state.search.status) {
      filters.status = this.state.search.status;
    }
    if (this.state.search.fileType) {
      filters.fileType = this.state.search.fileType;
    }
    if (this.state.search.dateFrom) {
      filters.dateFrom = this.state.search.dateFrom;
    }
    if (this.state.search.dateTo) {
      filters.dateTo = this.state.search.dateTo;
    }

    // 默认按创建时间倒序排列
    filters.sortBy = 'embedTime';
    filters.sortOrder = 'desc';

    return filters;
  },

  // ===== 页面内容模板 =====
  content() {
    return `
            <div class="watermark-trace-page">
                <!-- 页面头部 -->
                <div class="page-header">
                    <div class="header-content">
                        <h1 class="page-title">水印溯源</h1>
                        <p class="page-desc">水印标记、分析检测和记录管理的完整解决方案</p>
                    </div>
                </div>
                
                <!-- 主要内容区域 -->
                <div class="main-content">
                    <!-- 功能开关卡片 -->
                    <div class="function-switch-card">
                        <div class="switch-content">
                            <div class="switch-info">
                                <span class="switch-label">水印溯源功能</span>
                                <span class="switch-desc">开启后，可以在数据识别、数据染色中使用流转水印溯源能力，通过水印分析可以自动化生成报告</span>
                            </div>
                            <label class="modern-switch">
                                <input type="checkbox" id="watermarkTraceEnabled" checked>
                                <span class="switch-slider"></span>
                            </label>
                        </div>
                    </div>
                    
                    <!-- 标签页导航 -->
                    <div class="tab-navigation">
                        <div class="tab-list">
                            <button class="tab-btn ${this.state.activeTab === 'record' ? 'active' : ''}" data-action="switch-tab" data-tab="record">
                                <span class="tab-icon">🏷️</span>
                                <span class="tab-text">水印标记</span>
                            </button>
                            <button class="tab-btn ${this.state.activeTab === 'analysis' ? 'active' : ''}" data-action="switch-tab" data-tab="analysis">
                                <span class="tab-icon">🔍</span>
                                <span class="tab-text">水印分析</span>
                            </button>
                            <button class="tab-btn ${this.state.activeTab === 'management' ? 'active' : ''}" data-action="switch-tab" data-tab="management">
                                <span class="tab-icon">📊</span>
                                <span class="tab-text">记录管理</span>
                            </button>
                        </div>
                    </div>
                    
                    <!-- 标签页内容 -->
                    <div class="tab-content">
                        <!-- 水印标记页面 -->
                        <div class="tab-pane ${this.state.activeTab === 'record' ? 'active' : ''}" id="recordPane">
                            ${this.renderRecordContent()}
                        </div>
                        
                        <!-- 水印分析页面 -->
                        <div class="tab-pane ${this.state.activeTab === 'analysis' ? 'active' : ''}" id="analysisPane">
                            ${this.renderAnalysisContent()}
                        </div>
                        
                        <!-- 记录管理页面 -->
                        <div class="tab-pane ${this.state.activeTab === 'management' ? 'active' : ''}" id="managementPane">
                            ${this.renderManagementContent()}
                        </div>
                    </div>
                </div>
                
                <!-- 侧边面板 -->
                <div class="side-panel ${this.state.panel.isVisible ? 'visible' : ''}" id="sidePanel">
                    ${this.renderSidePanel()}
                </div>
                
                <!-- 面板遮罩 -->
                <div class="panel-overlay ${this.state.panel.isVisible ? 'visible' : ''}" data-action="close-panel"></div>
            </div>
        `;
  },

  // ===== 渲染子组件方法 =====
  // 渲染水印标记内容
  renderRecordContent() {
    return `
            <div class="record-content">
                <div class="content-card">
                    <div class="card-header">
                        <h3 class="card-title">文件水印标记</h3>
                        <p class="card-desc">为文件添加数字水印，支持多种文件格式</p>
                    </div>
                    <div class="card-body">
                        <!-- 文件上传区域 -->
                        <div class="upload-section">
                            <label class="section-label required">待标记文件</label>
                            <div class="upload-area" id="record-upload-area">
                                ${this.renderUploadArea('record')}
                            </div>
                        </div>
                        
                        <!-- 水印内容输入 -->
                        <div class="input-section">
                            <label class="section-label required">水印内容</label>
                            <div class="input-group">
                                <input type="text" class="form-input" id="watermark-content" placeholder="请输入水印内容">
                                <div class="input-hint">支持中文、英文、数字和特殊字符</div>
                            </div>
                        </div>
                        
                        <!-- 高级选项 -->
                        <div class="advanced-options" id="advancedOptions">
                            <div class="option-header">
                                <span class="option-title">高级选项</span>
                                <button class="toggle-btn" data-action="toggle-advanced">
                                    <span class="toggle-icon">▼</span>
                                </button>
                            </div>
                            <div class="option-content" style="display: none;">
                                <div class="option-grid">
                                    <div class="option-item">
                                        <label class="option-label">标签</label>
                                        <input type="text" class="form-input" id="record-tags" placeholder="用逗号分隔多个标签">
                                    </div>
                                    <div class="option-item">
                                        <label class="option-label">备注</label>
                                        <textarea class="form-textarea" id="record-notes" placeholder="添加备注信息"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- 操作按钮 -->
                        <div class="action-section">
                            <button class="btn-secondary" data-action="reset-record">
                                <span class="btn-icon">↺</span>
                                <span class="btn-text">重置</span>
                            </button>
                            <button class="btn-primary" data-action="confirm-record">
                                <span class="btn-icon">✓</span>
                                <span class="btn-text">确认并下载</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
  },

  // 渲染水印分析内容
  renderAnalysisContent() {
    return `
            <div class="analysis-content">
                <div class="analysis-grid">
                    <!-- 文件上传区域 -->
                    <div class="grid-item upload-section">
                        <div class="content-card">
                            <div class="card-header">
                                <h3 class="card-title">文件分析</h3>
                                <p class="card-desc">上传文件进行水印检测和分析</p>
                            </div>
                            <div class="card-body">
                                <label class="section-label required">分析文件</label>
                                <div class="upload-area" id="analysis-upload-area">
                                    ${this.renderUploadArea('analysis')}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- 分析结果区域 -->
                    <div class="grid-item result-section">
                        <div class="content-card">
                            <div class="card-header">
                                <h3 class="card-title">检测结果</h3>
                                <p class="card-desc">水印检测和分析结果</p>
                            </div>
                            <div class="card-body">
                                <div class="result-area" id="analysis-result">
                                    ${this.renderAnalysisResult()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- 报告生成 -->
                <div class="report-section">
                    <div class="content-card">
                        <div class="card-header">
                            <h3 class="card-title">分析报告</h3>
                            <p class="card-desc">生成详细的水印分析报告</p>
                        </div>
                        <div class="card-body">
                            <div class="report-actions">
                                <button class="btn-primary" data-action="generate-report" ${!this.state.currentFiles.analysis ? 'disabled' : ''}>
                                    <span class="btn-icon">📄</span>
                                    <span class="btn-text">生成分析报告</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
  },

  // 渲染记录管理内容
  renderManagementContent() {
    return `
            <div class="management-content">
                <!-- 统计卡片 -->
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon">📊</div>
                        <div class="stat-content">
                            <div class="stat-value">${this.state.statistics.total}</div>
                            <div class="stat-label">总记录数</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">✅</div>
                        <div class="stat-content">
                            <div class="stat-value">${this.state.statistics.completed}</div>
                            <div class="stat-label">成功标记</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">📥</div>
                        <div class="stat-content">
                            <div class="stat-value">${this.state.statistics.totalDownloads}</div>
                            <div class="stat-label">总下载量</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">🔍</div>
                        <div class="stat-content">
                            <div class="stat-value">${this.state.watermarkAnalysis.length}</div>
                            <div class="stat-label">分析记录</div>
                        </div>
                    </div>
                </div>
                
                <!-- 搜索和筛选 -->
                <div class="search-section">
                    <div class="content-card">
                        <div class="card-body">
                            <div class="search-grid">
                                <div class="search-item">
                                    <input type="text" class="form-input" id="search-keyword" placeholder="搜索文件名、水印内容或标签..." value="${this.state.search.keyword}">
                                </div>
                                <div class="search-item">
                                    <select class="form-select" id="search-status">
                                        <option value="">全部状态</option>
                                        <option value="completed" ${this.state.search.status === 'completed' ? 'selected' : ''}>已完成</option>
                                        <option value="failed" ${this.state.search.status === 'failed' ? 'selected' : ''}>失败</option>
                                    </select>
                                </div>
                                <div class="search-item">
                                    <select class="form-select" id="search-file-type">
                                        <option value="">全部类型</option>
                                        ${this.renderFileTypeOptions()}
                                    </select>
                                </div>
                                <div class="search-item">
                                    <button class="btn-primary" data-action="search-records">
                                        <span class="btn-icon">🔍</span>
                                        <span class="btn-text">搜索</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- 数据表格 -->
                <div class="table-section">
                    <div class="content-card">
                        <div class="card-header">
                            <div class="header-left">
                                <h3 class="card-title">水印记录</h3>
                                <span class="record-count">共 ${this.state.watermarkRecords.length} 条记录</span>
                            </div>
                            <div class="header-actions">
                                <button class="btn-secondary" data-action="refresh-records">
                                    <span class="btn-icon">↻</span>
                                    <span class="btn-text">刷新</span>
                                </button>
                                <button class="btn-danger" data-action="batch-delete" ${this.state.selection.selectedRecords.size === 0 ? 'disabled' : ''}>
                                    <span class="btn-icon">🗑️</span>
                                    <span class="btn-text">批量删除</span>
                                </button>
                            </div>
                        </div>
                        <div class="card-body">
                            ${this.renderRecordsTable()}
                        </div>
                    </div>
                </div>
                
                <!-- 分页 -->
                <div class="pagination-section">
                    ${this.renderPagination()}
                </div>
            </div>
        `;
  },

  // 渲染上传区域
  renderUploadArea(type) {
    const currentFile = this.state.currentFiles[type];

    if (currentFile) {
      return `
                <div class="file-info">
                    <div class="file-details">
                        <div class="file-icon">${this.getFileIcon(currentFile.type)}</div>
                        <div class="file-content">
                            <div class="file-name">${currentFile.name}</div>
                            <div class="file-meta">
                                <span class="file-size">${this.formatFileSize(currentFile.size)}</span>
                                <span class="file-type">${currentFile.type}</span>
                            </div>
                        </div>
                    </div>
                    <button class="btn-remove" data-action="remove-file" data-type="${type}">
                        <span class="remove-icon">×</span>
                    </button>
                </div>
            `;
    }

    return `
            <div class="upload-box" onclick="document.getElementById('${type}-file-input').click()">
                <div class="upload-icon">📤</div>
                <div class="upload-text">点击或拖动文件到这里进行上传</div>
                <div class="upload-hint">
                    <div>支持办公文档（doc、xls、csv、ppt、pdf、txt等）</div>
                    <div>文本文档（txt、yaml、xml、json、config、ini等）</div>
                    <div>代码文件（c、c++、go、Java、Python等）</div>
                </div>
                <input type="file" id="${type}-file-input" style="display: none;" 
                       accept=".doc,.docx,.xls,.xlsx,.csv,.ppt,.pptx,.pdf,.txt,.yaml,.xml,.json,.config,.ini,.c,.cpp,.go,.java,.py">
            </div>
        `;
  },

  // 渲染分析结果
  renderAnalysisResult() {
    const analysis = this.state.watermarkAnalysis.find(a =>
      a.fileName === this.state.currentFiles.analysis?.name
    );

    if (!analysis) {
      return `
                <div class="result-placeholder">
                    <div class="placeholder-icon">🔍</div>
                    <div class="placeholder-text">请先上传文件进行分析</div>
                </div>
            `;
    }

    return `
            <div class="result-content">
                <div class="result-status ${analysis.hasWatermark ? 'success' : 'warning'}">
                    <div class="status-icon">${analysis.hasWatermark ? '✅' : '❌'}</div>
                    <div class="status-text">${analysis.hasWatermark ? '检测到水印信息' : '未检测到水印信息'}</div>
                </div>
                
                ${analysis.hasWatermark ? `
                    <div class="result-details">
                        <div class="detail-item">
                            <div class="detail-label">水印内容</div>
                            <div class="detail-value">${analysis.watermarkContent}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">置信度</div>
                            <div class="detail-value">${(analysis.confidence * 100).toFixed(1)}%</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">匹配记录</div>
                            <div class="detail-value">
                                ${analysis.matchedRecordId ?
          `<a href="#" data-action="view-record" data-id="${analysis.matchedRecordId}">查看详情</a>` :
          '无匹配记录'
        }
                            </div>
                        </div>
                    </div>
                ` : ''}
                
                <div class="result-meta">
                    <div class="meta-item">
                        <span class="meta-label">分析时间：</span>
                        <span class="meta-value">${new Date(analysis.analyzeTime).toLocaleString()}</span>
                    </div>
                </div>
            </div>
        `;
  },

  // 渲染文件类型选项
  renderFileTypeOptions() {
    const fileTypes = [
      { value: 'application/pdf', label: 'PDF' },
      { value: 'application/msword', label: 'Word' },
      { value: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', label: 'Word (新)' },
      { value: 'application/vnd.ms-excel', label: 'Excel' },
      { value: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', label: 'Excel (新)' },
      { value: 'application/vnd.ms-powerpoint', label: 'PowerPoint' },
      { value: 'application/vnd.openxmlformats-officedocument.presentationml.presentation', label: 'PowerPoint (新)' },
      { value: 'text/plain', label: 'Text' },
      { value: 'text/csv', label: 'CSV' },
      { value: 'application/json', label: 'JSON' },
      { value: 'application/xml', label: 'XML' },
      { value: 'text/x-python', label: 'Python' },
      { value: 'text/x-java', label: 'Java' },
      { value: 'text/x-c', label: 'C/C++' },
      { value: 'text/x-go', label: 'Go' }
    ];

    return fileTypes.map(type =>
      `<option value="${type.value}" ${this.state.search.fileType === type.value ? 'selected' : ''}>${type.label}</option>`
    ).join('');
  },

  // 渲染分页
  renderPagination() {
    const { current, pageSize, total } = this.state.pagination;
    const totalPages = Math.ceil(total / pageSize);

    if (totalPages <= 1) {
      return '';
    }

    let pages = [];

    // 添加上一页按钮
    pages.push(`
            <button class="page-btn" data-action="goto-page" data-page="${current - 1}" ${current === 1 ? 'disabled' : ''}>
                ‹ 上一页
            </button>
        `);

    // 添加页码
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= current - 2 && i <= current + 2)) {
        pages.push(`
                    <button class="page-btn ${i === current ? 'active' : ''}" data-action="goto-page" data-page="${i}">
                        ${i}
                    </button>
                `);
      } else if (i === current - 3 || i === current + 3) {
        pages.push('<span class="page-ellipsis">...</span>');
      }
    }

    // 添加下一页按钮
    pages.push(`
            <button class="page-btn" data-action="goto-page" data-page="${current + 1}" ${current === totalPages ? 'disabled' : ''}>
                下一页 ›
            </button>
        `);

    return `
            <div class="pagination">
                ${pages.join('')}
            </div>
        `;
  },

  // 渲染侧边面板
  renderSidePanel() {
    if (!this.state.panel.isVisible) {
      return '';
    }

    const { mode, currentRecord } = this.state.panel;

    return `
            <div class="panel-header">
                <h3 class="panel-title">
                    ${mode === 'view' ? '查看记录' : mode === 'edit' ? '编辑记录' : '新建记录'}
                </h3>
                <button class="panel-close" data-action="close-panel">×</button>
            </div>
            <div class="panel-body">
                ${mode === 'view' && currentRecord ? this.renderRecordDetails(currentRecord) :
        mode === 'edit' && currentRecord ? this.renderRecordForm(currentRecord) :
          mode === 'add' ? this.renderRecordForm() : ''}
            </div>
        `;
  },

  // 渲染记录详情
  renderRecordDetails(record) {
    return `
            <div class="record-details">
                <div class="detail-section">
                    <h4 class="section-title">基本信息</h4>
                    <div class="detail-grid">
                        <div class="detail-item">
                            <span class="detail-label">文件名</span>
                            <span class="detail-value">${record.fileName}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">文件大小</span>
                            <span class="detail-value">${this.formatFileSize(record.fileSize)}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">文件类型</span>
                            <span class="detail-value">${this.getFileTypeName(record.fileType)}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">水印内容</span>
                            <span class="detail-value">${record.watermarkContent}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">标记时间</span>
                            <span class="detail-value">${new Date(record.embedTime).toLocaleString()}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">状态</span>
                            <span class="detail-value">
                                <span class="status-badge ${record.status}">${this.getStatusText(record.status)}</span>
                            </span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">下载次数</span>
                            <span class="detail-value">${record.downloadCount || 0}</span>
                        </div>
                    </div>
                </div>
                
                ${record.tags && record.tags.length > 0 ? `
                    <div class="detail-section">
                        <h4 class="section-title">标签</h4>
                        <div class="tag-list">
                            ${record.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                ` : ''}
                
                ${record.notes ? `
                    <div class="detail-section">
                        <h4 class="section-title">备注</h4>
                        <div class="notes-content">${record.notes}</div>
                    </div>
                ` : ''}
                
                <div class="detail-actions">
                    <button class="btn-secondary" data-action="edit-record" data-id="${record.id}">
                        <span class="btn-icon">✏️</span>
                        <span class="btn-text">编辑</span>
                    </button>
                    <button class="btn-primary" data-action="download-record" data-id="${record.id}">
                        <span class="btn-icon">📥</span>
                        <span class="btn-text">下载</span>
                    </button>
                </div>
            </div>
        `;
  },

  // 渲染记录表单
  renderRecordForm(record = null) {
    const isEdit = !!record;

    return `
            <form class="record-form" data-action="save-record" data-id="${isEdit ? record.id : ''}">
                <div class="form-section">
                    <div class="form-group">
                        <label class="form-label">文件名</label>
                        <input type="text" class="form-input" name="fileName" value="${isEdit ? record.fileName : ''}" ${isEdit ? 'readonly' : ''}>
                    </div>
                    <div class="form-group">
                        <label class="form-label">水印内容</label>
                        <input type="text" class="form-input" name="watermarkContent" value="${isEdit ? record.watermarkContent : ''}" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">标签</label>
                        <input type="text" class="form-input" name="tags" value="${isEdit && record.tags ? record.tags.join(', ') : ''}" placeholder="用逗号分隔多个标签">
                    </div>
                    <div class="form-group">
                        <label class="form-label">备注</label>
                        <textarea class="form-textarea" name="notes" rows="3">${isEdit && record.notes ? record.notes : ''}</textarea>
                    </div>
                </div>
                
                <div class="form-actions">
                    <button type="button" class="btn-secondary" data-action="close-panel">取消</button>
                    <button type="submit" class="btn-primary">
                        <span class="btn-icon">💾</span>
                        <span class="btn-text">${isEdit ? '保存' : '创建'}</span>
                    </button>
                </div>
            </form>
        `;
  },

  // 渲染记录表格
  renderRecordsTable() {
    if (this.state.watermarkRecords.length === 0) {
      return `
                <div class="table-empty">
                    <div class="empty-icon">📝</div>
                    <div class="empty-text">暂无水印记录</div>
                    <div class="empty-desc">开始标记文件以创建记录</div>
                </div>
            `;
    }

    const startIndex = (this.state.pagination.current - 1) * this.state.pagination.pageSize;
    const endIndex = startIndex + this.state.pagination.pageSize;
    const pageRecords = this.state.watermarkRecords.slice(startIndex, endIndex);

    return `
            <div class="data-table">
                <table class="table">
                    <thead>
                        <tr>
                            <th class="checkbox-col">
                                <input type="checkbox" class="table-checkbox" id="select-all" 
                                       ${this.state.selection.selectAll ? 'checked' : ''}>
                            </th>
                            <th>文件名</th>
                            <th>水印内容</th>
                            <th>文件类型</th>
                            <th>标记时间</th>
                            <th>状态</th>
                            <th>下载次数</th>
                            <th class="actions-col">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${pageRecords.map(record => this.renderTableRow(record)).join('')}
                    </tbody>
                </table>
            </div>
        `;
  },

  // 渲染表格行
  renderTableRow(record) {
    const isSelected = this.state.selection.selectedRecords.has(record.id);

    return `
            <tr class="table-row ${isSelected ? 'selected' : ''}">
                <td class="checkbox-col">
                    <input type="checkbox" class="table-checkbox row-checkbox" 
                           value="${record.id}" ${isSelected ? 'checked' : ''}>
                </td>
                <td class="file-name-col">
                    <div class="file-info-cell">
                        <div class="file-icon">${this.getFileIcon(record.fileType)}</div>
                        <div class="file-details">
                            <div class="file-name">${record.fileName}</div>
                            <div class="file-size">${this.formatFileSize(record.fileSize)}</div>
                        </div>
                    </div>
                </td>
                <td class="watermark-col">
                    <div class="watermark-content" title="${record.watermarkContent}">
                        ${record.watermarkContent}
                    </div>
                </td>
                <td class="type-col">
                    <span class="type-badge">${this.getFileTypeName(record.fileType)}</span>
                </td>
                <td class="time-col">
                    <div class="time-info">
                        <div class="time-date">${new Date(record.embedTime).toLocaleDateString()}</div>
                        <div class="time-time">${new Date(record.embedTime).toLocaleTimeString()}</div>
                    </div>
                </td>
                <td class="status-col">
                    <span class="status-badge ${record.status}">${this.getStatusText(record.status)}</span>
                </td>
                <td class="downloads-col">
                    <span class="download-count">${record.downloadCount || 0}</span>
                </td>
                <td class="actions-col">
                    <div class="action-buttons">
                        <button class="btn-action" data-action="view-record" data-id="${record.id}" title="查看详情">
                            <span class="action-icon">👁️</span>
                        </button>
                        <button class="btn-action" data-action="download-record" data-id="${record.id}" title="下载文件">
                            <span class="action-icon">📥</span>
                        </button>
                        <button class="btn-action" data-action="delete-record" data-id="${record.id}" title="删除记录">
                            <span class="action-icon">🗑️</span>
                        </button>
                    </div>
                </td>
            </tr>
        `;
  },

  // 待续...

  // ===== 工具方法 =====
  // 获取文件图标
  getFileIcon(fileType) {
    const iconMap = {
      'application/pdf': '📄',
      'application/msword': '📝',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '📝',
      'application/vnd.ms-excel': '📊',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '📊',
      'application/vnd.ms-powerpoint': '📽️',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': '📽️',
      'text/plain': '📄',
      'text/csv': '📊',
      'application/json': '⚙️',
      'application/xml': '⚙️',
      'text/x-python': '🐍',
      'text/x-java': '☕',
      'text/x-c': '⚙️',
      'text/x-go': '🐹'
    };
    return iconMap[fileType] || '📄';
  },

  // 格式化文件大小
  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },

  // 获取文件类型名称
  getFileTypeName(fileType) {
    const typeMap = {
      'application/pdf': 'PDF',
      'application/msword': 'Word',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'Word',
      'application/vnd.ms-excel': 'Excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'Excel',
      'text/plain': 'Text',
      'text/csv': 'CSV',
      'application/json': 'JSON',
      'text/x-python': 'Python',
      'text/x-java': 'Java'
    };
    return typeMap[fileType] || 'Unknown';
  },

  // 获取状态文本
  getStatusText(status) {
    const statusMap = {
      'completed': '已完成',
      'failed': '失败',
      'processing': '处理中'
    };
    return statusMap[status] || status;
  },

  // 注入样式
  injectStyles() {
    if (!document.getElementById('watermark-trace-v2-styles')) {
      const linkElement = document.createElement('link');
      linkElement.id = 'watermark-trace-v2-styles';
      linkElement.rel = 'stylesheet';
      linkElement.href = 'views/watermarkTraceV2.css';
      linkElement.onerror = () => {
        console.log('外部CSS加载失败，使用内联样式');
        this.injectInlineStyles();
      };
      document.head.appendChild(linkElement);
    }
  },

  // 注入内联样式
  injectInlineStyles() {
    if (document.getElementById('watermark-trace-v2-styles')) {
      document.getElementById('watermark-trace-v2-styles').remove();
    }

    const styleElement = document.createElement('style');
    styleElement.id = 'watermark-trace-v2-styles';
    styleElement.textContent = `
            .watermark-trace-page {
                background: #f8fafc;
                min-height: 100vh;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            }
            .page-header {
                background: white;
                padding: 20px 0;
                border-bottom: 1px solid #e8e8e8;
            }
            .content-card {
                background: white;
                border-radius: 8px;
                border: 1px solid #e8e8e8;
                margin-bottom: 16px;
                overflow: hidden;
            }
            .btn-primary {
                background: #1890ff;
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 4px;
                cursor: pointer;
            }
        `;
    document.head.appendChild(styleElement);
  },

  // 绑定事件
  bindEvents() {
    // 先移除可能存在的旧事件监听器，避免重复绑定
    if (this.boundHandlers) {
      document.removeEventListener('click', this.boundHandlers.click);
      document.removeEventListener('change', this.boundHandlers.change);
      document.removeEventListener('input', this.boundHandlers.input);
      document.removeEventListener('submit', this.boundHandlers.submit);
      document.removeEventListener('dragover', this.boundHandlers.dragover);
      document.removeEventListener('drop', this.boundHandlers.drop);
    }

    // 绑定this上下文
    this.boundHandlers = {
      click: this.handleClick.bind(this),
      change: this.handleChange.bind(this),
      input: this.handleInput.bind(this),
      submit: this.handleSubmit.bind(this),
      dragover: this.handleDragOver.bind(this),
      drop: this.handleDrop.bind(this)
    };

    // 使用事件委托统一管理所有交互
    document.addEventListener('click', this.boundHandlers.click);
    document.addEventListener('change', this.boundHandlers.change);
    document.addEventListener('input', this.boundHandlers.input);
    document.addEventListener('submit', this.boundHandlers.submit);
    document.addEventListener('dragover', this.boundHandlers.dragover);
    document.addEventListener('drop', this.boundHandlers.drop);

    console.log('✅ 水印溯源事件绑定完成');
  },

  // 事件处理方法
  handleClick(e) {
    const target = e.target;
    let actionElement = target.closest('[data-action]');

    if (!actionElement) return;

    const action = actionElement.dataset.action;

    switch (action) {
      case 'switch-tab':
        e.preventDefault();
        const tabName = actionElement.dataset.tab;
        if (tabName) {
          this.switchTab(tabName);
        }
        break;
      case 'remove-file':
        this.removeFile(target.dataset.type);
        break;
      case 'confirm-record':
        this.confirmRecord();
        break;
      case 'reset-record':
        this.resetRecord();
        break;
      case 'generate-report':
        this.generateReport();
        break;
      case 'search-records':
        this.searchRecords();
        break;
      case 'view-record':
        this.viewRecord(target.dataset.id);
        break;
      case 'edit-record':
        this.editRecord(target.dataset.id);
        break;
      case 'delete-record':
        this.deleteRecord(target.dataset.id);
        break;
      case 'download-record':
        this.downloadRecord(target.dataset.id);
        break;
      case 'batch-delete':
        this.batchDeleteRecords();
        break;
      case 'refresh-records':
        this.refreshRecords();
        break;
      case 'goto-page':
        this.gotoPage(parseInt(target.dataset.page));
        break;
      case 'close-panel':
        this.closeSidePanel();
        break;
      case 'toggle-advanced':
        this.toggleAdvancedOptions();
        break;
    }
  },

  handleChange(e) {
    const target = e.target;

    // 处理文件选择
    if (target.type === 'file') {
      const file = target.files[0];
      if (file) {
        const type = target.id.includes('record') ? 'record' : 'analysis';
        this.handleFileSelect(file, type);
      }
    }

    // 处理搜索条件变化
    if (target.id === 'search-status' || target.id === 'search-file-type') {
      this.debounceSearch();
    }

    // 处理选择框变化
    if (target.type === 'checkbox') {
      if (target.id === 'select-all') {
        this.handleSelectAll(target.checked);
      } else if (target.classList.contains('record-checkbox')) {
        this.handleRecordSelect(target.value, target.checked);
      }
    }
  },

  handleInput(e) {
    const target = e.target;

    // 处理搜索输入
    if (target.id === 'search-keyword') {
      this.debounceSearch();
    }
  },

  // 处理表单提交
  handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const action = form.dataset.action;

    if (action === 'save-record') {
      this.saveRecord(form);
    }
  },

  // 保存记录
  async saveRecord(form) {
    try {
      const formData = new FormData(form);
      const recordId = form.dataset.id;
      const isEdit = !!recordId;

      const recordData = {
        fileName: formData.get('fileName'),
        watermarkContent: formData.get('watermarkContent'),
        tags: formData.get('tags') ? formData.get('tags').split(',').map(tag => tag.trim()) : [],
        notes: formData.get('notes') || ''
      };

      if (isEdit) {
        // 编辑现有记录
        const record = this.state.watermarkRecords.find(r => r.id == recordId);
        if (record) {
          Object.assign(record, recordData, { lastUpdated: new Date().toISOString() });
          this.showMessage('记录更新成功', 'success');
        }
      } else {
        // 创建新记录
        if (!this.state.currentFiles.record) {
          this.showMessage('请先上传文件', 'error');
          return;
        }

        const newRecord = {
          ...recordData,
          fileSize: this.state.currentFiles.record.size,
          fileType: this.state.currentFiles.record.type,
          originalFileId: Date.now(),
          markedFileId: `marked_${Date.now()}`,
          embedTime: new Date().toISOString(),
          status: 'completed',
          downloadCount: 0
        };

        await AppDataManagerV2.watermarkRecords.create(newRecord);
        this.showMessage('记录创建成功', 'success');
      }

      this.closeSidePanel();
      await this.loadWatermarkRecords();
      this.updateRecordsTable();

    } catch (error) {
      console.error('❌ 保存记录失败:', error);
      this.showMessage('保存记录失败: ' + error.message, 'error');
    }
  },

  // 防抖搜索
  debounceSearch() {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.searchRecords();
    }, 500);
  },

  // 处理全选
  handleSelectAll(checked) {
    this.state.selection.selectAll = checked;
    if (checked) {
      this.state.watermarkRecords.forEach(record => {
        this.state.selection.selectedRecords.add(record.id);
      });
    } else {
      this.state.selection.selectedRecords.clear();
    }
    this.updateRecordsTable();
  },

  // 处理单个记录选择
  handleRecordSelect(recordId, checked) {
    if (checked) {
      this.state.selection.selectedRecords.add(recordId);
    } else {
      this.state.selection.selectedRecords.delete(recordId);
      this.state.selection.selectAll = false;
    }

    // 检查是否全选
    if (this.state.selection.selectedRecords.size === this.state.watermarkRecords.length) {
      this.state.selection.selectAll = true;
    }

    this.updateRecordsTable();
  },

  handleDragOver(e) {
    e.preventDefault();
    const uploadArea = e.target.closest('.upload-area');
    if (uploadArea) {
      uploadArea.classList.add('dragover');
    }
  },

  handleDrop(e) {
    e.preventDefault();
    const uploadArea = e.target.closest('.upload-area');
    if (uploadArea) {
      uploadArea.classList.remove('dragover');

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        const file = files[0];
        const type = uploadArea.dataset.type || (uploadArea.closest('#recordPane') ? 'record' : 'analysis');
        this.handleFileSelect(file, type);
      }
    }
  },

  // ===== 业务逻辑方法 =====
  switchTab(tabName) {
    // 防抖处理：如果正在切换中，忽略新的切换请求
    if (this._switching) {
      console.log('⚠️ Tab切换中，忽略请求:', tabName);
      return;
    }

    // 如果已经是当前Tab，直接返回
    if (this.state.activeTab === tabName) {
      console.log('ℹ️ 已经是当前Tab，无需切换:', tabName);
      return;
    }

    console.log('🔄 开始Tab切换:', { from: this.state.activeTab, to: tabName });

    // 设置切换状态
    this._switching = true;
    const startTime = performance.now();

    try {
      // 更新状态
      const oldTab = this.state.activeTab;
      this.state.activeTab = tabName;

      // 批量更新DOM，减少重排重绘
      this.updateTabDisplayOptimized(oldTab, tabName);

      const endTime = performance.now();
      console.log('✅ Tab切换完成:', {
        tab: tabName,
        duration: `${(endTime - startTime).toFixed(2)}ms`
      });

    } catch (error) {
      console.error('❌ Tab切换失败:', error);
      // 恢复原状态
      this.state.activeTab = oldTab;
    } finally {
      // 清除切换状态
      setTimeout(() => {
        this._switching = false;
      }, 100);
    }
  },

  // 优化的Tab显示更新方法（不重新渲染DOM，只切换显示状态）
  updateTabDisplayOptimized(oldTab, newTab) {
    console.log('🔄 更新Tab显示:', { oldTab, newTab });

    // 实时查询DOM元素
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    console.log('📍 找到Tab按钮:', tabBtns.length, '个');
    console.log('📍 找到Tab面板:', tabPanes.length, '个');

    // 更新标签按钮状态
    tabBtns.forEach(btn => {
      const isActive = btn.dataset.tab === newTab;
      btn.classList.toggle('active', isActive);
      console.log(`🔘 按钮 [${btn.dataset.tab}]:`, isActive ? '激活' : '未激活');
    });

    // 更新标签内容显示 - 只切换display，不重新渲染
    tabPanes.forEach(pane => {
      const expectedId = newTab + 'Pane';
      const isActive = pane.id === expectedId;

      console.log(`📄 面板检查 [${pane.id}] vs [${expectedId}]:`, isActive ? '匹配' : '不匹配');

      if (isActive) {
        // 显示当前Tab面板
        pane.classList.add('active');
        pane.style.display = 'block';
        console.log(`✅ 显示面板: ${pane.id}`);

        // 只有在面板内容为空时才初始化内容
        this.ensureTabContentInitialized(newTab, pane);

      } else {
        // 隐藏其他Tab面板，但保留DOM内容
        pane.classList.remove('active');
        pane.style.display = 'none';
        console.log(`❌ 隐藏面板: ${pane.id}`);
      }
    });

    console.log('🎨 DOM更新完成:', { oldTab, newTab });
  },

  // 确保Tab内容已初始化（只在必要时初始化，不重复渲染）
  ensureTabContentInitialized(tabName, pane) {
    // 检查面板是否已经有内容
    const hasContent = pane.children.length > 0 &&
      pane.innerHTML.trim().length > 100; // 简单的内容检查

    if (hasContent) {
      console.log(`ℹ️ Tab内容已存在，跳过初始化: ${tabName}`);
      return;
    }

    console.log('🔄 初始化Tab内容:', tabName);

    try {
      // 根据不同的Tab类型初始化内容
      switch (tabName) {
        case 'record':
          pane.innerHTML = this.renderRecordContent();
          // 设置文件上传事件
          setTimeout(() => this.setupFileUpload('record'), 100);
          console.log('✅ 水印标记内容初始化完成');
          break;

        case 'analysis':
          pane.innerHTML = this.renderAnalysisContent();
          // 设置文件上传事件
          setTimeout(() => this.setupFileUpload('analysis'), 100);
          console.log('✅ 水印分析内容初始化完成');
          break;

        case 'management':
          pane.innerHTML = this.renderManagementContent();
          console.log('✅ 记录管理内容初始化完成');
          break;

        default:
          console.warn('⚠️ 未知的Tab类型:', tabName);
      }
    } catch (error) {
      console.error('❌ 初始化Tab内容失败:', error);
    }
  },

  // 强制刷新Tab内容（仅在数据更新时使用）
  refreshTabContent(tabName) {
    const paneId = tabName + 'Pane';
    const pane = document.getElementById(paneId);

    if (!pane) {
      console.error('❌ 找不到Tab面板:', paneId);
      return;
    }

    console.log('🔄 强制刷新Tab内容:', tabName);

    try {
      // 清空内容并重新渲染
      pane.innerHTML = '';
      this.ensureTabContentInitialized(tabName, pane);
    } catch (error) {
      console.error('❌ 刷新Tab内容失败:', error);
    }
  },

  // 清除缓存的DOM元素（当DOM结构变化时调用）
  clearDOMCache() {
    this._cachedElements = null;
    console.log('🧹 DOM缓存已清除');
  },

  async confirmRecord() {
    try {
      const watermarkContent = document.getElementById('watermark-content')?.value.trim();
      const tags = document.getElementById('record-tags')?.value.trim();
      const notes = document.getElementById('record-notes')?.value.trim();

      if (!this.state.currentFiles.record) {
        this.showMessage('请先上传文件', 'error');
        return;
      }

      if (!watermarkContent) {
        this.showMessage('请输入水印内容', 'error');
        return;
      }

      // 显示处理中状态
      this.showMessage('正在处理水印标记...', 'info');

      // 上传文件
      const uploadResult = await AppDataManagerV2.uploadedFiles.uploadFile(
        this.state.currentFiles.record, 'watermark'
      );

      // 进行水印嵌入
      const embedResult = await AppDataManagerV2.watermarkAPI.embedWatermark(
        uploadResult.id, watermarkContent
      );

      // 创建水印记录
      const recordData = {
        fileName: this.state.currentFiles.record.name,
        fileSize: this.state.currentFiles.record.size,
        fileType: this.state.currentFiles.record.type,
        originalFileId: uploadResult.id,
        markedFileId: embedResult.markedFileId,
        watermarkContent: watermarkContent,
        tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
        notes: notes
      };

      await AppDataManagerV2.watermarkRecords.create(recordData);

      // 模拟文件下载
      this.downloadFile(embedResult.downloadUrl, embedResult.markedFileName);

      this.showMessage('水印标记成功！文件已开始下载', 'success');
      this.resetRecord();

    } catch (error) {
      console.error('❌ 水印标记失败:', error);
      this.showMessage('水印标记失败: ' + error.message, 'error');
    }
  },

  // 重置记录表单
  resetRecord() {
    this.state.currentFiles.record = null;

    const watermarkContent = document.getElementById('watermark-content');
    const tags = document.getElementById('record-tags');
    const notes = document.getElementById('record-notes');

    if (watermarkContent) watermarkContent.value = '';
    if (tags) tags.value = '';
    if (notes) notes.value = '';

    this.updateRecordDisplay();
  },

  // 生成报告
  async generateReport() {
    try {
      if (!this.state.currentFiles.analysis) {
        this.showMessage('请先上传文件进行分析', 'error');
        return;
      }

      this.showMessage('正在生成分析报告...', 'info');

      const analysisData = this.state.watermarkAnalysis.find(a =>
        a.fileName === this.state.currentFiles.analysis.name
      );

      if (!analysisData) {
        this.showMessage('未找到分析数据', 'error');
        return;
      }

      const reportResult = await AppDataManagerV2.watermarkAPI.generateReport(analysisData);

      // 下载报告
      this.downloadTextFile(reportResult.reportContent, reportResult.reportFileName);

      // 更新分析记录
      await AppDataManagerV2.watermarkAnalysis.update(analysisData.id, {
        reportGenerated: true,
        reportPath: reportResult.reportPath
      });

      this.showMessage('报告生成成功！', 'success');

    } catch (error) {
      console.error('❌ 生成报告失败:', error);
      this.showMessage('生成报告失败: ' + error.message, 'error');
    }
  },

  // 搜索记录
  async searchRecords() {
    try {
      const keyword = document.getElementById('search-keyword')?.value.trim();
      const status = document.getElementById('search-status')?.value;
      const fileType = document.getElementById('search-file-type')?.value;

      this.state.search = {
        keyword,
        status,
        fileType,
        dateFrom: '',
        dateTo: ''
      };

      this.state.pagination.current = 1;

      await this.loadWatermarkRecords();
      this.updateRecordsTable();

      this.showMessage('搜索完成', 'success');

    } catch (error) {
      console.error('❌ 搜索失败:', error);
      this.showMessage('搜索失败: ' + error.message, 'error');
    }
  },

  // 查看记录
  viewRecord(id) {
    const record = this.state.watermarkRecords.find(r => r.id == id);
    if (record) {
      this.state.panel = {
        isVisible: true,
        mode: 'view',
        currentRecord: record
      };
      this.updatePanelDisplay();
    }
  },

  // 编辑记录
  editRecord(id) {
    const record = this.state.watermarkRecords.find(r => r.id == id);
    if (record) {
      this.state.panel = {
        isVisible: true,
        mode: 'edit',
        currentRecord: record
      };
      this.updatePanelDisplay();
    }
  },

  // 删除记录
  async deleteRecord(id) {
    if (!confirm('确定要删除这条记录吗？')) {
      return;
    }

    try {
      await AppDataManagerV2.watermarkRecords.delete(id);
      this.showMessage('记录删除成功', 'success');
      await this.loadWatermarkRecords();
      this.updateRecordsTable();
    } catch (error) {
      console.error('❌ 删除记录失败:', error);
      this.showMessage('删除记录失败: ' + error.message, 'error');
    }
  },

  // 下载记录文件
  async downloadRecord(id) {
    try {
      const record = this.state.watermarkRecords.find(r => r.id == id);
      if (record) {
        // 增加下载次数
        await AppDataManagerV2.watermarkRecords.incrementDownloadCount(id);

        // 模拟下载
        this.downloadFile(`/downloads/${record.markedFileId}`, record.fileName);
        this.showMessage('文件下载开始', 'success');

        // 更新记录显示
        await this.loadWatermarkRecords();
        this.updateRecordsTable();
      }
    } catch (error) {
      console.error('❌ 下载失败:', error);
      this.showMessage('下载失败: ' + error.message, 'error');
    }
  },

  // 批量删除记录
  async batchDeleteRecords() {
    const selectedIds = Array.from(this.state.selection.selectedRecords);

    if (selectedIds.length === 0) {
      this.showMessage('请先选择要删除的记录', 'warning');
      return;
    }

    if (!confirm(`确定要删除选中的 ${selectedIds.length} 条记录吗？`)) {
      return;
    }

    try {
      await AppDataManagerV2.watermarkRecords.batchDelete(selectedIds);
      this.showMessage(`成功删除 ${selectedIds.length} 条记录`, 'success');

      // 清空选择
      this.state.selection.selectedRecords.clear();
      this.state.selection.selectAll = false;

      await this.loadWatermarkRecords();
      this.updateRecordsTable();
    } catch (error) {
      console.error('❌ 批量删除失败:', error);
      this.showMessage('批量删除失败: ' + error.message, 'error');
    }
  },

  // 刷新记录
  async refreshRecords() {
    try {
      await this.loadData();
      this.updateRecordsTable();
      this.showMessage('数据已刷新', 'success');
    } catch (error) {
      console.error('❌ 刷新失败:', error);
      this.showMessage('刷新失败: ' + error.message, 'error');
    }
  },

  // 跳转页面
  gotoPage(page) {
    if (page < 1 || page > Math.ceil(this.state.pagination.total / this.state.pagination.pageSize)) {
      return;
    }

    this.state.pagination.current = page;
    this.updateRecordsTable();
  },

  // 关闭侧边面板
  closeSidePanel() {
    this.state.panel.isVisible = false;
    this.updatePanelDisplay();
  },

  // 切换高级选项
  toggleAdvancedOptions() {
    const optionContent = document.querySelector('.option-content');
    const toggleBtn = document.querySelector('.toggle-btn');

    if (optionContent && toggleBtn) {
      const isVisible = optionContent.style.display !== 'none';
      optionContent.style.display = isVisible ? 'none' : 'block';
      toggleBtn.classList.toggle('expanded', !isVisible);
    }
  },



  // 移除文件
  removeFile(type) {
    this.state.currentFiles[type] = null;
    this.updateFileDisplay(type);
  },

  // 更新文件显示（优化版本，减少DOM重建）
  updateFileDisplay(type) {
    console.log('🔄 更新文件显示:', type);

    const uploadArea = document.getElementById(`${type}-upload-area`);
    if (!uploadArea) {
      console.warn('⚠️ 找不到上传区域:', `${type}-upload-area`);
      return;
    }

    // 检查是否真的需要更新
    const currentFile = this.state.currentFiles[type];
    const existingFileInfo = uploadArea.querySelector('.file-info');
    const existingUploadBox = uploadArea.querySelector('.upload-box');

    // 如果状态没有变化，不需要重新渲染
    if (currentFile && existingFileInfo) {
      const currentFileName = existingFileInfo.querySelector('.file-name')?.textContent;
      if (currentFileName === currentFile.name) {
        console.log('ℹ️ 文件显示无需更新:', type);
        return;
      }
    }

    if (!currentFile && existingUploadBox) {
      console.log('ℹ️ 上传框显示无需更新:', type);
      return;
    }

    // 使用requestAnimationFrame优化DOM更新
    requestAnimationFrame(() => {
      // 保存滚动位置
      const scrollTop = uploadArea.scrollTop;

      // 更新内容
      uploadArea.innerHTML = this.renderUploadArea(type);

      // 恢复滚动位置
      uploadArea.scrollTop = scrollTop;

      // 重新设置事件监听器
      this.setupFileUpload(type);

      console.log('✅ 文件显示更新完成:', type);
    });
  },

  // 更新记录显示
  updateRecordDisplay() {
    const uploadArea = document.getElementById('record-upload-area');
    if (uploadArea) {
      uploadArea.innerHTML = this.renderUploadArea('record');
      this.setupFileUpload('record');
    }
  },

  // 更新记录表格
  updateRecordsTable() {
    if (this.state.activeTab === 'management') {
      this.refreshTabContent('management');
    }
  },

  // 更新面板显示
  updatePanelDisplay() {
    const sidePanel = document.getElementById('sidePanel');
    const panelOverlay = document.querySelector('.panel-overlay');

    if (sidePanel) {
      sidePanel.innerHTML = this.renderSidePanel();
      sidePanel.classList.toggle('visible', this.state.panel.isVisible);
    }

    if (panelOverlay) {
      panelOverlay.classList.toggle('visible', this.state.panel.isVisible);
    }
  },

  // 设置文件上传（简化版本，只设置file input的change事件）
  setupFileUpload(type) {
    const fileInput = document.getElementById(`${type}-file-input`);
    const uploadArea = document.getElementById(`${type}-upload-area`);

    if (fileInput) {
      fileInput.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
          this.handleFileSelect(file, type);
        }
        e.target.value = '';
      };
    }

    if (uploadArea) {
      this.setupDragAndDrop(uploadArea, type);
    }
  },



  // 设置拖拽上传
  setupDragAndDrop(uploadArea, type) {
    console.log('🖱️ 设置拖拽上传:', type);

    // 防止默认的拖拽行为
    const preventDefaults = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    // 拖拽进入
    const dragEnter = (e) => {
      preventDefaults(e);
      uploadArea.classList.add('dragover');
      console.log('📥 拖拽进入:', type);
    };

    // 拖拽悬停
    const dragOver = (e) => {
      preventDefaults(e);
      uploadArea.classList.add('dragover');
    };

    // 拖拽离开
    const dragLeave = (e) => {
      preventDefaults(e);
      // 只有当离开整个上传区域时才移除样式
      if (!uploadArea.contains(e.relatedTarget)) {
        uploadArea.classList.remove('dragover');
        console.log('📤 拖拽离开:', type);
      }
    };

    // 文件放置
    const drop = (e) => {
      preventDefaults(e);
      uploadArea.classList.remove('dragover');

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        const file = files[0];
        console.log('📁 文件放置:', { name: file.name, size: file.size, type: file.type });
        this.handleFileSelect(file, type);
      }
    };

    // 绑定拖拽事件
    uploadArea.addEventListener('dragenter', dragEnter);
    uploadArea.addEventListener('dragover', dragOver);
    uploadArea.addEventListener('dragleave', dragLeave);
    uploadArea.addEventListener('drop', drop);

    // 保存事件处理器引用以便清理
    if (!this._dragHandlers) {
      this._dragHandlers = {};
    }

    this._dragHandlers[type] = {
      dragEnter, dragOver, dragLeave, drop
    };
  },

  // 处理文件选择（优化版本，添加验证和错误恢复）
  async handleFileSelect(file, type) {
    console.log('📄 开始处理文件选择:', {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      uploadType: type
    });

    try {
      // 文件验证
      const validation = this.validateFile(file, type);
      if (!validation.valid) {
        this.showMessage(validation.message, 'error');
        return;
      }

      // 显示加载状态
      this.setFileUploadLoading(type, true);

      // 备份当前状态（用于错误恢复）
      const previousFile = this.state.currentFiles[type];

      // 更新文件状态
      this.state.currentFiles[type] = file;

      // 更新显示
      this.updateFileDisplay(type);

      // 根据类型执行相应的处理
      if (type === 'analysis') {
        await this.analyzeFile(file);
      } else if (type === 'record') {
        // 记录类型的特殊处理
        this.updateRecordFileInfo(file);
      }

      this.showMessage(`文件 "${file.name}" 上传成功`, 'success');
      console.log('✅ 文件处理完成:', file.name);

    } catch (error) {
      console.error('❌ 文件处理失败:', error);

      // 错误恢复：恢复之前的状态
      this.state.currentFiles[type] = previousFile || null;
      this.updateFileDisplay(type);

      // 显示错误信息
      const errorMsg = this.getFileErrorMessage(error);
      this.showMessage(errorMsg, 'error');

    } finally {
      // 清除加载状态
      this.setFileUploadLoading(type, false);
    }
  },

  // 文件验证
  validateFile(file, type) {
    const maxSize = 50 * 1024 * 1024; // 50MB
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/plain',
      'text/csv',
      'application/json',
      'text/xml',
      'application/xml'
    ];

    // 文件大小检查
    if (file.size > maxSize) {
      return {
        valid: false,
        message: `文件大小超过限制（最大50MB），当前文件大小：${this.formatFileSize(file.size)}`
      };
    }

    // 文件类型检查（基于扩展名）
    const fileName = file.name.toLowerCase();
    const validExtensions = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.txt', '.csv', '.json', '.xml', '.yaml', '.ini', '.config'];
    const hasValidExtension = validExtensions.some(ext => fileName.endsWith(ext));

    if (!hasValidExtension && !allowedTypes.includes(file.type)) {
      return {
        valid: false,
        message: `不支持的文件类型。支持的格式：${validExtensions.join(', ')}`
      };
    }

    // 文件名检查
    if (file.name.length > 255) {
      return {
        valid: false,
        message: '文件名过长，请重命名后再上传'
      };
    }

    return { valid: true };
  },

  // 设置文件上传加载状态
  setFileUploadLoading(type, loading) {
    const uploadArea = document.getElementById(`${type}-upload-area`);
    if (uploadArea) {
      uploadArea.classList.toggle('loading', loading);

      if (loading) {
        uploadArea.setAttribute('data-loading', '正在处理文件...');
      } else {
        uploadArea.removeAttribute('data-loading');
      }
    }
  },

  // 更新记录文件信息
  updateRecordFileInfo(file) {
    // 可以在这里添加记录类型文件的特殊处理逻辑
    console.log('📝 更新记录文件信息:', file.name);
  },

  // 获取文件错误信息
  getFileErrorMessage(error) {
    if (error.message.includes('network')) {
      return '网络错误，请检查网络连接后重试';
    }
    if (error.message.includes('timeout')) {
      return '文件处理超时，请重试或选择较小的文件';
    }
    if (error.message.includes('memory')) {
      return '内存不足，请选择较小的文件';
    }
    return `文件处理失败: ${error.message}`;
  },

  // 分析文件（优化版本，增强数据链路处理）
  async analyzeFile(file) {
    const analysisId = `analysis_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    console.log('🔬 开始文件分析:', { analysisId, fileName: file.name, fileSize: file.size });

    try {
      // 设置分析状态
      this.setAnalysisStatus(analysisId, 'uploading', '正在上传文件...');

      // 分片上传大文件（如果文件大于10MB）
      const uploadResult = await this.uploadFileWithProgress(file, 'analysis', (progress) => {
        this.setAnalysisStatus(analysisId, 'uploading', `上传中... ${progress}%`);
      });

      console.log('📤 文件上传完成:', uploadResult);

      // 设置分析状态
      this.setAnalysisStatus(analysisId, 'analyzing', '正在分析水印...');

      // 进行水印分析（带超时处理）
      const analysisResult = await this.analyzeWatermarkWithTimeout(uploadResult.id, 30000);

      console.log('🔍 水印分析完成:', analysisResult);

      // 创建分析记录（带重试机制）
      const analysisData = {
        id: analysisId,
        fileName: file.name,
        fileId: uploadResult.id,
        fileSize: file.size,
        fileType: file.type,
        hasWatermark: analysisResult.hasWatermark,
        watermarkContent: analysisResult.watermarkContent,
        confidence: analysisResult.confidence,
        matchedRecordId: analysisResult.matchedRecordId,
        analysisTime: new Date().toISOString(),
        processingTime: analysisResult.processingTime
      };

      await this.saveAnalysisWithRetry(analysisData, 3);

      // 增量更新显示（避免全量重新渲染）
      this.updateAnalysisDisplayIncremental(analysisData);

      // 清理临时数据和释放内存
      this.cleanupAnalysisData(analysisId);

      this.setAnalysisStatus(analysisId, 'completed', '分析完成');
      this.showMessage(`文件 "${file.name}" 分析完成`, 'success');

      console.log('✅ 文件分析流程完成:', analysisId);

    } catch (error) {
      console.error('❌ 文件分析失败:', error);

      // 详细错误处理
      const errorDetails = this.analyzeError(error);
      this.setAnalysisStatus(analysisId, 'failed', errorDetails.message);

      // 清理失败的数据
      await this.cleanupFailedAnalysis(analysisId);

      this.showMessage(`分析失败: ${errorDetails.userMessage}`, 'error');
    }
  },

  // 带进度的文件上传
  async uploadFileWithProgress(file, type, onProgress) {
    const chunkSize = 1024 * 1024; // 1MB chunks
    const totalChunks = Math.ceil(file.size / chunkSize);

    // 如果文件小于10MB，直接上传
    if (file.size < 10 * 1024 * 1024) {
      onProgress(50);
      const result = await AppDataManagerV2.uploadedFiles.uploadFile(file, type);
      onProgress(100);
      return result;
    }

    // 大文件分片上传
    console.log('📦 开始分片上传:', { totalChunks, chunkSize });

    const uploadId = `upload_${Date.now()}`;
    let uploadedChunks = 0;

    for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
      const start = chunkIndex * chunkSize;
      const end = Math.min(start + chunkSize, file.size);
      const chunk = file.slice(start, end);

      await AppDataManagerV2.uploadedFiles.uploadChunk(uploadId, chunkIndex, chunk);

      uploadedChunks++;
      const progress = Math.round((uploadedChunks / totalChunks) * 100);
      onProgress(progress);

      console.log(`📦 上传分片 ${chunkIndex + 1}/${totalChunks} (${progress}%)`);
    }

    // 合并分片
    const result = await AppDataManagerV2.uploadedFiles.mergeChunks(uploadId, file.name, type);
    console.log('✅ 分片上传完成:', result);

    return result;
  },

  // 带超时的水印分析
  async analyzeWatermarkWithTimeout(fileId, timeout = 30000) {
    return new Promise(async (resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error(`分析超时 (${timeout}ms)`));
      }, timeout);

      try {
        const startTime = Date.now();
        const result = await AppDataManagerV2.watermarkAPI.analyzeWatermark(fileId);
        const processingTime = Date.now() - startTime;

        clearTimeout(timeoutId);
        resolve({
          ...result,
          processingTime
        });
      } catch (error) {
        clearTimeout(timeoutId);
        reject(error);
      }
    });
  },

  // 带重试的分析数据保存
  async saveAnalysisWithRetry(analysisData, maxRetries = 3) {
    let lastError;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`💾 保存分析数据 (尝试 ${attempt}/${maxRetries}):`, analysisData.id);

        const result = await AppDataManagerV2.watermarkAnalysis.create(analysisData);

        console.log('✅ 分析数据保存成功:', result);
        return result;

      } catch (error) {
        console.warn(`⚠️ 保存失败 (尝试 ${attempt}/${maxRetries}):`, error.message);
        lastError = error;

        if (attempt < maxRetries) {
          // 指数退避重试
          const delay = Math.pow(2, attempt) * 1000;
          console.log(`⏳ ${delay}ms 后重试...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    throw new Error(`保存失败，已重试 ${maxRetries} 次: ${lastError.message}`);
  },

  // 设置分析状态
  setAnalysisStatus(analysisId, status, message) {
    if (!this._analysisStatuses) {
      this._analysisStatuses = new Map();
    }

    this._analysisStatuses.set(analysisId, {
      status,
      message,
      timestamp: Date.now()
    });

    // 更新UI显示
    this.updateAnalysisStatusUI(analysisId, status, message);
    console.log(`📊 分析状态更新 [${analysisId}]:`, { status, message });
  },

  // 更新分析状态UI
  updateAnalysisStatusUI(analysisId, status, message) {
    const statusElement = document.getElementById('analysis-status');
    if (statusElement) {
      statusElement.textContent = message;
      statusElement.className = `analysis-status status-${status}`;
    }
  },

  // 增量更新分析显示
  updateAnalysisDisplayIncremental(analysisData) {
    console.log('🔄 增量更新分析显示:', analysisData.id);

    // 更新分析结果区域
    const resultArea = document.getElementById('analysis-result');
    if (resultArea) {
      // 只更新结果内容，不重新渲染整个区域
      const newResultHTML = this.renderAnalysisResultItem(analysisData);

      // 使用DocumentFragment优化DOM操作
      const fragment = document.createDocumentFragment();
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = newResultHTML;

      while (tempDiv.firstChild) {
        fragment.appendChild(tempDiv.firstChild);
      }

      resultArea.appendChild(fragment);
    }

    // 更新统计信息
    this.updateAnalysisStats();
  },

  // 渲染单个分析结果项
  renderAnalysisResultItem(analysisData) {
    const confidenceClass = analysisData.confidence > 0.8 ? 'high' :
      analysisData.confidence > 0.5 ? 'medium' : 'low';

    return `
      <div class="analysis-result-item" data-analysis-id="${analysisData.id}">
        <div class="result-header">
          <span class="file-name">${analysisData.fileName}</span>
          <span class="analysis-time">${new Date(analysisData.analysisTime).toLocaleString()}</span>
        </div>
        <div class="result-content">
          <div class="watermark-status ${analysisData.hasWatermark ? 'has-watermark' : 'no-watermark'}">
            ${analysisData.hasWatermark ? '✅ 检测到水印' : '❌ 未检测到水印'}
          </div>
          ${analysisData.hasWatermark ? `
            <div class="watermark-details">
              <div class="watermark-content">内容: ${analysisData.watermarkContent}</div>
              <div class="confidence ${confidenceClass}">置信度: ${(analysisData.confidence * 100).toFixed(1)}%</div>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  },

  // 清理分析数据
  cleanupAnalysisData(analysisId) {
    if (this._analysisStatuses) {
      this._analysisStatuses.delete(analysisId);
    }

    // 清理临时文件引用
    if (this._tempFileReferences) {
      delete this._tempFileReferences[analysisId];
    }

    console.log('🧹 清理分析数据:', analysisId);
  },

  // 清理失败的分析
  async cleanupFailedAnalysis(analysisId) {
    try {
      // 删除可能已创建的临时数据
      if (this._analysisStatuses && this._analysisStatuses.has(analysisId)) {
        this._analysisStatuses.delete(analysisId);
      }

      // 清理UI显示
      const resultItem = document.querySelector(`[data-analysis-id="${analysisId}"]`);
      if (resultItem) {
        resultItem.remove();
      }

      console.log('🧹 清理失败分析:', analysisId);
    } catch (error) {
      console.warn('⚠️ 清理失败分析时出错:', error);
    }
  },

  // 分析错误
  analyzeError(error) {
    let userMessage = '未知错误';
    let category = 'unknown';

    if (error.message.includes('network') || error.message.includes('fetch')) {
      category = 'network';
      userMessage = '网络连接错误，请检查网络后重试';
    } else if (error.message.includes('timeout')) {
      category = 'timeout';
      userMessage = '分析超时，请重试或选择较小的文件';
    } else if (error.message.includes('size') || error.message.includes('memory')) {
      category = 'memory';
      userMessage = '文件过大或内存不足，请选择较小的文件';
    } else if (error.message.includes('format') || error.message.includes('type')) {
      category = 'format';
      userMessage = '文件格式不支持，请选择支持的文件类型';
    } else {
      userMessage = error.message;
    }

    return {
      category,
      message: error.message,
      userMessage
    };
  },

  // 更新分析显示
  updateAnalysisDisplay() {
    if (this.state.activeTab === 'analysis') {
      this.refreshTabContent('analysis');
    }
  },

  // 下载文本文件
  downloadTextFile(content, fileName) {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    this.downloadFile(url, fileName);
    URL.revokeObjectURL(url);
  },

  // 下载文件
  downloadFile(url, fileName) {
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  // 初始化搜索超时变量
  searchTimeout: null,

  // 显示消息
  showMessage(message, type = 'info') {
    let tip = document.getElementById('watermark-trace-tip');
    if (!tip) {
      tip = document.createElement('div');
      tip.id = 'watermark-trace-tip';
      tip.style.cssText = 'position:fixed;top:32px;right:32px;z-index:99999;background:rgba(0,0,0,0.75);color:#fff;padding:10px 24px;border-radius:4px;font-size:16px;box-shadow:0 2px 8px rgba(0,0,0,0.15);transition:all .3s;opacity:0;pointer-events:none;';
      document.body.appendChild(tip);
    }

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
    }, 3000);
  },

  // 下载文件
  downloadFile(url, fileName) {
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  },

  // ===== 数据链路优化方法 =====

  // 防抖数据更新
  debouncedDataUpdate(dataType, event) {
    // 清除之前的定时器
    if (this._debouncedHandlers.has(dataType)) {
      clearTimeout(this._debouncedHandlers.get(dataType));
    }

    // 设置新的防抖定时器
    const timeoutId = setTimeout(() => {
      this.handleDataUpdate(dataType, event);
      this._debouncedHandlers.delete(dataType);
    }, 300); // 300ms防抖

    this._debouncedHandlers.set(dataType, timeoutId);
  },

  // 设置内存监控
  setupMemoryMonitoring() {
    if (!performance.memory) return;

    // 每30秒检查一次内存使用
    this._memoryMonitorInterval = setInterval(() => {
      const memoryInfo = performance.memory;
      const usedMB = memoryInfo.usedJSHeapSize / 1024 / 1024;
      const limitMB = memoryInfo.jsHeapSizeLimit / 1024 / 1024;

      console.log(`💾 内存使用: ${usedMB.toFixed(1)}MB / ${limitMB.toFixed(1)}MB`);

      // 如果内存使用超过80%，触发清理
      if (usedMB / limitMB > 0.8) {
        console.warn('⚠️ 内存使用过高，开始清理...');
        this.performMemoryCleanup();
      }
    }, 30000);
  },

  // 执行内存清理
  performMemoryCleanup() {
    console.log('🧹 开始内存清理...');

    // 清理过期的分析状态
    if (this._analysisStatuses) {
      const now = Date.now();
      const expiredThreshold = 5 * 60 * 1000; // 5分钟

      for (const [id, status] of this._analysisStatuses.entries()) {
        if (now - status.timestamp > expiredThreshold) {
          this._analysisStatuses.delete(id);
          console.log('🧹 清理过期分析状态:', id);
        }
      }
    }

    // 清理临时文件引用
    if (this._tempFileReferences) {
      this._tempFileReferences = {};
    }

    // 清理DOM缓存
    this.clearDOMCache();

    // 强制垃圾回收（如果可用）
    if (window.gc) {
      window.gc();
      console.log('🧹 强制垃圾回收完成');
    }

    console.log('✅ 内存清理完成');
  },

  // 暂停后台任务
  pauseBackgroundTasks() {
    console.log('⏸️ 暂停后台任务');

    // 暂停内存监控
    if (this._memoryMonitorInterval) {
      clearInterval(this._memoryMonitorInterval);
      this._memoryMonitorInterval = null;
    }

    // 暂停其他后台任务
    this._backgroundTasksPaused = true;
  },

  // 恢复后台任务
  resumeBackgroundTasks() {
    console.log('▶️ 恢复后台任务');

    if (this._backgroundTasksPaused) {
      // 恢复内存监控
      this.setupMemoryMonitoring();

      this._backgroundTasksPaused = false;
    }
  },

  // 更新分析统计信息
  updateAnalysisStats() {
    if (!this.state.watermarkAnalysis) return;

    const stats = {
      total: this.state.watermarkAnalysis.length,
      hasWatermark: this.state.watermarkAnalysis.filter(a => a.hasWatermark).length,
      noWatermark: this.state.watermarkAnalysis.filter(a => !a.hasWatermark).length,
      highConfidence: this.state.watermarkAnalysis.filter(a => a.confidence > 0.8).length
    };

    // 更新统计显示
    const statsElements = {
      total: document.getElementById('stats-total'),
      hasWatermark: document.getElementById('stats-has-watermark'),
      noWatermark: document.getElementById('stats-no-watermark'),
      highConfidence: document.getElementById('stats-high-confidence')
    };

    Object.entries(stats).forEach(([key, value]) => {
      if (statsElements[key]) {
        statsElements[key].textContent = value;
      }
    });

    console.log('📊 更新分析统计:', stats);
  },

  // 批量处理数据更新
  batchDataUpdates(updates) {
    console.log('📦 批量处理数据更新:', updates.length);

    // 使用requestAnimationFrame批量更新DOM
    requestAnimationFrame(() => {
      updates.forEach(update => {
        this.handleDataUpdate(update.type, update.event);
      });
    });
  }
};

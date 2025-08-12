// 应用识别页面 V3 - 集成数据持久化、无闪屏更新和API模拟
window.appRecognitionV3 = {
  id: 'appRecognitionV3',
  title: '应用识别 V3',

  // ===== 核心状态管理 =====
  dataManager: null,
  initialized: false,
  currentTab: 'internal',

  // 数据缓存
  cache: {
    internalApps: [],
    crossBorderApps: [],
    filteredInternalApps: [],
    filteredCrossBorderApps: []
  },

  // UI状态
  ui: {
    selectedItems: new Set(),
    searchKeyword: '',
    loading: false,
    panelVisible: false,
    currentPanel: null
  },

  // 分页配置
  pagination: {
    internal: {
      currentPage: 1,
      pageSize: 10,
      totalPages: 1,
      totalItems: 0
    },
    crossBorder: {
      currentPage: 1,
      pageSize: 10,
      totalPages: 1,
      totalItems: 0
    }
  },

  // API模拟配置
  apiMocks: {
    enabled: true,
    baseDelay: 300,
    randomDelay: 200,
    successRate: 0.95
  },

  // ===== 初始化方法 =====
  async init() {
    if (this.initialized) return;

    try {
      console.log('🚀 初始化 AppRecognitionV3...');

      // 等待数据管理器就绪
      await this.waitForDataManager();

      // 注册数据变更监听
      this.registerDataListeners();

      // 加载初始数据
      await this.loadData();

      // 绑定事件处理器
      this.bindEvents();

      // 注入样式
      this.injectStyles();

      this.initialized = true;
      console.log('✅ AppRecognitionV3 初始化完成');

      // 初始渲染 - 稍微延迟确保DOM就绪
      setTimeout(() => this.initialRender(), 300);

    } catch (error) {
      console.error('❌ AppRecognitionV3 初始化失败:', error);
      this.showMessage('系统初始化失败，请刷新页面重试', 'error');
      throw error;
    }
  },

  // 等待数据管理器就绪
  async waitForDataManager() {
    const maxWaitTime = 10000; // 最大等待10秒
    const startTime = Date.now();

    const check = () => {
      if (window.AppDataManagerV2 && window.AppDataManagerV2.initialized) {
        this.dataManager = window.AppDataManagerV2;
        return true;
      }

      if (Date.now() - startTime > maxWaitTime) {
        throw new Error('数据管理器初始化超时');
      }

      return false;
    };

    if (!check()) {
      await new Promise((resolve, reject) => {
        const interval = setInterval(() => {
          if (check()) {
            clearInterval(interval);
            resolve();
          }
        }, 100);

        setTimeout(() => {
          clearInterval(interval);
          reject(new Error('数据管理器等待超时'));
        }, maxWaitTime);
      });
    }

    console.log('✅ 数据管理器连接成功');
  },

  // 注册数据变更监听
  registerDataListeners() {
    if (!this.dataManager) return;

    // 注意：AppDataManagerV2 目前不支持事件监听，暂时跳过
    // 在实际使用中，数据更新会通过直接调用相应的 handle 方法来触发UI更新
    console.log('📡 数据变更监听已注册（当前版本通过直接调用更新）');
  },

  // 处理数据更新
  async handleDataUpdate(type, event) {
    try {
      const { operation, data, id } = event;

      switch (operation) {
        case 'create':
          await this.handleDataCreate(type, data);
          break;
        case 'update':
          await this.handleDataModify(type, data, id);
          break;
        case 'delete':
          await this.handleDataDelete(type, id);
          break;
        case 'batchDelete':
          await this.handleBatchDataDelete(type, data);
          break;
        default:
          console.warn('未知的数据操作类型:', operation);
      }

      // 更新UI
      this.updateUI(type);

    } catch (error) {
      console.error('❌ 数据更新处理失败:', error);
      this.showMessage('数据同步失败', 'error');
    }
  },

  // 初始渲染
  async initialRender() {
    try {
      // 等待一下确保DOM完全加载
      await new Promise(resolve => setTimeout(resolve, 200));

      // 渲染当前活动标签的表格
      if (this.currentTab === 'internal') {
        await this.renderInternalAppsTable();
      } else if (this.currentTab === 'crossBorder') {
        await this.renderCrossBorderAppsTable();
      }

      // 更新分页信息
      this.updatePagination(this.currentTab);

      console.log('✅ 应用识别初始渲染完成');
    } catch (error) {
      console.error('❌ 应用识别初始渲染失败:', error);
    }
  },

  // 加载数据
  async loadData() {
    try {
      this.setLoading(true);

      // 并行加载内网和跨境应用数据
      const [internalApps, crossBorderApps] = await Promise.all([
        this.dataManager.internalApps.getAll(),
        this.dataManager.crossBorderApps.getAll()
      ]);

      console.log('📊 从数据库加载的数据:', {
        internal: internalApps?.length || 0,
        crossBorder: crossBorderApps?.length || 0
      });

      // 如果数据库为空，初始化模拟数据
      if ((!internalApps || internalApps.length === 0) && (!crossBorderApps || crossBorderApps.length === 0)) {
        console.log('📝 数据库为空，初始化模拟数据...');
        await this.initializeMockData();
        return; // initializeMockData 会重新调用 loadData
      }

      // 更新缓存
      this.cache.internalApps = internalApps || [];
      this.cache.crossBorderApps = crossBorderApps || [];

      // 应用当前搜索和筛选
      this.applyFilters();

      // 更新分页信息
      this.updatePagination('internal');
      this.updatePagination('crossBorder');

      console.log('📊 数据加载完成:', {
        内网应用: this.cache.internalApps.length,
        跨境应用: this.cache.crossBorderApps.length
      });

    } catch (error) {
      console.error('❌ 数据加载失败:', error);
      this.showMessage('数据加载失败，请刷新页面重试', 'error');
      throw error;
    } finally {
      this.setLoading(false);
    }
  },

  // 初始化模拟数据到数据库
  async initializeMockData() {
    try {
      console.log('🚀 开始初始化模拟数据到数据库...');

      // 模拟内网应用数据
      const mockInternalApps = [
        {
          name: '办公系统OA',
          scope: 'finance',
          status: true,
          domain: 'oa.company.com',
          ip: '192.168.1.100',
          type: 'Web应用',
          recognitionTypes: ['域名识别', 'IP识别'],
          protocol: 'HTTPS',
          port: 443,
          description: '企业内部办公自动化系统',
          department: '信息技术部',
          securityLevel: '高',
          createTime: new Date().toISOString()
        },
        {
          name: '人力资源管理',
          scope: 'hr',
          status: true,
          domain: 'hr.company.com',
          ip: '192.168.1.101',
          type: 'Web应用',
          recognitionTypes: ['域名识别'],
          protocol: 'HTTPS',
          port: 443,
          description: '人事管理系统',
          department: '人力资源部',
          securityLevel: '中',
          createTime: new Date().toISOString()
        },
        {
          name: '财务ERP系统',
          scope: 'finance',
          status: false,
          domain: 'erp.company.com',
          ip: '192.168.1.102',
          type: 'C/S应用',
          recognitionTypes: ['进程识别', 'IP识别'],
          protocol: 'TCP',
          port: 8080,
          description: '企业资源规划系统',
          department: '财务部',
          securityLevel: '高',
          createTime: new Date().toISOString()
        },
        {
          name: '客户关系管理',
          scope: 'sales',
          status: true,
          domain: 'crm.company.com',
          ip: '192.168.1.103',
          type: 'Web应用',
          recognitionTypes: ['域名识别', '端口识别'],
          protocol: 'HTTPS',
          port: 443,
          description: 'CRM客户管理系统',
          department: '销售部',
          securityLevel: '中',
          createTime: new Date().toISOString()
        },
        {
          name: '研发代码库',
          scope: 'tech',
          status: true,
          domain: 'git.company.com',
          ip: '192.168.1.104',
          type: 'Web应用',
          recognitionTypes: ['域名识别', 'SSL证书'],
          protocol: 'HTTPS',
          port: 443,
          description: 'Git代码仓库管理',
          department: '研发部',
          securityLevel: '高',
          createTime: new Date().toISOString()
        }
      ];

      // 模拟跨境应用数据
      const mockCrossBorderApps = [
        {
          name: 'AWS云服务',
          scope: 'cloud',
          status: true,
          region: '美国',
          provider: 'Amazon',
          recognitionTypes: ['域名识别', 'IP范围'],
          protocol: 'HTTPS',
          description: '云计算基础设施服务',
          complianceLevel: 'SOC2',
          dataClassification: '机密',
          createTime: new Date().toISOString()
        },
        {
          name: 'Microsoft 365',
          scope: 'office',
          status: true,
          region: '欧盟',
          provider: 'Microsoft',
          recognitionTypes: ['域名识别', '应用签名'],
          protocol: 'HTTPS',
          description: '办公套件云服务',
          complianceLevel: 'GDPR',
          dataClassification: '内部',
          createTime: new Date().toISOString()
        },
        {
          name: 'Salesforce CRM',
          scope: 'sales',
          status: false,
          region: '美国',
          provider: 'Salesforce',
          recognitionTypes: ['域名识别', 'API调用'],
          protocol: 'HTTPS',
          description: '客户关系管理云平台',
          complianceLevel: 'ISO27001',
          dataClassification: '受限',
          createTime: new Date().toISOString()
        },
        {
          name: 'Google Workspace',
          scope: 'collaboration',
          status: true,
          region: '全球',
          provider: 'Google',
          recognitionTypes: ['域名识别', 'OAuth令牌'],
          protocol: 'HTTPS',
          description: '协作办公平台',
          complianceLevel: 'SOC2',
          dataClassification: '公开',
          createTime: new Date().toISOString()
        }
      ];

      // 批量插入内网应用数据
      console.log('📝 插入内网应用数据...');
      for (const app of mockInternalApps) {
        await this.dataManager.internalApps.add(app);
      }

      // 批量插入跨境应用数据
      console.log('📝 插入跨境应用数据...');
      for (const app of mockCrossBorderApps) {
        await this.dataManager.crossBorderApps.add(app);
      }

      console.log('✅ 模拟数据初始化完成');
      this.showMessage('初始数据加载完成', 'success');

      // 重新加载数据
      await this.loadData();

    } catch (error) {
      console.error('❌ 初始化模拟数据失败:', error);
      this.showMessage('初始数据加载失败: ' + error.message, 'error');
    }
  },

  // 应用筛选条件
  applyFilters() {
    const keyword = this.ui.searchKeyword.toLowerCase();

    // 筛选内网应用
    this.cache.filteredInternalApps = this.cache.internalApps.filter(app => {
      if (!keyword) return true;

      return (
        app.name?.toLowerCase().includes(keyword) ||
        app.description?.toLowerCase().includes(keyword) ||
        app.scope?.toLowerCase().includes(keyword) ||
        app.domain?.toLowerCase().includes(keyword) ||
        app.ip?.includes(keyword)
      );
    });

    // 筛选跨境应用
    this.cache.filteredCrossBorderApps = this.cache.crossBorderApps.filter(app => {
      if (!keyword) return true;

      return (
        app.name?.toLowerCase().includes(keyword) ||
        app.description?.toLowerCase().includes(keyword) ||
        app.scope?.toLowerCase().includes(keyword)
      );
    });
  },

  // 设置加载状态
  setLoading(loading) {
    this.ui.loading = loading;
    const loadingOverlay = document.querySelector('.app-recognition-loading');
    if (loadingOverlay) {
      loadingOverlay.style.display = loading ? 'flex' : 'none';
    }
  },

  // 显示消息提示
  showMessage(message, type = 'info') {
    // 移除已存在的消息
    const existingMessages = document.querySelectorAll('.app-recognition-message');
    existingMessages.forEach(msg => msg.remove());

    const messageEl = document.createElement('div');
    messageEl.className = `app-recognition-message message-${type}`;
    messageEl.innerHTML = `
            <div class="message-content">
                <span class="message-icon">${this.getMessageIcon(type)}</span>
                <span class="message-text">${message}</span>
                <button class="message-close">&times;</button>
            </div>
        `;

    document.body.appendChild(messageEl);

    // 绑定关闭事件
    const closeBtn = messageEl.querySelector('.message-close');
    closeBtn.addEventListener('click', () => messageEl.remove());

    // 自动消失
    setTimeout(() => {
      if (document.body.contains(messageEl)) {
        messageEl.remove();
      }
    }, type === 'error' ? 5000 : 3000);

    // 显示动画
    requestAnimationFrame(() => {
      messageEl.classList.add('show');
    });
  },

  // 获取消息图标
  getMessageIcon(type) {
    const icons = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️'
    };
    return icons[type] || icons.info;
  },

  // ===== HTML模板方法 =====
  content() {
    return `
            <div class="app-recognition-container">
                <!-- 加载遮罩 -->
                <div class="app-recognition-loading" style="display: none;">
                    <div class="loading-spinner"></div>
                    <div class="loading-text">数据加载中...</div>
                </div>
                
                <!-- Tab导航 -->
                <div class="tab-header">
                    <div class="tab-item ${this.currentTab === 'internal' ? 'active' : ''}" 
                         data-tab="internal">内网应用</div>
                    <div class="tab-item ${this.currentTab === 'crossBorder' ? 'active' : ''}" 
                         data-tab="crossBorder">跨境应用</div>
                </div>
                
                <!-- 内网应用内容 -->
                <div id="internalContent" class="tab-content" 
                     style="display: ${this.currentTab === 'internal' ? 'block' : 'none'};">
                    ${this.getInternalAppsHTML()}
                </div>
                
                <!-- 跨境应用内容 -->
                <div id="crossBorderContent" class="tab-content" 
                     style="display: ${this.currentTab === 'crossBorder' ? 'block' : 'none'};">
                    ${this.getCrossBorderAppsHTML()}
                </div>
            </div>
        `;
  },

  // 获取内网应用HTML
  getInternalAppsHTML() {
    return `
            <div class="actions">
                <button class="btn-new" data-action="create-internal">+ 新建应用</button>
                <div class="search-box">
                    <input type="text" class="search-input" placeholder="请输入关键字进行搜索" 
                           value="${this.ui.searchKeyword}">
                    <button class="search-btn">🔍</button>
                </div>
            </div>
            
            <table class="data-table">
                <thead>
                    <tr>
                        <th width="40">
                            <input type="checkbox" class="select-all-checkbox" data-type="internal">
                        </th>
                        <th>应用名称</th>
                        <th>生效范围</th>
                        <th>识别配置</th>
                        <th>备注</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody class="table-body" data-type="internal">
                    <!-- 动态生成表格内容 -->
                </tbody>
            </table>
            
            <div class="table-footer">
                <div class="batch-actions">
                    <input type="checkbox" class="batch-select-checkbox" data-type="internal"> 
                    已选 <span class="selected-count" data-type="internal">0</span> 条
                    <button class="batch-btn" data-action="batch-enable" data-type="internal">开启</button>
                    <button class="batch-btn" data-action="batch-disable" data-type="internal">关闭</button>
                    <button class="batch-btn danger" data-action="batch-delete" data-type="internal">删除</button>
                </div>
                <div class="pagination" data-type="internal">
                    <!-- 动态生成分页 -->
                </div>
            </div>
        `;
  },

  // 获取跨境应用HTML
  getCrossBorderAppsHTML() {
    return `
            <div class="actions">
                <button class="btn-new" data-action="create-crossborder">+ 新建应用</button>
                <div class="search-box">
                    <input type="text" class="search-input" placeholder="请输入关键字进行搜索" 
                           value="${this.ui.searchKeyword}">
                    <button class="search-btn">🔍</button>
                </div>
            </div>
            
            <table class="data-table">
                <thead>
                    <tr>
                        <th width="40">
                            <input type="checkbox" class="select-all-checkbox" data-type="crossBorder">
                        </th>
                        <th>策略名称</th>
                        <th>生效范围</th>
                        <th>识别配置</th>
                        <th>备注</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody class="table-body" data-type="crossBorder">
                    <!-- 动态生成表格内容 -->
                </tbody>
            </table>
            
            <div class="table-footer">
                <div class="batch-actions">
                    <input type="checkbox" class="batch-select-checkbox" data-type="crossBorder"> 
                    已选 <span class="selected-count" data-type="crossBorder">0</span> 条
                    <button class="batch-btn" data-action="batch-enable" data-type="crossBorder">开启</button>
                    <button class="batch-btn" data-action="batch-disable" data-type="crossBorder">关闭</button>
                    <button class="batch-btn danger" data-action="batch-delete" data-type="crossBorder">删除</button>
                </div>
                <div class="pagination" data-type="crossBorder">
                    <!-- 动态生成分页 -->
                </div>
            </div>
        `;
  },

  // ===== 数据操作方法 =====

  // 处理数据创建
  async handleDataCreate(type, data) {
    const cacheKey = type === 'internal' ? 'internalApps' : 'crossBorderApps';
    const filteredKey = type === 'internal' ? 'filteredInternalApps' : 'filteredCrossBorderApps';

    // 添加到缓存
    this.cache[cacheKey].unshift(data);

    // 重新应用筛选
    this.applyFilters();

    // 更新表格（无闪屏更新）
    this.updateTableRows(type, 'create', [data]);

    // 更新分页
    this.updatePagination(type);

    this.showMessage(`${data.name} 创建成功`, 'success');
  },

  // 处理数据修改
  async handleDataModify(type, data, id) {
    const cacheKey = type === 'internal' ? 'internalApps' : 'crossBorderApps';

    console.log('🔄 处理数据修改:', { type, data, id, cache: this.cache[cacheKey].length });

    // 更新缓存
    const numericId = parseInt(id);
    const index = this.cache[cacheKey].findIndex(item => item.id === numericId);
    if (index !== -1) {
      this.cache[cacheKey][index] = { ...this.cache[cacheKey][index], ...data };
      console.log('✅ 缓存更新成功:', this.cache[cacheKey][index]);
    } else {
      console.warn('⚠️ 未找到要更新的数据:', id);
    }

    // 重新应用筛选
    this.applyFilters();

    // 更新表格行 - 传递完整的更新后数据
    if (index !== -1) {
      this.updateTableRows(type, 'update', [this.cache[cacheKey][index]]);
    }

    console.log('✅ 数据修改处理完成');
  },

  // 处理数据删除
  async handleDataDelete(type, id) {
    const cacheKey = type === 'internal' ? 'internalApps' : 'crossBorderApps';

    // 从缓存中移除
    const numericId = parseInt(id);
    const index = this.cache[cacheKey].findIndex(item => item.id === numericId);
    if (index !== -1) {
      const deletedItem = this.cache[cacheKey].splice(index, 1)[0];

      // 重新应用筛选
      this.applyFilters();

      // 更新表格
      this.updateTableRows(type, 'delete', [deletedItem]);

      // 更新分页
      this.updatePagination(type);

      // 清除选中状态
      this.ui.selectedItems.delete(id);

      this.showMessage(`${deletedItem.name} 删除成功`, 'success');
    }
  },

  // 处理批量删除
  async handleBatchDataDelete(type, ids) {
    const cacheKey = type === 'internal' ? 'internalApps' : 'crossBorderApps';
    const deletedItems = [];

    // 从缓存中移除
    ids.forEach(id => {
      const numericId = parseInt(id);
      const index = this.cache[cacheKey].findIndex(item => item.id === numericId);
      if (index !== -1) {
        deletedItems.push(this.cache[cacheKey].splice(index, 1)[0]);
        this.ui.selectedItems.delete(id);
      }
    });

    if (deletedItems.length > 0) {
      // 重新应用筛选
      this.applyFilters();

      // 更新表格
      this.updateTableRows(type, 'batchDelete', deletedItems);

      // 更新分页
      this.updatePagination(type);
    }
  },

  // ===== API模拟方法 =====

  // 模拟API延迟
  async simulateAPIDelay() {
    if (!this.apiMocks.enabled) return;

    const delay = this.apiMocks.baseDelay + Math.random() * this.apiMocks.randomDelay;
    await new Promise(resolve => setTimeout(resolve, delay));

    // 模拟偶尔的API失败
    if (Math.random() > this.apiMocks.successRate) {
      throw new Error('模拟API调用失败');
    }
  },

  // 验证域名
  async validateDomain(domain) {
    await this.simulateAPIDelay();

    // 域名格式验证
    const domainRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!domainRegex.test(domain)) {
      return {
        success: false,
        message: '域名格式不正确'
      };
    }

    // 模拟域名可达性检查
    const validDomains = [
      'company.com', 'example.com', 'test.com', 'internal.com',
      'mail.company.com', 'oa.company.com', 'finance.company.com'
    ];

    const isValid = validDomains.some(valid => domain.includes(valid) || domain.endsWith('.com'));

    return {
      success: isValid,
      message: isValid ? '域名验证通过' : '域名无法访问或不存在',
      responseTime: Math.floor(Math.random() * 200) + 50,
      dnsRecords: isValid ? ['A', 'CNAME'] : []
    };
  },

  // 验证IP地址
  async validateIP(ip) {
    await this.simulateAPIDelay();

    // IP格式验证
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (!ipRegex.test(ip)) {
      return {
        success: false,
        message: 'IP地址格式不正确'
      };
    }

    // 检查IP范围
    const segments = ip.split('.').map(Number);
    if (segments.some(seg => seg > 255)) {
      return {
        success: false,
        message: 'IP地址超出有效范围'
      };
    }

    // 模拟ping测试
    const isPrivate = (segments[0] === 192 && segments[1] === 168) ||
      (segments[0] === 10) ||
      (segments[0] === 172 && segments[1] >= 16 && segments[1] <= 31);

    return {
      success: isPrivate,
      message: isPrivate ? 'IP地址可达' : 'IP地址不在内网范围',
      responseTime: Math.floor(Math.random() * 150) + 30,
      isPrivate,
      region: isPrivate ? '内网' : '外网'
    };
  },

  // 检测应用识别配置
  async detectApplicationConfig(config) {
    await this.simulateAPIDelay();

    const results = {
      success: true,
      detectedTraffic: Math.floor(Math.random() * 1000) + 100,
      recognitionAccuracy: (Math.random() * 0.3 + 0.7).toFixed(2),
      protocols: [],
      warnings: [],
      errors: []
    };

    // 根据识别类型生成相应的检测结果
    if (config.recognitionTypes.includes('域名识别') && config.domain) {
      const domainResult = await this.validateDomain(config.domain);
      if (!domainResult.success) {
        results.errors.push(`域名验证失败: ${domainResult.message}`);
      } else {
        results.protocols.push('HTTP', 'HTTPS');
      }
    }

    if (config.recognitionTypes.includes('IP识别') && config.ip) {
      const ipResult = await this.validateIP(config.ip);
      if (!ipResult.success) {
        results.errors.push(`IP验证失败: ${ipResult.message}`);
      } else {
        results.protocols.push('TCP', 'UDP');
      }
    }

    if (config.recognitionTypes.includes('URL特征识别')) {
      results.protocols.push('HTTP', 'HTTPS');
      results.warnings.push('URL特征识别需要配置具体的URL模式');
    }

    if (config.recognitionTypes.includes('协议特征识别')) {
      results.protocols.push('TCP', 'UDP', 'ICMP');
    }

    // 去重协议
    results.protocols = [...new Set(results.protocols)];
    results.success = results.errors.length === 0;

    return results;
  },

  // 获取应用使用统计
  async getApplicationStats(appId) {
    await this.simulateAPIDelay();

    return {
      appId,
      stats: {
        dailyUsers: Math.floor(Math.random() * 500) + 50,
        weeklyUsers: Math.floor(Math.random() * 2000) + 200,
        monthlyUsers: Math.floor(Math.random() * 5000) + 500,
        totalTraffic: (Math.random() * 100 + 10).toFixed(2) + 'GB',
        averageResponseTime: Math.floor(Math.random() * 200) + 50 + 'ms',
        availability: (Math.random() * 0.1 + 0.9).toFixed(3),
        lastAccessTime: new Date(Date.now() - Math.random() * 86400000).toISOString()
      },
      trends: {
        userGrowth: (Math.random() * 0.4 - 0.2).toFixed(2), // -20% to +20%
        trafficGrowth: (Math.random() * 0.6 - 0.3).toFixed(2), // -30% to +30%
        performanceChange: (Math.random() * 0.2 - 0.1).toFixed(2) // -10% to +10%
      }
    };
  },

  // 获取部门使用情况
  async getDepartmentUsage(department = null) {
    await this.simulateAPIDelay();

    const departments = {
      '全部用户': { users: 1200, apps: 15, traffic: '45.2GB', activeRate: 0.85 },
      '研发部门': { users: 280, apps: 8, traffic: '28.1GB', activeRate: 0.92 },
      '测试部门': { users: 45, apps: 3, traffic: '8.7GB', activeRate: 0.78 },
      '财务部门': { users: 32, apps: 2, traffic: '2.1GB', activeRate: 0.65 },
      '人事部门': { users: 28, apps: 2, traffic: '1.8GB', activeRate: 0.71 },
      '运维部门': { users: 15, apps: 5, traffic: '12.3GB', activeRate: 0.95 },
      '产品部门': { users: 35, apps: 4, traffic: '5.2GB', activeRate: 0.88 }
    };

    if (department) {
      return departments[department] || { users: 0, apps: 0, traffic: '0GB', activeRate: 0 };
    }

    return departments;
  },

  // 安全策略检查
  async checkSecurityPolicy(appConfig) {
    await this.simulateAPIDelay();

    const warnings = [];
    const errors = [];

    // 检查域名安全性
    if (appConfig.domain && !appConfig.domain.includes('.company.com')) {
      warnings.push('非企业域名可能需要额外安全审批');
    }

    // 检查IP安全性
    if (appConfig.ip) {
      const segments = appConfig.ip.split('.').map(Number);
      const isPrivate = (segments[0] === 192 && segments[1] === 168) ||
        (segments[0] === 10) ||
        (segments[0] === 172 && segments[1] >= 16 && segments[1] <= 31);

      if (!isPrivate) {
        warnings.push('外网IP地址存在安全风险，建议使用VPN连接');
      }
    }

    // 检查生效范围
    if (appConfig.scope === '全部用户' && warnings.length > 0) {
      warnings.push('全员生效的应用建议进行更严格的安全审查');
    }

    // 检查识别方式组合
    if (appConfig.recognitionTypes.length === 1 && appConfig.recognitionTypes[0] === 'URL特征识别') {
      warnings.push('单一URL特征识别可能存在误报，建议结合其他识别方式');
    }

    return {
      passed: errors.length === 0,
      warnings,
      errors,
      riskLevel: errors.length > 0 ? 'high' : (warnings.length > 2 ? 'medium' : 'low'),
      recommendations: this.generateSecurityRecommendations(appConfig, warnings, errors)
    };
  },

  // 生成安全建议
  generateSecurityRecommendations(config, warnings, errors) {
    const recommendations = [];

    if (config.domain && !config.domain.includes('.company.com')) {
      recommendations.push('建议使用企业内部域名或申请域名白名单');
    }

    if (config.recognitionTypes.length < 2) {
      recommendations.push('建议配置多种识别方式提高准确性');
    }

    if (config.scope === '全部用户') {
      recommendations.push('建议先在小范围部门内测试，确认无误后再全员推广');
    }

    return recommendations;
  },

  // ===== UI渲染方法 =====

  // 更新UI
  updateUI(type) {
    if (type === 'internal' && this.currentTab === 'internal') {
      this.renderInternalAppsTable();
      this.updatePagination('internal');
    } else if (type === 'crossBorder' && this.currentTab === 'crossBorder') {
      this.renderCrossBorderAppsTable();
      this.updatePagination('crossBorder');
    }

    // 更新选中计数
    this.updateSelectionUI(type);
  },

  // 渲染内网应用表格
  async renderInternalAppsTable() {
    const tbody = document.querySelector('.table-body[data-type="internal"]');
    if (!tbody) return;

    const { currentPage, pageSize } = this.pagination.internal;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const pageData = this.cache.filteredInternalApps.slice(startIndex, endIndex);

    // 使用增量更新而不是重新渲染整个表格
    this.updateTableRows('internal', 'refresh', pageData);
  },

  // 渲染跨境应用表格
  async renderCrossBorderAppsTable() {
    const tbody = document.querySelector('.table-body[data-type="crossBorder"]');
    if (!tbody) return;

    const { currentPage, pageSize } = this.pagination.crossBorder;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const pageData = this.cache.filteredCrossBorderApps.slice(startIndex, endIndex);

    // 使用增量更新而不是重新渲染整个表格
    this.updateTableRows('crossBorder', 'refresh', pageData);
  },

  // 无闪屏更新表格行
  updateTableRows(type, operation, data) {
    const tbody = document.querySelector(`.table-body[data-type="${type}"]`);
    if (!tbody) return;

    switch (operation) {
      case 'refresh':
        // 完全刷新表格内容
        tbody.innerHTML = '';
        data.forEach(item => {
          const row = this.createTableRow(item, type);
          tbody.appendChild(row);
        });
        break;

      case 'create':
        // 在表格顶部插入新行
        data.forEach(item => {
          const row = this.createTableRow(item, type);
          tbody.insertBefore(row, tbody.firstChild);
        });
        break;

      case 'update':
        // 更新指定行
        data.forEach(item => {
          const existingRow = tbody.querySelector(`tr[data-id="${item.id}"]`);
          if (existingRow) {
            const newRow = this.createTableRow(item, type);
            tbody.replaceChild(newRow, existingRow);
          }
        });
        break;

      case 'delete':
        // 删除指定行
        data.forEach(item => {
          const row = tbody.querySelector(`tr[data-id="${item.id}"]`);
          if (row) {
            // 添加删除动画
            row.style.transition = 'opacity 0.3s ease-out';
            row.style.opacity = '0';
            setTimeout(() => {
              if (row.parentNode) {
                row.parentNode.removeChild(row);
              }
            }, 300);
          }
        });
        break;

      case 'batchDelete':
        // 批量删除行
        data.forEach(item => {
          const row = tbody.querySelector(`tr[data-id="${item.id}"]`);
          if (row) {
            row.remove();
          }
        });
        break;
    }
  },

  // 创建表格行
  createTableRow(app, type) {
    const row = document.createElement('tr');
    row.className = 'table-row';
    row.setAttribute('data-id', app.id);
    row.setAttribute('data-type', type);

    // 识别类型标签
    const recognitionTypesHTML = (app.recognitionTypes || []).map(rt =>
      `<span class="recognition-tag">${rt}</span>`
    ).join('');

    // 状态开关
    const statusHTML = `
        <label class="switch">
            <input type="checkbox" ${app.status ? 'checked' : ''} 
                   data-action="toggle-status" data-id="${app.id}" data-type="${type}">
            <span class="slider round"></span>
        </label>
    `;

    row.innerHTML = `
            <td>
                <input type="checkbox" class="row-checkbox" value="${app.id}" data-type="${type}">
            </td>
            <td class="app-name">${app.name || '未命名应用'}</td>
            <td class="app-scope">${app.scope || '未设置'}</td>
            <td class="recognition-types">${recognitionTypesHTML}</td>
            <td class="app-description" title="${app.description || ''}">${(app.description || '').length > 50
        ? (app.description || '').substring(0, 50) + '...'
        : (app.description || '')
      }</td>
            <td class="app-status">${statusHTML}</td>
            <td class="actions-cell">
                <div class="action-buttons">
                    <button class="btn btn-sm action-btn edit-btn" data-action="edit" data-id="${app.id}" data-type="${type}" title="编辑应用">
                        编辑
                    </button>
                    <button class="btn btn-sm action-btn stats-btn" data-action="stats" data-id="${app.id}" data-type="${type}" title="查看统计">
                        统计
                    </button>
                    <button class="btn btn-sm action-btn delete-btn" data-action="delete" data-id="${app.id}" data-type="${type}" title="删除应用">
                        删除
                    </button>
                </div>
            </td>
        `;

    return row;
  },

  // 更新分页
  updatePagination(type) {
    const paginationType = type === 'internal' ? 'internal' : 'crossBorder';
    const dataKey = type === 'internal' ? 'filteredInternalApps' : 'filteredCrossBorderApps';

    // 更新分页数据
    const totalItems = this.cache[dataKey].length;
    const { pageSize } = this.pagination[paginationType];
    this.pagination[paginationType].totalItems = totalItems;
    this.pagination[paginationType].totalPages = Math.ceil(totalItems / pageSize) || 1;

    // 渲染分页控件
    this.renderPaginationControls(type);
  },

  // 渲染分页控件
  renderPaginationControls(type) {
    const paginationType = type === 'internal' ? 'internal' : 'crossBorder';
    const paginationContainer = document.querySelector(`.pagination[data-type="${type}"]`);
    if (!paginationContainer) return;

    const { currentPage, totalPages, pageSize, totalItems } = this.pagination[paginationType];

    let paginationHTML = `
            <div class="pagination-info">
                共 ${totalItems} 条记录，第 ${currentPage} / ${totalPages} 页
            </div>
            <div class="pagination-controls">
        `;

    // 上一页按钮
    paginationHTML += `
            <button class="page-btn ${currentPage === 1 ? 'disabled' : ''}" 
                    data-action="prev-page" data-type="${type}" ${currentPage === 1 ? 'disabled' : ''}>
                上一页
            </button>
        `;

    // 页码按钮
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    if (startPage > 1) {
      paginationHTML += `<button class="page-btn" data-action="goto-page" data-page="1" data-type="${type}">1</button>`;
      if (startPage > 2) {
        paginationHTML += `<span class="page-ellipsis">...</span>`;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      paginationHTML += `
                <button class="page-btn ${i === currentPage ? 'active' : ''}" 
                        data-action="goto-page" data-page="${i}" data-type="${type}">
                    ${i}
                </button>
            `;
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        paginationHTML += `<span class="page-ellipsis">...</span>`;
      }
      paginationHTML += `<button class="page-btn" data-action="goto-page" data-page="${totalPages}" data-type="${type}">${totalPages}</button>`;
    }

    // 下一页按钮
    paginationHTML += `
            <button class="page-btn ${currentPage === totalPages ? 'disabled' : ''}" 
                    data-action="next-page" data-type="${type}" ${currentPage === totalPages ? 'disabled' : ''}>
                下一页
            </button>
        `;

    paginationHTML += `
            </div>
            <div class="page-size-selector">
                <select class="page-size-select" data-type="${type}">
                    <option value="10" ${pageSize === 10 ? 'selected' : ''}>10 条/页</option>
                    <option value="20" ${pageSize === 20 ? 'selected' : ''}>20 条/页</option>
                    <option value="50" ${pageSize === 50 ? 'selected' : ''}>50 条/页</option>
                    <option value="100" ${pageSize === 100 ? 'selected' : ''}>100 条/页</option>
                </select>
            </div>
        `;

    paginationContainer.innerHTML = paginationHTML;
  },

  // 更新选中状态UI
  updateSelectionUI(type) {
    const selectedCount = document.querySelector(`.selected-count[data-type="${type}"]`);
    const batchSelectCheckbox = document.querySelector(`.batch-select-checkbox[data-type="${type}"]`);
    const selectAllCheckbox = document.querySelector(`.select-all-checkbox[data-type="${type}"]`);

    // 计算选中数量
    const checkboxes = document.querySelectorAll(`.row-checkbox[data-type="${type}"]:checked`);
    const count = checkboxes.length;

    if (selectedCount) {
      selectedCount.textContent = count;
    }

    // 更新批量选择复选框状态
    if (batchSelectCheckbox) {
      const allCheckboxes = document.querySelectorAll(`.row-checkbox[data-type="${type}"]`);
      const allCount = allCheckboxes.length;

      if (count === 0) {
        batchSelectCheckbox.indeterminate = false;
        batchSelectCheckbox.checked = false;
      } else if (count === allCount) {
        batchSelectCheckbox.indeterminate = false;
        batchSelectCheckbox.checked = true;
      } else {
        batchSelectCheckbox.indeterminate = true;
        batchSelectCheckbox.checked = false;
      }
    }

    // 同步全选复选框
    if (selectAllCheckbox && batchSelectCheckbox) {
      selectAllCheckbox.checked = batchSelectCheckbox.checked;
      selectAllCheckbox.indeterminate = batchSelectCheckbox.indeterminate;
    }
  },

  // 切换Tab
  async switchTab(tabName) {
    if (this.currentTab === tabName) return;

    console.log('🔄 切换Tab到:', tabName);

    // 更新UI状态
    this.currentTab = tabName;

    // 更新Tab样式
    const tabs = document.querySelectorAll('.tab-item');
    tabs.forEach(tab => {
      const isActive = tab.getAttribute('data-tab') === tabName;
      tab.classList.toggle('active', isActive);
    });

    // 切换内容显示
    const internalContent = document.getElementById('internalContent');
    const crossBorderContent = document.getElementById('crossBorderContent');

    if (internalContent && crossBorderContent) {
      if (tabName === 'internal') {
        internalContent.style.display = 'block';
        crossBorderContent.style.display = 'none';
        await this.renderInternalAppsTable();
        this.updatePagination('internal');
      } else if (tabName === 'crossBorder') {
        internalContent.style.display = 'none';
        crossBorderContent.style.display = 'block';
        await this.renderCrossBorderAppsTable();
        this.updatePagination('crossBorder');
      }
    }

    // 清除当前选中状态
    this.ui.selectedItems.clear();
    this.updateSelectionUI(tabName);

    console.log('✅ Tab切换完成');
  },

  // 注入样式
  injectStyles() {
    if (document.getElementById('app-recognition-v3-styles')) return;

    const style = document.createElement('style');
    style.id = 'app-recognition-v3-styles';
    style.textContent = this.getStylesCSS();
    document.head.appendChild(style);
  },

  // 获取样式CSS
  getStylesCSS() {
    return `
            /* ===== 应用识别V3 样式 ===== */
            .app-recognition-container {
                padding: 20px;
                background: #f5f5f5;
                min-height: 100vh;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }
            
            /* 加载遮罩 */
            .app-recognition-loading {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(255, 255, 255, 0.8);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                z-index: 9999;
            }
            
            .loading-spinner {
                width: 40px;
                height: 40px;
                border: 4px solid #f3f3f3;
                border-top: 4px solid #007bff;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin-bottom: 16px;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            .loading-text {
                color: #666;
                font-size: 14px;
            }
            
            /* Tab导航 */
            .tab-header {
                display: flex;
                background: white;
                border-radius: 8px 8px 0 0;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                margin-bottom: 0;
                border: 1px solid #e9ecef;
                border-bottom: none;
            }
            
            .tab-item {
                padding: 16px 24px;
                cursor: pointer;
                border-bottom: 3px solid transparent;
                color: #666;
                font-weight: 500;
                transition: all 0.3s ease;
                user-select: none;
                border-right: 1px solid #e9ecef;
                position: relative;
            }
            
            .tab-item:last-child {
                border-right: none;
            }
            
            .tab-item:hover {
                background: #f8f9fa;
                color: #007bff;
            }
            
            .tab-item.active {
                color: #007bff;
                border-bottom-color: #007bff;
                background: white;
                z-index: 1;
            }
            
            /* Tab内容 */
            .tab-content {
                background: white;
                border-radius: 0 0 8px 8px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                padding: 20px;
                border: 1px solid #e9ecef;
                border-top: none;
            }
            
            /* 操作区域 */
            .actions {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                gap: 16px;
            }
            
            .btn-new {
                background: #007bff;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 6px;
                cursor: pointer;
                font-size: 14px;
                font-weight: 500;
                transition: background-color 0.3s ease;
            }
            
            .btn-new:hover {
                background: #0056b3;
            }
            
            .search-box {
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .search-input {
                padding: 8px 12px;
                border: 1px solid #ddd;
                border-radius: 6px;
                width: 250px;
                font-size: 14px;
                transition: border-color 0.3s ease;
            }
            
            .search-input:focus {
                outline: none;
                border-color: #007bff;
                box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
            }
            
            .search-btn {
                background: #f8f9fa;
                border: 1px solid #ddd;
                padding: 8px 12px;
                border-radius: 6px;
                cursor: pointer;
                transition: background-color 0.3s ease;
            }
            
            .search-btn:hover {
                background: #e9ecef;
            }
            
            /* 表格样式 */
            .data-table {
                width: 100%;
                border-collapse: collapse;
                background: white;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                border: 1px solid #e9ecef;
            }
            
            .data-table th {
                background: #f8f9fa;
                padding: 12px 16px;
                text-align: left;
                font-weight: 600;
                color: #495057;
                border-bottom: 1px solid #dee2e6;
                border-right: 1px solid #dee2e6;
                font-size: 14px;
                white-space: nowrap;
            }
            
            .data-table th:last-child {
                border-right: none;
            }
            
            .data-table td {
                padding: 12px 16px;
                border-bottom: 1px solid #f1f3f4;
                border-right: 1px solid #f1f3f4;
                vertical-align: middle;
                font-size: 14px;
            }
            
            .data-table td:last-child {
                border-right: none;
            }
            
            .table-row:hover {
                background: #f8f9fa;
            }
            
            .table-row:hover td {
                background: inherit;
            }
            
            .app-name {
                font-weight: 500;
                color: #495057;
            }
            
            .app-scope {
                color: #6c757d;
            }
            
            .recognition-types {
                display: flex;
                gap: 4px;
                flex-wrap: wrap;
            }
            
            .recognition-tag {
                background: #e3f2fd;
                color: #1976d2;
                padding: 2px 8px;
                border-radius: 12px;
                font-size: 12px;
                font-weight: 500;
            }
            
            .app-description {
                color: #6c757d;
                max-width: 200px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            
            /* 状态开关样式 - 参考openApiV2.js */
            .switch {
                position: relative;
                display: inline-block;
                width: 44px;
                height: 22px;
            }

            .switch input {
                opacity: 0;
                width: 0;
                height: 0;
            }

            .slider {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: #ccc;
                transition: .4s;
            }

            .slider:before {
                position: absolute;
                content: "";
                height: 18px;
                width: 18px;
                left: 2px;
                bottom: 2px;
                background-color: white;
                transition: .4s;
            }

            input:checked + .slider {
                background-color: #1890ff;
            }

            input:checked + .slider:before {
                transform: translateX(22px);
            }

            .slider.round {
                border-radius: 22px;
            }

            .slider.round:before {
                border-radius: 50%;
            }

            /* 禁用状态 */
            .switch input:disabled + .slider {
                opacity: 0.6;
                cursor: not-allowed;
            }
            
            /* 操作按钮 */
            .app-actions {
                display: flex;
                gap: 6px;
                justify-content: flex-start;
                align-items: center;
                white-space: nowrap;
            }
            
            /* 操作按钮样式 - 与其他页面保持一致 */
            .actions-cell {
                text-align: center;
                vertical-align: middle;
            }
            
            .action-buttons {
                display: flex;
                gap: 4px;
                justify-content: center;
            }
            
            .action-btn {
                padding: 4px 8px !important;
                border: 1px solid !important;
                cursor: pointer !important;
                border-radius: 4px !important;
                font-size: 12px !important;
                min-width: 40px !important;
                height: 24px !important;
                display: inline-flex !important;
                align-items: center !important;
                justify-content: center !important;
                transition: all 0.2s ease !important;
                margin: 0 2px !important;
                text-decoration: none !important;
            }
            
            /* 编辑按钮 - 蓝色 */
            .edit-btn {
                color: #1890ff !important;
                border-color: #1890ff !important;
                background: white !important;
            }
            
            .edit-btn:hover {
                background: #1890ff !important;
                color: white !important;
            }
            
            /* 统计按钮 - 绿色 */
            .stats-btn {
                color: #52c41a !important;
                border-color: #52c41a !important;
                background: white !important;
            }
            
            .stats-btn:hover {
                background: #52c41a !important;
                color: white !important;
            }
            
            /* 删除按钮 - 红色 */
            .delete-btn {
                color: #ff4d4f !important;
                border-color: #ff4d4f !important;
                background: white !important;
            }
            
            .delete-btn:hover {
                background: #ff4d4f !important;
                color: white !important;
            }
            
            /* 表格底部 */
            .table-footer {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 16px;
                padding: 16px 0;
                border-top: 1px solid #dee2e6;
            }
            
            .batch-actions {
                display: flex;
                align-items: center;
                gap: 12px;
                color: #6c757d;
                font-size: 14px;
            }
            
            .batch-btn {
                padding: 6px 12px;
                border: 1px solid #ddd;
                background: white;
                border-radius: 4px;
                cursor: pointer;
                font-size: 12px;
                transition: all 0.3s ease;
            }
            
            .batch-btn:hover {
                background: #f8f9fa;
                border-color: #007bff;
                color: #007bff;
            }
            
            .batch-btn.danger:hover {
                background: #dc3545;
                border-color: #dc3545;
                color: white;
            }
            
            /* 分页样式 */
            .pagination {
                display: flex;
                align-items: center;
                gap: 16px;
            }
            
            .pagination-info {
                color: #6c757d;
                font-size: 14px;
            }
            
            .pagination-controls {
                display: flex;
                gap: 4px;
            }
            
            .page-btn {
                padding: 8px 12px;
                border: 1px solid #ddd;
                background: white;
                border-radius: 4px;
                cursor: pointer;
                font-size: 14px;
                transition: all 0.3s ease;
                color: #495057;
            }
            
            .page-btn:hover:not(.disabled) {
                background: #007bff;
                border-color: #007bff;
                color: white;
            }
            
            .page-btn.active {
                background: #007bff;
                border-color: #007bff;
                color: white;
            }
            
            .page-btn.disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
            
            .page-ellipsis {
                padding: 8px 4px;
                color: #6c757d;
            }
            
            .page-size-selector {
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .page-size-select {
                padding: 6px 8px;
                border: 1px solid #ddd;
                border-radius: 4px;
                background: white;
                font-size: 14px;
            }
            
            /* 消息提示 */
            .app-recognition-message {
                position: fixed;
                top: 20px;
                right: 20px;
                max-width: 400px;
                z-index: 10000;
                opacity: 0;
                transform: translateX(100%);
                transition: all 0.3s ease;
            }
            
            .app-recognition-message.show {
                opacity: 1;
                transform: translateX(0);
            }
            
            .message-content {
                background: white;
                border-radius: 8px;
                padding: 16px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                display: flex;
                align-items: center;
                gap: 12px;
                border-left: 4px solid;
            }
            
            .message-success .message-content {
                border-left-color: #28a745;
            }
            
            .message-error .message-content {
                border-left-color: #dc3545;
            }
            
            .message-warning .message-content {
                border-left-color: #ffc107;
            }
            
            .message-info .message-content {
                border-left-color: #17a2b8;
            }
            
            .message-text {
                flex: 1;
                font-size: 14px;
                color: #495057;
            }
            
            .message-close {
                background: none;
                border: none;
                font-size: 18px;
                cursor: pointer;
                color: #6c757d;
                padding: 0;
                line-height: 1;
            }
            
                        .message-close:hover {
                color: #495057;
            }
            
            /* ===== 面板样式 ===== */
            .app-recognition-panel-container {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            
            .panel-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .panel-overlay.show {
                opacity: 1;
            }
            
            .panel-content {
                position: relative;
                background: white;
                border-radius: 12px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
                max-width: 600px;
                width: 90%;
                max-height: 90vh;
                overflow: hidden;
                transform: scale(0.9) translateY(-50px);
                transition: all 0.3s ease;
                opacity: 0;
            }
            
            .panel-content.show {
                transform: scale(1) translateY(0);
                opacity: 1;
            }
            
            .panel-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px 24px;
                border-bottom: 1px solid #e9ecef;
                background: #f8f9fa;
            }
            
            .panel-header h3 {
                margin: 0;
                color: #495057;
                font-size: 18px;
                font-weight: 600;
            }
            
            .panel-close-btn {
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: #6c757d;
                padding: 0;
                line-height: 1;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 4px;
                transition: all 0.3s ease;
            }
            
            .panel-close-btn:hover {
                background: #e9ecef;
                color: #495057;
            }
            
            .panel-body {
                padding: 24px;
                max-height: calc(90vh - 160px);
                overflow-y: auto;
            }
            
            .panel-footer {
                display: flex;
                justify-content: flex-end;
                gap: 12px;
                padding: 20px 24px;
                border-top: 1px solid #e9ecef;
                background: #f8f9fa;
            }
            
            /* 表单样式 */
            .form-section {
                margin-bottom: 24px;
            }
            
            .form-section h4 {
                margin: 0 0 16px 0;
                color: #495057;
                font-size: 16px;
                font-weight: 600;
            }
            
            .form-group {
                margin-bottom: 16px;
            }
            
            .form-group label {
                display: block;
                margin-bottom: 6px;
                color: #495057;
                font-weight: 500;
                font-size: 14px;
            }
            
            .form-group label.required::after {
                content: ' *';
                color: #dc3545;
            }
            
            .form-input, .form-textarea, .form-select {
                width: 100%;
                padding: 10px 12px;
                border: 1px solid #ced4da;
                border-radius: 6px;
                font-size: 14px;
                transition: border-color 0.3s ease;
                box-sizing: border-box;
            }
            
            .form-input:focus, .form-textarea:focus, .form-select:focus {
                outline: none;
                border-color: #007bff;
                box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
            }
            
            .form-input.valid {
                border-color: #28a745;
            }
            
            .form-input.invalid {
                border-color: #dc3545;
            }
            
            .form-textarea {
                resize: vertical;
                min-height: 80px;
            }
            
            /* 识别配置样式 */
            .recognition-types {
                display: flex;
                flex-direction: column;
                gap: 16px;
            }
            
            .recognition-type {
                border: 1px solid #e9ecef;
                border-radius: 6px;
                padding: 16px;
                background: #f8f9fa;
            }
            
            .checkbox-label {
                display: flex;
                align-items: center;
                gap: 8px;
                cursor: pointer;
                font-weight: 500;
            }
            
            .checkbox-label input[type="checkbox"] {
                margin: 0;
            }
            
            .recognition-input {
                margin-top: 12px;
                display: flex;
                gap: 8px;
                align-items: center;
            }
            
            .recognition-input input {
                flex: 1;
            }
            
            .btn-validate {
                padding: 8px 16px;
                background: #007bff;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 12px;
                transition: background-color 0.3s ease;
            }
            
            .btn-validate:hover {
                background: #0056b3;
            }
            
            .btn-validate:disabled {
                background: #6c757d;
                cursor: not-allowed;
            }
            
            /* 开关样式 */
            .form-switch {
                display: flex;
                align-items: center;
                gap: 12px;
                cursor: pointer;
            }
            
            .form-switch input[type="checkbox"] {
                position: relative;
                width: 50px;
                height: 26px;
                appearance: none;
                background: #ccc;
                border-radius: 26px;
                transition: background-color 0.3s ease;
                cursor: pointer;
            }
            
            .form-switch input[type="checkbox"]:checked {
                background: #28a745;
            }
            
            .form-switch input[type="checkbox"]:before {
                content: '';
                position: absolute;
                top: 2px;
                left: 2px;
                width: 22px;
                height: 22px;
                background: white;
                border-radius: 50%;
                transition: transform 0.3s ease;
            }
            
            .form-switch input[type="checkbox"]:checked:before {
                transform: translateX(24px);
            }
            
            /* 按钮样式 */
            .btn-cancel, .btn-submit, .btn-close {
                padding: 10px 20px;
                border-radius: 6px;
                font-size: 14px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.3s ease;
                border: 1px solid;
            }
            
            .btn-cancel {
                background: white;
                color: #6c757d;
                border-color: #6c757d;
            }
            
            .btn-cancel:hover {
                background: #6c757d;
                color: white;
            }
            
            .btn-submit {
                background: #007bff;
                color: white;
                border-color: #007bff;
            }
            
            .btn-submit:hover {
                background: #0056b3;
                border-color: #0056b3;
            }
            
            .btn-close {
                background: #6c757d;
                color: white;
                border-color: #6c757d;
            }
            
            .btn-close:hover {
                background: #5a6268;
                border-color: #5a6268;
            }
            
            /* 统计面板样式 */
            .stats-panel .panel-content {
                max-width: 800px;
            }
            
            .stats-body {
                padding: 24px;
            }
            
            .stats-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 16px;
                margin-bottom: 24px;
            }
            
            .stat-card {
                background: #f8f9fa;
                padding: 20px;
                border-radius: 8px;
                text-align: center;
                border: 1px solid #e9ecef;
            }
            
            .stat-value {
                font-size: 28px;
                font-weight: 700;
                color: #007bff;
                margin-bottom: 8px;
            }
            
            .stat-label {
                font-size: 14px;
                color: #6c757d;
                font-weight: 500;
            }
            
            .department-info {
                background: #f8f9fa;
                padding: 20px;
                border-radius: 8px;
                border: 1px solid #e9ecef;
            }
            
            .department-info h4 {
                margin: 0 0 16px 0;
                color: #495057;
            }
            
            .department-info p {
                margin: 8px 0;
                color: #6c757d;
            }
        `;
  },

  // ===== 事件处理系统 =====

  // 绑定所有事件
  bindEvents() {
    // 先移除可能存在的旧事件监听器，避免重复绑定
    if (this.boundHandlers) {
      document.removeEventListener('click', this.boundHandlers.click);
      document.removeEventListener('change', this.boundHandlers.change);
      document.removeEventListener('input', this.boundHandlers.input);
      document.removeEventListener('submit', this.boundHandlers.submit);
    }

    // 绑定this上下文
    this.boundHandlers = {
      click: this.handleClick.bind(this),
      change: this.handleChange.bind(this),
      input: this.handleInput.bind(this),
      submit: (e) => e.preventDefault()
    };

    // 使用事件委托统一管理所有交互
    document.addEventListener('click', this.boundHandlers.click);
    document.addEventListener('change', this.boundHandlers.change);
    document.addEventListener('input', this.boundHandlers.input);
    document.addEventListener('submit', this.boundHandlers.submit);

    console.log('✅ 事件绑定完成');
  },

  // 统一点击事件处理
  async handleClick(e) {
    const target = e.target;
    const action = target.getAttribute('data-action');
    const type = target.getAttribute('data-type');
    const id = target.getAttribute('data-id');
    const page = target.getAttribute('data-page');

    // 添加详细调试日志
    console.log('🖱️ 点击事件触发:', {
      tagName: target.tagName,
      className: target.className,
      action,
      type,
      id,
      page
    });

    // 如果没有action，检查是否是按钮点击
    if (!action && target.classList.contains('action-btn')) {
      console.log('⚠️ 检测到action-btn但没有data-action属性:', target);
      return;
    }

    try {
      switch (action) {
        // Tab切换
        case null:
          if (target.classList.contains('tab-item')) {
            const tabName = target.getAttribute('data-tab');
            if (tabName) {
              await this.switchTab(tabName);
            }
          }
          break;

        // 新建应用
        case 'create-internal':
          await this.createApp('internal');
          break;
        case 'create-crossborder':
          await this.createApp('crossBorder');
          break;

        // 编辑应用
        case 'edit':
          await this.editApp(type, id);
          break;

        // 删除应用
        case 'delete':
          console.log('🗑️ 执行删除操作:', { type, id });
          await this.deleteApp(type, id);
          break;

        // 查看统计
        case 'stats':
          await this.showAppStats(type, id);
          break;

        // 状态切换 - 现在由 handleChange 处理
        case 'toggle-status':
          // 不需要处理，由 change 事件处理
          break;

        // 批量操作
        case 'batch-enable':
          await this.batchEnable(type);
          break;
        case 'batch-disable':
          await this.batchDisable(type);
          break;
        case 'batch-delete':
          await this.batchDelete(type);
          break;

        // 分页操作
        case 'prev-page':
          await this.goToPage(type, this.pagination[type === 'internal' ? 'internal' : 'crossBorder'].currentPage - 1);
          break;
        case 'next-page':
          await this.goToPage(type, this.pagination[type === 'internal' ? 'internal' : 'crossBorder'].currentPage + 1);
          break;
        case 'goto-page':
          await this.goToPage(type, parseInt(page));
          break;

        // 搜索
        case null:
          if (target.classList.contains('search-btn')) {
            const searchInput = target.previousElementSibling;
            await this.handleSearch(searchInput.value);
          }
          break;
      }
    } catch (error) {
      console.error('❌ 点击事件处理失败:', error);
      this.showMessage('操作失败: ' + error.message, 'error');
    }
  },

  // 统一变更事件处理
  async handleChange(e) {
    const target = e.target;
    const type = target.getAttribute('data-type');

    console.log('🔄 Change事件触发:', {
      tagName: target.tagName,
      type: target.type,
      action: target.getAttribute('data-action'),
      checked: target.checked
    });

    try {
      // 状态切换开关
      if (target.getAttribute('data-action') === 'toggle-status') {
        const id = target.getAttribute('data-id');
        const type = target.getAttribute('data-type');
        const status = target.checked;
        console.log('🔄 状态切换事件详情:', { id, type, status });
        await this.handleStatusToggle(target);
      }
      // 行选择复选框
      else if (target.classList.contains('row-checkbox')) {
        this.handleRowCheckboxChange(target);
      }
      // 全选复选框
      else if (target.classList.contains('select-all-checkbox')) {
        this.handleSelectAllChange(type, target.checked);
      }
      // 批量选择复选框
      else if (target.classList.contains('batch-select-checkbox')) {
        this.handleSelectAllChange(type, target.checked);
      }
      // 每页大小选择
      else if (target.classList.contains('page-size-select')) {
        await this.handlePageSizeChange(type, parseInt(target.value));
      }
    } catch (error) {
      console.error('❌ 变更事件处理失败:', error);
      this.showMessage('操作失败: ' + error.message, 'error');
    }
  },

  // 统一输入事件处理 (带防抖)
  handleInput(e) {
    const target = e.target;

    // 搜索框防抖处理
    if (target.classList.contains('search-input')) {
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        this.handleSearch(target.value);
      }, 300); // 300ms防抖
    }
  },

  // ===== CRUD操作实现 =====

  // 创建应用
  async createApp(type) {
    try {
      console.log('🆕 创建应用被调用:', { type });
      const title = type === 'internal' ? '新建内网应用' : '新建跨境应用';
      console.log('📋 面板标题:', title);
      await this.showPanel(title, null, type, 'create');
    } catch (error) {
      console.error('❌ 创建应用失败:', error);
      this.showMessage('创建应用失败', 'error');
    }
  },

  // 编辑应用
  async editApp(type, id) {
    try {
      console.log('✏️ 编辑应用开始:', { type, id, idType: typeof id });

      const numericId = parseInt(id);
      if (isNaN(numericId)) {
        throw new Error('无效的应用ID');
      }

      const dataKey = type === 'internal' ? 'internalApps' : 'crossBorderApps';
      const app = this.cache[dataKey].find(item => item.id === numericId);

      console.log('🔍 查找编辑应用结果:', { app: app ? app.name : null, cacheSize: this.cache[dataKey].length });

      if (!app) {
        throw new Error('应用不存在');
      }

      const title = type === 'internal' ? '编辑内网应用' : '编辑跨境应用';
      await this.showPanel(title, app, type, 'edit');
    } catch (error) {
      console.error('❌ 编辑应用失败:', error);
      this.showMessage('编辑应用失败: ' + error.message, 'error');
    }
  },

  // 删除应用
  async deleteApp(type, id) {
    try {
      console.log('🗑️ 删除应用开始:', { type, id, idType: typeof id });

      // 确保ID为数字类型
      const numericId = parseInt(id);
      if (isNaN(numericId)) {
        throw new Error('无效的应用ID');
      }

      const dataKey = type === 'internal' ? 'internalApps' : 'crossBorderApps';
      const app = this.cache[dataKey].find(item => item.id === numericId);

      console.log('🔍 查找应用结果:', { app: app ? app.name : null, cacheSize: this.cache[dataKey].length });

      if (!app) {
        throw new Error('应用不存在');
      }

      if (!confirm(`确定要删除应用"${app.name}"吗？此操作不可撤销。`)) {
        console.log('🚫 用户取消删除操作');
        return;
      }

      console.log('💾 开始调用数据管理器删除...');
      this.setLoading(true);

      // 调用数据管理器删除
      if (type === 'internal') {
        await this.dataManager.internalApps.delete(numericId);
      } else {
        await this.dataManager.crossBorderApps.delete(numericId);
      }

      // 手动触发UI更新
      await this.handleDataDelete(type, numericId);

      this.showMessage(`应用"${app.name}"删除成功`, 'success');

    } catch (error) {
      console.error('❌ 删除应用失败:', error);
      this.showMessage('删除应用失败: ' + error.message, 'error');
    } finally {
      this.setLoading(false);
    }
  },

  // 切换应用状态
  async toggleAppStatus(type, id, status) {
    try {
      console.log('🔄 开始切换应用状态:', { type, id, idType: typeof id, status });

      // 确保ID为数字类型
      const numericId = parseInt(id);
      if (isNaN(numericId)) {
        throw new Error('无效的应用ID');
      }

      this.setLoading(true);

      const updateData = { status };

      // 调用数据管理器更新
      console.log('💾 调用数据管理器更新...', { numericId, updateData });
      if (type === 'internal') {
        const result = await this.dataManager.internalApps.update(numericId, updateData);
        console.log('💾 内网应用更新结果:', result);
      } else {
        const result = await this.dataManager.crossBorderApps.update(numericId, updateData);
        console.log('💾 跨境应用更新结果:', result);
      }

      // 手动触发UI更新
      console.log('🎨 触发UI更新...');
      await this.handleDataModify(type, updateData, numericId);

      const statusText = status ? '启用' : '禁用';
      this.showMessage(`应用${statusText}成功`, 'success');
      console.log('✅ 应用状态切换成功');

    } catch (error) {
      console.error('❌ 切换应用状态失败:', error);
      this.showMessage('状态切换失败: ' + error.message, 'error');

      // 恢复原状态
      const checkbox = document.querySelector(`input.status-toggle-input[data-id="${id}"]`);
      if (checkbox) {
        checkbox.checked = !status;
      }
    } finally {
      this.setLoading(false);
    }
  },

  // 显示应用统计
  async showAppStats(type, id) {
    try {
      console.log('📊 显示应用统计:', { type, id, idType: typeof id });

      const numericId = parseInt(id);
      if (isNaN(numericId)) {
        throw new Error('无效的应用ID');
      }

      const dataKey = type === 'internal' ? 'internalApps' : 'crossBorderApps';
      const app = this.cache[dataKey].find(item => item.id === numericId);

      if (!app) {
        throw new Error('应用不存在');
      }

      this.setLoading(true);

      // 获取应用统计数据
      const stats = await this.getApplicationStats(numericId);
      const departmentUsage = await this.getDepartmentUsage(app.scope);

      // 显示统计面板
      await this.showStatsPanel(app, stats, departmentUsage);

    } catch (error) {
      console.error('❌ 获取应用统计失败:', error);
      this.showMessage('获取统计数据失败: ' + error.message, 'error');
    } finally {
      this.setLoading(false);
    }
  },

  // ===== 批量操作 =====

  // 批量启用
  async batchEnable(type) {
    const selectedIds = this.getSelectedIds(type);
    if (selectedIds.length === 0) {
      this.showMessage('请先选择要启用的应用', 'warning');
      return;
    }

    if (!confirm(`确定要启用选中的 ${selectedIds.length} 个应用吗？`)) {
      return;
    }

    try {
      this.setLoading(true);

      for (const id of selectedIds) {
        if (type === 'internal') {
          await this.dataManager.internalApps.update(id, { status: true });
        } else {
          await this.dataManager.crossBorderApps.update(id, { status: true });
        }

        // 手动触发UI更新
        await this.handleDataModify(type, { status: true }, id);
      }

      this.showMessage(`成功启用 ${selectedIds.length} 个应用`, 'success');
      this.clearSelection(type);

    } catch (error) {
      console.error('❌ 批量启用失败:', error);
      this.showMessage('批量启用失败: ' + error.message, 'error');
    } finally {
      this.setLoading(false);
    }
  },

  // 批量禁用
  async batchDisable(type) {
    const selectedIds = this.getSelectedIds(type);
    if (selectedIds.length === 0) {
      this.showMessage('请先选择要禁用的应用', 'warning');
      return;
    }

    if (!confirm(`确定要禁用选中的 ${selectedIds.length} 个应用吗？`)) {
      return;
    }

    try {
      this.setLoading(true);

      for (const id of selectedIds) {
        if (type === 'internal') {
          await this.dataManager.internalApps.update(id, { status: false });
        } else {
          await this.dataManager.crossBorderApps.update(id, { status: false });
        }

        // 手动触发UI更新
        await this.handleDataModify(type, { status: false }, id);
      }

      this.showMessage(`成功禁用 ${selectedIds.length} 个应用`, 'success');
      this.clearSelection(type);

    } catch (error) {
      console.error('❌ 批量禁用失败:', error);
      this.showMessage('批量禁用失败: ' + error.message, 'error');
    } finally {
      this.setLoading(false);
    }
  },

  // 批量删除
  async batchDelete(type) {
    const selectedIds = this.getSelectedIds(type);
    if (selectedIds.length === 0) {
      this.showMessage('请先选择要删除的应用', 'warning');
      return;
    }

    if (!confirm(`确定要删除选中的 ${selectedIds.length} 个应用吗？此操作不可撤销。`)) {
      return;
    }

    try {
      this.setLoading(true);

      // 调用数据管理器批量删除
      if (type === 'internal') {
        // 如果没有 batchDelete 方法，逐个删除
        for (const id of selectedIds) {
          await this.dataManager.internalApps.delete(id);
        }
      } else {
        for (const id of selectedIds) {
          await this.dataManager.crossBorderApps.delete(id);
        }
      }

      // 手动触发UI更新
      await this.handleBatchDataDelete(type, selectedIds);

      this.showMessage(`成功删除 ${selectedIds.length} 个应用`, 'success');
      this.clearSelection(type);

    } catch (error) {
      console.error('❌ 批量删除失败:', error);
      this.showMessage('批量删除失败: ' + error.message, 'error');
    } finally {
      this.setLoading(false);
    }
  },

  // ===== 选择管理 =====

  // 处理行复选框变更
  handleRowCheckboxChange(checkbox) {
    const type = checkbox.getAttribute('data-type');
    const id = checkbox.value;

    if (checkbox.checked) {
      this.ui.selectedItems.add(id);
    } else {
      this.ui.selectedItems.delete(id);
    }

    this.updateSelectionUI(type);
  },

  // 处理全选变更
  handleSelectAllChange(type, checked) {
    const checkboxes = document.querySelectorAll(`.row-checkbox[data-type="${type}"]`);

    checkboxes.forEach(checkbox => {
      checkbox.checked = checked;
      const id = checkbox.value;

      if (checked) {
        this.ui.selectedItems.add(id);
      } else {
        this.ui.selectedItems.delete(id);
      }
    });

    this.updateSelectionUI(type);
  },

  // 获取选中的ID列表
  getSelectedIds(type) {
    const checkboxes = document.querySelectorAll(`.row-checkbox[data-type="${type}"]:checked`);
    return Array.from(checkboxes).map(cb => cb.value);
  },

  // 清除选择
  clearSelection(type) {
    const checkboxes = document.querySelectorAll(`.row-checkbox[data-type="${type}"]`);
    checkboxes.forEach(checkbox => {
      checkbox.checked = false;
      this.ui.selectedItems.delete(checkbox.value);
    });

    this.updateSelectionUI(type);
  },

  // ===== 搜索和分页 =====

  // 处理搜索
  async handleSearch(keyword) {
    try {
      this.ui.searchKeyword = keyword.trim();

      // 重新应用筛选
      this.applyFilters();

      // 重置到第一页
      this.pagination.internal.currentPage = 1;
      this.pagination.crossBorder.currentPage = 1;

      // 更新当前Tab的显示
      if (this.currentTab === 'internal') {
        await this.renderInternalAppsTable();
        this.updatePagination('internal');
      } else {
        await this.renderCrossBorderAppsTable();
        this.updatePagination('crossBorder');
      }

      // 清除选择状态
      this.ui.selectedItems.clear();
      this.updateSelectionUI(this.currentTab);

      const resultCount = this.cache[
        this.currentTab === 'internal' ? 'filteredInternalApps' : 'filteredCrossBorderApps'
      ].length;

      if (keyword && resultCount === 0) {
        this.showMessage('未找到匹配的应用', 'info');
      }

    } catch (error) {
      console.error('❌ 搜索失败:', error);
      this.showMessage('搜索失败: ' + error.message, 'error');
    }
  },

  // 跳转到指定页面
  async goToPage(type, page) {
    try {
      const paginationType = type === 'internal' ? 'internal' : 'crossBorder';
      const { totalPages } = this.pagination[paginationType];

      if (page < 1 || page > totalPages) {
        return;
      }

      this.pagination[paginationType].currentPage = page;

      // 渲染对应的表格
      if (type === 'internal') {
        await this.renderInternalAppsTable();
      } else {
        await this.renderCrossBorderAppsTable();
      }

      // 更新分页控件
      this.updatePagination(type);

      // 清除选择状态
      this.ui.selectedItems.clear();
      this.updateSelectionUI(type);

    } catch (error) {
      console.error('❌ 分页跳转失败:', error);
      this.showMessage('分页跳转失败: ' + error.message, 'error');
    }
  },

  // 处理每页大小变更
  async handlePageSizeChange(type, pageSize) {
    try {
      const paginationType = type === 'internal' ? 'internal' : 'crossBorder';

      this.pagination[paginationType].pageSize = pageSize;
      this.pagination[paginationType].currentPage = 1; // 重置到第一页

      // 更新分页信息
      this.updatePagination(type);

      // 重新渲染表格
      if (type === 'internal') {
        await this.renderInternalAppsTable();
      } else {
        await this.renderCrossBorderAppsTable();
      }

      // 清除选择状态
      this.ui.selectedItems.clear();
      this.updateSelectionUI(type);

    } catch (error) {
      console.error('❌ 每页大小变更失败:', error);
      this.showMessage('页面大小设置失败: ' + error.message, 'error');
    }
  },

  // 处理状态切换（专用方法）
  async handleStatusToggle(checkbox) {
    const id = checkbox.getAttribute('data-id');
    const type = checkbox.getAttribute('data-type');
    const status = checkbox.checked;

    try {
      console.log('🔄 处理状态切换开始:', { id, type, status });

      // 先禁用开关，防止重复点击
      checkbox.disabled = true;

      // 调用状态切换方法
      await this.toggleAppStatus(type, id, status);

      console.log('✅ 状态切换处理完成');

    } catch (error) {
      console.error('❌ 状态切换失败:', error);
      // 恢复原状态
      checkbox.checked = !status;
      this.showMessage('状态切换失败: ' + error.message, 'error');
    } finally {
      // 重新启用开关
      checkbox.disabled = false;
      console.log('🔓 状态开关重新启用');
    }
  },

  // ===== 面板系统核心 =====

  // 显示面板 - 侧滑面板系统
  async showPanel(title, data, type, mode) {
    try {
      console.log('🎭 显示面板被调用:', { title, data, type, mode });
      this.closePanel();

      // 创建遮罩层
      const overlay = document.createElement('div');
      overlay.className = 'panel-overlay';
      document.body.appendChild(overlay);

      // 创建侧滑面板
      const panel = document.createElement('div');
      panel.className = 'slide-panel-wrapper';

      const formHTML = this.getFormHTML(type, mode);
      console.log('🎨 准备设置面板HTML，表单HTML长度:', formHTML.length);

      panel.innerHTML = `
        <div class="app-recognition-panel">
          <div class="panel-header">
            <h3>${title}</h3>
            <button class="btn-close" data-action="close-panel">&times;</button>
          </div>
          <form class="panel-form" data-type="${type}" data-mode="${mode}">
            <div class="panel-body">
              ${formHTML}
            </div>
            <div class="panel-footer">
              <button type="button" class="btn-cancel" data-action="close-panel">取消</button>
              <button type="submit" class="btn-confirm">${mode === 'edit' ? '保存' : '创建'}</button>
            </div>
          </form>
        </div>
      `;

      document.body.appendChild(panel);
      console.log('🎨 侧滑面板HTML设置完成');

      // 添加面板样式
      this.injectPanelStyles();

      // 显示动画
      setTimeout(() => {
        overlay.classList.add('visible');
        panel.classList.add('visible');
      }, 10);

      this.ui.panelVisible = true;
      this.ui.currentPanel = { title, data, type, mode, panel, overlay };

      this.bindPanelEvents(panel, overlay, data, type, mode);

      if (data && mode === 'edit') {
        this.initFormValues(panel, data);
      }

    } catch (error) {
      console.error('❌ 显示面板失败:', error);
      this.showMessage('显示面板失败: ' + error.message, 'error');
    }
  },

  // 关闭面板
  closePanel() {
    // 移除旧式的modal面板
    const existingModals = document.querySelectorAll('.app-recognition-panel-container');
    existingModals.forEach(panel => panel.remove());

    // 移除侧滑面板
    const existingPanels = document.querySelectorAll('.slide-panel-wrapper');
    const existingOverlays = document.querySelectorAll('.panel-overlay');

    existingOverlays.forEach(overlay => {
      overlay.classList.remove('visible');
    });

    existingPanels.forEach(panel => {
      panel.classList.remove('visible');
    });

    setTimeout(() => {
      existingPanels.forEach(panel => panel.remove());
      existingOverlays.forEach(overlay => overlay.remove());
    }, 300);

    this.ui.panelVisible = false;
    this.ui.currentPanel = null;
  },

  // 获取表单HTML
  getFormHTML(type, mode) {
    console.log('📋 生成表单HTML:', { type, mode });
    const formHTML = `
            <div class="form-section">
                <h4>基本信息</h4>
                <div class="form-group">
                    <label class="required">应用名称</label>
                    <input type="text" name="name" class="form-input" placeholder="请输入应用名称" required>
                </div>
                <div class="form-group">
                    <label>应用描述</label>
                    <textarea name="description" class="form-textarea" placeholder="请输入应用描述"></textarea>
                </div>
                <div class="form-group">
                    <label>生效范围</label>
                    <select name="scope" class="form-select">
                        <option value="全部用户">全部用户</option>
                        <option value="研发部门">研发部门</option>
                        <option value="测试部门">测试部门</option>
                        <option value="运维部门">运维部门</option>
                        <option value="财务部门">财务部门</option>
                    </select>
                </div>
                        <div class="form-group">
                            <label>状态</label>
                            <label class="form-switch">
                                <input type="checkbox" name="status" checked>
                                <span class="switch-label">启用应用</span>
                            </label>
                        </div>
            </div>
            
            <div class="form-section">
                <h4>识别配置</h4>
                <div class="recognition-types">
                    <div class="recognition-type">
                        <label class="checkbox-label">
                            <input type="checkbox" name="recognitionTypes" value="域名识别">
                            域名识别
                        </label>
                        <div class="recognition-input" style="display: none;">
                            <input type="text" name="domain" placeholder="请输入域名">
                            <button type="button" class="btn-validate" data-action="validate-domain">验证</button>
                        </div>
                    </div>
                    
                    <div class="recognition-type">
                        <label class="checkbox-label">
                            <input type="checkbox" name="recognitionTypes" value="IP识别">
                            IP识别
                        </label>
                        <div class="recognition-input" style="display: none;">
                            <input type="text" name="ip" placeholder="请输入IP地址">
                            <button type="button" class="btn-validate" data-action="validate-ip">验证</button>
                        </div>
                    </div>
                    
                    <div class="recognition-type">
                        <label class="checkbox-label">
                            <input type="checkbox" name="recognitionTypes" value="URL特征识别">
                            URL特征识别
                        </label>
                    </div>
                    
                    <div class="recognition-type">
                        <label class="checkbox-label">
                            <input type="checkbox" name="recognitionTypes" value="协议特征识别">
                            协议特征识别
                        </label>
                    </div>
                </div>
            </div>
        `;
    console.log('📋 表单HTML生成完成，长度:', formHTML.length);
    return formHTML;
  },

  // 注入面板样式
  injectPanelStyles() {
    if (document.querySelector('#appRecognitionPanelStyles')) return;

    const style = document.createElement('style');
    style.id = 'appRecognitionPanelStyles';
    style.textContent = `
      /* 侧滑面板样式 - 参考openApiV2.js */
      .slide-panel-wrapper {
        position: fixed;
        top: 0;
        right: -640px;
        bottom: 0;
        width: 640px;
        background: #fff;
        box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
        transition: right 0.3s ease-in-out;
        z-index: 1000;
      }

      .slide-panel-wrapper.visible {
        right: 0;
      }

      .panel-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 999;
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
      }

      .panel-overlay.visible {
        opacity: 1;
      }

      .app-recognition-panel {
        height: 100%;
        display: flex;
        flex-direction: column;
      }

      .panel-header {
        padding: 16px 24px;
        border-bottom: 1px solid #f0f0f0;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .panel-header h3 {
        margin: 0;
        font-size: 16px;
        font-weight: 500;
      }

      .btn-close {
        border: none;
        background: none;
        font-size: 20px;
        cursor: pointer;
        color: #999;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .btn-close:hover {
        color: #666;
        background: #f5f5f5;
        border-radius: 4px;
      }

      .panel-body {
        flex: 1;
        padding: 24px;
        overflow-y: auto;
      }

      .form-section {
        margin-bottom: 32px;
      }

      .form-section h4 {
        margin-bottom: 16px;
        font-size: 14px;
        font-weight: 500;
        color: #333;
      }

      .form-group {
        margin-bottom: 24px;
      }

      .form-group label {
        display: block;
        margin-bottom: 8px;
        font-size: 14px;
        color: #333;
      }

      .required:before {
        content: "*";
        color: #ff4d4f;
        margin-right: 4px;
      }

      .form-input,
      .form-select,
      .form-textarea {
        width: 100%;
        padding: 8px 12px;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        box-sizing: border-box;
        font-size: 14px;
      }

      .form-input:focus,
      .form-select:focus,
      .form-textarea:focus {
        outline: none;
        border-color: #1890ff;
        box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
      }

      .form-textarea {
        min-height: 80px;
        resize: vertical;
      }

      /* 状态开关样式 */
      .form-switch {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
      }

      .form-switch input[type="checkbox"] {
        width: 44px;
        height: 22px;
        appearance: none;
        background: #ccc;
        border-radius: 22px;
        position: relative;
        cursor: pointer;
        transition: all 0.3s;
      }

      .form-switch input[type="checkbox"]:checked {
        background: #1890ff;
      }

      .form-switch input[type="checkbox"]:before {
        content: '';
        position: absolute;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: white;
        top: 2px;
        left: 2px;
        transition: all 0.3s;
      }

      .form-switch input[type="checkbox"]:checked:before {
        transform: translateX(22px);
      }

      .switch-label {
        font-size: 14px;
        color: #333;
      }

      /* 识别类型样式 */
      .recognition-types {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .recognition-type {
        border: 1px solid #e9ecef;
        border-radius: 4px;
        padding: 16px;
      }

      .checkbox-label {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        font-size: 14px;
        margin-bottom: 12px;
      }

      .checkbox-label input[type="checkbox"] {
        width: 16px;
        height: 16px;
      }

      .recognition-input {
        display: flex;
        gap: 8px;
        align-items: center;
      }

      .recognition-input input {
        flex: 1;
      }

      .btn-validate {
        padding: 6px 12px;
        background: #1890ff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
        white-space: nowrap;
      }

      .btn-validate:hover {
        background: #40a9ff;
      }

      .panel-footer {
        padding: 16px 24px;
        border-top: 1px solid #f0f0f0;
        text-align: right;
        display: flex;
        justify-content: flex-end;
        gap: 8px;
      }

      .btn-cancel {
        padding: 8px 16px;
        border: 1px solid #d9d9d9;
        background: white;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
      }

      .btn-cancel:hover {
        border-color: #40a9ff;
        color: #40a9ff;
      }

      .btn-confirm {
        padding: 8px 16px;
        background: #1890ff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
      }

      .btn-confirm:hover {
        background: #40a9ff;
      }
    `;

    document.head.appendChild(style);
  },

  // 绑定面板事件
  bindPanelEvents(panel, overlay, data, type, mode) {
    // 关闭面板函数
    const closePanel = () => {
      overlay.classList.remove('visible');
      panel.classList.remove('visible');
      setTimeout(() => {
        overlay.remove();
        panel.remove();
        this.ui.panelVisible = false;
        this.ui.currentPanel = null;
      }, 300);
    };

    // 关闭事件
    const closeButtons = panel.querySelectorAll('[data-action="close-panel"]');
    closeButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        closePanel();
      });
    });

    // 遮罩点击关闭
    if (overlay) {
      overlay.addEventListener('click', closePanel);
    }

    // 识别类型复选框事件
    const recognitionCheckboxes = panel.querySelectorAll('input[name="recognitionTypes"]');
    recognitionCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        const recognitionInput = e.target.closest('.recognition-type').querySelector('.recognition-input');
        if (recognitionInput) {
          recognitionInput.style.display = e.target.checked ? 'block' : 'none';
        }
      });
    });

    // 验证按钮事件
    const validateButtons = panel.querySelectorAll('.btn-validate');
    validateButtons.forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.preventDefault();
        await this.handleFieldValidation(btn);
      });
    });

    // 表单提交
    const form = panel.querySelector('.panel-form');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        await this.handleFormSubmit(form, type, mode, closePanel);
      });
    }
  },

  // 初始化表单值
  initFormValues(panelContainer, data) {
    try {
      const nameInput = panelContainer.querySelector('input[name="name"]');
      if (nameInput && data.name) nameInput.value = data.name;

      const descInput = panelContainer.querySelector('textarea[name="description"]');
      if (descInput && data.description) descInput.value = data.description;

      const scopeSelect = panelContainer.querySelector('select[name="scope"]');
      if (scopeSelect && data.scope) scopeSelect.value = data.scope;

      const statusInput = panelContainer.querySelector('input[name="status"]');
      if (statusInput) statusInput.checked = data.status || false;

      // 识别类型
      if (data.recognitionTypes && Array.isArray(data.recognitionTypes)) {
        data.recognitionTypes.forEach(type => {
          const checkbox = panelContainer.querySelector(`input[name="recognitionTypes"][value="${type}"]`);
          if (checkbox) {
            checkbox.checked = true;
            checkbox.dispatchEvent(new Event('change'));
          }
        });
      }

      // 域名和IP
      const domainInput = panelContainer.querySelector('input[name="domain"]');
      if (domainInput && data.domain) domainInput.value = data.domain;

      const ipInput = panelContainer.querySelector('input[name="ip"]');
      if (ipInput && data.ip) ipInput.value = data.ip;

    } catch (error) {
      console.error('❌ 初始化表单值失败:', error);
    }
  },

  // 处理字段验证
  async handleFieldValidation(button) {
    try {
      const input = button.previousElementSibling;
      const action = button.getAttribute('data-action');

      if (!input || !input.value.trim()) {
        this.showMessage('请输入要验证的值', 'warning');
        return;
      }

      button.disabled = true;
      button.textContent = '验证中...';

      let result;
      if (action === 'validate-domain') {
        result = await this.validateDomain(input.value.trim());
      } else if (action === 'validate-ip') {
        result = await this.validateIP(input.value.trim());
      }

      if (result.success) {
        input.classList.add('valid');
        input.classList.remove('invalid');
        this.showMessage(result.message, 'success');
      } else {
        input.classList.add('invalid');
        input.classList.remove('valid');
        this.showMessage(result.message, 'error');
      }

    } catch (error) {
      console.error('❌ 字段验证失败:', error);
      this.showMessage('验证失败: ' + error.message, 'error');
    } finally {
      button.disabled = false;
      button.textContent = '验证';
    }
  },

  // 收集表单数据
  collectFormData(panelContainer) {
    const formData = {};

    const nameInput = panelContainer.querySelector('input[name="name"]');
    if (nameInput) formData.name = nameInput.value.trim();

    const descInput = panelContainer.querySelector('textarea[name="description"]');
    if (descInput) formData.description = descInput.value.trim();

    const scopeSelect = panelContainer.querySelector('select[name="scope"]');
    if (scopeSelect) formData.scope = scopeSelect.value;

    const statusInput = panelContainer.querySelector('input[name="status"]');
    if (statusInput) formData.status = statusInput.checked;

    // 识别类型
    const recognitionTypes = [];
    const recognitionCheckboxes = panelContainer.querySelectorAll('input[name="recognitionTypes"]:checked');
    recognitionCheckboxes.forEach(cb => recognitionTypes.push(cb.value));
    formData.recognitionTypes = recognitionTypes;

    const domainInput = panelContainer.querySelector('input[name="domain"]');
    if (domainInput) formData.domain = domainInput.value.trim();

    const ipInput = panelContainer.querySelector('input[name="ip"]');
    if (ipInput) formData.ip = ipInput.value.trim();

    return formData;
  },

  // 验证表单数据
  validateFormData(formData) {
    const errors = [];

    if (!formData.name) {
      errors.push('应用名称不能为空');
    }

    if (!formData.recognitionTypes || formData.recognitionTypes.length === 0) {
      errors.push('请至少选择一种识别方式');
    }

    if (formData.recognitionTypes.includes('域名识别') && !formData.domain) {
      errors.push('选择域名识别时，域名不能为空');
    }

    if (formData.recognitionTypes.includes('IP识别') && !formData.ip) {
      errors.push('选择IP识别时，IP地址不能为空');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  },

  // 处理表单提交
  async handleFormSubmit(form, type, mode, closePanel) {
    try {
      const panelContainer = form.closest('.app-recognition-panel') || form.closest('.app-recognition-panel-container');
      const formData = this.collectFormData(panelContainer);

      const validation = this.validateFormData(formData);
      if (!validation.valid) {
        this.showMessage('表单验证失败:\n' + validation.errors.join('\n'), 'error');
        return;
      }

      this.setLoading(true);

      const saveData = {
        ...formData,
        createTime: mode === 'create' ? new Date().toISOString() : undefined,
        lastUpdated: new Date().toISOString()
      };

      if (mode === 'create') {
        let newApp;
        if (type === 'internal') {
          newApp = await this.dataManager.internalApps.create(saveData);
        } else {
          newApp = await this.dataManager.crossBorderApps.create(saveData);
        }

        // 手动触发UI更新
        await this.handleDataCreate(type, { ...saveData, id: newApp.id || newApp });

        this.showMessage(`${formData.name} 创建成功`, 'success');
      } else {
        const appId = this.ui.currentPanel.data.id;
        if (type === 'internal') {
          await this.dataManager.internalApps.update(appId, saveData);
        } else {
          await this.dataManager.crossBorderApps.update(appId, saveData);
        }

        // 手动触发UI更新
        await this.handleDataModify(type, saveData, appId);

        this.showMessage(`${formData.name} 更新成功`, 'success');
      }

      // 关闭面板
      if (closePanel && typeof closePanel === 'function') {
        closePanel();
      } else {
        this.closePanel();
      }

    } catch (error) {
      console.error('❌ 表单提交失败:', error);
      this.showMessage('保存失败: ' + error.message, 'error');
    } finally {
      this.setLoading(false);
    }
  },

  // 显示统计面板
  async showStatsPanel(app, stats, departmentUsage) {
    try {
      const statsHTML = `
                <div class="panel-overlay"></div>
                <div class="panel-content stats-panel">
                    <div class="panel-header">
                        <h3>📊 ${app.name} - 使用统计</h3>
                        <button class="panel-close-btn" data-action="close-stats">&times;</button>
                    </div>
                    <div class="stats-body">
                        <div class="stats-grid">
                            <div class="stat-card">
                                <div class="stat-value">${stats.stats.dailyUsers}</div>
                                <div class="stat-label">日活用户</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-value">${stats.stats.weeklyUsers}</div>
                                <div class="stat-label">周活用户</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-value">${stats.stats.totalTraffic}</div>
                                <div class="stat-label">总流量</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-value">${stats.stats.averageResponseTime}</div>
                                <div class="stat-label">平均响应时间</div>
                            </div>
                        </div>
                        <div class="department-info">
                            <h4>部门使用情况</h4>
                            <p>用户数: ${departmentUsage.users}</p>
                            <p>应用数: ${departmentUsage.apps}</p>
                            <p>流量: ${departmentUsage.traffic}</p>
                        </div>
                    </div>
                    <div class="panel-footer">
                        <button type="button" class="btn-close" data-action="close-stats">关闭</button>
                    </div>
                </div>
            `;

      const panelContainer = document.createElement('div');
      panelContainer.className = 'app-recognition-panel-container stats-panel';
      panelContainer.innerHTML = statsHTML;

      document.body.appendChild(panelContainer);

      // 绑定关闭事件
      const closeButtons = panelContainer.querySelectorAll('[data-action="close-stats"]');
      closeButtons.forEach(btn => {
        btn.addEventListener('click', () => panelContainer.remove());
      });

      const overlay = panelContainer.querySelector('.panel-overlay');
      if (overlay) {
        overlay.addEventListener('click', () => panelContainer.remove());
      }

      // 显示动画
      requestAnimationFrame(() => {
        panelContainer.querySelector('.panel-overlay').classList.add('show');
        panelContainer.querySelector('.panel-content').classList.add('show');
      });

    } catch (error) {
      console.error('❌ 显示统计面板失败:', error);
      this.showMessage('显示统计失败: ' + error.message, 'error');
    }
  }
};

// 导出到全局作用域
if (typeof module !== 'undefined' && module.exports) {
  module.exports = appRecognitionV3;
}

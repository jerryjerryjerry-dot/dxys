// 应用管理页面模块 V2 - 完整的数据持久化和无闪屏更新系统
window.appManagementV2 = {
  id: 'appManagement',
  title: '应用管理',

  // 初始化状态
  initialized: false,

  // 状态管理
  state: {
    activeTab: 'builtin', // 'builtin' | 'custom'

    // 分页状态
    pagination: {
      builtin: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        totalPages: 0
      },
      custom: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        totalPages: 0
      }
    },

    // 搜索状态
    search: {
      builtin: {
        keyword: '',
        category: 'all'
      },
      custom: {
        keyword: ''
      }
    },

    // 选择状态
    selection: {
      builtin: new Set(),
      custom: new Set()
    },

    // 树形结构状态
    tree: {
      expandedNodes: new Set(['办公应用', '开发工具', '云服务']), // 默认展开的节点
      selectedCategory: 'all'
    },

    // 面板状态
    panels: {
      isOpen: false,
      type: null, // 'detail' | 'create' | 'edit'
      data: null
    }
  },

  // ===== 初始化 =====
  async init() {
    if (this.initialized) return;

    try {
      console.log('🚀 初始化appManagementV2...');

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

      this.initialized = true;
      console.log('✅ appManagementV2初始化完成');

      // 初始渲染 - 稍微延迟确保DOM就绪
      setTimeout(() => this.initialRender(), 300);

    } catch (error) {
      console.error('❌ appManagementV2初始化失败:', error);
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
    // 监听内置应用数据变化
    AppDataManagerV2.onUpdate('builtinApps', (event) => {
      console.log('内置应用数据更新:', event);
      this.handleDataUpdate('builtin', event);
    });

    // 监听自定义应用数据变化
    AppDataManagerV2.onUpdate('customApps', (event) => {
      console.log('自定义应用数据更新:', event);
      this.handleDataUpdate('custom', event);
    });
  },

  // 处理数据更新
  async handleDataUpdate(type, event) {
    try {
      // 重新渲染对应的内容
      if (type === 'builtin' && this.state.activeTab === 'builtin') {
        await this.renderAppTree();
        await this.renderBuiltinAppTable();
      } else if (type === 'custom' && this.state.activeTab === 'custom') {
        await this.renderCustomAppTable();
      }

      // 更新选择状态
      this.updateSelectionUI(type);

    } catch (error) {
      console.error('❌ 处理数据更新失败:', error);
    }
  },

  // ===== 页面内容模板 =====
  content() {
    return `
            <div class="header">
                <h1>应用管理</h1>
                <p>用户可以通过控制台配置应用识别策略，以及管理内置应用库</p>
            </div>
            
            <div class="app-tabs">
                <a href="#" class="tab active" data-tab="builtin">内置应用</a>
                <a href="#" class="tab" data-tab="custom">自定义应用</a>
            </div>
            
            <!-- 内置应用内容 -->
            <div id="builtinContent" class="tab-content active">
                <div class="app-management-container">
                    <!-- 左侧面板 -->
                    <div class="left-panel">
                        <div class="search-box">
                            <input type="text" class="search-input" placeholder="请输入应用类型" data-type="builtin-tree">
                            <span class="search-btn">🔍</span>
                        </div>
                        <div class="tree-container">
                            <!-- 动态生成树形结构 -->
                        </div>
                    </div>
                    
                    <!-- 右侧面板 -->
                    <div class="right-panel">
                        <div class="actions">
                            <div class="search-box">
                                <input type="text" class="search-input" placeholder="请输入应用名称/地址进行搜索" data-type="builtin">
                                <span class="search-btn">🔍</span>
                            </div>
                        </div>
                        
                        <div class="batch-actions" id="builtin-batch-actions" style="display: none;">
                            <span>已选择 <span id="builtin-selected-count">0</span> 项</span>
                            <button class="batch-btn" data-action="batch-enable-builtin">批量启用</button>
                            <button class="batch-btn" data-action="batch-disable-builtin">批量禁用</button>
                            <button class="batch-btn danger" data-action="batch-delete-builtin">批量删除</button>
                        </div>
                        
                        <table class="app-table">
                            <thead>
                                <tr>
                                    <th width="40"><input type="checkbox" id="selectAll-builtin"></th>
                                    <th>应用名称</th>
                                    <th>访问地址</th>
                                    <th>应用类型</th>
                                    <th>状态</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody id="builtinAppsTableBody">
                                <!-- 动态生成表格内容 -->
                            </tbody>
                        </table>
                        
                        <div class="pagination" id="builtin-pagination">
                            <!-- 动态生成分页 -->
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- 自定义应用内容 -->
            <div id="customContent" class="tab-content" style="display: none;">
                <div class="custom-app-container">
                    <div class="actions">
                        <button class="btn-new" data-action="create-custom">+ 新建应用</button>
                        <div class="search-box">
                            <input type="text" class="search-input" placeholder="请输入关键字进行搜索" data-type="custom">
                            <span class="search-btn">🔍</span>
                        </div>
                    </div>
                
                <div class="batch-actions" id="custom-batch-actions" style="display: none;">
                    <span>已选择 <span id="custom-selected-count">0</span> 项</span>
                    <button class="batch-btn" data-action="batch-enable-custom">批量启用</button>
                    <button class="batch-btn" data-action="batch-disable-custom">批量禁用</button>
                    <button class="batch-btn danger" data-action="batch-delete-custom">批量删除</button>
                </div>
                
                <table class="app-table">
                    <thead>
                        <tr>
                            <th width="40"><input type="checkbox" id="selectAll-custom"></th>
                            <th>应用名称</th>
                            <th>访问地址</th>
                            <th>应用类型</th>
                            <th>状态</th>
                            <th>创建时间</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody id="customAppsTableBody">
                        <!-- 动态生成表格内容 -->
                    </tbody>
                </table>
                
                    <div class="pagination" id="custom-pagination">
                        <!-- 动态生成分页 -->
                    </div>
                </div>
            </div>
        `;
  },

  // ===== 工具方法 =====
  // 显示消息提示
  showMessage(message, type = 'info') {
    // 移除已存在的消息
    const existingMessage = document.querySelector('.app-management-message-v2');
    if (existingMessage) {
      existingMessage.remove();
    }

    // 创建消息元素
    const messageEl = document.createElement('div');
    messageEl.className = `app-management-message-v2 app-management-message-${type}`;
    messageEl.textContent = message;

    document.body.appendChild(messageEl);

    // 显示动画
    setTimeout(() => messageEl.classList.add('show'), 100);

    // 自动移除
    setTimeout(() => {
      messageEl.classList.remove('show');
      setTimeout(() => messageEl.remove(), 300);
    }, 3000);
  },

  // 格式化时间
  formatTime(timeStr) {
    if (!timeStr) return '';
    const date = new Date(timeStr);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  },

  // ===== 树形结构渲染 =====
  async renderAppTree() {
    try {
      const treeContainer = document.querySelector('.tree-container');
      if (!treeContainer) return;

      // 获取所有内置应用数据
      const allApps = await AppDataManagerV2.builtinApps.getAll();

      // 按分类和类型统计应用数量
      const categoryStats = {};
      allApps.forEach(app => {
        if (!categoryStats[app.category]) {
          categoryStats[app.category] = {};
        }
        if (!categoryStats[app.category][app.type]) {
          categoryStats[app.category][app.type] = [];
        }
        categoryStats[app.category][app.type].push(app);
      });

      // 生成树形结构HTML
      let treeHTML = '';

      // 添加"全部应用"根节点
      const totalCount = allApps.length;
      const isAllSelected = this.state.tree.selectedCategory === 'all';
      treeHTML += `
                <div class="tree-node" data-category="all">
                    <div class="tree-node-content ${isAllSelected ? 'selected' : ''}">
                        <span class="tree-icon">📱</span>
                        <span class="tree-label">全部应用</span>
                        <span class="tree-count">${totalCount}</span>
                    </div>
                </div>
            `;

      // 生成分类节点
      Object.keys(categoryStats).forEach(category => {
        const categoryApps = Object.values(categoryStats[category]).flat();
        const categoryCount = categoryApps.length;
        const isExpanded = this.state.tree.expandedNodes.has(category);
        const isSelected = this.state.tree.selectedCategory === category;

        treeHTML += `
                    <div class="tree-node" data-category="${category}">
                        <div class="tree-node-content ${isSelected ? 'selected' : ''}">
                            <span class="tree-toggle ${isExpanded ? 'expanded' : ''}" data-category="${category}">
                                ${isExpanded ? '▼' : '▶'}
                            </span>
                            <span class="tree-icon">${this.getCategoryIcon(category)}</span>
                            <span class="tree-label">${category}</span>
                            <span class="tree-count">${categoryCount}</span>
                        </div>
                        <div class="tree-children ${isExpanded ? '' : 'collapsed'}">
                `;

        // 生成类型子节点
        Object.keys(categoryStats[category]).forEach(type => {
          const typeApps = categoryStats[category][type];
          const typeCount = typeApps.length;
          const typeKey = `${category}-${type}`;
          const isTypeSelected = this.state.tree.selectedCategory === typeKey;

          treeHTML += `
                        <div class="tree-node tree-node-child" data-category="${category}" data-type="${type}">
                            <div class="tree-node-content ${isTypeSelected ? 'selected' : ''}">
                                <span class="tree-icon">${this.getTypeIcon(type)}</span>
                                <span class="tree-label">${type}</span>
                                <span class="tree-count">${typeCount}</span>
                            </div>
                        </div>
                    `;
        });

        treeHTML += `
                        </div>
                    </div>
                `;
      });

      // 更新树形结构内容
      treeContainer.innerHTML = treeHTML;

      // 绑定树形结构事件
      this.bindTreeEvents();

    } catch (error) {
      console.error('❌ 渲染应用树失败:', error);
    }
  },

  // 获取分类图标
  getCategoryIcon(category) {
    const icons = {
      '办公应用': '💼',
      '开发工具': '🛠️',
      '云服务': '☁️',
      '企业管理': '🏢',
      '安全工具': '🔒',
      '数据分析': '📊',
      '通信服务': '📞'
    };
    return icons[category] || '📁';
  },

  // 获取类型图标
  getTypeIcon(type) {
    const icons = {
      '邮件系统': '📧',
      '文档协作': '📄',
      '视频会议': '📹',
      '代码仓库': '📦',
      'CI/CD工具': '🔄',
      '对象存储': '🗄️',
      'ERP': '📈',
      '防火墙': '🛡️'
    };
    return icons[type] || '📋';
  },

  // 绑定树形结构事件
  bindTreeEvents() {
    // 绑定节点展开/折叠事件
    const toggles = document.querySelectorAll('.tree-toggle');
    toggles.forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        this.handleTreeToggle(toggle);
      });
    });

    // 绑定节点选择事件
    const nodes = document.querySelectorAll('.tree-node-content');
    nodes.forEach(node => {
      node.addEventListener('click', (e) => {
        this.handleTreeNodeClick(node);
      });
    });
  },

  // 处理树节点展开/折叠
  handleTreeToggle(toggle) {
    const category = toggle.getAttribute('data-category');
    const treeNode = toggle.closest('.tree-node');
    const children = treeNode.querySelector('.tree-children');

    if (children) {
      const isExpanded = !children.classList.contains('collapsed');

      if (isExpanded) {
        // 折叠
        children.classList.add('collapsed');
        toggle.classList.remove('expanded');
        toggle.textContent = '▶';
        this.state.tree.expandedNodes.delete(category);
      } else {
        // 展开
        children.classList.remove('collapsed');
        toggle.classList.add('expanded');
        toggle.textContent = '▼';
        this.state.tree.expandedNodes.add(category);
      }
    }
  },

  // 处理树节点点击选择
  async handleTreeNodeClick(nodeContent) {
    const treeNode = nodeContent.closest('.tree-node');
    const category = treeNode.getAttribute('data-category');
    const type = treeNode.getAttribute('data-type');

    // 更新选中状态
    document.querySelectorAll('.tree-node-content').forEach(node => {
      node.classList.remove('selected');
    });
    nodeContent.classList.add('selected');

    // 更新状态
    if (type) {
      this.state.tree.selectedCategory = `${category}-${type}`;
      this.state.search.builtin.category = `${category}-${type}`;
    } else {
      this.state.tree.selectedCategory = category;
      this.state.search.builtin.category = category;
    }

    // 重置到第一页
    this.state.pagination.builtin.currentPage = 1;

    // 重新渲染表格
    await this.renderBuiltinAppTable();
  },

  // ===== 表格渲染 - 无闪屏更新 =====
  // 渲染内置应用表格
  async renderBuiltinAppTable() {
    try {
      const tbody = document.querySelector('#builtinAppsTableBody');
      if (!tbody) return;

      // 获取筛选后的数据
      const allApps = await this.getFilteredBuiltinApps();

      // 更新总数
      this.state.pagination.builtin.total = allApps.length;
      this.state.pagination.builtin.totalPages = Math.ceil(allApps.length / this.state.pagination.builtin.pageSize);

      // 分页处理
      const { currentPage, pageSize } = this.state.pagination.builtin;
      const startIndex = (currentPage - 1) * pageSize;
      const pagedApps = allApps.slice(startIndex, startIndex + pageSize);

      // 使用增量更新
      this.updateTableRows(tbody, pagedApps, 'builtin');

      // 更新分页控件
      this.updatePagination('builtin');

    } catch (error) {
      console.error('❌ 渲染内置应用表格失败:', error);
    }
  },

  // 渲染自定义应用表格
  async renderCustomAppTable() {
    try {
      const tbody = document.querySelector('#customAppsTableBody');
      if (!tbody) return;

      // 获取筛选后的数据
      const allApps = await this.getFilteredCustomApps();

      // 更新总数
      this.state.pagination.custom.total = allApps.length;
      this.state.pagination.custom.totalPages = Math.ceil(allApps.length / this.state.pagination.custom.pageSize);

      // 分页处理
      const { currentPage, pageSize } = this.state.pagination.custom;
      const startIndex = (currentPage - 1) * pageSize;
      const pagedApps = allApps.slice(startIndex, startIndex + pageSize);

      // 使用增量更新
      this.updateTableRows(tbody, pagedApps, 'custom');

      // 更新分页控件
      this.updatePagination('custom');

    } catch (error) {
      console.error('❌ 渲染自定义应用表格失败:', error);
    }
  },

  // 获取筛选后的内置应用
  async getFilteredBuiltinApps() {
    try {
      let apps = await AppDataManagerV2.builtinApps.getAll();

      // 关键词搜索
      if (this.state.search.builtin.keyword) {
        const keyword = this.state.search.builtin.keyword.toLowerCase();
        apps = apps.filter(app =>
          app.name.toLowerCase().includes(keyword) ||
          app.address.toLowerCase().includes(keyword) ||
          app.type.toLowerCase().includes(keyword) ||
          app.category.toLowerCase().includes(keyword) ||
          (app.description && app.description.toLowerCase().includes(keyword)) ||
          (app.tags && app.tags.some(tag => tag.toLowerCase().includes(keyword)))
        );
      }

      // 分类筛选
      if (this.state.search.builtin.category && this.state.search.builtin.category !== 'all') {
        const category = this.state.search.builtin.category;
        if (category.includes('-')) {
          // 类型筛选
          const [categoryName, typeName] = category.split('-');
          apps = apps.filter(app => app.category === categoryName && app.type === typeName);
        } else {
          // 分类筛选
          apps = apps.filter(app => app.category === category);
        }
      }

      return apps;
    } catch (error) {
      console.error('❌ 获取筛选后的内置应用失败:', error);
      return [];
    }
  },

  // 获取筛选后的自定义应用
  async getFilteredCustomApps() {
    try {
      let apps = await AppDataManagerV2.customApps.getAll();

      // 关键词搜索
      if (this.state.search.custom.keyword) {
        const keyword = this.state.search.custom.keyword.toLowerCase();
        apps = apps.filter(app =>
          app.name.toLowerCase().includes(keyword) ||
          app.address.toLowerCase().includes(keyword) ||
          app.type.toLowerCase().includes(keyword)
        );
      }

      return apps;
    } catch (error) {
      console.error('❌ 获取筛选后的自定义应用失败:', error);
      return [];
    }
  },

  // 增量更新表格行 - 核心无闪屏方法
  updateTableRows(tbody, apps, type) {
    const existingRows = new Map();

    // 收集现有行
    tbody.querySelectorAll('tr[data-app-id]').forEach(row => {
      const id = parseInt(row.getAttribute('data-app-id'));
      existingRows.set(id, row);
    });

    // 更新或创建行
    apps.forEach(app => {
      const existingRow = existingRows.get(app.id);

      if (existingRow) {
        // 更新现有行
        this.updateRowData(existingRow, app, type);
        existingRows.delete(app.id);
      } else {
        // 创建新行
        const newRow = this.createAppRow(app, type);
        tbody.appendChild(newRow);
      }
    });

    // 删除不需要的行
    existingRows.forEach(row => row.remove());
  },

  // 更新行数据
  updateRowData(row, app, type) {
    // 更新复选框
    const checkbox = row.querySelector('input[type="checkbox"]');
    if (checkbox) {
      checkbox.value = app.id;
    }

    // 更新应用名称
    const nameCell = row.querySelector('.app-name');
    if (nameCell && nameCell.textContent !== app.name) {
      nameCell.textContent = app.name;
    }

    // 更新访问地址
    const addressCell = row.querySelector('.app-address');
    if (addressCell && addressCell.textContent !== app.address) {
      addressCell.textContent = app.address;
    }

    // 更新应用类型
    const typeCell = row.querySelector('.app-type');
    if (typeCell && typeCell.textContent !== app.type) {
      typeCell.textContent = app.type;
    }

    // 更新状态
    const statusCell = row.querySelector('.app-status');
    if (statusCell) {
      const isEnabled = app.status === '启用' || app.status === true;
      statusCell.textContent = isEnabled ? '启用' : '禁用';
      statusCell.className = `app-status ${isEnabled ? 'enabled' : 'disabled'}`;
    }

    // 更新创建时间（仅自定义应用）
    if (type === 'custom') {
      const timeCell = row.querySelector('.app-time');
      if (timeCell && app.createTime) {
        const timeText = this.formatTime(app.createTime);
        if (timeCell.textContent !== timeText) {
          timeCell.textContent = timeText;
        }
      }
    }
  },

  // 创建应用行
  createAppRow(app, type) {
    const row = document.createElement('tr');
    row.setAttribute('data-app-id', app.id);

    const isEnabled = app.status === '启用' || app.status === true;

    if (type === 'builtin') {
      row.innerHTML = `
                <td><input type="checkbox" value="${app.id}" data-type="builtin"></td>
                <td class="app-name">${app.name || ''}</td>
                <td class="app-address">${app.address || ''}</td>
                <td class="app-type">${app.type || ''}</td>
                <td>
                    <span class="app-status ${isEnabled ? 'enabled' : 'disabled'}">${isEnabled ? '启用' : '禁用'}</span>
                </td>
                <td>
                    <a href="#" class="link-detail" data-action="detail-builtin" data-id="${app.id}">查看</a>
                </td>
            `;
    } else {
      row.innerHTML = `
                <td><input type="checkbox" value="${app.id}" data-type="custom"></td>
                <td class="app-name">${app.name || ''}</td>
                <td class="app-address">${app.address || ''}</td>
                <td class="app-type">${app.type || ''}</td>
                <td>
                    <span class="app-status ${isEnabled ? 'enabled' : 'disabled'}">${isEnabled ? '启用' : '禁用'}</span>
                </td>
                <td class="app-time">${this.formatTime(app.createTime)}</td>
                <td>
                    <a href="#" class="link-edit" data-action="edit-custom" data-id="${app.id}">编辑</a>
                    <a href="#" class="link-delete" data-action="delete-custom" data-id="${app.id}">删除</a>
                </td>
            `;
    }

    return row;
  },

  // ===== 分页管理 =====
  updatePagination(type) {
    const paginationKey = type === 'builtin' ? 'builtin' : 'custom';
    const pagination = this.state.pagination[paginationKey];
    const containerId = type === 'builtin' ? 'builtin-pagination' : 'custom-pagination';
    const container = document.getElementById(containerId);

    if (!container) return;

    const { currentPage, totalPages, total, pageSize } = pagination;

    // 计算显示的页码范围
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (endPage - startPage < 4) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + 4);
      } else {
        startPage = Math.max(1, endPage - 4);
      }
    }

    let paginationHTML = `
            <div class="pagination-info">
                显示第 ${(currentPage - 1) * pageSize + 1}-${Math.min(currentPage * pageSize, total)} 条，共 ${total} 条记录
            </div>
            <div class="pagination-controls">
        `;

    // 上一页按钮
    paginationHTML += `
            <button class="page-btn ${currentPage <= 1 ? 'disabled' : ''}" 
                    data-action="page" data-page="${currentPage - 1}" data-type="${type}"
                    ${currentPage <= 1 ? 'disabled' : ''}>上一页</button>
        `;

    // 页码按钮
    for (let i = startPage; i <= endPage; i++) {
      paginationHTML += `
                <button class="page-btn ${i === currentPage ? 'active' : ''}" 
                        data-action="page" data-page="${i}" data-type="${type}">${i}</button>
            `;
    }

    // 下一页按钮
    paginationHTML += `
            <button class="page-btn ${currentPage >= totalPages ? 'disabled' : ''}" 
                    data-action="page" data-page="${currentPage + 1}" data-type="${type}"
                    ${currentPage >= totalPages ? 'disabled' : ''}>下一页</button>
        `;

    paginationHTML += `</div>`;

    container.innerHTML = paginationHTML;
  },

  // 跳转页面
  async goToPage(type, page) {
    const paginationKey = type === 'builtin' ? 'builtin' : 'custom';
    const pagination = this.state.pagination[paginationKey];

    if (page < 1 || page > pagination.totalPages) return;

    pagination.currentPage = page;

    // 重新渲染表格
    if (type === 'builtin') {
      await this.renderBuiltinAppTable();
    } else {
      await this.renderCustomAppTable();
    }
  },

  // ===== 搜索功能 =====
  async handleSearch(type, keyword) {
    // 更新搜索状态
    if (type === 'builtin') {
      this.state.search.builtin.keyword = keyword;
      this.state.pagination.builtin.currentPage = 1; // 重置到第一页
      await this.renderBuiltinAppTable();
    } else if (type === 'builtin-tree') {
      // 树形结构搜索 - 暂时简化处理
      this.state.search.builtin.keyword = keyword;
      this.state.pagination.builtin.currentPage = 1;
      await this.renderBuiltinAppTable();
    } else if (type === 'custom') {
      this.state.search.custom.keyword = keyword;
      this.state.pagination.custom.currentPage = 1;
      await this.renderCustomAppTable();
    }
  },

  // ===== 选择管理 =====
  updateSelectionUI(type) {
    const typeKey = type === 'builtin' ? 'builtin' : 'custom';
    const selection = this.state.selection[typeKey];

    // 更新选中数量显示
    const countElement = document.getElementById(`${type}-selected-count`);
    if (countElement) {
      countElement.textContent = selection.size;
    }

    // 显示/隐藏批量操作
    const batchActions = document.getElementById(`${type}-batch-actions`);
    if (batchActions) {
      batchActions.style.display = selection.size > 0 ? 'flex' : 'none';
    }

    // 更新全选复选框状态
    const selectAllCheckbox = document.getElementById(`selectAll-${type}`);
    if (selectAllCheckbox) {
      const checkboxes = document.querySelectorAll(`input[type="checkbox"][data-type="${type}"]`);
      const totalCheckboxes = checkboxes.length;
      const checkedCheckboxes = Array.from(checkboxes).filter(cb => cb.checked).length;

      selectAllCheckbox.checked = totalCheckboxes > 0 && checkedCheckboxes === totalCheckboxes;
      selectAllCheckbox.indeterminate = checkedCheckboxes > 0 && checkedCheckboxes < totalCheckboxes;
    }
  },

  // 处理复选框变化
  handleCheckboxChange(checkbox) {
    const type = checkbox.getAttribute('data-type');
    const appId = parseInt(checkbox.value);
    const typeKey = type === 'builtin' ? 'builtin' : 'custom';

    if (checkbox.checked) {
      this.state.selection[typeKey].add(appId);
    } else {
      this.state.selection[typeKey].delete(appId);
    }

    this.updateSelectionUI(type);
  },

  // 处理全选
  handleSelectAll(type, checked) {
    const typeKey = type === 'builtin' ? 'builtin' : 'custom';
    const checkboxes = document.querySelectorAll(`input[type="checkbox"][data-type="${type}"]`);

    checkboxes.forEach(checkbox => {
      checkbox.checked = checked;
      const appId = parseInt(checkbox.value);
      if (checked) {
        this.state.selection[typeKey].add(appId);
      } else {
        this.state.selection[typeKey].delete(appId);
      }
    });

    this.updateSelectionUI(type);
  },

  // ===== 批量操作 =====
  async batchEnable(type) {
    try {
      const typeKey = type === 'builtin' ? 'builtin' : 'custom';
      const selectedIds = Array.from(this.state.selection[typeKey]);

      if (selectedIds.length === 0) {
        this.showMessage('请选择要启用的应用', 'warning');
        return;
      }

      if (confirm(`确定要启用选中的 ${selectedIds.length} 个应用吗？`)) {
        const dataManager = type === 'builtin'
          ? AppDataManagerV2.builtinApps
          : AppDataManagerV2.customApps;

        const result = await dataManager.batchUpdateStatus(selectedIds, '启用');

        if (result.success) {
          this.showMessage(`成功启用 ${selectedIds.length} 个应用`, 'success');
          this.clearSelection(type);
        } else {
          this.showMessage(`批量操作完成，成功${result.results.length}个，失败${result.errors.length}个`, 'info');
        }
      }
    } catch (error) {
      console.error('❌ 批量启用失败:', error);
      this.showMessage('批量启用失败: ' + error.message, 'error');
    }
  },

  async batchDisable(type) {
    try {
      const typeKey = type === 'builtin' ? 'builtin' : 'custom';
      const selectedIds = Array.from(this.state.selection[typeKey]);

      if (selectedIds.length === 0) {
        this.showMessage('请选择要禁用的应用', 'warning');
        return;
      }

      if (confirm(`确定要禁用选中的 ${selectedIds.length} 个应用吗？`)) {
        const dataManager = type === 'builtin'
          ? AppDataManagerV2.builtinApps
          : AppDataManagerV2.customApps;

        const result = await dataManager.batchUpdateStatus(selectedIds, '禁用');

        if (result.success) {
          this.showMessage(`成功禁用 ${selectedIds.length} 个应用`, 'success');
          this.clearSelection(type);
        } else {
          this.showMessage(`批量操作完成，成功${result.results.length}个，失败${result.errors.length}个`, 'info');
        }
      }
    } catch (error) {
      console.error('❌ 批量禁用失败:', error);
      this.showMessage('批量禁用失败: ' + error.message, 'error');
    }
  },

  async batchDelete(type) {
    try {
      const typeKey = type === 'builtin' ? 'builtin' : 'custom';
      const selectedIds = Array.from(this.state.selection[typeKey]);

      if (selectedIds.length === 0) {
        this.showMessage('请选择要删除的应用', 'warning');
        return;
      }

      if (type === 'builtin') {
        this.showMessage('内置应用不支持删除操作', 'warning');
        return;
      }

      if (confirm(`确定要删除选中的 ${selectedIds.length} 个应用吗？此操作不可恢复！`)) {
        const result = await AppDataManagerV2.customApps.batchDelete(selectedIds);

        if (result.success) {
          this.showMessage(`成功删除 ${selectedIds.length} 个应用`, 'success');
          this.clearSelection(type);
        } else {
          this.showMessage(`批量操作完成，成功${result.results.length}个，失败${result.errors.length}个`, 'info');
        }
      }
    } catch (error) {
      console.error('❌ 批量删除失败:', error);
      this.showMessage('批量删除失败: ' + error.message, 'error');
    }
  },

  // 清空选择
  clearSelection(type) {
    const typeKey = type === 'builtin' ? 'builtin' : 'custom';
    this.state.selection[typeKey].clear();

    // 取消所有复选框选中状态
    const checkboxes = document.querySelectorAll(`input[type="checkbox"][data-type="${type}"]`);
    checkboxes.forEach(checkbox => checkbox.checked = false);

    // 取消全选复选框
    const selectAllCheckbox = document.getElementById(`selectAll-${type}`);
    if (selectAllCheckbox) {
      selectAllCheckbox.checked = false;
      selectAllCheckbox.indeterminate = false;
    }

    this.updateSelectionUI(type);
  },

  // ===== 标签页管理 =====
  async switchTab(tabName) {
    // 更新标签状态
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
    if (activeTab) {
      activeTab.classList.add('active');
    }

    // 清理之前的选择状态
    this.clearSelection('builtin');
    this.clearSelection('custom');

    // 隐藏所有标签页内容
    document.querySelectorAll('.tab-content').forEach(content => {
      content.style.display = 'none';
      content.classList.remove('active');
    });

    // 显示目标标签页内容
    const targetContent = document.getElementById(tabName + 'Content');
    if (targetContent) {
      targetContent.style.display = 'block';
      targetContent.classList.add('active');
    }

    // 更新状态
    this.state.activeTab = tabName;

    // 重新渲染对应内容
    if (tabName === 'builtin') {
      // 确保左侧面板显示
      await this.renderAppTree();
      await this.renderBuiltinAppTable();
    } else if (tabName === 'custom') {
      // 自定义应用没有左侧面板，确保内容正确显示
      await this.renderCustomAppTable();
    }

    console.log(`✅ 切换到 ${tabName} 标签页完成`);
  },

  // ===== 事件系统 =====
  bindEvents() {
    // 使用事件委托绑定所有事件
    document.addEventListener('click', this.handleClick.bind(this));
    document.addEventListener('change', this.handleChange.bind(this));
    document.addEventListener('input', this.handleInput.bind(this));
  },

  handleClick(e) {
    const action = e.target.getAttribute('data-action');
    const tabName = e.target.getAttribute('data-tab');

    // 处理标签页切换
    if (tabName && e.target.classList.contains('tab')) {
      e.preventDefault();
      this.switchTab(tabName);
      return;
    }

    if (!action) return;

    e.preventDefault();

    switch (action) {
      // 标签页切换 (保留兼容性)
      case 'tab':
        this.switchTab(e.target.getAttribute('data-tab'));
        break;

      // 分页操作
      case 'page':
        const page = parseInt(e.target.getAttribute('data-page'));
        const type = e.target.getAttribute('data-type');
        this.goToPage(type, page);
        break;

      // 批量操作 - 内置应用
      case 'batch-enable-builtin':
        this.batchEnable('builtin');
        break;
      case 'batch-disable-builtin':
        this.batchDisable('builtin');
        break;
      case 'batch-delete-builtin':
        this.batchDelete('builtin');
        break;

      // 批量操作 - 自定义应用
      case 'batch-enable-custom':
        this.batchEnable('custom');
        break;
      case 'batch-disable-custom':
        this.batchDisable('custom');
        break;
      case 'batch-delete-custom':
        this.batchDelete('custom');
        break;

      // 应用详情
      case 'detail-builtin':
        const builtinId = parseInt(e.target.getAttribute('data-id'));
        this.showAppDetail(builtinId, 'builtin');
        break;

      // 自定义应用操作
      case 'create-custom':
        this.createCustomApp();
        break;
      case 'edit-custom':
        const editId = parseInt(e.target.getAttribute('data-id'));
        this.editCustomApp(editId);
        break;
      case 'delete-custom':
        const deleteId = parseInt(e.target.getAttribute('data-id'));
        this.deleteCustomApp(deleteId);
        break;
    }
  },

  handleChange(e) {
    // 复选框变化
    if (e.target.type === 'checkbox') {
      const dataType = e.target.getAttribute('data-type');

      if (dataType) {
        // 普通复选框
        this.handleCheckboxChange(e.target);
      } else if (e.target.id.startsWith('selectAll-')) {
        // 全选复选框
        const type = e.target.id.includes('builtin') ? 'builtin' : 'custom';
        this.handleSelectAll(type, e.target.checked);
      }
    }
  },

  handleInput(e) {
    // 搜索输入
    if (e.target.classList.contains('search-input')) {
      const type = e.target.getAttribute('data-type');
      const keyword = e.target.value.trim().toLowerCase();

      // 防抖处理
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        this.handleSearch(type, keyword);
      }, 300);
    }
  },

  // ===== CRUD操作 =====
  // 显示应用详情
  async showAppDetail(appId, type) {
    try {
      const dataManager = type === 'builtin'
        ? AppDataManagerV2.builtinApps
        : AppDataManagerV2.customApps;

      const app = await dataManager.getById(appId);
      if (!app) {
        this.showMessage('应用不存在', 'error');
        return;
      }

      this.showDetailPanel(app, type);
    } catch (error) {
      console.error('❌ 获取应用详情失败:', error);
      this.showMessage('获取应用详情失败', 'error');
    }
  },

  // 创建自定义应用
  createCustomApp() {
    this.showEditPanel(null, 'custom', 'create');
  },

  // 编辑自定义应用
  async editCustomApp(appId) {
    try {
      const app = await AppDataManagerV2.customApps.getById(appId);
      if (!app) {
        this.showMessage('应用不存在', 'error');
        return;
      }

      this.showEditPanel(app, 'custom', 'edit');
    } catch (error) {
      console.error('❌ 获取应用数据失败:', error);
      this.showMessage('获取应用数据失败', 'error');
    }
  },

  // 删除自定义应用
  async deleteCustomApp(appId) {
    try {
      const app = await AppDataManagerV2.customApps.getById(appId);
      if (!app) {
        this.showMessage('应用不存在', 'error');
        return;
      }

      if (confirm(`确定要删除应用"${app.name}"吗？此操作不可恢复！`)) {
        await AppDataManagerV2.customApps.delete(appId);
        this.showMessage('应用删除成功', 'success');
      }
    } catch (error) {
      console.error('❌ 删除应用失败:', error);
      this.showMessage('删除应用失败: ' + error.message, 'error');
    }
  },

  // ===== 面板管理 =====
  // 显示详情面板
  showDetailPanel(app, type) {
    this.state.panels = {
      isOpen: true,
      type: 'detail',
      data: app
    };

    this.createDetailPanel(app, type);
  },

  // 显示编辑面板
  showEditPanel(app, type, mode) {
    this.state.panels = {
      isOpen: true,
      type: mode, // 'create' | 'edit'
      data: app
    };

    this.createEditPanel(app, type, mode);
  },

  // 创建详情面板
  createDetailPanel(app, type) {
    // 移除已存在的面板
    const existingPanel = document.querySelector('.app-management-panel-v2');
    if (existingPanel) {
      existingPanel.remove();
    }

    // 创建遮罩层
    const overlay = document.createElement('div');
    overlay.className = 'app-management-overlay-v2';

    // 创建面板
    const panel = document.createElement('div');
    panel.className = 'app-management-panel-v2';
    panel.innerHTML = this.getDetailPanelHTML(app, type);

    document.body.appendChild(overlay);
    document.body.appendChild(panel);

    // 显示动画
    setTimeout(() => {
      overlay.classList.add('show');
      panel.classList.add('show');
    }, 10);

    // 绑定面板事件
    this.bindPanelEvents(panel, overlay, 'detail');
  },

  // 创建编辑面板
  createEditPanel(app, type, mode) {
    // 移除已存在的面板
    const existingPanel = document.querySelector('.app-management-panel-v2');
    if (existingPanel) {
      existingPanel.remove();
    }

    // 创建遮罩层
    const overlay = document.createElement('div');
    overlay.className = 'app-management-overlay-v2';

    // 创建面板
    const panel = document.createElement('div');
    panel.className = 'app-management-panel-v2';
    panel.innerHTML = this.getEditPanelHTML(app, type, mode);

    document.body.appendChild(overlay);
    document.body.appendChild(panel);

    // 显示动画
    setTimeout(() => {
      overlay.classList.add('show');
      panel.classList.add('show');
    }, 10);

    // 绑定面板事件
    this.bindPanelEvents(panel, overlay, mode, app, type);
  },

  // 获取详情面板HTML
  getDetailPanelHTML(app, type) {
    const isBuiltin = type === 'builtin';

    return `
            <div class="panel-header">
                <h3>应用详情</h3>
                <button class="btn-close">&times;</button>
            </div>
            <div class="panel-body">
                <div class="app-detail-panel">
                    <div class="app-detail-header">
                        <div class="app-icon">📱</div>
                        <div class="app-info">
                            <div class="app-name">${app.name}</div>
                            <div class="app-category">${isBuiltin ? `${app.category} - ${app.type}` : app.type}</div>
                        </div>
                        <span class="app-status ${(app.status === '启用' || app.status === true) ? 'enabled' : 'disabled'}">
                            ${(app.status === '启用' || app.status === true) ? '启用' : '禁用'}
                        </span>
                    </div>
                    
                    <div class="detail-section">
                        <h4>基本信息</h4>
                        <div class="detail-item">
                            <span class="detail-label">应用名称：</span>
                            <span class="detail-value">${app.name}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">访问地址：</span>
                            <span class="detail-value">${app.address}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">应用类型：</span>
                            <span class="detail-value">${app.type}</span>
                        </div>
                        ${isBuiltin ? `
                        <div class="detail-item">
                            <span class="detail-label">应用分类：</span>
                            <span class="detail-value">${app.category}</span>
                        </div>
                        ` : ''}
                        <div class="detail-item">
                            <span class="detail-label">当前状态：</span>
                            <span class="detail-value">${(app.status === '启用' || app.status === true) ? '启用' : '禁用'}</span>
                        </div>
                        ${!isBuiltin ? `
                        <div class="detail-item">
                            <span class="detail-label">创建时间：</span>
                            <span class="detail-value">${this.formatTime(app.createTime)}</span>
                        </div>
                        ` : ''}
                    </div>
                    
                    ${(isBuiltin && app.description) ? `
                    <div class="detail-section">
                        <h4>应用描述</h4>
                        <div class="detail-item">
                            <span class="detail-value">${app.description}</span>
                        </div>
                    </div>
                    ` : ''}
                    
                    ${(isBuiltin && app.tags && app.tags.length > 0) ? `
                    <div class="detail-section">
                        <h4>应用标签</h4>
                        <div class="app-tags">
                            ${app.tags.map(tag => `<span class="app-tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                    ` : ''}
                </div>
            </div>
            <div class="panel-footer">
                <button class="btn-close-panel">关闭</button>
            </div>
        `;
  },

  // 获取编辑面板HTML
  getEditPanelHTML(app, type, mode) {
    const isEdit = mode === 'edit';
    const title = isEdit ? '编辑自定义应用' : '新建自定义应用';

    return `
            <div class="panel-header">
                <h3>${title}</h3>
                <button class="btn-close">&times;</button>
            </div>
            <div class="panel-body">
                <form class="app-edit-form">
                    <div class="form-section">
                        <h4>基本信息</h4>
                        <div class="form-item">
                            <label class="required">应用名称</label>
                            <input type="text" id="appName" class="form-input" placeholder="请输入应用名称" 
                                   value="${app ? app.name : ''}" required>
                        </div>
                        <div class="form-item">
                            <label class="required">访问地址</label>
                            <input type="text" id="appAddress" class="form-input" placeholder="请输入访问地址" 
                                   value="${app ? app.address : ''}" required>
                        </div>
                        <div class="form-item">
                            <label class="required">应用类型</label>
                            <input type="text" id="appType" class="form-input" placeholder="请输入应用类型" 
                                   value="${app ? app.type : ''}" required>
                        </div>
                    </div>
                    
                    <div class="form-section">
                        <h4>状态设置</h4>
                        <div class="form-item">
                            <div class="switch-container">
                                <span class="switch-label">启用该应用</span>
                                <label class="switch">
                                    <input type="checkbox" id="appStatus" ${app && (app.status === '启用' || app.status === true) ? 'checked' : ''}>
                                    <span class="slider round"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="panel-footer">
                <button class="btn-cancel">取消</button>
                <button class="btn-confirm">确定</button>
            </div>
        `;
  },

  // 绑定面板事件
  bindPanelEvents(panel, overlay, panelType, app, type) {
    // 关闭面板
    const closePanel = () => {
      overlay.classList.remove('show');
      panel.classList.remove('show');
      setTimeout(() => {
        overlay.remove();
        panel.remove();
        this.state.panels.isOpen = false;
      }, 300);
    };

    // 绑定关闭事件
    const closeButtons = panel.querySelectorAll('.btn-close, .btn-close-panel, .btn-cancel');
    closeButtons.forEach(btn => {
      btn.addEventListener('click', closePanel);
    });
    overlay.addEventListener('click', closePanel);

    // 如果是编辑面板，绑定确定按钮
    if (panelType === 'create' || panelType === 'edit') {
      const confirmBtn = panel.querySelector('.btn-confirm');
      if (confirmBtn) {
        confirmBtn.addEventListener('click', async () => {
          try {
            await this.handlePanelSubmit(panel, app, type, panelType);
            closePanel();
          } catch (error) {
            // 即使出错也要关闭面板，让用户可以重新操作
            console.error('❌ 面板提交失败，但仍关闭面板:', error);
            closePanel();
          }
        });
      }
    }
  },

  // 处理面板提交
  async handlePanelSubmit(panel, app, type, mode) {
    try {
      // 收集表单数据
      const formData = this.collectPanelFormData(panel);

      // 验证表单
      if (!this.validatePanelFormData(formData)) {
        return;
      }

      if (mode === 'create') {
        // 创建新应用
        await AppDataManagerV2.customApps.create(formData);
        this.showMessage('自定义应用创建成功', 'success');
      } else {
        // 更新应用
        await AppDataManagerV2.customApps.update(app.id, formData);
        this.showMessage('自定义应用更新成功', 'success');
      }
    } catch (error) {
      console.error('❌ 保存应用失败:', error);
      this.showMessage('保存失败: ' + error.message, 'error');
    }
  },

  // 收集面板表单数据
  collectPanelFormData(panel) {
    const formData = {};

    // 基本信息
    formData.name = panel.querySelector('#appName').value.trim();
    formData.address = panel.querySelector('#appAddress').value.trim();
    formData.type = panel.querySelector('#appType').value.trim();
    formData.status = panel.querySelector('#appStatus').checked ? '启用' : '禁用';

    return formData;
  },

  // 验证面板表单数据
  validatePanelFormData(formData) {
    if (!formData.name) {
      this.showMessage('请输入应用名称', 'warning');
      return false;
    }

    if (!formData.address) {
      this.showMessage('请输入访问地址', 'warning');
      return false;
    }

    if (!formData.type) {
      this.showMessage('请输入应用类型', 'warning');
      return false;
    }

    return true;
  },

  // 初始渲染
  async initialRender() {
    try {
      // 等待一下确保DOM完全加载
      await new Promise(resolve => setTimeout(resolve, 200));

      // 检查DOM元素是否存在
      const container = document.querySelector('.app-management-container');
      if (!container) {
        console.error('❌ 应用管理DOM元素未找到');
        return;
      }

      console.log('🎨 开始应用管理初始渲染...');

      // 🔑 关键：确保默认tab正确显示（包含完整的tab状态管理）
      await this.switchTab('builtin');

      console.log('✅ 应用管理初始渲染完成');

    } catch (error) {
      console.error('❌ 应用管理初始渲染失败:', error);
    }
  },

  // 样式注入 - 保持与原版完全一致
  injectStyles() {
    if (document.querySelector('#appManagementV2Styles')) return;

    const style = document.createElement('style');
    style.id = 'appManagementV2Styles';
    style.textContent = `
            /* 应用管理V2基础样式 - 与原版保持一致 */
            .app-management-container {
                display: flex !important;
                height: calc(100vh - 200px) !important;
                min-height: 600px !important;
                background: #fff !important;
                border: 1px solid #e8e8e8 !important;
                border-radius: 6px !important;
            }
            
            .tab-content {
                width: 100% !important;
                overflow: hidden !important;
            }
            
            .tab-content:not(.active) {
                display: none !important;
            }
            
            .left-panel {
                width: 280px !important;
                border-right: 1px solid #e8e8e8 !important;
                display: flex !important;
                flex-direction: column !important;
                background: #fafafa !important;
            }
            
            .right-panel {
                flex: 1 !important;
                display: flex !important;
                flex-direction: column !important;
                background: #fff !important;
            }
            
            .left-panel .search-box {
                padding: 16px !important;
                border-bottom: 1px solid #f0f0f0 !important;
                background: #fafafa !important;
            }
            
            .left-panel .search-input {
                width: 100% !important;
                height: 36px !important;
                padding: 0 12px !important;
                border: 1px solid #e8e8e8 !important;
                border-radius: 6px !important;
                font-size: 14px !important;
                background: #fff !important;
            }
            
            .left-panel .search-input:focus {
                outline: none !important;
                border-color: #1890ff !important;
                box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1) !important;
            }
            
            .tree-container {
                flex: 1 !important;
                overflow-y: auto !important;
                padding: 8px 0 !important;
            }
            
            .custom-app-container {
                padding: 16px !important;
                background: #fff !important;
                min-height: calc(100vh - 200px) !important;
            }
            
            .actions {
                padding: 16px !important;
                border-bottom: 1px solid #e8e8e8 !important;
                display: flex !important;
                justify-content: space-between !important;
                align-items: center !important;
            }
            
            .search-box {
                display: flex !important;
                align-items: center !important;
                gap: 8px !important;
            }
            
            .search-input {
                width: 240px !important;
                height: 32px !important;
                padding: 0 12px !important;
                border: 1px solid #e8e8e8 !important;
                border-radius: 4px !important;
            }
            
            .search-btn {
                cursor: pointer !important;
                color: #666 !important;
            }
            
            .batch-actions {
                display: none !important;
                align-items: center !important;
                gap: 12px !important;
                padding: 12px 16px !important;
                background: #f5f5f5 !important;
                border-bottom: 1px solid #e8e8e8 !important;
            }
            
            .batch-btn {
                padding: 6px 12px !important;
                border: 1px solid #d9d9d9 !important;
                background: white !important;
                border-radius: 4px !important;
                cursor: pointer !important;
                font-size: 12px !important;
            }
            
            .batch-btn:hover {
                border-color: #1890ff !important;
                color: #1890ff !important;
            }
            
            .batch-btn.danger {
                border-color: #ff4d4f !important;
                color: #ff4d4f !important;
            }
            
            .batch-btn.danger:hover {
                background: #ff4d4f !important;
                color: white !important;
            }
            
            .app-table {
                width: 100% !important;
                border-collapse: collapse !important;
                flex: 1 !important;
            }
            
            .app-table th,
            .app-table td {
                padding: 12px 16px !important;
                text-align: left !important;
                border-bottom: 1px solid #f0f0f0 !important;
            }
            
            .app-table th {
                background: #fafafa !important;
                font-weight: 500 !important;
                color: #262626 !important;
            }
            
            .app-table tbody tr:hover {
                background: #f5f5f5 !important;
            }
            
            .app-status {
                padding: 2px 8px !important;
                border-radius: 12px !important;
                font-size: 12px !important;
                font-weight: 500 !important;
            }
            
            .app-status.enabled {
                background: #f6ffed !important;
                color: #52c41a !important;
                border: 1px solid #b7eb8f !important;
            }
            
            .app-status.disabled {
                background: #fff2f0 !important;
                color: #ff4d4f !important;
                border: 1px solid #ffccc7 !important;
            }
            
            .pagination {
                display: flex !important;
                justify-content: space-between !important;
                align-items: center !important;
                padding: 16px !important;
                border-top: 1px solid #e8e8e8 !important;
            }
            
            .pagination-controls {
                display: flex !important;
                align-items: center !important;
                gap: 8px !important;
            }
            
            .page-btn {
                padding: 6px 12px !important;
                border: 1px solid #d9d9d9 !important;
                background: white !important;
                border-radius: 4px !important;
                cursor: pointer !important;
                font-size: 12px !important;
            }
            
            .page-btn:disabled {
                opacity: 0.5 !important;
                cursor: not-allowed !important;
            }
            
            .page-btn.active {
                background: #1890ff !important;
                color: white !important;
                border-color: #1890ff !important;
            }
            
            .page-btn:not(:disabled):not(.active):hover {
                border-color: #1890ff !important;
                color: #1890ff !important;
            }
            
            .btn-new {
                padding: 8px 16px !important;
                background: #1890ff !important;
                color: white !important;
                border: none !important;
                border-radius: 4px !important;
                cursor: pointer !important;
                font-size: 14px !important;
            }
            
            .btn-new:hover {
                background: #40a9ff !important;
            }
            
            /* 消息提示样式 */
            .app-management-message-v2 {
                position: fixed !important;
                top: 20px !important;
                right: 20px !important;
                padding: 12px 20px !important;
                border-radius: 4px !important;
                color: white !important;
                font-weight: 500 !important;
                z-index: 10000 !important;
                transform: translateX(400px) !important;
                transition: transform 0.3s ease !important;
            }
            
            .app-management-message-v2.show {
                transform: translateX(0) !important;
            }
            
            .app-management-message-success { background: #52c41a !important; }
            .app-management-message-error { background: #ff4d4f !important; }
            .app-management-message-warning { background: #faad14 !important; }
            .app-management-message-info { background: #1890ff !important; }
            
            /* 树形结构样式 - 与原版保持完全一致 */
            .tree-node {
                margin: 0 !important;
            }
            
            .tree-node-content {
                display: flex !important;
                align-items: center !important;
                padding: 8px 16px !important;
                cursor: pointer !important;
                border-radius: 4px !important;
                margin: 2px 8px !important;
                transition: background-color 0.2s !important;
            }
            
            .tree-node-content:hover {
                background: #f5f5f5 !important;
            }
            
            .tree-node-content.selected {
                background: #e6f7ff !important;
                color: #1890ff !important;
            }
            
            .tree-toggle {
                width: 16px !important;
                height: 16px !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                margin-right: 8px !important;
                font-size: 12px !important;
                cursor: pointer !important;
                user-select: none !important;
                transition: transform 0.2s !important;
            }
            
            .tree-toggle.expanded {
                transform: rotate(0deg) !important;
            }
            
            .tree-icon {
                margin-right: 8px !important;
                font-size: 16px !important;
            }
            
            .tree-label {
                flex: 1 !important;
                font-size: 14px !important;
                color: #262626 !important;
                white-space: nowrap !important;
                overflow: hidden !important;
                text-overflow: ellipsis !important;
            }
            
            .tree-count {
                font-size: 12px !important;
                color: #8c8c8c !important;
                background: #f5f5f5 !important;
                padding: 2px 6px !important;
                border-radius: 10px !important;
                min-width: 18px !important;
                text-align: center !important;
            }
            
            .tree-node-content.selected .tree-count {
                background: #bae7ff !important;
                color: #1890ff !important;
            }
            
            .tree-children {
                margin-left: 16px !important;
                overflow: hidden !important;
                transition: max-height 0.3s ease-out !important;
                max-height: 1000px !important;
            }
            
            .tree-children.collapsed {
                max-height: 0 !important;
                transition: max-height 0.3s ease-in !important;
            }
            
            .tree-node-child .tree-node-content {
                padding-left: 32px !important;
                font-size: 13px !important;
            }
            
            .tree-node-child .tree-icon {
                font-size: 14px !important;
            }
            
            /* 链接样式 */
            .link-detail, .link-edit, .link-delete {
                color: #1890ff !important;
                text-decoration: none !important;
                margin-right: 8px !important;
                font-size: 12px !important;
            }
            
            .link-detail:hover, .link-edit:hover {
                color: #40a9ff !important;
                text-decoration: underline !important;
            }
            
            .link-delete {
                color: #ff4d4f !important;
            }
            
            .link-delete:hover {
                color: #ff7875 !important;
                text-decoration: underline !important;
            }
            
            /* 面板样式 - 与原版保持一致 */
            .app-management-panel-v2 {
                position: fixed !important;
                top: 0 !important;
                right: -640px !important;
                width: 640px !important;
                height: 100vh !important;
                background: #fff !important;
                box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15) !important;
                z-index: 9999 !important;
                display: flex !important;
                flex-direction: column !important;
                transition: right 0.3s ease-in-out !important;
            }
            
            .app-management-panel-v2.show {
                right: 0 !important;
            }
            
            .app-management-overlay-v2 {
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                width: 100% !important;
                height: 100% !important;
                background: rgba(0, 0, 0, 0.5) !important;
                z-index: 9998 !important;
                opacity: 0 !important;
                transition: opacity 0.3s ease-in-out !important;
            }
            
            .app-management-overlay-v2.show {
                opacity: 1 !important;
            }
            
            .panel-header {
                padding: 20px 24px !important;
                border-bottom: 1px solid #e8e8e8 !important;
                display: flex !important;
                justify-content: space-between !important;
                align-items: center !important;
                background: #fafafa !important;
            }
            
            .panel-header h3 {
                margin: 0 !important;
                font-size: 18px !important;
                font-weight: 600 !important;
                color: #262626 !important;
            }
            
            .btn-close {
                border: none !important;
                background: none !important;
                font-size: 24px !important;
                cursor: pointer !important;
                color: #8c8c8c !important;
                padding: 4px !important;
                border-radius: 4px !important;
                transition: all 0.3s !important;
                width: 32px !important;
                height: 32px !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
            }
            
            .btn-close:hover {
                background: #f0f0f0 !important;
                color: #262626 !important;
            }
            
            .panel-body {
                flex: 1 !important;
                padding: 32px 24px !important;
                overflow-y: auto !important;
                background: #fff !important;
            }
            
            .panel-footer {
                padding: 20px 24px !important;
                border-top: 1px solid #e8e8e8 !important;
                text-align: right !important;
                background: #fafafa !important;
                display: flex !important;
                justify-content: flex-end !important;
                gap: 12px !important;
            }
            
            .btn-cancel, .btn-confirm, .btn-close-panel {
                padding: 10px 20px !important;
                border-radius: 6px !important;
                cursor: pointer !important;
                font-size: 14px !important;
                font-weight: 500 !important;
                transition: all 0.3s ease !important;
                border: none !important;
                min-width: 80px !important;
            }
            
            .btn-cancel, .btn-close-panel {
                border: 1px solid #d9d9d9 !important;
                background: white !important;
                color: #595959 !important;
            }
            
            .btn-cancel:hover, .btn-close-panel:hover {
                border-color: #40a9ff !important;
                color: #40a9ff !important;
            }
            
            .btn-confirm {
                background: #1890ff !important;
                color: white !important;
                border: 1px solid #1890ff !important;
            }
            
            .btn-confirm:hover {
                background: #40a9ff !important;
                border-color: #40a9ff !important;
                transform: translateY(-1px) !important;
                box-shadow: 0 4px 8px rgba(24, 144, 255, 0.3) !important;
            }
            
            /* 详情面板样式 */
            .app-detail-header {
                display: flex !important;
                align-items: center !important;
                padding: 20px 0 !important;
                border-bottom: 1px solid #f0f0f0 !important;
                margin-bottom: 24px !important;
            }
            
            .app-icon {
                font-size: 48px !important;
                margin-right: 16px !important;
            }
            
            .app-info {
                flex: 1 !important;
            }
            
            .app-info .app-name {
                font-size: 20px !important;
                font-weight: 500 !important;
                margin-bottom: 4px !important;
            }
            
            .app-info .app-category {
                color: #8c8c8c !important;
                font-size: 14px !important;
            }
            
            .detail-section {
                margin-bottom: 32px !important;
            }
            
            .detail-section h4 {
                margin: 0 0 16px 0 !important;
                font-size: 14px !important;
                font-weight: 500 !important;
            }
            
            .detail-item {
                display: flex !important;
                margin-bottom: 12px !important;
            }
            
            .detail-label {
                width: 100px !important;
                color: #8c8c8c !important;
                font-size: 14px !important;
            }
            
            .detail-value {
                flex: 1 !important;
                font-size: 14px !important;
                color: #262626 !important;
            }
            
            .app-tags {
                display: flex !important;
                flex-wrap: wrap !important;
                gap: 8px !important;
            }
            
            .app-tag {
                padding: 4px 8px !important;
                background: #f5f5f5 !important;
                border-radius: 4px !important;
                font-size: 12px !important;
                color: #666 !important;
            }
            
            /* 编辑表单样式 */
            .form-section {
                margin-bottom: 32px !important;
                padding: 20px !important;
                background: #fafafa !important;
                border-radius: 6px !important;
                border: 1px solid #f0f0f0 !important;
            }
            
            .form-section h4 {
                margin: 0 0 20px 0 !important;
                font-size: 16px !important;
                font-weight: 500 !important;
                color: #262626 !important;
                padding-bottom: 8px !important;
                border-bottom: 1px solid #e8e8e8 !important;
            }
            
            .form-item {
                margin-bottom: 20px !important;
            }
            
            .form-item:last-child {
                margin-bottom: 0 !important;
            }
            
            .form-item label {
                display: block !important;
                margin-bottom: 8px !important;
                font-size: 14px !important;
                font-weight: 500 !important;
                color: #262626 !important;
            }
            
            .required:before {
                content: "*" !important;
                color: #ff4d4f !important;
                margin-right: 4px !important;
            }
            
            .form-input {
                width: 100% !important;
                height: 40px !important;
                padding: 8px 12px !important;
                border: 1px solid #d9d9d9 !important;
                border-radius: 6px !important;
                box-sizing: border-box !important;
                font-size: 14px !important;
                background: #fff !important;
                transition: border-color 0.3s, box-shadow 0.3s !important;
            }
            
            .form-input:focus {
                outline: none !important;
                border-color: #1890ff !important;
                box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1) !important;
            }
            
            .form-input::placeholder {
                color: #bfbfbf !important;
                font-size: 14px !important;
            }
            
            .switch-container {
                display: flex !important;
                align-items: center !important;
                justify-content: space-between !important;
                padding: 12px 0 !important;
            }
            
            .switch-label {
                font-size: 14px !important;
                font-weight: 500 !important;
                color: #262626 !important;
                margin: 0 !important;
                flex: 1 !important;
            }
            
            .switch {
                position: relative !important;
                display: inline-block !important;
                margin-left: 16px !important;
            }
            
            .switch input {
                opacity: 0 !important;
                width: 0 !important;
                height: 0 !important;
            }
            
            .slider {
                position: relative !important;
                display: inline-block !important;
                width: 44px !important;
                height: 24px !important;
                background-color: #d9d9d9 !important;
                border-radius: 24px !important;
                cursor: pointer !important;
                transition: background-color 0.3s ease !important;
                box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1) !important;
            }
            
            .slider:before {
                position: absolute !important;
                content: "" !important;
                height: 20px !important;
                width: 20px !important;
                left: 2px !important;
                bottom: 2px !important;
                background-color: white !important;
                border-radius: 50% !important;
                transition: transform 0.3s ease !important;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2) !important;
            }
            
            .switch input:checked + .slider {
                background-color: #1890ff !important;
            }
            
            .switch input:checked + .slider:before {
                transform: translateX(20px) !important;
            }
            
            .slider.round {
                border-radius: 24px !important;
            }
            
            .slider.round:before {
                border-radius: 50% !important;
            }
        `;

    document.head.appendChild(style);
  }
};

// 自动初始化
document.addEventListener('DOMContentLoaded', () => {
  // 延迟初始化，确保其他脚本加载完成
  setTimeout(() => {
    if (window.appManagementV2) {
      appManagementV2.init().catch(error => {
        console.error('❌ appManagementV2自动初始化失败:', error);
      });
    }
  }, 100);
});

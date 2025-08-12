// 开放接口页面模块 V2 - 完整的数据持久化和无闪屏更新系统
window.openApiV2 = {
  id: 'openApi',
  title: '开放接口',

  // 初始化状态
  initialized: false,

  // 状态管理
  state: {
    // 分页状态
    pagination: {
      currentPage: 1,
      pageSize: 10,
      total: 0,
      totalPages: 0
    },

    // 搜索状态
    search: {
      keyword: ''
    },

    // 选择状态
    selection: new Set(),

    // 面板状态
    panels: {
      isOpen: false,
      type: null, // 'create' | 'edit'
      data: null
    },

    // 密钥显示状态
    secretVisibility: new Map() // keyId -> boolean
  },

  // ===== 初始化 =====
  async init() {
    if (this.initialized) return;

    try {
      console.log('🚀 初始化openApiV2...');

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
      console.log('✅ openApiV2初始化完成');

      // 初始渲染 - 稍微延迟确保DOM就绪
      setTimeout(() => this.initialRender(), 300);

    } catch (error) {
      console.error('❌ openApiV2初始化失败:', error);
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
    // 监听API密钥数据变化
    AppDataManagerV2.onUpdate('apiKeys', (event) => {
      console.log('🔄 API密钥数据更新:', event);
      this.handleDataUpdate(event);
    });
  },

  // 处理数据更新
  async handleDataUpdate(event) {
    try {
      // 重新渲染表格
      await this.renderTable();

      // 更新选择状态
      this.updateSelectionUI();

    } catch (error) {
      console.error('❌ 处理数据更新失败:', error);
    }
  },

  // 初始渲染
  async initialRender() {
    try {
      // 等待一下确保DOM完全加载
      await new Promise(resolve => setTimeout(resolve, 200));

      // 渲染表格
      await this.renderTable();

      console.log('✅ 初始渲染完成');
    } catch (error) {
      console.error('❌ 初始渲染失败:', error);
    }
  },

  // ===== 页面内容模板 =====
  content() {
    return `
            <div class="header">
                <h1>开放接口</h1>
                <p>配置全面的SDK和API接口，包括跨平台SDK支持、API接口权限控制</p>
            </div>

            <div class="actions">
                <button class="btn-new-key" data-action="create-key">
                    <svg class="icon" viewBox="64 64 896 896" width="14" height="14" fill="currentColor">
                        <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"></path>
                        <path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"></path>
                    </svg>
                    新建密钥
                </button>
                <div class="search-box">
                    <input type="text" class="search-input" placeholder="请输入关键字进行搜索" data-action="search">
                    <button class="search-btn" data-action="search-btn">🔍</button>
                </div>
            </div>

            <table class="data-table">
                <thead>
                    <tr>
                        <th width="40"><input type="checkbox" id="selectAll"></th>
                        <th>密钥用途</th>
                        <th>AccessKey ID</th>
                        <th>AccessKey Secret</th>
                        <th>角色</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody id="keyTableBody">
                    <!-- 表格数据将通过 JavaScript 动态插入 -->
                </tbody>
            </table>

            <div class="table-footer">
                <div class="batch-actions" id="batch-actions" style="display: none;">
                    <input type="checkbox" id="selectAllFooter"> 已选 <span id="selectedCount">0</span> 条
                    <button class="batch-btn danger" data-action="batch-delete">删除</button>
                </div>
                <div class="pagination" id="pagination">
                    <span id="totalCount">共 0 条记录</span>
                    <button class="page-btn" id="prevPage" data-action="prev-page">＜</button>
                    <button class="page-btn active" id="currentPage">1</button>
                    <button class="page-btn" id="nextPage" data-action="next-page">＞</button>
                    <select id="pageSize" data-action="page-size">
                        <option value="10">10 条/页</option>
                        <option value="20">20 条/页</option>
                        <option value="50">50 条/页</option>
                    </select>
                </div>
            </div>
        `;
  },

  // ===== 样式注入 - 完全还原原始CSS =====
  injectStyles() {
    if (document.querySelector('#openApiV2Styles')) return;

    const style = document.createElement('style');
    style.id = 'openApiV2Styles';
    style.textContent = `
            /* 完全还原原始openApi.js的CSS样式 */
            .copy-icon {
                border: none;
                background: none;
                color: #1890ff;
                cursor: pointer;
                padding: 4px;
                margin-left: 8px;
                line-height: 1;
                display: inline-flex;
                align-items: center;
                justify-content: center;
            }

            .copy-icon:hover {
                color: #40a9ff;
            }

            .copy-icon svg {
                display: block;
            }

            .btn-new-key {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                height: 32px;
                padding: 0 15px;
                background: #1890ff;
                border: none;
                border-radius: 4px;
                color: white;
                font-size: 14px;
                cursor: pointer;
                transition: background-color 0.3s;
            }

            .btn-new-key:hover {
                background: #40a9ff;
            }

            .btn-new-key .icon {
                margin-right: 4px;
            }

            .page-btn:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }

            .page-btn:not(:disabled):hover {
                background-color: #f0f0f0;
            }

            .search-box {
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .search-input {
                padding: 8px 12px;
                border: 1px solid #d9d9d9;
                border-radius: 4px;
                width: 200px;
            }

            .search-btn {
                padding: 8px 12px;
                background: #1890ff;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
            }

            .search-btn:hover {
                background: #40a9ff;
            }

            .secret-toggle-btn {
                border: none;
                background: none;
                color: #1890ff;
                cursor: pointer;
                padding: 4px 8px;
                margin-left: 8px;
                font-size: 12px;
                border-radius: 2px;
                transition: all 0.3s;
                width: 30px;
                height: 24px;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
            }

            .secret-toggle-btn:hover {
                background-color: #f0f8ff;
            }

            .btn-show-secret {
                color: #1890ff;
            }

            .btn-hide-secret {
                color: #ff4d4f;
            }

            .btn-hide-secret:hover {
                background-color: #fff1f0;
            }

            /* 固定表格列宽 */
            .data-table {
                table-layout: fixed;
                width: 100%;
            }

            .data-table th,
            .data-table td {
                word-wrap: break-word;
                overflow: hidden;
                text-overflow: ellipsis;
                padding: 8px 12px;
            }

            /* 固定各列宽度 */
            .data-table th:nth-child(1),
            .data-table td:nth-child(1) {
                width: 50px;
                min-width: 50px;
                max-width: 50px;
            }

            .data-table th:nth-child(2),
            .data-table td:nth-child(2) {
                width: 180px;
                min-width: 180px;
                max-width: 180px;
            }

            .data-table th:nth-child(3),
            .data-table td:nth-child(3) {
                width: 200px;
                min-width: 200px;
                max-width: 200px;
            }

            /* 固定AccessKey Secret列宽度 */
            .data-table th:nth-child(4),
            .data-table td:nth-child(4) {
                width: 280px;
                min-width: 280px;
                max-width: 280px;
            }

            .data-table th:nth-child(5),
            .data-table td:nth-child(5) {
                width: 100px;
                min-width: 100px;
                max-width: 100px;
            }

            .data-table th:nth-child(6),
            .data-table td:nth-child(6) {
                width: 80px;
                min-width: 80px;
                max-width: 80px;
            }

            .data-table th:nth-child(7),
            .data-table td:nth-child(7) {
                width: 120px;
                min-width: 120px;
                max-width: 120px;
            }

            /* 确保AccessKey Secret内容不会换行 */
            .data-table td:nth-child(4) .secret-content {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                display: inline-block;
                max-width: 220px;
                vertical-align: middle;
            }

            /* 批量操作样式 */
            .batch-actions {
                display: none;
                align-items: center;
                gap: 12px;
                padding: 10px;
                background: #f5f5f5;
                border-radius: 4px;
                margin-bottom: 16px;
            }

            .batch-actions button {
                padding: 6px 12px;
                border: 1px solid #d9d9d9;
                background: white;
                border-radius: 4px;
                cursor: pointer;
            }

            .batch-actions button:hover {
                border-color: #1890ff;
                color: #1890ff;
            }

            .batch-actions button.danger {
                border-color: #ff4d4f;
                color: #ff4d4f;
            }

            .batch-actions button.danger:hover {
                background: #ff4d4f;
                color: white;
            }

            /* 分页样式 */
            .pagination {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 16px;
            }

            .page-btn {
                padding: 6px 12px;
                border: 1px solid #d9d9d9;
                background: white;
                border-radius: 4px;
                cursor: pointer;
                margin: 0 2px;
            }

            .page-btn.active {
                background: #1890ff;
                color: white;
                border-color: #1890ff;
            }

            .page-btn:not(:disabled):not(.active):hover {
                border-color: #1890ff;
                color: #1890ff;
            }

            #pageSize {
                padding: 6px 8px;
                border: 1px solid #d9d9d9;
                border-radius: 4px;
                margin-left: 12px;
            }

            /* 开关样式 */
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

            /* 消息提示样式 */
            .openapi-message-v2 {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 12px 20px;
                border-radius: 4px;
                color: white;
                font-weight: 500;
                z-index: 10000;
                transform: translateX(400px);
                transition: transform 0.3s ease;
                max-width: 300px;
                word-wrap: break-word;
            }

            .openapi-message-v2.show {
                transform: translateX(0);
            }

            .openapi-message-success { background: #52c41a; }
            .openapi-message-error { background: #ff4d4f; }
            .openapi-message-warning { background: #faad14; }
            .openapi-message-info { background: #1890ff; }

            /* 链接样式 */
            .link-edit, .link-delete {
                color: #1890ff;
                text-decoration: none;
                margin-right: 8px;
                font-size: 14px;
            }

            .link-edit:hover {
                color: #40a9ff;
            }

            .link-delete {
                color: #ff4d4f;
            }

            .link-delete:hover {
                color: #ff7875;
            }
        `;

    document.head.appendChild(style);
  },

  // ===== 事件绑定 =====
  bindEvents() {
    // 移除之前的事件监听器（避免重复绑定）
    document.removeEventListener('click', this.handleClick);
    document.removeEventListener('change', this.handleChange);
    document.removeEventListener('input', this.handleInput);

    // 绑定事件处理函数到this上下文
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleInput = this.handleInput.bind(this);

    // 使用事件委托绑定所有事件
    document.addEventListener('click', this.handleClick);
    document.addEventListener('change', this.handleChange);
    document.addEventListener('input', this.handleInput);

    console.log('✅ 事件绑定完成');
  },

  // 处理点击事件
  handleClick(e) {
    const action = e.target.getAttribute('data-action') || e.target.closest('[data-action]')?.getAttribute('data-action');

    console.log('🖱️ Click事件触发:', e.target.tagName, action, e.target);

    if (!action) return;

    e.preventDefault();

    switch (action) {
      case 'create-key':
        this.showCreatePanel();
        break;
      case 'search-btn':
        this.handleSearch();
        break;
      case 'batch-delete':
        this.handleBatchDelete();
        break;
      case 'prev-page':
        this.goToPrevPage();
        break;
      case 'next-page':
        this.goToNextPage();
        break;
      case 'edit-key':
        const editId = e.target.getAttribute('data-id');
        this.showEditPanel(editId);
        break;
      case 'delete-key':
        const deleteId = e.target.getAttribute('data-id');
        this.handleDeleteKey(deleteId);
        break;
      case 'copy-key':
        const copyText = e.target.getAttribute('data-text');
        this.handleCopyText(copyText);
        break;
      case 'toggle-secret':
        const keyId = e.target.getAttribute('data-key-id');
        this.toggleSecretVisibility(keyId);
        break;
      case 'toggle-status':
        // 备用处理：如果change事件没触发，用click事件处理
        const statusKeyId = e.target.getAttribute('data-key-id');
        console.log('🔄 通过Click处理状态切换, keyId:', statusKeyId);
        if (e.target.type === 'checkbox') {
          this.handleToggleStatus(statusKeyId).catch(error => {
            console.error('Click状态切换失败:', error);
            e.target.checked = !e.target.checked;
          });
        }
        break;
    }
  },

  // 处理输入事件
  handleInput(e) {
    if (e.target.classList.contains('search-input')) {
      // 防抖处理搜索
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        this.handleSearch();
      }, 300);
    }
  },

  // 处理变更事件
  handleChange(e) {
    console.log('🔄 Change事件触发:', e.target.type, e.target.getAttribute('data-action'));

    if (e.target.type === 'checkbox') {
      if (e.target.id === 'selectAll' || e.target.id === 'selectAllFooter') {
        console.log('📋 全选操作');
        this.handleSelectAll(e.target.checked);
      } else if (e.target.classList.contains('row-checkbox')) {
        console.log('☑️ 行选择操作');
        this.handleRowSelect(e.target);
      } else if (e.target.getAttribute('data-action') === 'toggle-status') {
        // 处理状态切换
        const keyId = e.target.getAttribute('data-key-id');
        console.log('🔄 状态切换操作, keyId:', keyId, '新状态:', e.target.checked);

        // 阻止默认行为
        e.preventDefault();

        // 异步处理状态切换
        this.handleToggleStatus(keyId).catch(error => {
          console.error('❌ 状态切换失败:', error);
          // 恢复checkbox状态
          e.target.checked = !e.target.checked;
        });
      } else {
        console.log('❓ 未知checkbox事件:', e.target);
      }
    } else if (e.target.id === 'pageSize') {
      this.handlePageSizeChange(e.target.value);
    }
  },

  // ===== 表格渲染 - 无闪屏更新 =====
  async renderTable() {
    try {
      const tbody = document.querySelector('#keyTableBody');
      if (!tbody) {
        console.log('❌ 表格tbody元素未找到');
        return;
      }

      // 获取筛选后的数据
      const filters = { search: this.state.search.keyword };
      const allKeys = await AppDataManagerV2.apiKeys.getAll(filters);

      console.log(`📊 获取到 ${allKeys.length} 条API密钥数据`);

      // 更新总数
      this.state.pagination.total = allKeys.length;
      this.state.pagination.totalPages = Math.ceil(allKeys.length / this.state.pagination.pageSize);

      // 分页处理
      const { currentPage, pageSize } = this.state.pagination;
      const startIndex = (currentPage - 1) * pageSize;
      const pagedKeys = allKeys.slice(startIndex, startIndex + pageSize);

      // 使用增量更新
      this.updateTableRows(tbody, pagedKeys);

      // 更新分页控件
      this.updatePagination();

      // 更新选择状态
      this.updateSelectionUI();

    } catch (error) {
      console.error('❌ 渲染表格失败:', error);
    }
  },

  // 增量更新表格行 - 核心无闪屏方法
  updateTableRows(tbody, keys) {
    const existingRows = new Map();

    // 收集现有行
    tbody.querySelectorAll('tr[data-key-id]').forEach(row => {
      const id = parseInt(row.getAttribute('data-key-id'));
      existingRows.set(id, row);
    });

    // 更新或创建行
    keys.forEach(key => {
      const existingRow = existingRows.get(key.id);

      if (existingRow) {
        // 更新现有行
        this.updateRowData(existingRow, key);
        existingRows.delete(key.id);
      } else {
        // 创建新行
        const newRow = this.createKeyRow(key);
        tbody.appendChild(newRow);
      }
    });

    // 删除不需要的行
    existingRows.forEach(row => row.remove());
  },

  // 更新行数据
  updateRowData(row, key) {
    // 更新复选框
    const checkbox = row.querySelector('input[type="checkbox"]');
    if (checkbox) {
      checkbox.value = key.id;
    }

    // 更新密钥用途
    const purposeCell = row.querySelector('.key-purpose');
    if (purposeCell && purposeCell.textContent !== key.purpose) {
      purposeCell.textContent = key.purpose;
    }

    // 更新AccessKey ID
    const keyIdCell = row.querySelector('.access-key-id');
    if (keyIdCell && keyIdCell.textContent !== key.accessKeyId) {
      keyIdCell.textContent = key.accessKeyId;
    }

    // 更新AccessKey Secret（根据显示状态）
    const secretCell = row.querySelector('.secret-content');
    if (secretCell) {
      const isVisible = this.state.secretVisibility.get(key.id) || false;
      const displayText = isVisible ? key.accessKeySecret : '********';
      if (secretCell.textContent !== displayText) {
        secretCell.textContent = displayText;
      }
    }

    // 更新切换按钮
    const toggleBtn = row.querySelector('.secret-toggle-btn');
    if (toggleBtn) {
      const isVisible = this.state.secretVisibility.get(key.id) || false;
      toggleBtn.textContent = isVisible ? '🙈' : '👁️';
      toggleBtn.className = `secret-toggle-btn ${isVisible ? 'btn-hide-secret' : 'btn-show-secret'}`;
      toggleBtn.title = isVisible ? '隐藏' : '显示';
    }

    // 更新角色
    const roleCell = row.querySelector('.key-role');
    if (roleCell && roleCell.textContent !== key.role) {
      roleCell.textContent = key.role;
    }

    // 更新状态
    const statusCell = row.querySelector('.key-status');
    if (statusCell) {
      statusCell.innerHTML = `<label class="switch"><input type="checkbox" ${key.status ? 'checked' : ''} data-action="toggle-status" data-key-id="${key.id}"><span class="slider round"></span></label>`;
    }
  },

  // 创建密钥行
  createKeyRow(key) {
    const row = document.createElement('tr');
    row.setAttribute('data-key-id', key.id);

    const isVisible = this.state.secretVisibility.get(key.id) || false;
    const secretDisplay = isVisible ? key.accessKeySecret : '********';
    const secretIcon = isVisible ? '🙈' : '👁️';
    const secretTitle = isVisible ? '隐藏' : '显示';
    const secretButtonClass = isVisible ? 'btn-hide-secret' : 'btn-show-secret';

    row.innerHTML = `
            <td><input type="checkbox" class="row-checkbox" value="${key.id}"></td>
            <td class="key-purpose">${key.purpose}</td>
            <td class="access-key-id">
                ${key.accessKeyId}
                <button class="copy-icon" title="复制" data-action="copy-key" data-text="${key.accessKeyId}">
                    <svg viewBox="64 64 896 896" width="14" height="14" fill="currentColor">
                        <path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 17.7 14.3 32 32 32h512c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zm-32 512H224V256h448v448z"/>
                    </svg>
                </button>
            </td>
            <td>
                <span class="secret-content">${secretDisplay}</span>
                <button class="secret-toggle-btn ${secretButtonClass}" title="${secretTitle}" data-action="toggle-secret" data-key-id="${key.id}">
                    ${secretIcon}
                </button>
                <button class="copy-icon" title="复制Secret" data-action="copy-key" data-text="${key.accessKeySecret}" style="margin-left: 4px;">
                    <svg viewBox="64 64 896 896" width="12" height="12" fill="currentColor">
                        <path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 17.7 14.3 32 32 32h512c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zm-32 512H224V256h448v448z"/>
                    </svg>
                </button>
            </td>
            <td class="key-role">${key.role}</td>
            <td class="key-status">
                <label class="switch">
                    <input type="checkbox" ${key.status ? 'checked' : ''} data-action="toggle-status" data-key-id="${key.id}">
                    <span class="slider round"></span>
                </label>
            </td>
            <td>
                <a href="javascript:void(0)" class="link-edit" data-action="edit-key" data-id="${key.id}">编辑</a>
                <a href="javascript:void(0)" class="link-delete" data-action="delete-key" data-id="${key.id}">删除</a>
            </td>
        `;

    return row;
  },

  // 更新分页信息
  updatePagination() {
    const totalCount = document.getElementById('totalCount');
    const currentPageBtn = document.getElementById('currentPage');
    const prevPage = document.getElementById('prevPage');
    const nextPage = document.getElementById('nextPage');
    const pageSize = document.getElementById('pageSize');

    const { currentPage, totalPages, total, pageSize: size } = this.state.pagination;

    if (totalCount) {
      totalCount.textContent = `共 ${total} 条记录`;
    }

    if (currentPageBtn) {
      currentPageBtn.textContent = currentPage;
    }

    if (prevPage) {
      prevPage.disabled = currentPage <= 1;
    }

    if (nextPage) {
      nextPage.disabled = currentPage >= totalPages;
    }

    if (pageSize) {
      pageSize.value = size;
    }
  },

  // 更新选择状态UI
  updateSelectionUI() {
    const selection = this.state.selection;

    // 更新选中数量显示
    const selectedCount = document.getElementById('selectedCount');
    if (selectedCount) {
      selectedCount.textContent = selection.size;
    }

    // 显示/隐藏批量操作
    const batchActions = document.getElementById('batch-actions');
    if (batchActions) {
      batchActions.style.display = selection.size > 0 ? 'flex' : 'none';
    }

    // 更新全选复选框状态
    const selectAllCheckbox = document.getElementById('selectAll');
    const selectAllFooter = document.getElementById('selectAllFooter');
    const checkboxes = document.querySelectorAll('.row-checkbox');
    const totalCheckboxes = checkboxes.length;
    const checkedCheckboxes = Array.from(checkboxes).filter(cb => cb.checked).length;

    const isAllChecked = totalCheckboxes > 0 && checkedCheckboxes === totalCheckboxes;
    const isPartialChecked = checkedCheckboxes > 0 && checkedCheckboxes < totalCheckboxes;

    if (selectAllCheckbox) {
      selectAllCheckbox.checked = isAllChecked;
      selectAllCheckbox.indeterminate = isPartialChecked;
    }

    if (selectAllFooter) {
      selectAllFooter.checked = isAllChecked;
      selectAllFooter.indeterminate = isPartialChecked;
    }
  },

  // ===== 搜索功能 =====
  async handleSearch() {
    const searchInput = document.querySelector('.search-input');
    const keyword = searchInput ? searchInput.value.trim() : '';

    // 更新搜索状态
    this.state.search.keyword = keyword;
    this.state.pagination.currentPage = 1; // 重置到第一页

    // 重新渲染表格
    await this.renderTable();
  },

  // ===== 分页功能 =====
  async goToPrevPage() {
    if (this.state.pagination.currentPage > 1) {
      this.state.pagination.currentPage--;
      await this.renderTable();
    }
  },

  async goToNextPage() {
    if (this.state.pagination.currentPage < this.state.pagination.totalPages) {
      this.state.pagination.currentPage++;
      await this.renderTable();
    }
  },

  async handlePageSizeChange(pageSize) {
    this.state.pagination.pageSize = parseInt(pageSize);
    this.state.pagination.currentPage = 1; // 重置到第一页
    await this.renderTable();
  },

  // ===== 选择功能 =====
  handleSelectAll(checked) {
    const checkboxes = document.querySelectorAll('.row-checkbox');

    checkboxes.forEach(checkbox => {
      checkbox.checked = checked;
      const keyId = parseInt(checkbox.value);

      if (checked) {
        this.state.selection.add(keyId);
      } else {
        this.state.selection.delete(keyId);
      }
    });

    this.updateSelectionUI();
  },

  handleRowSelect(checkbox) {
    const keyId = parseInt(checkbox.value);

    if (checkbox.checked) {
      this.state.selection.add(keyId);
    } else {
      this.state.selection.delete(keyId);
    }

    this.updateSelectionUI();
  },

  // ===== 密钥管理功能 =====
  toggleSecretVisibility(keyId) {
    const id = parseInt(keyId);
    const currentState = this.state.secretVisibility.get(id) || false;

    // 切换状态
    this.state.secretVisibility.set(id, !currentState);

    // 重新渲染表格以更新显示
    this.renderTable();
  },

  async handleCopyText(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        // 使用现代API
        await navigator.clipboard.writeText(text);
      } else {
        // 降级方案
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }

      this.showMessage('复制成功', 'success');
    } catch (error) {
      console.error('复制失败:', error);
      this.showMessage('复制失败', 'error');
    }
  },

  // ===== CRUD操作 =====
  async handleDeleteKey(id) {
    try {
      const key = await AppDataManagerV2.apiKeys.getById(parseInt(id));
      if (!key) {
        this.showMessage('密钥不存在', 'error');
        return;
      }

      if (confirm(`确定要删除密钥"${key.purpose}"吗？此操作不可恢复！`)) {
        await AppDataManagerV2.apiKeys.delete(parseInt(id));
        this.showMessage('密钥删除成功', 'success');

        // 从选择中移除
        this.state.selection.delete(parseInt(id));
      }
    } catch (error) {
      console.error('❌ 删除密钥失败:', error);
      this.showMessage('删除失败: ' + error.message, 'error');
    }
  },

  async handleBatchDelete() {
    try {
      const selectedIds = Array.from(this.state.selection);

      if (selectedIds.length === 0) {
        this.showMessage('请选择要删除的密钥', 'warning');
        return;
      }

      if (confirm(`确定要删除选中的 ${selectedIds.length} 个密钥吗？此操作不可恢复！`)) {
        const result = await AppDataManagerV2.apiKeys.batchDelete(selectedIds);

        if (result.success) {
          this.showMessage(`成功删除 ${selectedIds.length} 个密钥`, 'success');
        } else {
          this.showMessage(`批量删除完成，成功${result.results.length}个，失败${result.errors.length}个`, 'info');
        }

        // 清空选择
        this.state.selection.clear();
      }
    } catch (error) {
      console.error('❌ 批量删除失败:', error);
      this.showMessage('批量删除失败: ' + error.message, 'error');
    }
  },

  // ===== 状态切换 =====
  async handleToggleStatus(keyId) {
    try {
      console.log('🔄 开始处理状态切换, keyId:', keyId);

      const id = parseInt(keyId);
      console.log('🔢 解析后的ID:', id);

      const key = await AppDataManagerV2.apiKeys.getById(id);
      console.log('📝 获取到的密钥数据:', key);

      if (!key) {
        console.log('❌ 密钥不存在');
        this.showMessage('密钥不存在', 'error');
        return;
      }

      const newStatus = !key.status;
      console.log(`🔄 状态切换: ${key.status} -> ${newStatus}`);

      // 切换状态
      await AppDataManagerV2.apiKeys.update(id, { status: newStatus });
      console.log('✅ 数据库更新成功');

      this.showMessage(`密钥已${newStatus ? '启用' : '禁用'}`, 'success');

    } catch (error) {
      console.error('❌ 切换状态失败:', error);
      this.showMessage('操作失败: ' + error.message, 'error');
      throw error; // 重新抛出错误供调用者处理
    }
  },

  // ===== 消息提示 =====
  showMessage(message, type = 'info') {
    // 移除已存在的消息
    const existingMessage = document.querySelector('.openapi-message-v2');
    if (existingMessage) {
      existingMessage.remove();
    }

    // 创建消息元素
    const messageEl = document.createElement('div');
    messageEl.className = `openapi-message-v2 openapi-message-${type}`;
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

  // ===== 面板系统 =====
  showCreatePanel() {
    this.state.panels = {
      isOpen: true,
      type: 'create',
      data: null
    };

    this.createPanel('新建密钥', null, 'create');
  },

  async showEditPanel(id) {
    try {
      const key = await AppDataManagerV2.apiKeys.getById(parseInt(id));
      if (!key) {
        this.showMessage('密钥不存在', 'error');
        return;
      }

      this.state.panels = {
        isOpen: true,
        type: 'edit',
        data: key
      };

      this.createPanel('编辑密钥', key, 'edit');
    } catch (error) {
      console.error('❌ 获取密钥数据失败:', error);
      this.showMessage('获取密钥数据失败', 'error');
    }
  },

  createPanel(title, data, type) {
    // 移除已存在的面板
    const existingPanel = document.querySelector('.slide-panel-wrapper');
    const existingOverlay = document.querySelector('.panel-overlay');
    if (existingPanel) {
      existingPanel.remove();
    }
    if (existingOverlay) {
      existingOverlay.remove();
    }

    // 创建遮罩层
    const overlay = document.createElement('div');
    overlay.className = 'panel-overlay';
    document.body.appendChild(overlay);

    // 创建面板
    const panel = document.createElement('div');
    panel.className = 'slide-panel-wrapper';
    panel.innerHTML = this.getPanelHTML(title, data, type);
    document.body.appendChild(panel);

    // 添加面板样式
    this.injectPanelStyles();

    // 显示动画
    setTimeout(() => {
      overlay.classList.add('visible');
      panel.classList.add('visible');
    }, 10);

    // 绑定面板事件
    this.bindPanelEvents(panel, overlay, data, type);
  },

  getPanelHTML(title, data, type) {
    return `
            <div class="open-api-panel">
                <div class="panel-header">
                    <h3>${title}</h3>
                    <button class="btn-close" data-action="close-panel">&times;</button>
                </div>
                
                <div class="panel-body">
                    <div class="section">
                        <h4>基本信息</h4>
                        <div class="form-item">
                            <label class="required">分配接口权限</label>
                            <select class="form-select" id="panel-permission">
                                <option value="" disabled ${!data ? 'selected' : ''}>请选择</option>
                                <option value="完全访问权限" ${data && data.permission === '完全访问权限' ? 'selected' : ''}>完全访问权限</option>
                                <option value="只读访问权限" ${data && data.permission === '只读访问权限' ? 'selected' : ''}>只读访问权限</option>
                                <option value="自定义权限" ${data && data.permission === '自定义权限' ? 'selected' : ''}>自定义权限</option>
                            </select>
                        </div>

                        <div class="form-item">
                            <label class="required">密钥用途</label>
                            <input type="text" class="form-input" id="panel-purpose" placeholder="请输入" value="${data ? data.purpose : ''}">
                        </div>

                        <div class="form-item">
                            <label class="required">角色</label>
                            <select class="form-select" id="panel-role">
                                <option value="" disabled ${!data ? 'selected' : ''}>请选择</option>
                                <option value="管理员" ${data && data.role === '管理员' ? 'selected' : ''}>管理员</option>
                                <option value="开发者" ${data && data.role === '开发者' ? 'selected' : ''}>开发者</option>
                            </select>
                        </div>

                        <div class="form-item">
                            <label class="checkbox-wrapper">
                                <input type="checkbox" id="panel-api-enabled" ${data && data.status ? 'checked' : ''}>
                                <span class="checkbox-text">启用API接口</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div class="panel-footer">
                    <button class="btn-cancel" data-action="close-panel">取消</button>
                    <button class="btn-confirm" data-action="submit-panel">确定</button>
                </div>
            </div>
        `;
  },

  bindPanelEvents(panel, overlay, data, type) {
    // 关闭面板
    const closePanel = () => {
      overlay.classList.remove('visible');
      panel.classList.remove('visible');
      setTimeout(() => {
        overlay.remove();
        panel.remove();
        this.state.panels.isOpen = false;
      }, 300);
    };

    // 绑定关闭事件
    const closeButtons = panel.querySelectorAll('[data-action="close-panel"]');
    closeButtons.forEach(btn => {
      btn.addEventListener('click', closePanel);
    });

    // 点击遮罩层关闭
    overlay.addEventListener('click', closePanel);

    // 权限和角色联动
    const permissionSelect = panel.querySelector('#panel-permission');
    const roleSelect = panel.querySelector('#panel-role');

    if (permissionSelect && roleSelect) {
      permissionSelect.addEventListener('change', (e) => {
        const role = this.getRoleByPermission(e.target.value);
        if (role) {
          roleSelect.value = role;
        }
      });
    }

    // 绑定确定按钮
    const confirmBtn = panel.querySelector('[data-action="submit-panel"]');
    if (confirmBtn) {
      confirmBtn.addEventListener('click', async () => {
        await this.handlePanelSubmit(panel, data, type);
        closePanel();
      });
    }
  },

  async handlePanelSubmit(panel, data, type) {
    try {
      // 收集表单数据
      const formData = this.collectPanelFormData(panel);

      // 验证表单
      if (!this.validatePanelFormData(formData)) {
        return;
      }

      if (type === 'create') {
        // 创建新密钥
        await AppDataManagerV2.apiKeys.create(formData);
        this.showMessage('密钥创建成功', 'success');
      } else {
        // 更新密钥
        await AppDataManagerV2.apiKeys.update(data.id, formData);
        this.showMessage('密钥更新成功', 'success');
      }
    } catch (error) {
      console.error('❌ 保存密钥失败:', error);
      this.showMessage('保存失败: ' + error.message, 'error');
    }
  },

  collectPanelFormData(panel) {
    const formData = {};

    // 基本信息
    const permissionSelect = panel.querySelector('#panel-permission');
    if (permissionSelect) formData.permission = permissionSelect.value;

    const purposeInput = panel.querySelector('#panel-purpose');
    if (purposeInput) formData.purpose = purposeInput.value.trim();

    const roleSelect = panel.querySelector('#panel-role');
    if (roleSelect) formData.role = roleSelect.value;

    const apiCheckbox = panel.querySelector('#panel-api-enabled');
    if (apiCheckbox) formData.status = apiCheckbox.checked;

    return formData;
  },

  validatePanelFormData(formData) {
    if (!formData.purpose || formData.purpose.trim() === '') {
      this.showMessage('请输入密钥用途', 'warning');
      return false;
    }

    if (!formData.permission || formData.permission === '') {
      this.showMessage('请选择接口权限', 'warning');
      return false;
    }

    if (!formData.role || formData.role === '') {
      this.showMessage('请选择角色', 'warning');
      return false;
    }

    return true;
  },

  // 根据权限获取角色
  getRoleByPermission(permission) {
    const roleMap = {
      '完全访问权限': '管理员',
      '只读访问权限': '开发者',
      '自定义权限': '开发者'
    };
    return roleMap[permission] || '开发者';
  },

  // 注入面板样式
  injectPanelStyles() {
    if (document.querySelector('#openApiPanelStyles')) return;

    const style = document.createElement('style');
    style.id = 'openApiPanelStyles';
    style.textContent = `
            /* 面板样式 - 完全还原原始样式 */
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

            .open-api-panel {
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
            }

            .panel-body {
                flex: 1;
                padding: 24px;
                overflow-y: auto;
            }

            .section {
                margin-bottom: 32px;
            }

            .section h4 {
                margin-bottom: 16px;
                font-size: 14px;
                font-weight: 500;
                color: #333;
            }

            .form-item {
                margin-bottom: 24px;
            }

            .form-item label {
                display: block;
                margin-bottom: 8px;
                font-size: 14px;
            }

            .required:before {
                content: "*";
                color: #ff4d4f;
                margin-right: 4px;
            }

            .form-select,
            .form-input {
                width: 100%;
                padding: 8px 12px;
                border: 1px solid #d9d9d9;
                border-radius: 2px;
                box-sizing: border-box;
            }

            .checkbox-wrapper {
                display: flex;
                align-items: center;
                gap: 8px;
                cursor: pointer;
            }

            .checkbox-text {
                font-size: 14px;
            }

            .panel-footer {
                padding: 16px 24px;
                border-top: 1px solid #f0f0f0;
                text-align: right;
            }

            .btn-cancel {
                margin-right: 8px;
                padding: 8px 16px;
                border: 1px solid #d9d9d9;
                background: white;
                border-radius: 2px;
                cursor: pointer;
            }

            .btn-confirm {
                padding: 8px 16px;
                background: #1890ff;
                color: white;
                border: none;
                border-radius: 2px;
                cursor: pointer;
            }

            .btn-confirm:hover {
                background: #40a9ff;
            }

            .btn-cancel:hover {
                border-color: #40a9ff;
                color: #40a9ff;
            }
        `;

    document.head.appendChild(style);
  }
};

// 自动初始化
document.addEventListener('DOMContentLoaded', () => {
  // 延迟初始化，确保其他脚本加载完成
  setTimeout(() => {
    if (window.openApiV2) {
      openApiV2.init().catch(error => {
        console.error('❌ openApiV2自动初始化失败:', error);
      });
    }
  }, 100);
});

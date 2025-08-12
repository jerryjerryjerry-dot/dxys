/**
 * 用户登录记录模块 V2
 * 简化版：只显示用户登录登出记录表格
 */
window.userLoginLogV2 = {
  // 初始化状态
  initialized: false,

  // 数据缓存
  logs: [],

  // 页面内容模板
  content() {
    return `
            <div class="user-login-log-container">
                <!-- 页面头部 -->
                <div class="page-header">
                    <div class="header-left">
                        <h1 class="page-title">
                            <i class="icon">👥</i>
                            用户登录记录
                        </h1>
                        <p class="page-subtitle">用户登录登出记录查询</p>
                    </div>
                    <div class="header-right">
                        <div class="header-stats">
                            <div class="stat-item">
                                <span class="stat-label">总记录</span>
                                <span class="stat-value" id="totalCount">-</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">在线用户</span>
                                <span class="stat-value" id="onlineCount">-</span>
                            </div>
                        </div>
                        <button class="btn btn-primary" id="refreshBtn">
                            <i>🔄</i>
                            刷新
                        </button>
                    </div>
                </div>

                <!-- 登录记录表格 -->
                <div class="table-section">
                    <div class="table-container">
                        <table class="data-table" id="loginTable">
                            <thead>
                                <tr>
                                    <th width="80">序号</th>
                                    <th width="120">用户名</th>
                                    <th width="140">用户ID</th>
                                    <th width="180">登录时间</th>
                                    <th width="180">登出时间</th>
                                    <th width="120">在线时长</th>
                                    <th width="140">IP地址</th>
                                    <th width="100">状态</th>
                                    <th width="200">浏览器</th>
                                </tr>
                            </thead>
                            <tbody id="loginTableBody">
                                <tr class="loading-row">
                                    <td colspan="9" class="loading-cell">
                                        <div class="loading-spinner"></div>
                                        <span>加载登录记录中...</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
  },

  // 初始化模块
  async init() {
    if (this.initialized) return;

    console.log('🚀 初始化用户登录记录模块...');

    try {
      // 加载数据
      await this.loadData();

      this.initialized = true;
      console.log('✅ 用户登录记录模块初始化完成');

      // 初始渲染（包含事件绑定）
      setTimeout(() => this.initialRender(), 300);

    } catch (error) {
      console.error('❌ 用户登录记录模块初始化失败:', error);
    }
  },

  // 初始渲染
  async initialRender() {
    try {
      await new Promise(resolve => setTimeout(resolve, 200));

      // 渲染统计信息
      this.updateStats();

      // 渲染表格
      this.renderTable();

      // 绑定事件（确保DOM元素已存在）
      this.bindEvents();

      console.log('✅ 用户登录记录初始渲染完成');
    } catch (error) {
      console.error('❌ 用户登录记录初始渲染失败:', error);
    }
  },

  // 加载数据
  async loadData() {
    try {
      console.log('🔄 开始加载登录记录数据...');

      if (!window.AppDataManagerV2) {
        console.error('❌ AppDataManagerV2 未加载');
        return;
      }

      if (!window.AppDataManagerV2.initialized) {
        console.log('⚠️ 数据库未初始化，等待初始化...');
        // 等待数据库初始化
        for (let i = 0; i < 10; i++) {
          await new Promise(resolve => setTimeout(resolve, 500));
          if (window.AppDataManagerV2.initialized) {
            break;
          }
        }

        if (!window.AppDataManagerV2.initialized) {
          console.error('❌ 数据库初始化超时');
          return;
        }
      }

      this.logs = await window.AppDataManagerV2.userLoginLogs.getAll();
      console.log('📊 成功加载', this.logs.length, '条登录记录');

      // 如果没有数据，尝试触发模拟数据加载
      if (this.logs.length === 0) {
        console.log('⚠️ 没有登录记录，尝试重新加载模拟数据...');
        await window.AppDataManagerV2.loadMockLoginData();
        this.logs = await window.AppDataManagerV2.userLoginLogs.getAll();
        console.log('📊 重新加载后获得', this.logs.length, '条登录记录');
      }

    } catch (error) {
      console.error('❌ 加载登录记录数据失败:', error);
      this.logs = []; // 确保有默认值
    }
  },

  // 绑定事件
  bindEvents() {
    // 刷新按钮
    document.getElementById('refreshBtn')?.addEventListener('click', () => {
      this.refresh();
    });
  },

  // 更新统计信息
  updateStats() {
    const totalCount = this.logs.length;
    const onlineCount = this.logs.filter(log => !log.logoutTime).length;

    const totalCountEl = document.getElementById('totalCount');
    const onlineCountEl = document.getElementById('onlineCount');

    if (totalCountEl) totalCountEl.textContent = totalCount;
    if (onlineCountEl) onlineCountEl.textContent = onlineCount;
  },

  // 渲染表格
  renderTable() {
    const tbody = document.getElementById('loginTableBody');
    if (!tbody) return;

    if (this.logs.length === 0) {
      tbody.innerHTML = `
                <tr class="empty-row">
                    <td colspan="9" class="empty-cell">
                        <div class="empty-state">
                            <i>📋</i>
                            <span>暂无登录记录</span>
                        </div>
                    </td>
                </tr>
            `;
      return;
    }

    tbody.innerHTML = this.logs.map((log, index) => this.createLogRow(log, index + 1)).join('');
  },

  // 创建日志行
  createLogRow(log, index) {
    const loginTime = new Date(log.loginTime).toLocaleString('zh-CN');
    const logoutTime = log.logoutTime ? new Date(log.logoutTime).toLocaleString('zh-CN') : '-';
    const duration = this.formatDuration(log.duration);
    const status = log.logoutTime ? '已登出' : '在线';
    const statusClass = log.logoutTime ? 'offline' : 'online';
    const browser = this.getBrowserName(log.userAgent);

    return `
            <tr class="log-row">
                <td class="index-cell">${index}</td>
                <td class="username-cell">
                    <strong>${log.userName}</strong>
                </td>
                <td class="userid-cell">${log.userId}</td>
                <td class="time-cell">${loginTime}</td>
                <td class="time-cell">${logoutTime}</td>
                <td class="duration-cell">${duration}</td>
                <td class="ip-cell">${log.ipAddress}</td>
                <td class="status-cell">
                    <span class="status-badge ${statusClass}">${status}</span>
                </td>
                <td class="browser-cell" title="${log.userAgent}">
                    ${browser}
                </td>
            </tr>
        `;
  },

  // 格式化持续时间
  formatDuration(seconds) {
    if (!seconds) return '-';

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}小时${minutes}分钟`;
    } else if (minutes > 0) {
      return `${minutes}分钟${secs}秒`;
    } else {
      return `${secs}秒`;
    }
  },

  // 获取浏览器名称
  getBrowserName(userAgent) {
    if (!userAgent) return '未知';

    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    if (userAgent.includes('Opera')) return 'Opera';

    return '其他';
  },

  // 刷新数据
  async refresh() {
    console.log('🔄 开始刷新用户登录记录...');

    // 显示加载状态
    const refreshBtn = document.getElementById('refreshBtn');
    const tbody = document.getElementById('loginTableBody');

    if (refreshBtn) {
      refreshBtn.disabled = true;
      refreshBtn.innerHTML = '<i>⏳</i> 刷新中...';
    }

    if (tbody) {
      tbody.innerHTML = `
        <tr class="loading-row">
          <td colspan="9" class="loading-cell">
            <div class="loading-spinner"></div>
            <span>正在刷新数据...</span>
          </td>
        </tr>
      `;
    }

    try {
      // 重新加载数据
      await this.loadData();

      // 更新统计信息
      this.updateStats();

      // 重新渲染表格
      this.renderTable();

      console.log('✅ 用户登录记录刷新完成');

      // 显示刷新成功提示（可选）
      if (refreshBtn) {
        refreshBtn.innerHTML = '<i>✅</i> 已刷新';
        setTimeout(() => {
          refreshBtn.innerHTML = '<i>🔄</i> 刷新';
          refreshBtn.disabled = false;
        }, 1000);
      }

    } catch (error) {
      console.error('❌ 刷新用户登录记录失败:', error);

      // 显示错误状态
      if (refreshBtn) {
        refreshBtn.innerHTML = '<i>❌</i> 刷新失败';
        setTimeout(() => {
          refreshBtn.innerHTML = '<i>🔄</i> 刷新';
          refreshBtn.disabled = false;
        }, 2000);
      }

      if (tbody) {
        tbody.innerHTML = `
          <tr class="empty-row">
            <td colspan="9" class="empty-cell">
              <div class="empty-state">
                <i>❌</i>
                <span>刷新失败: ${error.message}</span>
                <button onclick="window.userLoginLogV2.refresh()" style="margin-top: 8px; padding: 4px 8px; background: #1890ff; color: white; border: none; border-radius: 4px; cursor: pointer;">
                  重试
                </button>
              </div>
            </td>
          </tr>
        `;
      }
    }
  }
};

console.log('👥 userLoginLogV2 模块已加载');


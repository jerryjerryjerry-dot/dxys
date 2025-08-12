// 流量染色页面V2 - 具备数据持久化和无闪屏更新功能
window.trafficColoringV2 = {
  id: 'trafficColoringV2',
  title: '流量染色',

  // 组件状态
  state: {
    strategies: [],
    filteredStrategies: [],
    searchKeyword: '',
    selectedItems: new Set(),
    loading: false,
    pagination: {
      currentPage: 1,
      pageSize: 10,
      totalItems: 0,
      totalPages: 0
    },
    sortConfig: {
      field: 'createTime',
      order: 'desc'
    }
  },

  // API模拟器 - 验证染色配置
  apiSimulator: {
    // 验证应用染色配置
    async validateApplicationColoring(config) {
      // 模拟API延迟
      await new Promise(resolve => setTimeout(resolve, 200));

      const errors = [];

      if (!config.enabled) {
        return { valid: true, message: '应用染色未启用' };
      }

      if (!config.address && !config.protocol && !config.ip) {
        errors.push('至少需要配置一种应用染色方式');
      }

      // 模拟复杂验证逻辑
      if (config.protocol && !config.address) {
        errors.push('启用协议染色时建议同时配置应用地址');
      }

      return {
        valid: errors.length === 0,
        message: errors.length === 0 ? '应用染色配置验证通过' : errors.join('; '),
        warnings: config.ip && !config.address ? ['IP染色可能影响性能'] : []
      };
    },

    // 验证数据流染色配置  
    async validateDataFlowColoring(enabled) {
      await new Promise(resolve => setTimeout(resolve, 150));

      if (!enabled) {
        return { valid: true, message: '数据流染色未启用' };
      }

      // 模拟检查系统资源
      const systemLoad = Math.random();
      if (systemLoad > 0.8) {
        return {
          valid: false,
          message: '当前系统负载过高，不建议启用数据流染色',
          suggestions: ['建议在低峰期启用', '考虑降低染色精度']
        };
      }

      return {
        valid: true,
        message: '数据流染色配置有效',
        performance: {
          estimatedOverhead: Math.round((systemLoad * 10)),
          recommendedSettings: '标准模式'
        }
      };
    },

    // 验证数据追踪染色配置
    async validateDataTrackingColoring(enabled) {
      await new Promise(resolve => setTimeout(resolve, 180));

      if (!enabled) {
        return { valid: true, message: '数据追踪染色未启用' };
      }

      // 模拟合规性检查
      const complianceRisk = Math.random();
      const warnings = [];

      if (complianceRisk > 0.7) {
        warnings.push('数据追踪染色可能涉及敏感数据，请确保符合隐私政策');
      }

      if (complianceRisk > 0.9) {
        return {
          valid: false,
          message: '数据追踪染色存在合规风险，需要额外审批',
          complianceChecks: ['数据分类确认', '隐私影响评估', '安全团队审核']
        };
      }

      return {
        valid: true,
        message: '数据追踪染色配置符合规范',
        warnings,
        recommendations: ['定期清理追踪数据', '设置数据保留期限']
      };
    },

    // 获取策略执行统计 
    async getStrategyStatistics(strategyId) {
      await new Promise(resolve => setTimeout(resolve, 100));

      // 模拟真实统计数据
      const baseTraffic = Math.floor(Math.random() * 2000000) + 500000;
      const coloringRate = Math.floor(Math.random() * 40) + 60;

      return {
        strategyId,
        totalTraffic: baseTraffic,
        coloredTraffic: Math.floor(baseTraffic * coloringRate / 100),
        coloringRate,
        lastActiveTime: new Date(Date.now() - Math.random() * 86400000).toISOString(),
        performanceMetrics: {
          averageLatency: Math.floor(Math.random() * 50) + 10,
          errorRate: Math.random() * 0.01,
          throughput: Math.floor(Math.random() * 10000) + 5000
        }
      };
    },

    // 获取染色技术分布统计
    async getTechniqueDistribution() {
      await new Promise(resolve => setTimeout(resolve, 120));

      return {
        appColoring: Math.floor(Math.random() * 30) + 35,
        dataFlowColoring: Math.floor(Math.random() * 25) + 25,
        dataTrackingColoring: Math.floor(Math.random() * 20) + 15,
        combinedTechniques: Math.floor(Math.random() * 15) + 10,
        trends: {
          appColoring: Math.random() > 0.5 ? 'increasing' : 'stable',
          dataFlowColoring: Math.random() > 0.3 ? 'increasing' : 'decreasing',
          dataTrackingColoring: 'increasing'
        }
      };
    }
  },

  // 数据管理
  dataManager: {
    // 初始化数据
    async loadStrategies() {
      try {
        trafficColoringV2.showLoading(true);
        const strategies = await AppDataManagerV2.coloringStrategies.getAll();
        trafficColoringV2.state.strategies = strategies;
        trafficColoringV2.applyFilters();
        return strategies;
      } catch (error) {
        trafficColoringV2.showMessage('加载数据失败: ' + error.message, 'error');
        return [];
      } finally {
        trafficColoringV2.showLoading(false);
      }
    },

    // 添加策略
    async addStrategy(strategyData) {
      try {
        trafficColoringV2.showLoading(true);

        // 验证染色配置
        await trafficColoringV2.validateColoringConfig(strategyData.coloringConfig);

        console.log('📤 提交策略数据到数据库:', strategyData);
        const newStrategy = await AppDataManagerV2.coloringStrategies.add(strategyData);
        console.log('✅ 数据库返回新策略:', newStrategy);

        // 更新本地状态
        trafficColoringV2.state.strategies.unshift(newStrategy);

        // 立即刷新显示（确保染色技术配置状态同步）
        trafficColoringV2.applyFilters();
        trafficColoringV2.renderTable();

        console.log('🔄 表格已刷新，策略数量:', trafficColoringV2.state.strategies.length);
        trafficColoringV2.showMessage('策略添加成功', 'success');
        return newStrategy;
      } catch (error) {
        console.error('❌ 添加策略失败:', error);
        trafficColoringV2.showMessage('添加失败: ' + error.message, 'error');
        throw error;
      } finally {
        trafficColoringV2.showLoading(false);
      }
    },

    // 更新策略
    async updateStrategy(id, updates) {
      try {
        trafficColoringV2.showLoading(true);

        // 验证更新的染色配置
        if (updates.coloringConfig) {
          await trafficColoringV2.validateColoringConfig(updates.coloringConfig);
        }

        console.log('📤 更新策略数据到数据库:', { id, updates });
        await AppDataManagerV2.coloringStrategies.update(id, updates);

        // 更新本地状态
        const index = trafficColoringV2.state.strategies.findIndex(s => s.id === id);
        if (index !== -1) {
          trafficColoringV2.state.strategies[index] = {
            ...trafficColoringV2.state.strategies[index],
            ...updates,
            lastUpdated: new Date().toISOString()
          };
          console.log('✅ 本地策略状态已更新:', trafficColoringV2.state.strategies[index]);
        }

        // 立即刷新显示（确保染色技术配置状态同步）
        trafficColoringV2.applyFilters();
        trafficColoringV2.renderTable();

        console.log('🔄 表格已刷新，更新策略ID:', id);
        trafficColoringV2.showMessage('策略更新成功', 'success');
        return trafficColoringV2.state.strategies[index];
      } catch (error) {
        trafficColoringV2.showMessage('更新失败: ' + error.message, 'error');
        throw error;
      } finally {
        trafficColoringV2.showLoading(false);
      }
    },

    // 删除策略
    async deleteStrategy(id) {
      try {
        trafficColoringV2.showLoading(true);
        await AppDataManagerV2.coloringStrategies.delete(id);

        // 更新本地状态
        trafficColoringV2.state.strategies = trafficColoringV2.state.strategies.filter(s => s.id !== id);
        trafficColoringV2.state.selectedItems.delete(id);

        trafficColoringV2.applyFilters();
        trafficColoringV2.updateTableIncrementally([{ type: 'delete', data: { id } }]);
        trafficColoringV2.showMessage('策略删除成功', 'success');
        return true;
      } catch (error) {
        trafficColoringV2.showMessage('删除失败: ' + error.message, 'error');
        throw error;
      } finally {
        trafficColoringV2.showLoading(false);
      }
    },

    // 批量更新状态
    async batchUpdateStatus(ids, status) {
      try {
        trafficColoringV2.showLoading(true);
        await AppDataManagerV2.coloringStrategies.batchUpdateStatus(ids, status);

        // 更新本地状态
        trafficColoringV2.state.strategies.forEach(strategy => {
          if (ids.includes(strategy.id)) {
            strategy.status = status;
          }
        });

        trafficColoringV2.state.selectedItems.clear();
        trafficColoringV2.applyFilters();
        trafficColoringV2.renderTable();
        trafficColoringV2.showMessage(`批量${status ? '启用' : '禁用'}成功`, 'success');
        return true;
      } catch (error) {
        trafficColoringV2.showMessage('批量操作失败: ' + error.message, 'error');
        throw error;
      } finally {
        trafficColoringV2.showLoading(false);
      }
    },

    // 批量删除
    async batchDelete(ids) {
      try {
        trafficColoringV2.showLoading(true);
        await AppDataManagerV2.coloringStrategies.batchDelete(ids);

        // 更新本地状态
        trafficColoringV2.state.strategies = trafficColoringV2.state.strategies.filter(s => !ids.includes(s.id));
        trafficColoringV2.state.selectedItems.clear();

        trafficColoringV2.applyFilters();
        trafficColoringV2.renderTable();
        trafficColoringV2.showMessage('批量删除成功', 'success');
        return true;
      } catch (error) {
        trafficColoringV2.showMessage('批量删除失败: ' + error.message, 'error');
        throw error;
      } finally {
        trafficColoringV2.showLoading(false);
      }
    }
  },

  // 验证染色配置
  async validateColoringConfig(config) {
    const validations = [];

    if (config.appColoring.enabled) {
      validations.push(this.apiSimulator.validateApplicationColoring(config.appColoring));
    }

    if (config.dataFlowColoring) {
      validations.push(this.apiSimulator.validateDataFlowColoring(config.dataFlowColoring));
    }

    if (config.dataTrackingColoring) {
      validations.push(this.apiSimulator.validateDataTrackingColoring(config.dataTrackingColoring));
    }

    const results = await Promise.all(validations);
    const invalidResults = results.filter(r => !r.valid);

    if (invalidResults.length > 0) {
      throw new Error(invalidResults.map(r => r.message).join('; '));
    }

    // 收集警告信息
    const warnings = results.flatMap(r => r.warnings || []);
    if (warnings.length > 0) {
      console.warn('⚠️ 染色配置警告:', warnings);
    }

    return results;
  },

  // 页面内容模板
  content: function () {
    return `
            <div class="traffic-coloring-v2-page">
                <!-- 页面头部 -->
                <div class="page-header">
                    <div class="header-content">
                        <h1 class="page-title">
                            <span class="title-icon">🎨</span>
                            流量染色策略
                        </h1>
                        <p class="page-description">
                            配置和管理流量染色技术，包括应用染色、数据流染色和数据追踪染色，实现精确的数据流向追踪
                        </p>
                    </div>
                    <div class="header-actions">
                        <button class="btn btn-primary btn-new">
                            <span class="btn-icon">+</span>
                            新建策略
                        </button>
                    </div>
                </div>

                <!-- 过滤和搜索栏 -->
                <div class="filters-bar">
                    <div class="search-section">
                        <div class="search-input-group">
                            <span class="search-icon">🔍</span>
                            <input type="text" 
                                   class="search-input" 
                                   placeholder="搜索策略名称、生效范围、染色技术..." 
                                   value="${this.state.searchKeyword}">
                            <button class="search-clear-btn" title="清空搜索">×</button>
                        </div>
                    </div>
                    
                    <div class="filter-section">
                        <select class="filter-select" data-filter="scope">
                            <option value="">所有范围</option>
                            <option value="全部用户">全部用户</option>
                            <option value="研发部门">研发部门</option>
                            <option value="DBA团队">DBA团队</option>
                            <option value="运维部门">运维部门</option>
                            <option value="产品部门">产品部门</option>
                            <option value="安全团队">安全团队</option>
                            <option value="测试团队">测试团队</option>
                        </select>
                        
                        <select class="filter-select" data-filter="status">
                            <option value="">所有状态</option>
                            <option value="true">已启用</option>
                            <option value="false">已禁用</option>
                        </select>
                        
                        <select class="filter-select" data-filter="technique">
                            <option value="">所有技术</option>
                            <option value="应用染色">应用染色</option>
                            <option value="数据流染色">数据流染色</option>
                            <option value="数据追踪染色">数据追踪染色</option>
                        </select>
                    </div>
                </div>

                <!-- 批量操作栏 -->
                <div class="batch-actions-bar" style="display: none;">
                    <div class="selected-info">
                        <span class="selected-count">已选择 0 项</span>
                        <button class="btn-clear-selection">取消选择</button>
                    </div>
                    <div class="batch-buttons">
                        <button class="btn btn-sm btn-success batch-enable">批量启用</button>
                        <button class="btn btn-sm btn-warning batch-disable">批量禁用</button>
                        <button class="btn btn-sm btn-danger batch-delete">批量删除</button>
                    </div>
                </div>

                <!-- 数据表格 -->
                <div class="table-container">
                    <div class="loading-overlay" style="display: none;">
                        <div class="loading-spinner"></div>
                        <span class="loading-text">处理中...</span>
                    </div>
                    
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th class="checkbox-cell">
                                    <label class="checkbox-wrapper">
                                        <input type="checkbox" class="select-all-checkbox">
                                        <span class="checkbox-mark"></span>
                                    </label>
                                </th>
                                <th class="sortable" data-field="name">
                                    策略名称
                                    <span class="sort-indicator"></span>
                                </th>
                                <th class="sortable" data-field="scope">
                                    生效范围
                                    <span class="sort-indicator"></span>
                                </th>
                                <th>染色技术</th>
                                <th>备注信息</th>
                                <th class="sortable" data-field="status">
                                    状态
                                    <span class="sort-indicator"></span>
                                </th>
                                <th class="sortable" data-field="createTime">
                                    创建时间
                                    <span class="sort-indicator"></span>
                                </th>
                                <th class="actions-cell">操作</th>
                            </tr>
                        </thead>
                        <tbody class="table-body">
                            <!-- 数据行将通过JavaScript动态插入 -->
                        </tbody>
                    </table>
                    
                    <!-- 空状态 -->
                    <div class="empty-state" style="display: none;">
                        <div class="empty-icon">📋</div>
                        <h3>暂无数据</h3>
                        <p>还没有配置任何流量染色策略</p>
                        <button class="btn btn-primary btn-new">立即创建</button>
                    </div>
                </div>

                <!-- 分页控件 -->
                <div class="pagination-container">
                    <div class="pagination-info">
                        <span class="total-info">共 <strong id="totalCount">0</strong> 条记录</span>
                        <select class="page-size-select">
                            <option value="10">10 条/页</option>
                            <option value="20">20 条/页</option>
                            <option value="50">50 条/页</option>
                        </select>
                    </div>
                    
                    <div class="pagination-controls">
                        <button class="btn btn-sm btn-outline page-btn page-prev" disabled>
                            <span>‹</span> 上一页
                        </button>
                        <div class="page-numbers"></div>
                        <button class="btn btn-sm btn-outline page-btn page-next" disabled>
                            下一页 <span>›</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
  },

  // 应用搜索和过滤
  applyFilters() {
    let filtered = [...this.state.strategies];

    // 搜索过滤
    if (this.state.searchKeyword.trim()) {
      const keyword = this.state.searchKeyword.toLowerCase();
      filtered = filtered.filter(strategy =>
        strategy.name.toLowerCase().includes(keyword) ||
        strategy.scope.toLowerCase().includes(keyword) ||
        strategy.note.toLowerCase().includes(keyword) ||
        strategy.techniques.some(tech => tech.toLowerCase().includes(keyword))
      );
    }

    // 应用其他过滤器（通过DOM状态读取）
    const scopeFilter = document.querySelector('[data-filter="scope"]')?.value;
    const statusFilter = document.querySelector('[data-filter="status"]')?.value;
    const techniqueFilter = document.querySelector('[data-filter="technique"]')?.value;

    if (scopeFilter) {
      filtered = filtered.filter(s => s.scope === scopeFilter);
    }

    if (statusFilter !== '') {
      const status = statusFilter === 'true';
      filtered = filtered.filter(s => s.status === status);
    }

    if (techniqueFilter) {
      filtered = filtered.filter(s => s.techniques.includes(techniqueFilter));
    }

    // 排序
    filtered.sort((a, b) => {
      const field = this.state.sortConfig.field;
      const order = this.state.sortConfig.order === 'desc' ? -1 : 1;

      if (field === 'createTime') {
        return (new Date(a[field]) - new Date(b[field])) * order;
      }
      if (field === 'status') {
        return (a[field] - b[field]) * order;
      }
      return a[field].localeCompare(b[field]) * order;
    });

    this.state.filteredStrategies = filtered;
    this.updatePagination();
  },

  // 更新分页信息
  updatePagination() {
    const { pageSize, currentPage } = this.state.pagination;
    const totalItems = this.state.filteredStrategies.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

    this.state.pagination.totalItems = totalItems;
    this.state.pagination.totalPages = totalPages;

    // 确保当前页在有效范围内
    if (currentPage > totalPages) {
      this.state.pagination.currentPage = totalPages;
    }
  },

  // 获取当前页数据
  getCurrentPageData() {
    const { currentPage, pageSize } = this.state.pagination;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return this.state.filteredStrategies.slice(startIndex, endIndex);
  },

  // 渲染表格
  renderTable() {
    const tbody = document.querySelector('.table-body');
    const emptyState = document.querySelector('.empty-state');
    const tableContainer = document.querySelector('.table-container table');

    if (!tbody) return;

    const data = this.getCurrentPageData();

    if (data.length === 0) {
      tableContainer.style.display = 'none';
      emptyState.style.display = 'flex';
      this.updatePaginationControls();
      return;
    }

    tableContainer.style.display = 'table';
    emptyState.style.display = 'none';

    tbody.innerHTML = data.map(strategy => this.renderTableRow(strategy)).join('');

    this.updatePaginationControls();
    this.updateSelectAllState();
    this.updateBatchActionsVisibility();
  },

  // 渲染表格行
  renderTableRow(strategy) {
    const isSelected = this.state.selectedItems.has(strategy.id);
    // 确保 techniques 数组存在，避免 undefined 错误
    const techniques = strategy.techniques || [];
    const tagsHtml = techniques.map(tech => {
      const tagClass = {
        '应用染色': 'tag-primary',
        '数据流染色': 'tag-info',
        '数据追踪染色': 'tag-warning'
      }[tech] || 'tag-default';
      return `<span class="technique-tag ${tagClass}">${tech}</span>`;
    }).join('');

    const createTime = new Date(strategy.createTime).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });

    return `
            <tr class="table-row" data-id="${strategy.id}">
                <td class="checkbox-cell">
                    <label class="checkbox-wrapper">
                        <input type="checkbox" 
                               class="row-checkbox" 
                               value="${strategy.id}" 
                               ${isSelected ? 'checked' : ''}>
                        <span class="checkbox-mark"></span>
                    </label>
                </td>
                <td class="strategy-name">
                    <div class="name-content">
                        <span class="name-text">${strategy.name}</span>
                        ${strategy.effectObject === '指定员工/设备' ? '<span class="scope-badge">指定</span>' : ''}
                    </div>
                </td>
                <td class="scope-cell">
                    <span class="scope-tag">${strategy.scope}</span>
                </td>
                <td class="techniques-cell">
                    <div class="techniques-tags">${tagsHtml}</div>
                </td>
                <td class="note-cell">
                    <div class="note-text" title="${strategy.note}">${strategy.note}</div>
                </td>
                <td class="status-cell">
                    <label class="status-switch">
                        <input type="checkbox" 
                               class="switch-input" 
                               ${strategy.status ? 'checked' : ''} 
                               data-id="${strategy.id}">
                        <span class="switch-slider"></span>
                    </label>
                </td>
                <td class="time-cell">
                    <span class="time-text">${createTime}</span>
                </td>
                <td class="actions-cell">
                    <div class="action-buttons">
                        <button class="btn btn-sm btn-outline action-btn edit-btn" data-id="${strategy.id}" title="编辑策略">
                            <span class="btn-text edit-text">编辑</span>
                        </button>
                        <button class="btn btn-sm btn-outline action-btn stats-btn" data-id="${strategy.id}" title="查看统计">
                            <span class="btn-text stats-text">统计</span>
                        </button>
                        <button class="btn btn-sm btn-danger action-btn delete-btn" data-id="${strategy.id}" title="删除策略">
                            <span class="btn-text delete-text">删除</span>
                        </button>
                    </div>
                </td>
            </tr>
        `;
  },

  // 增量更新表格（无闪屏更新）
  updateTableIncrementally(changes) {
    changes.forEach(change => {
      const { type, data } = change;

      switch (type) {
        case 'add':
          // 刷新整个表格以保持排序
          this.renderTable();
          break;

        case 'update':
          const row = document.querySelector(`tr[data-id="${data.id}"]`);
          if (row) {
            const strategy = this.state.strategies.find(s => s.id === data.id);
            if (strategy) {
              row.outerHTML = this.renderTableRow(strategy);
            }
          }
          break;

        case 'delete':
          const deleteRow = document.querySelector(`tr[data-id="${data.id}"]`);
          if (deleteRow) {
            deleteRow.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => {
              deleteRow.remove();
              this.updatePaginationControls();
            }, 300);
          }
          break;
      }
    });
  },

  // 更新分页控件
  updatePaginationControls() {
    const { currentPage, totalPages, totalItems } = this.state.pagination;

    // 更新总数显示
    const totalCount = document.getElementById('totalCount');
    if (totalCount) {
      totalCount.textContent = totalItems;
    }

    // 更新分页按钮状态
    const prevBtn = document.querySelector('.page-prev');
    const nextBtn = document.querySelector('.page-next');

    if (prevBtn) {
      prevBtn.disabled = currentPage <= 1;
    }
    if (nextBtn) {
      nextBtn.disabled = currentPage >= totalPages;
    }

    // 更新页码显示
    this.renderPageNumbers();
  },

  // 渲染页码
  renderPageNumbers() {
    const pageNumbers = document.querySelector('.page-numbers');
    if (!pageNumbers) return;

    const { currentPage, totalPages } = this.state.pagination;
    const maxVisible = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    const pages = [];

    if (startPage > 1) {
      pages.push(`<button class="page-number" data-page="1">1</button>`);
      if (startPage > 2) {
        pages.push(`<span class="page-ellipsis">...</span>`);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      const isActive = i === currentPage ? 'active' : '';
      pages.push(`<button class="page-number ${isActive}" data-page="${i}">${i}</button>`);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(`<span class="page-ellipsis">...</span>`);
      }
      pages.push(`<button class="page-number" data-page="${totalPages}">${totalPages}</button>`);
    }

    pageNumbers.innerHTML = pages.join('');
  },

  // 更新全选状态
  updateSelectAllState() {
    const selectAllCheckbox = document.querySelector('.select-all-checkbox');
    if (!selectAllCheckbox) return;

    const currentPageData = this.getCurrentPageData();
    const currentPageIds = currentPageData.map(s => s.id);
    const selectedInCurrentPage = currentPageIds.filter(id => this.state.selectedItems.has(id));

    if (selectedInCurrentPage.length === 0) {
      selectAllCheckbox.checked = false;
      selectAllCheckbox.indeterminate = false;
    } else if (selectedInCurrentPage.length === currentPageIds.length) {
      selectAllCheckbox.checked = true;
      selectAllCheckbox.indeterminate = false;
    } else {
      selectAllCheckbox.checked = false;
      selectAllCheckbox.indeterminate = true;
    }
  },

  // 更新批量操作栏显示
  updateBatchActionsVisibility() {
    const batchBar = document.querySelector('.batch-actions-bar');
    const selectedCount = document.querySelector('.selected-count');

    if (!batchBar || !selectedCount) return;

    const count = this.state.selectedItems.size;

    if (count > 0) {
      batchBar.style.display = 'flex';
      selectedCount.textContent = `已选择 ${count} 项`;
    } else {
      batchBar.style.display = 'none';
    }
  },

  // 显示加载状态
  showLoading(show) {
    const overlay = document.querySelector('.loading-overlay');
    if (overlay) {
      overlay.style.display = show ? 'flex' : 'none';
    }
    this.state.loading = show;
  },

  // 显示消息提示
  showMessage(message, type = 'info') {
    // 创建消息容器
    let messageContainer = document.querySelector('.message-container');
    if (!messageContainer) {
      messageContainer = document.createElement('div');
      messageContainer.className = 'message-container';
      document.body.appendChild(messageContainer);
    }

    // 创建消息元素
    const messageEl = document.createElement('div');
    messageEl.className = `message message-${type}`;

    const icon = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️'
    }[type] || 'ℹ️';

    messageEl.innerHTML = `
            <span class="message-icon">${icon}</span>
            <span class="message-text">${message}</span>
            <button class="message-close">×</button>
        `;

    // 添加到容器
    messageContainer.appendChild(messageEl);

    // 显示动画
    requestAnimationFrame(() => {
      messageEl.classList.add('show');
    });

    // 自动关闭
    const autoCloseTimer = setTimeout(() => {
      this.closeMessage(messageEl);
    }, type === 'error' ? 5000 : 3000);

    // 绑定关闭按钮
    const closeBtn = messageEl.querySelector('.message-close');
    closeBtn.addEventListener('click', () => {
      clearTimeout(autoCloseTimer);
      this.closeMessage(messageEl);
    });
  },

  // 关闭消息
  closeMessage(messageEl) {
    messageEl.classList.remove('show');
    setTimeout(() => {
      if (messageEl.parentNode) {
        messageEl.parentNode.removeChild(messageEl);
      }
    }, 300);
  },

  // 防抖搜索
  debounceSearch: function (func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func.apply(this, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // 事件处理
  eventHandlers: {
    // 搜索输入处理
    handleSearchInput: function (e) {
      trafficColoringV2.state.searchKeyword = e.target.value;
      trafficColoringV2.state.pagination.currentPage = 1;
      trafficColoringV2.applyFilters();
      trafficColoringV2.renderTable();
    },

    // 过滤器变更处理
    handleFilterChange: function (e) {
      trafficColoringV2.state.pagination.currentPage = 1;
      trafficColoringV2.applyFilters();
      trafficColoringV2.renderTable();
    },

    // 排序处理
    handleSort: function (e) {
      const field = e.currentTarget.dataset.field;
      if (!field) return;

      if (trafficColoringV2.state.sortConfig.field === field) {
        trafficColoringV2.state.sortConfig.order =
          trafficColoringV2.state.sortConfig.order === 'asc' ? 'desc' : 'asc';
      } else {
        trafficColoringV2.state.sortConfig.field = field;
        trafficColoringV2.state.sortConfig.order = 'asc';
      }

      trafficColoringV2.applyFilters();
      trafficColoringV2.renderTable();
      trafficColoringV2.updateSortIndicators();
    },

    // 全选处理
    handleSelectAll: function (e) {
      const checked = e.target.checked;
      const currentPageData = trafficColoringV2.getCurrentPageData();

      currentPageData.forEach(strategy => {
        if (checked) {
          trafficColoringV2.state.selectedItems.add(strategy.id);
        } else {
          trafficColoringV2.state.selectedItems.delete(strategy.id);
        }
      });

      // 更新行选择框状态
      document.querySelectorAll('.row-checkbox').forEach(checkbox => {
        checkbox.checked = checked;
      });

      trafficColoringV2.updateBatchActionsVisibility();
    },

    // 行选择处理
    handleRowSelect: function (e) {
      const strategyId = parseInt(e.target.value);

      if (e.target.checked) {
        trafficColoringV2.state.selectedItems.add(strategyId);
      } else {
        trafficColoringV2.state.selectedItems.delete(strategyId);
      }

      trafficColoringV2.updateSelectAllState();
      trafficColoringV2.updateBatchActionsVisibility();
    },

    // 状态切换处理
    handleStatusToggle: async function (e) {
      const strategyId = parseInt(e.target.dataset.id);
      const newStatus = e.target.checked;

      try {
        await trafficColoringV2.dataManager.updateStrategy(strategyId, { status: newStatus });
      } catch (error) {
        // 回滚状态
        e.target.checked = !newStatus;
      }
    },

    // 分页处理
    handlePageChange: function (page) {
      trafficColoringV2.state.pagination.currentPage = parseInt(page);
      trafficColoringV2.renderTable();
    },

    // 页面大小变更处理
    handlePageSizeChange: function (e) {
      trafficColoringV2.state.pagination.pageSize = parseInt(e.target.value);
      trafficColoringV2.state.pagination.currentPage = 1;
      trafficColoringV2.applyFilters();
      trafficColoringV2.renderTable();
    }
  },

  // 更新排序指示器
  updateSortIndicators() {
    document.querySelectorAll('.sort-indicator').forEach(indicator => {
      indicator.className = 'sort-indicator';
    });

    const currentSortHeader = document.querySelector(`[data-field="${this.state.sortConfig.field}"] .sort-indicator`);
    if (currentSortHeader) {
      currentSortHeader.className = `sort-indicator sort-${this.state.sortConfig.order}`;
    }
  },

  // 绑定事件
  bindEvents() {
    const container = document.querySelector('.traffic-coloring-v2-page');
    if (!container) return;

    // 使用事件委托统一处理所有事件
    container.addEventListener('click', this.handleClick.bind(this));
    container.addEventListener('change', this.handleChange.bind(this));
    container.addEventListener('input', this.handleInput.bind(this));
  },

  // 统一点击事件处理
  handleClick(e) {
    console.log('🖱️ 点击事件触发，原始目标:', e.target, '类名:', e.target.className);

    // 查找按钮元素，排除面板按钮（现在使用直接绑定）
    const target = e.target.closest('.btn, .page-number, .sortable') ||
      e.target.closest('[class*="btn"]') ||
      (e.target.classList.contains('btn-text') ? e.target.closest('.btn') : null);

    // 如果是面板按钮，不在这里处理（已使用直接绑定）
    if (e.target.closest('.panel-confirm, .panel-cancel, .panel-close-btn')) {
      return;
    }

    console.log('🎯 找到的目标元素:', target, target ? '类名:' + target.className : '无目标');

    if (!target) return;

    // 阻止默认行为
    e.preventDefault();

    // 新建策略按钮
    if (target.classList.contains('btn-new')) {
      this.showCreatePanel();
    }
    // 编辑按钮
    else if (target.classList.contains('edit-btn')) {
      const id = parseInt(target.dataset.id);
      console.log('🔧 点击编辑按钮，策略ID:', id);
      this.showEditPanel(id);
    }
    // 删除按钮
    else if (target.classList.contains('delete-btn')) {
      const id = parseInt(target.dataset.id);
      console.log('🗑️ 点击删除按钮，策略ID:', id);
      this.confirmDelete(id);
    }
    // 统计按钮
    else if (target.classList.contains('stats-btn')) {
      const id = parseInt(target.dataset.id);
      console.log('📊 点击统计按钮，策略ID:', id);
      this.showStatistics(id);
    }
    // 批量操作按钮
    else if (target.classList.contains('batch-enable')) {
      this.batchUpdateStatus(true);
    }
    else if (target.classList.contains('batch-disable')) {
      this.batchUpdateStatus(false);
    }
    else if (target.classList.contains('batch-delete')) {
      this.confirmBatchDelete();
    }
    // 清除选择
    else if (target.classList.contains('btn-clear-selection')) {
      this.clearSelection();
    }
    // 搜索清空
    else if (target.classList.contains('search-clear-btn')) {
      this.clearSearch();
    }
    // 分页
    else if (target.classList.contains('page-number')) {
      const page = parseInt(target.dataset.page);
      this.eventHandlers.handlePageChange(page);
    }
    else if (target.classList.contains('page-prev')) {
      if (this.state.pagination.currentPage > 1) {
        this.eventHandlers.handlePageChange(this.state.pagination.currentPage - 1);
      }
    }
    else if (target.classList.contains('page-next')) {
      if (this.state.pagination.currentPage < this.state.pagination.totalPages) {
        this.eventHandlers.handlePageChange(this.state.pagination.currentPage + 1);
      }
    }
    // 排序
    else if (target.classList.contains('sortable')) {
      this.eventHandlers.handleSort(e);
    }
  },

  // 统一change事件处理
  handleChange(e) {
    const target = e.target;

    // 全选复选框
    if (target.classList.contains('select-all-checkbox')) {
      this.eventHandlers.handleSelectAll(e);
    }
    // 行选择复选框
    else if (target.classList.contains('row-checkbox')) {
      this.eventHandlers.handleRowSelect(e);
    }
    // 状态切换
    else if (target.classList.contains('switch-input')) {
      this.eventHandlers.handleStatusToggle(e);
    }
    // 过滤器
    else if (target.classList.contains('filter-select')) {
      this.eventHandlers.handleFilterChange(e);
    }
    // 页面大小
    else if (target.classList.contains('page-size-select')) {
      this.eventHandlers.handlePageSizeChange(e);
    }
  },

  // 统一input事件处理
  handleInput(e) {
    const target = e.target;

    // 搜索输入 - 使用防抖
    if (target.classList.contains('search-input')) {
      if (!this.debouncedSearch) {
        this.debouncedSearch = this.debounceSearch(this.eventHandlers.handleSearchInput, 300);
      }
      this.debouncedSearch(e);
    }
  },

  // 清除搜索
  clearSearch() {
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
      searchInput.value = '';
      this.state.searchKeyword = '';
      this.state.pagination.currentPage = 1;
      this.applyFilters();
      this.renderTable();
    }
  },

  // 清除选择
  clearSelection() {
    this.state.selectedItems.clear();
    document.querySelectorAll('.row-checkbox').forEach(checkbox => {
      checkbox.checked = false;
    });
    this.updateSelectAllState();
    this.updateBatchActionsVisibility();
  },

  // 批量更新状态
  async batchUpdateStatus(status) {
    const ids = Array.from(this.state.selectedItems);
    if (ids.length === 0) return;

    const action = status ? '启用' : '禁用';
    if (confirm(`确定要${action}选中的 ${ids.length} 个策略吗？`)) {
      await this.dataManager.batchUpdateStatus(ids, status);
    }
  },

  // 确认批量删除
  confirmBatchDelete() {
    const ids = Array.from(this.state.selectedItems);
    if (ids.length === 0) return;

    if (confirm(`确定要删除选中的 ${ids.length} 个策略吗？此操作不可恢复。`)) {
      this.dataManager.batchDelete(ids);
    }
  },

  // 确认单个删除
  confirmDelete(id) {
    const strategy = this.state.strategies.find(s => s.id === id);
    if (strategy && confirm(`确定要删除策略"${strategy.name}"吗？此操作不可恢复。`)) {
      this.dataManager.deleteStrategy(id);
    }
  },

  // 显示创建面板
  showCreatePanel() {
    this.showStrategyPanel('create');
  },

  // 显示编辑面板
  showEditPanel(id) {
    const strategy = this.state.strategies.find(s => s.id === id);
    if (strategy) {
      this.showStrategyPanel('edit', strategy);
    } else {
      this.showMessage('策略不存在', 'error');
    }
  },

  // 显示策略面板（新建/编辑）
  showStrategyPanel(mode, strategyData = null) {
    // 防止重复弹窗
    if (document.querySelector('.strategy-panel-overlay')) {
      return;
    }

    const isEdit = mode === 'edit';
    const title = isEdit ? '编辑流量染色策略' : '新建流量染色策略';

    // 初始化表单数据
    const formData = isEdit ? {
      name: strategyData.name || '',
      note: strategyData.note || '',
      status: strategyData.status !== false,
      effectObject: strategyData.effectObject || 'all',
      scope: strategyData.scope || '全部用户',
      techniques: strategyData.techniques || [],
      coloringConfig: strategyData.coloringConfig || {
        appColoring: { enabled: false, address: false, protocol: false, ip: false },
        dataFlowColoring: false,
        dataTrackingColoring: false
      }
    } : {
      name: '', note: '', status: true, effectObject: 'all', scope: '全部用户', techniques: [],
      coloringConfig: { appColoring: { enabled: false, address: false, protocol: false, ip: false }, dataFlowColoring: false, dataTrackingColoring: false }
    };

    // 创建面板HTML
    const panelHTML = `
            <div class="strategy-panel-overlay">
                <div class="strategy-panel">
                    <div class="panel-header">
                        <h3>${title}</h3>
                        <button class="panel-close-btn">×</button>
                    </div>
                    
                    <div class="panel-body">
                        <form class="strategy-form" id="strategyForm">
                            <!-- 基本信息 -->
                            <div class="form-section">
                                <h4 class="section-title">基本信息</h4>
                                
                                <div class="form-row">
                                    <div class="form-group">
                                        <label class="form-label required">策略名称</label>
                                        <input type="text" class="form-input" name="name" placeholder="请输入策略名称" value="${formData.name}" required>
                                        <div class="form-error" data-field="name"></div>
                                    </div>
                                </div>
                                
                                <div class="form-row">
                                    <div class="form-group">
                                        <label class="form-label">备注信息</label>
                                        <textarea class="form-textarea" name="note" placeholder="请输入备注信息（可选）" rows="3">${formData.note}</textarea>
                                    </div>
                                </div>
                                
                                <div class="form-row">
                                    <div class="form-group">
                                        <label class="form-label">启用状态</label>
                                        <label class="switch-wrapper">
                                            <input type="checkbox" class="switch-input" name="status" ${formData.status ? 'checked' : ''}>
                                            <span class="switch-slider"></span>
                                            <span class="switch-label">启用策略</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <!-- 生效范围 -->
                            <div class="form-section">
                                <h4 class="section-title">生效范围</h4>
                                
                                <div class="form-row">
                                    <div class="form-group">
                                        <label class="form-label">生效对象</label>
                                        <div class="radio-group">
                                            <label class="radio-item">
                                                <input type="radio" name="effectObject" value="all" ${formData.effectObject === 'all' ? 'checked' : ''}>
                                                <span>全部员工和设备</span>
                                            </label>
                                            <label class="radio-item">
                                                <input type="radio" name="effectObject" value="specific" ${formData.effectObject === 'specific' ? 'checked' : ''}>
                                                <span>指定员工/设备</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="form-row">
                                    <div class="form-group">
                                        <label class="form-label required">生效范围</label>
                                        <select class="form-select" name="scope" required>
                                            <option value="全部用户" ${formData.scope === '全部用户' ? 'selected' : ''}>全部用户</option>
                                            <option value="研发部门" ${formData.scope === '研发部门' ? 'selected' : ''}>研发部门</option>
                                            <option value="DBA团队" ${formData.scope === 'DBA团队' ? 'selected' : ''}>DBA团队</option>
                                            <option value="运维部门" ${formData.scope === '运维部门' ? 'selected' : ''}>运维部门</option>
                                            <option value="产品部门" ${formData.scope === '产品部门' ? 'selected' : ''}>产品部门</option>
                                            <option value="安全团队" ${formData.scope === '安全团队' ? 'selected' : ''}>安全团队</option>
                                            <option value="测试团队" ${formData.scope === '测试团队' ? 'selected' : ''}>测试团队</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <!-- 染色技术配置 -->
                            <div class="form-section">
                                <h4 class="section-title">染色技术配置</h4>
                                
                                <div class="form-row">
                                    <div class="form-group">
                                        <label class="checkbox-wrapper main-checkbox">
                                            <input type="checkbox" class="checkbox-input" name="technique_app" ${formData.techniques.includes('应用染色') ? 'checked' : ''}>
                                            <span class="checkbox-mark"></span>
                                            <span class="checkbox-label">应用染色</span>
                                        </label>
                                        
                                        <div class="sub-options" style="display: ${formData.coloringConfig.appColoring.enabled ? 'block' : 'none'};">
                                            <label class="checkbox-wrapper sub-checkbox">
                                                <input type="checkbox" name="app_address" ${formData.coloringConfig.appColoring.address ? 'checked' : ''}>
                                                <span class="checkbox-mark"></span>
                                                <span class="checkbox-label">应用地址</span>
                                            </label>
                                            <label class="checkbox-wrapper sub-checkbox">
                                                <input type="checkbox" name="app_protocol" ${formData.coloringConfig.appColoring.protocol ? 'checked' : ''}>
                                                <span class="checkbox-mark"></span>
                                                <span class="checkbox-label">协议</span>
                                            </label>
                                            <label class="checkbox-wrapper sub-checkbox">
                                                <input type="checkbox" name="app_ip" ${formData.coloringConfig.appColoring.ip ? 'checked' : ''}>
                                                <span class="checkbox-mark"></span>
                                                <span class="checkbox-label">IP地址</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="form-row">
                                    <div class="form-group">
                                        <label class="checkbox-wrapper main-checkbox">
                                            <input type="checkbox" class="checkbox-input" name="technique_flow" ${formData.techniques.includes('数据流染色') ? 'checked' : ''}>
                                            <span class="checkbox-mark"></span>
                                            <span class="checkbox-label">数据流染色</span>
                                        </label>
                                        <div class="technique-desc">监控数据在系统中的流动轨迹</div>
                                    </div>
                                </div>
                                
                                <div class="form-row">
                                    <div class="form-group">
                                        <label class="checkbox-wrapper main-checkbox">
                                            <input type="checkbox" class="checkbox-input" name="technique_tracking" ${formData.techniques.includes('数据追踪染色') ? 'checked' : ''}>
                                            <span class="checkbox-mark"></span>
                                            <span class="checkbox-label">数据追踪染色</span>
                                        </label>
                                        <div class="technique-desc">追踪敏感数据的访问和操作记录</div>
                                    </div>
                                </div>
                                
                                <div class="form-error" data-field="techniques"></div>
                            </div>
                        </form>
                    </div>
                    
                    <div class="panel-footer">
                        <button type="button" class="btn btn-outline panel-cancel">取消</button>
                        <button type="button" class="btn btn-primary panel-confirm">${isEdit ? '保存修改' : '创建策略'}</button>
                    </div>
                </div>
            </div>
        `;

    // 创建DOM元素而不是innerHTML - 关键架构改进！
    document.body.insertAdjacentHTML('beforeend', panelHTML);
    const overlay = document.querySelector('.strategy-panel-overlay');
    const panel = document.querySelector('.strategy-panel');

    // 存储面板信息
    this.currentPanel = { overlay, panel, mode, strategyData };

    requestAnimationFrame(() => {
      overlay.classList.add('show');
      panel.classList.add('show');
    });

    // 使用直接事件绑定架构 - 核心修复！
    this.bindPanelEvents(panel, overlay, mode, strategyData);
  },

  // 绑定面板事件 - 采用直接绑定架构
  bindPanelEvents(panel, overlay, mode, strategyData) {
    console.log('🔗 开始绑定面板事件，模式:', mode);

    // 关闭面板函数
    const closePanel = () => {
      overlay.classList.remove('show');
      panel.classList.remove('show');
      setTimeout(() => {
        overlay.remove();
        panel.remove();
        this.currentPanel = null;
      }, 300);
    };

    // 1. 关闭按钮事件 - 直接绑定
    const closeBtn = panel.querySelector('.panel-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        closePanel();
      });
    }

    // 2. 取消按钮事件 - 直接绑定
    const cancelBtn = panel.querySelector('.panel-cancel');
    if (cancelBtn) {
      cancelBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        closePanel();
      });
    }

    // 3. 确认按钮事件 - 直接绑定到按钮
    const confirmBtn = panel.querySelector('.panel-confirm');
    if (confirmBtn) {
      confirmBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await this.handleFormSubmit(panel, mode, strategyData, closePanel);
      });
    }

    // 4. 表单提交事件 - 直接绑定到表单
    const form = panel.querySelector('.strategy-form');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await this.handleFormSubmit(panel, mode, strategyData, closePanel);
      });
    }

    // 5. 遮罩点击关闭
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closePanel();
      }
    });

    // 6. 应用染色子选项联动
    const appTechCheckbox = panel.querySelector('input[name="technique_app"]');
    const appSubOptions = panel.querySelector('.sub-options');
    if (appTechCheckbox && appSubOptions) {
      appTechCheckbox.addEventListener('change', (e) => {
        appSubOptions.style.display = e.target.checked ? 'block' : 'none';
        if (!e.target.checked) {
          appSubOptions.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
        }
      });
    }

    console.log('✅ 面板事件绑定完成 - 采用直接绑定架构');
  },

  // 处理面板确认按钮 - 统一事件委托处理
  async handlePanelConfirm(e) {
    const panel = e.target.closest('.strategy-panel');
    if (!panel) return;

    const overlay = panel.closest('.strategy-panel-overlay');
    const isEdit = panel.dataset.mode === 'edit';
    const strategyId = isEdit ? parseInt(panel.dataset.strategyId) : null;

    try {
      console.log('🔄 面板确认按钮被点击，模式:', isEdit ? '编辑' : '创建');

      // 增强的重复提交防护
      const confirmBtn = e.target;
      const currentTime = Date.now();
      const lastSubmitTime = confirmBtn._lastSubmitTime || 0;
      const submitCooldown = 1000; // 1秒冷却时间

      // 检查是否在冷却期内
      if (currentTime - lastSubmitTime < submitCooldown) {
        console.log('⚠️ 提交过于频繁，请稍后再试');
        this.showMessage('操作过于频繁，请稍后再试', 'warning');
        return;
      }

      // 检查按钮状态
      if (confirmBtn.disabled || confirmBtn.classList.contains('submitting')) {
        console.log('⚠️ 防止重复提交 - 按钮已禁用或正在提交中');
        return;
      }

      // 表单验证
      const formData = this.collectFormData(panel);
      const validationResult = this.validateForm(formData);
      if (!validationResult.valid) {
        this.showFormErrors(validationResult.errors);
        return;
      }

      // 记录提交时间并设置提交状态
      confirmBtn._lastSubmitTime = currentTime;
      const originalText = confirmBtn.textContent;
      confirmBtn.disabled = true;
      confirmBtn.classList.add('submitting');
      confirmBtn.textContent = isEdit ? '保存中...' : '创建中...';

      // 禁用取消和关闭按钮，防止中途取消导致状态不一致
      const cancelBtn = panel.querySelector('.panel-cancel');
      const closeBtn = panel.querySelector('.panel-close-btn');
      if (cancelBtn) {
        cancelBtn.disabled = true;
        cancelBtn._originalText = cancelBtn.textContent;
        cancelBtn.textContent = '处理中...';
      }
      if (closeBtn) {
        closeBtn.disabled = true;
      }

      // 执行提交操作
      let result;
      if (isEdit) {
        result = await this.dataManager.updateStrategy(strategyId, formData);
      } else {
        result = await this.dataManager.addStrategy(formData);
      }

      // 成功反馈
      this.showMessage(isEdit ? '策略更新成功' : '策略创建成功', 'success');

      // 刷新表格显示（确保染色技术配置状态及时更新）
      this.applyFilters();
      this.renderTable();

      // 更新按钮文本显示成功状态
      confirmBtn.textContent = isEdit ? '更新成功' : '创建成功';
      confirmBtn.classList.remove('submitting');
      confirmBtn.classList.add('success');

      // 延迟关闭面板，让用户看到成功反馈
      setTimeout(() => {
        this.closePanelSafely(overlay);
      }, 1500);

    } catch (error) {
      console.error('保存策略失败:', error);
      this.showMessage('保存失败: ' + error.message, 'error');

      // 完整的错误恢复机制
      const confirmBtn = e.target;
      const cancelBtn = panel.querySelector('.panel-cancel');
      const closeBtn = panel.querySelector('.panel-close-btn');

      // 恢复确认按钮状态
      confirmBtn.disabled = false;
      confirmBtn.classList.remove('submitting', 'success');
      confirmBtn.textContent = isEdit ? '保存修改' : '创建策略';

      // 恢复取消按钮状态
      if (cancelBtn) {
        cancelBtn.disabled = false;
        cancelBtn.textContent = cancelBtn._originalText || '取消';
        delete cancelBtn._originalText;
      }

      // 恢复关闭按钮状态
      if (closeBtn) {
        closeBtn.disabled = false;
      }

      // 清除提交时间记录，允许立即重试
      delete confirmBtn._lastSubmitTime;
    }
  },

  // 统一表单提交处理 - 新架构核心方法
  async handleFormSubmit(panel, mode, strategyData, closePanel) {
    try {
      console.log('🔄 表单提交开始，模式:', mode);

      // 防止重复提交
      const confirmBtn = panel.querySelector('.panel-confirm');
      if (confirmBtn && (confirmBtn.disabled || confirmBtn.classList.contains('loading'))) {
        console.log('⚠️ 防止重复提交');
        return;
      }

      // 收集表单数据
      const formData = this.collectFormData(panel);
      console.log('📝 收集到的表单数据:', formData);

      // 验证表单数据
      const validation = this.validateForm(formData);
      if (!validation.valid) {
        console.log('❌ 表单验证失败:', validation.errors);
        this.showFormErrors(validation.errors);
        return;
      }

      // 设置加载状态
      this.setFormLoading(panel, true, mode);

      // 提交数据
      let result;
      if (mode === 'edit') {
        const strategyId = strategyData ? strategyData.id : null;
        result = await this.dataManager.updateStrategy(strategyId, formData);
        console.log('✅ 策略更新成功:', result);
        this.showMessage('策略更新成功', 'success');
      } else {
        result = await this.dataManager.addStrategy(formData);
        console.log('✅ 策略创建成功:', result);
        this.showMessage('策略创建成功', 'success');
      }

      // 刷新数据
      await this.dataManager.loadStrategies();

      // 刷新表格显示（确保染色技术配置状态及时更新）
      this.applyFilters();
      this.renderTable();

      // 显示成功状态一段时间后关闭面板
      this.setFormLoading(panel, false, mode);

      if (confirmBtn) {
        confirmBtn.innerHTML = mode === 'edit' ? '<i>✅</i> 更新成功' : '<i>✅</i> 创建成功';
        confirmBtn.classList.add('success');
      }

      // 延迟关闭面板，让用户看到成功状态和更新的数据
      setTimeout(() => {
        if (closePanel && typeof closePanel === 'function') {
          closePanel();
        }
      }, 1500);

    } catch (error) {
      console.error('❌ 表单提交失败:', error);
      this.showMessage('操作失败: ' + error.message, 'error');
    } finally {
      // 恢复加载状态
      this.setFormLoading(panel, false, mode);
    }
  },

  // 设置表单加载状态
  setFormLoading(panel, loading, mode) {
    const confirmBtn = panel.querySelector('.panel-confirm');
    const cancelBtn = panel.querySelector('.panel-cancel');
    const closeBtn = panel.querySelector('.panel-close-btn');

    if (loading) {
      if (confirmBtn) {
        confirmBtn.disabled = true;
        confirmBtn.textContent = mode === 'edit' ? '保存中...' : '创建中...';
        confirmBtn.classList.add('loading');
      }
      if (cancelBtn) cancelBtn.disabled = true;
      if (closeBtn) closeBtn.disabled = true;
    } else {
      if (confirmBtn) {
        confirmBtn.disabled = false;
        confirmBtn.textContent = mode === 'edit' ? '保存修改' : '创建策略';
        confirmBtn.classList.remove('loading');
      }
      if (cancelBtn) cancelBtn.disabled = false;
      if (closeBtn) closeBtn.disabled = false;
    }
  },

  // 处理面板取消按钮
  handlePanelCancel(e) {
    const overlay = e.target.closest('.strategy-panel-overlay');
    this.closePanelSafely(overlay);
  },

  // 处理面板关闭按钮
  handlePanelClose(e) {
    const overlay = e.target.closest('.strategy-panel-overlay');
    this.closePanelSafely(overlay);
  },

  // 安全关闭面板 - 修复内存泄漏和状态问题
  closePanelSafely(overlay) {
    if (!overlay) return;

    const panel = overlay.querySelector('.strategy-panel');

    // 清理事件监听器
    const confirmBtn = panel.querySelector('.panel-confirm');
    const cancelBtn = panel.querySelector('.panel-cancel');
    const closeBtn = panel.querySelector('.panel-close-btn');

    // 移除直接绑定的事件监听器（如果有的话）
    if (confirmBtn && confirmBtn._directHandler) {
      confirmBtn.removeEventListener('click', confirmBtn._directHandler);
    }
    if (cancelBtn && cancelBtn._directHandler) {
      cancelBtn.removeEventListener('click', cancelBtn._directHandler);
    }
    if (closeBtn && closeBtn._directHandler) {
      closeBtn.removeEventListener('click', closeBtn._directHandler);
    }

    // 执行关闭动画
    overlay.classList.remove('show');
    panel.classList.remove('show');

    // 延迟移除DOM节点
    setTimeout(() => {
      if (overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
    }, 300);

    console.log('✅ 面板安全关闭完成');
  },

  // 收集表单数据
  collectFormData(panel = null) {
    // 优先使用传入的panel，否则查找全局表单
    const form = panel ? panel.querySelector('.strategy-form') : document.getElementById('strategyForm');
    if (!form) {
      throw new Error('找不到表单元素');
    }

    console.log('🔍 开始收集表单数据...');

    // 使用 FormData 收集基本数据
    const formData = new FormData(form);

    // 收集基本信息
    const name = formData.get('name')?.trim() || '';
    const note = formData.get('note')?.trim() || '';
    const status = formData.get('status') === 'on';
    const effectObject = formData.get('effectObject') || 'all';
    const scope = formData.get('scope') || '全部用户';

    console.log('📝 基本信息:', { name, note, status, effectObject, scope });

    // 收集染色技术配置
    const techniques = [];
    const coloringConfig = {
      appColoring: { enabled: false, address: false, protocol: false, ip: false },
      dataFlowColoring: false,
      dataTrackingColoring: false
    };

    // 应用染色
    const techniqueApp = formData.get('technique_app') === 'on';
    if (techniqueApp) {
      techniques.push('应用染色');
      coloringConfig.appColoring.enabled = true;
      coloringConfig.appColoring.address = formData.get('app_address') === 'on';
      coloringConfig.appColoring.protocol = formData.get('app_protocol') === 'on';
      coloringConfig.appColoring.ip = formData.get('app_ip') === 'on';
    }

    // 数据流染色
    const techniqueFlow = formData.get('technique_flow') === 'on';
    if (techniqueFlow) {
      techniques.push('数据流染色');
      coloringConfig.dataFlowColoring = true;
    }

    // 数据追踪染色
    const techniqueTracking = formData.get('technique_tracking') === 'on';
    if (techniqueTracking) {
      techniques.push('数据追踪染色');
      coloringConfig.dataTrackingColoring = true;
    }

    console.log('🎨 染色技术配置:', { techniques, coloringConfig });

    const result = {
      name,
      note,
      status,
      effectObject,
      scope,
      techniques,
      coloringConfig,
      // 添加时间戳字段（创建时使用，更新时会被覆盖）
      createTime: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    };

    console.log('✅ 表单数据收集完成:', result);
    return result;
  },

  // 表单验证
  validateForm(data) {
    const errors = {};

    if (!data.name) {
      errors.name = '策略名称不能为空';
    } else if (data.name.length > 50) {
      errors.name = '策略名称不能超过50个字符';
    }

    if (data.techniques.length === 0) {
      errors.techniques = '至少需要选择一种染色技术';
    }

    if (data.techniques.includes('应用染色')) {
      const { address, protocol, ip } = data.coloringConfig.appColoring;
      if (!address && !protocol && !ip) {
        errors.techniques = '启用应用染色时，至少需要选择一种应用染色方式';
      }
    }

    return { valid: Object.keys(errors).length === 0, errors };
  },

  // 显示表单错误
  showFormErrors(errors) {
    document.querySelectorAll('.form-error').forEach(el => {
      el.textContent = '';
      el.style.display = 'none';
    });

    document.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(el => {
      el.classList.remove('error');
    });

    Object.keys(errors).forEach(field => {
      const errorEl = document.querySelector(`[data-field="${field}"]`);
      if (errorEl) {
        errorEl.textContent = errors[field];
        errorEl.style.display = 'block';
      }

      const inputEl = document.querySelector(`[name="${field}"]`);
      if (inputEl) {
        inputEl.classList.add('error');
      }
    });

    const firstError = document.querySelector('.form-error[style*="block"]');
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  },

  // 显示统计信息
  async showStatistics(id) {
    try {
      this.showLoading(true);
      const stats = await this.apiSimulator.getStrategyStatistics(id);

      // 创建统计信息弹窗
      const modal = document.createElement('div');
      modal.className = 'stats-modal-overlay';
      modal.innerHTML = `
                <div class="stats-modal">
                    <div class="stats-header">
                        <h3>策略执行统计</h3>
                        <button class="stats-close">×</button>
                    </div>
                    <div class="stats-content">
                        <div class="stats-grid">
                            <div class="stat-item">
                                <div class="stat-label">总流量</div>
                                <div class="stat-value">${(stats.totalTraffic / 1000000).toFixed(2)}M</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-label">染色流量</div>
                                <div class="stat-value">${(stats.coloredTraffic / 1000000).toFixed(2)}M</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-label">染色率</div>
                                <div class="stat-value">${stats.coloringRate}%</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-label">平均延迟</div>
                                <div class="stat-value">${stats.performanceMetrics.averageLatency}ms</div>
                            </div>
                        </div>
                        <div class="stats-chart">
                            <p>📊 详细图表分析功能开发中...</p>
                        </div>
                    </div>
                </div>
            `;

      document.body.appendChild(modal);

      // 绑定关闭事件
      modal.querySelector('.stats-close').addEventListener('click', () => {
        modal.remove();
      });

      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.remove();
        }
      });

    } catch (error) {
      this.showMessage('获取统计信息失败: ' + error.message, 'error');
    } finally {
      this.showLoading(false);
    }
  },

  // 加载CSS样式
  loadStyles() {
    // 检查是否已经加载过样式
    if (document.getElementById('traffic-coloring-v2-styles')) {
      return;
    }

    // 创建link标签加载外部CSS
    const link = document.createElement('link');
    link.id = 'traffic-coloring-v2-styles';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'views/trafficColoringV2.css';
    document.head.appendChild(link);
  },

  // 初始化页面
  async init() {
    try {
      // 加载样式
      this.loadStyles();

      // 确保AppDataManagerV2已初始化
      if (!AppDataManagerV2.initialized) {
        await AppDataManagerV2.init();
      }

      // 加载数据
      await this.dataManager.loadStrategies();

      // 绑定事件
      this.bindEvents();

      console.log('✅ trafficColoringV2初始化完成');

      // 初始渲染 - 稍微延迟确保DOM就绪
      setTimeout(() => this.initialRender(), 300);

      // 监听数据变化
      AppDataManagerV2.eventListeners.coloringStrategies.push((event) => {
        console.log('收到流量染色策略变更事件:', event);
        // 可以在这里处理实时同步逻辑
      });

      console.log('✅ 流量染色页面V2初始化完成');

    } catch (error) {
      console.error('❌ 流量染色页面V2初始化失败:', error);
      this.showMessage('页面初始化失败: ' + error.message, 'error');
    }
  },

  // 初始渲染
  async initialRender() {
    try {
      // 等待一下确保DOM完全加载
      await new Promise(resolve => setTimeout(resolve, 200));

      // 渲染表格
      this.renderTable();

      console.log('✅ 流量染色初始渲染完成');
    } catch (error) {
      console.error('❌ 流量染色初始渲染失败:', error);
    }
  }
};

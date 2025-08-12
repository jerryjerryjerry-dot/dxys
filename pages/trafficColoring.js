// 流量染色页面模块
window.trafficColoring = {
    id: 'trafficColoring',
    title: '流量染色',
    
    // 流量染色策略数据
    strategies: [
        {
            id: 1,
            name: '业务系统访问流量染色',
            scope: '研发部门',
            techniques: ['应用染色', '数据流染色'],
            note: '用于追踪业务系统的访问流量，实现数据追踪',
            status: true
        },
        {
            id: 2,
            name: '数据库操作染色策略',
            scope: 'DBA团队',
            techniques: ['数据流染色', '数据追踪染色'],
            note: '监控数据库操作行为，追踪敏感数据流向',
            status: true
        },
        {
            id: 3,
            name: 'API调用链路染色',
            scope: '全部用户',
            techniques: ['应用染色', '数据追踪染色'],
            note: '追踪微服务间的调用链路，优化系统性能',
            status: true
        },
        {
            id: 4,
            name: '文件传输染色监控',
            scope: '运维部门',
            techniques: ['数据流染色'],
            note: '监控文件传输过程，防止数据泄露',
            status: false
        },
        {
            id: 5,
            name: '用户行为染色分析',
            scope: '产品部门',
            techniques: ['应用染色', '数据流染色', '数据追踪染色'],
            note: '分析用户操作行为，优化产品体验',
            status: true
        },
        {
            id: 6,
            name: '安全审计染色策略',
            scope: '安全团队',
            techniques: ['数据流染色', '数据追踪染色'],
            note: '对敏感操作进行安全审计，保障数据安全',
            status: true
        },
        {
            id: 7,
            name: '测试环境流量染色',
            scope: '测试团队',
            techniques: ['应用染色'],
            note: '区分测试环境流量，避免干扰生产数据',
            status: false
        },
        {
            id: 8,
            name: '跨境数据流染色',
            scope: '全部用户',
            techniques: ['数据流染色', '数据追踪染色'],
            note: '监控跨境数据流转，确保合规性',
            status: true
        },
        {
            id: 9,
            name: '移动端应用染色策略',
            scope: '产品部门',
            techniques: ['应用染色', '数据流染色'],
            note: '追踪移动端应用的使用情况，优化用户体验',
            status: true
        },
        {
            id: 10,
            name: '云服务访问染色',
            scope: '运维部门',
            techniques: ['应用染色', '数据追踪染色'],
            note: '监控云服务访问行为，确保资源使用合规',
            status: true
        },
        {
            id: 11,
            name: '网络设备流量染色',
            scope: '网络团队',
            techniques: ['数据流染色'],
            note: '监控网络设备流量，优化网络性能',
            status: false
        },
        {
            id: 12,
            name: '容器化应用染色',
            scope: '研发部门',
            techniques: ['应用染色', '数据流染色', '数据追踪染色'],
            note: '追踪容器化应用的运行状态和资源使用',
            status: true
        },
        {
            id: 13,
            name: '数据仓库访问染色',
            scope: 'DBA团队',
            techniques: ['数据流染色', '数据追踪染色'],
            note: '监控数据仓库访问行为，保护敏感数据',
            status: true
        },
        {
            id: 14,
            name: '第三方API染色监控',
            scope: '全部用户',
            techniques: ['应用染色'],
            note: '监控第三方API调用，确保服务稳定性',
            status: true
        },
        {
            id: 15,
            name: '内部系统集成染色',
            scope: '研发部门',
            techniques: ['应用染色', '数据流染色'],
            note: '追踪内部系统间的集成调用和数据流转',
            status: true
        },
        {
            id: 16,
            name: '日志系统染色策略',
            scope: '运维部门',
            techniques: ['数据流染色'],
            note: '监控日志系统的数据收集和处理流程',
            status: false
        },
        {
            id: 17,
            name: '监控系统染色',
            scope: '运维部门',
            techniques: ['应用染色', '数据追踪染色'],
            note: '追踪监控系统的数据采集和告警机制',
            status: true
        },
        {
            id: 18,
            name: '备份系统染色策略',
            scope: 'DBA团队',
            techniques: ['数据流染色'],
            note: '监控数据备份过程，确保备份完整性',
            status: true
        },
        {
            id: 19,
            name: '负载均衡器染色',
            scope: '网络团队',
            techniques: ['应用染色', '数据流染色'],
            note: '追踪负载均衡器的流量分发情况',
            status: false
        },
        {
            id: 20,
            name: '缓存系统染色监控',
            scope: '研发部门',
            techniques: ['应用染色', '数据追踪染色'],
            note: '监控缓存系统的命中率和性能表现',
            status: true
        },
        {
            id: 21,
            name: '消息队列染色策略',
            scope: '研发部门',
            techniques: ['数据流染色', '数据追踪染色'],
            note: '追踪消息队列的数据流转和处理状态',
            status: true
        },
        {
            id: 22,
            name: '搜索引擎染色',
            scope: '产品部门',
            techniques: ['应用染色', '数据流染色'],
            note: '监控搜索引擎的查询行为和结果质量',
            status: true
        },
        {
            id: 23,
            name: '支付系统染色监控',
            scope: '安全团队',
            techniques: ['应用染色', '数据流染色', '数据追踪染色'],
            note: '监控支付系统的交易流程和安全状态',
            status: true
        },
        {
            id: 24,
            name: '用户认证染色策略',
            scope: '安全团队',
            techniques: ['应用染色', '数据追踪染色'],
            note: '追踪用户认证过程，确保登录安全',
            status: true
        },
        {
            id: 25,
            name: '文件存储染色',
            scope: '运维部门',
            techniques: ['数据流染色'],
            note: '监控文件存储系统的读写操作',
            status: false
        },
        {
            id: 26,
            name: '数据库连接池染色',
            scope: 'DBA团队',
            techniques: ['应用染色', '数据流染色'],
            note: '监控数据库连接池的使用情况',
            status: true
        },
        {
            id: 27,
            name: 'API网关染色策略',
            scope: '网络团队',
            techniques: ['应用染色', '数据追踪染色'],
            note: '追踪API网关的请求路由和限流情况',
            status: true
        },
        {
            id: 28,
            name: '微服务通信染色',
            scope: '研发部门',
            techniques: ['应用染色', '数据流染色', '数据追踪染色'],
            note: '监控微服务间的通信状态和性能表现',
            status: true
        }
    ],
    
    // 搜索关键词
    searchKeyword: '',
    
    // 页面内容模板
    content: function() {
        return `
            <div class="traffic-coloring-page">
                <div class="header">
                    <h1>流量染色</h1>
                    <p>配置流量染色技术，包括染色规则定义、数据流染色，用于数据追踪</p>
                </div>
                <div class="actions">
                    <button class="btn-new">+ 新建策略</button>
                    <div class="search-box">
                        <input type="text" class="search-input" placeholder="请输入关键字进行搜索" value="${this.searchKeyword}">
                        <button class="search-btn">🔍</button>
                    </div>
                </div>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th width="40"><input type="checkbox" id="selectAll"></th>
                            <th>策略名称</th>
                            <th>生效范围</th>
                            <th>染色技术</th>
                            <th>备注</th>
                            <th>状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody id="strategiesTableBody">
                        <!-- 表格数据将通过 JavaScript 动态插入 -->
                    </tbody>
                </table>
                <div class="table-footer">
                    <div class="batch-actions">
                        <input type="checkbox" id="selectAllFooter"> 已选 <span id="selectedCount">0</span> 条
                        <button class="batch-btn" id="btnEnable">开启</button>
                        <button class="batch-btn" id="btnDisable">关闭</button>
                        <button class="batch-btn danger" id="btnDelete">删除</button>
                    </div>
                    <div class="pagination">
                        <span id="totalCount">共 0 条记录</span>
                        <button class="page-btn" id="prevPage"><</button>
                        <button class="page-btn active" id="currentPage">1</button>
                        <button class="page-btn" id="nextPage">></button>
                        <select id="pageSize">
                            <option value="10">10 条/页</option>
                            <option value="20">20 条/页</option>
                            <option value="50">50 条/页</option>
                        </select>
                    </div>
                </div>
            </div>
        `;
    },
    
    // 分页配置
    pagination: {
        currentPage: 1,
        pageSize: 10,
        totalItems: 0
    },
    
    // 选中的项目
    selectedItems: [],
    
    // 渲染表格数据
    renderTable: function() {
        const tbody = document.getElementById('strategiesTableBody');
        if (!tbody) return;
        
        // 过滤数据
        const filteredData = this.filterData();
        
        // 分页处理
        const startIndex = (this.pagination.currentPage - 1) * this.pagination.pageSize;
        const endIndex = startIndex + this.pagination.pageSize;
        const pageData = filteredData.slice(startIndex, endIndex);
        
        // 更新总数
        this.pagination.totalItems = filteredData.length;
        
        // 生成表格HTML
        tbody.innerHTML = pageData.map(strategy => {
            const tagsHtml = strategy.techniques.map(tech => {
                let tagClass = 'default';
                if (tech === '应用染色') tagClass = 'success';
                else if (tech === '数据流染色') tagClass = 'info';
                return `<span class="tag ${tagClass}">${tech}</span>`;
            }).join('');
            
            // checked属性根据selectedItems
            const checked = this.selectedItems.includes(strategy.id) ? 'checked' : '';
            return `
                <tr data-id="${strategy.id}">
                    <td><input type="checkbox" class="row-checkbox" value="${strategy.id}" ${checked}></td>
                    <td>${strategy.name}</td>
                    <td>${strategy.scope}</td>
                    <td class="config-tags">${tagsHtml}</td>
                    <td>${strategy.note}</td>
                    <td>
                        <label class="switch">
                            <input type="checkbox" class="status-switch" ${strategy.status ? 'checked' : ''} data-id="${strategy.id}">
                            <span class="slider round"></span>
                        </label>
                    </td>
                    <td>
                        <a href="#" class="link-edit" data-id="${strategy.id}">编辑</a>
                        <a href="#" class="link-delete" data-id="${strategy.id}">删除</a>
                    </td>
                </tr>
            `;
        }).join('');
        
        // 更新分页信息
        this.updatePagination();
        this.updateSelectedCount();
        this.updateSelectAllState();
        this.updateBatchButtons();
    },
    
    // 过滤数据
    filterData: function() {
        if (!this.searchKeyword.trim()) {
            return this.strategies;
        }
        
        const keyword = this.searchKeyword.toLowerCase();
        return this.strategies.filter(strategy => 
            strategy.name.toLowerCase().includes(keyword) ||
            strategy.scope.toLowerCase().includes(keyword) ||
            strategy.note.toLowerCase().includes(keyword) ||
            strategy.techniques.some(tech => tech.toLowerCase().includes(keyword))
        );
    },
    
    // 更新分页信息
    updatePagination: function() {
        const totalCount = document.getElementById('totalCount');
        const currentPage = document.getElementById('currentPage');
        const prevPage = document.getElementById('prevPage');
        const nextPage = document.getElementById('nextPage');
        
        if (totalCount) {
            totalCount.textContent = `共 ${this.pagination.totalItems} 条记录`;
        }
        
        if (currentPage) {
            currentPage.textContent = this.pagination.currentPage;
            currentPage.className = 'page-btn active';
        }
        
        if (prevPage) {
            prevPage.disabled = this.pagination.currentPage <= 1;
            prevPage.className = prevPage.disabled ? 'page-btn disabled' : 'page-btn';
        }
        
        if (nextPage) {
            const totalPages = Math.ceil(this.pagination.totalItems / this.pagination.pageSize);
            nextPage.disabled = this.pagination.currentPage >= totalPages;
            nextPage.className = nextPage.disabled ? 'page-btn disabled' : 'page-btn';
        }
    },
    
    // 更新选中数量
    updateSelectedCount: function() {
        const selectedCount = document.getElementById('selectedCount');
        if (selectedCount) {
            selectedCount.textContent = this.selectedItems.length;
        }
    },
    
    // 更新全选状态
    updateSelectAllState: function() {
        const checkboxes = document.querySelectorAll('.row-checkbox');
        const selectAll = document.getElementById('selectAll');
        const selectAllFooter = document.getElementById('selectAllFooter');
        const ids = Array.from(checkboxes).map(cb => parseInt(cb.value));
        const allChecked = ids.length > 0 && ids.every(id => this.selectedItems.includes(id));
        const someChecked = ids.some(id => this.selectedItems.includes(id));
        if (selectAll) {
            selectAll.checked = allChecked;
            selectAll.indeterminate = someChecked && !allChecked;
        }
        if (selectAllFooter) {
            selectAllFooter.checked = allChecked;
            selectAllFooter.indeterminate = someChecked && !allChecked;
        }
    },
    
    // 批量更新状态
    batchUpdateStatus: function(status) {
        if (this.selectedItems.length === 0) return;
        this.selectedItems.forEach(id => {
            const strategy = this.strategies.find(s => s.id === id);
            if (strategy) strategy.status = status;
        });
        this.selectedItems = [];
        this.renderTable();
        this.showMessage(`已${status ? '开启' : '关闭'}所选策略`);
    },
    
    // 批量删除
    batchDelete: function() {
        if (this.selectedItems.length === 0) return;
        if (confirm(`确定要删除选中的 ${this.selectedItems.length} 个策略吗？`)) {
            this.selectedItems.forEach(id => {
                const index = this.strategies.findIndex(s => s.id === id);
                if (index > -1) this.strategies.splice(index, 1);
            });
            this.selectedItems = [];
            // 如果当前页无数据且不是第一页，自动翻页
            const filteredData = this.filterData();
            const totalPages = Math.max(1, Math.ceil(filteredData.length / this.pagination.pageSize));
            if (this.pagination.currentPage > totalPages) {
                this.pagination.currentPage = totalPages;
            }
            this.renderTable();
            this.showMessage('删除成功');
        }
    },
    
    // 更新策略状态
    updateStrategyStatus: function(id, status) {
        const strategy = this.strategies.find(s => s.id === parseInt(id));
        if (strategy) {
            strategy.status = status;
        }
    },
    
    // 编辑策略
    editStrategy: function(id) {
        const strategy = this.strategies.find(s => s.id === parseInt(id));
        if (strategy) {
            this.showEditColoringPanel(strategy);
        }
    },
    
    // 删除策略
    deleteStrategy: function(id) {
        const strategy = this.strategies.find(s => s.id === parseInt(id));
        if (strategy && confirm(`确定要删除策略"${strategy.name}"吗？`)) {
            const index = this.strategies.findIndex(s => s.id === parseInt(id));
            if (index > -1) {
                this.strategies.splice(index, 1);
                this.renderTable();
                this.showMessage('删除成功');
            }
        }
    },

    // 流量染色页面样式
    styles: `
        /* 表格页面样式 */
        .traffic-coloring-page .header {
            margin-bottom: 24px;
        }
        .traffic-coloring-page .header h1 {
            margin: 0 0 8px 0;
            font-size: 24px;
            font-weight: 600;
            color: #1a1a1a;
        }
        .traffic-coloring-page .header p {
            margin: 0;
            color: #666;
            font-size: 14px;
        }
        .traffic-coloring-page .actions {
            display: flex;
            justify-content: space-between;
            margin-bottom: 16px;
        }
        .traffic-coloring-page .btn-new {
            background: #1890ff !important;
            color: white !important;
            border: none !important;
            padding: 8px 16px !important;
            border-radius: 4px !important;
            cursor: pointer !important;
            font-size: 14px !important;
        }
        .traffic-coloring-page .btn-new:hover {
            background: #40a9ff !important;
        }
        .traffic-coloring-page .search-box {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .traffic-coloring-page .search-input {
            width: 240px;
            height: 32px;
            padding: 0 12px;
            border: 1px solid #e8e8e8;
            border-radius: 4px;
            font-size: 14px;
        }
        .traffic-coloring-page .search-btn {
            background: none;
            border: none;
            cursor: pointer;
            font-size: 16px;
        }
        .traffic-coloring-page .data-table {
            width: 100%;
            border-collapse: collapse;
            background: white;
            border-radius: 4px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .traffic-coloring-page .data-table th,
        .traffic-coloring-page .data-table td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #e8e8e8;
        }
        .traffic-coloring-page .data-table th {
            background: #fafafa;
            font-weight: 500;
            color: #333;
        }
        .traffic-coloring-page .data-table tbody tr:hover {
            background: #f5f5f5;
        }
        .traffic-coloring-page .config-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 4px;
        }
        .traffic-coloring-page .tag {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 2px;
            font-size: 12px;
            margin-right: 4px;
        }
        .traffic-coloring-page .tag.success {
            background-color: #e6f7e6;
            color: #52c41a;
        }
        .traffic-coloring-page .tag.info {
            background-color: #e6f4ff;
            color: #1890ff;
        }
        .traffic-coloring-page .tag.default {
            background-color: #f5f5f5;
            color: #666;
        }
        .traffic-coloring-page .switch {
            position: relative;
            display: inline-block;
            width: 40px;
            height: 20px;
        }
        .traffic-coloring-page .switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }
        .traffic-coloring-page .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            transition: .4s;
            border-radius: 20px;
        }
        .traffic-coloring-page .slider:before {
            position: absolute;
            content: "";
            height: 16px;
            width: 16px;
            left: 2px;
            bottom: 2px;
            background-color: white;
            transition: .4s;
            border-radius: 50%;
        }
        .traffic-coloring-page input:checked + .slider {
            background-color: #1890ff;
        }
        .traffic-coloring-page input:checked + .slider:before {
            transform: translateX(20px);
        }
        .traffic-coloring-page .link-edit,
        .traffic-coloring-page .link-delete {
            color: #1890ff !important;
            text-decoration: none !important;
            margin-right: 8px !important;
        }
        
        .traffic-coloring-page .link-delete {
            color: #ff4d4f !important;
        }
        .traffic-coloring-page .table-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px 0;
        }
        .traffic-coloring-page .batch-actions {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        /* 移除页面特定的批量操作按钮样式，使用全局样式 */
        .traffic-coloring-page .pagination {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .traffic-coloring-page .page-btn {
            padding: 4px 8px;
            border: 1px solid #d9d9d9;
            background: white;
            cursor: pointer;
            font-size: 12px;
        }
        .traffic-coloring-page .page-btn.active {
            background: #1890ff;
            color: white;
            border-color: #1890ff;
        }
        .page-btn.disabled {
            opacity: 0.5;
            cursor: not-allowed !important;
        }
        .page-btn.disabled:hover {
            background-color: transparent;
        }

        /* 流量染色面板样式 - 完全独立的作用域 */
        .traffic-coloring-panel {
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
            transform: translateZ(0) !important;
        }

        .traffic-coloring-panel.show {
            right: 0 !important;
        }

        .traffic-coloring-overlay {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            background: rgba(0, 0, 0, 0.5) !important;
            z-index: 9998 !important;
            opacity: 0 !important;
            transition: opacity 0.3s ease-in-out !important;
            transform: translateZ(0) !important;
        }

        .traffic-coloring-overlay.show {
            opacity: 1 !important;
        }

        .traffic-coloring-panel .panel-header {
            padding: 16px 24px !important;
            border-bottom: 1px solid #f0f0f0 !important;
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
        }

        .traffic-coloring-panel .panel-header h3 {
            margin: 0 !important;
            font-size: 16px !important;
            font-weight: 500 !important;
        }

        .traffic-coloring-panel .btn-close {
            border: none !important;
            background: none !important;
            font-size: 20px !important;
            cursor: pointer !important;
            color: #999 !important;
        }

        .traffic-coloring-panel .panel-body {
            flex: 1 !important;
            padding: 24px !important;
            overflow-y: auto !important;
        }

        .traffic-coloring-panel .section {
            margin-bottom: 32px !important;
        }

        .traffic-coloring-panel .section h4 {
            margin: 0 0 16px 0 !important;
            font-size: 14px !important;
            font-weight: 500 !important;
        }

        .traffic-coloring-panel .form-item {
            margin-bottom: 24px !important;
        }

        .traffic-coloring-panel .form-item label {
            display: block !important;
            margin-bottom: 8px !important;
        }

        .traffic-coloring-panel .required:before {
            content: "*" !important;
            color: #ff4d4f !important;
            margin-right: 4px !important;
        }

        .traffic-coloring-panel .form-input {
            width: 100% !important;
            height: 32px !important;
            padding: 4px 11px !important;
            border: 1px solid #d9d9d9 !important;
            border-radius: 4px !important;
        }

        .traffic-coloring-panel .checkbox-group,
        .traffic-coloring-panel .checkbox-item {
            display: flex !important;
            flex-direction: column !important;
            gap: 16px !important;
        }

        .traffic-coloring-panel .checkbox-item {
            display: flex !important;
            align-items: center !important;
            gap: 8px !important;
        }

        .traffic-coloring-panel .sub-options {
            margin-left: 24px !important;
            margin-top: 8px !important;
            display: flex !important;
            gap: 16px !important;
        }

        .traffic-coloring-panel .condition-desc {
            color: #bfbfbf !important;
            font-size: 12px !important;
            margin-bottom: 8px !important;
        }

        .traffic-coloring-panel .btn-add {
            color: #1890ff !important;
            border: none !important;
            background: none !important;
            padding: 0 !important;
            cursor: pointer !important;
        }

        .traffic-coloring-panel .form-select {
            width: 100% !important;
            height: 32px !important;
            border: 1px solid #d9d9d9 !important;
            border-radius: 4px !important;
            padding: 0 11px !important;
        }

        .traffic-coloring-panel .panel-footer {
            padding: 16px 24px !important;
            border-top: 1px solid #f0f0f0 !important;
            text-align: right !important;
        }

        .traffic-coloring-panel .btn-cancel {
            margin-right: 8px !important;
            padding: 8px 16px !important;
            border: 1px solid #d9d9d9 !important;
            background: white !important;
            border-radius: 4px !important;
            cursor: pointer !important;
        }

        .traffic-coloring-panel .btn-confirm {
            padding: 8px 16px !important;
            background: #1890ff !important;
            color: white !important;
            border: none !important;
            border-radius: 4px !important;
            cursor: pointer !important;
        }
    `,

    // 绑定事件
    bindEvents: function() {
        // 检查是否已经绑定过事件，避免重复绑定
        if (this.eventsBound) {
            return;
        }
        // 搜索功能
        const searchInput = document.querySelector('.search-input');
        const searchBtn = document.querySelector('.search-btn');
        
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchKeyword = e.target.value;
                this.pagination.currentPage = 1; // 重置到第一页
                this.renderTable();
            });
            
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.searchKeyword = e.target.value;
                    this.pagination.currentPage = 1;
                    this.renderTable();
                }
            });
        }
        
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                const searchInput = document.querySelector('.search-input');
                if (searchInput) {
                    this.searchKeyword = searchInput.value;
                    this.pagination.currentPage = 1;
                    this.renderTable();
                }
            });
        }
        
        // 全选功能
        const selectAll = document.getElementById('selectAll');
        const selectAllFooter = document.getElementById('selectAllFooter');
        
        if (selectAll) {
            selectAll.addEventListener('change', (e) => {
                const checkboxes = document.querySelectorAll('.row-checkbox');
                const checked = e.target.checked;
                checkboxes.forEach(checkbox => {
                    checkbox.checked = checked;
                    const id = parseInt(checkbox.value);
                    if (checked) {
                        if (!this.selectedItems.includes(id)) this.selectedItems.push(id);
                    } else {
                        const idx = this.selectedItems.indexOf(id);
                        if (idx > -1) this.selectedItems.splice(idx, 1);
                    }
                });
                this.updateSelectedCount();
                this.updateSelectAllState();
                this.updateBatchButtons();
            });
        }
        
        if (selectAllFooter) {
            selectAllFooter.addEventListener('change', (e) => {
                const checkboxes = document.querySelectorAll('.row-checkbox');
                const checked = e.target.checked;
                checkboxes.forEach(checkbox => {
                    checkbox.checked = checked;
                    const id = parseInt(checkbox.value);
                    if (checked) {
                        if (!this.selectedItems.includes(id)) this.selectedItems.push(id);
                    } else {
                        const idx = this.selectedItems.indexOf(id);
                        if (idx > -1) this.selectedItems.splice(idx, 1);
                    }
                });
                this.updateSelectedCount();
                this.updateSelectAllState();
                this.updateBatchButtons();
            });
        }
        
        // 分页功能
        const prevPage = document.getElementById('prevPage');
        const nextPage = document.getElementById('nextPage');
        const pageSize = document.getElementById('pageSize');
        
        if (prevPage) {
            prevPage.addEventListener('click', () => {
                if (this.pagination.currentPage > 1) {
                    this.pagination.currentPage--;
                    this.renderTable();
                }
            });
        }
        
        if (nextPage) {
            nextPage.addEventListener('click', () => {
                const totalPages = Math.ceil(this.pagination.totalItems / this.pagination.pageSize);
                if (this.pagination.currentPage < totalPages) {
                    this.pagination.currentPage++;
                    this.renderTable();
                }
            });
        }
        
        if (pageSize) {
            pageSize.addEventListener('change', (e) => {
                this.pagination.pageSize = parseInt(e.target.value);
                this.pagination.currentPage = 1;
                this.renderTable();
            });
        }
        
        // 批量操作
        const btnEnable = document.getElementById('btnEnable');
        const btnDisable = document.getElementById('btnDisable');
        const btnDelete = document.getElementById('btnDelete');
        
        if (btnEnable) {
            btnEnable.addEventListener('click', () => {
                this.batchUpdateStatus(true);
            });
        }
        
        if (btnDisable) {
            btnDisable.addEventListener('click', () => {
                this.batchUpdateStatus(false);
            });
        }
        
        if (btnDelete) {
            btnDelete.addEventListener('click', () => {
                this.batchDelete();
            });
        }
        
        // 状态切换
        document.addEventListener('change', (e) => {
            if (e.target.classList.contains('status-switch')) {
                this.updateStrategyStatus(e.target.dataset.id, e.target.checked);
            }
        });
        
        // 行选择
        document.addEventListener('change', (e) => {
            if (e.target.classList.contains('row-checkbox')) {
                this.handleRowSelect(e.target);
            }
        });
        
        // 编辑和删除链接
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('link-edit')) {
                e.preventDefault();
                this.editStrategy(e.target.dataset.id);
            }
            
            if (e.target.classList.contains('link-delete')) {
                e.preventDefault();
                this.deleteStrategy(e.target.dataset.id);
            }
        });
        
        // 新建按钮
        const btnNew = document.querySelector('.btn-new');
        if (btnNew) {
            // 移除旧的事件监听器
            const newBtnNew = btnNew.cloneNode(true);
            btnNew.parentNode.replaceChild(newBtnNew, btnNew);
            
            newBtnNew.addEventListener('click', () => {
                this.showNewColoringPanel();
            });
        }
        
        // 标记事件已绑定
        this.eventsBound = true;
    },

    // 初始化页面
    init: function() {
        // 重置事件绑定标记，确保每次都能重新绑定事件
        this.eventsBound = false;
        
        // 渲染表格
        this.renderTable();
        
        // 绑定事件
        this.bindEvents();
    },

    // 显示新建流量染色策略面板
    showNewColoringPanel: function() {
        console.log('显示新建流量染色策略面板');
        
        // 确保样式只添加一次
        this.ensureStyles();
        
        // 创建遮罩层和面板容器
        const container = document.createElement('div');
        container.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 9998; pointer-events: none;';
        
        const overlay = document.createElement('div');
        overlay.className = 'traffic-coloring-overlay';
        overlay.style.pointerEvents = 'auto';
        
        const panel = document.createElement('div');
        panel.className = 'traffic-coloring-panel';
        panel.style.pointerEvents = 'auto';
        panel.innerHTML = `
            <div class="panel-header">
                <h3>新建流量染色策略</h3>
                <button class="btn-close">×</button>
            </div>
            
            <div class="panel-body">
                <!-- 基本信息 -->
                <div class="section">
                    <h4>基本信息</h4>
                    <div class="form-item">
                        <label class="required">策略名称</label>
                        <input type="text" id="newStrategyName" class="form-input" placeholder="请输入策略名称">
                    </div>
                    
                    <div class="form-item">
                        <label>备注</label>
                        <input type="text" id="newStrategyNote" class="form-input" placeholder="请输入备注信息">
                    </div>
                    
                    <div class="form-item">
                        <label>状态</label>
                        <label class="switch">
                            <input type="checkbox" id="newStrategyStatus" checked>
                            <span class="slider round"></span>
                        </label>
                    </div>
                </div>

                <!-- 生效范围 -->
                <div class="section">
                    <h4>生效范围</h4>
                    <div class="form-item">
                        <label>生效对象</label>
                        <div class="radio-group">
                            <label class="radio-item">
                                <input type="radio" name="effectScope" value="all" checked>
                                <span>全部员工和设备</span>
                            </label>
                            <label class="radio-item">
                                <input type="radio" name="effectScope" value="specific">
                                <span>指定员工/设备</span>
                            </label>
                        </div>
                    </div>

                    <div class="form-item">
                        <label>生效范围</label>
                        <select id="newStrategyScope" class="form-select">
                            <option value="全部用户">全部用户</option>
                            <option value="研发部门">研发部门</option>
                            <option value="DBA团队">DBA团队</option>
                            <option value="运维部门">运维部门</option>
                            <option value="产品部门">产品部门</option>
                            <option value="安全团队">安全团队</option>
                            <option value="测试团队">测试团队</option>
                        </select>
                    </div>
                </div>

                <!-- 执行参数 -->
                <div class="section">
                    <h4>执行参数</h4>
                    <div class="form-item">
                        <label class="required">染色技术配置</label>
                        <div class="checkbox-group">
                            <label class="checkbox-item">
                                <input type="checkbox" id="newTechApp">
                                <span>应用染色</span>
                                <div class="sub-options">
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="newTechAppAddr">
                                        <span>应用地址</span>
                                    </label>
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="newTechAppProto">
                                        <span>协议</span>
                                    </label>
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="newTechAppIP">
                                        <span>IP地址</span>
                                    </label>
                                </div>
                            </label>
                            <label class="checkbox-item">
                                <input type="checkbox" id="newTechFlow">
                                <span>数据流染色</span>
                            </label>
                            <label class="checkbox-item">
                                <input type="checkbox" id="newTechTrace">
                                <span>数据追踪染色</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="panel-footer">
                <button class="btn-cancel">取消</button>
                <button class="btn-confirm">确定</button>
            </div>
        `;
        
        container.appendChild(overlay);
        container.appendChild(panel);
        document.body.appendChild(container);

        // 使用 requestAnimationFrame 确保DOM更新后再触发动画
        requestAnimationFrame(() => {
            overlay.classList.add('show');
            panel.classList.add('show');
        });

        // 绑定关闭按钮事件
        const btnClose = panel.querySelector('.btn-close');
        const btnCancel = panel.querySelector('.btn-cancel');
        const closePanel = () => {
            overlay.classList.remove('show');
            panel.classList.remove('show');
            setTimeout(() => {
                container.remove();
            }, 300);
        };

        if (btnClose) btnClose.addEventListener('click', closePanel);
        if (btnCancel) btnCancel.addEventListener('click', closePanel);
        
        // 点击遮罩层关闭
        overlay.addEventListener('click', closePanel);

        // 绑定确定按钮事件
        const btnConfirm = panel.querySelector('.btn-confirm');
        if (btnConfirm) {
            btnConfirm.addEventListener('click', () => {
                // 收集表单数据
                const name = panel.querySelector('#newStrategyName').value.trim();
                const note = panel.querySelector('#newStrategyNote').value.trim();
                const status = panel.querySelector('#newStrategyStatus').checked;
                const scope = panel.querySelector('#newStrategyScope').value;
                // 染色技术
                const techniques = [];
                if (panel.querySelector('#newTechApp').checked) techniques.push('应用染色');
                if (panel.querySelector('#newTechFlow').checked) techniques.push('数据流染色');
                if (panel.querySelector('#newTechTrace').checked) techniques.push('数据追踪染色');
                // 校验
                if (!name) {
                    this.showMessage('策略名称不能为空');
                    return;
                }
                // 生成新id
                const maxId = this.strategies.reduce((max, s) => Math.max(max, s.id), 0);
                const newStrategy = {
                    id: maxId + 1,
                    name,
                    scope,
                    techniques,
                    note,
                    status
                };
                this.strategies.unshift(newStrategy);
                this.pagination.currentPage = 1;
                this.renderTable();
                this.showMessage('新建成功');
                closePanel();
            });
        }
    },

    // 显示编辑流量染色策略面板
    showEditColoringPanel: function(strategyData) {
        // 防止重复弹窗
        if (document.querySelector('.traffic-coloring-panel.editing')) return;
        // 确保样式只添加一次
        this.ensureStyles();
        // 创建遮罩层和面板容器
        const container = document.createElement('div');
        container.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 9998; pointer-events: none;';
        const overlay = document.createElement('div');
        overlay.className = 'traffic-coloring-overlay';
        overlay.style.pointerEvents = 'auto';
        const panel = document.createElement('div');
        panel.className = 'traffic-coloring-panel editing';
        panel.style.pointerEvents = 'auto';
        panel.innerHTML = `
            <div class="panel-header">
                <h3>编辑流量染色策略</h3>
                <button class="btn-close">×</button>
            </div>
            
            <div class="panel-body">
                <!-- 基本信息 -->
                <div class="section">
                    <h4>基本信息</h4>
                    <div class="form-item">
                        <label class="required">策略名称</label>
                        <input type="text" id="editStrategyName" class="form-input" placeholder="请输入" value="${strategyData.name}">
                    </div>
                    
                    <div class="form-item">
                        <label>备注</label>
                        <input type="text" id="editStrategyNote" class="form-input" placeholder="请输入" value="${strategyData.note}">
                    </div>
                    
                    <div class="form-item">
                        <label>状态</label>
                        <label class="switch">
                            <input type="checkbox" id="editStrategyStatus" ${strategyData.status ? 'checked' : ''}>
                            <span class="slider round"></span>
                        </label>
                    </div>
                </div>

                <!-- 生效范围 -->
                <div class="section">
                    <h4>生效范围</h4>
                    <div class="form-item">
                        <label>生效对象</label>
                        <div class="radio-group">
                            <label class="radio-item">
                                <input type="radio" name="effectScope" value="all" checked>
                                <span>全部员工和设备</span>
                            </label>
                            <label class="radio-item">
                                <input type="radio" name="effectScope" value="specific">
                                <span>指定员工/设备</span>
                            </label>
                        </div>
                    </div>

                    <div class="form-item">
                        <label>生效范围</label>
                        <select id="editStrategyScope" class="form-select">
                            <option value="全部用户" ${strategyData.scope === '全部用户' ? 'selected' : ''}>全部用户</option>
                            <option value="研发部门" ${strategyData.scope === '研发部门' ? 'selected' : ''}>研发部门</option>
                            <option value="DBA团队" ${strategyData.scope === 'DBA团队' ? 'selected' : ''}>DBA团队</option>
                            <option value="运维部门" ${strategyData.scope === '运维部门' ? 'selected' : ''}>运维部门</option>
                            <option value="产品部门" ${strategyData.scope === '产品部门' ? 'selected' : ''}>产品部门</option>
                            <option value="安全团队" ${strategyData.scope === '安全团队' ? 'selected' : ''}>安全团队</option>
                            <option value="测试团队" ${strategyData.scope === '测试团队' ? 'selected' : ''}>测试团队</option>
                        </select>
                    </div>
                </div>

                <!-- 执行参数 -->
                <div class="section">
                    <h4>执行参数</h4>
                    <div class="form-item">
                        <label class="required">染色技术配置</label>
                        <div class="checkbox-group">
                            <label class="checkbox-item">
                                <input type="checkbox" id="editTechApp" ${strategyData.techniques.includes('应用染色') ? 'checked' : ''}>
                                <span>应用染色</span>
                                <div class="sub-options">
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="editTechAppAddr">
                                        <span>应用地址</span>
                                    </label>
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="editTechAppProto">
                                        <span>协议</span>
                                    </label>
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="editTechAppIP">
                                        <span>IP地址</span>
                                    </label>
                                </div>
                            </label>
                            <label class="checkbox-item">
                                <input type="checkbox" id="editTechFlow" ${strategyData.techniques.includes('数据流染色') ? 'checked' : ''}>
                                <span>数据流染色</span>
                            </label>
                            <label class="checkbox-item">
                                <input type="checkbox" id="editTechTrace" ${strategyData.techniques.includes('数据追踪染色') ? 'checked' : ''}>
                                <span>数据追踪染色</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="panel-footer">
                <button class="btn-cancel">取消</button>
                <button class="btn-confirm">确定</button>
            </div>
        `;
        
        container.appendChild(overlay);
        container.appendChild(panel);
        document.body.appendChild(container);

        // 使用 requestAnimationFrame 确保DOM更新后再触发动画
        requestAnimationFrame(() => {
            overlay.classList.add('show');
            panel.classList.add('show');
        });

        // 绑定关闭按钮事件
        const btnClose = panel.querySelector('.btn-close');
        const btnCancel = panel.querySelector('.btn-cancel');
        const closePanel = () => {
            overlay.classList.remove('show');
            panel.classList.remove('show');
            setTimeout(() => {
                container.remove();
            }, 300);
        };

        if (btnClose) btnClose.addEventListener('click', closePanel);
        if (btnCancel) btnCancel.addEventListener('click', closePanel);
        
        // 点击遮罩层关闭
        overlay.addEventListener('click', closePanel);

        // 绑定确定按钮事件
        const btnConfirm = panel.querySelector('.btn-confirm');
        if (btnConfirm) {
            btnConfirm.addEventListener('click', () => {
                // 收集表单数据
                const name = panel.querySelector('#editStrategyName').value.trim();
                const note = panel.querySelector('#editStrategyNote').value.trim();
                const status = panel.querySelector('#editStrategyStatus').checked;
                const scope = panel.querySelector('#editStrategyScope').value;
                // 染色技术
                const techniques = [];
                if (panel.querySelector('#editTechApp').checked) techniques.push('应用染色');
                if (panel.querySelector('#editTechFlow').checked) techniques.push('数据流染色');
                if (panel.querySelector('#editTechTrace').checked) techniques.push('数据追踪染色');
                // 校验
                if (!name) {
                    this.showMessage('策略名称不能为空');
                    return;
                }
                // 更新数据
                const strategy = this.strategies.find(s => s.id === strategyData.id);
                if (strategy) {
                    strategy.name = name;
                    strategy.note = note;
                    strategy.status = status;
                    strategy.scope = scope;
                    strategy.techniques = techniques;
                }
                this.renderTable();
                this.showMessage('编辑成功');
                closePanel();
            });
        }
    },

    // 确保样式只添加一次
    ensureStyles: function() {
        if (!document.getElementById('traffic-coloring-styles')) {
            const styleElement = document.createElement('style');
            styleElement.id = 'traffic-coloring-styles';
            styleElement.textContent = this.styles;
            document.head.appendChild(styleElement);
        }
    },

    showMessage: function(msg) {
        let tip = document.getElementById('traffic-coloring-tip');
        if (!tip) {
            tip = document.createElement('div');
            tip.id = 'traffic-coloring-tip';
            tip.style.cssText = 'position:fixed;top:32px;right:32px;z-index:99999;background:rgba(0,0,0,0.75);color:#fff;padding:10px 24px;border-radius:4px;font-size:16px;box-shadow:0 2px 8px rgba(0,0,0,0.15);transition:all .3s;opacity:0;pointer-events:none;';
            document.body.appendChild(tip);
        }
        tip.textContent = msg;
        tip.style.opacity = '1';
        setTimeout(() => { tip.style.opacity = '0'; }, 1800);
    },

    updateBatchButtons: function() {
        const btnEnable = document.getElementById('btnEnable');
        const btnDisable = document.getElementById('btnDisable');
        const btnDelete = document.getElementById('btnDelete');
        const disabled = this.selectedItems.length === 0;
        if (btnEnable) btnEnable.disabled = disabled;
        if (btnDisable) btnDisable.disabled = disabled;
        if (btnDelete) btnDelete.disabled = disabled;
    },

    handleRowSelect: function(checkbox) {
        const strategyId = parseInt(checkbox.value);
        if (checkbox.checked) {
            if (!this.selectedItems.includes(strategyId)) {
                this.selectedItems.push(strategyId);
            }
        } else {
            const index = this.selectedItems.indexOf(strategyId);
            if (index > -1) {
                this.selectedItems.splice(index, 1);
            }
        }
        this.updateSelectedCount();
        this.updateSelectAllState();
        this.updateBatchButtons();
    }
}; 
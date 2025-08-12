// 开放接口页面配置
console.log('开放接口模块开始加载');

window.openApi = {
    id: 'openApi',
    title: '开放接口',
    
    // 密钥数据列表
    keyList: [
        {
            id: 1,
            purpose: '测试环境接口调用',
            accessKeyId: 'MDwH1dVWvuDGWXYAWggHyajC',
            accessKeySecret: 'Mz8KvlP6nTq9DeYLwW5qRpVxXy71CcBjLoGUfKMZ',
            role: '开发者',
            status: true,
            secretVisible: false
        },
        {
            id: 2,
            purpose: '生产环境数据同步',
            accessKeyId: 'KLmN9pQrStUvWxYzAbCdEfGh',
            accessKeySecret: 'uFTVY3qsb8x0PNjm5HCi2AalDdWeZgoSKXtRrN9J',
            role: '管理员',
            status: true,
            secretVisible: false
        },
        {
            id: 3,
            purpose: '移动端API调用',
            accessKeyId: 'AbCdEfGhIjKlMnOpQrStUvWx',
            accessKeySecret: 'ZnbvK3LdFqgJYRcMhW9ipOEuA2Xt5cyPs0oUN7Xz',
            role: '开发者',
            status: false,
            secretVisible: false
        },
        {
            id: 4,
            purpose: '第三方集成接口',
            accessKeyId: 'XyZaBcDeFgHiJkLmNoPqRsTu',
            accessKeySecret: 'oVq1yW9ZBnMJHg2EXaxrC6fdnFzKmTYsLCLt30Ae',
            role: '管理员',
            status: true,
            secretVisible: false
        },
        {
            id: 5,
            purpose: '数据分析服务',
            accessKeyId: 'VwXyZaBcDeFgHiJkLmNoPqRs',
            accessKeySecret: 'rKYzOa0L9wJUvMPqgFsTh4i3N2d7ceXtBEWVCGmn',
            role: '开发者',
            status: true,
            secretVisible: false
        },
        {
            id: 6,
            purpose: '文件上传服务',
            accessKeyId: 'TuVwXyZaBcDeFgHiJkLmNoPq',
            accessKeySecret: 'tJEFmPvBLdYwnzRA60UX39IqGfyshKC8oHOtklMW',
            role: '开发者',
            status: false,
            secretVisible: false
        }
    ],
    
    // 分页配置
    pagination: {
        currentPage: 1,
        pageSize: 10,
        totalItems: 0
    },
    
    // 搜索关键字
    searchKeyword: '',
    
    // 过滤后的数据
    filteredData: [],
    
    // 页面内容模板
    content: function() {
        return `
            <div class="header">
                <h1>开放接口</h1>
                <p>配置全面的SDK和API接口，包括跨平台SDK支持、API接口权限控制</p>
            </div>

            <div class="actions">
                <button class="btn-new-key">
                    <svg class="icon" viewBox="64 64 896 896" width="14" height="14" fill="currentColor">
                        <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"></path>
                        <path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"></path>
                    </svg>
                    新建密钥
                </button>
                <div class="search-box">
                    <input type="text" class="search-input" placeholder="请输入关键字进行搜索">
                    <button class="search-btn">🔍</button>
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
                <div class="batch-actions">
                    <input type="checkbox" id="selectAllFooter"> 已选 <span id="selectedCount">0</span> 条
                    <button class="batch-btn danger" id="btnDelete">删除</button>
                </div>
                <div class="pagination">
                    <span id="totalCount">共 0 条记录</span>
                    <button class="page-btn" id="prevPage">＜</button>
                    <button class="page-btn active" id="currentPage">1</button>
                    <button class="page-btn" id="nextPage">＞</button>
                    <select id="pageSize">
                        <option value="10">10 条/页</option>
                        <option value="20">20 条/页</option>
                        <option value="50">50 条/页</option>
                    </select>
                </div>
            </div>
        `;
    },
    styles: `
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
    `,
    newKeyTemplate: `
        <div class="open-api-panel">
            <div class="panel-header">
                <h3>新建密钥</h3>
                <button class="btn-close">×</button>
            </div>
            
            <div class="panel-body">
                <div class="section">
                    <h4>基本信息</h4>
                    <div class="form-item">
                        <label class="required">分配接口权限</label>
                        <select class="form-select" id="new-permission">
                            <option value="" disabled selected>请选择</option>
                            <option value="1">完全访问权限</option>
                            <option value="2">只读访问权限</option>
                            <option value="3">自定义权限</option>
                        </select>
                    </div>

                    <div class="form-item">
                        <label class="required">密钥用途</label>
                        <input type="text" class="form-input" id="new-purpose" placeholder="请输入">
                    </div>

                    <div class="form-item">
                        <label class="required">角色</label>
                        <select class="form-select" id="new-role">
                            <option value="" disabled selected>请选择</option>
                            <option value="管理员">管理员</option>
                            <option value="开发者">开发者</option>
                        </select>
                    </div>

                    <div class="form-item">
                        <label class="checkbox-wrapper">
                            <input type="checkbox" id="new-api-enabled">
                            <span class="checkbox-text">启用API接口</span>
                        </label>
                    </div>
                </div>
            </div>

            <div class="panel-footer">
                <button class="btn-cancel">取消</button>
                <button class="btn-confirm">确定</button>
            </div>
        </div>
    `,
    editKeyTemplate: `
        <div class="open-api-panel">
            <div class="panel-header">
                <h3>编辑密钥</h3>
                <button class="btn-close">×</button>
            </div>
            
            <div class="panel-body">
                <div class="section">
                    <h4>基本信息</h4>
                    <div class="form-item">
                        <label class="required">分配接口权限</label>
                        <select class="form-select" id="edit-permission">
                            <option value="1">完全访问权限</option>
                            <option value="2">只读访问权限</option>
                            <option value="3">自定义权限</option>
                        </select>
                    </div>

                    <div class="form-item">
                        <label class="required">密钥用途</label>
                        <input type="text" class="form-input" id="edit-purpose" placeholder="请输入">
                    </div>

                    <div class="form-item">
                        <label class="required">角色</label>
                        <select class="form-select" id="edit-role">
                            <option value="管理员">管理员</option>
                            <option value="开发者">开发者</option>
                        </select>
                    </div>

                    <div class="form-item">
                        <label class="checkbox-wrapper">
                            <input type="checkbox" id="edit-api-enabled">
                            <span class="checkbox-text">启用API接口</span>
                        </label>
                    </div>
                </div>
            </div>

            <div class="panel-footer">
                <button class="btn-cancel">取消</button>
                <button class="btn-confirm">确定</button>
            </div>
        </div>
    `,
    init: function() {
        console.log('开放接口模块初始化');
        this.filterData();
        this.renderTable();
        this.bindEvents();
    },

    // 过滤数据
    filterData: function() {
        if (!this.searchKeyword || this.searchKeyword.trim() === '') {
            this.filteredData = [...this.keyList];
        } else {
            const keyword = this.searchKeyword.toLowerCase();
            this.filteredData = this.keyList.filter(key => 
                key.purpose.toLowerCase().includes(keyword) ||
                key.accessKeyId.toLowerCase().includes(keyword) ||
                key.role.toLowerCase().includes(keyword)
            );
        }
        
        // 更新总数
        this.pagination.totalItems = this.filteredData.length;
        
        // 确保当前页不超出范围
        const maxPage = Math.ceil(this.pagination.totalItems / this.pagination.pageSize);
        if (this.pagination.currentPage > maxPage) {
            this.pagination.currentPage = maxPage || 1;
        }
    },

    // 渲染表格
    renderTable: function() {
        const tbody = document.getElementById('keyTableBody');
        if (!tbody) return;
        
        // 计算当前页数据
        const startIndex = (this.pagination.currentPage - 1) * this.pagination.pageSize;
        const endIndex = startIndex + this.pagination.pageSize;
        const currentPageData = this.filteredData.slice(startIndex, endIndex);
        
        console.log('渲染表格:', {
            currentPage: this.pagination.currentPage,
            pageSize: this.pagination.pageSize,
            startIndex: startIndex,
            endIndex: endIndex,
            dataCount: currentPageData.length,
            totalFiltered: this.filteredData.length
        });
        
        // 生成表格HTML
        tbody.innerHTML = currentPageData.map((key, index) => {
            const secretDisplay = key.secretVisible ? key.accessKeySecret : '********';
            const secretIcon = key.secretVisible ? '👁️' : '🙈';
            const secretTitle = key.secretVisible ? '隐藏' : '显示';
            const secretButtonClass = key.secretVisible ? 'btn-hide-secret' : 'btn-show-secret';
            
            return `
                <tr data-id="${key.id}">
                    <td><input type="checkbox" class="row-checkbox"></td>
                    <td>${key.purpose}</td>
                    <td>
                        ${key.accessKeyId}
                        <button class="copy-icon" title="复制" data-text="${key.accessKeyId}">
                            <svg viewBox="64 64 896 896" width="14" height="14" fill="currentColor">
                                <path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 17.7 14.3 32 32 32h512c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zm-32 512H224V256h448v448z"/>
                            </svg>
                        </button>
                    </td>
                    <td>
                        <span class="secret-content">${secretDisplay}</span>
                        <button class="secret-toggle-btn ${secretButtonClass}" title="${secretTitle}" data-key-id="${key.id}">
                            ${secretIcon}
                        </button>
                    </td>
                    <td>${key.role}</td>
                    <td><label class="switch"><input type="checkbox" ${key.status ? 'checked' : ''}><span class="slider round"></span></label></td>
                    <td><a href="#" class="link-edit" data-id="${key.id}">编辑</a><a href="#" class="link-delete" data-id="${key.id}">删除</a></td>
                </tr>
            `;
        }).join('');
        
        // 更新分页信息
        this.updatePagination();
        this.updateSelectedCount();
        this.updateSelectAllStatus();
    },

    // 更新分页信息
    updatePagination: function() {
        const totalCount = document.getElementById('totalCount');
        const currentPage = document.getElementById('currentPage');
        const prevPage = document.getElementById('prevPage');
        const nextPage = document.getElementById('nextPage');
        const pageSize = document.getElementById('pageSize');
        
        if (totalCount) {
            totalCount.textContent = `共 ${this.pagination.totalItems} 条记录`;
        }
        
        if (currentPage) {
            currentPage.textContent = this.pagination.currentPage;
        }
        
        if (prevPage) {
            prevPage.disabled = this.pagination.currentPage <= 1;
        }
        
        if (nextPage) {
            const maxPage = Math.ceil(this.pagination.totalItems / this.pagination.pageSize);
            nextPage.disabled = this.pagination.currentPage >= maxPage;
        }
        
        if (pageSize) {
            pageSize.value = this.pagination.pageSize;
        }
    },

    bindEvents: function() {
        // 检查是否已经绑定过事件，避免重复绑定
        if (this.eventsBound) {
            return;
        }
        
        console.log('开始绑定开放接口页面事件');
        
        // 搜索功能
        const searchInput = document.querySelector('.search-input');
        const searchBtn = document.querySelector('.search-btn');
        
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchKeyword = e.target.value;
                this.pagination.currentPage = 1; // 重置到第一页
                this.filterData();
                this.renderTable();
            });
            
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.searchKeyword = e.target.value;
                    this.pagination.currentPage = 1;
                    this.filterData();
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
                    this.filterData();
                    this.renderTable();
                }
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
                const maxPage = Math.ceil(this.pagination.totalItems / this.pagination.pageSize);
                if (this.pagination.currentPage < maxPage) {
                    this.pagination.currentPage++;
                    this.renderTable();
                }
            });
        }
        
        if (pageSize) {
            pageSize.addEventListener('change', (e) => {
                this.pagination.pageSize = parseInt(e.target.value);
                this.pagination.currentPage = 1; // 重置到第一页
                this.renderTable();
            });
        }
        
        // 使用事件委托，绑定到document上
        document.addEventListener('click', (e) => {
            // 新建密钥按钮
            if (e.target.closest('.btn-new-key')) {
                console.log('点击新建密钥按钮');
                e.preventDefault();
                this.showNewKeyPanel();
                return;
            }
            
            // 编辑按钮
            if (e.target.closest('.link-edit')) {
                console.log('点击编辑按钮');
                e.preventDefault();
                const keyId = e.target.getAttribute('data-id');
                this.showEditKeyPanel(keyId);
                return;
            }
            
            // 删除按钮
            if (e.target.closest('.link-delete')) {
                console.log('点击删除按钮');
                e.preventDefault();
                const keyId = e.target.getAttribute('data-id');
                this.handleDeleteKey(keyId);
                return;
            }
            
            // 复制按钮
            if (e.target.closest('.copy-icon')) {
                console.log('点击复制按钮');
                e.preventDefault();
                this.handleCopyText(e.target.closest('.copy-icon'));
                return;
            }
            
            // AccessKey Secret显示/隐藏按钮
            if (e.target.closest('.secret-toggle-btn')) {
                console.log('点击AccessKey Secret显示/隐藏按钮');
                e.preventDefault();
                const keyId = e.target.getAttribute('data-key-id');
                this.toggleSecretVisibility(keyId);
                return;
            }
        });
        
        // 绑定批量操作事件
        this.bindBatchActions();
        console.log('开放接口页面事件绑定完成');
        
        // 标记事件已绑定
        this.eventsBound = true;
    },

    showNewKeyPanel: function() {
        console.log('显示新建密钥面板');
        
        // 检查是否已有面板存在
        const existingPanel = document.querySelector('.slide-panel-wrapper');
        const existingOverlay = document.querySelector('.panel-overlay');
        if (existingPanel) {
            console.log('面板已存在，移除旧面板');
            existingPanel.remove();
        }
        if (existingOverlay) {
            console.log('遮罩层已存在，移除旧遮罩层');
            existingOverlay.remove();
        }
        
        // 创建遮罩层
        const overlay = document.createElement('div');
        overlay.className = 'panel-overlay';
        document.body.appendChild(overlay);
        
        // 创建面板容器
        const panel = document.createElement('div');
        panel.className = 'slide-panel-wrapper';
        panel.innerHTML = this.newKeyTemplate;
        document.body.appendChild(panel);

        // 添加样式
        const style = document.createElement('style');
        style.textContent = this.panelStyles;
        document.head.appendChild(style);

        // 绑定事件
        this.bindPanelEvents(panel, style, overlay);

        // 触发动画
        setTimeout(() => {
            panel.classList.add('visible');
        }, 0);
    },

    showEditKeyPanel: function(keyId) {
        console.log('显示编辑密钥面板，密钥ID:', keyId);
        
        // 查找密钥数据
        const key = this.keyList.find(k => k.id === parseInt(keyId));
        if (!key) {
            console.error('未找到密钥数据:', keyId);
            return;
        }
        
        // 检查是否已有面板存在
        const existingPanel = document.querySelector('.slide-panel-wrapper');
        const existingOverlay = document.querySelector('.panel-overlay');
        if (existingPanel) {
            console.log('面板已存在，移除旧面板');
            existingPanel.remove();
        }
        if (existingOverlay) {
            console.log('遮罩层已存在，移除旧遮罩层');
            existingOverlay.remove();
        }
        
        // 创建遮罩层
        const overlay = document.createElement('div');
        overlay.className = 'panel-overlay';
        document.body.appendChild(overlay);
        
        // 创建面板容器
        const panel = document.createElement('div');
        panel.className = 'slide-panel-wrapper';
        panel.innerHTML = this.editKeyTemplate;
        document.body.appendChild(panel);

        // 添加样式
        const style = document.createElement('style');
        style.textContent = this.panelStyles;
        document.head.appendChild(style);

        // 填充表单数据
        const purposeInput = panel.querySelector('#edit-purpose');
        const roleSelect = panel.querySelector('#edit-role');
        const enabledCheckbox = panel.querySelector('#edit-api-enabled');
        
        if (purposeInput) purposeInput.value = key.purpose;
        if (roleSelect) roleSelect.value = key.role;
        if (enabledCheckbox) enabledCheckbox.checked = key.status;
        
        console.log('填充表单数据:', { purpose: key.purpose, role: key.role, status: key.status });

        // 绑定事件
        this.bindPanelEvents(panel, style, overlay, keyId);

        // 触发动画
        setTimeout(() => {
            panel.classList.add('visible');
        }, 0);
    },

    // 绑定面板事件
    bindPanelEvents: function(panel, style, overlay, editKeyId = null) {
        const btnClose = panel.querySelector('.btn-close');
        const btnCancel = panel.querySelector('.btn-cancel');
        const closePanel = () => {
            panel.classList.remove('visible');
            setTimeout(() => {
                panel.remove();
                if (overlay) overlay.remove();
                if (style && style.parentNode) {
                    style.remove();
                }
            }, 300); // 等待动画完成
        };

        if (btnClose) btnClose.addEventListener('click', closePanel);
        if (btnCancel) btnCancel.addEventListener('click', closePanel);

        // 点击遮罩层关闭
        if (overlay) {
            overlay.addEventListener('click', closePanel);
        }

        const btnConfirm = panel.querySelector('.btn-confirm');
        if (btnConfirm) {
            btnConfirm.addEventListener('click', () => {
                // 收集表单数据
                const formData = this.collectFormData(panel);
                console.log('保存密钥配置:', formData);
                
                // 验证表单数据
                if (this.validateFormData(formData)) {
                    // 保存数据
                    if (editKeyId) {
                        this.updateKeyData(editKeyId, formData);
                    } else {
                        this.saveKeyData(formData);
                    }
                    closePanel();
                } else {
                    alert('请填写必填项');
                }
            });
        }
        
        // 权限和角色联动
        const permissionSelect = panel.querySelector('#new-permission, #edit-permission');
        const roleSelect = panel.querySelector('#new-role, #edit-role');
        
        if (permissionSelect && roleSelect) {
            permissionSelect.addEventListener('change', (e) => {
                const role = this.getRoleByPermission(e.target.value);
                if (role) {
                    roleSelect.value = role;
                }
            });
        }
    },

    // 收集表单数据
    collectFormData: function(panel) {
        const formData = {};
        
        // 基本信息
        const permissionSelect = panel.querySelector('#new-permission, #edit-permission');
        if (permissionSelect) formData.permission = permissionSelect.value;
        
        const purposeInput = panel.querySelector('#new-purpose, #edit-purpose');
        if (purposeInput) formData.purpose = purposeInput.value.trim();
        
        const roleSelect = panel.querySelector('#new-role, #edit-role');
        if (roleSelect) formData.role = roleSelect.value;
        
        const apiCheckbox = panel.querySelector('#new-api-enabled, #edit-api-enabled');
        if (apiCheckbox) formData.apiEnabled = apiCheckbox.checked;
        
        return formData;
    },

    // 验证表单数据
    validateFormData: function(formData) {
        if (!formData.purpose || formData.purpose.trim() === '') {
            return false;
        }
        
        if (!formData.permission || formData.permission === '') {
            return false;
        }
        
        if (!formData.role || formData.role === '') {
            return false;
        }
        
        return true;
    },

    // 保存密钥数据
    saveKeyData: function(formData) {
        // 创建新密钥
        const newKey = {
            id: Date.now(), // 使用时间戳作为临时ID
            purpose: formData.purpose,
            accessKeyId: this.generateAccessKeyId(),
            accessKeySecret: this.generateAccessKeySecret(),
            role: formData.role,
            status: formData.apiEnabled,
            secretVisible: false
        };
        
        // 添加到数据列表
        this.keyList.unshift(newKey);
        
        // 重新过滤和渲染
        this.filterData();
        this.renderTable();
        
        console.log('密钥数据已保存:', newKey);
    },

    // 更新密钥数据
    updateKeyData: function(keyId, formData) {
        const keyIndex = this.keyList.findIndex(key => key.id === parseInt(keyId));
        if (keyIndex === -1) {
            console.error('未找到要更新的密钥:', keyId);
            return;
        }
        
        // 更新密钥数据
        this.keyList[keyIndex].purpose = formData.purpose;
        this.keyList[keyIndex].role = formData.role;
        this.keyList[keyIndex].status = formData.apiEnabled;
        
        // 重新过滤和渲染
        this.filterData();
        this.renderTable();
        
        console.log('密钥数据已更新:', this.keyList[keyIndex]);
    },

    // 生成AccessKey ID
    generateAccessKeyId: function() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 24; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    },

    // 生成AccessKey Secret
    generateAccessKeySecret: function() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        // 生成40个字符的随机字符串
        for (let i = 0; i < 40; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    },

    // 根据权限获取角色
    getRoleByPermission: function(permission) {
        const roleMap = {
            '1': '管理员',
            '2': '开发者',
            '3': '开发者'
        };
        return roleMap[permission] || '开发者';
    },

    handleDeleteKey: function(keyId) {
        if (confirm('确定要删除这个密钥吗？')) {
            // 从数据中删除
            this.keyList = this.keyList.filter(key => key.id !== parseInt(keyId));
            
            // 重新过滤和渲染
            this.filterData();
            this.renderTable();
            
            console.log('删除密钥:', keyId);
        }
    },

    handleCopyText: function(copyBtn) {
        const text = copyBtn.getAttribute('data-text');
        if (!text) return;
        
        navigator.clipboard.writeText(text).then(() => {
            alert('复制成功');
        }).catch(() => {
            // 降级方案
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert('复制成功');
        });
    },

    bindBatchActions: function() {
        // 绑定全选复选框
        const selectAllCheckbox = document.getElementById('selectAll');
        const selectAllFooter = document.getElementById('selectAllFooter');
        
        if (selectAllCheckbox) {
            selectAllCheckbox.addEventListener('change', (e) => {
                // 只选择行复选框，不包括状态开关
                const rowCheckboxes = document.querySelectorAll('.data-table tbody tr .row-checkbox');
                rowCheckboxes.forEach(checkbox => {
                    checkbox.checked = e.target.checked;
                });
                if (selectAllFooter) {
                    selectAllFooter.checked = e.target.checked;
                    selectAllFooter.indeterminate = false;
                }
                this.updateSelectedCount();
            });
        }
        
        if (selectAllFooter) {
            selectAllFooter.addEventListener('change', (e) => {
                // 只选择行复选框，不包括状态开关
                const rowCheckboxes = document.querySelectorAll('.data-table tbody tr .row-checkbox');
                rowCheckboxes.forEach(checkbox => {
                    checkbox.checked = e.target.checked;
                });
                if (selectAllCheckbox) {
                    selectAllCheckbox.checked = e.target.checked;
                    selectAllCheckbox.indeterminate = false;
                }
                this.updateSelectedCount();
            });
        }

        // 绑定批量删除按钮
        const batchDeleteBtn = document.getElementById('btnDelete');
        if (batchDeleteBtn) {
            batchDeleteBtn.addEventListener('click', () => {
                this.handleBatchDelete();
            });
        }
        
        // 使用事件委托绑定行复选框和全选状态更新
        document.addEventListener('change', (e) => {
            if (e.target.classList.contains('row-checkbox')) {
                this.updateSelectedCount();
                this.updateSelectAllStatus();
            }
        });
    },

    updateSelectedCount: function() {
        // 只选择行复选框，不包括状态开关
        const selectedCheckboxes = document.querySelectorAll('.data-table tbody tr .row-checkbox:checked');
        const selectedCount = document.getElementById('selectedCount');
        if (selectedCount) {
            selectedCount.textContent = selectedCheckboxes.length;
            console.log('更新选中计数:', selectedCheckboxes.length);
        }
    },

    // 更新全选状态
    updateSelectAllStatus: function() {
        // 只选择行复选框，不包括状态开关
        const allCheckboxes = document.querySelectorAll('.data-table tbody tr .row-checkbox');
        const checkedCheckboxes = document.querySelectorAll('.data-table tbody tr .row-checkbox:checked');
        const selectAllCheckbox = document.getElementById('selectAll');
        const selectAllFooter = document.getElementById('selectAllFooter');
        
        const isAllChecked = allCheckboxes.length > 0 && allCheckboxes.length === checkedCheckboxes.length;
        const isPartialChecked = checkedCheckboxes.length > 0 && checkedCheckboxes.length < allCheckboxes.length;
        
        console.log('全选状态更新:', {
            total: allCheckboxes.length,
            checked: checkedCheckboxes.length,
            isAllChecked: isAllChecked,
            isPartialChecked: isPartialChecked
        });
        
        if (selectAllCheckbox) {
            selectAllCheckbox.checked = isAllChecked;
            selectAllCheckbox.indeterminate = isPartialChecked;
        }
        
        if (selectAllFooter) {
            selectAllFooter.checked = isAllChecked;
            selectAllFooter.indeterminate = isPartialChecked;
        }
    },

    handleBatchDelete: function() {
        // 只选择行复选框，不包括状态开关
        const selectedCheckboxes = document.querySelectorAll('.data-table tbody tr .row-checkbox:checked');
        if (selectedCheckboxes.length === 0) {
            alert('请选择要删除的密钥');
            return;
        }

        if (confirm(`确定要删除选中的 ${selectedCheckboxes.length} 个密钥吗？`)) {
            const selectedIds = [];
            selectedCheckboxes.forEach(checkbox => {
                const row = checkbox.closest('tr');
                if (row) {
                    const keyId = parseInt(row.getAttribute('data-id'));
                    if (keyId && !isNaN(keyId)) {
                        selectedIds.push(keyId);
                        console.log('找到选中的密钥ID:', keyId);
                    } else {
                        console.error('无效的密钥ID:', row.getAttribute('data-id'));
                    }
                }
            });
            
            console.log('要删除的密钥ID列表:', selectedIds);
            console.log('删除前的密钥列表:', this.keyList.map(k => ({ id: k.id, purpose: k.purpose })));
            
            // 从数据中删除
            const originalLength = this.keyList.length;
            this.keyList = this.keyList.filter(key => !selectedIds.includes(key.id));
            const deletedCount = originalLength - this.keyList.length;
            
            console.log('删除后的密钥列表:', this.keyList.map(k => ({ id: k.id, purpose: k.purpose })));
            console.log('实际删除数量:', deletedCount);
            
            // 重新过滤和渲染
            this.filterData();
            this.renderTable();
            
            // 重置全选状态
            this.updateSelectAllStatus();
            
            console.log('批量删除完成，删除了', deletedCount, '个密钥');
        }
    },

    // 切换AccessKey Secret显示状态
    toggleSecretVisibility: function(keyId) {
        const keyIndex = this.keyList.findIndex(key => key.id === parseInt(keyId));
        if (keyIndex === -1) {
            console.error('未找到要切换显示状态的密钥:', keyId);
            return;
        }
        
        // 切换显示状态
        this.keyList[keyIndex].secretVisible = !this.keyList[keyIndex].secretVisible;
        
        // 重新渲染表格
        this.renderTable();
        
        console.log('切换密钥显示状态:', keyId, this.keyList[keyIndex].secretVisible);
    },

    // 面板样式
    panelStyles: `
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
        }

        .checkbox-wrapper {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .checkbox-desc {
            margin-top: 4px;
            color: #666;
            font-size: 12px;
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
    `
};

// 添加测试函数
window.testOpenApi = function() {
    console.log('测试开放接口功能');
    console.log('window.openApi:', window.openApi);
    if (window.openApi) {
        console.log('调用showNewKeyPanel');
        window.openApi.showNewKeyPanel();
    } else {
        console.error('openApi模块未加载');
    }
};

console.log('开放接口模块加载完成'); 
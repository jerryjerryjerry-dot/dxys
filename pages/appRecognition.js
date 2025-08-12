// 应用识别页面模块
window.appRecognition = {
    id: 'appRecognition',
    title: '应用识别',
    
    // 内网应用数据
    internalApps: [
        {
            name: '企业邮箱系统',
            scope: '全部用户',
            recognitionTypes: ['域名识别', '协议特征识别'],
            description: '企业内部邮箱服务',
            status: true,
            domain: 'mail.company.com',
            ip: '192.168.1.100'
        },
        {
            name: 'OA办公系统',
            scope: '全部用户',
            recognitionTypes: ['域名识别'],
            description: '办公自动化系统',
            status: true,
            domain: 'oa.company.com',
            ip: '192.168.1.101'
        },
        {
            name: '财务管理系统',
            scope: '财务部门',
            recognitionTypes: ['IP识别', '协议特征识别'],
            description: '财务管理相关系统',
            status: true,
            domain: 'finance.company.com',
            ip: '192.168.1.102'
        },
        {
            name: '人力资源系统',
            scope: '人事部门',
            recognitionTypes: ['域名识别'],
            description: '人力资源管理平台',
            status: true,
            domain: 'hr.company.com',
            ip: '192.168.1.103'
        },
        {
            name: '项目管理系统',
            scope: '研发部门',
            recognitionTypes: ['IP识别'],
            description: '项目协作管理平台',
            status: false,
            domain: 'project.company.com',
            ip: '192.168.1.104'
        },
        {
            name: '代码仓库',
            scope: '研发部门',
            recognitionTypes: ['域名识别', '协议特征识别'],
            description: '代码版本控制系统',
            status: true,
            domain: 'git.company.com',
            ip: '192.168.1.105'
        },
        {
            name: '测试环境',
            scope: '测试部门',
            recognitionTypes: ['IP识别'],
            description: '软件测试环境',
            status: true,
            domain: 'test.company.com',
            ip: '192.168.1.106'
        },
        {
            name: '监控系统',
            scope: '运维部门',
            recognitionTypes: ['域名识别', 'IP识别'],
            description: '系统监控平台',
            status: true,
            domain: 'monitor.company.com',
            ip: '192.168.1.107'
        },
        {
            name: '日志系统',
            scope: '运维部门',
            recognitionTypes: ['IP识别', '协议特征识别'],
            description: '日志收集分析系统',
            status: true,
            domain: 'logs.company.com',
            ip: '192.168.1.108'
        },
        {
            name: '数据库管理',
            scope: '运维部门',
            recognitionTypes: ['IP识别'],
            description: '数据库管理平台',
            status: false,
            domain: 'db.company.com',
            ip: '192.168.1.109'
        },
        {
            name: '文件存储系统',
            scope: '全部用户',
            recognitionTypes: ['域名识别', '协议特征识别'],
            description: '企业文件存储服务',
            status: true,
            domain: 'storage.company.com',
            ip: '192.168.1.110'
        },
        {
            name: '视频会议系统',
            scope: '全部用户',
            recognitionTypes: ['域名识别'],
            description: '在线视频会议平台',
            status: true,
            domain: 'meeting.company.com',
            ip: '192.168.1.111'
        },
        {
            name: '知识库系统',
            scope: '全部用户',
            recognitionTypes: ['域名识别', 'IP识别'],
            description: '企业知识管理平台',
            status: true,
            domain: 'wiki.company.com',
            ip: '192.168.1.112'
        },
        {
            name: '客户关系管理',
            scope: '销售部门',
            recognitionTypes: ['域名识别'],
            description: '客户关系管理系统',
            status: true,
            domain: 'crm.company.com',
            ip: '192.168.1.113'
        },
        {
            name: '供应链管理',
            scope: '采购部门',
            recognitionTypes: ['IP识别', '协议特征识别'],
            description: '供应链管理平台',
            status: false,
            domain: 'supply.company.com',
            ip: '192.168.1.114'
        },
        {
            name: '质量管理系统',
            scope: '质量部门',
            recognitionTypes: ['域名识别'],
            description: '质量管理平台',
            status: true,
            domain: 'quality.company.com',
            ip: '192.168.1.115'
        },
        {
            name: '培训系统',
            scope: '培训部门',
            recognitionTypes: ['域名识别', 'IP识别'],
            description: '员工培训管理平台',
            status: true,
            domain: 'training.company.com',
            ip: '192.168.1.116'
        },
        {
            name: 'IT服务台',
            scope: 'IT部门',
            recognitionTypes: ['域名识别', '协议特征识别'],
            description: 'IT服务管理平台',
            status: true,
            domain: 'itservice.company.com',
            ip: '192.168.1.117'
        },
        {
            name: '资产管理',
            scope: '行政部门',
            recognitionTypes: ['IP识别'],
            description: '企业资产管理系统',
            status: false,
            domain: 'asset.company.com',
            ip: '192.168.1.118'
        },
        {
            name: '战略规划系统',
            scope: '战略部门',
            recognitionTypes: ['域名识别'],
            description: '战略规划管理平台',
            status: true,
            domain: 'strategy.company.com',
            ip: '192.168.1.119'
        },
        {
            name: '创新管理平台',
            scope: '创新部门',
            recognitionTypes: ['域名识别', 'IP识别'],
            description: '创新项目管理平台',
            status: true,
            domain: 'innovation.company.com',
            ip: '192.168.1.120'
        },
        {
            name: '投资管理系统',
            scope: '投资部门',
            recognitionTypes: ['IP识别', '协议特征识别'],
            description: '投资管理平台',
            status: false,
            domain: 'investment.company.com',
            ip: '192.168.1.121'
        },
        {
            name: '合规管理系统',
            scope: '合规部门',
            recognitionTypes: ['域名识别'],
            description: '合规管理平台',
            status: true,
            domain: 'compliance.company.com',
            ip: '192.168.1.122'
        },
        {
            name: '知识产权管理',
            scope: '知识产权部门',
            recognitionTypes: ['域名识别', 'IP识别'],
            description: '知识产权管理平台',
            status: true,
            domain: 'ip.company.com',
            ip: '192.168.1.123'
        },
        {
            name: '会展管理系统',
            scope: '会展部门',
            recognitionTypes: ['域名识别', '协议特征识别'],
            description: '会展活动管理平台',
            status: false,
            domain: 'events.company.com',
            ip: '192.168.1.124'
        },
        {
            name: '供应链协同',
            scope: '供应链部门',
            recognitionTypes: ['IP识别'],
            description: '供应链协同管理平台',
            status: true,
            domain: 'supplychain.company.com',
            ip: '192.168.1.125'
        },
        {
            name: '数据分析平台',
            scope: '数据分析部门',
            recognitionTypes: ['域名识别', 'IP识别', '协议特征识别'],
            description: '大数据分析平台',
            status: true,
            domain: 'analytics.company.com',
            ip: '192.168.1.126'
        },
        {
            name: '项目管理工具',
            scope: '项目部门',
            recognitionTypes: ['域名识别'],
            description: '项目协作管理工具',
            status: true,
            domain: 'projectmgmt.company.com',
            ip: '192.168.1.127'
        },
        {
            name: '客服系统',
            scope: '客服部门',
            recognitionTypes: ['域名识别', 'IP识别'],
            description: '客户服务管理平台',
            status: true,
            domain: 'service.company.com',
            ip: '192.168.1.128'
        },
        {
            name: '物流管理系统',
            scope: '物流部门',
            recognitionTypes: ['IP识别', '协议特征识别'],
            description: '物流配送管理平台',
            status: false,
            domain: 'logistics.company.com',
            ip: '192.168.1.129'
        }
    ],

    // 跨境应用数据
    crossBorderApps: [
        {
            name: '跨境电商识别',
            scope: '全部用户',
            recognitionTypes: ['跨境应用识别', '动态调整识别'],
            description: '识别跨境电商平台访问',
            status: true
        },
        {
            name: '海外社交媒体',
            scope: '指定员工',
            recognitionTypes: ['跨境应用识别', 'AI识别'],
            description: '识别海外社交媒体访问',
            status: true
        },
        {
            name: '国际视频平台',
            scope: '市场部门',
            recognitionTypes: ['跨境应用识别', '协议特征识别'],
            description: '识别国际视频流媒体平台',
            status: true
        },
        {
            name: '海外新闻媒体',
            scope: '全部用户',
            recognitionTypes: ['跨境应用识别', '域名识别'],
            description: '识别海外新闻资讯网站',
            status: true
        },
        {
            name: '国际云服务',
            scope: '研发部门',
            recognitionTypes: ['跨境应用识别', 'IP识别'],
            description: '识别国际云服务提供商',
            status: true
        },
        {
            name: '海外学术资源',
            scope: '研发部门',
            recognitionTypes: ['跨境应用识别', '动态调整识别'],
            description: '识别海外学术数据库和期刊',
            status: true
        },
        {
            name: '国际支付平台',
            scope: '财务部门',
            recognitionTypes: ['跨境应用识别', '协议特征识别'],
            description: '识别国际支付和金融平台',
            status: true
        },
        {
            name: '海外招聘平台',
            scope: '人事部门',
            recognitionTypes: ['跨境应用识别', '域名识别'],
            description: '识别海外招聘和人才平台',
            status: true
        },
        {
            name: '国际会议平台',
            scope: '全部用户',
            recognitionTypes: ['跨境应用识别', 'AI识别'],
            description: '识别国际在线会议平台',
            status: true
        },
        {
            name: '海外技术论坛',
            scope: '研发部门',
            recognitionTypes: ['跨境应用识别', '动态调整识别'],
            description: '识别海外技术社区和论坛',
            status: true
        },
        {
            name: '国际设计平台',
            scope: '设计部门',
            recognitionTypes: ['跨境应用识别', '域名识别'],
            description: '识别国际设计资源和工具平台',
            status: true
        },
        {
            name: '海外音乐平台',
            scope: '全部用户',
            recognitionTypes: ['跨境应用识别', '协议特征识别'],
            description: '识别海外音乐流媒体服务',
            status: true
        },
        {
            name: '国际游戏平台',
            scope: '指定员工',
            recognitionTypes: ['跨境应用识别', 'IP识别'],
            description: '识别国际游戏和娱乐平台',
            status: true
        },
        {
            name: '海外教育平台',
            scope: '全部用户',
            recognitionTypes: ['跨境应用识别', 'AI识别'],
            description: '识别海外在线教育平台',
            status: true
        },
        {
            name: '国际翻译服务',
            scope: '全部用户',
            recognitionTypes: ['跨境应用识别', '域名识别'],
            description: '识别国际翻译和语言服务',
            status: true
        },
        {
            name: '海外数据分析',
            scope: '数据分析部门',
            recognitionTypes: ['跨境应用识别', '动态调整识别'],
            description: '识别海外数据分析和BI平台',
            status: true
        },
        {
            name: '国际项目管理',
            scope: '项目部门',
            recognitionTypes: ['跨境应用识别', '协议特征识别'],
            description: '识别国际项目管理协作平台',
            status: true
        },
        {
            name: '海外客户服务',
            scope: '客服部门',
            recognitionTypes: ['跨境应用识别', '域名识别'],
            description: '识别海外客户服务和支持平台',
            status: true
        },
        {
            name: '国际营销平台',
            scope: '市场部门',
            recognitionTypes: ['跨境应用识别', 'AI识别'],
            description: '识别国际数字营销和广告平台',
            status: true
        },
        {
            name: '海外物流服务',
            scope: '物流部门',
            recognitionTypes: ['跨境应用识别', 'IP识别'],
            description: '识别海外物流和供应链平台',
            status: true
        },
        {
            name: '国际法律咨询',
            scope: '法务部门',
            recognitionTypes: ['跨境应用识别', '域名识别'],
            description: '识别国际法律咨询和服务平台',
            status: true
        },
        {
            name: '海外人力资源',
            scope: '人事部门',
            recognitionTypes: ['跨境应用识别', '动态调整识别'],
            description: '识别海外人力资源服务平台',
            status: true
        },
        {
            name: '国际财务服务',
            scope: '财务部门',
            recognitionTypes: ['跨境应用识别', '协议特征识别'],
            description: '识别国际财务和会计服务平台',
            status: true
        },
        {
            name: '海外技术支持',
            scope: 'IT部门',
            recognitionTypes: ['跨境应用识别', 'AI识别'],
            description: '识别海外技术支持和维护平台',
            status: true
        },
        {
            name: '国际商务平台',
            scope: '商务部门',
            recognitionTypes: ['跨境应用识别', '域名识别'],
            description: '识别国际商务合作和贸易平台',
            status: true
        },
        {
            name: '海外研发工具',
            scope: '研发部门',
            recognitionTypes: ['跨境应用识别', 'IP识别'],
            description: '识别海外研发工具和平台',
            status: true
        },
        {
            name: '国际安全服务',
            scope: '安全部门',
            recognitionTypes: ['跨境应用识别', '动态调整识别'],
            description: '识别国际网络安全服务平台',
            status: true
        },
        {
            name: '海外合规服务',
            scope: '合规部门',
            recognitionTypes: ['跨境应用识别', '协议特征识别'],
            description: '识别海外合规和监管服务平台',
            status: true
        },
        {
            name: '国际创新平台',
            scope: '创新部门',
            recognitionTypes: ['跨境应用识别', 'AI识别'],
            description: '识别国际创新和创业平台',
            status: true
        },
        {
            name: '海外投资平台',
            scope: '投资部门',
            recognitionTypes: ['跨境应用识别', '域名识别'],
            description: '识别海外投资和融资平台',
            status: true
        },
        {
            name: '国际咨询平台',
            scope: '战略部门',
            recognitionTypes: ['跨境应用识别', 'IP识别'],
            description: '识别国际咨询和顾问服务平台',
            status: true
        },
        {
            name: '海外培训平台',
            scope: '培训部门',
            recognitionTypes: ['跨境应用识别', '动态调整识别'],
            description: '识别海外专业培训平台',
            status: true
        },
        {
            name: '国际认证服务',
            scope: '质量部门',
            recognitionTypes: ['跨境应用识别', '协议特征识别'],
            description: '识别国际认证和标准服务平台',
            status: true
        },
        {
            name: '海外知识产权',
            scope: '知识产权部门',
            recognitionTypes: ['跨境应用识别', 'AI识别'],
            description: '识别海外知识产权服务平台',
            status: true
        },
        {
            name: '国际会展平台',
            scope: '市场部门',
            recognitionTypes: ['跨境应用识别', '域名识别'],
            description: '识别国际会展和活动平台',
            status: true
        },
        {
            name: '海外供应链',
            scope: '采购部门',
            recognitionTypes: ['跨境应用识别', 'IP识别'],
            description: '识别海外供应链管理平台',
            status: true
        },
        {
            name: '国际物流追踪',
            scope: '物流部门',
            recognitionTypes: ['跨境应用识别', '动态调整识别'],
            description: '识别国际物流追踪平台',
            status: true
        }
    ],
    
    // 分页配置
    pagination: {
        currentPage: 1,
        pageSize: 10,
        totalPages: 0
    },

    // 跨境应用分页配置
    crossBorderPagination: {
        currentPage: 1,
        pageSize: 10,
        totalPages: 0
    },
    
    // 页面内容模板
    content: function() {
        return `
            <div class="header">
                <h1>应用识别</h1>
                <p>用户可以通过控制台配置多层次应用识别策略，用于识别内网应用和跨境应用</p>
            </div>
            <div class="app-tabs">
                <a href="#" class="tab active" data-tab="internal">内网应用</a>
                <a href="#" class="tab" data-tab="cross-border">跨境应用</a>
            </div>
            
            <div id="internalContent" class="tab-content active">
                <div class="actions">
                    <button class="btn-new">+ 新建应用</button>
                    <div class="search-box">
                        <input type="text" class="search-input" placeholder="请输入关键字进行搜索">
                        <button class="search-btn">🔍</button>
                    </div>
                </div>

                <table class="data-table">
                    <thead>
                        <tr>
                            <th width="40"><input type="checkbox" id="selectAll"></th>
                            <th>应用名称</th>
                            <th>生效范围</th>
                            <th>识别方式</th>
                            <th>应用描述</th>
                            <th>状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody id="internalAppsTableBody">
                        <!-- 动态生成表格内容 -->
                    </tbody>
                </table>
                <div class="table-footer">
                    <div class="batch-actions">
                        <input type="checkbox" id="batchSelect"> 已选 <span id="selectedCount">0</span> 条
                        <button class="batch-btn">开启</button>
                        <button class="batch-btn">关闭</button>
                        <button class="batch-btn danger">删除</button>
                    </div>
                    <div class="pagination" id="pagination">
                        <!-- 动态生成分页 -->
                    </div>
                </div>
            </div>

            <div id="cross-borderContent" class="tab-content" style="display: none;">
                <div class="actions">
                    <button class="btn-new">+ 新建应用</button>
                    <div class="search-box">
                        <input type="text" class="search-input" placeholder="请输入关键字进行搜索">
                        <button class="search-btn">🔍</button>
                    </div>
                </div>

                <table class="data-table">
                    <thead>
                        <tr>
                            <th width="40"><input type="checkbox" id="cross-borderSelectAll"></th>
                            <th>策略名称</th>
                            <th>生效范围</th>
                            <th>识别配置</th>
                            <th>备注</th>
                            <th>状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody id="cross-borderAppsTableBody">
                        <!-- 动态生成表格内容 -->
                    </tbody>
                </table>
                <div class="table-footer">
                    <div class="batch-actions">
                        <input type="checkbox" id="crossBorderBatchSelect"> 已选 <span id="crossBorderSelectedCount">0</span> 条
                        <button class="batch-btn">开启</button>
                        <button class="batch-btn">关闭</button>
                        <button class="batch-btn danger">删除</button>
                    </div>
                    <div class="pagination" id="cross-borderPagination">
                        <!-- 动态生成分页 -->
                    </div>
                </div>
            </div>
        `;
    },

    // 应用识别面板样式
    panelStyles: `
        /* 应用识别面板样式 - 完全独立的作用域 */
        .app-recognition-panel {
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

        .app-recognition-panel.show {
            right: 0 !important;
        }

        .app-recognition-overlay {
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

        .app-recognition-overlay.show {
            opacity: 1 !important;
        }

        .app-recognition-panel .panel-header {
            padding: 16px 24px !important;
            border-bottom: 1px solid #f0f0f0 !important;
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
        }

        .app-recognition-panel .panel-header h3 {
            margin: 0 !important;
            font-size: 16px !important;
            font-weight: 500 !important;
        }

        .app-recognition-panel .btn-close {
            border: none !important;
            background: none !important;
            font-size: 20px !important;
            cursor: pointer !important;
            color: #999 !important;
        }

        .app-recognition-panel .panel-body {
            flex: 1 !important;
            padding: 24px !important;
            overflow-y: auto !important;
        }

        .app-recognition-panel .section {
            margin-bottom: 32px !important;
        }

        .app-recognition-panel .section h4 {
            margin: 0 0 16px 0 !important;
            font-size: 14px !important;
            font-weight: 500 !important;
        }

        .app-recognition-panel .form-item {
            margin-bottom: 24px !important;
        }

        .app-recognition-panel .form-item label {
            display: block !important;
            margin-bottom: 8px !important;
        }

        .app-recognition-panel .required:before {
            content: "*" !important;
            color: #ff4d4f !important;
            margin-right: 4px !important;
        }

        .app-recognition-panel .form-input {
            width: 100% !important;
            height: 32px !important;
            padding: 4px 11px !important;
            border: 1px solid #d9d9d9 !important;
            border-radius: 4px !important;
        }

        .app-recognition-panel .form-textarea {
            width: 100% !important;
            min-height: 80px !important;
            padding: 8px 11px !important;
            border: 1px solid #d9d9d9 !important;
            border-radius: 4px !important;
            resize: vertical !important;
        }

        .app-recognition-panel .form-select {
            width: 100% !important;
            height: 32px !important;
            border: 1px solid #d9d9d9 !important;
            border-radius: 4px !important;
            padding: 0 11px !important;
        }

        .app-recognition-panel .checkbox-group,
        .app-recognition-panel .checkbox-item {
            display: flex !important;
            flex-direction: column !important;
            gap: 16px !important;
        }

        .app-recognition-panel .checkbox-item {
            display: flex !important;
            align-items: center !important;
            gap: 8px !important;
        }

        .app-recognition-panel .sub-options {
            margin-left: 24px !important;
            margin-top: 8px !important;
            display: flex !important;
            gap: 16px !important;
        }

        .app-recognition-panel .input-group {
            margin-top: 8px !important;
            margin-left: 24px !important;
            display: none !important;
        }

        .app-recognition-panel .input-group.show {
            display: block !important;
        }

        .app-recognition-panel .radio-group {
            display: flex !important;
            flex-direction: column !important;
            gap: 12px !important;
        }

        .app-recognition-panel .radio-item {
            display: flex !important;
            align-items: center !important;
            gap: 8px !important;
        }

        .app-recognition-panel .switch {
            position: relative !important;
            display: inline-block !important;
            width: 40px !important;
            height: 20px !important;
        }

        .app-recognition-panel .switch input {
            opacity: 0 !important;
            width: 0 !important;
            height: 0 !important;
        }

        .app-recognition-panel .slider {
            position: absolute !important;
            cursor: pointer !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            background-color: #ccc !important;
            transition: .4s !important;
            border-radius: 20px !important;
        }

        .app-recognition-panel .slider:before {
            position: absolute !important;
            content: "" !important;
            height: 16px !important;
            width: 16px !important;
            left: 2px !important;
            bottom: 2px !important;
            background-color: white !important;
            transition: .4s !important;
            border-radius: 50% !important;
        }

        .app-recognition-panel input:checked + .slider {
            background-color: #1890ff !important;
        }

        .app-recognition-panel input:checked + .slider:before {
            transform: translateX(20px) !important;
        }

        .app-recognition-panel .panel-footer {
            padding: 16px 24px !important;
            border-top: 1px solid #f0f0f0 !important;
            text-align: right !important;
        }

        .app-recognition-panel .btn-cancel {
            margin-right: 8px !important;
            padding: 8px 16px !important;
            border: 1px solid #d9d9d9 !important;
            background: white !important;
            border-radius: 4px !important;
            cursor: pointer !important;
        }

        .app-recognition-panel .btn-confirm {
            padding: 8px 16px !important;
            background: #1890ff !important;
            color: white !important;
            border: none !important;
            border-radius: 4px !important;
            cursor: pointer !important;
        }
    `,

    // 刷新页面数据
    refreshPageData: function() {
        // TODO: 重新加载表格数据
        console.log('刷新页面数据');
    },

    // 初始化页面
    init: function() {
        // 计算内网应用总页数
        this.pagination.totalPages = Math.ceil(this.internalApps.length / this.pagination.pageSize);
        
        // 计算跨境应用总页数
        this.crossBorderPagination.totalPages = Math.ceil(this.crossBorderApps.length / this.crossBorderPagination.pageSize);
        
        // 渲染内网应用表格
        this.renderInternalAppsTable();
        
        // 渲染跨境应用表格
        this.renderCrossBorderAppsTable();
        
        // 渲染分页
        this.renderPagination();
        this.renderCrossBorderPagination();
        
        // 绑定事件
        this.bindEvents();
        
        // 绑定标签页切换事件（确保每次都重新绑定）
        this.bindTabEvents();
    },

    // 渲染内网应用表格
    renderInternalAppsTable: function() {
        const tbody = document.getElementById('internalAppsTableBody');
        if (!tbody) return;

        const startIndex = (this.pagination.currentPage - 1) * this.pagination.pageSize;
        const endIndex = startIndex + this.pagination.pageSize;
        const currentPageData = this.internalApps.slice(startIndex, endIndex);

        tbody.innerHTML = currentPageData.map((app, index) => {
            const recognitionTags = app.recognitionTypes.map(type => {
                let tagClass = 'success';
                if (type.includes('IP')) tagClass = 'info';
                if (type.includes('URL')) tagClass = 'warning';
                if (type.includes('协议')) tagClass = 'primary';
                
                return `<span class="tag ${tagClass}">${type}</span>`;
            }).join('');

            return `
                <tr>
                    <td><input type="checkbox" class="row-checkbox" data-index="${startIndex + index}"></td>
                    <td>${app.name}</td>
                    <td>${app.scope}</td>
                    <td class="config-tags">${recognitionTags}</td>
                    <td>${app.description}</td>
                    <td>
                        <label class="switch">
                            <input type="checkbox" ${app.status ? 'checked' : ''}>
                            <span class="slider round"></span>
                        </label>
                    </td>
                    <td>
                        <a href="#" class="link-edit" data-index="${startIndex + index}">编辑</a>
                        <a href="#" class="link-delete" data-index="${startIndex + index}">删除</a>
                    </td>
                </tr>
            `;
        }).join('');
    },

    // 渲染跨境应用表格
    renderCrossBorderAppsTable: function() {
        const tbody = document.getElementById('cross-borderAppsTableBody');
        if (!tbody) return;

        const startIndex = (this.crossBorderPagination.currentPage - 1) * this.crossBorderPagination.pageSize;
        const endIndex = startIndex + this.crossBorderPagination.pageSize;
        const currentPageData = this.crossBorderApps.slice(startIndex, endIndex);

        tbody.innerHTML = currentPageData.map((app, index) => {
            const recognitionTags = app.recognitionTypes.map(type => {
                let tagClass = 'success';
                if (type.includes('跨境应用')) tagClass = 'success';
                if (type.includes('动态调整')) tagClass = 'info';
                if (type.includes('AI识别')) tagClass = 'warning';
                if (type.includes('协议')) tagClass = 'primary';
                if (type.includes('域名')) tagClass = 'success';
                if (type.includes('IP')) tagClass = 'info';
                if (type.includes('URL')) tagClass = 'warning';
                
                return `<span class="tag ${tagClass}">${type}</span>`;
            }).join('');

            return `
                <tr>
                    <td><input type="checkbox" class="row-checkbox" data-index="${startIndex + index}"></td>
                    <td>${app.name}</td>
                    <td>${app.scope}</td>
                    <td class="config-tags">${recognitionTags}</td>
                    <td>${app.description}</td>
                    <td>
                        <label class="switch">
                            <input type="checkbox" ${app.status ? 'checked' : ''}>
                            <span class="slider round"></span>
                        </label>
                    </td>
                    <td>
                        <a href="#" class="link-edit" data-index="${startIndex + index}">编辑</a>
                        <a href="#" class="link-delete" data-index="${startIndex + index}">删除</a>
                    </td>
                </tr>
            `;
        }).join('');
    },

    // 渲染分页
    renderPagination: function() {
        const paginationContainer = document.getElementById('pagination');
        if (!paginationContainer) return;

        const { currentPage, totalPages } = this.pagination;
        const totalItems = this.internalApps.length;

        let paginationHTML = `<span>共 ${totalItems} 条记录</span>`;
        
        // 上一页按钮
        paginationHTML += `<button class="page-btn" ${currentPage === 1 ? 'disabled' : ''} data-page="${currentPage - 1}"><</button>`;
        
        // 页码按钮
        const startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, currentPage + 2);
        
        if (startPage > 1) {
            paginationHTML += `<button class="page-btn" data-page="1">1</button>`;
            if (startPage > 2) {
                paginationHTML += `<span class="page-ellipsis">...</span>`;
            }
        }
        
        for (let i = startPage; i <= endPage; i++) {
            paginationHTML += `<button class="page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
        }
        
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                paginationHTML += `<span class="page-ellipsis">...</span>`;
            }
            paginationHTML += `<button class="page-btn" data-page="${totalPages}">${totalPages}</button>`;
        }
        
        // 下一页按钮
        paginationHTML += `<button class="page-btn" ${currentPage === totalPages ? 'disabled' : ''} data-page="${currentPage + 1}">></button>`;
        
        // 每页条数选择
        paginationHTML += `<select id="pageSizeSelect">
            <option value="10" ${this.pagination.pageSize === 10 ? 'selected' : ''}>10 条/页</option>
            <option value="20" ${this.pagination.pageSize === 20 ? 'selected' : ''}>20 条/页</option>
            <option value="50" ${this.pagination.pageSize === 50 ? 'selected' : ''}>50 条/页</option>
        </select>`;
        
        paginationContainer.innerHTML = paginationHTML;
    },

    // 渲染跨境应用分页
    renderCrossBorderPagination: function() {
        const paginationContainer = document.getElementById('cross-borderPagination');
        if (!paginationContainer) return;

        const { currentPage, totalPages } = this.crossBorderPagination;
        const totalItems = this.crossBorderApps.length;

        let paginationHTML = `<span>共 ${totalItems} 条记录</span>`;
        
        // 上一页按钮
        paginationHTML += `<button class="page-btn" ${currentPage === 1 ? 'disabled' : ''} data-page="${currentPage - 1}"><</button>`;
        
        // 页码按钮
        const startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, currentPage + 2);
        
        if (startPage > 1) {
            paginationHTML += `<button class="page-btn" data-page="1">1</button>`;
            if (startPage > 2) {
                paginationHTML += `<span class="page-ellipsis">...</span>`;
            }
        }
        
        for (let i = startPage; i <= endPage; i++) {
            paginationHTML += `<button class="page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
        }
        
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                paginationHTML += `<span class="page-ellipsis">...</span>`;
            }
            paginationHTML += `<button class="page-btn" data-page="${totalPages}">${totalPages}</button>`;
        }
        
        // 下一页按钮
        paginationHTML += `<button class="page-btn" ${currentPage === totalPages ? 'disabled' : ''} data-page="${currentPage + 1}">></button>`;
        
        // 每页条数选择
        paginationHTML += `<select id="cross-borderPageSizeSelect">
            <option value="10" ${this.crossBorderPagination.pageSize === 10 ? 'selected' : ''}>10 条/页</option>
            <option value="20" ${this.crossBorderPagination.pageSize === 20 ? 'selected' : ''}>20 条/页</option>
            <option value="50" ${this.crossBorderPagination.pageSize === 50 ? 'selected' : ''}>50 条/页</option>
        </select>`;
        
        paginationContainer.innerHTML = paginationHTML;
    },

    // 绑定事件
    bindEvents: function() {
        // 检查是否已经绑定过事件，避免重复绑定
        if (this.eventsBound) {
            return;
        }
        
        // 绑定标签页切换事件
        this.bindTabEvents();

        // 全选/取消全选
        const selectAllCheckbox = document.getElementById('selectAll');
        if (selectAllCheckbox) {
            // 移除之前的事件监听器（如果存在）
            const newSelectAllCheckbox = selectAllCheckbox.cloneNode(true);
            selectAllCheckbox.parentNode.replaceChild(newSelectAllCheckbox, selectAllCheckbox);
            
            newSelectAllCheckbox.addEventListener('change', (e) => {
                const rowCheckboxes = document.querySelectorAll('#internalAppsTableBody .row-checkbox');
                rowCheckboxes.forEach(checkbox => {
                    checkbox.checked = e.target.checked;
                });
                this.updateSelectedCount();
            });
        }

        // 跨境应用全选/取消全选
        const crossBorderSelectAllCheckbox = document.getElementById('cross-borderSelectAll');
        if (crossBorderSelectAllCheckbox) {
            // 移除之前的事件监听器（如果存在）
            const newCrossBorderSelectAllCheckbox = crossBorderSelectAllCheckbox.cloneNode(true);
            crossBorderSelectAllCheckbox.parentNode.replaceChild(newCrossBorderSelectAllCheckbox, crossBorderSelectAllCheckbox);
            
            newCrossBorderSelectAllCheckbox.addEventListener('change', (e) => {
                const rowCheckboxes = document.querySelectorAll('#cross-borderAppsTableBody .row-checkbox');
                rowCheckboxes.forEach(checkbox => {
                    checkbox.checked = e.target.checked;
                });
                this.updateCrossBorderSelectedCount();
            });
        }

        // 行选择框
        document.addEventListener('change', (e) => {
            if (e.target.classList.contains('row-checkbox')) {
                if (e.target.closest('#internalAppsTableBody')) {
                    this.updateSelectedCount();
                } else if (e.target.closest('#cross-borderAppsTableBody')) {
                    this.updateCrossBorderSelectedCount();
                }
            }
        });

        // 分页按钮
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('page-btn') && !e.target.disabled) {
                const page = parseInt(e.target.getAttribute('data-page'));
                const paginationContainer = e.target.closest('#pagination');
                const crossBorderPaginationContainer = e.target.closest('#cross-borderPagination');
                
                if (paginationContainer && page && page !== this.pagination.currentPage) {
                    this.pagination.currentPage = page;
                    this.renderInternalAppsTable();
                    this.renderPagination();
                } else if (crossBorderPaginationContainer && page && page !== this.crossBorderPagination.currentPage) {
                    this.crossBorderPagination.currentPage = page;
                    this.renderCrossBorderAppsTable();
                    this.renderCrossBorderPagination();
                }
            }
        });

        // 每页条数选择
        document.addEventListener('change', (e) => {
            if (e.target && e.target.id === 'pageSizeSelect') {
                this.pagination.pageSize = parseInt(e.target.value);
                this.pagination.currentPage = 1; // 重置到第一页
                this.pagination.totalPages = Math.ceil(this.internalApps.length / this.pagination.pageSize);
                this.renderInternalAppsTable();
                this.renderPagination();
            } else if (e.target && e.target.id === 'cross-borderPageSizeSelect') {
                this.crossBorderPagination.pageSize = parseInt(e.target.value);
                this.crossBorderPagination.currentPage = 1; // 重置到第一页
                this.crossBorderPagination.totalPages = Math.ceil(this.crossBorderApps.length / this.crossBorderPagination.pageSize);
                this.renderCrossBorderAppsTable();
                this.renderCrossBorderPagination();
            }
        });

        // 编辑按钮
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('link-edit')) {
                e.preventDefault();
                const index = parseInt(e.target.getAttribute('data-index'));
                const tableBody = e.target.closest('tbody');
                
                if (tableBody && tableBody.id === 'internalAppsTableBody') {
                    const app = this.internalApps[index];
                    if (app) {
                        this.showEditInternalAppPanel(app, index);
                    }
                } else if (tableBody && tableBody.id === 'cross-borderAppsTableBody') {
                    const app = this.crossBorderApps[index];
                    if (app) {
                        this.showEditCrossBorderAppPanel(app, index);
                    }
                }
            }
        });

        // 删除按钮
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('link-delete')) {
                e.preventDefault();
                const index = parseInt(e.target.getAttribute('data-index'));
                const tableBody = e.target.closest('tbody');
                
                if (tableBody && tableBody.id === 'internalAppsTableBody') {
                    if (confirm('确定要删除这个内网应用吗？')) {
                        this.deleteApp(index);
                    }
                } else if (tableBody && tableBody.id === 'cross-borderAppsTableBody') {
                    if (confirm('确定要删除这个跨境应用吗？')) {
                        this.deleteCrossBorderApp(index);
                    }
                }
            }
        });

        // 新建应用按钮
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-new')) {
                e.preventDefault();
                const tabContent = e.target.closest('.tab-content');
                if (tabContent && tabContent.id === 'internalContent') {
                    this.showNewInternalAppPanel();
                } else if (tabContent && tabContent.id === 'cross-borderContent') {
                    this.showNewCrossBorderAppPanel();
                }
            }
        });

        // 批量操作按钮
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('batch-btn') && e.target.textContent === '开启') {
                e.preventDefault();
                const tabContent = e.target.closest('.tab-content');
                if (tabContent && tabContent.id === 'internalContent') {
                    this.batchEnableInternalApps();
                } else if (tabContent && tabContent.id === 'cross-borderContent') {
                    this.batchEnableCrossBorderApps();
                }
            } else if (e.target.classList.contains('batch-btn') && e.target.textContent === '关闭') {
                e.preventDefault();
                const tabContent = e.target.closest('.tab-content');
                if (tabContent && tabContent.id === 'internalContent') {
                    this.batchDisableInternalApps();
                } else if (tabContent && tabContent.id === 'cross-borderContent') {
                    this.batchDisableCrossBorderApps();
                }
            } else if (e.target.classList.contains('batch-btn') && e.target.textContent === '删除') {
                e.preventDefault();
                const tabContent = e.target.closest('.tab-content');
                if (tabContent && tabContent.id === 'internalContent') {
                    this.batchDeleteInternalApps();
                } else if (tabContent && tabContent.id === 'cross-borderContent') {
                    this.batchDeleteCrossBorderApps();
                }
            }
        });

        // 搜索功能
        document.addEventListener('input', (e) => {
            if (e.target.classList.contains('search-input')) {
                const searchValue = e.target.value.trim().toLowerCase();
                const tabContent = e.target.closest('.tab-content');
                
                if (tabContent && tabContent.id === 'internalContent') {
                    this.searchInternalApps(searchValue);
                } else if (tabContent && tabContent.id === 'cross-borderContent') {
                    this.searchCrossBorderApps(searchValue);
                }
            }
        });

        // 搜索按钮点击事件
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('search-btn')) {
                const searchInput = e.target.previousElementSibling;
                if (searchInput) {
                    const searchValue = searchInput.value.trim().toLowerCase();
                    const tabContent = e.target.closest('.tab-content');
                    
                    if (tabContent && tabContent.id === 'internalContent') {
                        this.searchInternalApps(searchValue);
                    } else if (tabContent && tabContent.id === 'cross-borderContent') {
                        this.searchCrossBorderApps(searchValue);
                    }
                }
            }
        });
        
        // 标记事件已绑定
        this.eventsBound = true;
    },

    // 绑定标签页切换事件
    bindTabEvents: function() {
        const tabs = document.querySelectorAll('.app-tabs .tab');
        const contents = document.querySelectorAll('.tab-content');
        
        // 移除之前的事件监听器（如果存在）
        tabs.forEach(tab => {
            const newTab = tab.cloneNode(true);
            tab.parentNode.replaceChild(newTab, tab);
        });
        
        // 重新获取标签页元素
        const newTabs = document.querySelectorAll('.app-tabs .tab');
        
        newTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                
                // 移除所有活动状态
                newTabs.forEach(t => t.classList.remove('active'));
                contents.forEach(content => {
                    content.classList.remove('active');
                    content.style.display = 'none';
                });
                
                // 添加当前活动状态
                tab.classList.add('active');
                const targetId = tab.getAttribute('data-tab') + 'Content';
                const targetContent = document.getElementById(targetId);
                if (targetContent) {
                    targetContent.classList.add('active');
                    targetContent.style.display = 'block';
                }
            });
        });
    },

    // 更新选中数量
    updateSelectedCount: function() {
        const selectedCheckboxes = document.querySelectorAll('#internalAppsTableBody .row-checkbox:checked');
        const selectedCount = document.getElementById('selectedCount');
        if (selectedCount) {
            selectedCount.textContent = selectedCheckboxes.length;
        }
    },

    // 更新跨境应用选中数量
    updateCrossBorderSelectedCount: function() {
        const selectedCheckboxes = document.querySelectorAll('#cross-borderAppsTableBody .row-checkbox:checked');
        const selectedCount = document.getElementById('crossBorderSelectedCount');
        if (selectedCount) {
            selectedCount.textContent = selectedCheckboxes.length;
        }
    },

    // 显示编辑面板
    showEditPanel: function(app) {
        this.showPanel('编辑内网应用', app);
    },

    // 显示跨境应用编辑面板
    showCrossBorderEditPanel: function(app) {
        this.showCrossBorderPanel('编辑跨境应用', app);
    },

    // 显示新建面板
    showNewPanel: function() {
        this.showPanel('新建内网应用');
    },

    // 显示跨境应用新建面板
    showCrossBorderNewPanel: function() {
        this.showCrossBorderPanel('新建跨境应用');
    },

    // 删除应用
    deleteApp: function(index) {
        this.internalApps.splice(index, 1);
        this.pagination.totalPages = Math.ceil(this.internalApps.length / this.pagination.pageSize);
        
        // 如果当前页没有数据了，回到上一页
        if (this.pagination.currentPage > this.pagination.totalPages && this.pagination.totalPages > 0) {
            this.pagination.currentPage = this.pagination.totalPages;
        }
        
        this.renderInternalAppsTable();
        this.renderPagination();
    },

    // 删除跨境应用
    deleteCrossBorderApp: function(index) {
        this.crossBorderApps.splice(index, 1);
        this.crossBorderPagination.totalPages = Math.ceil(this.crossBorderApps.length / this.crossBorderPagination.pageSize);
        
        // 如果当前页没有数据了，回到上一页
        if (this.crossBorderPagination.currentPage > this.crossBorderPagination.totalPages && this.crossBorderPagination.totalPages > 0) {
            this.crossBorderPagination.currentPage = this.crossBorderPagination.totalPages;
        }
        
        this.renderCrossBorderAppsTable();
        this.renderCrossBorderPagination();
    },

    // 批量开启内网应用
    batchEnableInternalApps: function() {
        const selectedCheckboxes = document.querySelectorAll('#internalAppsTableBody .row-checkbox:checked');
        if (selectedCheckboxes.length === 0) {
            alert('请先选择要开启的应用');
            return;
        }

        selectedCheckboxes.forEach(checkbox => {
            const index = parseInt(checkbox.getAttribute('data-index'));
            if (this.internalApps[index]) {
                this.internalApps[index].status = true;
            }
        });

        this.renderInternalAppsTable();
        this.updateSelectedCount();
        // 取消全选复选框的勾选状态
        const selectAllCheckbox = document.getElementById('selectAll');
        if (selectAllCheckbox) {
            selectAllCheckbox.checked = false;
        }
        alert(`已开启 ${selectedCheckboxes.length} 个应用`);
    },

    // 批量关闭内网应用
    batchDisableInternalApps: function() {
        const selectedCheckboxes = document.querySelectorAll('#internalAppsTableBody .row-checkbox:checked');
        if (selectedCheckboxes.length === 0) {
            alert('请先选择要关闭的应用');
            return;
        }

        selectedCheckboxes.forEach(checkbox => {
            const index = parseInt(checkbox.getAttribute('data-index'));
            if (this.internalApps[index]) {
                this.internalApps[index].status = false;
            }
        });

        this.renderInternalAppsTable();
        this.updateSelectedCount();
        // 取消全选复选框的勾选状态
        const selectAllCheckbox = document.getElementById('selectAll');
        if (selectAllCheckbox) {
            selectAllCheckbox.checked = false;
        }
        alert(`已关闭 ${selectedCheckboxes.length} 个应用`);
    },

    // 批量删除内网应用
    batchDeleteInternalApps: function() {
        const selectedCheckboxes = document.querySelectorAll('#internalAppsTableBody .row-checkbox:checked');
        if (selectedCheckboxes.length === 0) {
            alert('请先选择要删除的应用');
            return;
        }

        if (!confirm(`确定要删除选中的 ${selectedCheckboxes.length} 个应用吗？`)) {
            return;
        }

        // 按索引倒序删除，避免索引变化
        const indices = Array.from(selectedCheckboxes).map(checkbox => 
            parseInt(checkbox.getAttribute('data-index'))
        ).sort((a, b) => b - a);

        indices.forEach(index => {
            this.internalApps.splice(index, 1);
        });

        // 重新计算分页
        this.pagination.totalPages = Math.ceil(this.internalApps.length / this.pagination.pageSize);
        if (this.pagination.currentPage > this.pagination.totalPages && this.pagination.totalPages > 0) {
            this.pagination.currentPage = this.pagination.totalPages;
        }

        this.renderInternalAppsTable();
        this.renderPagination();
        this.updateSelectedCount();
        // 取消全选复选框的勾选状态
        const selectAllCheckbox = document.getElementById('selectAll');
        if (selectAllCheckbox) {
            selectAllCheckbox.checked = false;
        }
        alert(`已删除 ${selectedCheckboxes.length} 个应用`);
    },

    // 批量开启跨境应用
    batchEnableCrossBorderApps: function() {
        const selectedCheckboxes = document.querySelectorAll('#cross-borderAppsTableBody .row-checkbox:checked');
        if (selectedCheckboxes.length === 0) {
            alert('请先选择要开启的应用');
            return;
        }

        selectedCheckboxes.forEach(checkbox => {
            const index = parseInt(checkbox.getAttribute('data-index'));
            if (this.crossBorderApps[index]) {
                this.crossBorderApps[index].status = true;
            }
        });

        this.renderCrossBorderAppsTable();
        this.updateCrossBorderSelectedCount();
        // 取消全选复选框的勾选状态
        const crossBorderSelectAllCheckbox = document.getElementById('cross-borderSelectAll');
        if (crossBorderSelectAllCheckbox) {
            crossBorderSelectAllCheckbox.checked = false;
        }
        alert(`已开启 ${selectedCheckboxes.length} 个应用`);
    },

    // 批量关闭跨境应用
    batchDisableCrossBorderApps: function() {
        const selectedCheckboxes = document.querySelectorAll('#cross-borderAppsTableBody .row-checkbox:checked');
        if (selectedCheckboxes.length === 0) {
            alert('请先选择要关闭的应用');
            return;
        }

        selectedCheckboxes.forEach(checkbox => {
            const index = parseInt(checkbox.getAttribute('data-index'));
            if (this.crossBorderApps[index]) {
                this.crossBorderApps[index].status = false;
            }
        });

        this.renderCrossBorderAppsTable();
        this.updateCrossBorderSelectedCount();
        // 取消全选复选框的勾选状态
        const crossBorderSelectAllCheckbox = document.getElementById('cross-borderSelectAll');
        if (crossBorderSelectAllCheckbox) {
            crossBorderSelectAllCheckbox.checked = false;
        }
        alert(`已关闭 ${selectedCheckboxes.length} 个应用`);
    },

    // 批量删除跨境应用
    batchDeleteCrossBorderApps: function() {
        const selectedCheckboxes = document.querySelectorAll('#cross-borderAppsTableBody .row-checkbox:checked');
        if (selectedCheckboxes.length === 0) {
            alert('请先选择要删除的应用');
            return;
        }

        if (!confirm(`确定要删除选中的 ${selectedCheckboxes.length} 个应用吗？`)) {
            return;
        }

        // 按索引倒序删除，避免索引变化
        const indices = Array.from(selectedCheckboxes).map(checkbox => 
            parseInt(checkbox.getAttribute('data-index'))
        ).sort((a, b) => b - a);

        indices.forEach(index => {
            this.crossBorderApps.splice(index, 1);
        });

        // 重新计算分页
        this.crossBorderPagination.totalPages = Math.ceil(this.crossBorderApps.length / this.crossBorderPagination.pageSize);
        if (this.crossBorderPagination.currentPage > this.crossBorderPagination.totalPages && this.crossBorderPagination.totalPages > 0) {
            this.crossBorderPagination.currentPage = this.crossBorderPagination.totalPages;
        }

        this.renderCrossBorderAppsTable();
        this.renderCrossBorderPagination();
        this.updateCrossBorderSelectedCount();
        // 取消全选复选框的勾选状态
        const crossBorderSelectAllCheckbox = document.getElementById('cross-borderSelectAll');
        if (crossBorderSelectAllCheckbox) {
            crossBorderSelectAllCheckbox.checked = false;
        }
        alert(`已删除 ${selectedCheckboxes.length} 个应用`);
    },

    // 显示面板
    showPanel: function(title, data = null) {
        // 只插入一次全局样式
        if (!document.getElementById('app-recognition-panel-style')) {
            const style = document.createElement('style');
            style.id = 'app-recognition-panel-style';
            style.textContent = this.panelStyles;
            document.head.appendChild(style);
        }

        // 移除已存在的面板
        const existingPanels = document.querySelectorAll('.app-recognition-panel');
        existingPanels.forEach(panel => panel.remove());

        const panelHTML = this.getPanelHTML(title, data);
        const panel = document.createElement('div');
        panel.innerHTML = panelHTML;
        const panelElement = panel.firstElementChild;
        
        document.body.appendChild(panelElement);
        
        // 初始化表单值
        this.initFormValues(panelElement, data);
        
        // 绑定面板事件
        const isEdit = title.includes('编辑');
        const editIndex = data ? this.getAppIndex(data, false) : -1;
        this.bindPanelEvents(panelElement, isEdit, editIndex, false);
        
        // 显示面板
        setTimeout(() => {
            panelElement.classList.add('visible');
        }, 10);
    },

    // 显示跨境应用面板
    showCrossBorderPanel: function(title, data = null) {
        // 只插入一次全局样式
        if (!document.getElementById('app-recognition-panel-style')) {
            const style = document.createElement('style');
            style.id = 'app-recognition-panel-style';
            style.textContent = this.panelStyles;
            document.head.appendChild(style);
        }

        // 移除已存在的面板
        const existingPanels = document.querySelectorAll('.app-recognition-panel');
        existingPanels.forEach(panel => panel.remove());

        const panelHTML = this.getCrossBorderPanelHTML(title, data);
        const panel = document.createElement('div');
        panel.innerHTML = panelHTML;
        const panelElement = panel.firstElementChild;
        
        document.body.appendChild(panelElement);
        
        // 初始化表单值
        this.initCrossBorderFormValues(panelElement, data);
        
        // 绑定面板事件
        const isEdit = title.includes('编辑');
        const editIndex = data ? this.getAppIndex(data, true) : -1;
        this.bindPanelEvents(panelElement, isEdit, editIndex, true);
        
        // 显示面板
        setTimeout(() => {
            panelElement.classList.add('visible');
        }, 10);
    },

    // 获取应用索引
    getAppIndex: function(app, isCrossBorder = false) {
        const apps = isCrossBorder ? this.crossBorderApps : this.internalApps;
        return apps.findIndex(item => 
            item.name === app.name && 
            item.scope === app.scope && 
            item.description === app.description
        );
    },

    // 获取面板HTML
    getPanelHTML: function(title, data) {
        return `
            <div class="app-recognition-panel">
                <div class="panel-header">
                    <h3>${title}</h3>
                    <button class="btn-close">&times;</button>
                </div>
                <div class="panel-body">
                    <div class="section">
                        <h4>基本信息</h4>
                        <div class="form-item">
                            <label class="required">应用名称</label>
                            <input type="text" class="form-input" placeholder="请输入应用名称">
                        </div>
                        <div class="form-item">
                            <label>应用描述</label>
                            <textarea class="form-textarea" placeholder="请输入应用描述"></textarea>
                        </div>
                        <div class="form-item">
                            <label>生效范围</label>
                            <select class="form-select">
                                <option value="all">全部用户</option>
                                <option value="dev">研发部门</option>
                                <option value="test">测试部门</option>
                                <option value="ops">运维部门</option>
                                <option value="product">产品部门</option>
                                <option value="design">设计部门</option>
                                <option value="marketing">市场部门</option>
                                <option value="sales">销售部门</option>
                                <option value="hr">人事部门</option>
                                <option value="finance">财务部门</option>
                                <option value="legal">法务部门</option>
                                <option value="security">安全部门</option>
                                <option value="data">数据分析部门</option>
                                <option value="project">项目部门</option>
                                <option value="customer">客服部门</option>
                                <option value="logistics">物流部门</option>
                                <option value="procurement">采购部门</option>
                                <option value="quality">质量部门</option>
                                <option value="training">培训部门</option>
                                <option value="it">IT部门</option>
                                <option value="admin">行政部门</option>
                                <option value="strategy">战略部门</option>
                                <option value="innovation">创新部门</option>
                                <option value="investment">投资部门</option>
                                <option value="compliance">合规部门</option>
                                <option value="ip">知识产权部门</option>
                                <option value="events">会展部门</option>
                                <option value="supply">供应链部门</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="section">
                        <h4>识别方式</h4>
                        <div class="checkbox-group">
                            <label class="checkbox-item">
                                <input type="checkbox" name="recognition-type" value="domain">
                                <span>域名识别</span>
                                <div class="input-group" style="display: none;">
                                    <input type="text" class="form-input" placeholder="请输入域名">
                                </div>
                            </label>
                            <label class="checkbox-item">
                                <input type="checkbox" name="recognition-type" value="ip">
                                <span>IP识别</span>
                                <div class="input-group" style="display: none;">
                                    <input type="text" class="form-input" placeholder="请输入IP地址">
                                </div>
                            </label>
                            <label class="checkbox-item">
                                <input type="checkbox" name="recognition-type" value="url">
                                <span>URL特征识别</span>
                            </label>
                            <label class="checkbox-item">
                                <input type="checkbox" name="recognition-type" value="protocol">
                                <span>协议特征识别</span>
                            </label>
                        </div>
                    </div>
                    
                    <div class="section">
                        <h4>状态设置</h4>
                        <div class="form-item">
                            <label class="radio-item">
                                <input type="checkbox" ${data && data.status ? 'checked' : ''}>
                                <span>启用该应用</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="panel-footer">
                    <button class="btn-cancel">取消</button>
                    <button class="btn-confirm">确定</button>
                </div>
            </div>
        `;
    },

    // 获取跨境应用面板HTML
    getCrossBorderPanelHTML: function(title, data) {
        return `
            <div class="app-recognition-panel">
                <div class="panel-header">
                    <h3>${title}</h3>
                    <button class="btn-close">&times;</button>
                </div>
                <div class="panel-body">
                    <div class="section">
                        <h4>基本信息</h4>
                        <div class="form-item">
                            <label class="required">应用名称</label>
                            <input type="text" class="form-input" placeholder="请输入应用名称">
                        </div>
                        <div class="form-item">
                            <label>应用描述</label>
                            <textarea class="form-textarea" placeholder="请输入应用描述"></textarea>
                        </div>
                        <div class="form-item">
                            <label>生效范围</label>
                            <select class="form-select">
                                <option value="all">全部用户</option>
                                <option value="dev">研发部门</option>
                                <option value="test">测试部门</option>
                                <option value="ops">运维部门</option>
                                <option value="product">产品部门</option>
                                <option value="design">设计部门</option>
                                <option value="marketing">市场部门</option>
                                <option value="sales">销售部门</option>
                                <option value="hr">人事部门</option>
                                <option value="finance">财务部门</option>
                                <option value="legal">法务部门</option>
                                <option value="security">安全部门</option>
                                <option value="data">数据分析部门</option>
                                <option value="project">项目部门</option>
                                <option value="customer">客服部门</option>
                                <option value="logistics">物流部门</option>
                                <option value="procurement">采购部门</option>
                                <option value="quality">质量部门</option>
                                <option value="training">培训部门</option>
                                <option value="it">IT部门</option>
                                <option value="admin">行政部门</option>
                                <option value="strategy">战略部门</option>
                                <option value="innovation">创新部门</option>
                                <option value="investment">投资部门</option>
                                <option value="compliance">合规部门</option>
                                <option value="ip">知识产权部门</option>
                                <option value="events">会展部门</option>
                                <option value="supply">供应链部门</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="section">
                        <h4>识别方式</h4>
                        <div class="checkbox-group">
                            <label class="checkbox-item">
                                <input type="checkbox" name="cross-border-recognition" value="cross-border" checked>
                                <span>跨境应用识别</span>
                            </label>
                            <label class="checkbox-item">
                                <input type="checkbox" name="cross-border-recognition" value="dynamic">
                                <span>动态调整识别</span>
                            </label>
                            <label class="checkbox-item">
                                <input type="checkbox" name="cross-border-recognition" value="ai">
                                <span>AI识别</span>
                            </label>
                            <label class="checkbox-item">
                                <input type="checkbox" name="cross-border-recognition" value="protocol">
                                <span>协议特征识别</span>
                            </label>
                        </div>
                    </div>
                    
                    <div class="section">
                        <h4>状态设置</h4>
                        <div class="form-item">
                            <label class="radio-item">
                                <input type="checkbox" ${data && data.status ? 'checked' : ''}>
                                <span>启用该应用</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="panel-footer">
                    <button class="btn-cancel">取消</button>
                    <button class="btn-confirm">确定</button>
                </div>
            </div>
        `;
    },

    // 初始化表单值
    initFormValues: function(panel, data) {
        // 识别方式复选框事件
        const recognitionCheckboxes = panel.querySelectorAll('input[name="recognition-type"]');
        recognitionCheckboxes.forEach(checkbox => {
            const inputGroup = checkbox.parentElement.querySelector('.input-group');
            if (inputGroup) {
                // 初始化时根据复选框状态设置显示
                inputGroup.style.display = checkbox.checked ? 'block' : 'none';
            }
            
            checkbox.addEventListener('change', (e) => {
                const inputGroup = e.target.parentElement.querySelector('.input-group');
                if (inputGroup) {
                    inputGroup.style.display = e.target.checked ? 'block' : 'none';
                }
            });
        });

        // 跨境应用识别配置复选框事件
        const crossBorderCheckboxes = panel.querySelectorAll('input[name="recognition"]');
        crossBorderCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                console.log('识别配置变更:', e.target.value, e.target.checked);
            });
        });

        // 设置表单默认值
        if (data) {
            // 设置应用名称
            const nameInput = panel.querySelector('input[placeholder*="应用名称"], input[placeholder*="策略名称"]');
            if (nameInput && data.name) {
                nameInput.value = data.name;
            }

            // 设置应用描述/备注
            const descInput = panel.querySelector('input[placeholder*="应用描述"], input[placeholder*="备注"]');
            const descTextarea = panel.querySelector('textarea[placeholder*="应用描述"]');
            if (descInput && (data.description || data.note)) {
                descInput.value = data.description || data.note;
            }
            if (descTextarea && (data.description || data.note)) {
                descTextarea.value = data.description || data.note;
            }

            // 设置状态
            const statusCheckbox = panel.querySelector('input[type="checkbox"]');
            if (statusCheckbox) {
                statusCheckbox.checked = data.status || false;
            }

            // 设置识别方式复选框和对应的输入值
            if (data.recognitionTypes) {
                data.recognitionTypes.forEach(type => {
                    let checkbox;
                    if (type === '域名识别') {
                        checkbox = panel.querySelector('input[name="recognition-type"][value="domain"]');
                        if (checkbox && data.domain) {
                            checkbox.checked = true;
                            const inputGroup = checkbox.parentElement.querySelector('.input-group');
                            if (inputGroup) {
                                inputGroup.style.display = 'block';
                                const domainInput = inputGroup.querySelector('input');
                                if (domainInput) {
                                    domainInput.value = data.domain;
                                }
                            }
                        }
                    } else if (type === 'IP识别') {
                        checkbox = panel.querySelector('input[name="recognition-type"][value="ip"]');
                        if (checkbox && data.ip) {
                            checkbox.checked = true;
                            const inputGroup = checkbox.parentElement.querySelector('.input-group');
                            if (inputGroup) {
                                inputGroup.style.display = 'block';
                                const ipInput = inputGroup.querySelector('input');
                                if (ipInput) {
                                    ipInput.value = data.ip;
                                }
                            }
                        }
                    } else if (type === 'URL特征识别') {
                        checkbox = panel.querySelector('input[name="recognition-type"][value="url"]');
                        if (checkbox) {
                            checkbox.checked = true;
                        }
                    } else if (type === '协议特征识别') {
                        checkbox = panel.querySelector('input[name="recognition-type"][value="protocol"]');
                        if (checkbox) {
                            checkbox.checked = true;
                        }
                    }
                });
            }
        }
    },

    // 初始化跨境应用表单值
    initCrossBorderFormValues: function(panel, data) {
        // 设置表单默认值
        if (data) {
            // 设置应用名称
            const nameInput = panel.querySelector('input[placeholder*="应用名称"]');
            if (nameInput && data.name) {
                nameInput.value = data.name;
            }

            // 设置应用描述
            const descTextarea = panel.querySelector('textarea[placeholder*="应用描述"]');
            if (descTextarea && data.description) {
                descTextarea.value = data.description;
            }

            // 设置状态
            const statusCheckbox = panel.querySelector('input[type="checkbox"]');
            if (statusCheckbox) {
                statusCheckbox.checked = data.status || false;
            }
        }

        // 跨境应用识别配置复选框事件
        const crossBorderCheckboxes = panel.querySelectorAll('input[name="cross-border-recognition"]');
        crossBorderCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                console.log('跨境识别配置变更:', e.target.value, e.target.checked);
            });
        });
    },

    // 绑定面板事件
    bindPanelEvents: function(panel, isEdit = false, editIndex = -1, isCrossBorder = false) {
        const btnClose = panel.querySelector('.btn-close');
        const btnCancel = panel.querySelector('.btn-cancel');
        const closePanel = () => {
            panel.classList.remove('visible');
            setTimeout(() => {
                panel.remove();
            }, 300); // 等待动画完成
        };

        if (btnClose) btnClose.addEventListener('click', closePanel);
        if (btnCancel) btnCancel.addEventListener('click', closePanel);

        const btnConfirm = panel.querySelector('.btn-confirm');
        if (btnConfirm) {
            btnConfirm.addEventListener('click', () => {
                // 收集表单数据
                const formData = this.collectFormData(panel);
                console.log('表单数据:', formData);
                
                // 表单验证
                if (this.validateFormData(formData)) {
                    if (isEdit) {
                        // 编辑模式：更新现有应用
                        this.updateAppData(formData, editIndex, isCrossBorder);
                    } else {
                        // 新建模式：保存新应用
                        this.saveStrategyData(formData, isCrossBorder);
                    }
                    closePanel();
                }
            });
        }
    },

    // 更新应用数据
    updateAppData: function(formData, index, isCrossBorder = false) {
        // 创建更新的应用对象
        const updatedApp = {
            name: formData.name,
            scope: this.getScopeDisplayName(formData.scope),
            recognitionTypes: isCrossBorder ? formData.crossBorderTypes : formData.recognitionTypes,
            description: formData.description,
            status: formData.status
        };

        // 添加域名和IP值
        if (formData.domain) {
            updatedApp.domain = formData.domain;
        }
        if (formData.ip) {
            updatedApp.ip = formData.ip;
        }

        if (isCrossBorder) {
            // 更新跨境应用
            if (this.crossBorderApps[index]) {
                this.crossBorderApps[index] = updatedApp;
                this.renderCrossBorderAppsTable();
            }
        } else {
            // 更新内网应用
            if (this.internalApps[index]) {
                this.internalApps[index] = updatedApp;
                this.renderInternalAppsTable();
            }
        }
        
        console.log('应用更新成功:', updatedApp);
    },

    // 收集表单数据
    collectFormData: function(panel) {
        const formData = {};
        
        // 基本信息
        const nameInput = panel.querySelector('input[placeholder*="应用名称"], input[placeholder*="策略名称"]');
        if (nameInput) formData.name = nameInput.value.trim();
        
        const descInput = panel.querySelector('input[placeholder*="应用描述"], input[placeholder*="备注"]');
        const descTextarea = panel.querySelector('textarea[placeholder*="应用描述"]');
        if (descInput) formData.description = descInput.value.trim();
        if (descTextarea) formData.description = descTextarea.value.trim();
        
        const typeSelect = panel.querySelector('select');
        if (typeSelect) formData.scope = typeSelect.value;
        
        const statusCheckbox = panel.querySelector('input[type="checkbox"]');
        if (statusCheckbox) formData.status = statusCheckbox.checked;
        
        // 识别方式
        const recognitionTypes = [];
        const recognitionCheckboxes = panel.querySelectorAll('input[name="recognition-type"]:checked');
        recognitionCheckboxes.forEach(checkbox => {
            recognitionTypes.push(checkbox.parentElement.querySelector('span').textContent.trim());
        });
        formData.recognitionTypes = recognitionTypes;
        
        // 收集域名和IP值
        const domainCheckbox = panel.querySelector('input[name="recognition-type"][value="domain"]');
        if (domainCheckbox && domainCheckbox.checked) {
            const domainInput = domainCheckbox.parentElement.querySelector('.input-group input');
            if (domainInput) {
                formData.domain = domainInput.value.trim();
            }
        }
        
        const ipCheckbox = panel.querySelector('input[name="recognition-type"][value="ip"]');
        if (ipCheckbox && ipCheckbox.checked) {
            const ipInput = ipCheckbox.parentElement.querySelector('.input-group input');
            if (ipInput) {
                formData.ip = ipInput.value.trim();
            }
        }
        
        // 跨境应用识别配置
        const crossBorderTypes = [];
        const crossBorderCheckboxes = panel.querySelectorAll('input[name="cross-border-recognition"]:checked');
        crossBorderCheckboxes.forEach(checkbox => {
            crossBorderTypes.push(checkbox.parentElement.querySelector('span').textContent.trim());
        });
        formData.crossBorderTypes = crossBorderTypes;
        
        return formData;
    },

    // 验证表单数据
    validateFormData: function(formData) {
        if (!formData.name || formData.name.trim() === '') {
            alert('请输入应用名称');
            return false;
        }
        
        // 检查是否至少选择了一种识别方式
        if ((formData.recognitionTypes && formData.recognitionTypes.length === 0) && 
            (formData.crossBorderTypes && formData.crossBorderTypes.length === 0)) {
            alert('请至少选择一种识别方式');
            return false;
        }
        
        // 验证域名识别
        if (formData.recognitionTypes && formData.recognitionTypes.includes('域名识别')) {
            if (!formData.domain || formData.domain.trim() === '') {
                alert('请为域名识别输入域名');
                return false;
            }
        }
        
        // 验证IP识别
        if (formData.recognitionTypes && formData.recognitionTypes.includes('IP识别')) {
            if (!formData.ip || formData.ip.trim() === '') {
                alert('请为IP识别输入IP地址');
                return false;
            }
        }
        
        return true;
    },

    // 保存策略数据
    saveStrategyData: function(formData, isCrossBorder = false) {
        // 创建新的应用对象
        const newApp = {
            name: formData.name,
            scope: this.getScopeDisplayName(formData.scope),
            recognitionTypes: isCrossBorder ? formData.crossBorderTypes : formData.recognitionTypes,
            description: formData.description,
            status: formData.status
        };

        // 添加域名和IP值
        if (formData.domain) {
            newApp.domain = formData.domain;
        }
        if (formData.ip) {
            newApp.ip = formData.ip;
        }

        if (isCrossBorder) {
            // 保存到跨境应用列表
            this.crossBorderApps.unshift(newApp);
            // 重新计算分页
            this.crossBorderPagination.totalPages = Math.ceil(this.crossBorderApps.length / this.crossBorderPagination.pageSize);
            // 跳转到第一页
            this.crossBorderPagination.currentPage = 1;
            // 重新渲染
            this.renderCrossBorderAppsTable();
            this.renderCrossBorderPagination();
        } else {
            // 保存到内网应用列表
            this.internalApps.unshift(newApp);
            // 重新计算分页
            this.pagination.totalPages = Math.ceil(this.internalApps.length / this.pagination.pageSize);
            // 跳转到第一页
            this.pagination.currentPage = 1;
            // 重新渲染
            this.renderInternalAppsTable();
            this.renderPagination();
        }
        
        console.log('应用保存成功:', newApp);
    },

    // 获取生效范围的显示名称
    getScopeDisplayName: function(scopeValue) {
        const scopeMap = {
            'all': '全部用户',
            'dev': '研发部门',
            'test': '测试部门',
            'ops': '运维部门',
            'product': '产品部门',
            'design': '设计部门',
            'marketing': '市场部门',
            'sales': '销售部门',
            'hr': '人事部门',
            'finance': '财务部门',
            'legal': '法务部门',
            'security': '安全部门',
            'data': '数据分析部门',
            'project': '项目部门',
            'customer': '客服部门',
            'logistics': '物流部门',
            'procurement': '采购部门',
            'quality': '质量部门',
            'training': '培训部门',
            'it': 'IT部门',
            'admin': '行政部门',
            'strategy': '战略部门',
            'innovation': '创新部门',
            'investment': '投资部门',
            'compliance': '合规部门',
            'ip': '知识产权部门',
            'events': '会展部门',
            'supply': '供应链部门'
        };
        return scopeMap[scopeValue] || scopeValue;
    },

    // 搜索内网应用
    searchInternalApps: function(searchValue) {
        if (!searchValue) {
            // 如果搜索值为空，显示所有数据
            this.renderInternalAppsTable();
            this.renderPagination();
            return;
        }

        // 过滤匹配的应用
        const filteredApps = this.internalApps.filter(app => {
            return app.name.toLowerCase().includes(searchValue) ||
                   app.scope.toLowerCase().includes(searchValue) ||
                   app.description.toLowerCase().includes(searchValue) ||
                   app.recognitionTypes.some(type => type.toLowerCase().includes(searchValue));
        });

        // 更新分页数据
        this.pagination.currentPage = 1;
        this.pagination.totalPages = Math.ceil(filteredApps.length / this.pagination.pageSize);

        // 渲染过滤后的数据
        this.renderFilteredInternalAppsTable(filteredApps);
        this.renderPagination();
    },

    // 渲染过滤后的内网应用表格
    renderFilteredInternalAppsTable: function(filteredApps) {
        const tbody = document.getElementById('internalAppsTableBody');
        if (!tbody) return;

        const startIndex = (this.pagination.currentPage - 1) * this.pagination.pageSize;
        const endIndex = startIndex + this.pagination.pageSize;
        const currentPageData = filteredApps.slice(startIndex, endIndex);

        tbody.innerHTML = currentPageData.map((app, index) => {
            const recognitionTags = app.recognitionTypes.map(type => {
                let tagClass = 'success';
                if (type.includes('IP')) tagClass = 'info';
                if (type.includes('URL')) tagClass = 'warning';
                if (type.includes('协议')) tagClass = 'primary';
                
                return `<span class="tag ${tagClass}">${type}</span>`;
            }).join('');

            return `
                <tr>
                    <td><input type="checkbox" class="row-checkbox" data-index="${startIndex + index}"></td>
                    <td>${app.name}</td>
                    <td>${app.scope}</td>
                    <td class="config-tags">${recognitionTags}</td>
                    <td>${app.description}</td>
                    <td>
                        <label class="switch">
                            <input type="checkbox" ${app.status ? 'checked' : ''}>
                            <span class="slider round"></span>
                        </label>
                    </td>
                    <td>
                        <a href="#" class="link-edit" data-index="${startIndex + index}">编辑</a>
                        <a href="#" class="link-delete" data-index="${startIndex + index}">删除</a>
                    </td>
                </tr>
            `;
        }).join('');
    },

    // 搜索跨境应用
    searchCrossBorderApps: function(searchValue) {
        if (!searchValue) {
            // 如果搜索值为空，显示所有数据
            this.renderCrossBorderAppsTable();
            this.renderCrossBorderPagination();
            return;
        }

        // 过滤匹配的应用
        const filteredApps = this.crossBorderApps.filter(app => {
            return app.name.toLowerCase().includes(searchValue) ||
                   app.scope.toLowerCase().includes(searchValue) ||
                   app.description.toLowerCase().includes(searchValue) ||
                   app.recognitionTypes.some(type => type.toLowerCase().includes(searchValue));
        });

        // 更新分页数据
        this.crossBorderPagination.currentPage = 1;
        this.crossBorderPagination.totalPages = Math.ceil(filteredApps.length / this.crossBorderPagination.pageSize);

        // 渲染过滤后的数据
        this.renderFilteredCrossBorderAppsTable(filteredApps);
        this.renderCrossBorderPagination();
    },

    // 渲染过滤后的跨境应用表格
    renderFilteredCrossBorderAppsTable: function(filteredApps) {
        const tbody = document.getElementById('cross-borderAppsTableBody');
        if (!tbody) return;

        const startIndex = (this.crossBorderPagination.currentPage - 1) * this.crossBorderPagination.pageSize;
        const endIndex = startIndex + this.crossBorderPagination.pageSize;
        const currentPageData = filteredApps.slice(startIndex, endIndex);

        tbody.innerHTML = currentPageData.map((app, index) => {
            const recognitionTags = app.recognitionTypes.map(type => {
                let tagClass = 'success';
                if (type.includes('跨境应用')) tagClass = 'success';
                if (type.includes('动态调整')) tagClass = 'info';
                if (type.includes('AI识别')) tagClass = 'warning';
                if (type.includes('协议')) tagClass = 'primary';
                if (type.includes('域名')) tagClass = 'success';
                if (type.includes('IP')) tagClass = 'info';
                if (type.includes('URL')) tagClass = 'warning';
                
                return `<span class="tag ${tagClass}">${type}</span>`;
            }).join('');

            return `
                <tr>
                    <td><input type="checkbox" class="row-checkbox" data-index="${startIndex + index}"></td>
                    <td>${app.name}</td>
                    <td>${app.scope}</td>
                    <td class="config-tags">${recognitionTags}</td>
                    <td>${app.description}</td>
                    <td>
                        <label class="switch">
                            <input type="checkbox" ${app.status ? 'checked' : ''}>
                            <span class="slider round"></span>
                        </label>
                    </td>
                    <td>
                        <a href="#" class="link-edit" data-index="${startIndex + index}">编辑</a>
                        <a href="#" class="link-delete" data-index="${startIndex + index}">删除</a>
                    </td>
                </tr>
            `;
        }).join('');

        // 如果没有搜索结果，显示提示信息
        if (currentPageData.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="7" style="text-align: center; padding: 40px; color: #999;">
                        没有找到匹配的应用
                    </td>
                </tr>
            `;
        }
    },

    // 确保样式只添加一次
    ensureStyles: function() {
        if (!document.getElementById('app-recognition-styles')) {
            const styleElement = document.createElement('style');
            styleElement.id = 'app-recognition-styles';
            styleElement.textContent = this.panelStyles;
            document.head.appendChild(styleElement);
        }
    },

    // 显示消息提示
    showMessage: function(msg) {
        let tip = document.getElementById('app-recognition-tip');
        if (!tip) {
            tip = document.createElement('div');
            tip.id = 'app-recognition-tip';
            tip.style.cssText = 'position:fixed;top:32px;right:32px;z-index:99999;background:rgba(0,0,0,0.75);color:#fff;padding:10px 24px;border-radius:4px;font-size:16px;box-shadow:0 2px 8px rgba(0,0,0,0.15);transition:all .3s;opacity:0;pointer-events:none;';
            document.body.appendChild(tip);
        }
        tip.textContent = msg;
        tip.style.opacity = '1';
        setTimeout(() => { tip.style.opacity = '0'; }, 1800);
    },

    // 显示新建内网应用面板
    showNewInternalAppPanel: function() {
        console.log('显示新建内网应用面板');
        
        // 确保样式只添加一次
        this.ensureStyles();
        
        // 创建遮罩层和面板容器
        const container = document.createElement('div');
        container.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 9998; pointer-events: none;';
        
        const overlay = document.createElement('div');
        overlay.className = 'app-recognition-overlay';
        overlay.style.pointerEvents = 'auto';
        
        const panel = document.createElement('div');
        panel.className = 'app-recognition-panel';
        panel.style.pointerEvents = 'auto';
        panel.innerHTML = `
            <div class="panel-header">
                <h3>新建内网应用</h3>
                <button class="btn-close">×</button>
            </div>
            
            <div class="panel-body">
                <!-- 基本信息 -->
                <div class="section">
                    <h4>基本信息</h4>
                    <div class="form-item">
                        <label class="required">应用名称</label>
                        <input type="text" id="newAppName" class="form-input" placeholder="请输入应用名称">
                    </div>
                    
                    <div class="form-item">
                        <label>应用描述</label>
                        <textarea id="newAppDescription" class="form-textarea" placeholder="请输入应用描述"></textarea>
                    </div>
                    
                    <div class="form-item">
                        <label>状态</label>
                        <label class="switch">
                            <input type="checkbox" id="newAppStatus" checked>
                            <span class="slider round"></span>
                        </label>
                    </div>
                </div>

                <!-- 生效范围 -->
                <div class="section">
                    <h4>生效范围</h4>
                    <div class="form-item">
                        <label>生效范围</label>
                        <select id="newAppScope" class="form-select">
                            <option value="all">全部用户</option>
                            <option value="dev">研发部门</option>
                            <option value="test">测试部门</option>
                            <option value="ops">运维部门</option>
                            <option value="product">产品部门</option>
                            <option value="design">设计部门</option>
                            <option value="marketing">市场部门</option>
                            <option value="sales">销售部门</option>
                            <option value="hr">人事部门</option>
                            <option value="finance">财务部门</option>
                            <option value="legal">法务部门</option>
                            <option value="security">安全部门</option>
                            <option value="data">数据分析部门</option>
                            <option value="project">项目部门</option>
                            <option value="customer">客服部门</option>
                            <option value="logistics">物流部门</option>
                            <option value="procurement">采购部门</option>
                            <option value="quality">质量部门</option>
                            <option value="training">培训部门</option>
                            <option value="it">IT部门</option>
                            <option value="admin">行政部门</option>
                            <option value="strategy">战略部门</option>
                            <option value="innovation">创新部门</option>
                            <option value="investment">投资部门</option>
                            <option value="compliance">合规部门</option>
                            <option value="ip">知识产权部门</option>
                            <option value="events">会展部门</option>
                            <option value="supply">供应链部门</option>
                        </select>
                    </div>
                </div>

                <!-- 识别方式 -->
                <div class="section">
                    <h4>识别方式</h4>
                    <div class="form-item">
                        <label class="required">识别方式配置</label>
                        <div class="checkbox-group">
                            <label class="checkbox-item">
                                <input type="checkbox" id="newRecognitionDomain" name="recognition-type" value="domain">
                                <span>域名识别</span>
                                <div class="input-group">
                                    <input type="text" class="form-input" placeholder="请输入域名，如：example.com">
                                </div>
                            </label>
                            <label class="checkbox-item">
                                <input type="checkbox" id="newRecognitionIP" name="recognition-type" value="ip">
                                <span>IP识别</span>
                                <div class="input-group">
                                    <input type="text" class="form-input" placeholder="请输入IP地址，如：192.168.1.1">
                                </div>
                            </label>
                            <label class="checkbox-item">
                                <input type="checkbox" id="newRecognitionURL" name="recognition-type" value="url">
                                <span>URL特征识别</span>
                            </label>
                            <label class="checkbox-item">
                                <input type="checkbox" id="newRecognitionProtocol" name="recognition-type" value="protocol">
                                <span>协议特征识别</span>
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

        // 绑定识别方式复选框事件
        const recognitionCheckboxes = panel.querySelectorAll('input[name="recognition-type"]');
        recognitionCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const inputGroup = e.target.parentElement.querySelector('.input-group');
                if (inputGroup) {
                    if (e.target.checked) {
                        inputGroup.classList.add('show');
                    } else {
                        inputGroup.classList.remove('show');
                    }
                }
            });
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
                const name = panel.querySelector('#newAppName').value.trim();
                const description = panel.querySelector('#newAppDescription').value.trim();
                const status = panel.querySelector('#newAppStatus').checked;
                const scope = panel.querySelector('#newAppScope').value;
                
                // 识别方式
                const recognitionTypes = [];
                const domainCheckbox = panel.querySelector('#newRecognitionDomain');
                const ipCheckbox = panel.querySelector('#newRecognitionIP');
                const urlCheckbox = panel.querySelector('#newRecognitionURL');
                const protocolCheckbox = panel.querySelector('#newRecognitionProtocol');
                
                if (domainCheckbox && domainCheckbox.checked) {
                    recognitionTypes.push('域名识别');
                }
                if (ipCheckbox && ipCheckbox.checked) {
                    recognitionTypes.push('IP识别');
                }
                if (urlCheckbox && urlCheckbox.checked) {
                    recognitionTypes.push('URL特征识别');
                }
                if (protocolCheckbox && protocolCheckbox.checked) {
                    recognitionTypes.push('协议特征识别');
                }
                
                // 收集域名和IP值
                let domain = '';
                let ip = '';
                if (domainCheckbox && domainCheckbox.checked) {
                    const domainInput = domainCheckbox.parentElement.querySelector('.input-group input');
                    if (domainInput) {
                        domain = domainInput.value.trim();
                    }
                }
                if (ipCheckbox && ipCheckbox.checked) {
                    const ipInput = ipCheckbox.parentElement.querySelector('.input-group input');
                    if (ipInput) {
                        ip = ipInput.value.trim();
                    }
                }
                
                // 校验
                if (!name) {
                    this.showMessage('应用名称不能为空');
                    return;
                }
                if (recognitionTypes.length === 0) {
                    this.showMessage('请至少选择一种识别方式');
                    return;
                }
                if (domainCheckbox && domainCheckbox.checked && !domain) {
                    this.showMessage('请为域名识别输入域名');
                    return;
                }
                if (ipCheckbox && ipCheckbox.checked && !ip) {
                    this.showMessage('请为IP识别输入IP地址');
                    return;
                }
                
                // 创建新应用
                const newApp = {
                    name,
                    scope: this.getScopeDisplayName(scope),
                    recognitionTypes,
                    description,
                    status
                };
                
                if (domain) newApp.domain = domain;
                if (ip) newApp.ip = ip;
                
                // 保存到内网应用列表
                this.internalApps.unshift(newApp);
                this.pagination.totalPages = Math.ceil(this.internalApps.length / this.pagination.pageSize);
                this.pagination.currentPage = 1;
                this.renderInternalAppsTable();
                this.renderPagination();
                
                this.showMessage('新建成功');
                closePanel();
            });
        }
    },

    // 显示新建跨境应用面板
    showNewCrossBorderAppPanel: function() {
        console.log('显示新建跨境应用面板');
        
        // 确保样式只添加一次
        this.ensureStyles();
        
        // 创建遮罩层和面板容器
        const container = document.createElement('div');
        container.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 9998; pointer-events: none;';
        
        const overlay = document.createElement('div');
        overlay.className = 'app-recognition-overlay';
        overlay.style.pointerEvents = 'auto';
        
        const panel = document.createElement('div');
        panel.className = 'app-recognition-panel';
        panel.style.pointerEvents = 'auto';
        panel.innerHTML = `
            <div class="panel-header">
                <h3>新建跨境应用</h3>
                <button class="btn-close">×</button>
            </div>
            
            <div class="panel-body">
                <!-- 基本信息 -->
                <div class="section">
                    <h4>基本信息</h4>
                    <div class="form-item">
                        <label class="required">策略名称</label>
                        <input type="text" id="newCrossBorderName" class="form-input" placeholder="请输入策略名称">
                    </div>
                    
                    <div class="form-item">
                        <label>备注</label>
                        <textarea id="newCrossBorderDescription" class="form-textarea" placeholder="请输入备注信息"></textarea>
                    </div>
                    
                    <div class="form-item">
                        <label>状态</label>
                        <label class="switch">
                            <input type="checkbox" id="newCrossBorderStatus" checked>
                            <span class="slider round"></span>
                        </label>
                    </div>
                </div>

                <!-- 生效范围 -->
                <div class="section">
                    <h4>生效范围</h4>
                    <div class="form-item">
                        <label>生效范围</label>
                        <select id="newCrossBorderScope" class="form-select">
                            <option value="all">全部用户</option>
                            <option value="dev">研发部门</option>
                            <option value="test">测试部门</option>
                            <option value="ops">运维部门</option>
                            <option value="product">产品部门</option>
                            <option value="design">设计部门</option>
                            <option value="marketing">市场部门</option>
                            <option value="sales">销售部门</option>
                            <option value="hr">人事部门</option>
                            <option value="finance">财务部门</option>
                            <option value="legal">法务部门</option>
                            <option value="security">安全部门</option>
                            <option value="data">数据分析部门</option>
                            <option value="project">项目部门</option>
                            <option value="customer">客服部门</option>
                            <option value="logistics">物流部门</option>
                            <option value="procurement">采购部门</option>
                            <option value="quality">质量部门</option>
                            <option value="training">培训部门</option>
                            <option value="it">IT部门</option>
                            <option value="admin">行政部门</option>
                            <option value="strategy">战略部门</option>
                            <option value="innovation">创新部门</option>
                            <option value="investment">投资部门</option>
                            <option value="compliance">合规部门</option>
                            <option value="ip">知识产权部门</option>
                            <option value="events">会展部门</option>
                            <option value="supply">供应链部门</option>
                        </select>
                    </div>
                </div>

                <!-- 识别配置 -->
                <div class="section">
                    <h4>识别配置</h4>
                    <div class="form-item">
                        <label class="required">识别配置</label>
                        <div class="checkbox-group">
                            <label class="checkbox-item">
                                <input type="checkbox" id="newCrossBorderApp" name="cross-border-recognition" value="cross-border-app">
                                <span>跨境应用识别</span>
                            </label>
                            <label class="checkbox-item">
                                <input type="checkbox" id="newCrossBorderDynamic" name="cross-border-recognition" value="dynamic-adjustment">
                                <span>动态调整识别</span>
                            </label>
                            <label class="checkbox-item">
                                <input type="checkbox" id="newCrossBorderAI" name="cross-border-recognition" value="ai-recognition">
                                <span>AI智能识别</span>
                            </label>
                            <label class="checkbox-item">
                                <input type="checkbox" id="newCrossBorderProtocol" name="cross-border-recognition" value="protocol-recognition">
                                <span>协议特征识别</span>
                            </label>
                            <label class="checkbox-item">
                                <input type="checkbox" id="newCrossBorderDomain" name="cross-border-recognition" value="domain-recognition">
                                <span>域名特征识别</span>
                            </label>
                            <label class="checkbox-item">
                                <input type="checkbox" id="newCrossBorderIP" name="cross-border-recognition" value="ip-recognition">
                                <span>IP地址识别</span>
                            </label>
                            <label class="checkbox-item">
                                <input type="checkbox" id="newCrossBorderURL" name="cross-border-recognition" value="url-recognition">
                                <span>URL特征识别</span>
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
                const name = panel.querySelector('#newCrossBorderName').value.trim();
                const description = panel.querySelector('#newCrossBorderDescription').value.trim();
                const status = panel.querySelector('#newCrossBorderStatus').checked;
                const scope = panel.querySelector('#newCrossBorderScope').value;
                
                // 识别配置
                const recognitionTypes = [];
                const checkboxes = panel.querySelectorAll('input[name="cross-border-recognition"]:checked');
                checkboxes.forEach(checkbox => {
                    const span = checkbox.parentElement.querySelector('span');
                    if (span) {
                        recognitionTypes.push(span.textContent.trim());
                    }
                });
                
                // 校验
                if (!name) {
                    this.showMessage('策略名称不能为空');
                    return;
                }
                if (recognitionTypes.length === 0) {
                    this.showMessage('请至少选择一种识别配置');
                    return;
                }
                
                // 创建新应用
                const newApp = {
                    name,
                    scope: this.getScopeDisplayName(scope),
                    recognitionTypes,
                    description,
                    status
                };
                
                // 保存到跨境应用列表
                this.crossBorderApps.unshift(newApp);
                this.crossBorderPagination.totalPages = Math.ceil(this.crossBorderApps.length / this.crossBorderPagination.pageSize);
                this.crossBorderPagination.currentPage = 1;
                this.renderCrossBorderAppsTable();
                this.renderCrossBorderPagination();
                
                this.showMessage('新建成功');
                closePanel();
            });
        }
    },

    // 显示编辑内网应用面板
    showEditInternalAppPanel: function(appData, index) {
        console.log('显示编辑内网应用面板', appData);
        
        // 确保样式只添加一次
        this.ensureStyles();
        
        // 创建遮罩层和面板容器
        const container = document.createElement('div');
        container.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 9998; pointer-events: none;';
        
        const overlay = document.createElement('div');
        overlay.className = 'app-recognition-overlay';
        overlay.style.pointerEvents = 'auto';
        
        const panel = document.createElement('div');
        panel.className = 'app-recognition-panel';
        panel.style.pointerEvents = 'auto';
        panel.innerHTML = `
            <div class="panel-header">
                <h3>编辑内网应用</h3>
                <button class="btn-close">×</button>
            </div>
            
            <div class="panel-body">
                <!-- 基本信息 -->
                <div class="section">
                    <h4>基本信息</h4>
                    <div class="form-item">
                        <label class="required">应用名称</label>
                        <input type="text" id="editAppName" class="form-input" placeholder="请输入应用名称" value="${appData.name || ''}">
                    </div>
                    
                    <div class="form-item">
                        <label>应用描述</label>
                        <textarea id="editAppDescription" class="form-textarea" placeholder="请输入应用描述">${appData.description || ''}</textarea>
                    </div>
                    
                    <div class="form-item">
                        <label>状态</label>
                        <label class="switch">
                            <input type="checkbox" id="editAppStatus" ${appData.status ? 'checked' : ''}>
                            <span class="slider round"></span>
                        </label>
                    </div>
                </div>

                <!-- 生效范围 -->
                <div class="section">
                    <h4>生效范围</h4>
                    <div class="form-item">
                        <label>生效范围</label>
                        <select id="editAppScope" class="form-select">
                            <option value="all" ${appData.scope === '全部用户' ? 'selected' : ''}>全部用户</option>
                            <option value="dev" ${appData.scope === '研发部门' ? 'selected' : ''}>研发部门</option>
                            <option value="test" ${appData.scope === '测试部门' ? 'selected' : ''}>测试部门</option>
                            <option value="ops" ${appData.scope === '运维部门' ? 'selected' : ''}>运维部门</option>
                            <option value="product" ${appData.scope === '产品部门' ? 'selected' : ''}>产品部门</option>
                            <option value="design" ${appData.scope === '设计部门' ? 'selected' : ''}>设计部门</option>
                            <option value="marketing" ${appData.scope === '市场部门' ? 'selected' : ''}>市场部门</option>
                            <option value="sales" ${appData.scope === '销售部门' ? 'selected' : ''}>销售部门</option>
                            <option value="hr" ${appData.scope === '人事部门' ? 'selected' : ''}>人事部门</option>
                            <option value="finance" ${appData.scope === '财务部门' ? 'selected' : ''}>财务部门</option>
                            <option value="legal" ${appData.scope === '法务部门' ? 'selected' : ''}>法务部门</option>
                            <option value="security" ${appData.scope === '安全部门' ? 'selected' : ''}>安全部门</option>
                            <option value="data" ${appData.scope === '数据分析部门' ? 'selected' : ''}>数据分析部门</option>
                            <option value="project" ${appData.scope === '项目部门' ? 'selected' : ''}>项目部门</option>
                            <option value="customer" ${appData.scope === '客服部门' ? 'selected' : ''}>客服部门</option>
                            <option value="logistics" ${appData.scope === '物流部门' ? 'selected' : ''}>物流部门</option>
                            <option value="procurement" ${appData.scope === '采购部门' ? 'selected' : ''}>采购部门</option>
                            <option value="quality" ${appData.scope === '质量部门' ? 'selected' : ''}>质量部门</option>
                            <option value="training" ${appData.scope === '培训部门' ? 'selected' : ''}>培训部门</option>
                            <option value="it" ${appData.scope === 'IT部门' ? 'selected' : ''}>IT部门</option>
                            <option value="admin" ${appData.scope === '行政部门' ? 'selected' : ''}>行政部门</option>
                            <option value="strategy" ${appData.scope === '战略部门' ? 'selected' : ''}>战略部门</option>
                            <option value="innovation" ${appData.scope === '创新部门' ? 'selected' : ''}>创新部门</option>
                            <option value="investment" ${appData.scope === '投资部门' ? 'selected' : ''}>投资部门</option>
                            <option value="compliance" ${appData.scope === '合规部门' ? 'selected' : ''}>合规部门</option>
                            <option value="ip" ${appData.scope === '知识产权部门' ? 'selected' : ''}>知识产权部门</option>
                            <option value="events" ${appData.scope === '会展部门' ? 'selected' : ''}>会展部门</option>
                            <option value="supply" ${appData.scope === '供应链部门' ? 'selected' : ''}>供应链部门</option>
                        </select>
                    </div>
                </div>

                <!-- 识别方式 -->
                <div class="section">
                    <h4>识别方式</h4>
                    <div class="form-item">
                        <label class="required">识别方式配置</label>
                        <div class="checkbox-group">
                            <label class="checkbox-item">
                                <input type="checkbox" id="editRecognitionDomain" name="recognition-type" value="domain" ${appData.recognitionTypes && appData.recognitionTypes.includes('域名识别') ? 'checked' : ''}>
                                <span>域名识别</span>
                                <div class="input-group ${appData.recognitionTypes && appData.recognitionTypes.includes('域名识别') ? 'show' : ''}">
                                    <input type="text" class="form-input" placeholder="请输入域名，如：example.com" value="${appData.domain || ''}">
                                </div>
                            </label>
                            <label class="checkbox-item">
                                <input type="checkbox" id="editRecognitionIP" name="recognition-type" value="ip" ${appData.recognitionTypes && appData.recognitionTypes.includes('IP识别') ? 'checked' : ''}>
                                <span>IP识别</span>
                                <div class="input-group ${appData.recognitionTypes && appData.recognitionTypes.includes('IP识别') ? 'show' : ''}">
                                    <input type="text" class="form-input" placeholder="请输入IP地址，如：192.168.1.1" value="${appData.ip || ''}">
                                </div>
                            </label>
                            <label class="checkbox-item">
                                <input type="checkbox" id="editRecognitionURL" name="recognition-type" value="url" ${appData.recognitionTypes && appData.recognitionTypes.includes('URL特征识别') ? 'checked' : ''}>
                                <span>URL特征识别</span>
                            </label>
                            <label class="checkbox-item">
                                <input type="checkbox" id="editRecognitionProtocol" name="recognition-type" value="protocol" ${appData.recognitionTypes && appData.recognitionTypes.includes('协议特征识别') ? 'checked' : ''}>
                                <span>协议特征识别</span>
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

        // 绑定识别方式复选框事件
        const recognitionCheckboxes = panel.querySelectorAll('input[name="recognition-type"]');
        recognitionCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const inputGroup = e.target.parentElement.querySelector('.input-group');
                if (inputGroup) {
                    if (e.target.checked) {
                        inputGroup.classList.add('show');
                    } else {
                        inputGroup.classList.remove('show');
                    }
                }
            });
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
                const name = panel.querySelector('#editAppName').value.trim();
                const description = panel.querySelector('#editAppDescription').value.trim();
                const status = panel.querySelector('#editAppStatus').checked;
                const scope = panel.querySelector('#editAppScope').value;
                
                // 识别方式
                const recognitionTypes = [];
                const domainCheckbox = panel.querySelector('#editRecognitionDomain');
                const ipCheckbox = panel.querySelector('#editRecognitionIP');
                const urlCheckbox = panel.querySelector('#editRecognitionURL');
                const protocolCheckbox = panel.querySelector('#editRecognitionProtocol');
                
                if (domainCheckbox && domainCheckbox.checked) {
                    recognitionTypes.push('域名识别');
                }
                if (ipCheckbox && ipCheckbox.checked) {
                    recognitionTypes.push('IP识别');
                }
                if (urlCheckbox && urlCheckbox.checked) {
                    recognitionTypes.push('URL特征识别');
                }
                if (protocolCheckbox && protocolCheckbox.checked) {
                    recognitionTypes.push('协议特征识别');
                }
                
                // 收集域名和IP值
                let domain = '';
                let ip = '';
                if (domainCheckbox && domainCheckbox.checked) {
                    const domainInput = domainCheckbox.parentElement.querySelector('.input-group input');
                    if (domainInput) {
                        domain = domainInput.value.trim();
                    }
                }
                if (ipCheckbox && ipCheckbox.checked) {
                    const ipInput = ipCheckbox.parentElement.querySelector('.input-group input');
                    if (ipInput) {
                        ip = ipInput.value.trim();
                    }
                }
                
                // 校验
                if (!name) {
                    this.showMessage('应用名称不能为空');
                    return;
                }
                if (recognitionTypes.length === 0) {
                    this.showMessage('请至少选择一种识别方式');
                    return;
                }
                if (domainCheckbox && domainCheckbox.checked && !domain) {
                    this.showMessage('请为域名识别输入域名');
                    return;
                }
                if (ipCheckbox && ipCheckbox.checked && !ip) {
                    this.showMessage('请为IP识别输入IP地址');
                    return;
                }
                
                // 更新应用数据
                const updatedApp = {
                    name,
                    scope: this.getScopeDisplayName(scope),
                    recognitionTypes,
                    description,
                    status
                };
                
                if (domain) updatedApp.domain = domain;
                if (ip) updatedApp.ip = ip;
                
                // 更新内网应用列表
                this.internalApps[index] = updatedApp;
                this.renderInternalAppsTable();
                
                this.showMessage('编辑成功');
                closePanel();
            });
        }
    },

    // 显示编辑跨境应用面板
    showEditCrossBorderAppPanel: function(appData, index) {
        console.log('显示编辑跨境应用面板', appData);
        
        // 确保样式只添加一次
        this.ensureStyles();
        
        // 创建遮罩层和面板容器
        const container = document.createElement('div');
        container.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 9998; pointer-events: none;';
        
        const overlay = document.createElement('div');
        overlay.className = 'app-recognition-overlay';
        overlay.style.pointerEvents = 'auto';
        
        const panel = document.createElement('div');
        panel.className = 'app-recognition-panel';
        panel.style.pointerEvents = 'auto';
        panel.innerHTML = `
            <div class="panel-header">
                <h3>编辑跨境应用</h3>
                <button class="btn-close">×</button>
            </div>
            
            <div class="panel-body">
                <!-- 基本信息 -->
                <div class="section">
                    <h4>基本信息</h4>
                    <div class="form-item">
                        <label class="required">策略名称</label>
                        <input type="text" id="editCrossBorderName" class="form-input" placeholder="请输入策略名称" value="${appData.name || ''}">
                    </div>
                    
                    <div class="form-item">
                        <label>备注</label>
                        <textarea id="editCrossBorderDescription" class="form-textarea" placeholder="请输入备注信息">${appData.description || ''}</textarea>
                    </div>
                    
                    <div class="form-item">
                        <label>状态</label>
                        <label class="switch">
                            <input type="checkbox" id="editCrossBorderStatus" ${appData.status ? 'checked' : ''}>
                            <span class="slider round"></span>
                        </label>
                    </div>
                </div>

                <!-- 生效范围 -->
                <div class="section">
                    <h4>生效范围</h4>
                    <div class="form-item">
                        <label>生效范围</label>
                        <select id="editCrossBorderScope" class="form-select">
                            <option value="all" ${appData.scope === '全部用户' ? 'selected' : ''}>全部用户</option>
                            <option value="dev" ${appData.scope === '研发部门' ? 'selected' : ''}>研发部门</option>
                            <option value="test" ${appData.scope === '测试部门' ? 'selected' : ''}>测试部门</option>
                            <option value="ops" ${appData.scope === '运维部门' ? 'selected' : ''}>运维部门</option>
                            <option value="product" ${appData.scope === '产品部门' ? 'selected' : ''}>产品部门</option>
                            <option value="design" ${appData.scope === '设计部门' ? 'selected' : ''}>设计部门</option>
                            <option value="marketing" ${appData.scope === '市场部门' ? 'selected' : ''}>市场部门</option>
                            <option value="sales" ${appData.scope === '销售部门' ? 'selected' : ''}>销售部门</option>
                            <option value="hr" ${appData.scope === '人事部门' ? 'selected' : ''}>人事部门</option>
                            <option value="finance" ${appData.scope === '财务部门' ? 'selected' : ''}>财务部门</option>
                            <option value="legal" ${appData.scope === '法务部门' ? 'selected' : ''}>法务部门</option>
                            <option value="security" ${appData.scope === '安全部门' ? 'selected' : ''}>安全部门</option>
                            <option value="data" ${appData.scope === '数据分析部门' ? 'selected' : ''}>数据分析部门</option>
                            <option value="project" ${appData.scope === '项目部门' ? 'selected' : ''}>项目部门</option>
                            <option value="customer" ${appData.scope === '客服部门' ? 'selected' : ''}>客服部门</option>
                            <option value="logistics" ${appData.scope === '物流部门' ? 'selected' : ''}>物流部门</option>
                            <option value="procurement" ${appData.scope === '采购部门' ? 'selected' : ''}>采购部门</option>
                            <option value="quality" ${appData.scope === '质量部门' ? 'selected' : ''}>质量部门</option>
                            <option value="training" ${appData.scope === '培训部门' ? 'selected' : ''}>培训部门</option>
                            <option value="it" ${appData.scope === 'IT部门' ? 'selected' : ''}>IT部门</option>
                            <option value="admin" ${appData.scope === '行政部门' ? 'selected' : ''}>行政部门</option>
                            <option value="strategy" ${appData.scope === '战略部门' ? 'selected' : ''}>战略部门</option>
                            <option value="innovation" ${appData.scope === '创新部门' ? 'selected' : ''}>创新部门</option>
                            <option value="investment" ${appData.scope === '投资部门' ? 'selected' : ''}>投资部门</option>
                            <option value="compliance" ${appData.scope === '合规部门' ? 'selected' : ''}>合规部门</option>
                            <option value="ip" ${appData.scope === '知识产权部门' ? 'selected' : ''}>知识产权部门</option>
                            <option value="events" ${appData.scope === '会展部门' ? 'selected' : ''}>会展部门</option>
                            <option value="supply" ${appData.scope === '供应链部门' ? 'selected' : ''}>供应链部门</option>
                        </select>
                    </div>
                </div>

                <!-- 识别配置 -->
                <div class="section">
                    <h4>识别配置</h4>
                    <div class="form-item">
                        <label class="required">识别配置</label>
                        <div class="checkbox-group">
                            <label class="checkbox-item">
                                <input type="checkbox" id="editCrossBorderApp" name="cross-border-recognition" value="cross-border-app" ${appData.recognitionTypes && appData.recognitionTypes.includes('跨境应用识别') ? 'checked' : ''}>
                                <span>跨境应用识别</span>
                            </label>
                            <label class="checkbox-item">
                                <input type="checkbox" id="editCrossBorderDynamic" name="cross-border-recognition" value="dynamic-adjustment" ${appData.recognitionTypes && appData.recognitionTypes.includes('动态调整识别') ? 'checked' : ''}>
                                <span>动态调整识别</span>
                            </label>
                            <label class="checkbox-item">
                                <input type="checkbox" id="editCrossBorderAI" name="cross-border-recognition" value="ai-recognition" ${appData.recognitionTypes && appData.recognitionTypes.includes('AI智能识别') ? 'checked' : ''}>
                                <span>AI智能识别</span>
                            </label>
                            <label class="checkbox-item">
                                <input type="checkbox" id="editCrossBorderProtocol" name="cross-border-recognition" value="protocol-recognition" ${appData.recognitionTypes && appData.recognitionTypes.includes('协议特征识别') ? 'checked' : ''}>
                                <span>协议特征识别</span>
                            </label>
                            <label class="checkbox-item">
                                <input type="checkbox" id="editCrossBorderDomain" name="cross-border-recognition" value="domain-recognition" ${appData.recognitionTypes && appData.recognitionTypes.includes('域名特征识别') ? 'checked' : ''}>
                                <span>域名特征识别</span>
                            </label>
                            <label class="checkbox-item">
                                <input type="checkbox" id="editCrossBorderIP" name="cross-border-recognition" value="ip-recognition" ${appData.recognitionTypes && appData.recognitionTypes.includes('IP地址识别') ? 'checked' : ''}>
                                <span>IP地址识别</span>
                            </label>
                            <label class="checkbox-item">
                                <input type="checkbox" id="editCrossBorderURL" name="cross-border-recognition" value="url-recognition" ${appData.recognitionTypes && appData.recognitionTypes.includes('URL特征识别') ? 'checked' : ''}>
                                <span>URL特征识别</span>
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
                const name = panel.querySelector('#editCrossBorderName').value.trim();
                const description = panel.querySelector('#editCrossBorderDescription').value.trim();
                const status = panel.querySelector('#editCrossBorderStatus').checked;
                const scope = panel.querySelector('#editCrossBorderScope').value;
                
                // 识别配置
                const recognitionTypes = [];
                const checkboxes = panel.querySelectorAll('input[name="cross-border-recognition"]:checked');
                checkboxes.forEach(checkbox => {
                    const span = checkbox.parentElement.querySelector('span');
                    if (span) {
                        recognitionTypes.push(span.textContent.trim());
                    }
                });
                
                // 校验
                if (!name) {
                    this.showMessage('策略名称不能为空');
                    return;
                }
                if (recognitionTypes.length === 0) {
                    this.showMessage('请至少选择一种识别配置');
                    return;
                }
                
                // 更新应用数据
                const updatedApp = {
                    name,
                    scope: this.getScopeDisplayName(scope),
                    recognitionTypes,
                    description,
                    status
                };
                
                // 更新跨境应用列表
                this.crossBorderApps[index] = updatedApp;
                this.renderCrossBorderAppsTable();
                
                this.showMessage('编辑成功');
                closePanel();
            });
        }
    },
}; 
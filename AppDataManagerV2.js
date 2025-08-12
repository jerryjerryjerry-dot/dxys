// 应用数据管理器 V2 - 完整的数据持久化和管理系统
window.AppDataManagerV2 = {
    // 数据库实例
    db: null,

    // 内存缓存
    cache: {
        internalApps: new Map(),
        crossBorderApps: new Map(),
        recognitionStrategies: new Map(),
        coloringStrategies: new Map(),
        builtinApps: new Map(),
        customApps: new Map(),
        watermarkConfigs: new Map(),
        watermarkRecords: new Map(),
        watermarkAnalysis: new Map(),
        uploadedFiles: new Map(),
        departments: new Map(),
        devices: new Map(),
        apiKeys: new Map(),
        userLoginLogs: new Map(),
        passwordResets: new Map()
    },

    // 初始化状态
    initialized: false,

    // 事件监听器
    eventListeners: {
        internalApps: [],
        crossBorderApps: [],
        recognitionStrategies: [],
        coloringStrategies: [],
        builtinApps: [],
        customApps: [],
        watermarkConfigs: [],
        watermarkRecords: [],
        watermarkAnalysis: [],
        uploadedFiles: [],
        departments: [],
        devices: [],
        apiKeys: [],
        userLoginLogs: [],
        passwordResets: []
    },

    // ===== 数据库初始化 =====
    async init() {
        if (this.initialized) return;

        try {
            console.log('🚀 初始化AppDataManagerV2...');

            // 检查Dexie是否可用
            if (typeof Dexie === 'undefined') {
                throw new Error('Dexie.js 未加载，请检查CDN连接');
            }

            // 初始化数据库
            this.db = new Dexie('TrafficSecurityV2DB');
            this.db.version(5).stores({
                // 内网应用表
                internalApps: '++id, name, scope, status, domain, ip, createTime, lastUpdated',
                // 跨境应用表
                crossBorderApps: '++id, name, scope, status, createTime, lastUpdated',
                // 识别策略表
                recognitionStrategies: '++id, name, scope, status, createTime, lastUpdated',
                // 流量染色策略表
                coloringStrategies: '++id, name, scope, status, createTime, lastUpdated',
                // 内置应用表
                builtinApps: '++id, name, address, type, category, status, description, tags, createTime, lastUpdated',
                // 自定义应用表
                customApps: '++id, name, address, type, status, createTime, lastUpdated',
                // 数字水印配置表
                watermarkConfigs: '++id, name, enabled, type, content, style, timing, scope, createTime, lastUpdated',
                // 水印记录表 - 水印标记操作记录
                watermarkRecords: '++id, fileName, fileSize, fileType, originalFileId, markedFileId, watermarkContent, embedTime, status, downloadCount, tags, notes, createTime, lastUpdated',
                // 水印分析表 - 水印检测分析记录  
                watermarkAnalysis: '++id, fileName, fileId, hasWatermark, watermarkContent, confidence, analyzeTime, reportGenerated, reportPath, matchedRecordId, createTime, lastUpdated',
                // 文件上传表 - 管理上传的文件
                uploadedFiles: '++id, originalName, fileName, filePath, fileSize, fileType, uploadTime, status, hash, createTime, lastUpdated',
                // 部门信息表
                departments: '++id, name, code, manager, employeeCount, description, status, createTime, lastUpdated',
                // 设备信息表
                devices: '++id, name, type, location, ip, status, createTime, lastUpdated',
                // API密钥表
                apiKeys: '++id, purpose, accessKeyId, accessKeySecret, role, status, permission, createTime, lastUpdated',
                // 用户登录记录表
                userLoginLogs: '++id, userId, userName, action, loginTime, logoutTime, duration, ipAddress, userAgent',
                // 密码重置记录表
                passwordResets: '++id, username, email, resetToken, requestTime, expiryTime, status, resetTime, ipAddress, userAgent'
            });

            await this.db.open();
            console.log('✅ 数据库初始化成功');

            // 初始化默认数据
            await this.initializeDefaultData();

            // 添加模拟登录记录
            try {
                await this.loadMockLoginData();
            } catch (error) {
                console.error('⚠️ 模拟登录数据加载失败，继续初始化:', error);
            }

            // 加载缓存
            await this.loadAllCache();

            this.initialized = true;
            console.log('🎉 AppDataManagerV2 初始化完成');

        } catch (error) {
            console.error('❌ AppDataManagerV2 初始化失败:', error);
            throw error;
        }
    },

    // ===== 默认数据初始化 =====
    async initializeDefaultData() {
        try {
            // 检查是否已有数据
            const internalCount = await this.db.internalApps.count();
            const crossBorderCount = await this.db.crossBorderApps.count();
            const recognitionCount = await this.db.recognitionStrategies.count();
            const coloringCount = await this.db.coloringStrategies.count();
            const builtinCount = await this.db.builtinApps.count();
            const customCount = await this.db.customApps.count();
            const watermarkCount = await this.db.watermarkConfigs.count();
            const departmentCount = await this.db.departments.count();
            const deviceCount = await this.db.devices.count();
            const apiKeyCount = await this.db.apiKeys.count();

            // 如果没有数据，初始化默认数据
            if (internalCount === 0) {
                await this.seedInternalApps();
            }

            if (crossBorderCount === 0) {
                await this.seedCrossBorderApps();
            }

            if (recognitionCount === 0) {
                await this.seedRecognitionStrategies();
            }

            if (coloringCount === 0) {
                await this.seedColoringStrategies();
            }

            if (builtinCount === 0) {
                await this.seedBuiltinApps();
            }

            if (customCount === 0) {
                await this.seedCustomApps();
            }

            if (watermarkCount === 0) {
                await this.seedWatermarkConfigs();
            }

            if (departmentCount === 0) {
                await this.seedDepartments();
            }

            if (deviceCount === 0) {
                await this.seedDevices();
            }

            if (apiKeyCount === 0) {
                await this.seedApiKeys();
            }

            console.log('✅ 默认数据初始化完成');

        } catch (error) {
            console.error('❌ 默认数据初始化失败:', error);
        }
    },

    // 初始化内网应用数据
    async seedInternalApps() {
        const defaultApps = [
            {
                name: '企业邮箱系统',
                scope: '全部用户',
                recognitionTypes: ['域名识别', '协议特征识别'],
                description: '企业内部邮箱服务',
                status: true,
                domain: 'mail.company.com',
                ip: '192.168.1.100',
                createTime: new Date().toISOString()
            },
            {
                name: 'OA办公系统',
                scope: '全部用户',
                recognitionTypes: ['域名识别'],
                description: '办公自动化系统',
                status: true,
                domain: 'oa.company.com',
                ip: '192.168.1.101',
                createTime: new Date().toISOString()
            },
            {
                name: '财务管理系统',
                scope: '财务部门',
                recognitionTypes: ['IP识别', '协议特征识别'],
                description: '财务管理相关系统',
                status: true,
                domain: 'finance.company.com',
                ip: '192.168.1.102',
                createTime: new Date().toISOString()
            },
            {
                name: '代码仓库',
                scope: '研发部门',
                recognitionTypes: ['域名识别', '协议特征识别'],
                description: '代码版本控制系统',
                status: true,
                domain: 'git.company.com',
                ip: '192.168.1.105',
                createTime: new Date().toISOString()
            },
            {
                name: '项目管理系统',
                scope: '研发部门',
                recognitionTypes: ['IP识别'],
                description: '项目协作管理平台',
                status: false,
                domain: 'project.company.com',
                ip: '192.168.1.104',
                createTime: new Date().toISOString()
            },
            {
                name: '企业邮箱系统',
                scope: '全部用户',
                recognitionTypes: ['域名识别', '协议特征识别'],
                description: '企业内部邮箱服务',
                status: true,
                domain: 'mail.company.com',
                ip: '192.168.1.100',
                createTime: new Date().toISOString()
            },
            {
                name: 'OA办公系统',
                scope: '全部用户',
                recognitionTypes: ['域名识别'],
                description: '办公自动化系统',
                status: true,
                domain: 'oa.company.com',
                ip: '192.168.1.101',
                createTime: new Date().toISOString()
            },
            {
                name: '财务管理系统',
                scope: '财务部门',
                recognitionTypes: ['IP识别', '协议特征识别'],
                description: '财务管理相关系统',
                status: true,
                domain: 'finance.company.com',
                ip: '192.168.1.102',
                createTime: new Date().toISOString()
            },
            {
                name: '人力资源系统',
                scope: '人事部门',
                recognitionTypes: ['域名识别'],
                description: '人力资源管理平台',
                status: true,
                domain: 'hr.company.com',
                ip: '192.168.1.103',
                createTime: new Date().toISOString()
            },
            {
                name: '项目管理系统',
                scope: '研发部门',
                recognitionTypes: ['IP识别'],
                description: '项目协作管理平台',
                status: false,
                domain: 'project.company.com',
                ip: '192.168.1.104',
                createTime: new Date().toISOString()
            },
            {
                name: '代码仓库',
                scope: '研发部门',
                recognitionTypes: ['域名识别', '协议特征识别'],
                description: '代码版本控制系统',
                status: true,
                domain: 'git.company.com',
                ip: '192.168.1.105',
                createTime: new Date().toISOString()
            },
            {
                name: '测试环境',
                scope: '测试部门',
                recognitionTypes: ['IP识别'],
                description: '软件测试环境',
                status: true,
                domain: 'test.company.com',
                ip: '192.168.1.106',
                createTime: new Date().toISOString()
            },
            {
                name: '监控系统',
                scope: '运维部门',
                recognitionTypes: ['域名识别', 'IP识别'],
                description: '系统监控平台',
                status: true,
                domain: 'monitor.company.com',
                ip: '192.168.1.107',
                createTime: new Date().toISOString()
            },
            {
                name: '日志系统',
                scope: '运维部门',
                recognitionTypes: ['IP识别', '协议特征识别'],
                description: '日志收集分析系统',
                status: true,
                domain: 'logs.company.com',
                ip: '192.168.1.108',
                createTime: new Date().toISOString()
            },
            {
                name: '数据库管理',
                scope: '运维部门',
                recognitionTypes: ['IP识别'],
                description: '数据库管理平台',
                status: false,
                domain: 'db.company.com',
                ip: '192.168.1.109',
                createTime: new Date().toISOString()
            },
            {
                name: '文件存储系统',
                scope: '全部用户',
                recognitionTypes: ['域名识别', '协议特征识别'],
                description: '企业文件存储服务',
                status: true,
                domain: 'storage.company.com',
                ip: '192.168.1.110',
                createTime: new Date().toISOString()
            },
            {
                name: '视频会议系统',
                scope: '全部用户',
                recognitionTypes: ['域名识别'],
                description: '在线视频会议平台',
                status: true,
                domain: 'meeting.company.com',
                ip: '192.168.1.111',
                createTime: new Date().toISOString()
            },
            {
                name: '知识库系统',
                scope: '全部用户',
                recognitionTypes: ['域名识别', 'IP识别'],
                description: '企业知识管理平台',
                status: true,
                domain: 'wiki.company.com',
                ip: '192.168.1.112',
                createTime: new Date().toISOString()
            },
            {
                name: '客户关系管理',
                scope: '销售部门',
                recognitionTypes: ['域名识别'],
                description: '客户关系管理系统',
                status: true,
                domain: 'crm.company.com',
                ip: '192.168.1.113',
                createTime: new Date().toISOString()
            },
            {
                name: '供应链管理',
                scope: '采购部门',
                recognitionTypes: ['IP识别', '协议特征识别'],
                description: '供应链管理平台',
                status: false,
                domain: 'supply.company.com',
                ip: '192.168.1.114',
                createTime: new Date().toISOString()
            },
            {
                name: '质量管理系统',
                scope: '质量部门',
                recognitionTypes: ['域名识别'],
                description: '质量管理平台',
                status: true,
                domain: 'quality.company.com',
                ip: '192.168.1.115',
                createTime: new Date().toISOString()
            },
            {
                name: '培训系统',
                scope: '培训部门',
                recognitionTypes: ['域名识别', 'IP识别'],
                description: '员工培训管理平台',
                status: true,
                domain: 'training.company.com',
                ip: '192.168.1.116',
                createTime: new Date().toISOString()
            },
            {
                name: 'IT服务台',
                scope: 'IT部门',
                recognitionTypes: ['域名识别', '协议特征识别'],
                description: 'IT服务管理平台',
                status: true,
                domain: 'itservice.company.com',
                ip: '192.168.1.117',
                createTime: new Date().toISOString()
            },
            {
                name: '资产管理',
                scope: '行政部门',
                recognitionTypes: ['IP识别'],
                description: '企业资产管理系统',
                status: false,
                domain: 'asset.company.com',
                ip: '192.168.1.118',
                createTime: new Date().toISOString()
            },
            {
                name: '战略规划系统',
                scope: '战略部门',
                recognitionTypes: ['域名识别'],
                description: '战略规划管理平台',
                status: true,
                domain: 'strategy.company.com',
                ip: '192.168.1.119',
                createTime: new Date().toISOString()
            },
            {
                name: '创新管理平台',
                scope: '创新部门',
                recognitionTypes: ['域名识别', 'IP识别'],
                description: '创新项目管理平台',
                status: true,
                domain: 'innovation.company.com',
                ip: '192.168.1.120',
                createTime: new Date().toISOString()
            },
            {
                name: '投资管理系统',
                scope: '投资部门',
                recognitionTypes: ['IP识别', '协议特征识别'],
                description: '投资管理平台',
                status: false,
                domain: 'investment.company.com',
                ip: '192.168.1.121',
                createTime: new Date().toISOString()
            },
            {
                name: '合规管理系统',
                scope: '合规部门',
                recognitionTypes: ['域名识别'],
                description: '合规管理平台',
                status: true,
                domain: 'compliance.company.com',
                ip: '192.168.1.122',
                createTime: new Date().toISOString()
            },
            {
                name: '知识产权管理',
                scope: '知识产权部门',
                recognitionTypes: ['域名识别', 'IP识别'],
                description: '知识产权管理平台',
                status: true,
                domain: 'ip.company.com',
                ip: '192.168.1.123',
                createTime: new Date().toISOString()
            },
            {
                name: '会展管理系统',
                scope: '会展部门',
                recognitionTypes: ['域名识别', '协议特征识别'],
                description: '会展活动管理平台',
                status: false,
                domain: 'events.company.com',
                ip: '192.168.1.124',
                createTime: new Date().toISOString()
            },
            {
                name: '供应链协同',
                scope: '供应链部门',
                recognitionTypes: ['IP识别'],
                description: '供应链协同管理平台',
                status: true,
                domain: 'supplychain.company.com',
                ip: '192.168.1.125',
                createTime: new Date().toISOString()
            },
            {
                name: '数据分析平台',
                scope: '数据分析部门',
                recognitionTypes: ['域名识别', 'IP识别', '协议特征识别'],
                description: '大数据分析平台',
                status: true,
                domain: 'analytics.company.com',
                ip: '192.168.1.126',
                createTime: new Date().toISOString()
            },
            {
                name: '项目管理工具',
                scope: '项目部门',
                recognitionTypes: ['域名识别'],
                description: '项目协作管理工具',
                status: true,
                domain: 'projectmgmt.company.com',
                ip: '192.168.1.127',
                createTime: new Date().toISOString()
            },
            {
                name: '客服系统',
                scope: '客服部门',
                recognitionTypes: ['域名识别', 'IP识别'],
                description: '客户服务管理平台',
                status: true,
                domain: 'service.company.com',
                ip: '192.168.1.128',
                createTime: new Date().toISOString()
            },
            {
                name: '物流管理系统',
                scope: '物流部门',
                recognitionTypes: ['IP识别', '协议特征识别'],
                description: '物流配送管理平台',
                status: false,
                domain: 'logistics.company.com',
                ip: '192.168.1.129',
                createTime: new Date().toISOString()
            }
        ]


        for (const app of defaultApps) {
            await this.db.internalApps.add(app);
        }

        console.log(`✅ 已初始化 ${defaultApps.length} 个内网应用`);
    },

    // 初始化跨境应用数据
    async seedCrossBorderApps() {
        const defaultApps = [
            {
                name: '跨境电商识别',
                scope: '全部用户',
                recognitionTypes: ['跨境应用识别', '动态调整识别'],
                description: '识别跨境电商平台访问',
                status: true,
                createTime: new Date().toISOString()
            },
            {
                name: '海外社交媒体',
                scope: '指定员工',
                recognitionTypes: ['跨境应用识别', 'AI识别'],
                description: '识别海外社交媒体访问',
                status: true,
                createTime: new Date().toISOString()
            },
            {
                name: '国际云服务',
                scope: '研发部门',
                recognitionTypes: ['跨境应用识别', 'IP识别'],
                description: '识别国际云服务提供商',
                status: true,
                createTime: new Date().toISOString()
            },
            {
                name: '跨境电商识别',
                scope: '全部用户',
                recognitionTypes: ['跨境应用识别', '动态调整识别'],
                description: '识别跨境电商平台访问',
                status: true,
                createTime: new Date().toISOString()
            },
            {
                name: '海外社交媒体',
                scope: '指定员工',
                recognitionTypes: ['跨境应用识别', 'AI识别'],
                description: '识别海外社交媒体访问',
                status: true,
                createTime: new Date().toISOString()
            },
            {
                name: '国际视频平台',
                scope: '市场部门',
                recognitionTypes: ['跨境应用识别', '协议特征识别'],
                description: '识别国际视频流媒体平台',
                status: true,
                createTime: new Date().toISOString()
            },
            {
                name: '海外新闻媒体',
                scope: '全部用户',
                recognitionTypes: ['跨境应用识别', '域名识别'],
                description: '识别海外新闻资讯网站',
                status: true,
                createTime: new Date().toISOString()
            },
            {
                name: '国际云服务',
                scope: '研发部门',
                recognitionTypes: ['跨境应用识别', 'IP识别'],
                description: '识别国际云服务提供商',
                status: true,
                createTime: new Date().toISOString()
            },
            {
                name: '海外学术资源',
                scope: '研发部门',
                recognitionTypes: ['跨境应用识别', '动态调整识别'],
                description: '识别海外学术数据库和期刊',
                status: true,
                createTime: new Date().toISOString()
            },
            {
                name: '国际支付平台',
                scope: '财务部门',
                recognitionTypes: ['跨境应用识别', '协议特征识别'],
                description: '识别国际支付和金融平台',
                status: true,
                createTime: new Date().toISOString()
            },
            {
                name: '海外招聘平台',
                scope: '人事部门',
                recognitionTypes: ['跨境应用识别', '域名识别'],
                description: '识别海外招聘和人才平台',
                status: true,
                createTime: new Date().toISOString()
            },
            {
                name: '国际会议平台',
                scope: '全部用户',
                recognitionTypes: ['跨境应用识别', 'AI识别'],
                description: '识别国际在线会议平台',
                status: true,
                createTime: new Date().toISOString()
            },
            {
                name: '海外技术论坛',
                scope: '研发部门',
                recognitionTypes: ['跨境应用识别', '动态调整识别'],
                description: '识别海外技术社区和论坛',
                status: true,
                createTime: new Date().toISOString()
            },
            {
                name: '国际设计平台',
                scope: '设计部门',
                recognitionTypes: ['跨境应用识别', '域名识别'],
                description: '识别国际设计资源和工具平台',
                status: true,
                createTime: new Date().toISOString()
            },
            {
                name: '海外音乐平台',
                scope: '全部用户',
                recognitionTypes: ['跨境应用识别', '协议特征识别'],
                description: '识别海外音乐流媒体服务',
                status: true,
                createTime: new Date().toISOString()
            },
            {
                name: '国际游戏平台',
                scope: '指定员工',
                recognitionTypes: ['跨境应用识别', 'IP识别'],
                description: '识别国际游戏和娱乐平台',
                status: true,
                createTime: new Date().toISOString()
            },
            {
                name: '海外教育平台',
                scope: '全部用户',
                recognitionTypes: ['跨境应用识别', 'AI识别'],
                description: '识别海外在线教育平台',
                status: true,
                createTime: new Date().toISOString()
            },
            {
                name: '国际翻译服务',
                scope: '全部用户',
                recognitionTypes: ['跨境应用识别', '域名识别'],
                description: '识别国际翻译和语言服务',
                status: true,
                createTime: new Date().toISOString()
            },
            {
                name: '海外数据分析',
                scope: '数据分析部门',
                recognitionTypes: ['跨境应用识别', '动态调整识别'],
                description: '识别海外数据分析和BI平台',
                status: true,
                createTime: new Date().toISOString()
            },
            {
                name: '国际项目管理',
                scope: '项目部门',
                recognitionTypes: ['跨境应用识别', '协议特征识别'],
                description: '识别国际项目管理协作平台',
                status: true,
                createTime: new Date().toISOString()
            },
            {
                name: '海外客户服务',
                scope: '客服部门',
                recognitionTypes: ['跨境应用识别', '域名识别'],
                description: '识别海外客户服务和支持平台',
                status: true,
                createTime: new Date().toISOString()
            },
            {
                name: '国际营销平台',
                scope: '市场部门',
                recognitionTypes: ['跨境应用识别', 'AI识别'],
                description: '识别国际数字营销和广告平台',
                status: true,
                createTime: new Date().toISOString()
            },
            {
                name: '海外物流服务',
                scope: '物流部门',
                recognitionTypes: ['跨境应用识别', 'IP识别'],
                description: '识别海外物流和供应链平台',
                status: true,
                createTime: new Date().toISOString()
            },
            {
                name: '国际法律咨询',
                scope: '法务部门',
                recognitionTypes: ['跨境应用识别', '域名识别'],
                description: '识别国际法律咨询和服务平台',
                status: true,
                createTime: new Date().toISOString()
            },
            {
                name: '海外人力资源',
                scope: '人事部门',
                recognitionTypes: ['跨境应用识别', '动态调整识别'],
                description: '识别海外人力资源服务平台',
                status: true,
                createTime: new Date().toISOString()
            },
            {
                name: '国际财务服务',
                scope: '财务部门',
                recognitionTypes: ['跨境应用识别', '协议特征识别'],
                description: '识别国际财务和会计服务平台',
                status: true,
                createTime: new Date().toISOString()
            },
            {
                name: '海外技术支持',
                scope: 'IT部门',
                recognitionTypes: ['跨境应用识别', 'AI识别'],
                description: '识别海外技术支持和维护平台',
                status: true,
                createTime: new Date().toISOString()
            },
            {
                name: '国际商务平台',
                scope: '商务部门',
                recognitionTypes: ['跨境应用识别', '域名识别'],
                description: '识别国际商务合作和贸易平台',
                status: true,
                createTime: new Date().toISOString()
            },
            {
                name: '海外研发工具',
                scope: '研发部门',
                recognitionTypes: ['跨境应用识别', 'IP识别'],
                description: '识别海外研发工具和平台',
                status: true,
                createTime: new Date().toISOString()
            },
            {
                name: '国际安全服务',
                scope: '安全部门',
                recognitionTypes: ['跨境应用识别', '动态调整识别'],
                description: '识别国际网络安全服务平台',
                status: true,
                createTime: new Date().toISOString()
            },
            {
                name: '海外合规服务',
                scope: '合规部门',
                recognitionTypes: ['跨境应用识别', '协议特征识别'],
                description: '识别海外合规和监管服务平台',
                status: true,
                createTime: new Date().toISOString()
            },
            {
                name: '国际创新平台',
                scope: '创新部门',
                recognitionTypes: ['跨境应用识别', 'AI识别'],
                description: '识别国际创新和创业平台',
                status: true,
                createTime: new Date().toISOString()
            },
            {
                name: '海外投资平台',
                scope: '投资部门',
                recognitionTypes: ['跨境应用识别', '域名识别'],
                description: '识别海外投资和融资平台',
                status: true,
                createTime: new Date().toISOString()
            },
            {
                name: '国际咨询平台',
                scope: '战略部门',
                recognitionTypes: ['跨境应用识别', 'IP识别'],
                description: '识别国际咨询和顾问服务平台',
                status: true,
                createTime: new Date().toISOString()
            },
            {
                name: '海外培训平台',
                scope: '培训部门',
                recognitionTypes: ['跨境应用识别', '动态调整识别'],
                description: '识别海外专业培训平台',
                status: true,
                createTime: new Date().toISOString()
            },
            {
                name: '国际认证服务',
                scope: '质量部门',
                recognitionTypes: ['跨境应用识别', '协议特征识别'],
                description: '识别国际认证和标准服务平台',
                status: true,
                createTime: new Date().toISOString()
            },
            {
                name: '海外知识产权',
                scope: '知识产权部门',
                recognitionTypes: ['跨境应用识别', 'AI识别'],
                description: '识别海外知识产权服务平台',
                status: true,
                createTime: new Date().toISOString()
            },
            {
                name: '国际会展平台',
                scope: '市场部门',
                recognitionTypes: ['跨境应用识别', '域名识别'],
                description: '识别国际会展和活动平台',
                status: true,
                createTime: new Date().toISOString()
            },
            {
                name: '海外供应链',
                scope: '采购部门',
                recognitionTypes: ['跨境应用识别', 'IP识别'],
                description: '识别海外供应链管理平台',
                status: true,
                createTime: new Date().toISOString()
            },
            {
                name: '国际物流追踪',
                scope: '物流部门',
                recognitionTypes: ['跨境应用识别', '动态调整识别'],
                description: '识别国际物流追踪平台',
                status: true,
                createTime: new Date().toISOString()
            }
        ];

        for (const app of defaultApps) {
            await this.db.crossBorderApps.add(app);
        }

        console.log(`✅ 已初始化 ${defaultApps.length} 个跨境应用`);
    },

    // 初始化识别策略数据
    async seedRecognitionStrategies() {
        const defaultStrategies = [
            {
                name: "内部OA系统识别策略",
                scope: "研发部门",
                configs: ["域名、IP、URL、协议", "加密流量", "AI/ML"],
                note: "用于识别内部OA系统的访问流量，确保安全访问",
                status: true,
                effectObject: "全部员工和设备",
                recognitionConfig: {
                    basic: true,
                    encrypted: true,
                    ai: true,
                    behavior: false
                },
                createTime: new Date().toISOString()
            },
            {
                name: "内网代码仓库访问策略",
                scope: "全部用户",
                configs: ["域名、IP、URL、协议", "应用行为分析"],
                note: "监控内部代码仓库的访问行为，防止敏感数据泄露",
                status: true,
                effectObject: "全部员工和设备",
                recognitionConfig: {
                    basic: true,
                    encrypted: false,
                    ai: false,
                    behavior: true
                },
                createTime: new Date().toISOString()
            }
        ];

        for (const strategy of defaultStrategies) {
            await this.db.recognitionStrategies.add(strategy);
        }

        console.log(`✅ 已初始化 ${defaultStrategies.length} 个识别策略`);
    },

    // 初始化流量染色策略数据
    async seedColoringStrategies() {
        const defaultStrategies = [
            {
                name: "业务系统访问流量染色",
                scope: "研发部门",
                techniques: ["应用染色", "数据流染色"],
                note: "用于追踪业务系统的访问流量，实现数据追踪",
                status: true,
                effectObject: "全部员工和设备",
                coloringConfig: {
                    appColoring: {
                        enabled: true,
                        address: true,
                        protocol: false,
                        ip: true
                    },
                    dataFlowColoring: true,
                    dataTrackingColoring: false
                },
                createTime: new Date().toISOString()
            },
            {
                name: "数据库操作染色策略",
                scope: "DBA团队",
                techniques: ["数据流染色", "数据追踪染色"],
                note: "监控数据库操作行为，追踪敏感数据流向",
                status: true,
                effectObject: "指定员工/设备",
                coloringConfig: {
                    appColoring: {
                        enabled: false,
                        address: false,
                        protocol: false,
                        ip: false
                    },
                    dataFlowColoring: true,
                    dataTrackingColoring: true
                },
                createTime: new Date().toISOString()
            },
            {
                name: "API调用链路染色",
                scope: "全部用户",
                techniques: ["应用染色", "数据追踪染色"],
                note: "追踪微服务间的调用链路，优化系统性能",
                status: true,
                effectObject: "全部员工和设备",
                coloringConfig: {
                    appColoring: {
                        enabled: true,
                        address: true,
                        protocol: true,
                        ip: false
                    },
                    dataFlowColoring: false,
                    dataTrackingColoring: true
                },
                createTime: new Date().toISOString()
            }
        ];

        for (const strategy of defaultStrategies) {
            await this.db.coloringStrategies.add(strategy);
        }

        console.log(`✅ 已初始化 ${defaultStrategies.length} 个染色策略`);
    },

    // 初始化内置应用数据（精简版，包含主要分类的代表应用）
    async seedBuiltinApps() {
        const defaultApps = [
            // 办公应用 - 邮件系统
            { name: 'Microsoft Outlook', address: 'outlook.office365.com', type: '邮件系统', category: '办公应用', status: '启用', description: '微软企业邮箱服务', tags: ['邮件', '办公', '微软'], createTime: new Date().toISOString() },
            { name: 'Gmail', address: 'mail.google.com', type: '邮件系统', category: '办公应用', status: '启用', description: '谷歌邮箱服务', tags: ['邮件', '办公', '谷歌'], createTime: new Date().toISOString() },
            { name: 'QQ邮箱', address: 'mail.qq.com', type: '邮件系统', category: '办公应用', status: '启用', description: '腾讯QQ邮箱服务', tags: ['邮件', '办公', '腾讯'], createTime: new Date().toISOString() },

            // 办公应用 - 文档协作
            { name: 'Microsoft Office Online', address: 'office.live.com', type: '文档协作', category: '办公应用', status: '启用', description: '微软在线办公套件', tags: ['文档', '协作', '微软'], createTime: new Date().toISOString() },
            { name: 'Google Docs', address: 'docs.google.com', type: '文档协作', category: '办公应用', status: '启用', description: '谷歌在线文档服务', tags: ['文档', '协作', '谷歌'], createTime: new Date().toISOString() },
            { name: '腾讯文档', address: 'docs.qq.com', type: '文档协作', category: '办公应用', status: '启用', description: '腾讯在线文档服务', tags: ['文档', '协作', '腾讯'], createTime: new Date().toISOString() },

            // 办公应用 - 视频会议
            { name: 'Zoom', address: 'zoom.us', type: '视频会议', category: '办公应用', status: '启用', description: 'Zoom视频会议平台', tags: ['视频会议', '远程办公', 'Zoom'], createTime: new Date().toISOString() },
            { name: '腾讯会议', address: 'meeting.tencent.com', type: '视频会议', category: '办公应用', status: '启用', description: '腾讯视频会议平台', tags: ['视频会议', '远程办公', '腾讯'], createTime: new Date().toISOString() },
            { name: '钉钉', address: 'www.dingtalk.com', type: '视频会议', category: '办公应用', status: '启用', description: '阿里巴巴钉钉平台', tags: ['视频会议', '远程办公', '阿里'], createTime: new Date().toISOString() },

            // 开发工具 - 代码仓库
            { name: 'GitHub', address: 'github.com', type: '代码仓库', category: '开发工具', status: '启用', description: 'GitHub代码托管平台', tags: ['代码仓库', 'Git', '开源'], createTime: new Date().toISOString() },
            { name: 'GitLab', address: 'gitlab.com', type: '代码仓库', category: '开发工具', status: '启用', description: 'GitLab代码托管平台', tags: ['代码仓库', 'Git', 'CI/CD'], createTime: new Date().toISOString() },
            { name: 'Gitee', address: 'gitee.com', type: '代码仓库', category: '开发工具', status: '启用', description: '码云代码托管平台', tags: ['代码仓库', 'Git', '国内'], createTime: new Date().toISOString() },

            // 开发工具 - CI/CD工具
            { name: 'Jenkins', address: 'jenkins.io', type: 'CI/CD工具', category: '开发工具', status: '启用', description: 'Jenkins持续集成平台', tags: ['CI/CD', '自动化', '开源'], createTime: new Date().toISOString() },
            { name: 'GitHub Actions', address: 'github.com/features/actions', type: 'CI/CD工具', category: '开发工具', status: '启用', description: 'GitHub Actions自动化平台', tags: ['CI/CD', '自动化', 'GitHub'], createTime: new Date().toISOString() },

            // 云服务 - 对象存储
            { name: '阿里云OSS', address: 'oss.aliyun.com', type: '对象存储', category: '云服务', status: '启用', description: '阿里云对象存储服务', tags: ['对象存储', '云服务', '阿里云'], createTime: new Date().toISOString() },
            { name: '腾讯云COS', address: 'cloud.tencent.com/product/cos', type: '对象存储', category: '云服务', status: '启用', description: '腾讯云对象存储服务', tags: ['对象存储', '云服务', '腾讯云'], createTime: new Date().toISOString() },
            { name: 'AWS S3', address: 'aws.amazon.com/s3', type: '对象存储', category: '云服务', status: '启用', description: '亚马逊S3对象存储服务', tags: ['对象存储', '云服务', 'AWS'], createTime: new Date().toISOString() },

            // 企业管理 - ERP
            { name: '用友ERP', address: 'yonyou.com/erp', type: 'ERP', category: '企业管理', status: '启用', description: '用友ERP系统', tags: ['ERP', '企业管理', '用友'], createTime: new Date().toISOString() },
            { name: '金蝶ERP', address: 'kingdee.com/erp', type: 'ERP', category: '企业管理', status: '启用', description: '金蝶ERP系统', tags: ['ERP', '企业管理', '金蝶'], createTime: new Date().toISOString() },

            // 安全工具 - 防火墙
            { name: '思科防火墙', address: 'cisco.com/firewall', type: '防火墙', category: '安全工具', status: '启用', description: '思科企业级防火墙', tags: ['防火墙', '安全', '思科'], createTime: new Date().toISOString() },

            // 办公应用 - 邮件系统
            { id: 1, name: 'Microsoft Outlook', address: 'outlook.office365.com', type: '邮件系统', category: '办公应用', status: '启用', description: '微软企业邮箱服务', tags: ['邮件', '办公', '微软'] },
            { id: 2, name: 'Gmail', address: 'mail.google.com', type: '邮件系统', category: '办公应用', status: '启用', description: '谷歌邮箱服务', tags: ['邮件', '办公', '谷歌'] },
            { id: 3, name: 'QQ邮箱', address: 'mail.qq.com', type: '邮件系统', category: '办公应用', status: '启用', description: '腾讯QQ邮箱服务', tags: ['邮件', '办公', '腾讯'] },
            { id: 4, name: '163邮箱', address: 'mail.163.com', type: '邮件系统', category: '办公应用', status: '启用', description: '网易163邮箱服务', tags: ['邮件', '办公', '网易'] },
            { id: 5, name: '企业微信邮箱', address: 'exmail.qq.com', type: '邮件系统', category: '办公应用', status: '启用', description: '腾讯企业邮箱服务', tags: ['邮件', '办公', '企业微信'] },

            // 办公应用 - 文档协作
            { id: 6, name: 'Microsoft Office Online', address: 'office.live.com', type: '文档协作', category: '办公应用', status: '启用', description: '微软在线办公套件', tags: ['文档', '协作', '微软'] },
            { id: 7, name: 'Google Docs', address: 'docs.google.com', type: '文档协作', category: '办公应用', status: '启用', description: '谷歌在线文档服务', tags: ['文档', '协作', '谷歌'] },
            { id: 8, name: '腾讯文档', address: 'docs.qq.com', type: '文档协作', category: '办公应用', status: '启用', description: '腾讯在线文档服务', tags: ['文档', '协作', '腾讯'] },
            { id: 9, name: '金山文档', address: 'www.kdocs.cn', type: '文档协作', category: '办公应用', status: '启用', description: '金山在线文档服务', tags: ['文档', '协作', '金山'] },
            { id: 10, name: '石墨文档', address: 'shimo.im', type: '文档协作', category: '办公应用', status: '启用', description: '石墨在线文档服务', tags: ['文档', '协作', '石墨'] },

            // 办公应用 - 视频会议
            { id: 11, name: 'Zoom', address: 'zoom.us', type: '视频会议', category: '办公应用', status: '启用', description: 'Zoom视频会议平台', tags: ['视频会议', '远程办公', 'Zoom'] },
            { id: 12, name: '腾讯会议', address: 'meeting.tencent.com', type: '视频会议', category: '办公应用', status: '启用', description: '腾讯视频会议平台', tags: ['视频会议', '远程办公', '腾讯'] },
            { id: 13, name: '钉钉', address: 'www.dingtalk.com', type: '视频会议', category: '办公应用', status: '启用', description: '阿里巴巴钉钉平台', tags: ['视频会议', '远程办公', '阿里'] },
            { id: 14, name: '飞书', address: 'www.feishu.cn', type: '视频会议', category: '办公应用', status: '启用', description: '字节跳动飞书平台', tags: ['视频会议', '远程办公', '字节'] },
            { id: 15, name: 'Microsoft Teams', address: 'teams.microsoft.com', type: '视频会议', category: '办公应用', status: '启用', description: '微软Teams协作平台', tags: ['视频会议', '远程办公', '微软'] },

            // 开发工具 - 代码仓库
            { id: 16, name: 'GitHub', address: 'github.com', type: '代码仓库', category: '开发工具', status: '启用', description: 'GitHub代码托管平台', tags: ['代码仓库', 'Git', '开源'] },
            { id: 17, name: 'GitLab', address: 'gitlab.com', type: '代码仓库', category: '开发工具', status: '启用', description: 'GitLab代码托管平台', tags: ['代码仓库', 'Git', 'CI/CD'] },
            { id: 18, name: 'Gitee', address: 'gitee.com', type: '代码仓库', category: '开发工具', status: '启用', description: '码云代码托管平台', tags: ['代码仓库', 'Git', '国内'] },
            { id: 19, name: 'Bitbucket', address: 'bitbucket.org', type: '代码仓库', category: '开发工具', status: '启用', description: 'Atlassian代码托管平台', tags: ['代码仓库', 'Git', 'Atlassian'] },
            { id: 20, name: 'Coding', address: 'coding.net', type: '代码仓库', category: '开发工具', status: '启用', description: '腾讯云开发者平台', tags: ['代码仓库', 'Git', '腾讯'] },

            // 开发工具 - CI/CD工具
            { id: 21, name: 'Jenkins', address: 'jenkins.io', type: 'CI/CD工具', category: '开发工具', status: '启用', description: 'Jenkins持续集成平台', tags: ['CI/CD', '自动化', '开源'] },
            { id: 22, name: 'GitHub Actions', address: 'github.com/features/actions', type: 'CI/CD工具', category: '开发工具', status: '启用', description: 'GitHub Actions自动化平台', tags: ['CI/CD', '自动化', 'GitHub'] },
            { id: 23, name: 'GitLab CI', address: 'docs.gitlab.com/ee/ci', type: 'CI/CD工具', category: '开发工具', status: '启用', description: 'GitLab CI/CD平台', tags: ['CI/CD', '自动化', 'GitLab'] },
            { id: 24, name: 'Travis CI', address: 'travis-ci.org', type: 'CI/CD工具', category: '开发工具', status: '启用', description: 'Travis CI持续集成平台', tags: ['CI/CD', '自动化', '开源'] },
            { id: 25, name: 'CircleCI', address: 'circleci.com', type: 'CI/CD工具', category: '开发工具', status: '启用', description: 'CircleCI持续集成平台', tags: ['CI/CD', '自动化', '云服务'] },

            // 开发工具 - 监控工具
            { id: 26, name: 'Grafana', address: 'grafana.com', type: '监控工具', category: '开发工具', status: '启用', description: 'Grafana数据可视化平台', tags: ['监控', '可视化', '开源'] },
            { id: 27, name: 'Prometheus', address: 'prometheus.io', type: '监控工具', category: '开发工具', status: '启用', description: 'Prometheus监控系统', tags: ['监控', '时序数据库', '开源'] },
            { id: 28, name: 'Zabbix', address: 'www.zabbix.com', type: '监控工具', category: '开发工具', status: '启用', description: 'Zabbix企业级监控平台', tags: ['监控', '企业级', '开源'] },
            { id: 29, name: 'Nagios', address: 'www.nagios.org', type: '监控工具', category: '开发工具', status: '启用', description: 'Nagios网络监控系统', tags: ['监控', '网络', '开源'] },
            { id: 30, name: 'Datadog', address: 'www.datadoghq.com', type: '监控工具', category: '开发工具', status: '启用', description: 'Datadog云监控平台', tags: ['监控', '云服务', 'SaaS'] },

            // 云服务 - 对象存储
            { id: 31, name: '阿里云OSS', address: 'oss.aliyun.com', type: '对象存储', category: '云服务', status: '启用', description: '阿里云对象存储服务', tags: ['对象存储', '云服务', '阿里云'] },
            { id: 32, name: '腾讯云COS', address: 'cloud.tencent.com/product/cos', type: '对象存储', category: '云服务', status: '启用', description: '腾讯云对象存储服务', tags: ['对象存储', '云服务', '腾讯云'] },
            { id: 33, name: 'AWS S3', address: 'aws.amazon.com/s3', type: '对象存储', category: '云服务', status: '启用', description: '亚马逊S3对象存储服务', tags: ['对象存储', '云服务', 'AWS'] },
            { id: 34, name: 'Azure Blob', address: 'azure.microsoft.com/services/storage/blobs', type: '对象存储', category: '云服务', status: '启用', description: '微软Azure Blob存储服务', tags: ['对象存储', '云服务', 'Azure'] },
            { id: 35, name: '七牛云', address: 'www.qiniu.com', type: '对象存储', category: '云服务', status: '启用', description: '七牛云对象存储服务', tags: ['对象存储', '云服务', '七牛云'] },

            // 云服务 - 容器服务
            { id: 36, name: '阿里云ACK', address: 'www.aliyun.com/product/kubernetes', type: '容器服务', category: '云服务', status: '启用', description: '阿里云容器服务Kubernetes版', tags: ['容器', 'Kubernetes', '阿里云'] },
            { id: 37, name: '腾讯云TKE', address: 'cloud.tencent.com/product/tke', type: '容器服务', category: '云服务', status: '启用', description: '腾讯云容器服务', tags: ['容器', 'Kubernetes', '腾讯云'] },
            { id: 38, name: 'AWS EKS', address: 'aws.amazon.com/eks', type: '容器服务', category: '云服务', status: '启用', description: '亚马逊EKS容器服务', tags: ['容器', 'Kubernetes', 'AWS'] },
            { id: 39, name: 'Azure AKS', address: 'azure.microsoft.com/services/kubernetes-service', type: '容器服务', category: '云服务', status: '启用', description: '微软Azure Kubernetes服务', tags: ['容器', 'Kubernetes', 'Azure'] },
            { id: 40, name: 'Docker Hub', address: 'hub.docker.com', type: '容器服务', category: '云服务', status: '启用', description: 'Docker镜像仓库', tags: ['容器', '镜像', 'Docker'] },

            // 云服务 - 数据库服务
            { name: '阿里云RDS', address: 'www.aliyun.com/product/rds', type: '数据库服务', category: '云服务', status: '启用', description: '阿里云关系型数据库服务', tags: ['数据库', 'RDS', '阿里云'] },
            { name: '腾讯云CDB', address: 'cloud.tencent.com/product/cdb', type: '数据库服务', category: '云服务', status: '启用', description: '腾讯云数据库服务', tags: ['数据库', 'MySQL', '腾讯云'] },
            { name: 'AWS RDS', address: 'aws.amazon.com/rds', type: '数据库服务', category: '云服务', status: '启用', description: '亚马逊RDS数据库服务', tags: ['数据库', 'RDS', 'AWS'] },
            { name: 'Azure SQL', address: 'azure.microsoft.com/services/sql-database', type: '数据库服务', category: '云服务', status: '启用', description: '微软Azure SQL数据库服务', tags: ['数据库', 'SQL', 'Azure'] },
            { name: 'MongoDB Atlas', address: 'www.mongodb.com/atlas', type: '数据库服务', category: '云服务', status: '启用', description: 'MongoDB云数据库服务', tags: ['数据库', 'NoSQL', 'MongoDB'] },
            // 办公应用 - 日历
            { name: 'Google Calendar', address: 'calendar.google.com', type: '日历', category: '办公应用', status: '启用', description: '谷歌日历服务', tags: ['日历', '办公', '谷歌'] },
            { name: 'Outlook Calendar', address: 'outlook.office365.com/calendar', type: '日历', category: '办公应用', status: '启用', description: '微软Outlook日历', tags: ['日历', '办公', '微软'] },
            { name: '钉钉日历', address: 'calendar.dingtalk.com', type: '日历', category: '办公应用', status: '启用', description: '钉钉日历服务', tags: ['日历', '办公', '钉钉'] },
            { name: '飞书日历', address: 'calendar.feishu.cn', type: '日历', category: '办公应用', status: '启用', description: '飞书日历服务', tags: ['日历', '办公', '飞书'] },
            // 办公应用 - 任务
            { name: 'Trello', address: 'trello.com', type: '任务', category: '办公应用', status: '启用', description: 'Trello看板任务管理', tags: ['任务', '协作', '看板'] },
            { name: 'Asana', address: 'asana.com', type: '任务', category: '办公应用', status: '启用', description: 'Asana任务协作平台', tags: ['任务', '协作', '项目'] },
            { name: 'Teambition', address: 'teambition.com', type: '任务', category: '办公应用', status: '启用', description: '阿里Teambition项目管理', tags: ['任务', '协作', '阿里'] },
            { name: 'ClickUp', address: 'clickup.com', type: '任务', category: '办公应用', status: '启用', description: 'ClickUp任务管理', tags: ['任务', '协作', '项目'] },
            // 办公应用 - 笔记
            { name: 'Evernote', address: 'evernote.com', type: '笔记', category: '办公应用', status: '启用', description: '印象笔记', tags: ['笔记', '知识', '云笔记'] },
            { name: '有道云笔记', address: 'note.youdao.com', type: '笔记', category: '办公应用', status: '启用', description: '有道云笔记', tags: ['笔记', '知识', '网易'] },
            { name: 'OneNote', address: 'onenote.com', type: '笔记', category: '办公应用', status: '启用', description: '微软OneNote', tags: ['笔记', '知识', '微软'] },
            { name: '为知笔记', address: 'wiz.cn', type: '笔记', category: '办公应用', status: '启用', description: '为知笔记', tags: ['笔记', '知识', '云笔记'] },
            // 办公应用 - 通讯录
            { name: '企业微信通讯录', address: 'work.weixin.qq.com/contacts', type: '通讯录', category: '办公应用', status: '启用', description: '企业微信通讯录', tags: ['通讯录', '办公', '微信'] },
            { name: '钉钉通讯录', address: 'dingtalk.com/contacts', type: '通讯录', category: '办公应用', status: '启用', description: '钉钉通讯录', tags: ['通讯录', '办公', '钉钉'] },
            { name: '飞书通讯录', address: 'feishu.cn/contacts', type: '通讯录', category: '办公应用', status: '启用', description: '飞书通讯录', tags: ['通讯录', '办公', '飞书'] },
            { name: 'Outlook People', address: 'outlook.office365.com/people', type: '通讯录', category: '办公应用', status: '启用', description: '微软Outlook通讯录', tags: ['通讯录', '办公', '微软'] },
            // 办公应用 - 审批
            { name: '企业微信审批', address: 'work.weixin.qq.com/approve', type: '审批', category: '办公应用', status: '启用', description: '企业微信审批', tags: ['审批', '办公', '微信'] },
            { name: '钉钉审批', address: 'dingtalk.com/approve', type: '审批', category: '办公应用', status: '启用', description: '钉钉审批', tags: ['审批', '办公', '钉钉'] },
            { name: '飞书审批', address: 'feishu.cn/approve', type: '审批', category: '办公应用', status: '启用', description: '飞书审批', tags: ['审批', '办公', '飞书'] },
            { name: '泛微OA审批', address: 'weaver.com.cn/oa', type: '审批', category: '办公应用', status: '启用', description: '泛微OA审批', tags: ['审批', 'OA', '泛微'] },
            // 办公应用 - 公告
            { name: '企业微信公告', address: 'work.weixin.qq.com/notice', type: '公告', category: '办公应用', status: '启用', description: '企业微信公告', tags: ['公告', '办公', '微信'] },
            { name: '钉钉公告', address: 'dingtalk.com/notice', type: '公告', category: '办公应用', status: '启用', description: '钉钉公告', tags: ['公告', '办公', '钉钉'] },
            { name: '飞书公告', address: 'feishu.cn/notice', type: '公告', category: '办公应用', status: '启用', description: '飞书公告', tags: ['公告', '办公', '飞书'] },
            { name: '泛微OA公告', address: 'weaver.com.cn/oa/notice', type: '公告', category: '办公应用', status: '启用', description: '泛微OA公告', tags: ['公告', 'OA', '泛微'] },
            // 办公应用 - 考勤
            { name: '企业微信考勤', address: 'work.weixin.qq.com/attendance', type: '考勤', category: '办公应用', status: '启用', description: '企业微信考勤', tags: ['考勤', '办公', '微信'] },
            { name: '钉钉考勤', address: 'dingtalk.com/attendance', type: '考勤', category: '办公应用', status: '启用', description: '钉钉考勤', tags: ['考勤', '办公', '钉钉'] },
            { name: '飞书考勤', address: 'feishu.cn/attendance', type: '考勤', category: '办公应用', status: '启用', description: '飞书考勤', tags: ['考勤', '办公', '飞书'] },
            { name: '泛微OA考勤', address: 'weaver.com.cn/oa/attendance', type: '考勤', category: '办公应用', status: '启用', description: '泛微OA考勤', tags: ['考勤', 'OA', '泛微'] },
            // 办公应用 - 报销
            { name: '企业微信报销', address: 'work.weixin.qq.com/expense', type: '报销', category: '办公应用', status: '启用', description: '企业微信报销', tags: ['报销', '办公', '微信'] },
            { name: '钉钉报销', address: 'dingtalk.com/expense', type: '报销', category: '办公应用', status: '启用', description: '钉钉报销', tags: ['报销', '办公', '钉钉'] },
            { name: '飞书报销', address: 'feishu.cn/expense', type: '报销', category: '办公应用', status: '启用', description: '飞书报销', tags: ['报销', '办公', '飞书'] },
            { name: '泛微OA报销', address: 'weaver.com.cn/oa/expense', type: '报销', category: '办公应用', status: '启用', description: '泛微OA报销', tags: ['报销', 'OA', '泛微'] },
            // 办公应用 - 资产
            { name: '企业微信资产管理', address: 'work.weixin.qq.com/asset', type: '资产', category: '办公应用', status: '启用', description: '企业微信资产管理', tags: ['资产', '办公', '微信'] },
            { name: '钉钉资产管理', address: 'dingtalk.com/asset', type: '资产', category: '办公应用', status: '启用', description: '钉钉资产管理', tags: ['资产', '办公', '钉钉'] },
            { name: '飞书资产管理', address: 'feishu.cn/asset', type: '资产', category: '办公应用', status: '启用', description: '飞书资产管理', tags: ['资产', '办公', '飞书'] },
            { name: '泛微OA资产', address: 'weaver.com.cn/oa/asset', type: '资产', category: '办公应用', status: '启用', description: '泛微OA资产管理', tags: ['资产', 'OA', '泛微'] },
            // 办公应用 - 知识库
            { name: '企业微信知识库', address: 'work.weixin.qq.com/wiki', type: '知识库', category: '办公应用', status: '启用', description: '企业微信知识库', tags: ['知识库', '办公', '微信'] },
            { name: '钉钉知识库', address: 'dingtalk.com/wiki', type: '知识库', category: '办公应用', status: '启用', description: '钉钉知识库', tags: ['知识库', '办公', '钉钉'] },
            { name: '飞书知识库', address: 'feishu.cn/wiki', type: '知识库', category: '办公应用', status: '启用', description: '飞书知识库', tags: ['知识库', '办公', '飞书'] },
            { name: 'Confluence', address: 'confluence.atlassian.com', type: '知识库', category: '办公应用', status: '启用', description: 'Atlassian Confluence知识库', tags: ['知识库', '协作', 'Atlassian'] },
            // 办公应用 - 门户
            { name: '泛微OA门户', address: 'weaver.com.cn/oa/portal', type: '门户', category: '办公应用', status: '启用', description: '泛微OA门户', tags: ['门户', 'OA', '泛微'] },
            { name: '致远OA门户', address: 'seeyon.com/portal', type: '门户', category: '办公应用', status: '启用', description: '致远OA门户', tags: ['门户', 'OA', '致远'] },
            { name: '蓝凌OA门户', address: 'landray.com.cn/portal', type: '门户', category: '办公应用', status: '启用', description: '蓝凌OA门户', tags: ['门户', 'OA', '蓝凌'] },
            { name: '金和OA门户', address: 'kinggrid.com/portal', type: '门户', category: '办公应用', status: '启用', description: '金和OA门户', tags: ['门户', 'OA', '金和'] },
            // 办公应用 - 人事
            { name: '北森人事管理', address: 'beisen.com/hr', type: '人事', category: '办公应用', status: '启用', description: '北森人事管理', tags: ['人事', '办公', '北森'] },
            { name: 'Moka招聘', address: 'moka.com/hr', type: '招聘', category: '办公应用', status: '启用', description: 'Moka招聘管理', tags: ['招聘', '办公', 'Moka'] },
            { name: '拉勾招聘', address: 'lagou.com/hr', type: '招聘', category: '办公应用', status: '启用', description: '拉勾招聘管理', tags: ['招聘', '办公', '拉勾'] },
            { name: '智联招聘', address: 'zhaopin.com/hr', type: '招聘', category: '办公应用', status: '启用', description: '智联招聘管理', tags: ['招聘', '办公', '智联'] },
            // 办公应用 - 培训
            { name: '云学堂', address: 'yunxuetang.cn', type: '培训', category: '办公应用', status: '启用', description: '云学堂企业培训', tags: ['培训', '学习', '云学堂'] },
            { name: '腾讯课堂', address: 'ke.qq.com', type: '培训', category: '办公应用', status: '启用', description: '腾讯课堂企业培训', tags: ['培训', '学习', '腾讯'] },
            { name: '网易云课堂', address: 'study.163.com', type: '培训', category: '办公应用', status: '启用', description: '网易云课堂企业培训', tags: ['培训', '学习', '网易'] },
            { name: '慕课网', address: 'imooc.com', type: '培训', category: '办公应用', status: '启用', description: '慕课网企业培训', tags: ['培训', '学习', '慕课'] },
            // 办公应用 - 绩效
            { name: '北森绩效管理', address: 'beisen.com/performance', type: '绩效', category: '办公应用', status: '启用', description: '北森绩效管理', tags: ['绩效', '办公', '北森'] },
            { name: 'Moka绩效', address: 'moka.com/performance', type: '绩效', category: '办公应用', status: '启用', description: 'Moka绩效管理', tags: ['绩效', '办公', 'Moka'] },
            { name: '致远OA绩效', address: 'seeyon.com/performance', type: '绩效', category: '办公应用', status: '启用', description: '致远OA绩效管理', tags: ['绩效', 'OA', '致远'] },
            { name: '泛微OA绩效', address: 'weaver.com.cn/oa/performance', type: '绩效', category: '办公应用', status: '启用', description: '泛微OA绩效管理', tags: ['绩效', 'OA', '泛微'] },
            // 办公应用 - 薪酬
            { name: '北森薪酬管理', address: 'beisen.com/payroll', type: '薪酬', category: '办公应用', status: '启用', description: '北森薪酬管理', tags: ['薪酬', '办公', '北森'] },
            { name: 'Moka薪酬', address: 'moka.com/payroll', type: '薪酬', category: '办公应用', status: '启用', description: 'Moka薪酬管理', tags: ['薪酬', '办公', 'Moka'] },
            { name: '致远OA薪酬', address: 'seeyon.com/payroll', type: '薪酬', category: '办公应用', status: '启用', description: '致远OA薪酬管理', tags: ['薪酬', 'OA', '致远'] },
            { name: '泛微OA薪酬', address: 'weaver.com.cn/oa/payroll', type: '薪酬', category: '办公应用', status: '启用', description: '泛微OA薪酬管理', tags: ['薪酬', 'OA', '泛微'] },
            // 办公应用 - 福利
            { name: '北森福利管理', address: 'beisen.com/welfare', type: '福利', category: '办公应用', status: '启用', description: '北森福利管理', tags: ['福利', '办公', '北森'] },
            { name: 'Moka福利', address: 'moka.com/welfare', type: '福利', category: '办公应用', status: '启用', description: 'Moka福利管理', tags: ['福利', '办公', 'Moka'] },
            { name: '致远OA福利', address: 'seeyon.com/welfare', type: '福利', category: '办公应用', status: '启用', description: '致远OA福利管理', tags: ['福利', 'OA', '致远'] },
            { name: '泛微OA福利', address: 'weaver.com.cn/oa/welfare', type: '福利', category: '办公应用', status: '启用', description: '泛微OA福利管理', tags: ['福利', 'OA', '泛微'] },
            // 开发工具 - 代码托管
            { name: 'Bitbucket Server', address: 'bitbucket.org/server', type: '代码仓库', category: '开发工具', status: '启用', description: 'Bitbucket企业版', tags: ['代码仓库', 'Git', 'Atlassian'] },
            { name: 'Gogs', address: 'gogs.io', type: '代码仓库', category: '开发工具', status: '启用', description: 'Gogs轻量级Git服务', tags: ['代码仓库', 'Git', '开源'] },
            { name: 'Phabricator', address: 'phacility.com', type: '代码仓库', category: '开发工具', status: '启用', description: 'Phabricator代码托管', tags: ['代码仓库', 'Git', 'Phabricator'] },
            { name: 'SourceForge', address: 'sourceforge.net', type: '代码仓库', category: '开发工具', status: '启用', description: 'SourceForge开源托管', tags: ['代码仓库', 'Git', '开源'] },
            // 开发工具 - CI/CD
            { idname: 'Bamboo', address: 'atlassian.com/software/bamboo', type: 'CI/CD工具', category: '开发工具', status: '启用', description: 'Atlassian Bamboo持续集成', tags: ['CI/CD', '自动化', 'Atlassian'] },
            { name: 'Drone CI', address: 'drone.io', type: 'CI/CD工具', category: '开发工具', status: '启用', description: 'Drone CI自动化', tags: ['CI/CD', '自动化', '开源'] },
            { name: 'Buildkite', address: 'buildkite.com', type: 'CI/CD工具', category: '开发工具', status: '启用', description: 'Buildkite持续集成', tags: ['CI/CD', '自动化', '云服务'] },
            { name: 'TeamCity', address: 'jetbrains.com/teamcity', type: 'CI/CD工具', category: '开发工具', status: '启用', description: 'JetBrains TeamCity', tags: ['CI/CD', '自动化', 'JetBrains'] },
            // 开发工具 - 监控
            { name: '阿里云云监控', address: 'cms.aliyun.com', type: '监控工具', category: '开发工具', status: '启用', description: '阿里云云监控', tags: ['监控', '云服务', '阿里云'] },
            { name: '腾讯云监控', address: 'cloud.tencent.com/product/monitor', type: '监控工具', category: '开发工具', status: '启用', description: '腾讯云监控', tags: ['监控', '云服务', '腾讯云'] },
            { name: '百度云监控', address: 'cloud.baidu.com/product/monitor', type: '监控工具', category: '开发工具', status: '启用', description: '百度云监控', tags: ['监控', '云服务', '百度云'] },
            { name: '华为云监控', address: 'support.huaweicloud.com/monitor', type: '监控工具', category: '开发工具', status: '启用', description: '华为云监控', tags: ['监控', '云服务', '华为云'] },
            // 云服务 - 云主机
            { name: '阿里云ECS', address: 'ecs.aliyun.com', type: '云主机', category: '云服务', status: '启用', description: '阿里云弹性计算ECS', tags: ['云主机', '云服务', '阿里云'] },
            { name: '腾讯云CVM', address: 'cloud.tencent.com/product/cvm', type: '云主机', category: '云服务', status: '启用', description: '腾讯云云服务器CVM', tags: ['云主机', '云服务', '腾讯云'] },
            { name: '华为云ECS', address: 'support.huaweicloud.com/ecs', type: '云主机', category: '云服务', status: '启用', description: '华为云弹性云服务器ECS', tags: ['云主机', '云服务', '华为云'] },
            { name: '百度云BCC', address: 'cloud.baidu.com/product/bcc', type: '云主机', category: '云服务', status: '启用', description: '百度云BCC云主机', tags: ['云主机', '云服务', '百度云'] },
            // 云服务 - 云数据库
            { name: '阿里云RDS', address: 'rds.aliyun.com', type: '数据库服务', category: '云服务', status: '启用', description: '阿里云关系型数据库RDS', tags: ['数据库', '云服务', '阿里云'] },
            { name: '腾讯云CDB', address: 'cloud.tencent.com/product/cdb', type: '数据库服务', category: '云服务', status: '启用', description: '腾讯云CDB数据库', tags: ['数据库', '云服务', '腾讯云'] },
            { name: '华为云RDS', address: 'support.huaweicloud.com/rds', type: '数据库服务', category: '云服务', status: '启用', description: '华为云RDS数据库', tags: ['数据库', '云服务', '华为云'] },
            { name: '百度云RDS', address: 'cloud.baidu.com/product/rds', type: '数据库服务', category: '云服务', status: '启用', description: '百度云RDS数据库', tags: ['数据库', '云服务', '百度云'] },
            // 企业管理 - ERP
            { name: '用友ERP', address: 'yonyou.com/erp', type: 'ERP', category: '企业管理', status: '启用', description: '用友ERP系统', tags: ['ERP', '企业管理', '用友'] },
            { name: '金蝶ERP', address: 'kingdee.com/erp', type: 'ERP', category: '企业管理', status: '启用', description: '金蝶ERP系统', tags: ['ERP', '企业管理', '金蝶'] },
            { name: 'SAP ERP', address: 'sap.com/erp', type: 'ERP', category: '企业管理', status: '启用', description: 'SAP ERP系统', tags: ['ERP', '企业管理', 'SAP'] },
            { name: 'Oracle ERP', address: 'oracle.com/erp', type: 'ERP', category: '企业管理', status: '启用', description: 'Oracle ERP系统', tags: ['ERP', '企业管理', 'Oracle'] },
            // 企业管理 - CRM
            { name: 'Salesforce CRM', address: 'salesforce.com/crm', type: 'CRM', category: '企业管理', status: '启用', description: 'Salesforce CRM系统', tags: ['CRM', '企业管理', 'Salesforce'] },
            { name: 'Zoho CRM', address: 'zoho.com/crm', type: 'CRM', category: '企业管理', status: '启用', description: 'Zoho CRM系统', tags: ['CRM', '企业管理', 'Zoho'] },
            { name: 'HubSpot CRM', address: 'hubspot.com/crm', type: 'CRM', category: '企业管理', status: '启用', description: 'HubSpot CRM系统', tags: ['CRM', '企业管理', 'HubSpot'] },
            { name: '纷享销客CRM', address: 'fxiaoke.com/crm', type: 'CRM', category: '企业管理', status: '启用', description: '纷享销客CRM系统', tags: ['CRM', '企业管理', '纷享销客'] },

            // 企业管理 - SCM
            { name: 'Oracle SCM', address: 'oracle.com/scm', type: 'SCM', category: '企业管理', status: '启用', description: 'Oracle供应链管理系统', tags: ['SCM', '供应链', 'Oracle'] },
            { name: 'SAP SCM', address: 'sap.com/scm', type: 'SCM', category: '企业管理', status: '启用', description: 'SAP供应链管理系统', tags: ['SCM', '供应链', 'SAP'] },
            { name: '用友SCM', address: 'yonyou.com/scm', type: 'SCM', category: '企业管理', status: '启用', description: '用友供应链管理系统', tags: ['SCM', '供应链', '用友'] },
            { id: 141, name: '金蝶SCM', address: 'kingdee.com/scm', type: 'SCM', category: '企业管理', status: '启用', description: '金蝶供应链管理系统', tags: ['SCM', '供应链', '金蝶'] },

            // 企业管理 - WMS
            { id: 142, name: 'Oracle WMS', address: 'oracle.com/wms', type: 'WMS', category: '企业管理', status: '启用', description: 'Oracle仓库管理系统', tags: ['WMS', '仓库管理', 'Oracle'] },
            { id: 143, name: 'SAP WMS', address: 'sap.com/wms', type: 'WMS', category: '企业管理', status: '启用', description: 'SAP仓库管理系统', tags: ['WMS', '仓库管理', 'SAP'] },
            { id: 144, name: '用友WMS', address: 'yonyou.com/wms', type: 'WMS', category: '企业管理', status: '启用', description: '用友仓库管理系统', tags: ['WMS', '仓库管理', '用友'] },
            { id: 145, name: '金蝶WMS', address: 'kingdee.com/wms', type: 'WMS', category: '企业管理', status: '启用', description: '金蝶仓库管理系统', tags: ['WMS', '仓库管理', '金蝶'] },

            // 企业管理 - MES
            { id: 146, name: 'SAP MES', address: 'sap.com/mes', type: 'MES', category: '企业管理', status: '启用', description: 'SAP制造执行系统', tags: ['MES', '制造', 'SAP'] },
            { id: 147, name: '西门子MES', address: 'siemens.com/mes', type: 'MES', category: '企业管理', status: '启用', description: '西门子制造执行系统', tags: ['MES', '制造', '西门子'] },
            { id: 148, name: '用友MES', address: 'yonyou.com/mes', type: 'MES', category: '企业管理', status: '启用', description: '用友制造执行系统', tags: ['MES', '制造', '用友'] },
            { id: 149, name: '金蝶MES', address: 'kingdee.com/mes', type: 'MES', category: '企业管理', status: '启用', description: '金蝶制造执行系统', tags: ['MES', '制造', '金蝶'] },

            // 企业管理 - PLM
            { id: 150, name: 'Siemens PLM', address: 'plm.automation.siemens.com', type: 'PLM', category: '企业管理', status: '启用', description: '西门子产品生命周期管理', tags: ['PLM', '产品管理', '西门子'] },
            { id: 151, name: 'PTC PLM', address: 'ptc.com/plm', type: 'PLM', category: '企业管理', status: '启用', description: 'PTC产品生命周期管理', tags: ['PLM', '产品管理', 'PTC'] },
            { id: 152, name: 'Dassault PLM', address: '3ds.com/plm', type: 'PLM', category: '企业管理', status: '启用', description: '达索产品生命周期管理', tags: ['PLM', '产品管理', '达索'] },
            { id: 153, name: '用友PLM', address: 'yonyou.com/plm', type: 'PLM', category: '企业管理', status: '启用', description: '用友产品生命周期管理', tags: ['PLM', '产品管理', '用友'] },

            // 安全工具 - 防火墙
            { id: 154, name: '思科防火墙', address: 'cisco.com/firewall', type: '防火墙', category: '安全工具', status: '启用', description: '思科企业级防火墙', tags: ['防火墙', '安全', '思科'] },
            { id: 155, name: '华为防火墙', address: 'huawei.com/firewall', type: '防火墙', category: '安全工具', status: '启用', description: '华为企业级防火墙', tags: ['防火墙', '安全', '华为'] },
            { id: 156, name: 'H3C防火墙', address: 'h3c.com/firewall', type: '防火墙', category: '安全工具', status: '启用', description: 'H3C企业级防火墙', tags: ['防火墙', '安全', 'H3C'] },
            { id: 157, name: 'Juniper防火墙', address: 'juniper.net/firewall', type: '防火墙', category: '安全工具', status: '启用', description: 'Juniper企业级防火墙', tags: ['防火墙', '安全', 'Juniper'] },

            // 安全工具 - 入侵检测
            { id: 158, name: 'Snort IDS', address: 'snort.org', type: '入侵检测', category: '安全工具', status: '启用', description: 'Snort入侵检测系统', tags: ['入侵检测', '安全', '开源'] },
            { id: 159, name: 'Suricata IDS', address: 'suricata.io', type: '入侵检测', category: '安全工具', status: '启用', description: 'Suricata入侵检测系统', tags: ['入侵检测', '安全', '开源'] },
            { id: 160, name: '思科IDS', address: 'cisco.com/ids', type: '入侵检测', category: '安全工具', status: '启用', description: '思科入侵检测系统', tags: ['入侵检测', '安全', '思科'] },
            { id: 161, name: '华为IDS', address: 'huawei.com/ids', type: '入侵检测', category: '安全工具', status: '启用', description: '华为入侵检测系统', tags: ['入侵检测', '安全', '华为'] },

            // 安全工具 - 漏洞扫描
            { id: 162, name: 'Nessus', address: 'tenable.com/nessus', type: '漏洞扫描', category: '安全工具', status: '启用', description: 'Nessus漏洞扫描器', tags: ['漏洞扫描', '安全', 'Tenable'] },
            { id: 163, name: 'OpenVAS', address: 'openvas.org', type: '漏洞扫描', category: '安全工具', status: '启用', description: 'OpenVAS漏洞扫描器', tags: ['漏洞扫描', '安全', '开源'] },
            { id: 164, name: 'Qualys', address: 'qualys.com', type: '漏洞扫描', category: '安全工具', status: '启用', description: 'Qualys漏洞扫描服务', tags: ['漏洞扫描', '安全', 'Qualys'] },
            { id: 165, name: 'Rapid7', address: 'rapid7.com', type: '漏洞扫描', category: '安全工具', status: '启用', description: 'Rapid7漏洞扫描服务', tags: ['漏洞扫描', '安全', 'Rapid7'] },

            // 安全工具 - 安全运营中心
            { id: 166, name: 'IBM QRadar', address: 'ibm.com/qradar', type: '安全运营中心', category: '安全工具', status: '启用', description: 'IBM QRadar安全运营中心', tags: ['安全运营', 'SIEM', 'IBM'] },
            { id: 167, name: 'Splunk SIEM', address: 'splunk.com/siem', type: '安全运营中心', category: '安全工具', status: '启用', description: 'Splunk安全运营中心', tags: ['安全运营', 'SIEM', 'Splunk'] },
            { id: 168, name: 'LogRhythm', address: 'logrhythm.com', type: '安全运营中心', category: '安全工具', status: '启用', description: 'LogRhythm安全运营中心', tags: ['安全运营', 'SIEM', 'LogRhythm'] },
            { id: 169, name: 'Exabeam', address: 'exabeam.com', type: '安全运营中心', category: '安全工具', status: '启用', description: 'Exabeam安全运营中心', tags: ['安全运营', 'SIEM', 'Exabeam'] },

            // 数据分析 - 商业智能
            { id: 170, name: 'Tableau', address: 'tableau.com', type: '商业智能', category: '数据分析', status: '启用', description: 'Tableau数据可视化平台', tags: ['商业智能', '可视化', 'Tableau'] },
            { id: 171, name: 'Power BI', address: 'powerbi.microsoft.com', type: '商业智能', category: '数据分析', status: '启用', description: '微软Power BI商业智能', tags: ['商业智能', '可视化', '微软'] },
            { id: 172, name: 'QlikView', address: 'qlik.com', type: '商业智能', category: '数据分析', status: '启用', description: 'Qlik商业智能平台', tags: ['商业智能', '可视化', 'Qlik'] },
            { id: 173, name: 'FineBI', address: 'fanruan.com/finebi', type: '商业智能', category: '数据分析', status: '启用', description: '帆软FineBI商业智能', tags: ['商业智能', '可视化', '帆软'] },

            // 数据分析 - 大数据平台
            { id: 174, name: 'Hadoop', address: 'hadoop.apache.org', type: '大数据平台', category: '数据分析', status: '启用', description: 'Apache Hadoop大数据平台', tags: ['大数据', '分布式', 'Apache'] },
            { id: 175, name: 'Spark', address: 'spark.apache.org', type: '大数据平台', category: '数据分析', status: '启用', description: 'Apache Spark大数据处理', tags: ['大数据', '分布式', 'Apache'] },
            { id: 176, name: 'Flink', address: 'flink.apache.org', type: '大数据平台', category: '数据分析', status: '启用', description: 'Apache Flink流处理平台', tags: ['大数据', '流处理', 'Apache'] },
            { id: 177, name: 'Kafka', address: 'kafka.apache.org', type: '大数据平台', category: '数据分析', status: '启用', description: 'Apache Kafka消息队列', tags: ['大数据', '消息队列', 'Apache'] },

            // 数据分析 - 数据仓库
            { id: 178, name: 'Snowflake', address: 'snowflake.com', type: '数据仓库', category: '数据分析', status: '启用', description: 'Snowflake云数据仓库', tags: ['数据仓库', '云服务', 'Snowflake'] },
            { id: 179, name: 'Amazon Redshift', address: 'aws.amazon.com/redshift', type: '数据仓库', category: '数据分析', status: '启用', description: '亚马逊Redshift数据仓库', tags: ['数据仓库', '云服务', 'AWS'] },
            { id: 180, name: 'Google BigQuery', address: 'cloud.google.com/bigquery', type: '数据仓库', category: '数据分析', status: '启用', description: '谷歌BigQuery数据仓库', tags: ['数据仓库', '云服务', '谷歌'] },
            { id: 181, name: '阿里云MaxCompute', address: 'www.aliyun.com/product/odps', type: '数据仓库', category: '数据分析', status: '启用', description: '阿里云MaxCompute数据仓库', tags: ['数据仓库', '云服务', '阿里云'] },

            // 数据分析 - 机器学习
            { id: 182, name: 'TensorFlow', address: 'tensorflow.org', type: '机器学习', category: '数据分析', status: '启用', description: 'Google TensorFlow机器学习框架', tags: ['机器学习', '深度学习', '谷歌'] },
            { id: 183, name: 'PyTorch', address: 'pytorch.org', type: '机器学习', category: '数据分析', status: '启用', description: 'Facebook PyTorch机器学习框架', tags: ['机器学习', '深度学习', 'Facebook'] },
            { id: 184, name: 'Scikit-learn', address: 'scikit-learn.org', type: '机器学习', category: '数据分析', status: '启用', description: 'Scikit-learn机器学习库', tags: ['机器学习', 'Python', '开源'] },
            { id: 185, name: '阿里云PAI', address: 'www.aliyun.com/product/pai', type: '机器学习', category: '数据分析', status: '启用', description: '阿里云机器学习平台PAI', tags: ['机器学习', '云服务', '阿里云'] },

            // 通信服务 - 即时通讯
            { id: 186, name: 'Slack', address: 'slack.com', type: '即时通讯', category: '通信服务', status: '启用', description: 'Slack团队协作平台', tags: ['即时通讯', '协作', 'Slack'] },
            { id: 187, name: 'Discord', address: 'discord.com', type: '即时通讯', category: '通信服务', status: '启用', description: 'Discord游戏语音平台', tags: ['即时通讯', '语音', 'Discord'] },
            { id: 188, name: 'Telegram', address: 'telegram.org', type: '即时通讯', category: '通信服务', status: '启用', description: 'Telegram即时通讯', tags: ['即时通讯', '加密', 'Telegram'] },
            { id: 189, name: 'WhatsApp', address: 'whatsapp.com', type: '即时通讯', category: '通信服务', status: '启用', description: 'WhatsApp即时通讯', tags: ['即时通讯', '移动', 'WhatsApp'] },

            // 通信服务 - 语音通话
            { name: 'Skype', address: 'skype.com', type: '语音通话', category: '通信服务', status: '启用', description: 'Skype语音通话服务', tags: ['语音通话', '视频', 'Skype'] },
            { name: 'Viber', address: 'viber.com', type: '语音通话', category: '通信服务', status: '启用', description: 'Viber语音通话服务', tags: ['语音通话', '移动', 'Viber'] },
            { name: 'Line', address: 'line.me', type: '语音通话', category: '通信服务', status: '启用', description: 'Line语音通话服务', tags: ['语音通话', '移动', 'Line'] },
            { name: 'WeChat', address: 'wechat.com', type: '语音通话', category: '通信服务', status: '启用', description: '微信语音通话服务', tags: ['语音通话', '移动', '微信'] },

            // 通信服务 - 短信服务
            { name: '阿里云短信', address: 'www.aliyun.com/product/sms', type: '短信服务', category: '通信服务', status: '启用', description: '阿里云短信服务', tags: ['短信服务', '云服务', '阿里云'] },
            { name: '腾讯云短信', address: 'cloud.tencent.com/product/sms', type: '短信服务', category: '通信服务', status: '启用', description: '腾讯云短信服务', tags: ['短信服务', '云服务', '腾讯云'] },
            { name: '华为云短信', address: 'support.huaweicloud.com/sms', type: '短信服务', category: '通信服务', status: '启用', description: '华为云短信服务', tags: ['短信服务', '云服务', '华为云'] },
            { name: 'Twilio', address: 'twilio.com/sms', type: '短信服务', category: '通信服务', status: '启用', description: 'Twilio短信服务', tags: ['短信服务', '云服务', 'Twilio'] },

            // 通信服务 - 邮件服务
            { name: 'SendGrid', address: 'sendgrid.com', type: '邮件服务', category: '通信服务', status: '启用', description: 'SendGrid邮件服务', tags: ['邮件服务', '云服务', 'SendGrid'] },
            { name: 'Mailgun', address: 'mailgun.com', type: '邮件服务', category: '通信服务', status: '启用', description: 'Mailgun邮件服务', tags: ['邮件服务', '云服务', 'Mailgun'] },
            { name: 'Amazon SES', address: 'aws.amazon.com/ses', type: '邮件服务', category: '通信服务', status: '启用', description: '亚马逊SES邮件服务', tags: ['邮件服务', '云服务', 'AWS'] }
        ];

        for (const app of defaultApps) {
            await this.db.builtinApps.add(app);
        }

        console.log(`✅ 已初始化 ${defaultApps.length} 个内置应用`);
    },

    // 初始化自定义应用数据
    async seedCustomApps() {
        const defaultApps = [
            {
                name: '内部OA系统',
                address: 'oa.company.com',
                type: '办公系统',
                status: '启用',
                createTime: new Date().toISOString()
            },
            {
                name: '项目管理系统',
                address: 'pm.company.com',
                type: '项目管理',
                status: '启用',
                createTime: new Date().toISOString()
            },
            {
                name: '客户关系管理',
                address: 'crm.company.com',
                type: 'CRM系统',
                status: '禁用',
                createTime: new Date().toISOString()
            }
        ];

        for (const app of defaultApps) {
            await this.db.customApps.add(app);
        }

        console.log(`✅ 已初始化 ${defaultApps.length} 个自定义应用`);
    },

    // 初始化API密钥数据
    async seedApiKeys() {
        const defaultKeys = [
            {
                purpose: '测试环境接口调用',
                accessKeyId: 'MDwH1dVWvuDGWXYAWggHyajC',
                accessKeySecret: 'Mz8KvlP6nTq9DeYLwW5qRpVxXy71CcBjLoGUfKMZ',
                role: '开发者',
                status: true,
                permission: '完全访问权限',
                createTime: new Date().toISOString()
            },
            {
                purpose: '生产环境数据同步',
                accessKeyId: 'KLmN9pQrStUvWxYzAbCdEfGh',
                accessKeySecret: 'uFTVY3qsb8x0PNjm5HCi2AalDdWeZgoSKXtRrN9J',
                role: '管理员',
                status: true,
                permission: '完全访问权限',
                createTime: new Date().toISOString()
            },
            {
                purpose: '移动端API调用',
                accessKeyId: 'AbCdEfGhIjKlMnOpQrStUvWx',
                accessKeySecret: 'ZnbvK3LdFqgJYRcMhW9ipOEuA2Xt5cyPs0oUN7Xz',
                role: '开发者',
                status: false,
                permission: '只读访问权限',
                createTime: new Date().toISOString()
            },
            {
                purpose: '第三方集成接口',
                accessKeyId: 'XyZaBcDeFgHiJkLmNoPqRsTu',
                accessKeySecret: 'oVq1yW9ZBnMJHg2EXaxrC6fdnFzKmTYsLCLt30Ae',
                role: '管理员',
                status: true,
                permission: '自定义权限',
                createTime: new Date().toISOString()
            },
            {
                purpose: '数据分析服务',
                accessKeyId: 'VwXyZaBcDeFgHiJkLmNoPqRs',
                accessKeySecret: 'rKYzOa0L9wJUvMPqgFsTh4i3N2d7ceXtBEWVCGmn',
                role: '开发者',
                status: true,
                permission: '只读访问权限',
                createTime: new Date().toISOString()
            },
            {
                purpose: '文件上传服务',
                accessKeyId: 'TuVwXyZaBcDeFgHiJkLmNoPq',
                accessKeySecret: 'tJEFmPvBLdYwnzRA60UX39IqGfyshKC8oHOtklMW',
                role: '开发者',
                status: false,
                permission: '自定义权限',
                createTime: new Date().toISOString()
            }
        ];

        for (const key of defaultKeys) {
            await this.db.apiKeys.add(key);
        }

        console.log(`✅ 已初始化 ${defaultKeys.length} 个API密钥`);
    },

    // 初始化数字水印配置数据
    async seedWatermarkConfigs() {
        const defaultConfigs = [
            {
                name: '默认水印配置',
                enabled: true,
                type: 'visible',
                content: JSON.stringify([
                    { type: 'name', label: '姓名' },
                    { type: 'time', label: '时间' }
                ]),
                style: JSON.stringify({
                    color: '#000000',
                    opacity: '20%',
                    fontSize: '28px',
                    rotation: '45°',
                    rowSpacing: '100px',
                    columnSpacing: '100px'
                }),
                timing: JSON.stringify({
                    upload: true,
                    download: false,
                    external: false
                }),
                scope: JSON.stringify({
                    type: 'all',
                    selectedDepartments: [],
                    selectedDevices: []
                }),
                createTime: new Date().toISOString(),
                lastUpdated: new Date().toISOString()
            }
        ];

        for (const config of defaultConfigs) {
            await this.db.watermarkConfigs.add(config);
        }

        console.log(`✅ 已初始化 ${defaultConfigs.length} 个水印配置`);
    },

    // 初始化部门数据
    async seedDepartments() {
        const defaultDepartments = [
            { name: '技术部', code: 'TECH', manager: '张技术', employeeCount: 25, description: '负责产品研发和技术架构', status: true, createTime: new Date().toISOString(), lastUpdated: new Date().toISOString() },
            { name: '产品部', code: 'PROD', manager: '李产品', employeeCount: 12, description: '负责产品规划和需求管理', status: true, createTime: new Date().toISOString(), lastUpdated: new Date().toISOString() },
            { name: '设计部', code: 'DESIGN', manager: '王设计', employeeCount: 8, description: '负责UI/UX设计和视觉创意', status: true, createTime: new Date().toISOString(), lastUpdated: new Date().toISOString() },
            { name: '运营部', code: 'OPS', manager: '赵运营', employeeCount: 15, description: '负责产品运营和用户增长', status: true, createTime: new Date().toISOString(), lastUpdated: new Date().toISOString() },
            { name: '市场部', code: 'MKT', manager: '钱市场', employeeCount: 10, description: '负责品牌推广和市场活动', status: true, createTime: new Date().toISOString(), lastUpdated: new Date().toISOString() },
            { name: '销售部', code: 'SALES', manager: '孙销售', employeeCount: 20, description: '负责客户开发和业务拓展', status: true, createTime: new Date().toISOString(), lastUpdated: new Date().toISOString() },
            { name: '人事部', code: 'HR', manager: '周人事', employeeCount: 6, description: '负责人力资源管理和招聘', status: true, createTime: new Date().toISOString(), lastUpdated: new Date().toISOString() },
            { name: '财务部', code: 'FIN', manager: '吴财务', employeeCount: 8, description: '负责财务管理和资金运作', status: true, createTime: new Date().toISOString(), lastUpdated: new Date().toISOString() },
            { name: '法务部', code: 'LEGAL', manager: '郑法务', employeeCount: 4, description: '负责法律事务和合规管理', status: true, createTime: new Date().toISOString(), lastUpdated: new Date().toISOString() },
            { name: '行政部', code: 'ADMIN', manager: '王行政', employeeCount: 5, description: '负责日常行政和后勤保障', status: true, createTime: new Date().toISOString(), lastUpdated: new Date().toISOString() },
            { name: '客服部', code: 'CS', manager: '刘客服', employeeCount: 12, description: '负责客户服务和售后支持', status: true, createTime: new Date().toISOString(), lastUpdated: new Date().toISOString() },
            { name: '质量部', code: 'QA', manager: '陈质量', employeeCount: 6, description: '负责质量控制和测试管理', status: true, createTime: new Date().toISOString(), lastUpdated: new Date().toISOString() }
        ];

        for (const dept of defaultDepartments) {
            await this.db.departments.add(dept);
        }

        console.log(`✅ 已初始化 ${defaultDepartments.length} 个部门`);
    },

    // 初始化设备数据
    async seedDevices() {
        const defaultDevices = [
            { name: '办公电脑-001', type: '台式机', location: '技术部办公区', ip: '192.168.1.101', status: true, createTime: new Date().toISOString(), lastUpdated: new Date().toISOString() },
            { name: '办公电脑-002', type: '台式机', location: '产品部办公区', ip: '192.168.1.102', status: true, createTime: new Date().toISOString(), lastUpdated: new Date().toISOString() },
            { name: '办公电脑-003', type: '台式机', location: '设计部办公区', ip: '192.168.1.103', status: true, createTime: new Date().toISOString(), lastUpdated: new Date().toISOString() },
            { name: '办公电脑-004', type: '台式机', location: '技术部办公区', ip: '192.168.1.104', status: true, createTime: new Date().toISOString(), lastUpdated: new Date().toISOString() },
            { name: '办公电脑-005', type: '台式机', location: '技术部办公区', ip: '192.168.1.105', status: true, createTime: new Date().toISOString(), lastUpdated: new Date().toISOString() },
            { name: '笔记本-001', type: '笔记本电脑', location: '移动办公', ip: '192.168.1.106', status: true, createTime: new Date().toISOString(), lastUpdated: new Date().toISOString() },
            { name: '笔记本-002', type: '笔记本电脑', location: '移动办公', ip: '192.168.1.107', status: true, createTime: new Date().toISOString(), lastUpdated: new Date().toISOString() },
            { name: '服务器-001', type: '服务器', location: '机房A', ip: '192.168.1.201', status: true, createTime: new Date().toISOString(), lastUpdated: new Date().toISOString() },
            { name: '服务器-002', type: '服务器', location: '机房B', ip: '192.168.1.202', status: true, createTime: new Date().toISOString(), lastUpdated: new Date().toISOString() },
            { name: '平板-001', type: '平板电脑', location: '会议室', ip: '192.168.1.108', status: true, createTime: new Date().toISOString(), lastUpdated: new Date().toISOString() }
        ];

        for (const device of defaultDevices) {
            await this.db.devices.add(device);
        }

        console.log(`✅ 已初始化 ${defaultDevices.length} 台设备`);
    },

    // ===== 缓存管理 =====
    async loadAllCache() {
        try {
            // 加载内网应用
            const internalApps = await this.db.internalApps.toArray();
            internalApps.forEach(app => {
                this.cache.internalApps.set(app.id, app);
            });

            // 加载跨境应用
            const crossBorderApps = await this.db.crossBorderApps.toArray();
            crossBorderApps.forEach(app => {
                this.cache.crossBorderApps.set(app.id, app);
            });

            // 加载识别策略
            const recognitionStrategies = await this.db.recognitionStrategies.toArray();
            recognitionStrategies.forEach(strategy => {
                this.cache.recognitionStrategies.set(strategy.id, strategy);
            });

            // 加载染色策略
            const coloringStrategies = await this.db.coloringStrategies.toArray();
            coloringStrategies.forEach(strategy => {
                this.cache.coloringStrategies.set(strategy.id, strategy);
            });

            // 加载内置应用
            const builtinApps = await this.db.builtinApps.toArray();
            builtinApps.forEach(app => {
                this.cache.builtinApps.set(app.id, app);
            });

            // 加载自定义应用
            const customApps = await this.db.customApps.toArray();
            customApps.forEach(app => {
                this.cache.customApps.set(app.id, app);
            });

            // 加载水印配置
            const watermarkConfigs = await this.db.watermarkConfigs.toArray();
            watermarkConfigs.forEach(config => {
                this.cache.watermarkConfigs.set(config.id, config);
            });

            // 加载部门数据
            const departments = await this.db.departments.toArray();
            departments.forEach(dept => {
                this.cache.departments.set(dept.id, dept);
            });

            // 加载设备数据
            const devices = await this.db.devices.toArray();
            devices.forEach(device => {
                this.cache.devices.set(device.id, device);
            });

            // 加载API密钥
            const apiKeys = await this.db.apiKeys.toArray();
            apiKeys.forEach(key => {
                this.cache.apiKeys.set(key.id, key);
            });

            console.log('✅ 缓存加载完成:', {
                internalApps: this.cache.internalApps.size,
                crossBorderApps: this.cache.crossBorderApps.size,
                recognitionStrategies: this.cache.recognitionStrategies.size,
                coloringStrategies: this.cache.coloringStrategies.size,
                builtinApps: this.cache.builtinApps.size,
                customApps: this.cache.customApps.size,
                watermarkConfigs: this.cache.watermarkConfigs.size,
                departments: this.cache.departments.size,
                devices: this.cache.devices.size,
                apiKeys: this.cache.apiKeys.size
            });

        } catch (error) {
            console.error('❌ 缓存加载失败:', error);
        }
    },

    // ===== 事件系统 =====
    // 注册更新监听
    onUpdate(dataType, callback) {
        if (this.eventListeners[dataType]) {
            this.eventListeners[dataType].push(callback);
        }
    },

    // 触发更新事件
    triggerUpdate(dataType, data) {
        if (this.eventListeners[dataType]) {
            this.eventListeners[dataType].forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error('❌ 事件回调执行失败:', error);
                }
            });
        }
    },

    // ===== 内网应用管理 =====
    internalApps: {
        // 获取所有内网应用
        async getAll(filters = {}) {
            try {
                let apps = await AppDataManagerV2.db.internalApps.toArray();

                // 应用筛选
                if (filters.search) {
                    const keyword = filters.search.toLowerCase();
                    apps = apps.filter(app =>
                        app.name.toLowerCase().includes(keyword) ||
                        (app.description && app.description.toLowerCase().includes(keyword)) ||
                        (app.scope && app.scope.toLowerCase().includes(keyword))
                    );
                }

                if (filters.scope) {
                    apps = apps.filter(app => app.scope === filters.scope);
                }

                if (filters.status !== undefined) {
                    apps = apps.filter(app => app.status === filters.status);
                }

                return apps;
            } catch (error) {
                console.error('❌ 获取内网应用失败:', error);
                return [];
            }
        },

        // 根据ID获取应用
        async getById(id) {
            try {
                // 先从缓存获取
                if (AppDataManagerV2.cache.internalApps.has(id)) {
                    return AppDataManagerV2.cache.internalApps.get(id);
                }

                // 从数据库获取
                const app = await AppDataManagerV2.db.internalApps.get(id);
                if (app) {
                    AppDataManagerV2.cache.internalApps.set(id, app);
                }
                return app;
            } catch (error) {
                console.error('❌ 获取内网应用失败:', error);
                return null;
            }
        },

        // 创建内网应用
        async create(appData) {
            try {
                const app = {
                    ...appData,
                    createTime: new Date().toISOString(),
                    lastUpdated: new Date().toISOString()
                };

                const id = await AppDataManagerV2.db.internalApps.add(app);
                app.id = id;

                // 更新缓存
                AppDataManagerV2.cache.internalApps.set(id, app);

                // 触发更新事件
                AppDataManagerV2.triggerUpdate('internalApps', { type: 'create', data: app });

                console.log('✅ 内网应用创建成功:', app.name);
                return app;
            } catch (error) {
                console.error('❌ 创建内网应用失败:', error);
                throw error;
            }
        },

        // 更新内网应用
        async update(id, updates) {
            try {
                const updateData = {
                    ...updates,
                    lastUpdated: new Date().toISOString()
                };

                await AppDataManagerV2.db.internalApps.update(id, updateData);

                // 更新缓存
                const cachedApp = AppDataManagerV2.cache.internalApps.get(id);
                if (cachedApp) {
                    Object.assign(cachedApp, updateData);
                }

                // 触发更新事件
                AppDataManagerV2.triggerUpdate('internalApps', { type: 'update', id, data: updateData });

                console.log('✅ 内网应用更新成功:', id);
                return true;
            } catch (error) {
                console.error('❌ 更新内网应用失败:', error);
                throw error;
            }
        },

        // 删除内网应用
        async delete(id) {
            try {
                await AppDataManagerV2.db.internalApps.delete(id);

                // 从缓存删除
                AppDataManagerV2.cache.internalApps.delete(id);

                // 触发更新事件
                AppDataManagerV2.triggerUpdate('internalApps', { type: 'delete', id });

                console.log('✅ 内网应用删除成功:', id);
                return true;
            } catch (error) {
                console.error('❌ 删除内网应用失败:', error);
                throw error;
            }
        },

        // 批量更新状态
        async batchUpdateStatus(ids, status) {
            try {
                const results = [];
                const errors = [];

                for (const id of ids) {
                    try {
                        await this.update(id, { status });
                        results.push({ id, success: true });
                    } catch (error) {
                        errors.push({ id, error: error.message });
                    }
                }

                return {
                    success: errors.length === 0,
                    results,
                    errors
                };
            } catch (error) {
                console.error('❌ 批量更新状态失败:', error);
                throw error;
            }
        },

        // 批量删除
        async batchDelete(ids) {
            try {
                const results = [];
                const errors = [];

                for (const id of ids) {
                    try {
                        await this.delete(id);
                        results.push({ id, success: true });
                    } catch (error) {
                        errors.push({ id, error: error.message });
                    }
                }

                return {
                    success: errors.length === 0,
                    results,
                    errors
                };
            } catch (error) {
                console.error('❌ 批量删除失败:', error);
                throw error;
            }
        }
    },

    // ===== 流量染色策略管理 =====
    coloringStrategies: {
        // 数据适配器模式 - 支持 IndexedDB/API 无感切换
        dataAdapter: {
            mode: 'indexeddb', // 'indexeddb' | 'api'

            // 设置数据源模式
            setMode(mode) {
                this.mode = mode;
                console.log(`🔄 流量染色策略数据源切换为: ${mode}`);
            },

            // 统一的数据获取接口
            async getData(operation, ...args) {
                try {
                    if (this.mode === 'api') {
                        return await this.apiOperation(operation, ...args);
                    } else {
                        return await this.indexedDBOperation(operation, ...args);
                    }
                } catch (error) {
                    console.error(`❌ 数据操作失败 [${operation}]:`, error);
                    throw error;
                }
            },

            // IndexedDB 操作
            async indexedDBOperation(operation, ...args) {
                const db = AppDataManagerV2.db;
                switch (operation) {
                    case 'getAll':
                        return await db.coloringStrategies.toArray();
                    case 'getById':
                        return await db.coloringStrategies.get(args[0]);
                    case 'add':
                        return await db.coloringStrategies.add(args[0]);
                    case 'update':
                        return await db.coloringStrategies.update(args[0], args[1]);
                    case 'delete':
                        return await db.coloringStrategies.delete(args[0]);
                    case 'bulkUpdate':
                        const [ids, updates] = args;
                        return await Promise.all(ids.map(id => db.coloringStrategies.update(id, updates)));
                    case 'bulkDelete':
                        return await db.coloringStrategies.bulkDelete(args[0]);
                    default:
                        throw new Error(`未知操作: ${operation}`);
                }
            },

            // API 操作模拟
            async apiOperation(operation, ...args) {
                // 模拟API延迟
                await new Promise(resolve => setTimeout(resolve, 100));

                switch (operation) {
                    case 'getAll':
                        const response = await fetch('/api/coloring-strategies');
                        return await response.json();
                    case 'getById':
                        const getResponse = await fetch(`/api/coloring-strategies/${args[0]}`);
                        return await getResponse.json();
                    case 'add':
                        const addResponse = await fetch('/api/coloring-strategies', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(args[0])
                        });
                        return await addResponse.json();
                    case 'update':
                        const updateResponse = await fetch(`/api/coloring-strategies/${args[0]}`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(args[1])
                        });
                        return await updateResponse.json();
                    case 'delete':
                        await fetch(`/api/coloring-strategies/${args[0]}`, { method: 'DELETE' });
                        return { success: true };
                    case 'bulkUpdate':
                        const [ids, updates] = args;
                        const bulkUpdateResponse = await fetch('/api/coloring-strategies/bulk-update', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ ids, updates })
                        });
                        return await bulkUpdateResponse.json();
                    case 'bulkDelete':
                        await fetch('/api/coloring-strategies/bulk-delete', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ ids: args[0] })
                        });
                        return { success: true };
                    default:
                        throw new Error(`未知API操作: ${operation}`);
                }
            }
        },

        // 获取所有策略
        async getAll(filters = {}) {
            try {
                let strategies = await this.dataAdapter.getData('getAll');

                // 应用过滤器
                if (filters.status !== undefined) {
                    strategies = strategies.filter(s => s.status === filters.status);
                }
                if (filters.scope) {
                    strategies = strategies.filter(s => s.scope === filters.scope);
                }
                if (filters.search) {
                    const keyword = filters.search.toLowerCase();
                    strategies = strategies.filter(s =>
                        s.name.toLowerCase().includes(keyword) ||
                        s.note.toLowerCase().includes(keyword) ||
                        s.scope.toLowerCase().includes(keyword) ||
                        s.techniques.some(tech => tech.toLowerCase().includes(keyword))
                    );
                }

                // 排序
                if (filters.sortBy) {
                    strategies.sort((a, b) => {
                        const field = filters.sortBy;
                        const order = filters.sortOrder === 'desc' ? -1 : 1;

                        if (field === 'createTime') {
                            return (new Date(a[field]) - new Date(b[field])) * order;
                        }
                        return a[field].localeCompare(b[field]) * order;
                    });
                }

                // 更新缓存
                strategies.forEach(strategy => {
                    AppDataManagerV2.cache.coloringStrategies.set(strategy.id, strategy);
                });

                return strategies;
            } catch (error) {
                console.error('❌ 获取流量染色策略失败:', error);
                throw error;
            }
        },

        // 获取单个策略
        async getById(id) {
            try {
                // 先尝试从缓存获取
                if (AppDataManagerV2.cache.coloringStrategies.has(id)) {
                    return AppDataManagerV2.cache.coloringStrategies.get(id);
                }

                const strategy = await this.dataAdapter.getData('getById', id);

                if (strategy) {
                    AppDataManagerV2.cache.coloringStrategies.set(id, strategy);
                }

                return strategy;
            } catch (error) {
                console.error('❌ 获取流量染色策略失败:', error);
                throw error;
            }
        },

        // 添加新策略
        async add(strategyData) {
            try {
                // 数据验证
                this.validateStrategy(strategyData);

                // 添加时间戳
                const newStrategy = {
                    ...strategyData,
                    createTime: new Date().toISOString(),
                    lastUpdated: new Date().toISOString()
                };

                const result = await this.dataAdapter.getData('add', newStrategy);
                const addedStrategy = result.id ? { ...newStrategy, id: result.id } : result;

                // 更新缓存
                AppDataManagerV2.cache.coloringStrategies.set(addedStrategy.id, addedStrategy);

                // 触发事件
                AppDataManagerV2.eventListeners.coloringStrategies.forEach(listener => {
                    listener({ type: 'add', data: addedStrategy });
                });

                console.log('✅ 流量染色策略添加成功:', addedStrategy.name);
                return addedStrategy;
            } catch (error) {
                console.error('❌ 添加流量染色策略失败:', error);
                throw error;
            }
        },

        // 更新策略
        async update(id, updates) {
            try {
                // 数据验证
                if (updates.name || updates.techniques || updates.scope) {
                    this.validateStrategy({ ...updates, id });
                }

                const updateData = {
                    ...updates,
                    lastUpdated: new Date().toISOString()
                };

                await this.dataAdapter.getData('update', id, updateData);

                // 更新缓存
                const cachedStrategy = AppDataManagerV2.cache.coloringStrategies.get(id);
                if (cachedStrategy) {
                    const updatedStrategy = { ...cachedStrategy, ...updateData };
                    AppDataManagerV2.cache.coloringStrategies.set(id, updatedStrategy);

                    // 触发事件
                    AppDataManagerV2.eventListeners.coloringStrategies.forEach(listener => {
                        listener({ type: 'update', data: updatedStrategy, changes: updateData });
                    });
                }

                console.log('✅ 流量染色策略更新成功:', id);
                return true;
            } catch (error) {
                console.error('❌ 更新流量染色策略失败:', error);
                throw error;
            }
        },

        // 删除策略
        async delete(id) {
            try {
                await this.dataAdapter.getData('delete', id);

                // 从缓存移除
                const deletedStrategy = AppDataManagerV2.cache.coloringStrategies.get(id);
                AppDataManagerV2.cache.coloringStrategies.delete(id);

                // 触发事件
                AppDataManagerV2.eventListeners.coloringStrategies.forEach(listener => {
                    listener({ type: 'delete', data: deletedStrategy });
                });

                console.log('✅ 流量染色策略删除成功:', id);
                return true;
            } catch (error) {
                console.error('❌ 删除流量染色策略失败:', error);
                throw error;
            }
        },

        // 批量更新状态
        async batchUpdateStatus(ids, status) {
            try {
                const updates = { status, lastUpdated: new Date().toISOString() };
                await this.dataAdapter.getData('bulkUpdate', ids, updates);

                // 更新缓存
                ids.forEach(id => {
                    const strategy = AppDataManagerV2.cache.coloringStrategies.get(id);
                    if (strategy) {
                        strategy.status = status;
                        strategy.lastUpdated = updates.lastUpdated;
                    }
                });

                // 触发事件
                AppDataManagerV2.eventListeners.coloringStrategies.forEach(listener => {
                    listener({ type: 'batchUpdate', ids, changes: updates });
                });

                console.log(`✅ 批量${status ? '启用' : '禁用'}策略成功:`, ids.length);
                return true;
            } catch (error) {
                console.error('❌ 批量更新流量染色策略状态失败:', error);
                throw error;
            }
        },

        // 批量删除
        async batchDelete(ids) {
            try {
                await this.dataAdapter.getData('bulkDelete', ids);

                // 从缓存移除
                const deletedStrategies = [];
                ids.forEach(id => {
                    const strategy = AppDataManagerV2.cache.coloringStrategies.get(id);
                    if (strategy) {
                        deletedStrategies.push(strategy);
                        AppDataManagerV2.cache.coloringStrategies.delete(id);
                    }
                });

                // 触发事件
                AppDataManagerV2.eventListeners.coloringStrategies.forEach(listener => {
                    listener({ type: 'batchDelete', data: deletedStrategies });
                });

                console.log('✅ 批量删除流量染色策略成功:', ids.length);
                return true;
            } catch (error) {
                console.error('❌ 批量删除流量染色策略失败:', error);
                throw error;
            }
        },

        // 数据验证
        validateStrategy(strategy) {
            if (!strategy.name || strategy.name.trim().length === 0) {
                throw new Error('策略名称不能为空');
            }
            if (!strategy.scope) {
                throw new Error('生效范围不能为空');
            }
            if (!strategy.techniques || strategy.techniques.length === 0) {
                throw new Error('至少需要选择一种染色技术');
            }

            // 验证染色技术的有效性
            const validTechniques = ['应用染色', '数据流染色', '数据追踪染色'];
            const invalidTechniques = strategy.techniques.filter(tech => !validTechniques.includes(tech));
            if (invalidTechniques.length > 0) {
                throw new Error(`无效的染色技术: ${invalidTechniques.join(', ')}`);
            }
        },

        // 获取统计信息
        async getStatistics() {
            try {
                const strategies = await this.getAll();
                return {
                    total: strategies.length,
                    active: strategies.filter(s => s.status).length,
                    inactive: strategies.filter(s => !s.status).length,
                    byScope: strategies.reduce((acc, s) => {
                        acc[s.scope] = (acc[s.scope] || 0) + 1;
                        return acc;
                    }, {}),
                    byTechnique: strategies.reduce((acc, s) => {
                        s.techniques.forEach(tech => {
                            acc[tech] = (acc[tech] || 0) + 1;
                        });
                        return acc;
                    }, {})
                };
            } catch (error) {
                console.error('❌ 获取流量染色策略统计信息失败:', error);
                throw error;
            }
        }
    },

    // ===== 跨境应用管理 =====
    crossBorderApps: {
        // 获取所有跨境应用
        async getAll(filters = {}) {
            try {
                let apps = await AppDataManagerV2.db.crossBorderApps.toArray();

                // 应用筛选
                if (filters.search) {
                    const keyword = filters.search.toLowerCase();
                    apps = apps.filter(app =>
                        app.name.toLowerCase().includes(keyword) ||
                        (app.description && app.description.toLowerCase().includes(keyword))
                    );
                }

                if (filters.scope) {
                    apps = apps.filter(app => app.scope === filters.scope);
                }

                if (filters.status !== undefined) {
                    apps = apps.filter(app => app.status === filters.status);
                }

                return apps;
            } catch (error) {
                console.error('❌ 获取跨境应用失败:', error);
                return [];
            }
        },

        // 根据ID获取应用
        async getById(id) {
            try {
                if (AppDataManagerV2.cache.crossBorderApps.has(id)) {
                    return AppDataManagerV2.cache.crossBorderApps.get(id);
                }

                const app = await AppDataManagerV2.db.crossBorderApps.get(id);
                if (app) {
                    AppDataManagerV2.cache.crossBorderApps.set(id, app);
                }
                return app;
            } catch (error) {
                console.error('❌ 获取跨境应用失败:', error);
                return null;
            }
        },

        // 创建跨境应用
        async create(appData) {
            try {
                const app = {
                    ...appData,
                    createTime: new Date().toISOString(),
                    lastUpdated: new Date().toISOString()
                };

                const id = await AppDataManagerV2.db.crossBorderApps.add(app);
                app.id = id;

                AppDataManagerV2.cache.crossBorderApps.set(id, app);
                AppDataManagerV2.triggerUpdate('crossBorderApps', { type: 'create', data: app });

                console.log('✅ 跨境应用创建成功:', app.name);
                return app;
            } catch (error) {
                console.error('❌ 创建跨境应用失败:', error);
                throw error;
            }
        },

        // 更新跨境应用
        async update(id, updates) {
            try {
                const updateData = {
                    ...updates,
                    lastUpdated: new Date().toISOString()
                };

                await AppDataManagerV2.db.crossBorderApps.update(id, updateData);

                const cachedApp = AppDataManagerV2.cache.crossBorderApps.get(id);
                if (cachedApp) {
                    Object.assign(cachedApp, updateData);
                }

                AppDataManagerV2.triggerUpdate('crossBorderApps', { type: 'update', id, data: updateData });

                console.log('✅ 跨境应用更新成功:', id);
                return true;
            } catch (error) {
                console.error('❌ 更新跨境应用失败:', error);
                throw error;
            }
        },

        // 删除跨境应用
        async delete(id) {
            try {
                await AppDataManagerV2.db.crossBorderApps.delete(id);
                AppDataManagerV2.cache.crossBorderApps.delete(id);
                AppDataManagerV2.triggerUpdate('crossBorderApps', { type: 'delete', id });

                console.log('✅ 跨境应用删除成功:', id);
                return true;
            } catch (error) {
                console.error('❌ 删除跨境应用失败:', error);
                throw error;
            }
        },

        // 批量操作
        async batchUpdateStatus(ids, status) {
            try {
                const results = [];
                const errors = [];

                for (const id of ids) {
                    try {
                        await this.update(id, { status });
                        results.push({ id, success: true });
                    } catch (error) {
                        errors.push({ id, error: error.message });
                    }
                }

                return { success: errors.length === 0, results, errors };
            } catch (error) {
                console.error('❌ 批量更新状态失败:', error);
                throw error;
            }
        },

        async batchDelete(ids) {
            try {
                const results = [];
                const errors = [];

                for (const id of ids) {
                    try {
                        await this.delete(id);
                        results.push({ id, success: true });
                    } catch (error) {
                        errors.push({ id, error: error.message });
                    }
                }

                return { success: errors.length === 0, results, errors };
            } catch (error) {
                console.error('❌ 批量删除失败:', error);
                throw error;
            }
        }
    },

    // ===== 内置应用管理 =====
    builtinApps: {
        // 获取所有内置应用
        async getAll(filters = {}) {
            try {
                let apps = await AppDataManagerV2.db.builtinApps.toArray();

                // 应用筛选
                if (filters.search) {
                    const keyword = filters.search.toLowerCase();
                    apps = apps.filter(app =>
                        app.name.toLowerCase().includes(keyword) ||
                        app.address.toLowerCase().includes(keyword) ||
                        app.type.toLowerCase().includes(keyword) ||
                        app.category.toLowerCase().includes(keyword) ||
                        (app.description && app.description.toLowerCase().includes(keyword)) ||
                        (app.tags && app.tags.some(tag => tag.toLowerCase().includes(keyword)))
                    );
                }

                if (filters.category) {
                    apps = apps.filter(app => app.category === filters.category);
                }

                if (filters.type) {
                    apps = apps.filter(app => app.type === filters.type);
                }

                if (filters.status !== undefined) {
                    apps = apps.filter(app => app.status === filters.status);
                }

                return apps;
            } catch (error) {
                console.error('❌ 获取内置应用失败:', error);
                return [];
            }
        },

        // 根据ID获取应用
        async getById(id) {
            try {
                // 先从缓存获取
                if (AppDataManagerV2.cache.builtinApps.has(id)) {
                    return AppDataManagerV2.cache.builtinApps.get(id);
                }

                // 从数据库获取
                const app = await AppDataManagerV2.db.builtinApps.get(id);
                if (app) {
                    AppDataManagerV2.cache.builtinApps.set(id, app);
                }
                return app;
            } catch (error) {
                console.error('❌ 获取内置应用失败:', error);
                return null;
            }
        },

        // 更新内置应用
        async update(id, updates) {
            try {
                const updateData = {
                    ...updates,
                    lastUpdated: new Date().toISOString()
                };

                await AppDataManagerV2.db.builtinApps.update(id, updateData);

                // 更新缓存
                const cachedApp = AppDataManagerV2.cache.builtinApps.get(id);
                if (cachedApp) {
                    Object.assign(cachedApp, updateData);
                }

                // 触发更新事件
                AppDataManagerV2.triggerUpdate('builtinApps', { type: 'update', id, data: updateData });

                console.log('✅ 内置应用更新成功:', id);
                return true;
            } catch (error) {
                console.error('❌ 更新内置应用失败:', error);
                throw error;
            }
        },

        // 批量更新状态
        async batchUpdateStatus(ids, status) {
            try {
                const results = [];
                const errors = [];

                for (const id of ids) {
                    try {
                        await this.update(id, { status });
                        results.push({ id, success: true });
                    } catch (error) {
                        errors.push({ id, error: error.message });
                    }
                }

                return {
                    success: errors.length === 0,
                    results,
                    errors
                };
            } catch (error) {
                console.error('❌ 批量更新状态失败:', error);
                throw error;
            }
        }
    },

    // ===== 自定义应用管理 =====
    customApps: {
        // 获取所有自定义应用
        async getAll(filters = {}) {
            try {
                let apps = await AppDataManagerV2.db.customApps.toArray();

                // 应用筛选
                if (filters.search) {
                    const keyword = filters.search.toLowerCase();
                    apps = apps.filter(app =>
                        app.name.toLowerCase().includes(keyword) ||
                        app.address.toLowerCase().includes(keyword) ||
                        app.type.toLowerCase().includes(keyword)
                    );
                }

                if (filters.status !== undefined) {
                    apps = apps.filter(app => app.status === filters.status);
                }

                return apps;
            } catch (error) {
                console.error('❌ 获取自定义应用失败:', error);
                return [];
            }
        },

        // 根据ID获取应用
        async getById(id) {
            try {
                if (AppDataManagerV2.cache.customApps.has(id)) {
                    return AppDataManagerV2.cache.customApps.get(id);
                }

                const app = await AppDataManagerV2.db.customApps.get(id);
                if (app) {
                    AppDataManagerV2.cache.customApps.set(id, app);
                }
                return app;
            } catch (error) {
                console.error('❌ 获取自定义应用失败:', error);
                return null;
            }
        },

        // 创建自定义应用
        async create(appData) {
            try {
                const app = {
                    ...appData,
                    createTime: new Date().toISOString(),
                    lastUpdated: new Date().toISOString()
                };

                const id = await AppDataManagerV2.db.customApps.add(app);
                app.id = id;

                AppDataManagerV2.cache.customApps.set(id, app);
                AppDataManagerV2.triggerUpdate('customApps', { type: 'create', data: app });

                console.log('✅ 自定义应用创建成功:', app.name);
                return app;
            } catch (error) {
                console.error('❌ 创建自定义应用失败:', error);
                throw error;
            }
        },

        // 更新自定义应用
        async update(id, updates) {
            try {
                const updateData = {
                    ...updates,
                    lastUpdated: new Date().toISOString()
                };

                await AppDataManagerV2.db.customApps.update(id, updateData);

                const cachedApp = AppDataManagerV2.cache.customApps.get(id);
                if (cachedApp) {
                    Object.assign(cachedApp, updateData);
                }

                AppDataManagerV2.triggerUpdate('customApps', { type: 'update', id, data: updateData });

                console.log('✅ 自定义应用更新成功:', id);
                return true;
            } catch (error) {
                console.error('❌ 更新自定义应用失败:', error);
                throw error;
            }
        },

        // 删除自定义应用
        async delete(id) {
            try {
                await AppDataManagerV2.db.customApps.delete(id);
                AppDataManagerV2.cache.customApps.delete(id);
                AppDataManagerV2.triggerUpdate('customApps', { type: 'delete', id });

                console.log('✅ 自定义应用删除成功:', id);
                return true;
            } catch (error) {
                console.error('❌ 删除自定义应用失败:', error);
                throw error;
            }
        },

        // 批量操作
        async batchUpdateStatus(ids, status) {
            try {
                const results = [];
                const errors = [];

                for (const id of ids) {
                    try {
                        await this.update(id, { status });
                        results.push({ id, success: true });
                    } catch (error) {
                        errors.push({ id, error: error.message });
                    }
                }

                return { success: errors.length === 0, results, errors };
            } catch (error) {
                console.error('❌ 批量更新状态失败:', error);
                throw error;
            }
        },

        async batchDelete(ids) {
            try {
                const results = [];
                const errors = [];

                for (const id of ids) {
                    try {
                        await this.delete(id);
                        results.push({ id, success: true });
                    } catch (error) {
                        errors.push({ id, error: error.message });
                    }
                }

                return { success: errors.length === 0, results, errors };
            } catch (error) {
                console.error('❌ 批量删除失败:', error);
                throw error;
            }
        }
    },

    // ===== 数字水印配置管理 =====
    watermarkConfigs: {
        // 获取所有水印配置
        async getAll() {
            try {
                const configs = await AppDataManagerV2.db.watermarkConfigs.toArray();
                // 解析JSON字段
                return configs.map(config => ({
                    ...config,
                    content: JSON.parse(config.content || '[]'),
                    style: JSON.parse(config.style || '{}'),
                    timing: JSON.parse(config.timing || '{}'),
                    scope: JSON.parse(config.scope || '{}')
                }));
            } catch (error) {
                console.error('❌ 获取水印配置失败:', error);
                throw error;
            }
        },

        // 根据ID获取水印配置
        async getById(id) {
            try {
                const config = await AppDataManagerV2.db.watermarkConfigs.get(id);
                if (!config) {
                    throw new Error('水印配置不存在');
                }

                // 解析JSON字段
                return {
                    ...config,
                    content: JSON.parse(config.content || '[]'),
                    style: JSON.parse(config.style || '{}'),
                    timing: JSON.parse(config.timing || '{}'),
                    scope: JSON.parse(config.scope || '{}')
                };
            } catch (error) {
                console.error('❌ 获取水印配置失败:', error);
                throw error;
            }
        },

        // 创建水印配置
        async create(configData) {
            try {
                const config = {
                    name: configData.name || '新建水印配置',
                    enabled: configData.enabled || false,
                    type: configData.type || 'visible',
                    content: JSON.stringify(configData.content || []),
                    style: JSON.stringify(configData.style || {}),
                    timing: JSON.stringify(configData.timing || {}),
                    scope: JSON.stringify(configData.scope || {}),
                    createTime: new Date().toISOString(),
                    lastUpdated: new Date().toISOString()
                };

                const id = await AppDataManagerV2.db.watermarkConfigs.add(config);
                const newConfig = await this.getById(id);

                // 更新缓存
                AppDataManagerV2.cache.watermarkConfigs.set(id, newConfig);

                // 触发事件
                AppDataManagerV2.triggerUpdate('watermarkConfigs', { type: 'create', data: newConfig });

                console.log('✅ 水印配置创建成功:', newConfig);
                return newConfig;
            } catch (error) {
                console.error('❌ 创建水印配置失败:', error);
                throw error;
            }
        },

        // 更新水印配置
        async update(id, updates) {
            try {
                const updateData = {
                    ...updates,
                    lastUpdated: new Date().toISOString()
                };

                // 序列化复杂字段
                if (updateData.content) {
                    updateData.content = JSON.stringify(updateData.content);
                }
                if (updateData.style) {
                    updateData.style = JSON.stringify(updateData.style);
                }
                if (updateData.timing) {
                    updateData.timing = JSON.stringify(updateData.timing);
                }
                if (updateData.scope) {
                    updateData.scope = JSON.stringify(updateData.scope);
                }

                await AppDataManagerV2.db.watermarkConfigs.update(id, updateData);
                const updatedConfig = await this.getById(id);

                // 更新缓存
                AppDataManagerV2.cache.watermarkConfigs.set(id, updatedConfig);

                // 触发事件
                AppDataManagerV2.triggerUpdate('watermarkConfigs', { type: 'update', data: updatedConfig });

                console.log('✅ 水印配置更新成功:', updatedConfig);
                return updatedConfig;
            } catch (error) {
                console.error('❌ 更新水印配置失败:', error);
                throw error;
            }
        },

        // 删除水印配置
        async delete(id) {
            try {
                const config = await this.getById(id);
                await AppDataManagerV2.db.watermarkConfigs.delete(id);

                // 从缓存删除
                AppDataManagerV2.cache.watermarkConfigs.delete(id);

                // 触发事件
                AppDataManagerV2.triggerUpdate('watermarkConfigs', { type: 'delete', data: config });

                console.log('✅ 水印配置删除成功');
                return true;
            } catch (error) {
                console.error('❌ 删除水印配置失败:', error);
                throw error;
            }
        },

        // 获取默认配置
        async getDefaultConfig() {
            try {
                const configs = await this.getAll();
                return configs.length > 0 ? configs[0] : null;
            } catch (error) {
                console.error('❌ 获取默认配置失败:', error);
                throw error;
            }
        }
    },

    // ===== 部门管理 =====
    departments: {
        // 获取所有部门
        async getAll() {
            try {
                return await AppDataManagerV2.db.departments.toArray();
            } catch (error) {
                console.error('❌ 获取部门列表失败:', error);
                throw error;
            }
        },

        // 根据ID获取部门
        async getById(id) {
            try {
                const dept = await AppDataManagerV2.db.departments.get(id);
                if (!dept) {
                    throw new Error('部门不存在');
                }
                return dept;
            } catch (error) {
                console.error('❌ 获取部门失败:', error);
                throw error;
            }
        }
    },

    // ===== 设备管理 =====
    devices: {
        // 获取所有设备
        async getAll() {
            try {
                return await AppDataManagerV2.db.devices.toArray();
            } catch (error) {
                console.error('❌ 获取设备列表失败:', error);
                throw error;
            }
        },

        // 根据ID获取设备
        async getById(id) {
            try {
                const device = await AppDataManagerV2.db.devices.get(id);
                if (!device) {
                    throw new Error('设备不存在');
                }
                return device;
            } catch (error) {
                console.error('❌ 获取设备失败:', error);
                throw error;
            }
        }
    },

    // ===== 工具方法 =====
    // 导出所有数据
    async exportAll() {
        try {
            const data = {
                internalApps: await this.db.internalApps.toArray(),
                crossBorderApps: await this.db.crossBorderApps.toArray(),
                recognitionStrategies: await this.db.recognitionStrategies.toArray(),
                coloringStrategies: await this.db.coloringStrategies.toArray(),
                exportTime: new Date().toISOString()
            };

            console.log('✅ 数据导出成功');
            return data;
        } catch (error) {
            console.error('❌ 数据导出失败:', error);
            throw error;
        }
    },

    // 导入数据
    async importAll(data) {
        try {
            // 清空现有数据
            await this.db.internalApps.clear();
            await this.db.crossBorderApps.clear();
            await this.db.recognitionStrategies.clear();
            await this.db.coloringStrategies.clear();

            // 导入新数据
            if (data.internalApps) {
                await this.db.internalApps.bulkAdd(data.internalApps);
            }
            if (data.crossBorderApps) {
                await this.db.crossBorderApps.bulkAdd(data.crossBorderApps);
            }
            if (data.recognitionStrategies) {
                await this.db.recognitionStrategies.bulkAdd(data.recognitionStrategies);
            }
            if (data.coloringStrategies) {
                await this.db.coloringStrategies.bulkAdd(data.coloringStrategies);
            }

            // 重新加载缓存
            await this.loadAllCache();

            console.log('✅ 数据导入成功');
            return true;
        } catch (error) {
            console.error('❌ 数据导入失败:', error);
            throw error;
        }
    },

    // 清空所有数据
    async clearAll() {
        try {
            await this.db.internalApps.clear();
            await this.db.crossBorderApps.clear();
            await this.db.recognitionStrategies.clear();
            await this.db.coloringStrategies.clear();

            this.cache.internalApps.clear();
            this.cache.crossBorderApps.clear();
            this.cache.recognitionStrategies.clear();
            this.cache.coloringStrategies.clear();

            console.log('✅ 所有数据已清空');
            return true;
        } catch (error) {
            console.error('❌ 清空数据失败:', error);
            throw error;
        }
    },

    // ===== API密钥管理 =====
    apiKeys: {
        // 获取所有API密钥
        async getAll(filters = {}) {
            try {
                let keys = await AppDataManagerV2.db.apiKeys.toArray();

                // 应用筛选
                if (filters.search) {
                    const keyword = filters.search.toLowerCase();
                    keys = keys.filter(key =>
                        key.purpose.toLowerCase().includes(keyword) ||
                        key.accessKeyId.toLowerCase().includes(keyword) ||
                        key.role.toLowerCase().includes(keyword)
                    );
                }

                if (filters.role) {
                    keys = keys.filter(key => key.role === filters.role);
                }

                if (filters.status !== undefined) {
                    keys = keys.filter(key => key.status === filters.status);
                }

                if (filters.permission) {
                    keys = keys.filter(key => key.permission === filters.permission);
                }

                return keys;
            } catch (error) {
                console.error('❌ 获取API密钥失败:', error);
                return [];
            }
        },

        // 根据ID获取API密钥
        async getById(id) {
            try {
                // 先从缓存获取
                if (AppDataManagerV2.cache.apiKeys.has(id)) {
                    return AppDataManagerV2.cache.apiKeys.get(id);
                }

                // 从数据库获取
                const key = await AppDataManagerV2.db.apiKeys.get(id);
                if (key) {
                    AppDataManagerV2.cache.apiKeys.set(id, key);
                }
                return key;
            } catch (error) {
                console.error('❌ 获取API密钥失败:', error);
                return null;
            }
        },

        // 创建API密钥
        async create(keyData) {
            try {
                const key = {
                    purpose: keyData.purpose,
                    accessKeyId: this.generateAccessKeyId(),
                    accessKeySecret: this.generateAccessKeySecret(),
                    role: keyData.role,
                    status: keyData.status !== undefined ? keyData.status : true,
                    permission: keyData.permission || '完全访问权限',
                    createTime: new Date().toISOString(),
                    lastUpdated: new Date().toISOString()
                };

                const id = await AppDataManagerV2.db.apiKeys.add(key);
                key.id = id;

                // 更新缓存
                AppDataManagerV2.cache.apiKeys.set(id, key);

                // 触发更新事件
                AppDataManagerV2.triggerUpdate('apiKeys', { type: 'create', data: key });

                console.log('✅ API密钥创建成功:', key.purpose);
                return key;
            } catch (error) {
                console.error('❌ 创建API密钥失败:', error);
                throw error;
            }
        },

        // 更新API密钥
        async update(id, updates) {
            try {
                const updateData = {
                    ...updates,
                    lastUpdated: new Date().toISOString()
                };

                await AppDataManagerV2.db.apiKeys.update(id, updateData);

                // 更新缓存
                const cachedKey = AppDataManagerV2.cache.apiKeys.get(id);
                if (cachedKey) {
                    Object.assign(cachedKey, updateData);
                }

                // 触发更新事件
                AppDataManagerV2.triggerUpdate('apiKeys', { type: 'update', id, data: updateData });

                console.log('✅ API密钥更新成功:', id);
                return true;
            } catch (error) {
                console.error('❌ 更新API密钥失败:', error);
                throw error;
            }
        },

        // 删除API密钥
        async delete(id) {
            try {
                await AppDataManagerV2.db.apiKeys.delete(id);

                // 从缓存删除
                AppDataManagerV2.cache.apiKeys.delete(id);

                // 触发更新事件
                AppDataManagerV2.triggerUpdate('apiKeys', { type: 'delete', id });

                console.log('✅ API密钥删除成功:', id);
                return true;
            } catch (error) {
                console.error('❌ 删除API密钥失败:', error);
                throw error;
            }
        },

        // 批量更新状态
        async batchUpdateStatus(ids, status) {
            try {
                const results = [];
                const errors = [];

                for (const id of ids) {
                    try {
                        await this.update(id, { status });
                        results.push({ id, success: true });
                    } catch (error) {
                        errors.push({ id, error: error.message });
                    }
                }

                return {
                    success: errors.length === 0,
                    results,
                    errors
                };
            } catch (error) {
                console.error('❌ 批量更新状态失败:', error);
                throw error;
            }
        },

        // 批量删除
        async batchDelete(ids) {
            try {
                const results = [];
                const errors = [];

                for (const id of ids) {
                    try {
                        await this.delete(id);
                        results.push({ id, success: true });
                    } catch (error) {
                        errors.push({ id, error: error.message });
                    }
                }

                return {
                    success: errors.length === 0,
                    results,
                    errors
                };
            } catch (error) {
                console.error('❌ 批量删除失败:', error);
                throw error;
            }
        },

        // 生成AccessKey ID
        generateAccessKeyId() {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let result = '';
            for (let i = 0; i < 24; i++) {
                result += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return result;
        },

        // 生成AccessKey Secret
        generateAccessKeySecret() {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let result = '';
            for (let i = 0; i < 40; i++) {
                result += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return result;
        }
    },

    // ===== 水印记录管理 =====
    watermarkRecords: {
        // 获取所有水印记录
        async getAll(filters = {}) {
            try {
                let records = await AppDataManagerV2.db.watermarkRecords.toArray();

                // 应用过滤器
                if (filters.search) {
                    const keyword = filters.search.toLowerCase();
                    records = records.filter(record =>
                        record.fileName.toLowerCase().includes(keyword) ||
                        record.watermarkContent.toLowerCase().includes(keyword) ||
                        (record.tags && record.tags.some(tag => tag.toLowerCase().includes(keyword))) ||
                        (record.notes && record.notes.toLowerCase().includes(keyword))
                    );
                }

                if (filters.status) {
                    records = records.filter(record => record.status === filters.status);
                }

                if (filters.fileType) {
                    records = records.filter(record => record.fileType === filters.fileType);
                }

                // 排序
                if (filters.sortBy) {
                    records.sort((a, b) => {
                        const field = filters.sortBy;
                        const order = filters.sortOrder === 'desc' ? -1 : 1;

                        if (field === 'embedTime' || field === 'createTime') {
                            return (new Date(a[field]) - new Date(b[field])) * order;
                        }
                        if (field === 'fileSize' || field === 'downloadCount') {
                            return (a[field] - b[field]) * order;
                        }
                        return a[field].localeCompare(b[field]) * order;
                    });
                }

                // 更新缓存
                records.forEach(record => {
                    AppDataManagerV2.cache.watermarkRecords.set(record.id, record);
                });

                return records;
            } catch (error) {
                console.error('❌ 获取水印记录失败:', error);
                throw error;
            }
        },

        // 创建水印记录
        async create(recordData) {
            try {
                const newRecord = {
                    ...recordData,
                    embedTime: new Date().toISOString(),
                    status: 'completed',
                    downloadCount: 0,
                    createTime: new Date().toISOString(),
                    lastUpdated: new Date().toISOString()
                };

                const id = await AppDataManagerV2.db.watermarkRecords.add(newRecord);
                newRecord.id = id;

                // 更新缓存
                AppDataManagerV2.cache.watermarkRecords.set(id, newRecord);

                // 触发事件
                AppDataManagerV2.eventListeners.watermarkRecords.forEach(listener => {
                    listener({ type: 'create', data: newRecord });
                });

                console.log('✅ 水印记录创建成功:', newRecord.fileName);
                return newRecord;
            } catch (error) {
                console.error('❌ 创建水印记录失败:', error);
                throw error;
            }
        },

        // 获取单个记录
        async getById(id) {
            try {
                if (AppDataManagerV2.cache.watermarkRecords.has(id)) {
                    return AppDataManagerV2.cache.watermarkRecords.get(id);
                }

                const record = await AppDataManagerV2.db.watermarkRecords.get(id);
                if (record) {
                    AppDataManagerV2.cache.watermarkRecords.set(id, record);
                }
                return record;
            } catch (error) {
                console.error('❌ 获取水印记录失败:', error);
                return null;
            }
        },

        // 删除记录
        async delete(id) {
            try {
                await AppDataManagerV2.db.watermarkRecords.delete(id);
                AppDataManagerV2.cache.watermarkRecords.delete(id);

                AppDataManagerV2.eventListeners.watermarkRecords.forEach(listener => {
                    listener({ type: 'delete', id });
                });

                console.log('✅ 水印记录删除成功:', id);
                return true;
            } catch (error) {
                console.error('❌ 删除水印记录失败:', error);
                throw error;
            }
        },

        // 批量删除记录
        async batchDelete(ids) {
            try {
                await AppDataManagerV2.db.watermarkRecords.bulkDelete(ids);

                // 更新缓存
                ids.forEach(id => AppDataManagerV2.cache.watermarkRecords.delete(id));

                // 触发更新事件
                AppDataManagerV2.eventListeners.watermarkRecords.forEach(listener =>
                    listener({ type: 'batchDelete', data: { ids } })
                );

                console.log('✅ 水印记录批量删除成功:', ids.length, '条');
                return true;
            } catch (error) {
                console.error('❌ 水印记录批量删除失败:', error);
                throw error;
            }
        },

        // 增加下载次数
        async incrementDownloadCount(id) {
            try {
                const record = await AppDataManagerV2.db.watermarkRecords.get(id);
                if (record) {
                    const updatedData = {
                        downloadCount: (record.downloadCount || 0) + 1,
                        lastUpdated: new Date().toISOString()
                    };

                    await AppDataManagerV2.db.watermarkRecords.update(id, updatedData);

                    // 更新缓存
                    const cachedRecord = AppDataManagerV2.cache.watermarkRecords.get(id);
                    if (cachedRecord) {
                        Object.assign(cachedRecord, updatedData);
                    }

                    // 触发更新事件
                    AppDataManagerV2.eventListeners.watermarkRecords.forEach(listener =>
                        listener({ type: 'update', data: { ...record, ...updatedData } })
                    );

                    console.log('✅ 下载次数更新成功:', id);
                    return { ...record, ...updatedData };
                }
            } catch (error) {
                console.error('❌ 下载次数更新失败:', error);
                throw error;
            }
        },

        // 获取统计信息
        async getStatistics() {
            try {
                const records = await this.getAll();

                return {
                    total: records.length,
                    completed: records.filter(r => r.status === 'completed').length,
                    failed: records.filter(r => r.status === 'failed').length,
                    totalDownloads: records.reduce((sum, r) => sum + (r.downloadCount || 0), 0),
                    byFileType: records.reduce((acc, r) => {
                        acc[r.fileType] = (acc[r.fileType] || 0) + 1;
                        return acc;
                    }, {}),
                    recentActivity: records
                        .sort((a, b) => new Date(b.embedTime) - new Date(a.embedTime))
                        .slice(0, 10)
                        .map(r => ({
                            fileName: r.fileName,
                            embedTime: r.embedTime,
                            status: r.status,
                            fileType: r.fileType
                        }))
                };
            } catch (error) {
                console.error('❌ 获取水印记录统计信息失败:', error);
                return {
                    total: 0,
                    completed: 0,
                    failed: 0,
                    totalDownloads: 0,
                    byFileType: {},
                    recentActivity: []
                };
            }
        }
    },

    // ===== 模拟API方法 =====
    watermarkAPI: {
        // 模拟水印嵌入
        async embedWatermark(fileId, watermarkContent) {
            await new Promise(resolve => setTimeout(resolve, 2000)); // 模拟处理时间

            return {
                markedFileId: `marked_${fileId}_${Date.now()}`,
                downloadUrl: `/download/marked_${fileId}_${Date.now()}.pdf`,
                markedFileName: `marked_${watermarkContent}_${Date.now()}.pdf`,
                success: true
            };
        },

        // 模拟水印分析
        async analyzeWatermark(fileId) {
            await new Promise(resolve => setTimeout(resolve, 1500)); // 模拟分析时间

            const hasWatermark = Math.random() > 0.3; // 70%的文件有水印

            return {
                hasWatermark,
                watermarkContent: hasWatermark ? `水印内容_${Math.floor(Math.random() * 1000)}` : null,
                confidence: hasWatermark ? Math.floor(Math.random() * 30) + 70 : 0,
                matchedRecordId: hasWatermark ? Math.floor(Math.random() * 100) + 1 : null,
                analysisDetails: {
                    algorithm: 'LSB',
                    extractionTime: new Date().toISOString(),
                    fileIntegrity: 'intact'
                }
            };
        },

        // 模拟报告生成
        async generateReport(analysisData) {
            await new Promise(resolve => setTimeout(resolve, 1000)); // 模拟生成时间

            const reportContent = `
水印分析报告
================

文件名: ${analysisData.fileName}
分析时间: ${new Date().toLocaleString()}
是否包含水印: ${analysisData.hasWatermark ? '是' : '否'}
${analysisData.hasWatermark ? `水印内容: ${analysisData.watermarkContent}` : ''}
${analysisData.hasWatermark ? `置信度: ${analysisData.confidence}%` : ''}
${analysisData.matchedRecordId ? `匹配记录ID: ${analysisData.matchedRecordId}` : ''}

技术细节:
- 检测算法: LSB (Least Significant Bit)
- 文件完整性: 完好
- 提取成功率: ${analysisData.confidence || 0}%

结论:
${analysisData.hasWatermark ?
                    '该文件包含数字水印，可能用于版权保护或溯源追踪。' :
                    '该文件未检测到数字水印。'}

报告生成时间: ${new Date().toLocaleString()}
            `.trim();

            return {
                reportContent,
                reportFileName: `watermark_analysis_${analysisData.fileName}_${Date.now()}.txt`,
                reportPath: `/reports/watermark_analysis_${Date.now()}.txt`,
                success: true
            };
        }
    },

    // ===== 文件上传管理 =====
    uploadedFiles: {
        // 模拟文件上传
        async uploadFile(file, purpose = 'general') {
            await new Promise(resolve => setTimeout(resolve, 1000)); // 模拟上传时间

            const uploadData = {
                originalName: file.name,
                fileName: `${purpose}_${Date.now()}_${file.name}`,
                filePath: `/uploads/${purpose}/${Date.now()}_${file.name}`,
                fileSize: file.size,
                fileType: file.type,
                uploadTime: new Date().toISOString(),
                status: 'uploaded',
                hash: `hash_${Date.now()}`,
                createTime: new Date().toISOString(),
                lastUpdated: new Date().toISOString()
            };

            const id = await AppDataManagerV2.db.uploadedFiles.add(uploadData);
            uploadData.id = id;

            console.log('✅ 文件上传成功:', uploadData.fileName);
            return uploadData;
        },

        // 获取所有上传文件
        async getAll() {
            try {
                return await AppDataManagerV2.db.uploadedFiles.toArray();
            } catch (error) {
                console.error('❌ 获取上传文件失败:', error);
                return [];
            }
        }
    },

    // ===== 水印分析记录管理 =====
    watermarkAnalysis: {
        // 创建分析记录
        async create(analysisData) {
            try {
                const newAnalysis = {
                    ...analysisData,
                    analyzeTime: new Date().toISOString(),
                    reportGenerated: false,
                    createTime: new Date().toISOString(),
                    lastUpdated: new Date().toISOString()
                };

                const id = await AppDataManagerV2.db.watermarkAnalysis.add(newAnalysis);
                newAnalysis.id = id;

                console.log('✅ 水印分析记录创建成功:', newAnalysis.fileName);
                return newAnalysis;
            } catch (error) {
                console.error('❌ 创建水印分析记录失败:', error);
                throw error;
            }
        },

        // 获取所有分析记录
        async getAll() {
            try {
                return await AppDataManagerV2.db.watermarkAnalysis.toArray();
            } catch (error) {
                console.error('❌ 获取水印分析记录失败:', error);
                return [];
            }
        },

        // 更新分析记录
        async update(id, updates) {
            try {
                const updateData = {
                    ...updates,
                    lastUpdated: new Date().toISOString()
                };

                await AppDataManagerV2.db.watermarkAnalysis.update(id, updateData);
                console.log('✅ 水印分析记录更新成功:', id);
                return true;
            } catch (error) {
                console.error('❌ 更新水印分析记录失败:', error);
                throw error;
            }
        }
    },

    // ===== 用户登录记录管理 =====
    userLoginLogs: {
        // 获取所有登录记录
        async getAll() {
            try {
                let logs = await AppDataManagerV2.db.userLoginLogs.orderBy('loginTime').reverse().toArray();
                return logs;
            } catch (error) {
                console.error('❌ 获取登录记录失败:', error);
                return [];
            }
        },

        // 添加登录记录
        async addLogin(userId, userName, ipAddress = '127.0.0.1') {
            try {
                const now = new Date();
                const log = {
                    userId,
                    userName,
                    action: 'login',
                    loginTime: now.toISOString(),
                    logoutTime: null,
                    duration: null,
                    ipAddress,
                    userAgent: navigator.userAgent
                };

                const id = await AppDataManagerV2.db.userLoginLogs.add(log);
                log.id = id;

                // 更新缓存
                AppDataManagerV2.cache.userLoginLogs.set(id, log);

                console.log('✅ 记录用户登录:', userName);
                return log;
            } catch (error) {
                console.error('❌ 记录登录失败:', error);
                throw error;
            }
        },

        // 记录登出
        async addLogout(userId) {
            try {
                // 查找最近的登录记录
                const logs = await AppDataManagerV2.db.userLoginLogs
                    .where('userId').equals(userId)
                    .and(log => log.action === 'login' && !log.logoutTime)
                    .reverse()
                    .limit(1)
                    .toArray();

                if (logs.length > 0) {
                    const loginLog = logs[0];
                    const logoutTime = new Date();
                    const duration = Math.floor((logoutTime - new Date(loginLog.loginTime)) / 1000); // 秒

                    await AppDataManagerV2.db.userLoginLogs.update(loginLog.id, {
                        logoutTime: logoutTime.toISOString(),
                        duration: duration
                    });

                    // 更新缓存
                    const updatedLog = { ...loginLog, logoutTime: logoutTime.toISOString(), duration };
                    AppDataManagerV2.cache.userLoginLogs.set(loginLog.id, updatedLog);

                    console.log('✅ 记录用户登出:', loginLog.userName);
                    return updatedLog;
                }
            } catch (error) {
                console.error('❌ 记录登出失败:', error);
                throw error;
            }
        }
    },

    // ===== 密码重置记录管理 =====
    passwordResets: {
        // 获取所有重置记录
        async getAll() {
            try {
                let resets = await AppDataManagerV2.db.passwordResets.orderBy('requestTime').reverse().toArray();
                return resets;
            } catch (error) {
                console.error('❌ 获取密码重置记录失败:', error);
                return [];
            }
        },

        // 创建重置请求
        async createResetRequest(username, email) {
            try {
                const now = new Date();
                const resetToken = this.generateResetToken();
                const expiryTime = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24小时后过期

                const resetRequest = {
                    username,
                    email,
                    resetToken,
                    requestTime: now.toISOString(),
                    expiryTime: expiryTime.toISOString(),
                    status: 'pending', // pending, completed, expired
                    resetTime: null,
                    ipAddress: '127.0.0.1', // 在实际应用中应该获取真实IP
                    userAgent: navigator.userAgent
                };

                const id = await AppDataManagerV2.db.passwordResets.add(resetRequest);
                resetRequest.id = id;

                // 更新缓存
                AppDataManagerV2.cache.passwordResets.set(id, resetRequest);

                console.log('✅ 创建密码重置请求:', username);
                return resetRequest;
            } catch (error) {
                console.error('❌ 创建密码重置请求失败:', error);
                throw error;
            }
        },

        // 验证重置令牌
        async validateResetToken(token) {
            try {
                const resets = await AppDataManagerV2.db.passwordResets
                    .where('resetToken').equals(token)
                    .and(reset => reset.status === 'pending')
                    .toArray();

                if (resets.length === 0) {
                    return { valid: false, reason: 'token_not_found' };
                }

                const resetRequest = resets[0];
                const now = new Date();
                const expiryTime = new Date(resetRequest.expiryTime);

                if (now > expiryTime) {
                    // 标记为过期
                    await AppDataManagerV2.db.passwordResets.update(resetRequest.id, {
                        status: 'expired'
                    });
                    return { valid: false, reason: 'token_expired' };
                }

                return { valid: true, resetRequest };
            } catch (error) {
                console.error('❌ 验证重置令牌失败:', error);
                return { valid: false, reason: 'validation_error' };
            }
        },

        // 完成密码重置
        async completeReset(token, newPassword) {
            try {
                const validation = await this.validateResetToken(token);
                if (!validation.valid) {
                    throw new Error(`重置令牌无效: ${validation.reason}`);
                }

                const resetRequest = validation.resetRequest;
                const now = new Date();

                // 更新重置记录状态
                await AppDataManagerV2.db.passwordResets.update(resetRequest.id, {
                    status: 'completed',
                    resetTime: now.toISOString()
                });

                // 更新缓存
                const updatedReset = { ...resetRequest, status: 'completed', resetTime: now.toISOString() };
                AppDataManagerV2.cache.passwordResets.set(resetRequest.id, updatedReset);

                console.log('✅ 完成密码重置:', resetRequest.username);

                // 在实际应用中，这里应该更新用户的密码
                // 由于这是演示版本，我们只是记录操作
                return {
                    success: true,
                    username: resetRequest.username,
                    message: '密码重置成功'
                };
            } catch (error) {
                console.error('❌ 完成密码重置失败:', error);
                throw error;
            }
        },

        // 生成重置令牌
        generateResetToken() {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let token = '';
            for (let i = 0; i < 32; i++) {
                token += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return token;
        },

        // 清理过期的重置请求
        async cleanupExpiredRequests() {
            try {
                const now = new Date();
                const expiredRequests = await AppDataManagerV2.db.passwordResets
                    .where('expiryTime').below(now.toISOString())
                    .and(reset => reset.status === 'pending')
                    .toArray();

                if (expiredRequests.length > 0) {
                    // 标记为过期
                    const expiredIds = expiredRequests.map(req => req.id);
                    await AppDataManagerV2.db.passwordResets
                        .where('id').anyOf(expiredIds)
                        .modify({ status: 'expired' });

                    console.log(`🧹 清理了 ${expiredRequests.length} 个过期的密码重置请求`);
                }
            } catch (error) {
                console.error('❌ 清理过期重置请求失败:', error);
            }
        }
    },

    // 加载模拟登录数据
    async loadMockLoginData() {
        try {
            // 确保数据库已初始化
            if (!this.db) {
                console.log('⚠️ 数据库未初始化，跳过模拟登录数据加载');
                return;
            }

            // 检查是否已有数据
            const existingCount = await this.db.userLoginLogs.count();
            if (existingCount > 0) {
                console.log('📋 用户登录记录已存在，跳过模拟数据加载');
                return;
            }

            console.log('🎭 加载模拟登录数据...');

            const mockUsers = [
                { userId: 'user001', userName: '张三' },
                { userId: 'user002', userName: '李四' },
                { userId: 'user003', userName: '王五' },
                { userId: 'user004', userName: '赵六' },
                { userId: 'user005', userName: '钱七' },
                { userId: 'user006', userName: '孙八' },
                { userId: 'user007', userName: '周九' },
                { userId: 'user008', userName: '吴十' },
                { userId: 'admin001', userName: '管理员' },
                { userId: 'test001', userName: '测试用户' }
            ];

            const mockIPs = ['192.168.1.100', '192.168.1.101', '192.168.1.102', '10.0.0.50', '172.16.0.10'];
            const mockUserAgents = [
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/121.0'
            ];

            const mockData = [];
            const now = new Date();

            // 生成最近30天的登录记录
            for (let i = 0; i < 100; i++) {
                const user = mockUsers[Math.floor(Math.random() * mockUsers.length)];
                const loginDate = new Date(now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000); // 最近30天
                const sessionDuration = Math.floor(Math.random() * 4 * 60 * 60); // 0-4小时的会话时长（秒）
                const logoutDate = new Date(loginDate.getTime() + sessionDuration * 1000);

                // 80%的记录有登出时间，20%的记录没有（表示还在线或异常退出）
                const hasLogout = Math.random() > 0.2;

                mockData.push({
                    userId: user.userId,
                    userName: user.userName,
                    action: 'login',
                    loginTime: loginDate.toISOString(),
                    logoutTime: hasLogout ? logoutDate.toISOString() : null,
                    duration: hasLogout ? sessionDuration : null,
                    ipAddress: mockIPs[Math.floor(Math.random() * mockIPs.length)],
                    userAgent: mockUserAgents[Math.floor(Math.random() * mockUserAgents.length)]
                });
            }

            // 批量插入数据
            await this.db.userLoginLogs.bulkAdd(mockData);
            console.log(`✅ 成功加载 ${mockData.length} 条模拟登录记录`);

        } catch (error) {
            console.error('❌ 加载模拟登录数据失败:', error);
            // 不抛出错误，允许系统继续初始化
        }
    }
};

// 简化版：不自动初始化，等待被调用
console.log('📦 AppDataManagerV2 已加载，等待手动初始化');

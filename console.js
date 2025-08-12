// 注意：策略数据已移动到对应的页面模块中进行管理
// 应用识别策略 -> appRecognitionV2.js
// 流量染色策略 -> pages/trafficColoring.js

// 注意：策略相关的表单处理函数已移动到对应的页面模块中
// 每个页面模块现在负责管理自己的弹窗和表单逻辑



// 页面路由管理器 - 专注于页面切换和路由管理
const pageManager = {
    // 页面配置
    pages: {
        appRecognition: {
            id: 'appRecognition',
            title: '应用识别',
            content: function () {
                if (window.appRecognitionV3) {
                    return window.appRecognitionV3.content();
                } else if (window.appRecognitionV2) {
                    return window.appRecognitionV2.content();
                }
                return '<div>应用识别模块加载失败</div>';
            },
            init: async function () {
                if (window.appRecognitionV3) {
                    await window.appRecognitionV3.init();
                } else if (window.appRecognitionV2) {
                    await window.appRecognitionV2.init();
                }
            }
        },
        appManagement: {
            id: 'appManagement',
            title: '应用管理',
            content: function () {
                if (window.appManagementV2) {
                    return window.appManagementV2.content();
                }
                return '<div>应用管理模块V2加载失败</div>';
            },
            init: async function () {
                if (window.appManagementV2) {
                    await window.appManagementV2.init();
                }
            }
        },
        trafficColoring: {
            id: 'trafficColoring',
            title: '流量染色',
            content: function () {
                if (window.trafficColoringV2) {
                    return window.trafficColoringV2.content();
                } else if (window.trafficColoring) {
                    return window.trafficColoring.content();
                } else {
                    return '<div>流量染色模块加载失败</div>';
                }
            },
            init: function () {
                if (window.trafficColoringV2) {
                    window.trafficColoringV2.init();
                } else if (window.trafficColoring) {
                    window.trafficColoring.init();
                } else {
                    console.error('流量染色模块未加载');
                }
            }
        },
        digitalWatermark: {
            id: 'digitalWatermark',
            title: '数字水印',
            content: function () {
                if (window.digitalWatermarkV2) {
                    return window.digitalWatermarkV2.content();
                } else if (window.digitalWatermark) {
                    return window.digitalWatermark.content();
                } else {
                    return '<div>数字水印模块加载失败</div>';
                }
            },
            init: function () {
                if (window.digitalWatermarkV2) {
                    // 清理可能存在的旧事件监听器
                    this.cleanupEvents();
                    window.digitalWatermarkV2.init();
                } else if (window.digitalWatermark) {
                    // 清理可能存在的旧事件监听器
                    this.cleanupEvents();
                    window.digitalWatermark.init();
                } else {
                    console.error('数字水印模块未加载');
                }
            },
            cleanupEvents: function () {
                // 清理数字水印页面的所有事件监听器
                const watermarkEnabled = document.getElementById('watermarkEnabled');
                if (watermarkEnabled) {
                    const newElement = watermarkEnabled.cloneNode(true);
                    watermarkEnabled.parentNode.replaceChild(newElement, watermarkEnabled);
                }

                // 清理其他可能的事件监听器
                const typeCards = document.querySelectorAll('.type-card');
                typeCards.forEach(card => {
                    const newCard = card.cloneNode(true);
                    card.parentNode.replaceChild(newCard, card);
                });

                const colorInputs = document.querySelectorAll('.color-input');
                colorInputs.forEach(input => {
                    const newInput = input.cloneNode(true);
                    input.parentNode.replaceChild(newInput, input);
                });
            }
        },
        watermarkTrace: {
            id: 'watermarkTrace',
            title: '水印溯源',
            content: function () {
                if (window.watermarkTraceV2) {
                    return window.watermarkTraceV2.content();
                } else if (window.watermarkTrace) {
                    return window.watermarkTrace.content();
                } else {
                    return '<div>水印溯源模块加载失败</div>';
                }
            },
            init: async function () {
                if (window.watermarkTraceV2) {
                    await window.watermarkTraceV2.init();
                } else if (window.watermarkTrace) {
                    window.watermarkTrace.init();
                } else {
                    console.error('水印溯源模块未加载');
                }
            }
        },
        openApi: {
            id: 'openApi',
            title: '开放接口',
            content: function () {
                if (window.openApiV2) {
                    return window.openApiV2.content();
                } else {
                    return '<div>开放接口模块V2加载失败</div>';
                }
            },
            init: async function () {
                if (window.openApiV2) {
                    await window.openApiV2.init();
                } else {
                    console.error('开放接口模块V2未加载');
                }
            }
        }
    },

    // 当前页面
    currentPage: null,

    // 初始化
    async init() {
        console.log('页面管理器初始化');
        this.bindEvents();
    },

    // 绑定事件
    bindEvents() {
        // 绑定菜单点击事件
        const menuItems = document.querySelectorAll('.menu-item[data-page]');
        menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const pageId = item.getAttribute('data-page');
                if (pageId !== 'logout') {
                    this.showPage(pageId);
                }
            });
        });

        // 监听浏览器前进后退按钮
        window.addEventListener('hashchange', () => {
            const hashPage = window.location.hash.slice(1);
            if (hashPage && this.pages[hashPage] && hashPage !== this.currentPage) {
                this.showPage(hashPage);
            }
        });
    },

    // 显示页面
    async showPage(pageId, retry = 0) {
        console.log('切换到页面:', pageId);

        // 更新菜单状态
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('active');
        });
        const menuItem = document.querySelector(`[data-page="${pageId}"]`);
        if (menuItem) {
            menuItem.classList.add('active');
        }

        // 获取页面配置
        const pageConfig = this.pages[pageId];
        if (!pageConfig) {
            console.error('页面配置不存在:', pageId);
            return;
        }

        // 更新页面标题
        document.title = `${pageConfig.title} - 流量安全识别`;

        // 获取页面内容
        let content = pageConfig.content();

        // 改进的重试机制：检查内容是否为错误信息
        const isErrorContent = content && (
            content.includes('加载失败') ||
            content.includes('页面加载中') ||
            content === '<div>页面加载中...</div>'
        );

        if (isErrorContent && retry < 15) {
            console.log(`页面 ${pageId} 模块尚未加载完成，重试第 ${retry + 1} 次`);
            setTimeout(() => this.showPage(pageId, retry + 1), 100);
            return;
        }

        // 如果仍然是错误内容，显示友好的错误信息
        if (isErrorContent) {
            content = `
                <div style="padding: 40px; text-align: center; color: #666;">
                    <h3>模块加载失败</h3>
                    <p>页面 "${pageConfig.title}" 的模块文件可能不存在或加载失败</p>
                    <p>请检查相关的 JavaScript 文件是否存在并正确加载</p>
                    <button onclick="location.reload()" style="margin-top: 20px; padding: 8px 16px; background: #1890ff; color: white; border: none; border-radius: 4px; cursor: pointer;">
                        重新加载页面
                    </button>
                </div>
            `;
        }

        // 更新主内容区
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.innerHTML = content;
        }

        // 等待DOM更新完成后再初始化页面
        if (!isErrorContent) {
            setTimeout(async () => {
                try {
                    await pageConfig.init();
                } catch (error) {
                    console.error('页面初始化失败:', error);
                    // 显示错误信息
                    if (mainContent) {
                        mainContent.innerHTML = `
                            <div style="padding: 40px; text-align: center; color: #ff4d4f;">
                                <h3>页面初始化失败</h3>
                                <p>错误信息: ${error.message}</p>
                                <button onclick="location.reload()" style="margin-top: 20px; padding: 8px 16px; background: #1890ff; color: white; border: none; border-radius: 4px; cursor: pointer;">
                                    重新加载页面
                                </button>
                            </div>
                        `;
                    }
                }
            }, 0);
        }

        // 更新当前页面
        this.currentPage = pageId;

        // 保存当前页面到 sessionStorage
        sessionStorage.setItem('currentPage', pageId);

        // 更新 URL hash（不会触发页面刷新）
        window.location.hash = pageId;

        console.log('页面切换完成:', pageId);
    },

    // 获取当前应该显示的页面
    getCurrentPage() {
        // 优先从 URL hash 获取
        const hashPage = window.location.hash.slice(1);
        if (hashPage && this.pages[hashPage]) {
            return hashPage;
        }
        // 其次从 sessionStorage 获取
        const savedPage = sessionStorage.getItem('currentPage');
        if (savedPage && this.pages[savedPage]) {
            return savedPage;
        }
        // 默认返回第一个页面
        return 'appRecognition';
    }
};



// 添加模块检测功能
function checkModuleStatus() {
    const modules = {
        'Dexie': typeof Dexie !== 'undefined',
        'AppDataManagerV2': typeof window.AppDataManagerV2 !== 'undefined',
        'appRecognitionV3': typeof window.appRecognitionV3 !== 'undefined',
        'appRecognitionV2': typeof window.appRecognitionV2 !== 'undefined',
        'appManagementV2': typeof window.appManagementV2 !== 'undefined',
        'trafficColoringV2': typeof window.trafficColoringV2 !== 'undefined',
        'trafficColoring': typeof window.trafficColoring !== 'undefined',
        'digitalWatermarkV2': typeof window.digitalWatermarkV2 !== 'undefined',
        'digitalWatermark': typeof window.digitalWatermark !== 'undefined',
        'watermarkTraceV2': typeof window.watermarkTraceV2 !== 'undefined',
        'watermarkTrace': typeof window.watermarkTrace !== 'undefined',
        'openApiV2': typeof window.openApiV2 !== 'undefined',
        'openApi': typeof window.openApi !== 'undefined'
    };

    console.group('📦 模块加载状态检查');
    Object.entries(modules).forEach(([name, loaded]) => {
        console.log(`${loaded ? '✅' : '❌'} ${name}: ${loaded ? '已加载' : '未加载'}`);
    });
    console.groupEnd();

    return modules;
}

// 添加到全局作用域，方便调试
window.checkModuleStatus = checkModuleStatus;

// 页面初始化
document.addEventListener('DOMContentLoaded', async function () {
    console.log('🚀 DOM 加载完成，开始初始化');

    // 初始化页面管理器
    if (typeof pageManager !== 'undefined') {
        await pageManager.init();
        const currentPage = pageManager.getCurrentPage();
        await pageManager.showPage(currentPage);
    }
});
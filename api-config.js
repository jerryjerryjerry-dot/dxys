// API配置文件 - 后端接口集成
window.ApiConfig = {
  // API基础配置
  baseURL: 'https://your-api-domain.com', // 替换为您的后端域名
  timeout: 10000,

  // 环境配置
  environments: {
    development: {
      baseURL: 'http://localhost:3000',
      debug: true
    },
    staging: {
      baseURL: 'https://staging-api.your-domain.com',
      debug: true
    },
    production: {
      baseURL: 'https://api.your-domain.com',
      debug: false
    }
  },

  // 当前环境
  currentEnv: 'development', // 'development' | 'staging' | 'production'

  // 获取当前环境配置
  getCurrentConfig() {
    return this.environments[this.currentEnv];
  },

  // 获取完整URL
  getFullURL(endpoint) {
    const config = this.getCurrentConfig();
    return `${config.baseURL}${endpoint}`;
  },

  // API端点定义
  endpoints: {
    // 流量染色策略
    coloringStrategies: {
      getAll: '/api/coloring-strategies',
      getById: (id) => `/api/coloring-strategies/${id}`,
      create: '/api/coloring-strategies',
      update: (id) => `/api/coloring-strategies/${id}`,
      delete: (id) => `/api/coloring-strategies/${id}`,
      bulkUpdate: '/api/coloring-strategies/bulk-update',
      bulkDelete: '/api/coloring-strategies/bulk-delete'
    },

    // 应用识别策略
    recognitionStrategies: {
      getAll: '/api/recognition-strategies',
      getById: (id) => `/api/recognition-strategies/${id}`,
      create: '/api/recognition-strategies',
      update: (id) => `/api/recognition-strategies/${id}`,
      delete: (id) => `/api/recognition-strategies/${id}`
    },

    // 应用管理
    apps: {
      internal: {
        getAll: '/api/apps/internal',
        create: '/api/apps/internal',
        update: (id) => `/api/apps/internal/${id}`,
        delete: (id) => `/api/apps/internal/${id}`
      },
      crossBorder: {
        getAll: '/api/apps/cross-border',
        create: '/api/apps/cross-border',
        update: (id) => `/api/apps/cross-border/${id}`,
        delete: (id) => `/api/apps/cross-border/${id}`
      }
    },

    // 数字水印
    watermark: {
      configs: {
        getAll: '/api/watermark/configs',
        create: '/api/watermark/configs',
        update: (id) => `/api/watermark/configs/${id}`,
        delete: (id) => `/api/watermark/configs/${id}`
      },
      records: {
        getAll: '/api/watermark/records',
        create: '/api/watermark/records',
        getById: (id) => `/api/watermark/records/${id}`
      },
      analysis: {
        getAll: '/api/watermark/analysis',
        create: '/api/watermark/analysis',
        getById: (id) => `/api/watermark/analysis/${id}`
      }
    },

    // 用户认证
    auth: {
      login: '/api/auth/login',
      logout: '/api/auth/logout',
      refresh: '/api/auth/refresh',
      profile: '/api/auth/profile'
    },

    // 操作日志
    logs: {
      getAll: '/api/logs',
      create: '/api/logs',
      getById: (id) => `/api/logs/${id}`
    }
  },

  // HTTP请求工具
  async request(method, endpoint, data = null, options = {}) {
    const config = this.getCurrentConfig();
    const url = this.getFullURL(endpoint);

    const defaultOptions = {
      method: method.toUpperCase(),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...this.getAuthHeaders(),
        ...options.headers
      },
      timeout: this.timeout,
      ...options
    };

    if (data && ['POST', 'PUT', 'PATCH'].includes(defaultOptions.method)) {
      defaultOptions.body = JSON.stringify(data);
    }

    try {
      if (config.debug) {
        console.log(`🌐 API请求: ${method.toUpperCase()} ${url}`, data);
      }

      const response = await fetch(url, defaultOptions);

      if (!response.ok) {
        throw new Error(`API请求失败: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();

      if (config.debug) {
        console.log(`✅ API响应:`, result);
      }

      return result;
    } catch (error) {
      console.error(`❌ API请求错误 [${method.toUpperCase()} ${url}]:`, error);
      throw error;
    }
  },

  // 获取认证头
  getAuthHeaders() {
    const token = localStorage.getItem('auth_token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  },

  // 设置认证令牌
  setAuthToken(token) {
    localStorage.setItem('auth_token', token);
  },

  // 清除认证令牌
  clearAuthToken() {
    localStorage.removeItem('auth_token');
  },

  // 便捷方法
  get(endpoint, options) {
    return this.request('GET', endpoint, null, options);
  },

  post(endpoint, data, options) {
    return this.request('POST', endpoint, data, options);
  },

  put(endpoint, data, options) {
    return this.request('PUT', endpoint, data, options);
  },

  delete(endpoint, options) {
    return this.request('DELETE', endpoint, null, options);
  }
};

// 扩展AppDataManagerV2的API操作
if (typeof AppDataManagerV2 !== 'undefined') {
  // 增强流量染色策略的API操作
  AppDataManagerV2.coloringStrategies.dataAdapter.apiOperation = async function (operation, ...args) {
    const api = window.ApiConfig;
    const endpoints = api.endpoints.coloringStrategies;

    try {
      switch (operation) {
        case 'getAll':
          return await api.get(endpoints.getAll);

        case 'getById':
          return await api.get(endpoints.getById(args[0]));

        case 'add':
          return await api.post(endpoints.create, args[0]);

        case 'update':
          return await api.put(endpoints.update(args[0]), args[1]);

        case 'delete':
          await api.delete(endpoints.delete(args[0]));
          return { success: true };

        case 'bulkUpdate':
          const [ids, updates] = args;
          return await api.post(endpoints.bulkUpdate, { ids, updates });

        case 'bulkDelete':
          return await api.post(endpoints.bulkDelete, { ids: args[0] });

        default:
          throw new Error(`未知的API操作: ${operation}`);
      }
    } catch (error) {
      console.error(`❌ 流量染色策略API操作失败 [${operation}]:`, error);
      throw error;
    }
  };

  // 全局切换到API模式的方法
  window.switchToApiMode = function () {
    AppDataManagerV2.coloringStrategies.dataAdapter.setMode('api');
    console.log('🔄 已切换到API模式');
  };

  // 全局切换到本地模式的方法
  window.switchToLocalMode = function () {
    AppDataManagerV2.coloringStrategies.dataAdapter.setMode('indexeddb');
    console.log('🔄 已切换到本地模式');
  };
}

// 环境检测和自动配置
(function () {
  const hostname = window.location.hostname;

  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    window.ApiConfig.currentEnv = 'development';
  } else if (hostname.includes('staging') || hostname.includes('test')) {
    window.ApiConfig.currentEnv = 'staging';
  } else {
    window.ApiConfig.currentEnv = 'production';
  }

  console.log(`🌍 检测到环境: ${window.ApiConfig.currentEnv}`);
})();

console.log('✅ API配置已加载，支持环境:', Object.keys(window.ApiConfig.environments));

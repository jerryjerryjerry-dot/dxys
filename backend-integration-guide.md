# 🔌 后端接口集成指南

## 📋 概述

您的前端项目已经完美支持后端接口集成，采用**数据适配器模式**实现无感切换。

## 🏗️ 架构设计

```
前端业务层 (trafficColoringV2.js)
     ↓
数据管理层 (AppDataManagerV2.js)
     ↓
数据适配器 (dataAdapter)
   ↙        ↘
IndexedDB   API接口
```

## 🔄 集成步骤

### 1️⃣ 引入API配置文件

在所有HTML页面中添加：

```html
<!-- 在AppDataManagerV2.js之后引入 -->
<script src="api-config.js"></script>
```

### 2️⃣ 切换数据源模式

```javascript
// 开发阶段：使用本地数据库
AppDataManagerV2.coloringStrategies.dataAdapter.setMode('indexeddb');

// 上线后：切换到API接口
AppDataManagerV2.coloringStrategies.dataAdapter.setMode('api');
```

### 3️⃣ 环境配置

修改 `api-config.js` 中的配置：

```javascript
environments: {
    development: {
        baseURL: 'http://localhost:3000',  // 本地后端
        debug: true
    },
    production: {
        baseURL: 'https://api.your-domain.com',  // 生产后端
        debug: false
    }
}
```

## 📡 API接口规范

### 流量染色策略接口

| 方法 | 端点 | 说明 |
|------|------|------|
| GET | `/api/coloring-strategies` | 获取所有策略 |
| GET | `/api/coloring-strategies/:id` | 获取单个策略 |
| POST | `/api/coloring-strategies` | 创建策略 |
| PUT | `/api/coloring-strategies/:id` | 更新策略 |
| DELETE | `/api/coloring-strategies/:id` | 删除策略 |
| POST | `/api/coloring-strategies/bulk-update` | 批量更新 |
| POST | `/api/coloring-strategies/bulk-delete` | 批量删除 |

### 请求/响应格式

#### 创建策略请求：
```json
{
    "name": "业务系统访问流量染色",
    "scope": "研发部门",
    "techniques": ["应用染色", "数据流染色"],
    "note": "用于追踪业务系统的访问流量",
    "status": true,
    "effectObject": "全部员工和设备",
    "coloringConfig": {
        "appColoring": {
            "enabled": true,
            "address": true,
            "protocol": false,
            "ip": true
        },
        "dataFlowColoring": true,
        "dataTrackingColoring": false
    }
}
```

#### 响应格式：
```json
{
    "id": 1,
    "name": "业务系统访问流量染色",
    "scope": "研发部门",
    "techniques": ["应用染色", "数据流染色"],
    "note": "用于追踪业务系统的访问流量",
    "status": true,
    "effectObject": "全部员工和设备",
    "coloringConfig": {
        "appColoring": {
            "enabled": true,
            "address": true,
            "protocol": false,
            "ip": true
        },
        "dataFlowColoring": true,
        "dataTrackingColoring": false
    },
    "createTime": "2023-08-13T01:45:00.000Z",
    "lastUpdated": "2023-08-13T01:45:00.000Z"
}
```

## 🔐 认证集成

### JWT令牌认证

```javascript
// 登录后设置令牌
ApiConfig.setAuthToken(response.token);

// 自动在请求头中添加认证信息
headers: {
    'Authorization': `Bearer ${token}`
}
```

### 登录流程集成

修改 `auth.js`：

```javascript
async function login(username, password) {
    try {
        const response = await ApiConfig.post('/api/auth/login', {
            username,
            password
        });
        
        // 保存令牌
        ApiConfig.setAuthToken(response.token);
        
        // 切换到API模式
        switchToApiMode();
        
        return response;
    } catch (error) {
        console.error('登录失败:', error);
        throw error;
    }
}
```

## 🚀 部署方案调整

### 前后端分离部署

#### 前端部署：
- **静态托管**：Netlify、Vercel、GitHub Pages
- **CDN加速**：自动获得全球加速
- **域名**：`https://app.your-domain.com`

#### 后端部署：
- **API服务**：Node.js、Python、Java等
- **数据库**：MySQL、PostgreSQL、MongoDB等
- **域名**：`https://api.your-domain.com`

### CORS配置

后端需要配置CORS允许前端域名：

```javascript
// Node.js Express示例
app.use(cors({
    origin: [
        'https://app.your-domain.com',
        'http://localhost:8000'  // 开发环境
    ],
    credentials: true
}));
```

## 🔧 开发调试

### 本地开发

```javascript
// 开发时使用本地数据库
AppDataManagerV2.coloringStrategies.dataAdapter.setMode('indexeddb');

// 测试API时切换模式
AppDataManagerV2.coloringStrategies.dataAdapter.setMode('api');
```

### 调试工具

浏览器控制台中可用的调试命令：

```javascript
// 切换到API模式
switchToApiMode();

// 切换到本地模式
switchToLocalMode();

// 查看当前模式
console.log(AppDataManagerV2.coloringStrategies.dataAdapter.mode);

// 测试API连接
ApiConfig.get('/api/coloring-strategies').then(console.log);
```

## 📊 数据迁移

### 从本地数据库迁移到API

```javascript
// 导出本地数据
const localData = await AppDataManagerV2.db.coloringStrategies.toArray();

// 切换到API模式
switchToApiMode();

// 批量导入数据
for (const item of localData) {
    delete item.id; // 移除本地ID
    await AppDataManagerV2.coloringStrategies.add(item);
}
```

## ✅ 集成检查清单

- [ ] 引入 `api-config.js`
- [ ] 配置后端API地址
- [ ] 实现后端API接口
- [ ] 配置CORS
- [ ] 集成认证系统
- [ ] 测试所有CRUD操作
- [ ] 配置生产环境
- [ ] 数据迁移
- [ ] 部署前后端服务

## 🎯 优势总结

✅ **无缝切换**：业务代码无需修改  
✅ **渐进式升级**：可以逐步从本地数据库迁移到API  
✅ **开发友好**：支持本地开发和在线调试  
✅ **生产就绪**：完整的错误处理和日志记录  
✅ **扩展性强**：支持多种认证方式和部署方案  

**您的架构设计非常优秀，后期接口集成将会非常顺利！** 🚀

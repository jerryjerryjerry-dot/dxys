// 应用管理页面模块
window.appManagement = {
    id: 'appManagement',
    title: '应用管理',

    // 内置应用数据
    builtinApps: [
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
        { id: 41, name: '阿里云RDS', address: 'www.aliyun.com/product/rds', type: '数据库服务', category: '云服务', status: '启用', description: '阿里云关系型数据库服务', tags: ['数据库', 'RDS', '阿里云'] },
        { id: 42, name: '腾讯云CDB', address: 'cloud.tencent.com/product/cdb', type: '数据库服务', category: '云服务', status: '启用', description: '腾讯云数据库服务', tags: ['数据库', 'MySQL', '腾讯云'] },
        { id: 43, name: 'AWS RDS', address: 'aws.amazon.com/rds', type: '数据库服务', category: '云服务', status: '启用', description: '亚马逊RDS数据库服务', tags: ['数据库', 'RDS', 'AWS'] },
        { id: 44, name: 'Azure SQL', address: 'azure.microsoft.com/services/sql-database', type: '数据库服务', category: '云服务', status: '启用', description: '微软Azure SQL数据库服务', tags: ['数据库', 'SQL', 'Azure'] },
        { id: 45, name: 'MongoDB Atlas', address: 'www.mongodb.com/atlas', type: '数据库服务', category: '云服务', status: '启用', description: 'MongoDB云数据库服务', tags: ['数据库', 'NoSQL', 'MongoDB'] },
        // 办公应用 - 日历
        { id: 46, name: 'Google Calendar', address: 'calendar.google.com', type: '日历', category: '办公应用', status: '启用', description: '谷歌日历服务', tags: ['日历', '办公', '谷歌'] },
        { id: 47, name: 'Outlook Calendar', address: 'outlook.office365.com/calendar', type: '日历', category: '办公应用', status: '启用', description: '微软Outlook日历', tags: ['日历', '办公', '微软'] },
        { id: 48, name: '钉钉日历', address: 'calendar.dingtalk.com', type: '日历', category: '办公应用', status: '启用', description: '钉钉日历服务', tags: ['日历', '办公', '钉钉'] },
        { id: 49, name: '飞书日历', address: 'calendar.feishu.cn', type: '日历', category: '办公应用', status: '启用', description: '飞书日历服务', tags: ['日历', '办公', '飞书'] },
        // 办公应用 - 任务
        { id: 50, name: 'Trello', address: 'trello.com', type: '任务', category: '办公应用', status: '启用', description: 'Trello看板任务管理', tags: ['任务', '协作', '看板'] },
        { id: 51, name: 'Asana', address: 'asana.com', type: '任务', category: '办公应用', status: '启用', description: 'Asana任务协作平台', tags: ['任务', '协作', '项目'] },
        { id: 52, name: 'Teambition', address: 'teambition.com', type: '任务', category: '办公应用', status: '启用', description: '阿里Teambition项目管理', tags: ['任务', '协作', '阿里'] },
        { id: 53, name: 'ClickUp', address: 'clickup.com', type: '任务', category: '办公应用', status: '启用', description: 'ClickUp任务管理', tags: ['任务', '协作', '项目'] },
        // 办公应用 - 笔记
        { id: 54, name: 'Evernote', address: 'evernote.com', type: '笔记', category: '办公应用', status: '启用', description: '印象笔记', tags: ['笔记', '知识', '云笔记'] },
        { id: 55, name: '有道云笔记', address: 'note.youdao.com', type: '笔记', category: '办公应用', status: '启用', description: '有道云笔记', tags: ['笔记', '知识', '网易'] },
        { id: 56, name: 'OneNote', address: 'onenote.com', type: '笔记', category: '办公应用', status: '启用', description: '微软OneNote', tags: ['笔记', '知识', '微软'] },
        { id: 57, name: '为知笔记', address: 'wiz.cn', type: '笔记', category: '办公应用', status: '启用', description: '为知笔记', tags: ['笔记', '知识', '云笔记'] },
        // 办公应用 - 通讯录
        { id: 58, name: '企业微信通讯录', address: 'work.weixin.qq.com/contacts', type: '通讯录', category: '办公应用', status: '启用', description: '企业微信通讯录', tags: ['通讯录', '办公', '微信'] },
        { id: 59, name: '钉钉通讯录', address: 'dingtalk.com/contacts', type: '通讯录', category: '办公应用', status: '启用', description: '钉钉通讯录', tags: ['通讯录', '办公', '钉钉'] },
        { id: 60, name: '飞书通讯录', address: 'feishu.cn/contacts', type: '通讯录', category: '办公应用', status: '启用', description: '飞书通讯录', tags: ['通讯录', '办公', '飞书'] },
        { id: 61, name: 'Outlook People', address: 'outlook.office365.com/people', type: '通讯录', category: '办公应用', status: '启用', description: '微软Outlook通讯录', tags: ['通讯录', '办公', '微软'] },
        // 办公应用 - 审批
        { id: 62, name: '企业微信审批', address: 'work.weixin.qq.com/approve', type: '审批', category: '办公应用', status: '启用', description: '企业微信审批', tags: ['审批', '办公', '微信'] },
        { id: 63, name: '钉钉审批', address: 'dingtalk.com/approve', type: '审批', category: '办公应用', status: '启用', description: '钉钉审批', tags: ['审批', '办公', '钉钉'] },
        { id: 64, name: '飞书审批', address: 'feishu.cn/approve', type: '审批', category: '办公应用', status: '启用', description: '飞书审批', tags: ['审批', '办公', '飞书'] },
        { id: 65, name: '泛微OA审批', address: 'weaver.com.cn/oa', type: '审批', category: '办公应用', status: '启用', description: '泛微OA审批', tags: ['审批', 'OA', '泛微'] },
        // 办公应用 - 公告
        { id: 66, name: '企业微信公告', address: 'work.weixin.qq.com/notice', type: '公告', category: '办公应用', status: '启用', description: '企业微信公告', tags: ['公告', '办公', '微信'] },
        { id: 67, name: '钉钉公告', address: 'dingtalk.com/notice', type: '公告', category: '办公应用', status: '启用', description: '钉钉公告', tags: ['公告', '办公', '钉钉'] },
        { id: 68, name: '飞书公告', address: 'feishu.cn/notice', type: '公告', category: '办公应用', status: '启用', description: '飞书公告', tags: ['公告', '办公', '飞书'] },
        { id: 69, name: '泛微OA公告', address: 'weaver.com.cn/oa/notice', type: '公告', category: '办公应用', status: '启用', description: '泛微OA公告', tags: ['公告', 'OA', '泛微'] },
        // 办公应用 - 考勤
        { id: 70, name: '企业微信考勤', address: 'work.weixin.qq.com/attendance', type: '考勤', category: '办公应用', status: '启用', description: '企业微信考勤', tags: ['考勤', '办公', '微信'] },
        { id: 71, name: '钉钉考勤', address: 'dingtalk.com/attendance', type: '考勤', category: '办公应用', status: '启用', description: '钉钉考勤', tags: ['考勤', '办公', '钉钉'] },
        { id: 72, name: '飞书考勤', address: 'feishu.cn/attendance', type: '考勤', category: '办公应用', status: '启用', description: '飞书考勤', tags: ['考勤', '办公', '飞书'] },
        { id: 73, name: '泛微OA考勤', address: 'weaver.com.cn/oa/attendance', type: '考勤', category: '办公应用', status: '启用', description: '泛微OA考勤', tags: ['考勤', 'OA', '泛微'] },
        // 办公应用 - 报销
        { id: 74, name: '企业微信报销', address: 'work.weixin.qq.com/expense', type: '报销', category: '办公应用', status: '启用', description: '企业微信报销', tags: ['报销', '办公', '微信'] },
        { id: 75, name: '钉钉报销', address: 'dingtalk.com/expense', type: '报销', category: '办公应用', status: '启用', description: '钉钉报销', tags: ['报销', '办公', '钉钉'] },
        { id: 76, name: '飞书报销', address: 'feishu.cn/expense', type: '报销', category: '办公应用', status: '启用', description: '飞书报销', tags: ['报销', '办公', '飞书'] },
        { id: 77, name: '泛微OA报销', address: 'weaver.com.cn/oa/expense', type: '报销', category: '办公应用', status: '启用', description: '泛微OA报销', tags: ['报销', 'OA', '泛微'] },
        // 办公应用 - 资产
        { id: 78, name: '企业微信资产管理', address: 'work.weixin.qq.com/asset', type: '资产', category: '办公应用', status: '启用', description: '企业微信资产管理', tags: ['资产', '办公', '微信'] },
        { id: 79, name: '钉钉资产管理', address: 'dingtalk.com/asset', type: '资产', category: '办公应用', status: '启用', description: '钉钉资产管理', tags: ['资产', '办公', '钉钉'] },
        { id: 80, name: '飞书资产管理', address: 'feishu.cn/asset', type: '资产', category: '办公应用', status: '启用', description: '飞书资产管理', tags: ['资产', '办公', '飞书'] },
        { id: 81, name: '泛微OA资产', address: 'weaver.com.cn/oa/asset', type: '资产', category: '办公应用', status: '启用', description: '泛微OA资产管理', tags: ['资产', 'OA', '泛微'] },
        // 办公应用 - 知识库
        { id: 82, name: '企业微信知识库', address: 'work.weixin.qq.com/wiki', type: '知识库', category: '办公应用', status: '启用', description: '企业微信知识库', tags: ['知识库', '办公', '微信'] },
        { id: 83, name: '钉钉知识库', address: 'dingtalk.com/wiki', type: '知识库', category: '办公应用', status: '启用', description: '钉钉知识库', tags: ['知识库', '办公', '钉钉'] },
        { id: 84, name: '飞书知识库', address: 'feishu.cn/wiki', type: '知识库', category: '办公应用', status: '启用', description: '飞书知识库', tags: ['知识库', '办公', '飞书'] },
        { id: 85, name: 'Confluence', address: 'confluence.atlassian.com', type: '知识库', category: '办公应用', status: '启用', description: 'Atlassian Confluence知识库', tags: ['知识库', '协作', 'Atlassian'] },
        // 办公应用 - 门户
        { id: 86, name: '泛微OA门户', address: 'weaver.com.cn/oa/portal', type: '门户', category: '办公应用', status: '启用', description: '泛微OA门户', tags: ['门户', 'OA', '泛微'] },
        { id: 87, name: '致远OA门户', address: 'seeyon.com/portal', type: '门户', category: '办公应用', status: '启用', description: '致远OA门户', tags: ['门户', 'OA', '致远'] },
        { id: 88, name: '蓝凌OA门户', address: 'landray.com.cn/portal', type: '门户', category: '办公应用', status: '启用', description: '蓝凌OA门户', tags: ['门户', 'OA', '蓝凌'] },
        { id: 89, name: '金和OA门户', address: 'kinggrid.com/portal', type: '门户', category: '办公应用', status: '启用', description: '金和OA门户', tags: ['门户', 'OA', '金和'] },
        // 办公应用 - 人事
        { id: 90, name: '北森人事管理', address: 'beisen.com/hr', type: '人事', category: '办公应用', status: '启用', description: '北森人事管理', tags: ['人事', '办公', '北森'] },
        { id: 91, name: 'Moka招聘', address: 'moka.com/hr', type: '招聘', category: '办公应用', status: '启用', description: 'Moka招聘管理', tags: ['招聘', '办公', 'Moka'] },
        { id: 92, name: '拉勾招聘', address: 'lagou.com/hr', type: '招聘', category: '办公应用', status: '启用', description: '拉勾招聘管理', tags: ['招聘', '办公', '拉勾'] },
        { id: 93, name: '智联招聘', address: 'zhaopin.com/hr', type: '招聘', category: '办公应用', status: '启用', description: '智联招聘管理', tags: ['招聘', '办公', '智联'] },
        // 办公应用 - 培训
        { id: 94, name: '云学堂', address: 'yunxuetang.cn', type: '培训', category: '办公应用', status: '启用', description: '云学堂企业培训', tags: ['培训', '学习', '云学堂'] },
        { id: 95, name: '腾讯课堂', address: 'ke.qq.com', type: '培训', category: '办公应用', status: '启用', description: '腾讯课堂企业培训', tags: ['培训', '学习', '腾讯'] },
        { id: 96, name: '网易云课堂', address: 'study.163.com', type: '培训', category: '办公应用', status: '启用', description: '网易云课堂企业培训', tags: ['培训', '学习', '网易'] },
        { id: 97, name: '慕课网', address: 'imooc.com', type: '培训', category: '办公应用', status: '启用', description: '慕课网企业培训', tags: ['培训', '学习', '慕课'] },
        // 办公应用 - 绩效
        { id: 98, name: '北森绩效管理', address: 'beisen.com/performance', type: '绩效', category: '办公应用', status: '启用', description: '北森绩效管理', tags: ['绩效', '办公', '北森'] },
        { id: 99, name: 'Moka绩效', address: 'moka.com/performance', type: '绩效', category: '办公应用', status: '启用', description: 'Moka绩效管理', tags: ['绩效', '办公', 'Moka'] },
        { id: 100, name: '致远OA绩效', address: 'seeyon.com/performance', type: '绩效', category: '办公应用', status: '启用', description: '致远OA绩效管理', tags: ['绩效', 'OA', '致远'] },
        { id: 101, name: '泛微OA绩效', address: 'weaver.com.cn/oa/performance', type: '绩效', category: '办公应用', status: '启用', description: '泛微OA绩效管理', tags: ['绩效', 'OA', '泛微'] },
        // 办公应用 - 薪酬
        { id: 102, name: '北森薪酬管理', address: 'beisen.com/payroll', type: '薪酬', category: '办公应用', status: '启用', description: '北森薪酬管理', tags: ['薪酬', '办公', '北森'] },
        { id: 103, name: 'Moka薪酬', address: 'moka.com/payroll', type: '薪酬', category: '办公应用', status: '启用', description: 'Moka薪酬管理', tags: ['薪酬', '办公', 'Moka'] },
        { id: 104, name: '致远OA薪酬', address: 'seeyon.com/payroll', type: '薪酬', category: '办公应用', status: '启用', description: '致远OA薪酬管理', tags: ['薪酬', 'OA', '致远'] },
        { id: 105, name: '泛微OA薪酬', address: 'weaver.com.cn/oa/payroll', type: '薪酬', category: '办公应用', status: '启用', description: '泛微OA薪酬管理', tags: ['薪酬', 'OA', '泛微'] },
        // 办公应用 - 福利
        { id: 106, name: '北森福利管理', address: 'beisen.com/welfare', type: '福利', category: '办公应用', status: '启用', description: '北森福利管理', tags: ['福利', '办公', '北森'] },
        { id: 107, name: 'Moka福利', address: 'moka.com/welfare', type: '福利', category: '办公应用', status: '启用', description: 'Moka福利管理', tags: ['福利', '办公', 'Moka'] },
        { id: 108, name: '致远OA福利', address: 'seeyon.com/welfare', type: '福利', category: '办公应用', status: '启用', description: '致远OA福利管理', tags: ['福利', 'OA', '致远'] },
        { id: 109, name: '泛微OA福利', address: 'weaver.com.cn/oa/welfare', type: '福利', category: '办公应用', status: '启用', description: '泛微OA福利管理', tags: ['福利', 'OA', '泛微'] },
        // 开发工具 - 代码托管
        { id: 110, name: 'Bitbucket Server', address: 'bitbucket.org/server', type: '代码仓库', category: '开发工具', status: '启用', description: 'Bitbucket企业版', tags: ['代码仓库', 'Git', 'Atlassian'] },
        { id: 111, name: 'Gogs', address: 'gogs.io', type: '代码仓库', category: '开发工具', status: '启用', description: 'Gogs轻量级Git服务', tags: ['代码仓库', 'Git', '开源'] },
        { id: 112, name: 'Phabricator', address: 'phacility.com', type: '代码仓库', category: '开发工具', status: '启用', description: 'Phabricator代码托管', tags: ['代码仓库', 'Git', 'Phabricator'] },
        { id: 113, name: 'SourceForge', address: 'sourceforge.net', type: '代码仓库', category: '开发工具', status: '启用', description: 'SourceForge开源托管', tags: ['代码仓库', 'Git', '开源'] },
        // 开发工具 - CI/CD
        { id: 114, name: 'Bamboo', address: 'atlassian.com/software/bamboo', type: 'CI/CD工具', category: '开发工具', status: '启用', description: 'Atlassian Bamboo持续集成', tags: ['CI/CD', '自动化', 'Atlassian'] },
        { id: 115, name: 'Drone CI', address: 'drone.io', type: 'CI/CD工具', category: '开发工具', status: '启用', description: 'Drone CI自动化', tags: ['CI/CD', '自动化', '开源'] },
        { id: 116, name: 'Buildkite', address: 'buildkite.com', type: 'CI/CD工具', category: '开发工具', status: '启用', description: 'Buildkite持续集成', tags: ['CI/CD', '自动化', '云服务'] },
        { id: 117, name: 'TeamCity', address: 'jetbrains.com/teamcity', type: 'CI/CD工具', category: '开发工具', status: '启用', description: 'JetBrains TeamCity', tags: ['CI/CD', '自动化', 'JetBrains'] },
        // 开发工具 - 监控
        { id: 118, name: '阿里云云监控', address: 'cms.aliyun.com', type: '监控工具', category: '开发工具', status: '启用', description: '阿里云云监控', tags: ['监控', '云服务', '阿里云'] },
        { id: 119, name: '腾讯云监控', address: 'cloud.tencent.com/product/monitor', type: '监控工具', category: '开发工具', status: '启用', description: '腾讯云监控', tags: ['监控', '云服务', '腾讯云'] },
        { id: 120, name: '百度云监控', address: 'cloud.baidu.com/product/monitor', type: '监控工具', category: '开发工具', status: '启用', description: '百度云监控', tags: ['监控', '云服务', '百度云'] },
        { id: 121, name: '华为云监控', address: 'support.huaweicloud.com/monitor', type: '监控工具', category: '开发工具', status: '启用', description: '华为云监控', tags: ['监控', '云服务', '华为云'] },
        // 云服务 - 云主机
        { id: 122, name: '阿里云ECS', address: 'ecs.aliyun.com', type: '云主机', category: '云服务', status: '启用', description: '阿里云弹性计算ECS', tags: ['云主机', '云服务', '阿里云'] },
        { id: 123, name: '腾讯云CVM', address: 'cloud.tencent.com/product/cvm', type: '云主机', category: '云服务', status: '启用', description: '腾讯云云服务器CVM', tags: ['云主机', '云服务', '腾讯云'] },
        { id: 124, name: '华为云ECS', address: 'support.huaweicloud.com/ecs', type: '云主机', category: '云服务', status: '启用', description: '华为云弹性云服务器ECS', tags: ['云主机', '云服务', '华为云'] },
        { id: 125, name: '百度云BCC', address: 'cloud.baidu.com/product/bcc', type: '云主机', category: '云服务', status: '启用', description: '百度云BCC云主机', tags: ['云主机', '云服务', '百度云'] },
        // 云服务 - 云数据库
        { id: 126, name: '阿里云RDS', address: 'rds.aliyun.com', type: '数据库服务', category: '云服务', status: '启用', description: '阿里云关系型数据库RDS', tags: ['数据库', '云服务', '阿里云'] },
        { id: 127, name: '腾讯云CDB', address: 'cloud.tencent.com/product/cdb', type: '数据库服务', category: '云服务', status: '启用', description: '腾讯云CDB数据库', tags: ['数据库', '云服务', '腾讯云'] },
        { id: 128, name: '华为云RDS', address: 'support.huaweicloud.com/rds', type: '数据库服务', category: '云服务', status: '启用', description: '华为云RDS数据库', tags: ['数据库', '云服务', '华为云'] },
        { id: 129, name: '百度云RDS', address: 'cloud.baidu.com/product/rds', type: '数据库服务', category: '云服务', status: '启用', description: '百度云RDS数据库', tags: ['数据库', '云服务', '百度云'] },
        // 企业管理 - ERP
        { id: 130, name: '用友ERP', address: 'yonyou.com/erp', type: 'ERP', category: '企业管理', status: '启用', description: '用友ERP系统', tags: ['ERP', '企业管理', '用友'] },
        { id: 131, name: '金蝶ERP', address: 'kingdee.com/erp', type: 'ERP', category: '企业管理', status: '启用', description: '金蝶ERP系统', tags: ['ERP', '企业管理', '金蝶'] },
        { id: 132, name: 'SAP ERP', address: 'sap.com/erp', type: 'ERP', category: '企业管理', status: '启用', description: 'SAP ERP系统', tags: ['ERP', '企业管理', 'SAP'] },
        { id: 133, name: 'Oracle ERP', address: 'oracle.com/erp', type: 'ERP', category: '企业管理', status: '启用', description: 'Oracle ERP系统', tags: ['ERP', '企业管理', 'Oracle'] },
        // 企业管理 - CRM
        { id: 134, name: 'Salesforce CRM', address: 'salesforce.com/crm', type: 'CRM', category: '企业管理', status: '启用', description: 'Salesforce CRM系统', tags: ['CRM', '企业管理', 'Salesforce'] },
        { id: 135, name: 'Zoho CRM', address: 'zoho.com/crm', type: 'CRM', category: '企业管理', status: '启用', description: 'Zoho CRM系统', tags: ['CRM', '企业管理', 'Zoho'] },
        { id: 136, name: 'HubSpot CRM', address: 'hubspot.com/crm', type: 'CRM', category: '企业管理', status: '启用', description: 'HubSpot CRM系统', tags: ['CRM', '企业管理', 'HubSpot'] },
        { id: 137, name: '纷享销客CRM', address: 'fxiaoke.com/crm', type: 'CRM', category: '企业管理', status: '启用', description: '纷享销客CRM系统', tags: ['CRM', '企业管理', '纷享销客'] },

        // 企业管理 - SCM
        { id: 138, name: 'Oracle SCM', address: 'oracle.com/scm', type: 'SCM', category: '企业管理', status: '启用', description: 'Oracle供应链管理系统', tags: ['SCM', '供应链', 'Oracle'] },
        { id: 139, name: 'SAP SCM', address: 'sap.com/scm', type: 'SCM', category: '企业管理', status: '启用', description: 'SAP供应链管理系统', tags: ['SCM', '供应链', 'SAP'] },
        { id: 140, name: '用友SCM', address: 'yonyou.com/scm', type: 'SCM', category: '企业管理', status: '启用', description: '用友供应链管理系统', tags: ['SCM', '供应链', '用友'] },
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
        { id: 190, name: 'Skype', address: 'skype.com', type: '语音通话', category: '通信服务', status: '启用', description: 'Skype语音通话服务', tags: ['语音通话', '视频', 'Skype'] },
        { id: 191, name: 'Viber', address: 'viber.com', type: '语音通话', category: '通信服务', status: '启用', description: 'Viber语音通话服务', tags: ['语音通话', '移动', 'Viber'] },
        { id: 192, name: 'Line', address: 'line.me', type: '语音通话', category: '通信服务', status: '启用', description: 'Line语音通话服务', tags: ['语音通话', '移动', 'Line'] },
        { id: 193, name: 'WeChat', address: 'wechat.com', type: '语音通话', category: '通信服务', status: '启用', description: '微信语音通话服务', tags: ['语音通话', '移动', '微信'] },

        // 通信服务 - 短信服务
        { id: 194, name: '阿里云短信', address: 'www.aliyun.com/product/sms', type: '短信服务', category: '通信服务', status: '启用', description: '阿里云短信服务', tags: ['短信服务', '云服务', '阿里云'] },
        { id: 195, name: '腾讯云短信', address: 'cloud.tencent.com/product/sms', type: '短信服务', category: '通信服务', status: '启用', description: '腾讯云短信服务', tags: ['短信服务', '云服务', '腾讯云'] },
        { id: 196, name: '华为云短信', address: 'support.huaweicloud.com/sms', type: '短信服务', category: '通信服务', status: '启用', description: '华为云短信服务', tags: ['短信服务', '云服务', '华为云'] },
        { id: 197, name: 'Twilio', address: 'twilio.com/sms', type: '短信服务', category: '通信服务', status: '启用', description: 'Twilio短信服务', tags: ['短信服务', '云服务', 'Twilio'] },

        // 通信服务 - 邮件服务
        { id: 198, name: 'SendGrid', address: 'sendgrid.com', type: '邮件服务', category: '通信服务', status: '启用', description: 'SendGrid邮件服务', tags: ['邮件服务', '云服务', 'SendGrid'] },
        { id: 199, name: 'Mailgun', address: 'mailgun.com', type: '邮件服务', category: '通信服务', status: '启用', description: 'Mailgun邮件服务', tags: ['邮件服务', '云服务', 'Mailgun'] },
        { id: 200, name: 'Amazon SES', address: 'aws.amazon.com/ses', type: '邮件服务', category: '通信服务', status: '启用', description: '亚马逊SES邮件服务', tags: ['邮件服务', '云服务', 'AWS'] }
    ],

    // 分页配置
    pagination: {
        currentPage: 1,
        pageSize: 10,
        totalItems: 0
    },

    // 搜索配置
    search: {
        keyword: '',
        category: 'all'
    },

    // 自定义应用分页配置
    customAppPagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        totalPages: 0
    },

    // 自定义应用数据
    customAppData: [],

    // 面板样式
    panelStyles: `
        /* 应用管理面板样式 - 完全独立的作用域 */
        .app-management-panel {
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

        .app-management-panel.show {
            right: 0 !important;
        }

        .app-management-overlay {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            background: rgba(0, 0, 0, 0.5) !important;
            z-index: 9998 !important;
            opacity: 0 !important;
            transition: opacity 0.3s ease-in-out !important;
        }

        .app-management-overlay.show {
            opacity: 1 !important;
        }

        .app-management-panel .panel-header {
            padding: 16px 24px;
            border-bottom: 1px solid #f0f0f0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .app-management-panel .panel-header h3 {
            margin: 0;
            font-size: 16px;
            font-weight: 500;
        }

        .app-management-panel .btn-close {
            border: none;
            background: none;
            font-size: 20px;
            color: #999;
            cursor: pointer;
        }

        .app-management-panel .panel-body {
            flex: 1;
            padding: 24px;
            overflow-y: auto;
        }

        .app-management-panel .section {
            margin-bottom: 32px;
        }

        .app-management-panel .section h4 {
            margin-bottom: 16px;
            font-size: 14px;
            font-weight: 500;
            color: #333;
        }

        .app-management-panel .form-item {
            margin-bottom: 24px;
        }

        .app-management-panel .form-item label {
            display: block;
            margin-bottom: 8px;
            font-size: 14px;
            color: #333;
        }

        .app-management-panel .required:before {
            content: "*";
            color: #ff4d4f;
            margin-right: 4px;
        }

        .app-management-panel .form-input {
            width: 100%;
            height: 32px;
            padding: 4px 11px;
            border: 1px solid #d9d9d9;
            border-radius: 4px;
            font-size: 14px;
        }

        .app-management-panel .form-select {
            width: 100%;
            height: 32px;
            border: 1px solid #d9d9d9;
            border-radius: 4px;
            padding: 0 11px;
            font-size: 14px;
        }

        .app-management-panel .form-textarea {
            width: 100%;
            min-height: 80px;
            padding: 8px 11px;
            border: 1px solid #d9d9d9;
            border-radius: 4px;
            font-size: 14px;
            resize: vertical;
        }

        .app-management-panel .checkbox-group {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }

        .app-management-panel .checkbox-item {
            display: flex;
            align-items: flex-start;
            gap: 8px;
            cursor: pointer;
        }

        .app-management-panel .checkbox-item input[type="checkbox"] {
            margin-top: 2px;
        }

        .app-management-panel .switch {
            position: relative;
            display: inline-block;
            width: 44px;
            height: 22px;
        }

        .app-management-panel .switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }

        .app-management-panel .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            transition: .4s;
            border-radius: 34px;
        }

        .app-management-panel .slider:before {
            position: absolute;
            content: "";
            height: 18px;
            width: 18px;
            left: 2px;
            bottom: 2px;
            background-color: white;
            transition: .4s;
            border-radius: 50%;
        }

        .app-management-panel input:checked + .slider {
            background-color: #1890ff;
        }

        .app-management-panel input:checked + .slider:before {
            transform: translateX(22px);
        }

        .app-management-panel .panel-footer {
            padding: 16px 24px;
            border-top: 1px solid #f0f0f0;
            text-align: right;
        }

        .app-management-panel .btn-cancel {
            margin-right: 8px;
            padding: 8px 16px;
            border: 1px solid #d9d9d9;
            background: white;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
        }

        .app-management-panel .btn-confirm {
            padding: 8px 16px;
            background: #1890ff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
        }

        /* 应用详情样式 */
        .app-detail-panel {
            padding: 24px;
        }

        .app-detail-header {
            display: flex;
            align-items: center;
            margin-bottom: 24px;
            padding-bottom: 16px;
            border-bottom: 1px solid #f0f0f0;
        }

        .app-icon {
            width: 48px;
            height: 48px;
            background: #f0f7ff;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 16px;
            font-size: 24px;
        }

        .app-info {
            flex: 1;
        }

        .app-name {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 4px;
        }

        .app-category {
            color: #666;
            font-size: 14px;
        }

        .app-status {
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 500;
        }

        .app-status.enabled {
            background: #f6ffed;
            color: #52c41a;
        }

        .app-status.disabled {
            background: #fff2f0;
            color: #ff4d4f;
        }

        .detail-section {
            margin-bottom: 24px;
        }

        .detail-section h4 {
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 12px;
            color: #333;
        }

        .detail-item {
            display: flex;
            margin-bottom: 12px;
        }

        .detail-label {
            width: 80px;
            color: #666;
            font-size: 14px;
        }

        .detail-value {
            flex: 1;
            color: #333;
            font-size: 14px;
        }

        .app-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }

        .app-tag {
            padding: 2px 8px;
            background: #f0f7ff;
            color: #1890ff;
            border-radius: 4px;
            font-size: 12px;
        }

        /* 批量操作样式 */
        .batch-actions {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 16px;
            background: #fafafa;
            border-radius: 4px;
            margin-bottom: 16px;
        }

        .batch-actions.hidden {
            display: none;
        }

        .batch-count {
            color: #666;
            font-size: 14px;
        }

        .batch-btn {
            padding: 6px 12px;
            border: 1px solid #d9d9d9;
            background: white;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
            transition: all 0.3s;
        }

        .batch-btn:hover {
            border-color: #1890ff;
            color: #1890ff;
        }

        .batch-btn.danger:hover {
            border-color: #ff4d4f;
            color: #ff4d4f;
        }

        /* 应用名称单元格样式 */
        .app-name-cell {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }

        .app-name-cell .app-name {
            font-weight: 500;
            color: #333;
        }

        .app-name-cell .app-description {
            font-size: 12px;
            color: #666;
            line-height: 1.4;
        }

        /* 树形菜单选中状态 */
        .tree-node.active {
            background: #e6f7ff;
            color: #1890ff;
        }

        .tree-node.active .count {
            color: #1890ff;
        }

        /* 分页样式优化 */
        .pagination {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 20px;
            padding: 16px 0;
        }

        .pagination-info {
            color: #666;
            font-size: 14px;
        }

        .pagination-controls {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .page-info {
            color: #666;
            font-size: 14px;
        }

        .page-btn:disabled {
            cursor: not-allowed;
        }

        /* 链接样式 */
        .link-detail,
        .link-edit,
        .link-delete {
            color: #1890ff;
            text-decoration: none;
            margin-right: 8px;
            font-size: 14px;
        }

        .link-detail:hover,
        .link-edit:hover {
            color: #40a9ff;
        }

        .link-delete {
            color: #ff4d4f !important;
        }

        .link-delete:hover {
            color: #ff7875 !important;
        }


    `,

    // 页面内容模板
    content: function () {
        return `
            <div class="header">
                <h1>应用管理</h1>
                <p>用户可以通过控制台配置多层次应用识别策略，用于识别内网应用和跨境应用</p>
            </div>
            <div class="app-tabs">
                <a href="#" class="tab active" data-tab="builtin">内置应用</a>
                <a href="#" class="tab" data-tab="custom">自定义应用</a>
                <a href="#" class="tab" data-tab="update">更新配置</a>
            </div>
            
            <div class="tab-contents">
                <!-- 内置应用内容 -->
                <div id="builtinContent" class="tab-content" style="display: block;">
                    <div class="app-management-content">
                        <div class="left-panel">
                            <div class="search-box">
                                <input type="text" class="search-input" placeholder="请输入应用类型">
                            </div>
                            <div class="app-tree">
                                <div class="tree-container">
                                    <!-- 标准树形列表数据将通过 JavaScript 动态插入 -->
                                </div>
                            </div>
                        </div>
                        <div class="right-panel">
                            <div class="table-header">
                                <div class="search-box">
                                    <input type="text" class="search-input" placeholder="请输入应用名称/地址进行搜索">
                                </div>
                            </div>
                            
                            <!-- 批量操作栏 -->
                            <div class="batch-actions hidden">
                                <span class="batch-count">已选择 0 项</span>
                                <button class="batch-btn" onclick="window.appManagement.batchEnable()">批量启用</button>
                                <button class="batch-btn" onclick="window.appManagement.batchDisable()">批量禁用</button>
                            </div>
                            
                            <table class="app-table">
                                <thead>
                                    <tr>
                                        <th><input type="checkbox" id="selectAll"></th>
                                        <th>应用名称</th>
                                        <th>应用地址</th>
                                        <th>应用类型</th>
                                        <th>状态</th>
                                        <th>操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <!-- 表格数据将通过 JavaScript 动态插入 -->
                                </tbody>
                            </table>
                            
                            <!-- 分页 -->
                            <div class="pagination">
                                <span class="pagination-info">共 0 条记录</span>
                                <div class="pagination-controls">
                                    <button class="page-btn" onclick="window.appManagement.prevPage()">上一页</button>
                                    <span class="page-info">第 1 页，共 1 页</span>
                                    <button class="page-btn" onclick="window.appManagement.nextPage()">下一页</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 自定义应用内容 -->
                <div id="customContent" class="tab-content" style="display: none;">
                    <div class="custom-app-content">
                        <!-- 顶部操作栏 -->
                        <div class="actions">
                            <button class="btn-new">+ 添加应用</button>
                            <div class="search-box">
                                <input type="text" class="search-input" placeholder="请输入关键字进行搜索">
                                <span class="search-btn">🔍</span>
                            </div>
                        </div>

                        <!-- 应用列表表格 -->
                        <table class="custom-app-table">
                            <thead>
                                <tr>
                                    <th width="40"><input type="checkbox" id="selectAll"></th>
                                    <th width="100">应用名称</th>
                                    <th width="100">应用地址</th>
                                    <th width="100">应用类型</th>
                                    <th width="100">操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- 表格数据将通过 JavaScript 动态插入 -->
                            </tbody>
                        </table>

                        <div class="table-footer">
                            <div class="batch-actions">
                                <input type="checkbox" id="selectAllCustomApps"> 已选 <span class="selected-count">0</span> 条
                                <button class="batch-btn danger" onclick="window.appManagement.deleteSelectedCustomApps()">删除</button>
                            </div>
                            <div class="pagination">
                                <span>共 9 条记录</span>
                                <button class="page-btn"><</button>
                                <button class="page-btn active">1</button>
                                <button class="page-btn">></button>
                                <select>
                                    <option>10 条/页</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 更新配置内容 -->
                <div id="updateContent" class="tab-content" style="display: none;">
                    <div class="update-config-container">
                        <!-- 页面标题 -->
                        <div class="config-header">
                            <h2>系统配置</h2>
                            <p class="config-description">配置应用管理系统的更新策略和同步规则</p>
                        </div>

                        <!-- 配置表单 -->
                        <div class="config-form">
                            <!-- 更新策略配置 -->
                            <div class="config-section">
                                <div class="section-header">
                                    <h3>更新策略</h3>
                                    <span class="section-description">配置应用库的更新频率和方式</span>
                                </div>
                                
                                <div class="config-items">
                                    <div class="config-item">
                                        <div class="item-header">
                                            <div class="item-info">
                                                <h4>自动更新</h4>
                                                <p>启用后系统将自动检查并更新应用库</p>
                                            </div>
                                            <label class="switch">
                                                <input type="checkbox" id="autoUpdate" name="autoUpdate">
                                                <span class="slider"></span>
                                            </label>
                                        </div>
                                        <div class="item-details" id="autoUpdateDetails" style="display: none;">
                                            <div class="form-row">
                                                <div class="form-group">
                                                    <label>更新频率</label>
                                                    <select id="updateFrequency" name="updateFrequency" class="form-select">
                                                        <option value="hourly">每小时</option>
                                                        <option value="daily" selected>每日</option>
                                                        <option value="weekly">每周</option>
                                                        <option value="monthly">每月</option>
                                                    </select>
                                                </div>
                                                <div class="form-group">
                                                    <label>更新时间</label>
                                                    <input type="time" id="updateTime" name="updateTime" class="form-input" value="02:00">
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="config-item">
                                        <div class="item-header">
                                            <div class="item-info">
                                                <h4>增量更新</h4>
                                                <p>只更新发生变化的应用，提高更新效率</p>
                                            </div>
                                            <label class="switch">
                                                <input type="checkbox" id="incrementalUpdate" name="incrementalUpdate">
                                                <span class="slider"></span>
                                            </label>
                                        </div>
                                    </div>

                                    <div class="config-item">
                                        <div class="item-header">
                                            <div class="item-info">
                                                <h4>智能同步</h4>
                                                <p>根据网络状况自动调整同步策略</p>
                                            </div>
                                            <label class="switch">
                                                <input type="checkbox" id="smartSync" name="smartSync">
                                                <span class="slider"></span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- 缓存配置 -->
                            <div class="config-section">
                                <div class="section-header">
                                    <h3>缓存管理</h3>
                                    <span class="section-description">配置本地缓存规则</span>
                                </div>
                                
                                <div class="config-items">
                                    <div class="config-item">
                                        <div class="item-header">
                                            <div class="item-info">
                                                <h4>本地缓存</h4>
                                                <p>在本地保存应用数据以提高访问速度</p>
                                            </div>
                                            <label class="switch">
                                                <input type="checkbox" id="localCache" name="localCache" checked>
                                                <span class="slider"></span>
                                            </label>
                                        </div>
                                        <div class="item-details" id="localCacheDetails">
                                            <div class="form-row">
                                                <div class="form-group">
                                                    <label>缓存大小限制</label>
                                                    <select id="cacheSize" name="cacheSize" class="form-select">
                                                        <option value="100">100MB</option>
                                                        <option value="500" selected>500MB</option>
                                                        <option value="1000">1GB</option>
                                                        <option value="2000">2GB</option>
                                                    </select>
                                                </div>
                                                <div class="form-group">
                                                    <label>缓存过期时间</label>
                                                    <select id="cacheExpiry" name="cacheExpiry" class="form-select">
                                                        <option value="1">1天</option>
                                                        <option value="7" selected>7天</option>
                                                        <option value="30">30天</option>
                                                        <option value="90">90天</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>

                            <!-- 安全配置 -->
                            <div class="config-section">
                                <div class="section-header">
                                    <h3>安全设置</h3>
                                    <span class="section-description">配置应用访问和更新的安全策略</span>
                                </div>
                                
                                <div class="config-items">
                                    <div class="config-item">
                                        <div class="item-header">
                                            <div class="item-info">
                                                <h4>访问控制</h4>
                                                <p>限制应用库的访问频率和权限</p>
                                            </div>
                                            <label class="switch">
                                                <input type="checkbox" id="accessControl" name="accessControl">
                                                <span class="slider"></span>
                                            </label>
                                        </div>
                                        <div class="item-details" id="accessControlDetails" style="display: none;">
                                            <div class="form-row">
                                                <div class="form-group">
                                                    <label>最大访问频率</label>
                                                    <select id="maxAccessRate" name="maxAccessRate" class="form-select">
                                                        <option value="10">10次/分钟</option>
                                                        <option value="30" selected>30次/分钟</option>
                                                        <option value="60">60次/分钟</option>
                                                        <option value="unlimited">无限制</option>
                                                    </select>
                                                </div>
                                                <div class="form-group">
                                                    <label>IP白名单</label>
                                                    <input type="text" id="ipWhitelist" name="ipWhitelist" class="form-input" placeholder="输入IP地址，多个用逗号分隔">
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="config-item">
                                        <div class="item-header">
                                            <div class="item-info">
                                                <h4>数据加密</h4>
                                                <p>对敏感数据进行加密存储</p>
                                            </div>
                                            <label class="switch">
                                                <input type="checkbox" id="dataEncryption" name="dataEncryption">
                                                <span class="slider"></span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- 通知配置 -->
                            <div class="config-section">
                                <div class="section-header">
                                    <h3>通知设置</h3>
                                    <span class="section-description">配置系统通知和告警规则</span>
                                </div>
                                
                                <div class="config-items">
                                    <div class="config-item">
                                        <div class="item-header">
                                            <div class="item-info">
                                                <h4>更新通知</h4>
                                                <p>在应用库更新时发送通知</p>
                                            </div>
                                            <label class="switch">
                                                <input type="checkbox" id="updateNotification" name="updateNotification">
                                                <span class="slider"></span>
                                            </label>
                                        </div>
                                    </div>

                                    <div class="config-item">
                                        <div class="item-header">
                                            <div class="item-info">
                                                <h4>错误告警</h4>
                                                <p>在系统出现错误时发送告警</p>
                                            </div>
                                            <label class="switch">
                                                <input type="checkbox" id="errorAlert" name="errorAlert" checked>
                                                <span class="slider"></span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 操作按钮 -->
                        <div class="config-actions">
                            <button type="button" class="btn btn-secondary" id="resetConfig">重置</button>
                            <button type="button" class="btn btn-primary" id="saveConfig">保存配置</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    // 初始化页面
    init: function () {
        console.log('初始化应用管理页面');

        // 确保CSS样式在页面初始化时就注入
        this.injectStyles();

        // 绑定所有事件
        this.bindTabEvents();
        this.bindBuiltinAppEvents();
        this.bindCustomAppEvents();
        this.bindUpdateConfigEvents();

        // 初始化内置应用数据
        this.initBuiltinApps();

        // 加载自定义应用数据
        this.refreshCustomAppData();

        // 绑定自定义应用全选功能
        setTimeout(() => {
            this.bindCustomAppSelectAll();
        }, 100);

        console.log('应用管理页面初始化完成');
    },

    // 注入CSS样式
    injectStyles: function () {
        // 检查是否已经注入过样式
        if (document.querySelector('#app-management-styles')) {
            return;
        }

        // 创建样式元素 - 只保留非面板相关的样式
        const style = document.createElement('style');
        style.id = 'app-management-styles';
        style.textContent = `
        /* 树形结构样式 */
        .tree-container {
            padding: 16px !important;
        }

        .tree-node {
            margin-bottom: 4px !important;
        }

        .tree-node-content {
            display: flex !important;
            align-items: center !important;
            padding: 8px 12px !important;
            border-radius: 4px !important;
            cursor: pointer !important;
            transition: background-color 0.2s !important;
        }

        .tree-node-content:hover {
            background-color: #f5f5f5 !important;
        }

        .tree-node-content.selected {
            background-color: #e6f7ff !important;
            color: #1890ff !important;
        }

        .tree-toggle {
            margin-right: 8px !important;
            font-size: 12px !important;
            transition: transform 0.2s !important;
            color: #666 !important;
        }

        .tree-toggle.expanded {
            transform: rotate(90deg) !important;
        }

        .tree-toggle.collapsed {
            transform: rotate(0deg) !important;
        }

        .tree-label {
            flex: 1 !important;
            font-size: 14px !important;
        }

        .tree-count {
            background: #f0f0f0 !important;
            color: #666 !important;
            padding: 2px 6px !important;
            border-radius: 10px !important;
            font-size: 12px !important;
        }

        .tree-children {
            margin-left: 20px !important;
            transition: all 0.3s ease !important;
            border-left: none !important;
            padding-left: 0 !important;
        }

        .tree-children.collapsed {
            display: none !important;
        }

        .tree-app-item {
            padding: 6px 12px !important;
            margin: 2px 0 !important;
            border-radius: 4px !important;
            cursor: pointer !important;
            transition: background-color 0.2s !important;
        }

        .tree-app-item:hover {
            background-color: #f5f5f5 !important;
        }

        .tree-app-item.selected {
            background-color: #e6f7ff !important;
        }

        .tree-app-name {
            font-size: 13px !important;
            color: #333 !important;
        }

        .tree-app-item.selected .tree-app-name {
            color: #1890ff !important;
        }

        .tree-app-address {
            font-size: 12px !important;
            color: #999 !important;
            margin-top: 2px !important;
        }

        .tree-app-item.selected .tree-app-address {
            color: #1890ff !important;
        }

        .tree-app-item.selected .tree-app-name {
            color: #1890ff !important;
        }

        /* 应用管理页面样式 */
        .header { margin-bottom: 24px !important; }
        .app-tabs { margin-bottom: 16px !important; border-bottom: 1px solid #e8e8e8 !important; }
        .app-tabs .tab { display: inline-block !important; padding: 12px 0 !important; margin-right: 32px !important; color: #333 !important; text-decoration: none !important; position: relative !important; }
        .app-tabs .tab.active { color: #2468f2 !important; }
        .app-tabs .tab.active:after { content: '' !important; position: absolute !important; bottom: -1px !important; left: 0 !important; right: 0 !important; height: 2px !important; background: #2468f2 !important; }
        .tab-content { background: #fff !important; border-radius: 4px !important; padding: 16px !important; }
        .app-management-content { display: flex !important; gap: 16px !important; }
        .left-panel { width: 280px !important; background: #fff !important; border: 1px solid #e8e8e8 !important; border-radius: 8px !important; overflow: hidden !important; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06) !important; }
        .right-panel { flex: 1 !important; background: #fff !important; border: 1px solid #e8e8e8 !important; border-radius: 4px !important; }
        .left-panel .search-box { padding: 16px !important; border-bottom: 1px solid #f0f0f0 !important; background: #fafafa !important; }
        .left-panel .search-input { width: 100% !important; height: 36px !important; padding: 0 12px !important; border: 1px solid #e8e8e8 !important; border-radius: 6px !important; font-size: 14px !important; background: #fff !important; }
        .left-panel .search-input:focus { outline: none !important; border-color: #1890ff !important; box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1) !important; }
        .app-tree { max-height: calc(100vh - 200px) !important; overflow-y: auto !important; }
        .app-tree::-webkit-scrollbar { width: 6px !important; }
        .app-tree::-webkit-scrollbar-track { background: #f1f1f1 !important; }
        .app-tree::-webkit-scrollbar-thumb { background: #c1c1c1 !important; border-radius: 3px !important; }
        .app-tree::-webkit-scrollbar-thumb:hover { background: #a8a8a8 !important; }
        .app-table { width: 100% !important; border-collapse: collapse !important; }
        .app-table th, .app-table td { padding: 12px !important; text-align: left !important; border-bottom: 1px solid #e8e8e8 !important; }
        .app-table th { background: #fafafa !important; font-weight: 500 !important; }
        .table-header { padding: 16px !important; border-bottom: 1px solid #e8e8e8 !important; }
        .search-box { display: flex !important; align-items: center !important; gap: 8px !important; }
        .search-input { width: 240px !important; height: 32px !important; padding: 0 12px !important; border: 1px solid #e8e8e8 !important; border-radius: 4px !important; }
        .batch-actions { padding: 12px 16px !important; background: #f8f9fa !important; border-bottom: 1px solid #e8e8e8 !important; display: flex !important; align-items: center !important; gap: 12px !important; }
        .batch-actions.hidden { display: none !important; }
        .batch-count { color: #666 !important; font-size: 14px !important; }
        /* 移除页面特定的批量操作按钮样式，使用全局样式 */
        .pagination { display: flex !important; justify-content: space-between !important; align-items: center !important; padding: 16px !important; border-top: 1px solid #e8e8e8 !important; }
        .pagination-controls { display: flex !important; align-items: center !important; gap: 8px !important; }
        .page-btn { padding: 4px 8px !important; border: 1px solid #e8e8e8 !important; background: white !important; cursor: pointer !important; }
        .page-btn.active { background: #2468f2 !important; color: white !important; border-color: #2468f2 !important; }
        .app-status { padding: 2px 8px !important; border-radius: 10px !important; font-size: 12px !important; }
        .app-status.enabled { background: #f6ffed !important; color: #52c41a !important; }
        .app-status.disabled { background: #fff2f0 !important; color: #ff4d4f !important; }
        .link-detail, .link-edit, .link-delete { color: #1890ff !important; text-decoration: none !important; margin-right: 8px !important; }
        .link-delete { color: #ff4d4f !important; }
        .custom-app-content { padding: 16px !important; }
        .actions { display: flex !important; justify-content: space-between !important; align-items: center !important; margin-bottom: 16px !important; }
        .btn-new { padding: 8px 16px !important; background: #1890ff !important; color: white !important; border: none !important; border-radius: 4px !important; cursor: pointer !important; font-size: 14px !important; }
        .btn-new:hover { background: #40a9ff !important; }
        .custom-app-table { width: 100% !important; border-collapse: collapse !important; margin-bottom: 16px !important; }
        .custom-app-table th, .custom-app-table td { padding: 12px !important; text-align: left !important; border-bottom: 1px solid #e8e8e8 !important; }
        .custom-app-table th { background: #fafafa !important; font-weight: 500 !important; }
        .table-footer { display: flex !important; justify-content: space-between !important; align-items: center !important; }
        .btn { padding: 4px 12px !important; border: 1px solid #d9d9d9 !important; background: white !important; border-radius: 4px !important; cursor: pointer !important; margin-left: 8px !important; }
        
        /* 应用名称单元格样式 */
        .app-name-cell { display: flex !important; flex-direction: column !important; }
        .app-name { font-weight: 500 !important; color: #333 !important; margin-bottom: 4px !important; }
        .app-description { font-size: 12px !important; color: #666 !important; }
        
        /* 更新配置页面样式 */
        .update-config-container {
            max-width: 800px !important;
            margin: 0 auto !important;
            padding: 24px !important;
        }

        .config-header {
            margin-bottom: 32px !important;
            text-align: center !important;
        }

        .config-header h2 {
            font-size: 24px !important;
            font-weight: 600 !important;
            color: #1a1a1a !important;
            margin: 0 0 8px 0 !important;
        }

        .config-description {
            font-size: 14px !important;
            color: #666 !important;
            margin: 0 !important;
        }

        .config-form {
            background: #fff !important;
            border-radius: 8px !important;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
            overflow: hidden !important;
        }

        .config-section {
            border-bottom: 1px solid #f0f0f0 !important;
        }

        .config-section:last-child {
            border-bottom: none !important;
        }

        .section-header {
            padding: 20px 24px 16px 24px !important;
            background: #fafafa !important;
            border-bottom: 1px solid #f0f0f0 !important;
        }

        .section-header h3 {
            font-size: 16px !important;
            font-weight: 600 !important;
            color: #1a1a1a !important;
            margin: 0 0 4px 0 !important;
        }

        .section-description {
            font-size: 13px !important;
            color: #666 !important;
        }

        .config-items {
            padding: 0 !important;
        }

        .config-item {
            border-bottom: 1px solid #f5f5f5 !important;
            transition: background-color 0.2s !important;
        }

        .config-item:last-child {
            border-bottom: none !important;
        }

        .config-item:hover {
            background-color: #fafafa !important;
        }

        .item-header {
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
            padding: 20px 24px !important;
            cursor: pointer !important;
        }

        .item-info {
            flex: 1 !important;
        }

        .item-info h4 {
            font-size: 14px !important;
            font-weight: 500 !important;
            color: #1a1a1a !important;
            margin: 0 0 4px 0 !important;
        }

        .item-info p {
            font-size: 13px !important;
            color: #666 !important;
            margin: 0 !important;
            line-height: 1.4 !important;
        }

        .item-details {
            padding: 0 24px 20px 24px !important;
            background: #fafafa !important;
            border-top: 1px solid #f0f0f0 !important;
        }

        .form-row {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 16px !important;
        }

        .form-group {
            display: flex !important;
            flex-direction: column !important;
        }

        .form-group label {
            font-size: 13px !important;
            font-weight: 500 !important;
            color: #333 !important;
            margin-bottom: 6px !important;
        }

        .config-actions {
            display: flex !important;
            justify-content: center !important;
            gap: 12px !important;
            margin-top: 32px !important;
            padding-top: 24px !important;
            border-top: 1px solid #f0f0f0 !important;
        }

        .btn {
            padding: 10px 24px !important;
            border: 1px solid !important;
            border-radius: 6px !important;
            font-size: 14px !important;
            font-weight: 500 !important;
            cursor: pointer !important;
            transition: all 0.2s !important;
            text-decoration: none !important;
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
        }

        .btn-primary {
            background: #1890ff !important;
            border-color: #1890ff !important;
            color: white !important;
        }

        .btn-primary:hover {
            background: #40a9ff !important;
            border-color: #40a9ff !important;
        }

        .btn-secondary {
            background: white !important;
            border-color: #d9d9d9 !important;
            color: #333 !important;
        }

        .btn-secondary:hover {
            background: #f5f5f5 !important;
            border-color: #bfbfbf !important;
        }

        /* 开关样式优化 */
        .switch {
            position: relative !important;
            display: inline-block !important;
            width: 44px !important;
            height: 24px !important;
            flex-shrink: 0 !important;
        }

        .switch input {
            opacity: 0 !important;
            width: 0 !important;
            height: 0 !important;
        }

        .slider {
            position: absolute !important;
            cursor: pointer !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            background-color: #ccc !important;
            transition: .3s !important;
            border-radius: 24px !important;
        }

        .slider:before {
            position: absolute !important;
            content: "" !important;
            height: 18px !important;
            width: 18px !important;
            left: 3px !important;
            bottom: 3px !important;
            background-color: white !important;
            transition: .3s !important;
            border-radius: 50% !important;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2) !important;
        }

        input:checked + .slider {
            background-color: #1890ff !important;
        }

        input:checked + .slider:before {
            transform: translateX(20px) !important;
        }

        /* 配置消息样式 */
        .config-message {
            position: fixed !important;
            top: 20px !important;
            right: 20px !important;
            padding: 12px 20px !important;
            border-radius: 6px !important;
            font-size: 14px !important;
            font-weight: 500 !important;
            z-index: 10000 !important;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
            animation: slideInRight 0.3s ease-out !important;
        }

        .config-message-success {
            background: #f6ffed !important;
            color: #52c41a !important;
            border: 1px solid #b7eb8f !important;
        }

        .config-message-error {
            background: #fff2f0 !important;
            color: #ff4d4f !important;
            border: 1px solid #ffccc7 !important;
        }

        .config-message-info {
            background: #e6f7ff !important;
            color: #1890ff !important;
            border: 1px solid #91d5ff !important;
        }

        @keyframes slideInRight {
            from {
                transform: translateX(100%) !important;
                opacity: 0 !important;
            }
            to {
                transform: translateX(0) !important;
                opacity: 1 !important;
            }
        }

        /* 响应式设计 */
        @media (max-width: 768px) {
            .update-config-container {
                padding: 16px !important;
            }
            
            .form-row {
                grid-template-columns: 1fr !important;
            }
            
            .config-actions {
                flex-direction: column !important;
            }
            
            .btn {
                width: 100% !important;
            }
            
            .config-message {
                top: 10px !important;
                right: 10px !important;
                left: 10px !important;
                width: auto !important;
            }
        }
        `;

        document.head.appendChild(style);
        console.log('应用管理样式已注入');

        // 强制浏览器立即应用样式
        setTimeout(() => {
            const allElements = document.querySelectorAll('*');
            allElements.forEach(el => {
                el.offsetHeight; // 触发重排
            });
        }, 10);
    },

    // 初始化内置应用
    initBuiltinApps: function () {
        // 等待DOM完全加载后再初始化
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.initTreeAfterDOMReady();
            });
        } else {
            this.initTreeAfterDOMReady();
        }
    },

    // DOM加载完成后初始化树型
    initTreeAfterDOMReady: function () {
        // 确保容器存在
        const treeContainer = document.querySelector('.tree-container');
        if (!treeContainer) {
            console.error('Tree container not found');
            return;
        }

        // 先清空容器
        treeContainer.innerHTML = '';

        // 渲染树形菜单
        this.renderAppTree();

        // 渲染应用表格
        this.renderBuiltinAppTable();

        // 更新分页信息
        this.updatePagination();

        // 强制应用样式 - 解决第一次展示时样式不生效的问题
        this.forceApplyStyles();
    },

    // 强制应用样式
    forceApplyStyles: function () {
        // 使用 requestAnimationFrame 确保在下一帧渲染时应用样式
        requestAnimationFrame(() => {
            // 强制浏览器重新计算样式
            const appTable = document.querySelector('#builtinContent .app-table');
            const treeContainer = document.querySelector('.tree-container');

            if (appTable) {
                // 触发重排，确保表格样式应用
                appTable.style.display = 'none';
                appTable.offsetHeight;
                appTable.style.display = '';
            }

            if (treeContainer) {
                // 触发重排，确保树形结构样式应用
                treeContainer.style.display = 'none';
                treeContainer.offsetHeight;
                treeContainer.style.display = '';
            }

            console.log('样式强制应用完成');
        });
    },

    // 确保样式正确应用
    ensureStylesApplied: function () {
        // 强制浏览器重新计算样式
        const treeContainer = document.querySelector('.tree-container');
        if (treeContainer) {
            // 触发重排，确保样式应用
            treeContainer.style.display = 'none';
            treeContainer.offsetHeight;
            treeContainer.style.display = '';
        }
    },

    // 渲染标准树形列表
    renderAppTree: function () {
        const treeContainer = document.querySelector('.tree-container');
        if (!treeContainer) return;

        // 统计各分类的应用数量
        const categoryStats = {};
        this.builtinApps.forEach(app => {
            if (!categoryStats[app.category]) {
                categoryStats[app.category] = {};
            }
            if (!categoryStats[app.category][app.type]) {
                categoryStats[app.category][app.type] = [];
            }
            categoryStats[app.category][app.type].push(app);
        });

        let treeHTML = '';

        // 生成全部应用节点（默认展开）
        treeHTML += `
            <div class="tree-node" data-category="all">
                <div class="tree-node-content">
                    <span class="tree-toggle expanded">▶</span>
                    <span class="tree-label">全部应用</span>
                    <span class="tree-count">${this.builtinApps.length}</span>
                </div>
                <div class="tree-children">
        `;

        // 生成分类树（分类默认展开，类型默认收拢）
        Object.keys(categoryStats).forEach(category => {
            const categoryApps = Object.values(categoryStats[category]).flat();
            const categoryCount = categoryApps.length;

            treeHTML += `
                <div class="tree-node" data-category="${category}">
                    <div class="tree-node-content">
                        <span class="tree-toggle expanded">▶</span>
                        <span class="tree-label">${category}</span>
                        <span class="tree-count">${categoryCount}</span>
                    </div>
                    <div class="tree-children">
            `;

            Object.keys(categoryStats[category]).forEach(type => {
                const typeApps = categoryStats[category][type];
                const typeCount = typeApps.length;

                treeHTML += `
                    <div class="tree-node" data-category="${category}" data-type="${type}">
                        <div class="tree-node-content">
                            <span class="tree-toggle collapsed">▶</span>
                            <span class="tree-label">${type}</span>
                            <span class="tree-count">${typeCount}</span>
                        </div>
                        <div class="tree-children collapsed">
                `;

                // 添加具体的应用列表 - 只显示名称
                typeApps.forEach(app => {
                    treeHTML += `
                        <div class="tree-app-item" data-app-id="${app.id}">
                            <div class="tree-app-name">${app.name}</div>
                        </div>
                    `;
                });

                treeHTML += `
                        </div>
                    </div>
                `;
            });

            treeHTML += `
                    </div>
                </div>
            `;
        });

        treeHTML += `
                </div>
            </div>
        `;

        // 使用innerHTML设置内容
        treeContainer.innerHTML = treeHTML;

        // 强制浏览器重新计算布局
        treeContainer.style.visibility = 'hidden';
        treeContainer.offsetHeight;
        treeContainer.style.visibility = 'visible';

        // 确保所有样式都已应用
        requestAnimationFrame(() => {
            this.bindTreeEvents();
        });
    },

    // 绑定树形列表事件
    bindTreeEvents: function () {
        // 先移除所有已有的事件监听器，防止重复绑定
        const existingToggles = document.querySelectorAll('.tree-toggle');
        existingToggles.forEach(toggle => {
            const newToggle = toggle.cloneNode(true);
            toggle.parentNode.replaceChild(newToggle, toggle);
        });

        // 绑定展开/收起事件
        const treeToggles = document.querySelectorAll('.tree-toggle');
        treeToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();

                const treeNode = toggle.closest('.tree-node');
                const children = treeNode.querySelector('.tree-children');

                if (children) {
                    const isExpanded = !children.classList.contains('collapsed');

                    if (isExpanded) {
                        // 收起
                        children.classList.add('collapsed');
                        toggle.classList.add('collapsed');
                        toggle.classList.remove('expanded');
                    } else {
                        // 展开
                        children.classList.remove('collapsed');
                        toggle.classList.remove('collapsed');
                        toggle.classList.add('expanded');
                    }
                }
            });
        });

        // 绑定节点点击事件
        const treeNodes = document.querySelectorAll('.tree-node');
        treeNodes.forEach(node => {
            node.addEventListener('click', (e) => {
                // 如果点击的是展开图标，不处理
                if (e.target.classList.contains('tree-toggle')) {
                    return;
                }

                // 移除所有选中状态
                treeNodes.forEach(n => {
                    const content = n.querySelector('.tree-node-content');
                    if (content) content.classList.remove('selected');
                });

                // 添加当前选中状态
                const content = node.querySelector('.tree-node-content');
                if (content) content.classList.add('selected');

                // 获取分类和类型
                const category = node.getAttribute('data-category');
                const type = node.getAttribute('data-type');

                // 更新搜索条件
                if (category && category !== 'all') {
                    this.search.category = type ? `${category}-${type}` : category;
                } else {
                    this.search.category = 'all';
                }

                // 重置分页
                this.pagination.currentPage = 1;

                // 重新渲染表格
                this.renderBuiltinAppTable();
            });
        });

        // 绑定应用项点击事件
        const appItems = document.querySelectorAll('.tree-app-item');
        appItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                const appId = parseInt(item.getAttribute('data-app-id'));

                // 移除所有选中状态
                appItems.forEach(i => i.classList.remove('selected'));

                // 添加当前选中状态
                item.classList.add('selected');

                // 显示应用详情
                this.showAppDetail(appId);
            });
        });
    },

    // 渲染内置应用表格
    renderBuiltinAppTable: function () {
        const tbody = document.querySelector('#builtinContent .app-table tbody');
        if (!tbody) return;

        // 过滤应用数据
        const filteredApps = this.filterBuiltinApps();

        // 分页处理
        const startIndex = (this.pagination.currentPage - 1) * this.pagination.pageSize;
        const endIndex = startIndex + this.pagination.pageSize;
        const pagedApps = filteredApps.slice(startIndex, endIndex);

        tbody.innerHTML = pagedApps.map(app => `
            <tr>
                <td><input type="checkbox" value="${app.id}" onchange="window.appManagement.updateBatchActions()"></td>
                <td>
                    <div class="app-name-cell">
                        <span class="app-name">${app.name}</span>
                        <div class="app-description">${app.description}</div>
                    </div>
                </td>
                <td>${app.address}</td>
                <td>${app.type}</td>
                <td>
                    <span class="app-status ${app.status === '启用' ? 'enabled' : 'disabled'}">${app.status}</span>
                </td>
                <td>
                    <a href="#" class="link-detail" onclick="window.appManagement.showAppDetail(${app.id}); return false;">详情</a>
                    <a href="#" class="link-edit" onclick="window.appManagement.editBuiltinApp(${app.id}); return false;">编辑</a>
                </td>
            </tr>
        `).join('');

        // 更新分页信息
        this.pagination.totalItems = filteredApps.length;
        this.updatePagination();

        // 强制应用表格样式
        this.forceApplyTableStyles();
    },

    // 强制应用表格样式
    forceApplyTableStyles: function () {
        // 使用 requestAnimationFrame 确保在下一帧渲染时应用样式
        requestAnimationFrame(() => {
            const appTable = document.querySelector('#builtinContent .app-table');
            if (appTable) {
                // 触发重排，确保表格样式应用
                appTable.style.visibility = 'hidden';
                appTable.offsetHeight;
                appTable.style.visibility = 'visible';
            }
        });
    },

    // 过滤内置应用
    filterBuiltinApps: function () {
        let filteredApps = [...this.builtinApps];

        // 按关键词搜索
        if (this.search.keyword) {
            const keyword = this.search.keyword.toLowerCase();
            filteredApps = filteredApps.filter(app =>
                app.name.toLowerCase().includes(keyword) ||
                app.address.toLowerCase().includes(keyword) ||
                app.type.toLowerCase().includes(keyword) ||
                app.description.toLowerCase().includes(keyword)
            );
        }

        // 按分类过滤
        if (this.search.category && this.search.category !== 'all') {
            if (this.search.category.includes('-')) {
                // 格式：category-type
                const [category, type] = this.search.category.split('-');
                filteredApps = filteredApps.filter(app =>
                    app.category === category && app.type === type
                );
            } else {
                // 只按分类过滤
                filteredApps = filteredApps.filter(app => app.category === this.search.category);
            }
        }

        return filteredApps;
    },

    // 更新分页信息
    updatePagination: function () {
        const totalPages = Math.ceil(this.pagination.totalItems / this.pagination.pageSize);
        const currentPage = this.pagination.currentPage;

        // 更新分页信息显示
        const paginationInfo = document.querySelector('.pagination-info');
        const pageInfo = document.querySelector('.page-info');

        if (paginationInfo) {
            paginationInfo.textContent = `共 ${this.pagination.totalItems} 条记录`;
        }

        if (pageInfo) {
            pageInfo.textContent = `第 ${currentPage} 页，共 ${totalPages} 页`;
        }

        // 更新分页按钮状态
        const prevBtn = document.querySelector('.page-btn[onclick*="prevPage"]');
        const nextBtn = document.querySelector('.page-btn[onclick*="nextPage"]');

        if (prevBtn) {
            prevBtn.disabled = currentPage <= 1;
            prevBtn.style.opacity = currentPage <= 1 ? '0.5' : '1';
        }

        if (nextBtn) {
            nextBtn.disabled = currentPage >= totalPages;
            nextBtn.style.opacity = currentPage >= totalPages ? '0.5' : '1';
        }
    },

    // 上一页
    prevPage: function () {
        if (this.pagination.currentPage > 1) {
            this.pagination.currentPage--;
            this.renderBuiltinAppTable();
        }
    },

    // 下一页
    nextPage: function () {
        const totalPages = Math.ceil(this.pagination.totalItems / this.pagination.pageSize);
        if (this.pagination.currentPage < totalPages) {
            this.pagination.currentPage++;
            this.renderBuiltinAppTable();
        }
    },

    // 更新批量操作
    updateBatchActions: function () {
        const checkboxes = document.querySelectorAll('#builtinContent .app-table tbody input[type="checkbox"]:checked');
        const selectAllCheckbox = document.getElementById('selectAll');
        const batchActions = document.querySelector('#builtinContent .batch-actions');
        const batchCount = document.querySelector('#builtinContent .batch-count');

        const selectedCount = checkboxes.length;

        // 更新全选状态
        if (selectAllCheckbox) {
            const allCheckboxes = document.querySelectorAll('#builtinContent .app-table tbody input[type="checkbox"]');
            selectAllCheckbox.checked = selectedCount === allCheckboxes.length && allCheckboxes.length > 0;
            selectAllCheckbox.indeterminate = selectedCount > 0 && selectedCount < allCheckboxes.length;
        }

        // 显示/隐藏批量操作栏
        if (batchActions) {
            batchActions.classList.toggle('hidden', selectedCount === 0);
        }

        // 更新选中数量
        if (batchCount) {
            batchCount.textContent = `已选择 ${selectedCount} 项`;
        }
    },

    // 批量启用
    batchEnable: function () {
        const checkboxes = document.querySelectorAll('#builtinContent .app-table tbody input[type="checkbox"]:checked');
        const appIds = Array.from(checkboxes).map(cb => parseInt(cb.value));

        if (appIds.length === 0) {
            alert('请选择要启用的应用');
            return;
        }

        if (confirm(`确定要启用选中的 ${appIds.length} 个应用吗？`)) {
            appIds.forEach(id => {
                const app = this.builtinApps.find(a => a.id === id);
                if (app) {
                    app.status = '启用';
                }
            });

            this.renderBuiltinAppTable();
            this.updateBatchActions();
            alert('批量启用成功！');
        }
    },

    // 批量禁用
    batchDisable: function () {
        const checkboxes = document.querySelectorAll('#builtinContent .app-table tbody input[type="checkbox"]:checked');
        const appIds = Array.from(checkboxes).map(cb => parseInt(cb.value));

        if (appIds.length === 0) {
            alert('请选择要禁用的应用');
            return;
        }

        if (confirm(`确定要禁用选中的 ${appIds.length} 个应用吗？`)) {
            appIds.forEach(id => {
                const app = this.builtinApps.find(a => a.id === id);
                if (app) {
                    app.status = '禁用';
                }
            });

            this.renderBuiltinAppTable();
            this.updateBatchActions();
            alert('批量禁用成功！');
        }
    },

    // 批量删除
    batchDelete: function () {
        const checkboxes = document.querySelectorAll('#builtinContent .app-table tbody input[type="checkbox"]:checked');
        const appIds = Array.from(checkboxes).map(cb => parseInt(cb.value));

        if (appIds.length === 0) {
            alert('请选择要删除的应用');
            return;
        }

        if (confirm(`确定要删除选中的 ${appIds.length} 个应用吗？此操作不可恢复！`)) {
            appIds.forEach(id => {
                const index = this.builtinApps.findIndex(a => a.id === id);
                if (index !== -1) {
                    this.builtinApps.splice(index, 1);
                }
            });

            this.renderAppTree();
            this.renderBuiltinAppTable();
            this.updateBatchActions();
            alert('批量删除成功！');
        }
    },

    // 显示应用详情
    showAppDetail: function (appId) {
        const app = this.builtinApps.find(a => a.id === appId);
        if (!app) return;

        console.log('显示应用详情面板:', app);

        // 移除已存在的面板
        const existingPanel = document.querySelector('.app-management-overlay');
        if (existingPanel) {
            existingPanel.parentNode.remove();
        }

        // 确保样式已注入
        this.ensureStyles();

        // 创建遮罩层和面板容器
        const container = document.createElement('div');
        container.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 9998; pointer-events: none;';

        const overlay = document.createElement('div');
        overlay.className = 'app-management-overlay';
        overlay.style.pointerEvents = 'auto';

        const panel = document.createElement('div');
        panel.className = 'app-management-panel';
        panel.style.pointerEvents = 'auto';
        panel.innerHTML = `
            <div class="panel-header">
                <h3>应用详情</h3>
                <button class="btn-close">×</button>
            </div>
            <div class="panel-body">
                <div class="app-detail-panel">
                    <div class="app-detail-header">
                        <div class="app-icon">📱</div>
                        <div class="app-info">
                            <div class="app-name">${app.name}</div>
                            <div class="app-category">${app.category} - ${app.type}</div>
                        </div>
                        <span class="app-status ${app.status === '启用' ? 'enabled' : 'disabled'}">${app.status}</span>
                    </div>
                    
                    <div class="detail-section">
                        <h4>基本信息</h4>
                        <div class="detail-item">
                            <span class="detail-label">应用名称：</span>
                            <span class="detail-value">${app.name}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">访问地址：</span>
                            <span class="detail-value">${app.address}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">应用类型：</span>
                            <span class="detail-value">${app.type}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">应用分类：</span>
                            <span class="detail-value">${app.category}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">当前状态：</span>
                            <span class="detail-value">${app.status}</span>
                        </div>
                    </div>
                    
                    <div class="detail-section">
                        <h4>应用描述</h4>
                        <div class="detail-item">
                            <span class="detail-value">${app.description}</span>
                        </div>
                    </div>
                    
                    <div class="detail-section">
                        <h4>应用标签</h4>
                        <div class="app-tags">
                            ${app.tags.map(tag => `<span class="app-tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;

        container.appendChild(overlay);
        container.appendChild(panel);
        document.body.appendChild(container);

        console.log('应用详情面板已创建并添加到DOM');

        // 使用 requestAnimationFrame 确保DOM更新后再触发动画
        requestAnimationFrame(() => {
            overlay.classList.add('show');
            panel.classList.add('show');
            console.log('应用详情面板动画已触发');
        });

        // 绑定面板事件
        this.bindAppDetailPanelEvents(panel, overlay, container);
    },

    // 绑定应用详情面板事件
    bindAppDetailPanelEvents: function (panel, overlay, container) {
        console.log('绑定应用详情面板事件');

        const btnClose = panel.querySelector('.btn-close');
        const closePanel = () => {
            console.log('关闭应用详情面板');
            overlay.classList.remove('show');
            panel.classList.remove('show');
            setTimeout(() => {
                container.remove();
            }, 300); // 等待动画完成
        };

        if (btnClose) {
            btnClose.addEventListener('click', closePanel);
            console.log('关闭按钮事件已绑定');
        }

        // 点击遮罩层关闭
        overlay.addEventListener('click', closePanel);
    },

    // 编辑内置应用
    editBuiltinApp: function (appId) {
        const app = this.builtinApps.find(a => a.id === appId);
        if (!app) return;

        console.log('显示编辑内置应用面板:', app);

        // 移除已存在的面板
        const existingPanel = document.querySelector('.app-management-overlay');
        if (existingPanel) {
            existingPanel.parentNode.remove();
        }

        // 确保样式已注入
        this.ensureStyles();

        // 创建遮罩层和面板容器
        const container = document.createElement('div');
        container.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 9998; pointer-events: none;';

        const overlay = document.createElement('div');
        overlay.className = 'app-management-overlay';
        overlay.style.pointerEvents = 'auto';

        const panel = document.createElement('div');
        panel.className = 'app-management-panel';
        panel.style.pointerEvents = 'auto';
        panel.innerHTML = `
            <div class="panel-header">
                <h3>编辑应用</h3>
                <button class="btn-close">×</button>
            </div>
            <div class="panel-body">
                <div class="section">
                    <h4>基本信息</h4>
                    <div class="form-item">
                        <label class="required">应用名称</label>
                        <input type="text" class="form-input" value="${app.name}" placeholder="请输入应用名称">
                    </div>
                    <div class="form-item">
                        <label class="required">访问地址</label>
                        <input type="text" class="form-input" value="${app.address}" placeholder="请输入访问地址">
                    </div>
                    <div class="form-item">
                        <label class="required">应用类型</label>
                        <select class="form-select">
                            <option value="邮件系统" ${app.type === '邮件系统' ? 'selected' : ''}>邮件系统</option>
                            <option value="文档协作" ${app.type === '文档协作' ? 'selected' : ''}>文档协作</option>
                            <option value="视频会议" ${app.type === '视频会议' ? 'selected' : ''}>视频会议</option>
                            <option value="代码仓库" ${app.type === '代码仓库' ? 'selected' : ''}>代码仓库</option>
                            <option value="CI/CD工具" ${app.type === 'CI/CD工具' ? 'selected' : ''}>CI/CD工具</option>
                            <option value="监控工具" ${app.type === '监控工具' ? 'selected' : ''}>监控工具</option>
                            <option value="对象存储" ${app.type === '对象存储' ? 'selected' : ''}>对象存储</option>
                            <option value="容器服务" ${app.type === '容器服务' ? 'selected' : ''}>容器服务</option>
                            <option value="数据库服务" ${app.type === '数据库服务' ? 'selected' : ''}>数据库服务</option>
                        </select>
                    </div>
                    <div class="form-item">
                        <label>应用描述</label>
                        <textarea class="form-textarea" placeholder="请输入应用描述">${app.description}</textarea>
                    </div>
                    <div class="form-item">
                        <label>状态</label>
                        <label class="switch">
                            <input type="checkbox" ${app.status === '启用' ? 'checked' : ''}>
                            <span class="slider"></span>
                        </label>
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

        console.log('编辑内置应用面板已创建并添加到DOM');

        // 使用 requestAnimationFrame 确保DOM更新后再触发动画
        requestAnimationFrame(() => {
            overlay.classList.add('show');
            panel.classList.add('show');
            console.log('编辑内置应用面板动画已触发');
        });

        // 绑定面板事件
        this.bindEditBuiltinAppPanelEvents(panel, overlay, container, appId);
    },

    // 绑定编辑内置应用面板事件
    bindEditBuiltinAppPanelEvents: function (panel, overlay, container, appId) {
        console.log('绑定编辑内置应用面板事件');

        const btnClose = panel.querySelector('.btn-close');
        const btnCancel = panel.querySelector('.btn-cancel');
        const closePanel = () => {
            console.log('关闭编辑内置应用面板');
            overlay.classList.remove('show');
            panel.classList.remove('show');
            setTimeout(() => {
                container.remove();
            }, 300); // 等待动画完成
        };

        if (btnClose) {
            btnClose.addEventListener('click', closePanel);
            console.log('关闭按钮事件已绑定');
        }

        if (btnCancel) {
            btnCancel.addEventListener('click', closePanel);
            console.log('取消按钮事件已绑定');
        }

        // 点击遮罩层关闭
        overlay.addEventListener('click', closePanel);

        const btnConfirm = panel.querySelector('.btn-confirm');
        if (btnConfirm) {
            btnConfirm.addEventListener('click', () => {
                console.log('点击确定按钮');
                // 收集表单数据
                const formData = this.collectEditBuiltinAppFormData(panel);
                console.log('编辑内置应用数据:', formData);

                // 验证表单数据
                if (this.validateEditBuiltinAppFormData(formData)) {
                    // 保存数据
                    this.saveEditBuiltinAppData(appId, formData);
                    closePanel();
                } else {
                    alert('请填写必填项');
                }
            });
            console.log('确定按钮事件已绑定');
        } else {
            console.log('未找到确定按钮');
        }
    },

    // 收集编辑内置应用表单数据
    collectEditBuiltinAppFormData: function (panel) {
        const formData = {};

        // 基本信息
        const nameInput = panel.querySelector('input[placeholder*="应用名称"]');
        if (nameInput) formData.name = nameInput.value.trim();

        const addressInput = panel.querySelector('input[placeholder*="访问地址"]');
        if (addressInput) formData.address = addressInput.value.trim();

        const typeSelect = panel.querySelector('select');
        if (typeSelect) formData.type = typeSelect.value;

        const descTextarea = panel.querySelector('textarea');
        if (descTextarea) formData.description = descTextarea.value.trim();

        const statusCheckbox = panel.querySelector('input[type="checkbox"]');
        if (statusCheckbox) formData.status = statusCheckbox.checked;

        return formData;
    },

    // 验证编辑内置应用表单数据
    validateEditBuiltinAppFormData: function (formData) {
        return formData.name && formData.address && formData.type;
    },

    // 保存编辑内置应用数据
    saveEditBuiltinAppData: function (appId, formData) {
        const app = this.builtinApps.find(a => a.id === appId);
        if (!app) return;

        // 更新应用数据
        app.name = formData.name;
        app.address = formData.address;
        app.type = formData.type;
        app.description = formData.description || app.description;
        app.status = formData.status ? '启用' : '禁用';

        // 重新渲染
        this.renderAppTree();
        this.renderBuiltinAppTable();

        console.log('内置应用编辑成功');
    },

    // 保存内置应用编辑（保留旧方法以兼容）
    saveBuiltinAppEdit: function (appId, panel) {
        const app = this.builtinApps.find(a => a.id === appId);
        if (!app) return;

        // 收集表单数据
        const nameInput = panel.querySelector('input[placeholder*="应用名称"]');
        const addressInput = panel.querySelector('input[placeholder*="访问地址"]');
        const typeSelect = panel.querySelector('select');
        const descTextarea = panel.querySelector('textarea');
        const statusCheckbox = panel.querySelector('input[type="checkbox"]');

        if (nameInput && addressInput && typeSelect) {
            app.name = nameInput.value.trim();
            app.address = addressInput.value.trim();
            app.type = typeSelect.value;
            app.description = descTextarea ? descTextarea.value.trim() : app.description;
            app.status = statusCheckbox && statusCheckbox.checked ? '启用' : '禁用';

            // 重新渲染
            this.renderAppTree();
            this.renderBuiltinAppTable();

            // 关闭面板
            panel.classList.remove('visible');
            setTimeout(() => {
                panel.remove();
            }, 300);

            // 编辑成功，无需弹窗提示
        } else {
            alert('请填写必填项');
        }
    },

    // 删除内置应用
    deleteBuiltinApp: function (appId) {
        const app = this.builtinApps.find(a => a.id === appId);
        if (!app) return;

        if (confirm(`确定要删除应用"${app.name}"吗？此操作不可恢复！`)) {
            const index = this.builtinApps.findIndex(a => a.id === appId);
            if (index !== -1) {
                this.builtinApps.splice(index, 1);

                // 重新渲染
                this.renderAppTree();
                this.renderBuiltinAppTable();

            }
        }
    },

    // 显示面板
    showPanel: function (panelHTML, title) {
        // 移除已有的面板
        const existingPanel = document.querySelector('.slide-panel-wrapper');
        if (existingPanel) {
            existingPanel.remove();
        }

        // 确保样式已注入（如果还没有的话）
        this.injectStyles();

        // 注入面板样式
        this.injectPanelStyles();

        // 创建面板
        const panel = document.createElement('div');
        panel.className = 'slide-panel-wrapper';
        panel.innerHTML = panelHTML;
        document.body.appendChild(panel);

        // 显示面板
        setTimeout(() => {
            panel.classList.add('visible');
        }, 10);
    },

    // 注入面板样式
    injectPanelStyles: function () {
        // 检查是否已经注入过面板样式
        if (document.querySelector('#app-management-panel-styles')) {
            return;
        }

        // 创建面板样式元素
        const style = document.createElement('style');
        style.id = 'app-management-panel-styles';
        style.textContent = this.panelStyles;
        document.head.appendChild(style);
    },

    // 绑定标签页切换事件
    bindTabEvents: function () {
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
                contents.forEach(c => {
                    c.style.display = 'none';
                    c.classList.remove('active');
                });

                // 添加当前活动状态
                tab.classList.add('active');
                const targetId = tab.getAttribute('data-tab') + 'Content';
                const targetContent = document.getElementById(targetId);
                if (targetContent) {
                    targetContent.style.display = 'block';
                    targetContent.classList.add('active');

                    // 根据切换的标签页重新绑定对应的事件
                    const tabType = tab.getAttribute('data-tab');
                    if (tabType === 'custom') {
                        // 重置标记，允许重新绑定
                        this.customEventsBound = false;
                        this.bindCustomAppEvents();
                    } else if (tabType === 'builtin') {
                        // 重置标记，允许重新绑定
                        this.builtinEventsBound = false;
                        this.bindBuiltinAppEvents();
                    } else if (tabType === 'update') {
                        // 重置标记，允许重新绑定
                        this.updateEventsBound = false;
                        this.bindUpdateConfigEvents();
                    }
                }
            });
        });
    },

    // 绑定内置应用事件
    bindBuiltinAppEvents: function () {
        // 检查是否已经绑定过事件，避免重复绑定
        if (this.builtinEventsBound) {
            return;
        }

        // 重新绑定树形菜单事件（因为可能重新渲染了）
        this.bindTreeEvents();

        // 绑定搜索框事件
        const searchInputs = document.querySelectorAll('#builtinContent .search-input');
        searchInputs.forEach(input => {
            if (!input.hasAttribute('data-bound')) {
                input.setAttribute('data-bound', 'true');
                input.addEventListener('input', (e) => {
                    this.search.keyword = e.target.value.trim();
                    this.pagination.currentPage = 1; // 重置到第一页
                    this.renderBuiltinAppTable();
                });
            }
        });

        // 绑定全选复选框事件
        const selectAllCheckbox = document.getElementById('selectAll');
        if (selectAllCheckbox && !selectAllCheckbox.hasAttribute('data-bound')) {
            selectAllCheckbox.setAttribute('data-bound', 'true');
            selectAllCheckbox.addEventListener('change', (e) => {
                const checkboxes = document.querySelectorAll('#builtinContent .app-table tbody input[type="checkbox"]');
                checkboxes.forEach(checkbox => {
                    checkbox.checked = e.target.checked;
                });
                this.updateBatchActions();
            });
        }

        // 强制应用样式 - 解决切换标签页时样式不生效的问题
        setTimeout(() => {
            this.forceApplyStyles();
        }, 50);

        // 标记事件已绑定
        this.builtinEventsBound = true;
    },

    // 绑定自定义应用事件
    bindCustomAppEvents: function () {
        // 检查是否已经绑定过事件，避免重复绑定
        if (this.customEventsBound) {
            return;
        }

        console.log('绑定自定义应用事件');
        const customContent = document.getElementById('customContent');
        if (customContent) {
            console.log('找到自定义应用内容区域');

            // 绑定添加应用按钮事件
            const btnNew = customContent.querySelector('.btn-new');
            if (btnNew) {
                console.log('找到添加应用按钮');

                // 移除之前的事件监听器（如果存在）
                const newBtnNew = btnNew.cloneNode(true);
                btnNew.parentNode.replaceChild(newBtnNew, btnNew);

                newBtnNew.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('点击添加应用按钮');
                    this.showAddAppPanel();
                });

                console.log('添加应用按钮事件绑定完成');
            } else {
                console.log('未找到添加应用按钮');
            }

            // 绑定搜索框事件
            const searchInput = customContent.querySelector('.search-input');
            if (searchInput) {
                console.log('找到搜索框');

                // 移除之前的事件监听器（如果存在）
                const newSearchInput = searchInput.cloneNode(true);
                searchInput.parentNode.replaceChild(newSearchInput, searchInput);

                newSearchInput.addEventListener('input', (e) => {
                    console.log('搜索自定义应用:', e.target.value);
                    // TODO: 实现搜索逻辑
                });

                console.log('搜索框事件绑定完成');
            } else {
                console.log('未找到搜索框');
            }

            // 绑定全选功能
            setTimeout(() => {
                this.bindCustomAppSelectAll();
            }, 50);

            // 标记事件已绑定
            this.customEventsBound = true;
        } else {
            console.log('未找到自定义应用内容区域');
        }
    },

    // 绑定更新配置事件
    bindUpdateConfigEvents: function () {
        // 检查是否已经绑定过事件，避免重复绑定
        if (this.updateEventsBound) {
            return;
        }

        const updateContent = document.getElementById('updateContent');
        if (updateContent) {
            // 加载保存的配置
            this.loadUpdateConfig();

            // 绑定开关切换事件
            const switches = updateContent.querySelectorAll('.switch input[type="checkbox"]');
            switches.forEach(switchInput => {
                switchInput.addEventListener('change', (e) => {
                    this.handleSwitchChange(e);
                });
            });

            // 绑定保存按钮事件
            const btnSave = updateContent.querySelector('#saveConfig');
            if (btnSave) {
                btnSave.addEventListener('click', () => {
                    this.saveUpdateConfig();
                });
            }

            // 绑定重置按钮事件
            const btnReset = updateContent.querySelector('#resetConfig');
            if (btnReset) {
                btnReset.addEventListener('click', () => {
                    this.resetUpdateConfig();
                });
            }

            // 标记事件已绑定
            this.updateEventsBound = true;
        }
    },

    // 处理开关切换事件
    handleSwitchChange: function (e) {
        const switchInput = e.target;
        const configItem = switchInput.closest('.config-item');
        const detailsId = switchInput.id + 'Details';
        const detailsElement = document.getElementById(detailsId);

        // 显示或隐藏详细信息
        if (detailsElement) {
            if (switchInput.checked) {
                detailsElement.style.display = 'block';
            } else {
                detailsElement.style.display = 'none';
            }
        }

        // 添加视觉反馈
        if (switchInput.checked) {
            configItem.classList.add('active');
        } else {
            configItem.classList.remove('active');
        }
    },

    // 保存更新配置
    saveUpdateConfig: function () {
        const updateContent = document.getElementById('updateContent');
        if (!updateContent) return;

        // 收集所有配置值
        const config = {
            // 更新策略
            autoUpdate: updateContent.querySelector('#autoUpdate').checked,
            updateFrequency: updateContent.querySelector('#updateFrequency').value,
            updateTime: updateContent.querySelector('#updateTime').value,
            incrementalUpdate: updateContent.querySelector('#incrementalUpdate').checked,
            smartSync: updateContent.querySelector('#smartSync').checked,

            // 缓存管理
            localCache: updateContent.querySelector('#localCache').checked,
            cacheSize: updateContent.querySelector('#cacheSize').value,
            cacheExpiry: updateContent.querySelector('#cacheExpiry').value,

            // 安全设置
            accessControl: updateContent.querySelector('#accessControl').checked,
            maxAccessRate: updateContent.querySelector('#maxAccessRate').value,
            ipWhitelist: updateContent.querySelector('#ipWhitelist').value,
            dataEncryption: updateContent.querySelector('#dataEncryption').checked,

            // 通知设置
            updateNotification: updateContent.querySelector('#updateNotification').checked,
            errorAlert: updateContent.querySelector('#errorAlert').checked,

            // 保存时间戳
            lastSaved: new Date().toISOString()
        };

        // 保存到本地存储
        try {
            localStorage.setItem('appManagementConfig', JSON.stringify(config));
            console.log('配置已保存:', config);

            // 显示成功提示
            this.showConfigMessage('配置保存成功！', 'success');
        } catch (error) {
            console.error('保存配置失败:', error);
            this.showConfigMessage('保存失败，请重试', 'error');
        }
    },

    // 加载更新配置
    loadUpdateConfig: function () {
        const updateContent = document.getElementById('updateContent');
        if (!updateContent) return;

        try {
            // 从本地存储加载配置
            const savedConfig = localStorage.getItem('appManagementConfig');
            if (savedConfig) {
                const config = JSON.parse(savedConfig);
                console.log('加载保存的配置:', config);

                // 应用配置到表单
                this.applyConfigToForm(config);
            } else {
                // 使用默认配置
                this.applyDefaultConfig();
            }
        } catch (error) {
            console.error('加载配置失败:', error);
            this.applyDefaultConfig();
        }
    },

    // 应用配置到表单
    applyConfigToForm: function (config) {
        const updateContent = document.getElementById('updateContent');
        if (!updateContent) return;

        // 更新策略
        this.setElementValue('#autoUpdate', config.autoUpdate);
        this.setElementValue('#updateFrequency', config.updateFrequency);
        this.setElementValue('#updateTime', config.updateTime);
        this.setElementValue('#incrementalUpdate', config.incrementalUpdate);
        this.setElementValue('#smartSync', config.smartSync);

        // 缓存管理
        this.setElementValue('#localCache', config.localCache);
        this.setElementValue('#cacheSize', config.cacheSize);
        this.setElementValue('#cacheExpiry', config.cacheExpiry);

        // 安全设置
        this.setElementValue('#accessControl', config.accessControl);
        this.setElementValue('#maxAccessRate', config.maxAccessRate);
        this.setElementValue('#ipWhitelist', config.ipWhitelist);
        this.setElementValue('#dataEncryption', config.dataEncryption);

        // 通知设置
        this.setElementValue('#updateNotification', config.updateNotification);
        this.setElementValue('#errorAlert', config.errorAlert);

        // 触发开关变化事件以显示/隐藏详细信息
        const switches = updateContent.querySelectorAll('.switch input[type="checkbox"]');
        switches.forEach(switchInput => {
            this.handleSwitchChange({ target: switchInput });
        });
    },

    // 设置元素值
    setElementValue: function (selector, value) {
        const element = document.querySelector(selector);
        if (element) {
            if (element.type === 'checkbox') {
                element.checked = value;
            } else {
                element.value = value;
            }
        }
    },

    // 应用默认配置
    applyDefaultConfig: function () {
        const defaultConfig = {
            autoUpdate: false,
            updateFrequency: 'daily',
            updateTime: '02:00',
            incrementalUpdate: false,
            smartSync: false,
            localCache: true,
            cacheSize: '500',
            cacheExpiry: '7',
            accessControl: false,
            maxAccessRate: '30',
            ipWhitelist: '',
            dataEncryption: false,
            updateNotification: false,
            errorAlert: true
        };

        this.applyConfigToForm(defaultConfig);
    },

    // 重置更新配置
    resetUpdateConfig: function () {
        if (confirm('确定要重置所有配置吗？这将恢复默认设置。')) {
            // 清除本地存储
            localStorage.removeItem('appManagementConfig');

            // 应用默认配置
            this.applyDefaultConfig();

            // 显示提示
            this.showConfigMessage('配置已重置为默认值', 'info');
        }
    },

    // 显示配置消息
    showConfigMessage: function (message, type = 'info') {
        // 移除现有的消息
        const existingMessage = document.querySelector('.config-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // 创建消息元素
        const messageElement = document.createElement('div');
        messageElement.className = `config-message config-message-${type}`;
        messageElement.textContent = message;

        // 添加到页面
        const updateContent = document.getElementById('updateContent');
        if (updateContent) {
            updateContent.appendChild(messageElement);

            // 3秒后自动移除
            setTimeout(() => {
                if (messageElement.parentNode) {
                    messageElement.remove();
                }
            }, 3000);
        }
    },

    // 显示添加应用面板
    showAddAppPanel: function () {
        console.log('显示添加应用面板');

        // 确保样式只添加一次
        this.ensureStyles();

        // 创建遮罩层和面板容器
        const container = document.createElement('div');
        container.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 9998; pointer-events: none;';

        const overlay = document.createElement('div');
        overlay.className = 'app-management-overlay';
        overlay.style.pointerEvents = 'auto';

        const panel = document.createElement('div');
        panel.className = 'app-management-panel';
        panel.style.pointerEvents = 'auto';
        panel.innerHTML = this.getAddAppPanelTemplate();

        container.appendChild(overlay);
        container.appendChild(panel);
        document.body.appendChild(container);

        // 使用 requestAnimationFrame 确保DOM更新后再触发动画
        requestAnimationFrame(() => {
            overlay.classList.add('show');
            panel.classList.add('show');
        });

        // 绑定面板事件
        this.bindAddAppPanelEvents(panel, overlay, container);
    },

    // 确保样式只添加一次
    ensureStyles: function () {
        // 检查是否已经注入过面板样式
        if (document.querySelector('#app-management-panel-styles')) {
            return;
        }

        // 创建面板样式元素
        const style = document.createElement('style');
        style.id = 'app-management-panel-styles';
        style.textContent = this.panelStyles;
        document.head.appendChild(style);
    },

    // 获取添加应用面板模板
    getAddAppPanelTemplate: function () {
        return `
            <div class="panel-header">
                <h3>添加自定义应用</h3>
                <button class="btn-close">×</button>
            </div>
            
            <div class="panel-body">
                <!-- 基本信息 -->
                <div class="section">
                    <h4>基本信息</h4>
                    <div class="form-item">
                        <label class="required">应用名称</label>
                        <input type="text" class="form-input" placeholder="请输入应用名称">
                    </div>
                    
                    <div class="form-item">
                        <label>应用描述</label>
                        <input type="text" class="form-input" placeholder="请输入应用描述">
                    </div>
                    
                    <div class="form-item">
                        <label class="required">应用类型</label>
                        <select class="form-select">
                            <option value="">请选择应用类型</option>
                            <option value="Web应用">Web应用</option>
                            <option value="客户端应用">客户端应用</option>
                            <option value="移动应用">移动应用</option>
                            <option value="API服务">API服务</option>
                            <option value="数据库">数据库</option>
                            <option value="其他">其他</option>
                        </select>
                    </div>

                    <div class="form-item">
                        <label>状态</label>
                        <label class="switch">
                            <input type="checkbox" checked>
                            <span class="slider round"></span>
                        </label>
                    </div>
                </div>

                <!-- 应用地址配置 -->
                <div class="section">
                    <h4>应用地址配置</h4>
                    <div class="form-item">
                        <label class="required">访问地址</label>
                        <input type="text" class="form-input" placeholder="请输入应用访问地址，如：example.com">
                    </div>
                    
                    <div class="form-item">
                        <label>端口</label>
                        <input type="number" class="form-input" placeholder="请输入端口号，如：80、443">
                    </div>
                    
                    <div class="form-item">
                        <label>协议</label>
                        <select class="form-select">
                            <option value="http">HTTP</option>
                            <option value="https">HTTPS</option>
                            <option value="ftp">FTP</option>
                            <option value="ssh">SSH</option>
                            <option value="tcp">TCP</option>
                            <option value="udp">UDP</option>
                        </select>
                    </div>
                </div>

                <!-- 识别规则 -->
                <div class="section">
                    <h4>识别规则</h4>
                    <div class="form-item">
                        <label>识别方式</label>
                        <div class="checkbox-group">
                            <label class="checkbox-item">
                                <input type="checkbox" name="recognition-type" value="domain" checked>
                                <span>域名识别</span>
                            </label>
                            <label class="checkbox-item">
                                <input type="checkbox" name="recognition-type" value="ip">
                                <span>IP识别</span>
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
                </div>

                <!-- 高级配置 -->
                <div class="section">
                    <h4>高级配置</h4>
                    <div class="form-item">
                        <label>优先级</label>
                        <select class="form-select">
                            <option value="low">低</option>
                            <option value="medium" selected>中</option>
                            <option value="high">高</option>
                            <option value="critical">紧急</option>
                        </select>
                    </div>
                    
                    <div class="form-item">
                        <label>标签</label>
                        <input type="text" class="form-input" placeholder="请输入标签，多个标签用逗号分隔">
                    </div>
                    
                    <div class="form-item">
                        <label>备注</label>
                        <textarea class="form-textarea" placeholder="请输入备注信息"></textarea>
                    </div>
                </div>
            </div>

            <div class="panel-footer">
                <button class="btn-cancel">取消</button>
                <button class="btn-confirm">确定</button>
            </div>
        `;
    },

    // 绑定添加应用面板事件
    bindAddAppPanelEvents: function (panel, overlay, container) {
        console.log('绑定添加应用面板事件');

        const btnClose = panel.querySelector('.btn-close');
        const btnCancel = panel.querySelector('.btn-cancel');
        const closePanel = () => {
            console.log('关闭面板');
            overlay.classList.remove('show');
            panel.classList.remove('show');
            setTimeout(() => {
                container.remove();
            }, 300); // 等待动画完成
        };

        if (btnClose) {
            btnClose.addEventListener('click', closePanel);
            console.log('关闭按钮事件已绑定');
        }

        if (btnCancel) {
            btnCancel.addEventListener('click', closePanel);
            console.log('取消按钮事件已绑定');
        }

        // 点击遮罩层关闭
        overlay.addEventListener('click', closePanel);

        const btnConfirm = panel.querySelector('.btn-confirm');
        if (btnConfirm) {
            btnConfirm.addEventListener('click', () => {
                console.log('点击确定按钮');
                // 收集表单数据
                const formData = this.collectAddAppFormData(panel);
                console.log('添加应用数据:', formData);

                // 验证表单数据
                if (this.validateAddAppFormData(formData)) {
                    // 保存数据
                    this.saveAddAppData(formData);
                    closePanel();
                } else {
                    alert('请填写必填项');
                }
            });
            console.log('确定按钮事件已绑定');
        } else {
            console.log('未找到确定按钮');
        }
    },

    // 收集添加应用表单数据
    collectAddAppFormData: function (panel) {
        const formData = {};

        // 基本信息
        const nameInput = panel.querySelector('input[placeholder*="应用名称"]');
        if (nameInput) formData.name = nameInput.value.trim();

        const descInput = panel.querySelector('input[placeholder*="应用描述"]');
        if (descInput) formData.description = descInput.value.trim();

        const typeSelect = panel.querySelector('select');
        if (typeSelect) formData.type = typeSelect.value;

        const statusCheckbox = panel.querySelector('input[type="checkbox"]');
        if (statusCheckbox) formData.status = statusCheckbox.checked;

        // 应用地址配置
        const addressInput = panel.querySelector('input[placeholder*="访问地址"]');
        if (addressInput) formData.address = addressInput.value.trim();

        const portInput = panel.querySelector('input[type="number"]');
        if (portInput) formData.port = portInput.value.trim();

        const protocolSelect = panel.querySelectorAll('select')[1];
        if (protocolSelect) formData.protocol = protocolSelect.value;

        // 识别规则
        const recognitionTypes = [];
        const recognitionCheckboxes = panel.querySelectorAll('input[name="recognition-type"]:checked');
        recognitionCheckboxes.forEach(checkbox => {
            recognitionTypes.push(checkbox.value);
        });
        formData.recognitionTypes = recognitionTypes;

        // 高级配置
        const prioritySelect = panel.querySelectorAll('select')[2];
        if (prioritySelect) formData.priority = prioritySelect.value;

        const tagsInput = panel.querySelector('input[placeholder*="标签"]');
        if (tagsInput) formData.tags = tagsInput.value.trim();

        const noteTextarea = panel.querySelector('textarea');
        if (noteTextarea) formData.note = noteTextarea.value.trim();

        return formData;
    },

    // 验证添加应用表单数据
    validateAddAppFormData: function (formData) {
        if (!formData.name || formData.name.trim() === '') {
            return false;
        }

        if (!formData.address || formData.address.trim() === '') {
            return false;
        }

        if (!formData.type || formData.type === '') {
            return false;
        }

        return true;
    },

    // 保存添加应用数据
    saveAddAppData: function (formData) {
        // 模拟保存到后端
        console.log('应用数据已保存:', formData);

        // 创建新应用对象
        const newApp = {
            id: Date.now(), // 使用时间戳作为临时ID
            name: formData.name,
            address: formData.address + (formData.port ? ':' + formData.port : ''),
            type: formData.type, // 直接使用选择的类型值
            status: formData.status ? '启用' : '禁用',
            createTime: new Date().toISOString().split('T')[0]
        };

        // 将新应用添加到表格中
        this.addAppToTable(newApp);
    },

    // 获取类型显示名称
    getTypeDisplayName: function (type) {
        const typeMap = {
            'web': 'Web应用',
            'client': '客户端应用',
            'mobile': '移动应用',
            'api': 'API服务',
            'database': '数据库',
            'other': '其他'
        };
        return typeMap[type] || type;
    },

    // 添加应用到表格
    addAppToTable: function (newApp) {
        // 添加到数据数组
        this.customAppData.unshift(newApp);

        // 重新计算分页信息
        this.customAppPagination.total = this.customAppData.length;
        this.customAppPagination.totalPages = Math.ceil(this.customAppPagination.total / this.customAppPagination.pageSize);

        // 跳转到第一页显示新添加的应用
        this.customAppPagination.currentPage = 1;

        // 重新渲染表格
        this.renderCustomAppTableWithPagination();
    },

    // 更新记录总数
    updateRecordCount: function () {
        const recordCountElement = document.querySelector('#customContent .record-count');
        if (recordCountElement) {
            const { currentPage, pageSize, total } = this.customAppPagination;
            const startRecord = (currentPage - 1) * pageSize + 1;
            const endRecord = Math.min(currentPage * pageSize, total);
            recordCountElement.textContent = `显示第 ${startRecord}-${endRecord} 条，共 ${total} 条记录`;
        }
    },

    // 刷新自定义应用数据
    refreshCustomAppData: function () {
        // 模拟自定义应用数据
        const allCustomApps = [
            {
                id: 1,
                name: '内部邮件系统',
                address: '192.168.1.10:8080',
                type: 'Web应用',
                status: '启用',
                createTime: '2024-01-15'
            },
            {
                id: 2,
                name: '项目管理系统',
                address: '192.168.1.11:3000',
                type: 'Web应用',
                status: '启用',
                createTime: '2024-01-10'
            },
            {
                id: 3,
                name: '文件共享服务',
                address: '192.168.1.12:8080',
                type: '客户端应用',
                status: '启用',
                createTime: '2024-01-05'
            },
            {
                id: 4,
                name: '数据库管理',
                address: '192.168.1.13:3306',
                type: '数据库',
                status: '禁用',
                createTime: '2023-12-20'
            },
            {
                id: 5,
                name: 'API网关',
                address: '192.168.1.14:8080',
                type: 'API服务',
                status: '启用',
                createTime: '2023-12-15'
            },
            {
                id: 6,
                name: '监控系统',
                address: '192.168.1.15:9090',
                type: 'Web应用',
                status: '启用',
                createTime: '2024-01-20'
            },
            {
                id: 7,
                name: '日志分析平台',
                address: '192.168.1.16:5601',
                type: 'Web应用',
                status: '启用',
                createTime: '2024-01-18'
            },
            {
                id: 8,
                name: '代码仓库',
                address: '192.168.1.17:3000',
                type: 'Web应用',
                status: '启用',
                createTime: '2024-01-16'
            },
            {
                id: 9,
                name: '持续集成服务',
                address: '192.168.1.18:8080',
                type: 'API服务',
                status: '启用',
                createTime: '2024-01-14'
            },
            {
                id: 10,
                name: '容器编排平台',
                address: '192.168.1.19:6443',
                type: 'Web应用',
                status: '启用',
                createTime: '2024-01-12'
            },
            {
                id: 11,
                name: '消息队列服务',
                address: '192.168.1.20:5672',
                type: 'API服务',
                status: '启用',
                createTime: '2024-01-10'
            },
            {
                id: 12,
                name: '缓存服务',
                address: '192.168.1.21:6379',
                type: '数据库',
                status: '启用',
                createTime: '2024-01-08'
            },
            {
                id: 13,
                name: '负载均衡器',
                address: '192.168.1.22:80',
                type: 'Web应用',
                status: '启用',
                createTime: '2024-01-06'
            },
            {
                id: 14,
                name: 'VPN服务',
                address: '192.168.1.23:1194',
                type: '客户端应用',
                status: '启用',
                createTime: '2024-01-04'
            },
            {
                id: 15,
                name: '备份服务',
                address: '192.168.1.24:22',
                type: '客户端应用',
                status: '启用',
                createTime: '2024-01-02'
            },
            {
                id: 16,
                name: 'DNS服务',
                address: '192.168.1.25:53',
                type: 'API服务',
                status: '启用',
                createTime: '2023-12-30'
            },
            {
                id: 17,
                name: 'DHCP服务',
                address: '192.168.1.26:67',
                type: 'API服务',
                status: '启用',
                createTime: '2023-12-28'
            },
            {
                id: 18,
                name: '时间同步服务',
                address: '192.168.1.27:123',
                type: 'API服务',
                status: '启用',
                createTime: '2023-12-26'
            },
            {
                id: 19,
                name: '文件传输服务',
                address: '192.168.1.28:21',
                type: '客户端应用',
                status: '启用',
                createTime: '2023-12-24'
            },
            {
                id: 20,
                name: '远程桌面服务',
                address: '192.168.1.29:3389',
                type: '客户端应用',
                status: '启用',
                createTime: '2023-12-22'
            },
            {
                id: 21,
                name: 'Web服务器',
                address: '192.168.1.30:80',
                type: 'Web应用',
                status: '启用',
                createTime: '2023-12-20'
            },
            {
                id: 22,
                name: '邮件服务器',
                address: '192.168.1.31:25',
                type: 'API服务',
                status: '启用',
                createTime: '2023-12-18'
            },
            {
                id: 23,
                name: '代理服务器',
                address: '192.168.1.32:3128',
                type: 'Web应用',
                status: '启用',
                createTime: '2023-12-16'
            },
            {
                id: 24,
                name: '认证服务',
                address: '192.168.1.33:389',
                type: 'API服务',
                status: '启用',
                createTime: '2023-12-14'
            },
            {
                id: 25,
                name: '存储服务',
                address: '192.168.1.34:9000',
                type: 'API服务',
                status: '启用',
                createTime: '2023-12-12'
            }
        ];

        // 保存所有数据
        this.customAppData = allCustomApps;

        // 计算分页信息
        this.customAppPagination.total = allCustomApps.length;
        this.customAppPagination.totalPages = Math.ceil(this.customAppPagination.total / this.customAppPagination.pageSize);

        // 渲染当前页数据
        this.renderCustomAppTableWithPagination();
        console.log('自定义应用数据已刷新');
    },

    // 渲染自定义应用表格（带分页）
    renderCustomAppTableWithPagination: function () {
        const { currentPage, pageSize, total, totalPages } = this.customAppPagination;

        // 计算当前页的数据
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const currentPageData = this.customAppData.slice(startIndex, endIndex);

        // 渲染表格
        this.renderCustomAppTable(currentPageData);

        // 渲染分页控件
        this.renderCustomAppPagination();

        // 更新记录总数
        this.updateRecordCount();
    },

    // 渲染自定义应用表格
    renderCustomAppTable: function (apps) {
        const tbody = document.querySelector('#customContent .custom-app-table tbody');
        if (!tbody) return;

        tbody.innerHTML = apps.map(app => `
            <tr>
                <td><input type="checkbox" class="app-checkbox" value="${app.id}" onchange="window.appManagement.updateCustomAppSelection()"></td>
                <td>${app.name}</td>
                <td>
                    <div class="address-info">
                        <div>${app.address}</div>
                    </div>
                </td>
                <td>${app.type}</td>
                <td>
                    <a href="#" class="link-edit" onclick="window.appManagement.editApp(${app.id}); return false;">编辑</a>
                    <a href="#" class="link-delete" onclick="window.appManagement.deleteApp(${app.id}); return false;">删除</a>
                </td>
            </tr>
        `).join('');

        // 绑定全选功能
        this.bindCustomAppSelectAll();
    },

    // 渲染自定义应用分页控件
    renderCustomAppPagination: function () {
        const { currentPage, total, totalPages } = this.customAppPagination;
        const paginationContainer = document.querySelector('#customContent .pagination');

        if (!paginationContainer) return;

        // 计算显示的页码范围
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, currentPage + 2);

        // 调整页码范围，确保显示5个页码
        if (endPage - startPage < 4) {
            if (startPage === 1) {
                endPage = Math.min(totalPages, startPage + 4);
            } else {
                startPage = Math.max(1, endPage - 4);
            }
        }

        const paginationHTML = `
            <div class="pagination-info">
                显示第 ${(currentPage - 1) * this.customAppPagination.pageSize + 1}-${Math.min(currentPage * this.customAppPagination.pageSize, total)} 条，共 ${total} 条记录
            </div>
            <div class="pagination-controls">
                <button class="page-btn" onclick="window.appManagement.goToCustomAppPage(1)" ${currentPage === 1 ? 'disabled' : ''}>首页</button>
                <button class="page-btn" onclick="window.appManagement.goToCustomAppPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>上一页</button>
                
                ${Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(page => `
                    <button class="page-btn ${page === currentPage ? 'active' : ''}" onclick="window.appManagement.goToCustomAppPage(${page})">${page}</button>
                `).join('')}
                
                <button class="page-btn" onclick="window.appManagement.goToCustomAppPage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>下一页</button>
                <button class="page-btn" onclick="window.appManagement.goToCustomAppPage(${totalPages})" ${currentPage === totalPages ? 'disabled' : ''}>末页</button>
            </div>
        `;

        paginationContainer.innerHTML = paginationHTML;
    },

    // 跳转到指定页面
    goToCustomAppPage: function (page) {
        if (page < 1 || page > this.customAppPagination.totalPages) return;

        this.customAppPagination.currentPage = page;
        this.renderCustomAppTableWithPagination();
    },

    // 编辑应用
    editApp: function (appId) {
        console.log('编辑应用:', appId);

        // 获取应用数据
        const appData = this.getAppDataById(appId);
        if (!appData) {
            alert('未找到应用数据');
            return;
        }

        // 显示编辑面板
        this.showEditAppPanel(appData);
    },

    // 根据ID获取应用数据
    getAppDataById: function (appId) {
        // 从数据数组中查找应用
        const app = this.customAppData.find(app => app.id === appId);
        if (app) {
            return {
                id: app.id,
                name: app.name,
                address: app.address,
                type: app.type,
                status: app.status
            };
        }
        return null;
    },

    // 显示编辑应用面板
    showEditAppPanel: function (appData) {
        console.log('显示编辑应用面板:', appData);

        // 移除已存在的面板
        const existingPanel = document.querySelector('.app-management-overlay');
        if (existingPanel) {
            existingPanel.parentNode.remove();
        }

        // 确保样式已注入
        this.ensureStyles();

        // 创建遮罩层和面板容器
        const container = document.createElement('div');
        container.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 9998; pointer-events: none;';

        const overlay = document.createElement('div');
        overlay.className = 'app-management-overlay';
        overlay.style.pointerEvents = 'auto';

        const panel = document.createElement('div');
        panel.className = 'app-management-panel';
        panel.style.pointerEvents = 'auto';
        panel.innerHTML = this.getEditAppPanelTemplate(appData);

        container.appendChild(overlay);
        container.appendChild(panel);
        document.body.appendChild(container);

        console.log('编辑面板已创建并添加到DOM');

        // 使用 requestAnimationFrame 确保DOM更新后再触发动画
        requestAnimationFrame(() => {
            overlay.classList.add('show');
            panel.classList.add('show');
            console.log('编辑面板动画已触发');
        });

        // 绑定面板事件
        this.bindEditAppPanelEvents(panel, overlay, container, appData.id);
    },

    // 获取编辑应用面板模板
    getEditAppPanelTemplate: function (appData) {
        // 解析地址和端口
        const addressParts = appData.address.split(':');
        const address = addressParts[0];
        const port = addressParts.length > 1 ? addressParts[1] : '';

        return `
            <div class="panel-header">
                <h3>编辑自定义应用</h3>
                <button class="btn-close">×</button>
            </div>
            
            <div class="panel-body">
                <!-- 基本信息 -->
                <div class="section">
                    <h4>基本信息</h4>
                    <div class="form-item">
                        <label class="required">应用名称</label>
                        <input type="text" class="form-input" placeholder="请输入应用名称" value="${appData.name}">
                    </div>
                    
                    <div class="form-item">
                        <label>应用描述</label>
                        <input type="text" class="form-input" placeholder="请输入应用描述">
                    </div>
                    
                    <div class="form-item">
                        <label class="required">应用类型</label>
                        <select class="form-select">
                            <option value="">请选择应用类型</option>
                            <option value="Web应用" ${appData.type === 'Web应用' ? 'selected' : ''}>Web应用</option>
                            <option value="客户端应用" ${appData.type === '客户端应用' ? 'selected' : ''}>客户端应用</option>
                            <option value="移动应用" ${appData.type === '移动应用' ? 'selected' : ''}>移动应用</option>
                            <option value="API服务" ${appData.type === 'API服务' ? 'selected' : ''}>API服务</option>
                            <option value="数据库" ${appData.type === '数据库' ? 'selected' : ''}>数据库</option>
                            <option value="其他" ${appData.type === '其他' ? 'selected' : ''}>其他</option>
                        </select>
                    </div>

                    <div class="form-item">
                        <label>状态</label>
                        <label class="switch">
                            <input type="checkbox" ${appData.status === '启用' ? 'checked' : ''}>
                            <span class="slider round"></span>
                        </label>
                    </div>
                </div>

                <!-- 应用地址配置 -->
                <div class="section">
                    <h4>应用地址配置</h4>
                    <div class="form-item">
                        <label class="required">访问地址</label>
                        <input type="text" class="form-input" placeholder="请输入应用访问地址，如：example.com" value="${address}">
                    </div>
                    
                    <div class="form-item">
                        <label>端口</label>
                        <input type="number" class="form-input" placeholder="请输入端口号，如：80、443" value="${port}">
                    </div>
                    
                    <div class="form-item">
                        <label>协议</label>
                        <select class="form-select">
                            <option value="http">HTTP</option>
                            <option value="https">HTTPS</option>
                            <option value="ftp">FTP</option>
                            <option value="ssh">SSH</option>
                            <option value="tcp">TCP</option>
                            <option value="udp">UDP</option>
                        </select>
                    </div>
                </div>

                <!-- 识别规则 -->
                <div class="section">
                    <h4>识别规则</h4>
                    <div class="form-item">
                        <label>识别方式</label>
                        <div class="checkbox-group">
                            <label class="checkbox-item">
                                <input type="checkbox" name="recognition-type" value="domain" checked>
                                <span>域名识别</span>
                            </label>
                            <label class="checkbox-item">
                                <input type="checkbox" name="recognition-type" value="ip">
                                <span>IP识别</span>
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
                </div>

                <!-- 高级配置 -->
                <div class="section">
                    <h4>高级配置</h4>
                    <div class="form-item">
                        <label>优先级</label>
                        <select class="form-select">
                            <option value="low">低</option>
                            <option value="medium" selected>中</option>
                            <option value="high">高</option>
                            <option value="critical">紧急</option>
                        </select>
                    </div>
                    
                    <div class="form-item">
                        <label>标签</label>
                        <input type="text" class="form-input" placeholder="请输入标签，多个标签用逗号分隔">
                    </div>
                    
                    <div class="form-item">
                        <label>备注</label>
                        <textarea class="form-textarea" placeholder="请输入备注信息"></textarea>
                    </div>
                </div>
            </div>

            <div class="panel-footer">
                <button class="btn-cancel">取消</button>
                <button class="btn-confirm">确定</button>
            </div>
        `;
    },

    // 删除应用
    deleteApp: function (appId) {
        if (confirm('确定要删除这个应用吗？')) {
            console.log('删除应用:', appId);

            // 从数据数组中删除
            this.customAppData = this.customAppData.filter(app => app.id !== appId);

            // 重新计算分页信息
            this.customAppPagination.total = this.customAppData.length;
            this.customAppPagination.totalPages = Math.ceil(this.customAppPagination.total / this.customAppPagination.pageSize);

            // 如果当前页没有数据了，跳转到上一页
            if (this.customAppPagination.currentPage > this.customAppPagination.totalPages && this.customAppPagination.totalPages > 0) {
                this.customAppPagination.currentPage = this.customAppPagination.totalPages;
            }

            // 重新渲染表格
            this.renderCustomAppTableWithPagination();
        }
    },

    // 绑定编辑应用面板事件
    bindEditAppPanelEvents: function (panel, overlay, container, appId) {
        console.log('绑定编辑应用面板事件');

        const btnClose = panel.querySelector('.btn-close');
        const btnCancel = panel.querySelector('.btn-cancel');
        const closePanel = () => {
            console.log('关闭编辑面板');
            overlay.classList.remove('show');
            panel.classList.remove('show');
            setTimeout(() => {
                container.remove();
            }, 300); // 等待动画完成
        };

        if (btnClose) {
            btnClose.addEventListener('click', closePanel);
            console.log('关闭按钮事件已绑定');
        }

        if (btnCancel) {
            btnCancel.addEventListener('click', closePanel);
            console.log('取消按钮事件已绑定');
        }

        // 点击遮罩层关闭
        overlay.addEventListener('click', closePanel);

        const btnConfirm = panel.querySelector('.btn-confirm');
        if (btnConfirm) {
            btnConfirm.addEventListener('click', () => {
                const formData = this.collectAddAppFormData(panel);
                if (this.validateAddAppFormData(formData)) {
                    this.saveEditAppData(appId, formData);
                    closePanel();
                } else {
                    alert('请填写必填项');
                }
            });
        }
    },

    // 保存编辑应用数据
    saveEditAppData: function (appId, formData) {
        // 更新数据数组中的应用
        const appIndex = this.customAppData.findIndex(app => app.id === appId);
        if (appIndex !== -1) {
            this.customAppData[appIndex] = {
                ...this.customAppData[appIndex],
                name: formData.name,
                address: formData.address + (formData.port ? ':' + formData.port : ''),
                type: formData.type,
                status: formData.status ? '启用' : '禁用'
            };

            // 重新渲染表格
            this.renderCustomAppTableWithPagination();
        }
    },

    // 绑定自定义应用全选功能
    bindCustomAppSelectAll: function () {
        // 绑定表格头部的全选复选框
        const selectAllHeaderCheckbox = document.querySelector('#customContent #selectAll');
        if (selectAllHeaderCheckbox) {
            // 移除之前的事件监听器，避免重复绑定
            if (this.handleSelectAllHeaderChange) {
                selectAllHeaderCheckbox.removeEventListener('change', this.handleSelectAllHeaderChange);
            }

            // 绑定新的事件监听器
            this.handleSelectAllHeaderChange = (e) => {
                console.log('表格头部全选复选框被点击:', e.target.checked);
                const checkboxes = document.querySelectorAll('#customContent .app-checkbox');
                console.log('找到复选框数量:', checkboxes.length);
                checkboxes.forEach(checkbox => {
                    checkbox.checked = e.target.checked;
                });
                this.updateCustomAppSelection();
            };

            selectAllHeaderCheckbox.addEventListener('change', this.handleSelectAllHeaderChange);
            console.log('表格头部全选功能已绑定');
        } else {
            console.log('未找到表格头部全选复选框');
        }

        // 绑定表格底部的全选复选框
        const selectAllFooterCheckbox = document.querySelector('#selectAllCustomApps');
        if (selectAllFooterCheckbox) {
            // 移除之前的事件监听器，避免重复绑定
            if (this.handleSelectAllFooterChange) {
                selectAllFooterCheckbox.removeEventListener('change', this.handleSelectAllFooterChange);
            }

            // 绑定新的事件监听器
            this.handleSelectAllFooterChange = (e) => {
                console.log('表格底部全选复选框被点击:', e.target.checked);
                const checkboxes = document.querySelectorAll('#customContent .app-checkbox');
                console.log('找到复选框数量:', checkboxes.length);
                checkboxes.forEach(checkbox => {
                    checkbox.checked = e.target.checked;
                });
                this.updateCustomAppSelection();
            };

            selectAllFooterCheckbox.addEventListener('change', this.handleSelectAllFooterChange);
            console.log('表格底部全选功能已绑定');
        } else {
            console.log('未找到表格底部全选复选框');
        }
    },

    // 更新自定义应用选择状态
    updateCustomAppSelection: function () {
        console.log('更新自定义应用选择状态');
        const checkboxes = document.querySelectorAll('#customContent .app-checkbox');
        const selectAllHeaderCheckbox = document.querySelector('#customContent #selectAll');
        const selectAllFooterCheckbox = document.querySelector('#selectAllCustomApps');
        const selectedCountSpan = document.querySelector('#customContent .selected-count');

        console.log('找到复选框数量:', checkboxes.length);
        console.log('找到表格头部全选复选框:', !!selectAllHeaderCheckbox);
        console.log('找到表格底部全选复选框:', !!selectAllFooterCheckbox);
        console.log('找到选中数量显示元素:', !!selectedCountSpan);

        let selectedCount = 0;
        let totalCount = checkboxes.length;

        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                selectedCount++;
            }
        });

        console.log('选中数量:', selectedCount, '总数:', totalCount);

        // 更新选中数量显示
        if (selectedCountSpan) {
            selectedCountSpan.textContent = selectedCount;
        }

        // 更新表格头部全选复选框状态
        if (selectAllHeaderCheckbox) {
            selectAllHeaderCheckbox.checked = selectedCount === totalCount && totalCount > 0;
            selectAllHeaderCheckbox.indeterminate = selectedCount > 0 && selectedCount < totalCount;
            console.log('表格头部全选复选框状态 - checked:', selectAllHeaderCheckbox.checked, 'indeterminate:', selectAllHeaderCheckbox.indeterminate);
        }

        // 更新表格底部全选复选框状态
        if (selectAllFooterCheckbox) {
            selectAllFooterCheckbox.checked = selectedCount === totalCount && totalCount > 0;
            selectAllFooterCheckbox.indeterminate = selectedCount > 0 && selectedCount < totalCount;
            console.log('表格底部全选复选框状态 - checked:', selectAllFooterCheckbox.checked, 'indeterminate:', selectAllFooterCheckbox.indeterminate);
        }
    },

    // 删除选中的自定义应用
    deleteSelectedCustomApps: function () {
        const checkboxes = document.querySelectorAll('#customContent .app-checkbox:checked');
        if (checkboxes.length === 0) {
            alert('请选择要删除的应用');
            return;
        }

        if (confirm(`确定要删除选中的 ${checkboxes.length} 个应用吗？`)) {
            const selectedIds = Array.from(checkboxes).map(checkbox => parseInt(checkbox.value));

            // 从数据数组中删除选中的应用
            this.customAppData = this.customAppData.filter(app => !selectedIds.includes(app.id));

            // 重新计算分页信息
            this.customAppPagination.total = this.customAppData.length;
            this.customAppPagination.totalPages = Math.ceil(this.customAppPagination.total / this.customAppPagination.pageSize);

            // 如果当前页没有数据了，跳转到上一页
            if (this.customAppPagination.currentPage > this.customAppPagination.totalPages && this.customAppPagination.totalPages > 0) {
                this.customAppPagination.currentPage = this.customAppPagination.totalPages;
            }

            // 重新渲染表格
            this.renderCustomAppTableWithPagination();

            // 重置全选状态
            const selectAllHeaderCheckbox = document.querySelector('#customContent #selectAll');
            const selectAllFooterCheckbox = document.querySelector('#selectAllCustomApps');

            if (selectAllHeaderCheckbox) {
                selectAllHeaderCheckbox.checked = false;
                selectAllHeaderCheckbox.indeterminate = false;
            }

            if (selectAllFooterCheckbox) {
                selectAllFooterCheckbox.checked = false;
                selectAllFooterCheckbox.indeterminate = false;
            }
        }
    }
};
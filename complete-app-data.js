// 完整的企业级应用数据 - 标准化格式
const completeAppData = [
  // 办公应用 - 邮件系统
  { name: 'Microsoft Outlook', address: 'outlook.office365.com', type: '邮件系统', category: '办公应用', status: '启用', description: '微软企业邮箱服务', tags: ['邮件', '办公', '微软'] },
  { name: 'Gmail', address: 'mail.google.com', type: '邮件系统', category: '办公应用', status: '启用', description: '谷歌邮箱服务', tags: ['邮件', '办公', '谷歌'] },
  { name: 'QQ邮箱', address: 'mail.qq.com', type: '邮件系统', category: '办公应用', status: '启用', description: '腾讯QQ邮箱服务', tags: ['邮件', '办公', '腾讯'] },
  { name: '163邮箱', address: 'mail.163.com', type: '邮件系统', category: '办公应用', status: '启用', description: '网易163邮箱服务', tags: ['邮件', '办公', '网易'] },
  { name: '企业微信邮箱', address: 'exmail.qq.com', type: '邮件系统', category: '办公应用', status: '启用', description: '腾讯企业邮箱服务', tags: ['邮件', '办公', '企业微信'] },

  // 办公应用 - 文档协作
  { name: 'Microsoft Office Online', address: 'office.live.com', type: '文档协作', category: '办公应用', status: '启用', description: '微软在线办公套件', tags: ['文档', '协作', '微软'] },
  { name: 'Google Docs', address: 'docs.google.com', type: '文档协作', category: '办公应用', status: '启用', description: '谷歌在线文档服务', tags: ['文档', '协作', '谷歌'] },
  { name: '腾讯文档', address: 'docs.qq.com', type: '文档协作', category: '办公应用', status: '启用', description: '腾讯在线文档服务', tags: ['文档', '协作', '腾讯'] },
  { name: '金山文档', address: 'www.kdocs.cn', type: '文档协作', category: '办公应用', status: '启用', description: '金山在线文档服务', tags: ['文档', '协作', '金山'] },
  { name: '石墨文档', address: 'shimo.im', type: '文档协作', category: '办公应用', status: '启用', description: '石墨在线文档服务', tags: ['文档', '协作', '石墨'] },

  // 办公应用 - 视频会议
  { name: 'Zoom', address: 'zoom.us', type: '视频会议', category: '办公应用', status: '启用', description: 'Zoom视频会议平台', tags: ['视频会议', '远程办公', 'Zoom'] },
  { name: '腾讯会议', address: 'meeting.tencent.com', type: '视频会议', category: '办公应用', status: '启用', description: '腾讯视频会议平台', tags: ['视频会议', '远程办公', '腾讯'] },
  { name: '钉钉', address: 'www.dingtalk.com', type: '视频会议', category: '办公应用', status: '启用', description: '阿里巴巴钉钉平台', tags: ['视频会议', '远程办公', '阿里'] },
  { name: '飞书', address: 'www.feishu.cn', type: '视频会议', category: '办公应用', status: '启用', description: '字节跳动飞书平台', tags: ['视频会议', '远程办公', '字节'] },
  { name: 'Microsoft Teams', address: 'teams.microsoft.com', type: '视频会议', category: '办公应用', status: '启用', description: '微软Teams协作平台', tags: ['视频会议', '远程办公', '微软'] },

  // 办公应用 - 日历
  { name: 'Google Calendar', address: 'calendar.google.com', type: '日历', category: '办公应用', status: '启用', description: '谷歌日历服务', tags: ['日历', '办公', '谷歌'] },
  { name: 'Outlook Calendar', address: 'outlook.office365.com/calendar', type: '日历', category: '办公应用', status: '启用', description: '微软Outlook日历', tags: ['日历', '办公', '微软'] },
  { name: '钉钉日历', address: 'calendar.dingtalk.com', type: '日历', category: '办公应用', status: '启用', description: '钉钉日历服务', tags: ['日历', '办公', '钉钉'] },
  { name: '飞书日历', address: 'calendar.feishu.cn', type: '日历', category: '办公应用', status: '启用', description: '飞书日历服务', tags: ['日历', '办公', '飞书'] },

  // 办公应用 - 任务管理
  { name: 'Trello', address: 'trello.com', type: '任务管理', category: '办公应用', status: '启用', description: 'Trello看板任务管理', tags: ['任务', '协作', '看板'] },
  { name: 'Asana', address: 'asana.com', type: '任务管理', category: '办公应用', status: '启用', description: 'Asana任务协作平台', tags: ['任务', '协作', '项目'] },
  { name: 'Teambition', address: 'teambition.com', type: '任务管理', category: '办公应用', status: '启用', description: '阿里Teambition项目管理', tags: ['任务', '协作', '阿里'] },
  { name: 'ClickUp', address: 'clickup.com', type: '任务管理', category: '办公应用', status: '启用', description: 'ClickUp任务管理', tags: ['任务', '协作', '项目'] },

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

  // 办公应用 - 考勤
  { name: '企业微信考勤', address: 'work.weixin.qq.com/attendance', type: '考勤', category: '办公应用', status: '启用', description: '企业微信考勤', tags: ['考勤', '办公', '微信'] },
  { name: '钉钉考勤', address: 'dingtalk.com/attendance', type: '考勤', category: '办公应用', status: '启用', description: '钉钉考勤', tags: ['考勤', '办公', '钉钉'] },
  { name: '飞书考勤', address: 'feishu.cn/attendance', type: '考勤', category: '办公应用', status: '启用', description: '飞书考勤', tags: ['考勤', '办公', '飞书'] },
  { name: '泛微OA考勤', address: 'weaver.com.cn/oa/attendance', type: '考勤', category: '办公应用', status: '启用', description: '泛微OA考勤', tags: ['考勤', 'OA', '泛微'] },

  // 开发工具 - 代码仓库
  { name: 'GitHub', address: 'github.com', type: '代码仓库', category: '开发工具', status: '启用', description: 'GitHub代码托管平台', tags: ['代码仓库', 'Git', '开源'] },
  { name: 'GitLab', address: 'gitlab.com', type: '代码仓库', category: '开发工具', status: '启用', description: 'GitLab代码托管平台', tags: ['代码仓库', 'Git', 'CI/CD'] },
  { name: 'Gitee', address: 'gitee.com', type: '代码仓库', category: '开发工具', status: '启用', description: '码云代码托管平台', tags: ['代码仓库', 'Git', '国内'] },
  { name: 'Bitbucket', address: 'bitbucket.org', type: '代码仓库', category: '开发工具', status: '启用', description: 'Atlassian代码托管平台', tags: ['代码仓库', 'Git', 'Atlassian'] },
  { name: 'Coding', address: 'coding.net', type: '代码仓库', category: '开发工具', status: '启用', description: '腾讯云开发者平台', tags: ['代码仓库', 'Git', '腾讯'] },

  // 开发工具 - CI/CD工具
  { name: 'Jenkins', address: 'jenkins.io', type: 'CI/CD工具', category: '开发工具', status: '启用', description: 'Jenkins持续集成平台', tags: ['CI/CD', '自动化', '开源'] },
  { name: 'GitHub Actions', address: 'github.com/features/actions', type: 'CI/CD工具', category: '开发工具', status: '启用', description: 'GitHub Actions自动化平台', tags: ['CI/CD', '自动化', 'GitHub'] },
  { name: 'GitLab CI', address: 'docs.gitlab.com/ee/ci', type: 'CI/CD工具', category: '开发工具', status: '启用', description: 'GitLab CI/CD平台', tags: ['CI/CD', '自动化', 'GitLab'] },
  { name: 'Travis CI', address: 'travis-ci.org', type: 'CI/CD工具', category: '开发工具', status: '启用', description: 'Travis CI持续集成平台', tags: ['CI/CD', '自动化', '开源'] },
  { name: 'CircleCI', address: 'circleci.com', type: 'CI/CD工具', category: '开发工具', status: '启用', description: 'CircleCI持续集成平台', tags: ['CI/CD', '自动化', '云服务'] },

  // 开发工具 - 监控工具
  { name: 'Grafana', address: 'grafana.com', type: '监控工具', category: '开发工具', status: '启用', description: 'Grafana数据可视化平台', tags: ['监控', '可视化', '开源'] },
  { name: 'Prometheus', address: 'prometheus.io', type: '监控工具', category: '开发工具', status: '启用', description: 'Prometheus监控系统', tags: ['监控', '时序数据库', '开源'] },
  { name: 'Zabbix', address: 'www.zabbix.com', type: '监控工具', category: '开发工具', status: '启用', description: 'Zabbix企业级监控平台', tags: ['监控', '企业级', '开源'] },
  { name: 'Nagios', address: 'www.nagios.org', type: '监控工具', category: '开发工具', status: '启用', description: 'Nagios网络监控系统', tags: ['监控', '网络', '开源'] },
  { name: 'Datadog', address: 'www.datadoghq.com', type: '监控工具', category: '开发工具', status: '启用', description: 'Datadog云监控平台', tags: ['监控', '云服务', 'SaaS'] },

  // 云服务 - 对象存储
  { name: '阿里云OSS', address: 'oss.aliyun.com', type: '对象存储', category: '云服务', status: '启用', description: '阿里云对象存储服务', tags: ['对象存储', '云服务', '阿里云'] },
  { name: '腾讯云COS', address: 'cloud.tencent.com/product/cos', type: '对象存储', category: '云服务', status: '启用', description: '腾讯云对象存储服务', tags: ['对象存储', '云服务', '腾讯云'] },
  { name: 'AWS S3', address: 'aws.amazon.com/s3', type: '对象存储', category: '云服务', status: '启用', description: '亚马逊S3对象存储服务', tags: ['对象存储', '云服务', 'AWS'] },
  { name: 'Azure Blob', address: 'azure.microsoft.com/services/storage/blobs', type: '对象存储', category: '云服务', status: '启用', description: '微软Azure Blob存储服务', tags: ['对象存储', '云服务', 'Azure'] },
  { name: '七牛云', address: 'www.qiniu.com', type: '对象存储', category: '云服务', status: '启用', description: '七牛云对象存储服务', tags: ['对象存储', '云服务', '七牛云'] },

  // 云服务 - 容器服务
  { name: '阿里云ACK', address: 'www.aliyun.com/product/kubernetes', type: '容器服务', category: '云服务', status: '启用', description: '阿里云容器服务Kubernetes版', tags: ['容器', 'Kubernetes', '阿里云'] },
  { name: '腾讯云TKE', address: 'cloud.tencent.com/product/tke', type: '容器服务', category: '云服务', status: '启用', description: '腾讯云容器服务', tags: ['容器', 'Kubernetes', '腾讯云'] },
  { name: 'AWS EKS', address: 'aws.amazon.com/eks', type: '容器服务', category: '云服务', status: '启用', description: '亚马逊EKS容器服务', tags: ['容器', 'Kubernetes', 'AWS'] },
  { name: 'Azure AKS', address: 'azure.microsoft.com/services/kubernetes-service', type: '容器服务', category: '云服务', status: '启用', description: '微软Azure Kubernetes服务', tags: ['容器', 'Kubernetes', 'Azure'] },
  { name: 'Docker Hub', address: 'hub.docker.com', type: '容器服务', category: '云服务', status: '启用', description: 'Docker镜像仓库', tags: ['容器', '镜像', 'Docker'] },

  // 云服务 - 数据库服务
  { name: '阿里云RDS', address: 'www.aliyun.com/product/rds', type: '数据库服务', category: '云服务', status: '启用', description: '阿里云关系型数据库服务', tags: ['数据库', 'RDS', '阿里云'] },
  { name: '腾讯云CDB', address: 'cloud.tencent.com/product/cdb', type: '数据库服务', category: '云服务', status: '启用', description: '腾讯云数据库服务', tags: ['数据库', 'MySQL', '腾讯云'] },
  { name: 'AWS RDS', address: 'aws.amazon.com/rds', type: '数据库服务', category: '云服务', status: '启用', description: '亚马逊RDS数据库服务', tags: ['数据库', 'RDS', 'AWS'] },
  { name: 'Azure SQL', address: 'azure.microsoft.com/services/sql-database', type: '数据库服务', category: '云服务', status: '启用', description: '微软Azure SQL数据库服务', tags: ['数据库', 'SQL', 'Azure'] },
  { name: 'MongoDB Atlas', address: 'www.mongodb.com/atlas', type: '数据库服务', category: '云服务', status: '启用', description: 'MongoDB云数据库服务', tags: ['数据库', 'NoSQL', 'MongoDB'] },

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

  // 安全工具 - 防火墙
  { name: '思科防火墙', address: 'cisco.com/firewall', type: '防火墙', category: '安全工具', status: '启用', description: '思科企业级防火墙', tags: ['防火墙', '安全', '思科'] },
  { name: '华为防火墙', address: 'huawei.com/firewall', type: '防火墙', category: '安全工具', status: '启用', description: '华为企业级防火墙', tags: ['防火墙', '安全', '华为'] },
  { name: 'H3C防火墙', address: 'h3c.com/firewall', type: '防火墙', category: '安全工具', status: '启用', description: 'H3C企业级防火墙', tags: ['防火墙', '安全', 'H3C'] },
  { name: 'Juniper防火墙', address: 'juniper.net/firewall', type: '防火墙', category: '安全工具', status: '启用', description: 'Juniper企业级防火墙', tags: ['防火墙', '安全', 'Juniper'] },

  // 安全工具 - 入侵检测
  { name: 'Snort IDS', address: 'snort.org', type: '入侵检测', category: '安全工具', status: '启用', description: 'Snort入侵检测系统', tags: ['入侵检测', '安全', '开源'] },
  { name: 'Suricata IDS', address: 'suricata.io', type: '入侵检测', category: '安全工具', status: '启用', description: 'Suricata入侵检测系统', tags: ['入侵检测', '安全', '开源'] },
  { name: '思科IDS', address: 'cisco.com/ids', type: '入侵检测', category: '安全工具', status: '启用', description: '思科入侵检测系统', tags: ['入侵检测', '安全', '思科'] },
  { name: '华为IDS', address: 'huawei.com/ids', type: '入侵检测', category: '安全工具', status: '启用', description: '华为入侵检测系统', tags: ['入侵检测', '安全', '华为'] },

  // 数据分析 - 商业智能
  { name: 'Tableau', address: 'tableau.com', type: '商业智能', category: '数据分析', status: '启用', description: 'Tableau数据可视化平台', tags: ['商业智能', '可视化', 'Tableau'] },
  { name: 'Power BI', address: 'powerbi.microsoft.com', type: '商业智能', category: '数据分析', status: '启用', description: '微软Power BI商业智能', tags: ['商业智能', '可视化', '微软'] },
  { name: 'QlikView', address: 'qlik.com', type: '商业智能', category: '数据分析', status: '启用', description: 'Qlik商业智能平台', tags: ['商业智能', '可视化', 'Qlik'] },
  { name: 'FineBI', address: 'fanruan.com/finebi', type: '商业智能', category: '数据分析', status: '启用', description: '帆软FineBI商业智能', tags: ['商业智能', '可视化', '帆软'] },

  // 通信服务 - 即时通讯
  { name: 'Slack', address: 'slack.com', type: '即时通讯', category: '通信服务', status: '启用', description: 'Slack团队协作平台', tags: ['即时通讯', '协作', 'Slack'] },
  { name: 'Discord', address: 'discord.com', type: '即时通讯', category: '通信服务', status: '启用', description: 'Discord游戏语音平台', tags: ['即时通讯', '语音', 'Discord'] },
  { name: 'Telegram', address: 'telegram.org', type: '即时通讯', category: '通信服务', status: '启用', description: 'Telegram即时通讯', tags: ['即时通讯', '加密', 'Telegram'] },
  { name: 'WhatsApp', address: 'whatsapp.com', type: '即时通讯', category: '通信服务', status: '启用', description: 'WhatsApp即时通讯', tags: ['即时通讯', '移动', 'WhatsApp'] },

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

// 导出数据
if (typeof module !== 'undefined' && module.exports) {
  module.exports = completeAppData;
}

console.log(`✅ 完整应用数据已加载: ${completeAppData.length} 个应用`);

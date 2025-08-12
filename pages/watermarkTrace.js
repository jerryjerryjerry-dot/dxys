// 水印溯源页面配置
window.watermarkTrace = {
    id: 'watermarkTrace',
    title: '水印溯源',
    
    // 水印映射关系存储
    watermarkMappings: [],
    
    // 当前上传的文件信息
    currentFiles: {
        record: null, // 水印标记页面的文件
        analysis: null // 水印分析页面的文件
    },
    
    // 水印映射关系存储
    watermarkMappings: [],
    
    // 当前上传的文件信息
    currentFiles: {
        record: null, // 水印标记页面的文件
        analysis: null // 水印分析页面的文件
    },
    
    // 页面内容模板
    content: function() {
        return `
            <div class="header">
                <h1>水印溯源</h1>
            </div>
            
            <div class="trace-container">
                <div class="trace-header">
                    <div class="switch-wrapper">
                        开启后，可以在数据识别、数据染色中使用流转水印溯源能力，通过水印分析可以自动化生成报告
                        <label class="switch">
                            <input type="checkbox" checked>
                            <span class="slider"></span>
                        </label>
                    </div>
                </div>

                <div class="trace-tabs">
                    <a href="#" class="tab active" data-tab="record">水印标记</a>
                    <a href="#" class="tab" data-tab="analysis">水印分析</a>
                </div>

                <div class="tab-content">
                    <div id="recordContent" class="tab-pane active">
                        <div class="record-form">
                            <div class="form-item">
                                <label class="required">待识文件</label>
                                <div class="upload-area" id="record-upload-area">
                                    <div class="upload-box" id="record-upload-box">
                                        <div class="upload-icon">▶</div>
                                        <div class="upload-text">点击或拖动文件到这里进行上传</div>
                                        <div class="file-types">
                                            <div>支持办公文档（doc、xls、csv、ppt、pdf、txt等）</div>
                                            <div>文本文档（txt、yaml、xml、json、config、ini等）</div>
                                            <div>代码文件（c、c++、go、Java、Python等）</div>
                                        </div>
                                        <input type="file" id="record-file-input" style="display: none;" accept=".doc,.docx,.xls,.xlsx,.csv,.ppt,.pptx,.pdf,.txt,.yaml,.xml,.json,.config,.ini,.c,.cpp,.go,.java,.py">
                                    </div>
                                    <div class="file-info" id="record-file-info" style="display: none;">
                                        <div class="file-details">
                                            <div class="file-name" id="record-file-name"></div>
                                            <div class="file-size" id="record-file-size"></div>
                                        </div>
                                        <button class="btn-remove-file" id="record-remove-file">×</button>
                                    </div>
                                </div>
                            </div>

                            <div class="form-item">
                                <label class="required">水印内容</label>
                                <input type="text" class="input-text" id="watermark-content" placeholder="请输入">
                            </div>

                            <div class="form-footer">
                                <button class="btn-cancel" id="record-reset">取消</button>
                                <button class="btn-primary" id="record-confirm">确认并下载</button>
                            </div>
                        </div>
                    </div>

                    <div id="analysisContent" class="tab-pane">
                        <div class="analysis-form">
                            <div class="analysis-grid">
                                <div class="grid-item">
                                    <label class="required">上传文件</label>
                                    <div class="upload-area" id="analysis-upload-area">
                                        <div class="upload-box" id="analysis-upload-box">
                                            <div class="upload-icon">▶</div>
                                            <div class="upload-text">点击或拖动文件到这里进行上传</div>
                                            <div class="file-types">
                                                <div>支持办公文档（doc、xls、csv、ppt、pdf、txt等）</div>
                                                <div>文本文档（txt、yaml、xml、json、config、ini等）</div>
                                                <div>代码文件（c、c++、go、Java、Python等）</div>
                                            </div>
                                            <input type="file" id="analysis-file-input" style="display: none;" accept=".doc,.docx,.xls,.xlsx,.csv,.ppt,.pptx,.pdf,.txt,.yaml,.xml,.json,.config,.ini,.c,.cpp,.go,.java,.py">
                                        </div>
                                        <div class="file-info" id="analysis-file-info" style="display: none;">
                                            <div class="file-details">
                                                <div class="file-name" id="analysis-file-name"></div>
                                                <div class="file-size" id="analysis-file-size"></div>
                                            </div>
                                            <button class="btn-remove-file" id="analysis-remove-file">×</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="grid-item">
                                    <label>检测结果</label>
                                    <div class="result-area" id="analysis-result">
                                        <div class="result-placeholder">
                                            <div class="placeholder-text">请先上传文件进行分析</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="form-footer">
                                <button class="btn-primary" id="analysis-generate">生成文件报告</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },
    styles: `
        .trace-container {
            background: #fff;
            border-radius: 4px;
            margin-top: 16px;
        }

        .trace-header {
            padding: 16px;
            border-bottom: 1px solid #e8e8e8;
        }

        .switch-wrapper {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #666;
        }

        .trace-tabs {
            padding: 0 16px;
            border-bottom: 1px solid #e8e8e8;
        }

        .tab {
            display: inline-block;
            padding: 16px 0;
            margin-right: 24px;
            color: #666;
            text-decoration: none;
            position: relative;
        }

        .tab.active {
            color: #1890ff;
        }

        .tab.active:after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: #1890ff;
        }

        .record-form {
            padding: 24px;
        }

        .form-item {
            margin-bottom: 24px;
        }

        .form-item label {
            display: block;
            margin-bottom: 8px;
            font-weight: 500;
        }

        .required:before {
            content: '*';
            color: #ff4d4f;
            margin-right: 4px;
        }

        .upload-area {
            background: #f5f7fa;
            border-radius: 4px;
            border: 2px dashed #d1d5db;
            transition: all 0.3s ease;
            cursor: pointer;
        }

        .upload-area:hover {
            border-color: #3b82f6;
            background-color: #f8fafc;
        }

        .upload-area.dragover {
            border-color: #3b82f6;
            background-color: #eff6ff;
        }

        .upload-box {
            padding: 32px;
            text-align: center;
        }

        .upload-icon {
            color: #1890ff;
            font-size: 24px;
            margin-bottom: 16px;
        }

        .file-info {
            padding: 16px 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: #f8fafc;
            border-radius: 6px;
            margin: 16px;
        }

        .file-details {
            flex: 1;
        }

        .file-name {
            font-size: 14px;
            font-weight: 500;
            color: #374151;
            margin-bottom: 4px;
        }

        .file-size {
            font-size: 12px;
            color: #6b7280;
        }

        .btn-remove-file {
            background: none;
            border: none;
            color: #ef4444;
            font-size: 18px;
            cursor: pointer;
            padding: 4px;
            border-radius: 4px;
            transition: background-color 0.2s;
        }

        .btn-remove-file:hover {
            background-color: #fef2f2;
        }

        .upload-text {
            color: #333;
            margin-bottom: 8px;
        }

        .file-types {
            color: #999;
            font-size: 12px;
            line-height: 1.5;
        }

        .file-info {
            padding: 16px 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: #f8fafc;
            border-radius: 6px;
            margin: 16px;
        }

        .file-details {
            flex: 1;
        }

        .file-name {
            font-size: 14px;
            font-weight: 500;
            color: #374151;
            margin-bottom: 4px;
        }

        .file-size {
            font-size: 12px;
            color: #6b7280;
        }

        .btn-remove-file {
            background: none;
            border: none;
            color: #ef4444;
            font-size: 18px;
            cursor: pointer;
            padding: 4px;
            border-radius: 4px;
            transition: background-color 0.2s;
        }

        .btn-remove-file:hover {
            background-color: #fef2f2;
        }

        .input-text {
            width: 100%;
            height: 32px;
            padding: 4px 11px;
            border: 1px solid #d9d9d9;
            border-radius: 4px;
            font-size: 14px;
        }

        .form-footer {
            margin-top: 32px;
            text-align: right;
        }

        .btn-cancel {
            margin-right: 8px;
            padding: 8px 16px;
            border: 1px solid #d9d9d9;
            background: #fff;
            border-radius: 4px;
            cursor: pointer;
        }

        .btn-primary {
            padding: 8px 16px;
            background: #1890ff;
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }

        .tab-pane {
            display: none;
        }

        .tab-pane.active {
            display: block;
        }

        .analysis-form {
            padding: 24px;
        }

        .analysis-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;
        }

        .grid-item {
            margin-bottom: 24px;
        }

        .grid-item label {
            display: block;
            margin-bottom: 8px;
            font-weight: 500;
        }

        .result-area {
            background: #fff;
            border: 1px solid #e8e8e8;
            border-radius: 4px;
            height: 100%;
            min-height: 200px;
            padding: 16px;
        }

        .result-placeholder {
            text-align: center;
            color: #999;
            padding: 40px 20px;
        }

        .result-content {
            width: 100%;
        }

        .result-item {
            background: #f8fafc;
            border: 1px solid #e5e7eb;
            border-radius: 4px;
            padding: 12px;
            margin-bottom: 8px;
        }

        .result-title {
            font-size: 12px;
            font-weight: 500;
            color: #666;
            margin-bottom: 4px;
        }

        .result-value {
            font-size: 14px;
            color: #333;
            word-break: break-all;
        }
    `,
    init: function() {
        this.ensureStyles();
        this.loadMappings();
        this.bindTabEvents();
        this.bindFormEvents();
        this.bindUploadEvents();
    },

    // 确保样式只添加一次
    ensureStyles: function() {
        if (!document.getElementById('watermark-trace-styles')) {
            const styleElement = document.createElement('style');
            styleElement.id = 'watermark-trace-styles';
            styleElement.textContent = this.styles;
            document.head.appendChild(styleElement);
        }
    },

    // 加载水印映射关系
    loadMappings: function() {
        const savedMappings = localStorage.getItem('watermarkMappings');
        if (savedMappings) {
            try {
                this.watermarkMappings = JSON.parse(savedMappings);
            } catch (e) {
                console.error('加载水印映射关系失败:', e);
                this.watermarkMappings = [];
            }
        }
    },

    // 保存水印映射关系
    saveMappings: function() {
        try {
            localStorage.setItem('watermarkMappings', JSON.stringify(this.watermarkMappings));
        } catch (e) {
            console.error('保存水印映射关系失败:', e);
        }
    },

    bindTabEvents: function() {
        const tabs = document.querySelectorAll('.trace-tabs .tab');
        const recordContent = document.getElementById('recordContent');
        const analysisContent = document.getElementById('analysisContent');

        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                const tabType = tab.getAttribute('data-tab');
                
                // 更新标签页状态
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // 切换内容显示
                if (tabType === 'record') {
                    recordContent.classList.add('active');
                    analysisContent.classList.remove('active');
                } else {
                    recordContent.classList.remove('active');
                    analysisContent.classList.add('active');
                }
            });
        });
    },

    // 绑定上传事件
    bindUploadEvents: function() {
        // 水印标记页面文件上传
        this.setupFileUpload('record');
        // 水印分析页面文件上传
        this.setupFileUpload('analysis');

        // 事件委托，监听所有删除按钮
        document.body.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-remove-file')) {
                if (e.target.id === 'record-remove-file') {
                    this.removeFile('record');
                } else if (e.target.id === 'analysis-remove-file') {
                    this.removeFile('analysis');
                }
            }
        });
    },

    // 设置文件上传
    setupFileUpload: function(type) {
        const uploadArea = document.getElementById(`${type}-upload-area`);
        const uploadBox = document.getElementById(`${type}-upload-box`);
        const fileInput = document.getElementById(`${type}-file-input`);
        const fileInfo = document.getElementById(`${type}-file-info`);
        const fileName = document.getElementById(`${type}-file-name`);
        const fileSize = document.getElementById(`${type}-file-size`);
        const removeBtn = document.getElementById(`${type}-remove-file`);

        if (!uploadArea || !fileInput) return;

        // 移除可能存在的旧事件监听器
        const newUploadBox = uploadBox.cloneNode(true);
        uploadBox.parentNode.replaceChild(newUploadBox, uploadBox);
        
        const newFileInput = document.getElementById(`${type}-file-input`);
        const newRemoveBtn = document.getElementById(`${type}-remove-file`);

        // 点击上传
        newUploadBox.addEventListener('click', () => {
            newFileInput.click();
        });

        // 文件选择
        newFileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                this.handleFileSelect(file, type);
            }
        });

        // 拖拽上传
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });

        uploadArea.addEventListener('dragleave', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                this.handleFileSelect(files[0], type);
            }
        });

        // 移除文件
        if (newRemoveBtn) {
            newRemoveBtn.addEventListener('click', () => {
                this.removeFile(type);
            });
        }
    },

    // 处理文件选择
    handleFileSelect: function(file, type) {
        // 模拟上传过程
        this.showUploadProgress(type);
        
        setTimeout(() => {
            // 保存文件信息
            this.currentFiles[type] = {
                name: file.name,
                size: this.formatFileSize(file.size),
                path: file.name, // 模拟文件路径
                file: file
            };
            
            // 显示文件信息
            this.showFileInfo(type);
            
            // 如果是分析页面，自动分析水印
            if (type === 'analysis') {
                this.analyzeWatermark();
            }
        }, 1000);
    },

    // 显示上传进度
    showUploadProgress: function(type) {
        const uploadBox = document.getElementById(`${type}-upload-box`);
        if (uploadBox) {
            uploadBox.innerHTML = `
                <div class="upload-icon">⏳</div>
                <div class="upload-text">正在上传文件...</div>
            `;
        }
    },

    // 显示文件信息
    showFileInfo: function(type) {
        const uploadBox = document.getElementById(`${type}-upload-box`);
        const fileInfo = document.getElementById(`${type}-file-info`);
        const fileName = document.getElementById(`${type}-file-name`);
        const fileSize = document.getElementById(`${type}-file-size`);
        const removeBtn = document.getElementById(`${type}-remove-file`);

        if (uploadBox && fileInfo && fileName && fileSize) {
            uploadBox.style.display = 'none';
            fileInfo.style.display = 'flex';
            
            fileName.textContent = this.currentFiles[type].name;
            fileSize.textContent = this.currentFiles[type].size;
            
            // 绑定删除按钮事件
            if (removeBtn) {
                // 移除可能存在的旧事件监听器
                const newRemoveBtn = removeBtn.cloneNode(true);
                removeBtn.parentNode.replaceChild(newRemoveBtn, removeBtn);
                
                newRemoveBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.removeFile(type);
                });
            }
        }
    },

    // 移除文件
    removeFile: function(type) {
        const uploadArea = document.getElementById(`${type}-upload-area`);
        if (!uploadArea) return;

        // 还原上传区域内容
        if (type === 'record') {
            uploadArea.innerHTML = `
                <div class="upload-box" id="record-upload-box">
                    <div class="upload-icon">▶</div>
                    <div class="upload-text">点击或拖动文件到这里进行上传</div>
                    <div class="file-types">
                        <div>支持办公文档（doc、xls、csv、ppt、pdf、txt等）</div>
                        <div>文本文档（txt、yaml、xml、json、config、ini等）</div>
                        <div>代码文件（c、c++、go、Java、Python等）</div>
                    </div>
                    <input type="file" id="record-file-input" style="display: none;" accept=".doc,.docx,.xls,.xlsx,.csv,.ppt,.pptx,.pdf,.txt,.yaml,.xml,.json,.config,.ini,.c,.cpp,.go,.java,.py">
                </div>
                <div class="file-info" id="record-file-info" style="display: none;">
                    <div class="file-details">
                        <div class="file-name" id="record-file-name"></div>
                        <div class="file-size" id="record-file-size"></div>
                    </div>
                    <button class="btn-remove-file" id="record-remove-file">×</button>
                </div>
            `;
        } else {
            uploadArea.innerHTML = `
                <div class="upload-box" id="analysis-upload-box">
                    <div class="upload-icon">▶</div>
                    <div class="upload-text">点击或拖动文件到这里进行上传</div>
                    <div class="file-types">
                        <div>支持办公文档（doc、xls、csv、ppt、pdf、txt等）</div>
                        <div>文本文档（txt、yaml、xml、json、config、ini等）</div>
                        <div>代码文件（c、c++、go、Java、Python等）</div>
                    </div>
                    <input type="file" id="analysis-file-input" style="display: none;" accept=".doc,.docx,.xls,.xlsx,.csv,.ppt,.pptx,.pdf,.txt,.yaml,.xml,.json,.config,.ini,.c,.cpp,.go,.java,.py">
                </div>
                <div class="file-info" id="analysis-file-info" style="display: none;">
                    <div class="file-details">
                        <div class="file-name" id="analysis-file-name"></div>
                        <div class="file-size" id="analysis-file-size"></div>
                    </div>
                    <button class="btn-remove-file" id="analysis-remove-file">×</button>
                </div>
            `;
        }
        // 清空当前文件信息
        this.currentFiles[type] = null;
        // 重新绑定上传事件
        this.setupFileUpload(type);
        // 如果是分析页面，清空结果
        if (type === 'analysis') {
            this.clearAnalysisResult();
        }
    },

    bindFormEvents: function() {
        // 绑定取消按钮事件
        const recordReset = document.getElementById('record-reset');
        if (recordReset) {
            recordReset.addEventListener('click', () => {
                this.resetRecordForm();
            });
        }

        // 绑定确认并下载按钮事件
        const recordConfirm = document.getElementById('record-confirm');
        if (recordConfirm) {
            recordConfirm.addEventListener('click', () => {
                this.handleWatermarkRecord();
            });
        }

        // 绑定生成文件报告按钮事件
        const analysisGenerate = document.getElementById('analysis-generate');
        if (analysisGenerate) {
            analysisGenerate.addEventListener('click', () => {
                this.generateReport();
            });
        }
    },

    resetRecordForm: function() {
        // 清空文件
        this.removeFile('record');
        
        // 清空水印内容
        const watermarkContent = document.getElementById('watermark-content');
        if (watermarkContent) {
            watermarkContent.value = '';
        }
        
        console.log('水印标记表单已重置');
    },

    handleWatermarkRecord: function() {
        const watermarkContent = document.getElementById('watermark-content');
        const content = watermarkContent ? watermarkContent.value.trim() : '';
        
        if (!this.currentFiles.record) {
            alert('请先上传文件');
            return;
        }
        
        if (!content) {
            alert('请输入水印内容');
            return;
        }
        
        // 保存水印映射关系
        const mapping = {
            fileName: this.currentFiles.record.name,
            filePath: this.currentFiles.record.path,
            watermarkContent: content,
            timestamp: new Date().toISOString()
        };
        
        this.watermarkMappings.push(mapping);
        this.saveMappings();
        
        // 下载文件
        this.downloadFile(this.currentFiles.record.file, this.currentFiles.record.name);
        
        console.log('水印标记完成:', mapping);
    },

    // 分析水印
    analyzeWatermark: function() {
        if (!this.currentFiles.analysis) {
            return;
        }
        
        const fileName = this.currentFiles.analysis.name;
        const mapping = this.watermarkMappings.find(m => m.fileName === fileName);
        
        if (mapping) {
            this.showAnalysisResult(mapping);
        } else {
            this.showAnalysisResult(null);
        }
    },

    // 显示分析结果
    showAnalysisResult: function(mapping) {
        const resultArea = document.getElementById('analysis-result');
        
        if (!resultArea) return;
        
        if (mapping) {
            resultArea.innerHTML = `
                <div class="result-content">
                    <div class="result-item">
                        <div class="result-title">文件名</div>
                        <div class="result-value">${mapping.fileName}</div>
                    </div>
                    <div class="result-item">
                        <div class="result-title">水印内容</div>
                        <div class="result-value">${mapping.watermarkContent}</div>
                    </div>
                    <div class="result-item">
                        <div class="result-title">标记时间</div>
                        <div class="result-value">${new Date(mapping.timestamp).toLocaleString()}</div>
                    </div>
                    <div class="result-item">
                        <div class="result-title">文件路径</div>
                        <div class="result-value">${mapping.filePath}</div>
                    </div>
                </div>
            `;
        } else {
            resultArea.innerHTML = `
                <div class="result-content">
                    <div class="result-item">
                        <div class="result-title">检测结果</div>
                        <div class="result-value">未找到水印信息</div>
                    </div>
                </div>
            `;
        }
    },

    // 清空分析结果
    clearAnalysisResult: function() {
        const resultArea = document.getElementById('analysis-result');
        if (resultArea) {
            resultArea.innerHTML = `
                <div class="result-placeholder">
                    <div class="placeholder-text">请先上传文件进行分析</div>
                </div>
            `;
        }
    },

    // 生成报告
    generateReport: function() {
        if (!this.currentFiles.analysis) {
            alert('请先上传文件');
            return;
        }
        
        const fileName = this.currentFiles.analysis.name;
        const mapping = this.watermarkMappings.find(m => m.fileName === fileName);
        
        if (mapping) {
            // 生成报告内容
            const reportContent = `
水印溯源分析报告

文件名: ${mapping.fileName}
水印内容: ${mapping.watermarkContent}
标记时间: ${new Date(mapping.timestamp).toLocaleString()}
文件路径: ${mapping.filePath}

分析结果: 检测到水印信息
状态: 正常
            `;
            
            // 下载报告
            this.downloadTextFile(reportContent, `水印溯源报告_${fileName}.txt`);
            
            console.log('报告已生成');
        } else {
            alert('未找到该文件的水印信息');
        }
    },

    // 下载文件
    downloadFile: function(file, fileName) {
        const url = URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    },

    // 下载文本文件
    downloadTextFile: function(content, fileName) {
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    },

    // 格式化文件大小
    formatFileSize: function(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}; 
// 登录验证脚本 - 所有页面共用

// 检查登录状态
function checkLoginStatus() {
  // 开发模式：如果URL包含debug参数，自动设置登录状态
  if (window.location.search.includes('debug=true') || window.location.hash.includes('debug')) {
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('loginTime', new Date().toISOString());
    console.log('🔧 调试模式：已自动设置登录状态');
    return true;
  }

  const isLoggedIn = sessionStorage.getItem('isLoggedIn');
  if (isLoggedIn !== 'true') {
    // 如果未登录，跳转到登录页面
    console.warn('用户未登录，正在跳转到登录页面...');
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

// 添加退出登录功能
function logout() {
  sessionStorage.removeItem('isLoggedIn');
  sessionStorage.removeItem('loginTime');
  window.location.href = 'login.html';
}

// 页面加载时检查登录状态
document.addEventListener('DOMContentLoaded', function () {
  if (!checkLoginStatus()) {
    return;
  }

  // 添加用户信息显示（可选）
  const loginTime = sessionStorage.getItem('loginTime');
  if (loginTime) {
    const loginDate = new Date(loginTime);
    console.log('登录时间:', loginDate.toLocaleString());
  }
});

// 防止直接访问 - 改为温和处理，不阻塞脚本执行
if (!checkLoginStatus()) {
  // 如果验证失败，只是输出警告，不阻塞后续脚本
  console.warn('未授权访问，已重定向到登录页面');
}

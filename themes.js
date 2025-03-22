const themes = {
    light: {
        // 背景色
        background: '#f5f5f5',
        cardBackground: '#ffffff',
        
        // 文字颜色
        textColor: '#333',
        textColorSecondary: '#666',
        titleColor: '#2c3e50',
        h2Color: '#34495e',
        h3Color: '#445566',
        h4h5h6Color: '#556677',
        
        // 链接颜色
        linkColor: '#0066cc',
        linkHoverColor: '#00a7b3',
        
        // 边框和阴影
        borderColor: '#ddd',
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowHoverColor: 'rgba(0, 0, 0, 0.15)',
        
        // 按钮颜色
        primaryButtonFill: '#fff',
        primaryButtonBg: '#007BFF',
        primaryButtonHoverBg: '#0056b3',

        // 代码块
        codeBlockBg: '#d5dfe8',
        codeBorderColor: '#e9ecef',
        
        // 滚动条
        scrollbarThumb: '#90a8c2',
        scrollbarThumbHover: '#1e66b4',
        scrollbarCodeThumb: '#547eaa',
        scrollbarCodeThumbHover: '#1e66b4',

        resizeHandle: '#1e66b4',
        
        // 引用块
        quoteBg: '#f8f9fa',
        quoteBorderColor1: '#096542',
        quoteBorderColor2: '#6c757d',
        
        // 表格
        tableBg: '#ffffff',
        tableHeaderBg: '#f5f5f5',
        tableStripedBg: '#f9f9f9',
        tableHoverBg: '#f5f5f5',
        



        // 列表标记
        listMarkerColor: '#4d0c63',
        listMarkerOrderedColor: '#551059',

        // 文章标题和日期
        articleheader: '#4d0c63',
        articleDate: '#555',
        othertext: '#555',


        // 类别标签
        categoryBg: '#e9ecef',
        categoryColor: '#495057',
        categoryActiveBg: '#007BFF',
        categoryActiveColor: '#fff',

        // 搜索框
        searchInputBg: '#ffffff',
        searchInputBorder: '#ddd',
        searchInputText: '#333',
        searchButtonBg: '#007BFF',
        searchButtonText: '#ffffff',
        searchButtonHoverBg: '#0056b3',

        // 分类模糊效果
        categoryBlurFrom: 'transparent',
        categoryBlurTo: '#f5f5f5',
    },
    
    dark: {
        // 背景色
        background: '#333',
        cardBackground: '#252525',
        
        // 文字颜色
        textColor: '#fff',
        textColorSecondary: '#ccc',
        titleColor: '#ffcdcd',
        h2Color: '#feb1b1',
        h3Color: '#ff9494',
        h4h5h6Color: '#ff6a6a',
        
        // 链接颜色
        linkColor: '#66c4ff',
        linkHoverColor: '#e87cc6',
        
        // 边框和阴影
        borderColor: '#555',
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowHoverColor: 'rgba(0, 0, 0, 0.25)',
        
        // 按钮颜色
        primaryButtonFill: '#fff',
        primaryButtonBg: '#555',
        primaryButtonHoverBg: '#666',

        // 代码块
        codeBlockBg: '#222',
        codeBorderColor: '#444',
        
        // 滚动条
        scrollbarThumb: '#666',
        scrollbarThumbHover: '#888',
        scrollbarCodeThumb: '#666',
        scrollbarCodeThumbHover: '#888',

        resizeHandle: '#d54646',
        
        // 引用块
        quoteBg: '#2d2d2d',
        quoteBorderColor1: '#edf673',
        quoteBorderColor2: '#ffb453',
        
        // 表格
        tableBg: '#2d2d2d',
        tableHeaderBg: '#383838',
        tableStripedBg: '#333',
        tableHoverBg: '#3a3a3a',
        


        // 类别标签
        categoryBg: '#555',
        categoryColor: '#ffcdcd',
        categoryActiveBg: '#ffcdcd',
        categoryActiveColor: '#333',


        // 列表标记
        listMarkerColor: '#ebff99',
        listMarkerOrderedColor: '#ffeb99',

        // 文章标题和日期
        articleheader: '#ddd',
        articleDate: '#888',
        othertext: '#888',

        // 搜索框
        searchInputBg: '#444',
        searchInputBorder: '#555',
        searchInputText: '#fff',
        searchButtonBg: '#555',
        searchButtonText: '#ffffff',
        searchButtonHoverBg: '#666',

        // 分类模糊效果
        categoryBlurFrom: 'transparent',
        categoryBlurTo: '#333',
    }
};

// 获取当前主题的颜色
function getThemeColors(isDark = false) {
    return isDark ? themes.dark : themes.light;
}

// 应用主题颜色到CSS变量
function applyThemeColors(isDark = false) {
    const colors = getThemeColors(isDark);
    const root = document.documentElement;
    
    // 设置所有颜色变量
    Object.entries(colors).forEach(([key, value]) => {
        root.style.setProperty(`--${key}`, value);
    });
}
const fs = require('fs');
const path = require('path');

function processMarkdown(mdContent, basePath) {
    // 匹配Markdown中的图片语法，包括可选的尺寸设置
    return mdContent.replace(/!\[([^\]]*)\]\(([^)]+?)(?:\s*=\s*(\d+)?x(\d+)?)?\)/g, (match, alt, imagePath, width, height) => {
        // 清理图片路径中可能包含的尺寸信息
        const cleanImagePath = imagePath.split(' ')[0];
        // 将相对路径转换为绝对路径
        const absolutePath = path.resolve(basePath, cleanImagePath);
        
        try {
            const imageBuffer = fs.readFileSync(absolutePath);
            const base64Image = imageBuffer.toString('base64');
            const ext = path.extname(cleanImagePath).toLowerCase();
            const mimeType = {
                '.png': 'image/png',
                '.jpg': 'image/jpeg',
                '.jpeg': 'image/jpeg',
                '.gif': 'image/gif'
            }[ext] || 'image/png';
            
            // 构建HTML img标签
            let imgTag = `<img src="data:${mimeType};base64,${base64Image}" alt="${alt}"`;
            if (width || height) {
                if (width) imgTag += ` width="${width}"`;
                if (height) imgTag += ` height="${height}"`;
            }
            imgTag += '>';
            
            return imgTag;
        } catch (error) {
            console.error(`处理图片失败: ${absolutePath}`, error);
            return match;
        }
    });
}

// 遍历目录并处理markdown文件
function updateMarkdownFiles() {
    const mdDir = path.join(__dirname, 'md');
    const markdownListData = [];

    fs.readdirSync(mdDir).forEach(file => {
        if (file.endsWith('.md')) {
            const filePath = path.join(mdDir, file);
            let content = fs.readFileSync(filePath, 'utf8');
            
            // 获取文件的最后修改时间
            const stats = fs.statSync(filePath);
            const lastModified = stats.mtime.toLocaleString('zh-CN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }).replace(/\//g, '/');
            
            const title = content.split('\n')[0].replace(/^#\s*/, '') || file;
            
            markdownListData.push({
                filename: file,
                title: title,
                path: `md/${file}`,
                lastModified: lastModified
            });

            content = processMarkdown(content, path.dirname(filePath));
            
            const baseName = path.basename(file, '.md');
            const outputFile = path.join(__dirname, `md-contents/${baseName}-content.js`);
            
            const jsContent = `var markdownFiles = {
  "${file}": ${JSON.stringify(content, null, 2)}
};`;
            
            fs.writeFileSync(outputFile, jsContent);
            console.log(`已生成 ${outputFile}`);
        }
    });

    // 生成markdown-list.js文件
    const currentDate = new Date().toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).replace(/\//g, '/');

    const markdownListContent = `// 自动生成的Markdown文件列表 - ${currentDate}
const markdownList = ${JSON.stringify(markdownListData, null, 2)};
`;

    fs.writeFileSync(path.join(__dirname, 'markdown-list.js'), markdownListContent);
    console.log('已生成 markdown-list.js');
}

updateMarkdownFiles();
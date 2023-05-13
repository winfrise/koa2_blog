const path = require('path')
const fs = require('fs')

function getFolderFiles(root) {
    let result = []
    if (fs.existsSync(root)) {
        let files = fs.readdirSync(root);
        files.forEach(item => {
            let fullPath = path.join(root, item);

            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                result.push(...getFolderFiles(fullPath));
            } else if (stat.isFile()) {
                const matches = item.match(/([\w\.-]+)\.(\w+)$/)
                if (matches) {
                    result.push({
                        // full_path: fullPath,
                        file_path: fullPath.split('upload-temp')[1],
                        filename: item,
                        suffix: matches[2],
                        name: matches[1],
                        file_size: 0
                    })
                }
            }
        })
    }
    return result
}

module.exports = getFolderFiles
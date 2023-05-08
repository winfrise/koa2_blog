const path = require('path')
const fs = require('fs')

function getFolderFile (root) {
    let jsonFiles = [];
    function findJsonFile(www) {
        if (fs.existsSync(root)) {
            let files = fs.readdirSync(www);
            files.forEach(function (item, index) {
                let fPath =  path.join(www,item);
                let stat = fs.statSync(fPath);
                if(stat.isDirectory() === true) {
                    findJsonFile(fPath);
                }
                if (stat.isFile() === true) { 
                    // jsonFiles.push(fPath);
                    // jsonFiles.push(fPath.replace(www + '/', ''));

                    const matches  = item.match(/([\w\.-]+)\.(\w+)$/)
                    if (matches) {
                        jsonFiles.push({
                            file_path: fPath,
                            filename: item,
                            suffix: matches[2],
                            name: matches[1],
                            file_size: 0
                        })
                    }

                }
            });
        }
    }
    findJsonFile(root)
    return jsonFiles;
}

module.exports = getFolderFile
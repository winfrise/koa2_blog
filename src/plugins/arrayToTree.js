function arrayToTree(arr, parent_id =  0) {
    var tree = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].parent_id === parent_id) {
            const children = arrayToTree(arr, arr[i].id)
            var node = {
                ...arr[i]
            };
            if (children.length > 0) {
                node.children = children
            }
            tree.push(node);
        }
    }
    return tree;
}

module.exports = arrayToTree
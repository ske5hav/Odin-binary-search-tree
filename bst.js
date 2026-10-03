class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        const sortedUnique = [...new Set(array)].sort((a, b) => a - b);
        this.root = this.buildTree(sortedUnique);
    }

    // Build a balanced BST
    buildTree(array) {
        if (array.length === 0) {
            return null;
        }

        const middle = Math.floor(array.length / 2);

        const root = new Node(array[middle]);

        root.left = this.buildTree(array.slice(0, middle));
        root.right = this.buildTree(array.slice(middle + 1));

        return root;
    }

    // Check if value exists
    includes(value) {
        let current = this.root;

        while (current !== null) {
            if (value === current.data) {
                return true;
            }

            if (value < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
        }

        return false;
    }

    // Insert a new value
    insert(value) {
        if (this.root === null) {
            this.root = new Node(value);
            return;
        }

        let current = this.root;

        while (true) {
            if (value === current.data) {
                return;
            }

            if (value < current.data) {
                if (current.left === null) {
                    current.left = new Node(value);
                    return;
                }

                current = current.left;
            } else {
                if (current.right === null) {
                    current.right = new Node(value);
                    return;
                }

                current = current.right;
            }
        }
    }

    // Delete a value
    deleteItem(value) {
        this.root = this.deleteNode(this.root, value);
    }

    deleteNode(node, value) {
        if (node === null) {
            return null;
        }

        if (value < node.data) {
            node.left = this.deleteNode(node.left, value);
            return node;
        }

        if (value > node.data) {
            node.right = this.deleteNode(node.right, value);
            return node;
        }

        // Case 1: No child
        if (node.left === null && node.right === null) {
            return null;
        }

        // Case 2: Only right child
        if (node.left === null) {
            return node.right;
        }

        // Case 3: Only left child
        if (node.right === null) {
            return node.left;
        }

        // Case 4: Two children
        let successor = node.right;

        while (successor.left !== null) {
            successor = successor.left;
        }

        node.data = successor.data;

        node.right = this.deleteNode(
            node.right,
            successor.data
        );

        return node;
    }

    // Breadth-first traversal
    levelOrderForEach(callback) {
        if (typeof callback !== "function") {
            throw new Error("Callback is required");
        }

        if (this.root === null) {
            return;
        }

        const queue = [this.root];

        while (queue.length > 0) {
            const current = queue.shift();

            callback(current.data);

            if (current.left !== null) {
                queue.push(current.left);
            }

            if (current.right !== null) {
                queue.push(current.right);
            }
        }
    }

    // In-order: Left → Root → Right
    inOrderForEach(callback) {
        if (typeof callback !== "function") {
            throw new Error("Callback is required");
        }

        const traverse = (node) => {
            if (node === null) {
                return;
            }

            traverse(node.left);
            callback(node.data);
            traverse(node.right);
        };

        traverse(this.root);
    }

    // Pre-order: Root → Left → Right
    preOrderForEach(callback) {
        if (typeof callback !== "function") {
            throw new Error("Callback is required");
        }

        const traverse = (node) => {
            if (node === null) {
                return;
            }

            callback(node.data);
            traverse(node.left);
            traverse(node.right);
        };

        traverse(this.root);
    }

    // Post-order: Left → Right → Root
    postOrderForEach(callback) {
        if (typeof callback !== "function") {
            throw new Error("Callback is required");
        }

        const traverse = (node) => {
            if (node === null) {
                return;
            }

            traverse(node.left);
            traverse(node.right);
            callback(node.data);
        };

        traverse(this.root);
    }

    // Height of a node
    height(value) {
        const node = this.findNode(value);

        if (node === null) {
            return undefined;
        }

        const getHeight = (node) => {
            if (node === null) {
                return -1;
            }

            const leftHeight = getHeight(node.left);
            const rightHeight = getHeight(node.right);

            return Math.max(leftHeight, rightHeight) + 1;
        };

        return getHeight(node);
    }

    // Depth of a node
    depth(value) {
        let current = this.root;
        let depth = 0;

        while (current !== null) {
            if (value === current.data) {
                return depth;
            }

            if (value < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }

            depth++;
        }

        return undefined;
    }

    // Find a node
    findNode(value) {
        let current = this.root;

        while (current !== null) {
            if (value === current.data) {
                return current;
            }

            if (value < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
        }

        return null;
    }

    // Check if tree is balanced
    isBalanced() {
        const checkHeight = (node) => {
            if (node === null) {
                return 0;
            }

            const leftHeight = checkHeight(node.left);

            if (leftHeight === -1) {
                return -1;
            }

            const rightHeight = checkHeight(node.right);

            if (rightHeight === -1) {
                return -1;
            }

            if (Math.abs(leftHeight - rightHeight) > 1) {
                return -1;
            }

            return Math.max(leftHeight, rightHeight) + 1;
        };

        return checkHeight(this.root) !== -1;
    }

    // Rebalance the tree
    rebalance() {
        const values = [];

        this.inOrderForEach((value) => {
            values.push(value);
        });

        this.root = this.buildTree(values);
    }
}

export { Node, Tree };
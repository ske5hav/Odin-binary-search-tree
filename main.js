import { Tree } from "./bst.js";

function randomArray(size = 10) {
    const array = [];

    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * 100));
    }

    return array;
}

const tree = new Tree(randomArray(10));

console.log("Initial tree:");
console.log(tree.root);

console.log("Balanced:", tree.isBalanced());

console.log("Level Order:");
tree.levelOrderForEach((value) => console.log(value));

console.log("Pre Order:");
tree.preOrderForEach((value) => console.log(value));

console.log("Post Order:");
tree.postOrderForEach((value) => console.log(value));

console.log("In Order:");
tree.inOrderForEach((value) => console.log(value));

// Make tree unbalanced
tree.insert(101);
tree.insert(110);
tree.insert(120);
tree.insert(130);
tree.insert(140);

console.log("After adding large values:");
console.log("Balanced:", tree.isBalanced());

// Rebalance
tree.rebalance();

console.log("After rebalancing:");
console.log("Balanced:", tree.isBalanced());

console.log("Level Order:");
tree.levelOrderForEach((value) => console.log(value));

console.log("Pre Order:");
tree.preOrderForEach((value) => console.log(value));

console.log("Post Order:");
tree.postOrderForEach((value) => console.log(value));

console.log("In Order:");
tree.inOrderForEach((value) => console.log(value));
(function () {
  const createNode = (data) => {
    return { data, left: null, right: null };
  };

  const createTree = (arr) => {
    const validArray = removeDupes(mergeSort(arr));

    let root = buildTree(validArray, 0, validArray.length - 1);

    function mergeSort(array) {
      if (array.length < 2) {
        return array;
      }
      const sortedLeftHalf = mergeSort(array.slice(0, array.length / 2));
      const sortedRightHalf = mergeSort(
        array.slice(array.length / 2, array.length)
      );

      let i = 0;
      let j = 0;
      let k = 0;
      while (i < sortedLeftHalf.length && j < sortedRightHalf.length) {
        if (sortedLeftHalf[i] < sortedRightHalf[j]) {
          array[k] = sortedLeftHalf[i];
          i++;
        } else {
          array[k] = sortedRightHalf[j];
          j++;
        }
        k++;
      }
      while (i < sortedLeftHalf.length) {
        array[k] = sortedLeftHalf[i];
        i++;
        k++;
      }
      while (j < sortedRightHalf.length) {
        array[k] = sortedRightHalf[j];
        j++;
        k++;
      }
      return array;
    }

    function removeDupes(array) {
      result = [];
      for (let i = 0; i < array.length; i++) {
        if (i === array.length - 1 || array[i] !== array[i + 1]) {
          result.push(array[i]);
        }
      }
      return result;
    }

    function buildTree(array, start, end) {
      if (start > end) {
        return null;
      }
      const mid = Math.floor((start + end) / 2);
      const node = createNode(array[mid]);
      node.left = buildTree(array, start, mid - 1);
      node.right = buildTree(array, mid + 1, end);
      return node;
    }

    function insert(value) {
      if (this.root === null) {
        this.root = createNode(value);
        return;
      }
      let node = this.root;
      while (true) {
        if (node.data === value) {
          return;
        } else if (node.data > value) {
          if (node.left !== null) {
            node = node.left;
          } else {
            node.left = createNode(value);
            return;
          }
        } else if (node.data < value) {
          if (node.right !== null) {
            node = node.right;
          } else {
            node.right = createNode(value);
            return;
          }
        }
      }
    }

    function remove(value) {
      if (this.root === null) {
        return;
      }
      let node = this.root;
      let isLeaf = !node.left && !node.right;
      if (isLeaf) {
        if (node.data === value) {
          this.root = null;
        }
        return;
      }
      let parent = null;
      let isLeftChild = false;
      while (node) {
        if (node.data === value) {
          if (node.left && node.right) {
            const successor = getSuccessor(node);
            successor.left = node.left;
            if (node.right !== successor) {
              successor.right = node.right;
            }
            if (parent) {
              if (isLeftChild) {
                parent.left = successor;
              } else {
                parent.right = successor;
              }
            } else {
              this.root = successor;
            }
          } else if (node.left) {
            if (isLeftChild) {
              parent.left = node.left;
            } else {
              parent.right = node.left;
            }
          } else if (node.right) {
            if (isLeftChild) {
              parent.left = node.right;
            } else {
              parent.right = node.right;
            }
          } else {
            if (isLeftChild) {
              parent.left = null;
            } else {
              parent.right = null;
            }
          }
          return;
        } else if (node.data > value) {
          parent = node;
          node = node.left;
          isLeftChild = true;
        } else {
          parent = node;
          node = node.right;
          isLeftChild = false;
        }
      }
    }

    function getSuccessor(node) {
      let currentNode = node.right;
      let parent = null;
      while (currentNode.left !== null) {
        parent = currentNode;
        currentNode = currentNode.left;
      }
      if (parent) {
        parent.left = currentNode.right;
      }
      return currentNode;
    }

    function find(value) {
      let node = this.root;
      while (node) {
        if (node.data === value) {
          return node;
        } else if (node.data > value) {
          node = node.left;
        } else {
          node = node.right;
        }
      }
      return null;
    }

    function levelOrder(func) {
      const array = [];
      const queue = [];
      if (this.root) {
        queue.push(this.root);
      }
      let idx = 0;
      while (idx < queue.length) {
        const node = queue[idx];
        if (func) {
          func(node);
        } else {
          array.push(node.data);
        }
        if (node.left) {
          queue.push(node.left);
        }
        if (node.right) {
          queue.push(node.right);
        }
        idx++;
      }
      if (!func) {
        return array;
      }
    }

    // function levelOrderRec(func) {
    //   const array = [];
    //   const nodeList = levelOrderRecHelper(this.root, 0);
    //   for (const node of nodeList) {
    //     if (func) {
    //       func(node.node);
    //     } else {
    //       array.push(node.node.data);
    //     }
    //   }
    //   if (!func) {
    //     return array;
    //   }
    // }

    function levelOrderRec(func) {
      const array = [];
      const height = getHeight(this.root);
      for (let i = 1; i < height + 1; i++) {
        levelOrderRecHelper(this.root, i, func, array);
      }
      if (!func) {
        return array;
      }
    }

    // function levelOrderRecHelper(node, level) {
    //   if (!node) {
    //     return [];
    //   }
    //   const nodeList = [{ node, level }];
    //   const leftList = levelOrderRecHelper(node.left, level + 1);
    //   const rightList = levelOrderRecHelper(node.right, level + 1);
    //   let i = 0;
    //   let j = 0;
    //   while (i < leftList.length && j < rightList.length) {
    //     if (leftList[i].level <= rightList[j].level) {
    //       nodeList.push(leftList[i]);
    //       i++;
    //     } else {
    //       nodeList.push(rightList[j]);
    //       j++;
    //     }
    //   }
    //   while (i < leftList.length) {
    //     nodeList.push(leftList[i]);
    //     i++;
    //   }
    //   while (j < rightList.length) {
    //     nodeList.push(rightList[j]);
    //     j++;
    //   }
    //   return nodeList;
    // }

    function getHeight(node) {
      if (!node) {
        return 0;
      }
      const leftHeight = getHeight(node.left);
      const rightHeight = getHeight(node.right);
      if (leftHeight > rightHeight) {
        return leftHeight + 1;
      }
      return rightHeight + 1;
    }

    function levelOrderRecHelper(node, level, func, array) {
      if (!node) {
        return;
      }
      if (level === 1) {
        if (func) {
          func(node);
        } else {
          array.push(node.data);
        }
      } else {
        levelOrderRecHelper(node.left, level - 1, func, array);
        levelOrderRecHelper(node.right, level - 1, func, array);
      }
    }

    function inorder(func) {
      const array = [];
      traverse(this.root, func, 0, array);
      if (!func) {
        return array;
      }
    }

    function preorder(func) {
      const array = [];
      traverse(this.root, func, 1, array);
      if (!func) {
        return array;
      }
    }

    function postorder(func) {
      const array = [];
      traverse(this.root, func, 2, array);
      if (!func) {
        return array;
      }
    }

    function traverse(node, func, order, array) {
      if (!node) {
        return;
      }
      if (order === 0) {
        traverse(node.left, func, 0, array);
        if (func) {
          func(node);
        } else {
          array.push(node.data);
        }
        traverse(node.right, func, 0, array);
      } else if (order === 1) {
        if (func) {
          func(node);
        } else {
          array.push(node.data);
        }
        traverse(node.left, func, 1, array);
        traverse(node.right, func, 1, array);
      } else {
        traverse(node.left, func, 2, array);
        traverse(node.right, func, 2, array);
        if (func) {
          func(node);
        } else {
          array.push(node.data);
        }
      }
    }

    function height(node) {
      if (!node) {
        return -1;
      }
      const leftHeight = height(node.left);
      const rightHeight = height(node.right);
      if (leftHeight > rightHeight) {
        return leftHeight + 1;
      }
      return rightHeight + 1;
    }

    function depth(node) {
      return depthHelper(this.root, node, 0);
    }

    function depthHelper(currentNode, nodeToFind, depth) {
      if (!currentNode || !nodeToFind) {
        return -1;
      }
      if (currentNode === nodeToFind) {
        return depth;
      }
      if (currentNode.data > nodeToFind.data) {
        return depthHelper(currentNode.left, nodeToFind, depth + 1);
      }
      return depthHelper(currentNode.right, nodeToFind, depth + 1);
    }

    function isBalanced() {
      return isBalancedHelper(this.root);
    }

    function isBalancedHelper(node) {
      if (!node) {
        return true;
      }
      const leftHeight = height(node.left);
      const rightHeight = height(node.right);
      return (
        Math.abs(leftHeight - rightHeight) <= 1 &&
        isBalancedHelper(node.left) &&
        isBalancedHelper(node.right)
      );
    }

    function rebalance() {
      const items = this.inorder();
      this.root = buildTree(items, 0, items.length - 1);
    }

    return {
      root,
      insert,
      remove,
      find,
      levelOrder,
      levelOrderRec,
      inorder,
      preorder,
      postorder,
      height,
      depth,
      isBalanced,
      rebalance
    };
  };

  const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  const driver = () => {
    const array = Array.from({length: 100}, () => Math.floor(Math.random() * 100));
    const tree = createTree(array);
    prettyPrint(tree.root);
    console.log(tree.isBalanced());
    console.log(tree.levelOrder());
    console.log(tree.preorder());
    console.log(tree.postorder());
    console.log(tree.inorder());
    for (let i = 0; i < 100; i++) {
      tree.insert(Math.floor(Math.random() * 100) + 100);
    }
    prettyPrint(tree.root);
    console.log(tree.isBalanced());
    tree.rebalance();
    prettyPrint(tree.root);
    console.log(tree.isBalanced());
    console.log(tree.levelOrder());
    console.log(tree.preorder());
    console.log(tree.postorder());
    console.log(tree.inorder());
  };

  // const nums = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
  // const tree = createTree(nums);
  // prettyPrint(tree.root);

  // tree.insert(43);
  // prettyPrint(tree.root);

  // const empty = createTree([]);
  // empty.remove(24);
  // prettyPrint(empty.root);
  // empty.insert(43);
  // prettyPrint(empty.root);

  // tree.insert(8.5);
  // prettyPrint(tree.root);
  // tree.remove(8);
  // prettyPrint(tree.root);

  // console.log(tree.find(8.5));

  // function dummyFunc(node) {
  //   console.log(node.data);
  // }

  // console.log(tree.levelOrderRec(dummyFunc));
  // console.log(empty.levelOrderRec(dummyFunc));

  // console.log(tree.levelOrderRec2(dummyFunc));
  // console.log(empty.levelOrderRec2(dummyFunc));

  // console.log(tree.inorder(dummyFunc));
  // console.log(tree.preorder(dummyFunc));
  // console.log(tree.postorder(dummyFunc));

  // console.log(tree.height(tree.root));

  // console.log(tree.depth(tree.root.right.left));

  // console.log(tree.isBalanced());
  // console.log(empty.isBalanced());
  // tree.insert(500);
  // prettyPrint(tree.root);
  // console.log(tree.isBalanced());
  // tree.insert(501);
  // prettyPrint(tree.root);
  // console.log(tree.isBalanced());
  // tree.rebalance();
  // prettyPrint(tree.root);
  // console.log(tree.isBalanced());

  driver();
})();

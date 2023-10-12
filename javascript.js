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

    return { root, insert, remove };
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

  const nums = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
  const tree = createTree(nums);
  //   prettyPrint(tree.root);

  tree.insert(43);
  //   prettyPrint(tree.root);

  const empty = createTree([]);
  //   prettyPrint(empty.root);
  empty.insert(43);
  //   prettyPrint(empty.root);

  tree.insert(8.5);
  prettyPrint(tree.root);
  tree.remove(8);
  prettyPrint(tree.root);
})();

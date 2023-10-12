(function () {
  const createNode = (data) => {
    return { data, left: null, right: null };
  };

  const createTree = (arr) => {
    const validArray = removeDupes(mergeSort(arr));

    const root = buildTree(validArray, 0, validArray.length - 1);

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

    return { root };
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
  prettyPrint(tree.root);
})();

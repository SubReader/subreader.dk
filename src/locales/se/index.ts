function importAll(r) {
  const arr = r.keys().map(r);
  r.keys().map((e, i) => {
    arr[e.match(/[ \w-]+?(?=\.)/)[0]] = arr[i];
    delete arr[i];
  });

  return arr;
}

const jsonFiles = importAll(require.context("./", false, /\.(json)$/));
export default jsonFiles;

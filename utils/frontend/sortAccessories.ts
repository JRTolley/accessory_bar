export function sortAccessories(sortValue, sets, setSets) {
  if (sortValue === "") {
    setSets(
      sets.sort((a, b) => {
        if (sets.indexOf(a) > sets.indexOf(b)) return 1;
        if (sets.indexOf(a) < sets.indexOf(b)) return -1;
        return 0;
      })
    );
  } else if (sortValue === "TITLE_ASC") {
    setSets(
      sets.sort((a, b) => {
        if (a.baseProduct.title > b.baseProduct.title) return 1;
        if (a.baseProduct.title < b.baseProduct.title) return -1;
        return 0;
      })
    );
  } else if (sortValue === "TITLE_DESC") {
    setSets(
      sets.sort((a, b) => {
        if (a.baseProduct.title > b.baseProduct.title) return -1;
        if (a.baseProduct.title < b.baseProduct.title) return 1;
        return 0;
      })
    );
  }
}

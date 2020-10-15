function accessoriesFromResources(resources) {
  const result = resources.selection.map((acc) => {
    return {
      pid: acc.id,
      title: acc.title,
      handle: acc.handle,
      price: acc.variants[0].price,
      img: acc.images[0].originalSrc,
    };
  });
  return result;
}

export default accessoriesFromResources;

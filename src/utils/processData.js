export function processData(data) {
  return data.map((item, index) => {
    return {
      id: index.toString(),
      vector: Object.values(item),
    };
  });
}

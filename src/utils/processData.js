//process data to be used in the chart
export function processData(data) {
  return data.map((item, index) => {
    return {
      id: index.toString(),
      vector: [item.Comment, item.Reply3],
    };
  });
}

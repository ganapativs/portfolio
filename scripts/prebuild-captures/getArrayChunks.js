const getArrayChunks = (array = [], size = 10) => {
  const chunks = [];
  const copy = [...array];
  const numOfChild = Math.ceil(copy.length / size);
  for (let i = 0; i < numOfChild; i += 1) {
    chunks.push(copy.splice(0, size));
  }
  return chunks;
};

export default getArrayChunks;

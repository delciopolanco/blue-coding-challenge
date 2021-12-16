// eslint-disable-next-line arrow-body-style
const intoChunck = (arrayToChunk: Array<any>, chunkSize: number) => {
  return [].concat.apply([],
    arrayToChunk.map((elem, i) => i % chunkSize ? [] : [arrayToChunk.slice(i, i + chunkSize)]));
};

export default intoChunck;


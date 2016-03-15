import {flatten} from 'lodash';

export default (index, type, docs) => {
  return flatten(docs.map(doc => {
    return [JSON.stringify({
      index: {
        _index: index,
        _type: type
      }
    }), JSON.stringify(doc)];
  })).join('\n');
};

const RESOLVED_FLAIR_ID = "296009ae-5f00-11ea-9c88-0e7bc5d01a49";

const canSummon = (msg) => {
    return msg && msg.toLowerCase().includes('/u/myusernamebutactuallybot');
};

const getMethods = (obj) => {
    let properties = new Set()
    let currentObj = obj
    do {
      Object.getOwnPropertyNames(currentObj).map(item => properties.add(item))
    } while ((currentObj = Object.getPrototypeOf(currentObj)))
    return [...properties.keys()].filter(item => typeof obj[item] === 'function')
  }

module.exports = {
  RESOLVED_FLAIR_ID: RESOLVED_FLAIR_ID,
  canSummon: canSummon,
  getMethods:getMethods
}
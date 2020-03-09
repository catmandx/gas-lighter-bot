const FLAIR_ID={
  RESOLVED:"",
  QUESTION:"",
  GUIDE:"",
  UNRESOLVED:"",
  ANNOUNCEMENT:""
}
FLAIR_ID.RESOLVED = "2a005734-5efa-11ea-a737-0e548cf4a885";
FLAIR_ID.QUESTION = "103a2776-5efa-11ea-86a2-0ed003a975cd";
FLAIR_ID.GUIDE = "380a59d8-5efa-11ea-b653-0e2815b40e75";
FLAIR_ID.UNRESOLVED = "6b60be04-604d-11ea-9259-0e0887f8e389";
FLAIR_ID.ANNOUNCEMENT = "151a7622-6154-11ea-b9a6-0e12ccfdde2d"

const canSummon = (msg) => {
  return msg && msg.toLowerCase().includes('/u/GAS_Lighter_BOT');
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
  FLAIR_ID,
  canSummon,
  getMethods
}
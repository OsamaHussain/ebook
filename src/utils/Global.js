export const reducer = (state, action)=>{
  return{
    ...state,
  [action.field]:action.payload 
  }
}

export const roleFinder=(role)=>{
if(role==="merchant"){
   return {
    merchant:true,
    user:true
   }
   }
    if(role==="user"){
return {
merchant:false,
user:true
}
}
}
export const removeEmptyValuesFromObject = (state) => {
  const data = {};
  for (const key in state) {
    if (state.hasOwnProperty(key) && state[key] !== null && state[key] !== undefined &&  state[key] !== "") {
      data[key] = state[key];
    }
   if((state.hasOwnProperty(key)  && state[key] === "merchant") || (state.hasOwnProperty(key)  && state[key] === "user") ){
      data[key] = roleFinder(state[key]);
  }
  }
  return data;
};

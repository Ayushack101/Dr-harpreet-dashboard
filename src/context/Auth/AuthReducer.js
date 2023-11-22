export const reducer = (state, action) => {
  if (action.type === "LOGIN") {
    return {
      ...state,
      user: action.payload,
    };
  }
};

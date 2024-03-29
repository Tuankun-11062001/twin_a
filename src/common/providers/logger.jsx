const logger = (reducer) => {
  return (prevState, action) => {
    console.group(action.type);
    console.log("prev state:", prevState);
    console.log("Action:", action);

    const nextState = reducer(prevState, action);

    console.log("next state:", nextState);
    console.groupEnd();
    return nextState;
  };
};

export default logger;

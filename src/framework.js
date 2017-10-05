//utils
function objMap(fn, obj) {
  return Object.keys(obj).reduce((acc, key) => {
    acc[key] = fn(obj[key]);
    return acc;
  }, {});
}

function assignWithDupCheck(a, b) {
  const addElement = obj => (acc, key) => {
    if (acc[key]) {
      console.error(
        `The reducer named %c${key}`,
        "color: blue; font-weight: bold;",
        "has overwritten the effect with the same name."
      );
    }
    acc[key] = obj[key];
    return acc;
  };
  return Object.keys(b).reduce(
    addElement(b),
    Object.keys(a).reduce(addElement(a), {})
  );
}

// framework
export const start = (
  render,
  {
    state = {},
    reducers = {},
    effects = {},
    subscriptions = [],
    middlewares = []
  }
) => {
  const internalState = {};
  const internalMiddlewares = middlewares.map(middleware =>
    middleware(getState)
  );

  const internalActions = assignWithDupCheck(
    objMap(
      effect => (...payload) => effectDispatch(effect, ...payload),
      effects
    ),
    objMap(
      reducer => (...payload) => reducerDispatch(reducer, ...payload),
      reducers
    )
  );

  function reducerDispatch(fn, ...payload) {
    executeMiddleware(...payload);
    Object.assign(internalState, fn(...payload, internalState));
    render({ model: { state: internalState, actions: internalActions } });
  }

  function effectDispatch(fn, ...payload) {
    executeMiddleware(...payload);
    fn(...payload, { state: internalState, actions: internalActions });
  }

  function executeMiddleware(...payload) {
    internalMiddlewares.forEach(middleware => middleware(...payload));
  }

  function getState() {
    return internalState;
  }

  reducerDispatch(state => state, state);
  subscriptions.forEach(subscription => subscription(internalActions));

  return internalActions;
};

export const debug = getState => (...payload) =>
  console.log("Current State:", getState(), "Payload:", ...payload);
/*
- middleware (read only)
- unit test
*/

// import { debug } from './framework'

export default {
  //   middlewares: [
  //     debug
  //   ],
  state: {
    people: ""
  },
  reducers: {
    setPeople: (people, state) => {
      return {
        people
      };
    }
  },
  effects: {
    loadAllAjaxCalls: (...stuff) => {
      // { state, actions }
      fetch("https://swapi.co/api/people/")
        .then(r => r.json())
        .then(data => {
          stuff[1].actions.setPeople(data.results);
        })
        .catch();
    }
  },
  subscriptions: [
    // actions => {
    //   setInterval(() => {
    //     actions.loadAllAjaxCalls()
    //   }, 30 * 1000)
    //   actions.loadAllAjaxCalls()
    // },
    // actions => {
    //   setInterval(actions.updateProgress, 250)
    // }
  ]
};

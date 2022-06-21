import { getDatabase, onValue, push, ref } from "firebase/database";
import { app } from "../../firebase";

const db = getDatabase(app);

export const addRide = async (pickup, destination, cost, dispatch) => {
  const data = {
    pickup,
    destination,
    cost,
    date: Date.now(),
  };

  dispatch({
    type: "LOADING",
  });

  await push(ref(db, "/rides"), data);
  dispatch({});
};

export const getRides = (dispatch) => {
  dispatch({
    type: "LOADING",
  });
  onValue(ref(db, "rides"), (s) => {
    dispatch({
      type: "FETCHED_DATA",
      payload: s.val(),
    });
  });
};

export default function globalReducer(state, { type, payload }) {
  switch (type) {
    case "LOADING":
      return { ...state, loading: true };
    case "FETCHED_DATA":
      return { loading: false, error: null, data: payload };
    case "ADD_DATA":
      return {
        loading: false,
        error: null,
        data: { ...state.data, ...payload },
      };
    case "ERROR":
      return { ...state, error: payload, loading: false };
    default:
      return { ...state, loading: false };
  }
}

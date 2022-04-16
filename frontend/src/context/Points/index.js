import React, {
  useContext,
  createContext,
  useReducer,
  useMemo,
  useCallback,
} from "react";

export const PointsContext = createContext(null);

export const usePoints = () => {
  const context = useContext(PointsContext);
  if (!context) {
    throw Error("You must initialize PointsProvider before use it!");
  }
  return context;
};

const initialState = {
  current: {
    latitude: -33.5226882,
    longitude: -70.5987142,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  },
  markers: [
    {
      title: "CASA",
      description: "donde estamos",
      latlng: {
        latitude: -33.52763520000001,
        longitude: -70.5888611,
      },
    },
  ],
};

const actionTypes = {
  ADD_POINT: "addPoint",
  UPDATE_POINT: "updatePoint",
  REMOVE_POINT: "removePoint",
  ADD_MARKER: "addMarker",
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case actionTypes.ADD_POINT: {
      return { ...state, latitude: payload.lat, longitude: payload.lng };
    }
    case actionTypes.UPDATE_POINT: {
      return { ...state, ...payload };
    }
    case actionTypes.REMOVE_POINT: {
      return { ...state, ...payload };
    }
    case actionTypes.ADD_MARKER: {
      console.log(payload);
      return { ...state, markers: [...state.markers, { latlng: payload }] };
    }
    default:
      return { ...state };
  }
};

export const PointsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addPoint = useCallback((payload) => {
    dispatch({ type: actionTypes.ADD_POINT, payload });
  }, []);
  const updatePoint = useCallback((payload) => {
    dispatch({ type: actionTypes.UPDATE_POINT, payload });
  }, []);
  const removePoint = useCallback((payload) => {
    dispatch({ type: actionTypes.REMOVE_POINT, payload });
  }, []);
  const addMarker = useCallback((payload) => {
    dispatch({ type: actionTypes.ADD_MARKER, payload });
  }, []);

  const value = useMemo(
    () => ({
      point: { ...state },
      addPoint,
      updatePoint,
      removePoint,
      addMarker,
    }),
    [state, addPoint, updatePoint, removePoint, addMarker]
  );

  return (
    <PointsContext.Provider value={value}>{children}</PointsContext.Provider>
  );
};

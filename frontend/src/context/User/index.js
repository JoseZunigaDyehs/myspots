import React, {
  useContext,
  createContext,
  useReducer,
  useMemo,
  useCallback,
} from "react";

export const UserContext = createContext(null);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw Error("You must initialize UserProvider before use it!");
  }
  return context;
};
const delta = { latitudeDelta: 0.05, longitudeDelta: 0.05 };
const initialState = {
  id: 1,
  name: "ASW Dyehs",
  email: "zuniga.joseignacio@gmail.com",
  roleId: 1,
  crewIds: [1, 2],
  delta,
  currentMarker: {
    latlng: {
      ...delta,
      latitude: -33.52763520000001,
      longitude: -70.5888611,
    },
  },
  crews: {
    1: { name: "SIONO Crew", description: "Number 0" },
    2: { name: "Vida Crew", description: "Number 3434434" },
  },
  markers: [
    {
      id: 1,
      title: "CASA",
      description: "donde estamos",
      latlng: {
        latitude: -33.52763520000001,
        longitude: -70.5888611,
      },
      users: [{ id: 1, name: "" }],
      crews: [{ id: 1, name: "SIONO Crew" }],
      img: "",
      link: "",
      state: "",
    },
    {
      id: 2,
      title: "tyuytu",
      description: "iuopouib",
      latlng: {
        latitude: -33.50098595565238,
        longitude: -70.58713506907225,
      },
      users: [{ id: 1, name: "" }],
      crews: [{ id: 1, name: "SIONO Crew" }],
      img: "",
      link: "",
      state: "",
    },
  ],
};

const actionTypes = {
  LOGIN: "login",
  LOGOUT: "logout",
  ADD_TO_CREW: "addToCrew",
  REMOVE_TO_CREW: "removeToCrew",
  SET_CURRENT_MARKER: "setCurrentMarker",
  ADD_MARKER: "addMarker",
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case actionTypes.LOGIN: {
      return { ...state, ...payload };
    }
    case actionTypes.LOGOUT: {
      return { ...initialState };
    }
    case actionTypes.ADD_TO_CREW: {
      return { ...initialState, ...payload };
    }
    case actionTypes.REMOVE_TO_CREW: {
      return { ...initialState, ...payload };
    }
    case actionTypes.ADD_MARKER: {
      return {
        ...initialState,
        markers: [
          ...state.markers,
          {
            description: payload.description,
            title: payload.title,
            latlng: {
              latitude: payload.latitude,
              longitude: payload.longitude,
            },
          },
        ],
      };
    }
    case actionTypes.SET_CURRENT_MARKER: {
      return {
        ...initialState,
        currentMarker: { ...currentMarker, latlng: state.currentMarker.latlng },
      };
    }
    default:
      return { ...state };
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = useCallback((payload) => {
    dispatch({ type: actionTypes.LOGIN, payload });
  }, []);
  const logout = useCallback((payload) => {
    dispatch({ type: actionTypes.LOGOUT, payload });
  }, []);
  const addToCrew = useCallback((payload) => {
    dispatch({ type: actionTypes.ADD_TO_CREW, payload });
  }, []);
  const removeToCrew = useCallback((payload) => {
    dispatch({ type: actionTypes.REMOVE_TO_CREW, payload });
  }, []);
  const setCurrentMarker = useCallback((payload) => {
    dispatch({ type: actionTypes.REMOVE_TO_CREW, payload });
  }, []);
  const addMarker = useCallback((payload) => {
    dispatch({ type: actionTypes.ADD_MARKER, payload });
  }, []);

  const value = useMemo(
    () => ({
      user: { ...state },
      login,
      logout,
      addToCrew,
      removeToCrew,
      setCurrentMarker,
      addMarker,
    }),
    [state, login, logout, addToCrew, removeToCrew, setCurrentMarker, addMarker]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const userMock = {
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

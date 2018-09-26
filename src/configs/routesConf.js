const routes = [
  {
    title: "Home",
    url: "/",
    panel: false,
    main: true,
    restricted: ["USER", "ADMIN"],
  },
  {
    title: "Documents",
    url: "/documents",
    panel: true,
    main: true,
    restricted: ["USER", "ADMIN"],
  },

  {
    title: "docY",
    url: "/docy",
    panel: true,
    main: true,
    restricted: ["USER", "ADMIN"],
  },
  {
    title: "DocGen",
    url: "/docgen",
    panel: true,
    main: true,
    restricted: ["USER", "ADMIN"],
  },
  {
    title: "Create Document",
    url: "/create/document",
    panel: true,
    main: true,
    restricted: ["USER", "ADMIN"],
  },

  {
    title: "Nomos Version 4",
    url: "/v4",
    panel: false,
    main: false,
    restricted: ["USER", "ADMIN"],
  },
  {
    title: "Nomos Version 5",
    url: "/v5",
    panel: false,
    main: false,
    restricted: ["USER", "ADMIN"],
  },
  {
    title: "Create Data Config",
    url: "/create/dataconf",
    panel: true,
    main: true,
    restricted: ["USER", "ADMIN"],
  },
  {
    title: "Set Organisation",
    url: "/setorg",
    panel: true,
    main: true,
    restricted: ["USER", "ADMIN"],
  },
  {
    title: "Org Data Configs",
    url: "/organisation/dataconfigs",
    panel: true,
    main: true,
    restricted: ["USER", "ADMIN"],
  },
  {
    title: "Admin Panel",
    url: "/admin",
    panel: true,
    main: true,
    restricted: ["ADMIN"],
  },
  {
    title: "Wizards Panel",
    url: "/wizard",
    panel: true,
    main: true,
    restricted: ["WIZARD"],
  },
]

export default routes

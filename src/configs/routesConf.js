const routes = [
  { title: "Home", url: "/", panel: false, main: true },
  { title: "Documents", url: "/documents", panel: true, main: true },

  { title: "docY", url: "/docy", panel: true, main: true },
  { title: "DocGen", url: "/docgen", panel: true, main: true },
  {
    title: "Create Document",
    url: "/create/document",
    panel: true,
    main: true,
  },

  { title: "Nomos Version 4", url: "/v4", panel: false, main: false },
  { title: "Nomos Version 5", url: "/v5", panel: false, main: false },
  {
    title: "Create Data Config",
    url: "/create/dataconf",
    panel: true,
    main: true,
  },
  { title: "Set Organisation", url: "/setorg", panel: true, main: true },
  {
    title: "Org Data Configs",
    url: "/organisation/dataconfigs",
    panel: true,
    main: true,
  },
]

const routes1 = []

export default routes

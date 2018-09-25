export const deedOfLeaseStandaloneData = {
  address: "",
  titleReference: "",
  landRegistry: "",
  legalDescription: "",
  premiseDescription: "",
  licenseAreaDescription: "",
  plans: [{ name: "" }],
  commencementDate: "",
  finalExpiryDate: "",
  initialAnnualRent: "1,000",
  termYears: 6,
  renewalPeriods: 5,
  preConstructionRent: "1,200",
  otherParty: "",
  // conditions would have been pretty cool
  // equipment if required, or has items it would = "Not Applicable" instead of undefined
  equipment: [
    {
      name: "PickAxe",
      description: "used to stop rebellions before they take place",
    },
  ],
  theOwner: "",
}

export const cowLetterData = {
  letterDate: "01 January 2017",
  clientName: "Farmer Brown",
  siteAddress: "69 sheep Lane",
  eventDescription: "a Nomos classic",
  installationPeriod: "the long hours of the night",
  userName: "user123",
  userJobTitle: "Some Job Title",
}

export const cowLicenseData = {
  userName: "Spark Name",
  contactPerson: "contact person",
  siteAddress: "the site address",
  eventName: "some event name",
  installationPeriod: "the installation period",
}

export const leaseInstrumentRegisteredData = {
  partTitle: "Title of the part",
  partDescription: "description of the part",
  registeredProprietor: "some registered proprietor",
}

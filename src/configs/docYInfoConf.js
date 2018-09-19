export const docYInfoConf = [
  {
    type: "h1",
    gutterBottom: true,
    variant: "title",
    value: "This is DocY",
  },
  {
    type: "h2",
    variant: "subheading",
    color: "secondary",
    value: "Instructions: ",
  },
  {
    type: "p",
    variant: "body1",
    value: "To the Left is all the data you can use when in your word template",
  },
  {
    type: "p",
    // paragraph: true,
    gutterBottom: true,
    variant: "body1",
    value:
      "These attributes can be used inside of your word templates as long as they are surrounded by {} e.g {leaseName}",
  },
  {
    type: "p",
    variant: "body1",
    value:
      "Loops: we can use some conditional logic in our templates. For example if our data had an array of events we could do the following in our word document",
  },
  {
    type: "p",
    variant: "body2",
    value: `{#events}
    {name}
    {date}
  {/events}`,
  },
]

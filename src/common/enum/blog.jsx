export const enumBlog = {
  viewList: {
    title: "Total Views Blog Today",
    view: "30k",
    svg: "view",
    selects: [
      {
        title: "all",
        value: "all",
      },
      {
        title: "high",
        value: "high",
      },
    ], // table
    table: {
      type: "blog",
      titles: ["Stt", "Title", "views"],
    },
  },
  listShort: {
    svg: "blog",
    title: "List blog",
    selects: [
      {
        title: "all",
        value: "all",
      },
      {
        title: "high",
        value: "high",
      },
    ],
    table: {
      type: "blog",
      titles: ["Stt", "Title", "View", "click source"],
    },
  },
  full: {
    type: "full",
    svg: "blog",
    title: "List Blog",
    selects: [
      {
        title: "all",
        value: "all",
      },
      {
        title: "high",
        value: "high",
      },
    ],
    table: {
      type: "blog",
      titles: [
        "Stt",
        "Title",
        "Thumbnail",
        "Views",
        "Click adds",
        "Description",
        "Date",
        "Published",
      ],
    },
  },
};

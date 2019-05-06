export var newProgram = [
  {
    editable: true,
    field: "programTitle",
    input: "text",
    label: "program title",
    validation: { required: true },
    value: "Program Title",
    visible: true
  },
  {
    editable: true,
    field: "programName",
    input: "text",
    label: "Program Name",
    validation: { required: true },
    value: "Program Name",
    visible: true
  },

  // {
  //   editable: true,
  //   field: "externalId",
  //   input: "text",
  //   label: "Exterenal Id",
  //   validation: { required: true },
  //   value: "Exterenal Id",
  //   visible: true
  // },



  {
    editable: true,
    field: "fromDate",
    input: "date",
    label: "start date",
    max: "2019-04-17T07:55:43.230Z",
    min: "1970-01-01T00:00:00.000Z",
    validation: { required: false },
    value: "",
    visible: true
  },
  {
    editable: true,
    field: "toDate",
    input: "date",
    label: "end date",
    max: "2019-04-17T07:55:43.230Z",
    min: "1970-01-01T00:00:00.000Z",
    validation: { required: false },
    value: "",
    visible: true
  },
    {
    editable: true,
    field: "KeyWords",
    input: "text",
    label: "Keywords",
    validation: { required: true },
    value: "Exterenal Id",
    visible: true
  },

  {
    editable: true,
    field: "description",
    input: "text",
    label: "Description",
    validation: { required: true },
    value: "Description",
    visible: true
  },
  {
    editable: true,
    field: "Concepts",
    input: "dropdown",
    label: "Concepts",
    validation: { required: true },
    value: "1",
    options: [
      {
        label: 1,
        value: 1
      },
      {
        label: 1,
        value: 1
      },
      {
        label: 1,
        value: 1
      },
      {
        label: 1,
        value: 1
      }
    ],
    visible: true
  },
  
  {
    editable: true,
    field: "language",
    input: "multiselect",
    label: "Language",
    validation: { required: true },
    value: ['english'],
    options: [
      {
        label: 'english',
        value: 'english'
      },
      {
        label: 'hindi',
        value: 'hindi'
      }
    ],
    visible: true
  },
];
export var imageUpload = [
  {
    editable: true,
    field: "logo",
    input: "file",
    requiredType:"image/*",
    label: "Logo",
    validation: { required: true },
    value:null,
    visible: true
  },
]
export var newProgram = [
  {
    editable: true,
    field: "programTitle",
    input: "text",
    label: "program title",
    validation: { required: false },
    value: "",
    visible: true
  },
  {
    editable: true,
    field: "programName",
    input: "text",
    label: "Program Name",
    validation: { required: false },
    value: "",
    visible: true
  },
 
  {
    editable: true,
    field: "externalId",
    input: "text",
    label: "Exterenal Id",
    validation: { required: false },
    value: "",
    visible: true
  },
  
 
  
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
    field: "description",
    input: "text",
    label: "Description",
    validation: { required: false },
    value: "",
    visible: true
  },
  {
    editable: true,
    field: "description",
    input: "dropdown",
    label: "Description",
    validation: { required: false },
    value: "",
    options:[
      {
        label:1,
        value:1
      },
      {
        label:1,
        value:1
      },
      {
        label:1,
        value:1
      },
      {
        label:1,
        value:1
      }
    ],
    visible: true
  },
  // {
  //   editable: true,
  //   field: "keyWords",
  //   input: "textarea",
  //   label: "KeyWords",
  //   validation: { required: false },
  //   value: ['englhhish'],
  //   visible: true
  // },
  {
    editable: true,
    field: "language",
    input: "multiselect",
    label: "Language",
    validation: { required: false },
    value: ['english'],
    options:[
      {
        label: 'english',
        value :'english'
      },
      {
        label: 'hindi',
        value :'hindi'
      }
    ],
    visible: true
  },
];
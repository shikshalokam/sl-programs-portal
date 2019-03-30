
export const GlobalConfig = {
  acessAccordingRole: 'configurations/navigation',
  currentPortal: 'program',
  errorMessage: "Some thing went Wrong..",
  programPortalLinks: [
    {
      linkHeading: "headings.features",
      options: [
        {
          value: "headings.homes",
          id: 'home',
          anchorLink: "home",
          icon: "home"

        },
        {
          value: "headings.reports",
          id: 'report',
          anchorLink: "report",
          icon: "graphic_eq"
        },
        {
          value: "headings.operations",
          id: 'operations',
          anchorLink: "operations",
          icon: "build"
        },
      ]
    }
  ],
  operationsDashBoardLinks: [
    {
      tooltip: "headings.operationDashboardUpload",
      anchorLink: "/operations/upload-csv",
      id: 'uploadcsv',
      icon: "settings",
      disabled: false
    },
    {
      tooltip: "headings.schoolListHeading",
      anchorLink: "/operations/view-schools",
      id: 'viewSchools',
      icon: "school",
      disabled: true
    },
    {
      tooltip: "headings.assessorListHeading",
      anchorLink: "/operations/view-assessors",
      id: 'viewAcessor',
      icon: "people",
      disabled: false
    },
    {
      icon: "description",
      tooltip: "headings.opsReport",
      anchorLink: "/operations/reports",
      id: 'opsReport',
      disabled: true
    }
  ],
  ReportDashBoardLinks: [
    {
      icons: "done",
      tooltip: "headings.reportEntityReport",
      anchorLink: "/report/entity-report",
      id: 'entityReport',
      icon: "description",
      disabled: true

    },
    {
      icons: "done",
      tooltip: "headings.schoolListHeading",
      anchorLink: "/report/school-list",
      id: 'schoolList',
      icon: "school",
      disabled: true

    }
  ]
}


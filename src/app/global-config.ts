
export const GlobalConfig = {
    acessAccordingRole : 'configurations/sideBar',
    currentPortal : 'program',
    programPortalLinks : [  
        { 
          linkHeading : "headings.features",
          options:[
            {
              value:"headings.homes",
              id:'home',
              anchorLink:"home"
            },
            {
              value :"headings.reports",
              id : 'report',
              anchorLink:"report"
            },
                          {
              value:"headings.operations",
              id:'operations',
              anchorLink:"operations"
            },
          ]
          }
      ] ,
    operationsDashBoardLinks :[
        {
          icons:"done",
          tooltip:"headings.operationDashboardUpload",
          anchorLink:"/operations/upload-csv",
          id:'uploadcsv'
        },
        {
          icons:"done",
          tooltip:"headings.schoolListHeading",
          anchorLink: "/operations/view-schools",
          id:'viewSchools'
        },
        {
          icons:"done",
          tooltip:"headings.assessorListHeading",
          anchorLink: "/operations/view-assessors",
          id:'viewAcessor'
        },
        {
          icons:"done",
          tooltip:"headings.opsReport",
          anchorLink: "/operations/reports",
          id:'opsReport'
        }
      ],
      ReportDashBoardLinks : [
        {
          icons:"done",
          tooltip:"headings.reportEntityReport",
          anchorLink:"/report/entity-report",
          id:'entityReport'
        },
        {
          icons:"done",
          tooltip:"headings.schoolListHeading",
          anchorLink:"/report/school-list",
          id:'schoolList'
        }
      ]
    }
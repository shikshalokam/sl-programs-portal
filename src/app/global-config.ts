
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
              anchorLink:"home",
              icon:"home"
              
            },
            {
              value :"headings.reports",
              id : 'report',
              anchorLink:"report",
              icon:"insert_comment "
            },
                          {
              value:"headings.operations",
              id:'operations',
              anchorLink:"operations",
              icon:"build"
            },
          ]
          }
      ] ,
    operationsDashBoardLinks :[
        {
          tooltip:"headings.operationDashboardUpload",
          anchorLink:"/operations/upload-csv",
          id:'uploadCsv',
          icon:"insert_comment"
        },
        {
          tooltip:"headings.schoolListHeading",
          anchorLink: "/operations/view-schools",
          id:'viewSchools',
          icon:"school"
        },
        {
          tooltip:"headings.assessorListHeading",
          anchorLink: "/operations/view-assessors",
          id:'viewAcessor',
          icon:"people"
        },
        {
          icon:"report"
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
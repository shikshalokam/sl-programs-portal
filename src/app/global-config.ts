
export const GlobalConfig = {
    acessAccordingRole : 'configurations/sideBar',
    currentPortal : 'program',
    programPortalLinks : [  
        { 
          linkHeading : "headings.features",
          options:[
            {
              value :"headings.reports",
              id : 'report',
              anchorLink:"report"
            },
                          {
              value:"headings.operations",
              id:'operations',
              anchorLink:"operations"
            }
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
          tooltip:"headings.insideReport",
          anchorLink: "/operations/inside-report",
          id:'insideReport'
        }
      ]
    }
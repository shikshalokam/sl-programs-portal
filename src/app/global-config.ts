
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
          icon:"report",
          tooltip:"headings.opsReport",
          anchorLink: "/operations/reports",
          id:'"insightReport"'
        }
      ]
    }
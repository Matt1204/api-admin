const projects = [
    {
        id: 1,
        name: "项目1",
        projectDesc: "项目描述1项目描述1项目描述1.项目描述1项目描述1项目描述1.项目.1项目描述1.项目.项目描述1.项目.项目描述1.项目.项目描述1.项目.项目描述1.项目.项目描述1.项目.项目描述1.项目.项目描述1.项目.",
        customDomain: null,
        globalParams: [{ key: 'drink', value: 'coke' }, { key: 'food', value: 'burger' }]
    },
    {
        id: 2, name: "项目2",
        projectDesc: "项目描述2项目描述2项目描述22项目描述22项目描述2.",
        customDomain: null,
        globalParams: [{ key: 'car', value: 'ferrari' }, { key: 'bike', value: 'honda' }]

    },
    {
        id: 3, name: "项目3", projectDesc: "项目描述33333.", customDomain: null
    },
    {
        id: 4, name: "项目4", projectDesc: "44444444444444444444", customDomain: null
    },
    {
        id: 5, name: "项目5", projectDesc: "项目描述555项目描述55项目描述5.", customDomain: null
    },
    {
        id: 6, name: "项目6", projectDesc: "项目描述66项目描述1项目描述6666.", customDomain: null
    },
    {
        id: 7, name: "项目7", projectDesc: "项目描述66项目描述1项目描述6666.", customDomain: null
    },
    {
        id: 8, name: "项目8", projectDesc: "项目描述66项目描述1项目描述6666.", customDomain: null
    },
    {
        id: 9, name: "项目9", projectDesc: "项目描述66项目描述1项目描述6666.", customDomain: null
    },
    {
        id: 10, name: "项目10", projectDesc: "项目描述66项目描述1项目描述6666.", customDomain: null
    },
    {
        id: 11, name: "项目11", projectDesc: "项目描述66项目描述1项目描述6666.", customDomain: null
    },
]

const apis = [
    {
        id: 1, name: "api1"
    },
    {
        id: 2, name: "api2"
    },
    {
        id: 3, name: "api3"
    },
    {
        id: 4, name: "api4"
    },
    {
        id: 5, name: "api5"
    },
    {
        id: 6, name: "api6"
    },
    {
        id: 7, name: "api7"
    },
    {
        id: 8, name: "api8"
    },
    {
        id: 9, name: "api9"
    },
    {
        id: 10, name: "api10"
    },
]

const sidebarTreeData = {
    // projectId
    '1': [
        {
            id: 999, // folder id
            label: "Folder 1",
            type: "folder",
            children: [
                {
                    id: 998, // folder id
                    label: "Folder 1-1",
                    type: "folder",
                    children: [
                        {
                            id: 1, // api id
                            label: "API 1",
                            type: "api",
                            req_type: 'GET'
                        },
                        {
                            id: 2, // api id
                            label: "API 2",
                            type: "api",
                            req_type: 'POST'
                        }
                    ]
                }
            ]
        },
        {
            id: 997,
            label: "Folder 2",
            type: "folder",
            children: [
                {
                    id: 3,
                    label: "API 3",
                    type: "api",
                    req_type: 'GET'
                },
                {
                    id: 4,
                    label: "API 4",
                    type: "api",
                    req_type: 'DEL'
                }
            ]
        },
        {
            id: 996,
            label: "Folder 3",
            type: "folder",
            children: [
                {
                    id: 5,
                    label: "API 5",
                    type: "api",
                    req_type: 'PATCH'
                },
                {
                    id: 6,
                    label: "API 6",
                    type: "api",
                    req_type: 'POST'
                }
            ]
        }
    ],
    '2': [
        {
            id: 995,
            label: "Folder 1",
            type: "folder",
            children: [
                {
                    id: 8,
                    label: "API 8",
                    type: "api",
                    req_type: 'GET'
                },
                {
                    id: 9,
                    label: "API 9",
                    type: "api",
                    req_type: 'PATCH'
                }
            ]
        },
        {
            id: 10,
            label: "API 10",
            type: "api",
            req_type: 'POST'
        }
    ]

}

export {
    projects,
    apis,
    sidebarTreeData
}
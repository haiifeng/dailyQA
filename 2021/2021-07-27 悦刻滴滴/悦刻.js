
const treeData = [
    {
        key: '1',
        name: '1',
        children: [
            {
                key: '1.1',
                name: '1.1',
                children: [
                    {
                        key: '1.1.1',
                        name: '1.1.1'
                    }
                ]
            },
        ]
    },
    {
        key: '2',
        name: '2',
        children: [
            {
                key: '2.1',
                name: '2.1',
            },
        ]
    }
]

const renderTree = (props) => {
    const { treeData } = props;

    const renderNode = (node) => {
        return <div>
            <div>{node.name}</div>
            {node.children && <div style={{paddingLeft:'4px'}}>{renderNode(node.children)}</div>}
        </div>
    }

    return renderNode(treeData)

}


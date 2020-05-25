//  ------------- nodes --------------
export const NodeSchema = {
    version: 0,
    title: 'Workflow client db',
    type: 'object',
    properties: {
        nodeID: {
            type: 'string',
            primary: true,
            final: true
        },
        title: {
            type: 'string',
            default: 'My title'
        },
        loc: {
            type: 'object',
                properties: {
                    x: {
                        type: 'number',
                        default: 0
                    },
                    y: {
                        type: 'number',
                        default: 0
                    }
                }
            }
        }
    };
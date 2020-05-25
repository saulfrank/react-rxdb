import { addRxPlugin, createRxDatabase, isRxDatabase, isRxCollection } from 'rxdb';
import {NodeSchema} from './NodeSchema'

// import RxDBSchemaCheckModule from 'rxdb/plugins/schema-check';
// import RxDBErrorMessagesModule from 'rxdb/plugins/error-messages';
//import RxDBValidateModule from 'rxdb/plugins/validate';
// import RxDBReplicationGraphQL from 'rxdb/plugins/replication-graphql';

// import { SubscriptionClient } from 'subscriptions-transport-ws';

addRxPlugin(require('pouchdb-adapter-idb'));
// addRxPlugin(RxDBSchemaCheckModule);
// addRxPlugin(RxDBErrorMessagesModule);
// addRxPlugin(RxDBValidateModule);
// addRxPlugin(RxDBReplicationGraphQL);

var startTime, endTime;
function start() {
  startTime = performance.now();
};


function end() {
  endTime = performance.now();
  var timeDiff = endTime - startTime; //in ms 
  // get seconds 
  // var seconds = Math.round(timeDiff);
  console.log(timeDiff + " ms");
}

const dbC = async () =>{

    console.log('local db created');
    const db = await createRxDatabase({
        name: 'gushdbdev',
        adapter: 'idb',
        eventReduce: true,
        queryChangeDetection: true
    });

    console.log('DatabaseService: created database');
    window['db'] = db; // write to window for debugging
    

    return db;

}
    

const graph1 = {
    nodes: {
        "aa15f2d2-00c2-4714-802f-76848ab00d66": {
            title: "Node 1",
            loc: {x: 200, y: 100},
        },
        "e7149f0d-1bd5-4b38-8477-dddbc125e736": {
            title: "Node 2",
            loc: {x: 500, y: 50},
        },
        "e7149f0d-1bd5-4b38-8477-dedbc125e736": {
            title: "Node 3",
            loc: {x: 800, y: 90},
        }
    },
    links: {

    }
};

const collections = async () =>{

    start();
    const db = await dbC();
    end();
    const is = await isRxDatabase(db);
    console.log(is);

    const nodes = await db.collection({
        name: 'nodes',
        schema: NodeSchema
    });

    const is1 = await isRxCollection(nodes);
    console.log(is1);

  
    return db;

}

export const load_data = async () =>{

    const db = await collections();
    const is = await isRxDatabase(db);
    console.log(is);

    start();
    for (const key of Object.keys(graph1.nodes)) {
        console.log(graph1.nodes[key]);
        
        db.nodes.atomicUpsert(
            {
                nodeID:key,
                title: graph1.nodes[key].title,
                loc: graph1.nodes[key].loc,
            }
        );
    }
    end();

    return db;


}
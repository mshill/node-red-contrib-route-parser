/*jslint devel: true, node: true, indent: 4*/
/**
* Copyright (c) 2015 Julian Knight (Totally Information)
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
**/

// Node for Node-Red that parses pathparams in routes.

module.exports = function(RED) {
    "use strict";
    
    // The main node definition - most things happen in here
    function RouteParser(n) {
        // Create a RED node
        RED.nodes.createNode(this,n);
        
        // Store local copies of the node configuration (as defined in the .html)
        this.topic = n.topic;
        this.input = n.input;
        this.format = n.format;
        this.output = n.output;

        // copy "this" object in case we need it in context of callbacks of other functions.
        var node = this;

        // respond to inputs
        node.on('input', function (msg) {
            'use strict';
            // We will be using eval() so lets get a bit of safety using strict
            
            // If the node's topic is set, copy to output msg
            if ( node.topic !== '' ) {
                msg.topic = node.topic;
            } // If nodes topic is blank, the input msg.topic is already there
            
            // make sure output property is set, if not, assume msg.payload
            if ( node.output === '' ) {
                node.output = 'payload';
                node.warn('Output field is REQUIRED, currently blank, set to msg.payload');
            }
            // Reference the output object we want: it may be several layers deep
            // e.g. msg. palyload.some.thing so we cant simply use msg[node.output]
            var outp = eval('msg.' + node.output);

            var outMsg = {};
            var keys = msg.req.route.path.split("/");
            var words = msg.req.path.split("/");
            for (var i = 0; i < keys.length; i++) {
                if (keys[i].lastIndexOf(":", 0) === 0) {
                    outMsg[keys[i].substr(1)] = words[i];
                    //outMsg.numb++;
                }
            }
            msg.req.route.params = outMsg;
            
            // send on...
            node.send(msg);
        });
        
        // Tidy up if we need to
        //node.on("close", function() {
            // Called when the node is shutdown - eg on redeploy.
            // Allows ports to be closed, connections dropped etc.
            // eg: node.client.disconnect();
        //});
    }
    // Register the node by name. This must be called before overriding any of the
    // Node functions.
    RED.nodes.registerType("route-parser",RouteParser);
}

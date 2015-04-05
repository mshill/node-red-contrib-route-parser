# node-red-contrib-route-parser
A node-red node for parsing pathparams in routes for RESTful Web Services. 

Parse out pathparams from the route and return in an associative array.

Associative Array is stored in *msg.req.route.params* as key value pairs.

If the route was defined in a HTTP input node as:
```
/api/test/:lastname/:firstname/anything/:else/you/might/:route
```
and the actual request path is:
```
/api/test/Hill/Mike/anything/foo/you/might/bar
```
the parser would add key/value pairs based on path parameters that start with ":" in *msg.req.route.params*:
```JavaScript
msg.req.route.params = {
    lastname : "Hill",
    firstname : "Mike",
    else : "foo",
    route : "bar"
}
```


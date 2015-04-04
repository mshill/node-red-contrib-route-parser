# node-red-contrib-route-parser
A node for parsing pathparams in routes for node-red

Parse out pathparams from the route and return in an associative array.

Associative Array is stored in msg.req.route.params as key value pairs


EG:
```
ROUTE: /api/test/:lastname/:firstname/anything/:else/you/might/:route
```
```
Actual: /api/test/Hill/Mike/anything/foo/you/might/bar
```

would return:
```javascript
msg.req.route.params = {
    lastname : "Hill",
    firstname : "Mike",
    else : "foo",
    route : "bar"
}
```


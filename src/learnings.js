const { adminAuth, userAuth } = require("./middlewares/auth");

// /abc, /ac, 
// app.get("/test/:userId/:name/:password",(req, res)=>{
//     console.log(req.params);
//     res.send({firstName: "Avinay", lastName : "Kumar"})
// });


// //Request handeler
// app.use("/hello/1",(req, res)=>{
//     res.send("Hello From hello!")
// });

// //get call

// app.get("/test",(req, res)=>{
//     res.send("data fetched successfully !")
// });

// // POST call

// app.post("/test",(req, res)=>{
//     console.log("saving data to db");
//     res.send("data saved successfully !")
// });


// //request handeler for test route
// // this will match all HTTP methods

// app.use("/test",(req, res)=>{
//     res.send("Hello From the Test !")
// });

// //wildcard route

// app.use("/",(req, res)=>{
//     res.send("Hello Avinay !")
// });

//Multiple Route handeler

// app.use(
//     "/test",
//     (req,res,next)=>{
//     console.log("First route handeler !");
//     //res.send("Response 1");
//     next();
// },
// (req,res,next)=>{
//     console.log("Second route handler !");
//     //res.send("Response 2");
//     next();
// },
// (req,res,next)=>{
//     console.log("Third route handler !");
//     res.send("Response 3");
// });

// another advance way to write route handler, independently

// app.get("/test",(req, res,next)=>{
//     console.log("handeling the route user !!");
//     next();
// });

// app.get("/test",(req, res,next)=>{
//     console.log("handeling the route user 2 !!");
//     res.send("sendig res for 2nd handler");
// });


// Use case of Middleware in Authorization

//middleware for authentication

app.use("/admin",adminAuth);

app.get("/user",userAuth,(req,res)=>{
    res.send("User Data Sent");
});

// user with without authentication
app.get("/user/login",(req,res)=>{
    res.send("User logged in successfully");
});

app.get("/admin/getAllData",(req,res)=>{
    res.send("All Data Sent");
});

app.get("/admin/deleteUser",(req,res)=>{
    res.send("User Deleted !!");
});
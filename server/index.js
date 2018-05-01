require( 'dotenv' ).config( )

const express = require( 'express' ),
    massive = require( 'massive' ),
    session = require("express-session"),    
    passport = require("passport"),
    Auth0Strategy = require("passport-auth0"),
    bodyParser = require('body-parser');

    const {
        SERVER_PORT,
        SESSION_SECRET,
        DOMAIN,
        CLIENT_ID,
        CLIENT_SECRET,
        CALLBACK_URL,
        CONNECTION_STRING
    } = process.env;

    // const app = express( );
    app = (module.exports = express());
    

    app.use( bodyParser.json() );

    app.use(express.json());

    app.use(
      session({
        secret: SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
        cookie: { secure: false }
      })
    );
    app.use((req, res, next) => {
      console.log(req.url);
      console.log(req.session);
      next();
    });
    app.use(passport.initialize());
    app.use(passport.session());

      massive( CONNECTION_STRING ).then( db => {
          console.log( 'db connected' )
          app.set( 'db', db )
      } ) 

      app.get('/api/eproducts', (req, res) => {
          console.log('hit');
        const db = req.app.get("db");
        db.get_all().then(response => {
          res.send(response);
        //   console.log('response',response);
        });
      });

      app.get("/api/product/:id", (req, res) => {
        const db = req.app.get("db");
        const id = req.params.id;
        db.get_product([id]).then(response => {
          res.send(response);
        });
      });

      
      app.post("/api/hold", function(req, res) {
          let { itemID } = req.body;
          req.session.hold = itemID;
          // console.log(req.sessionID);
          console.log(req.session);
          res.sendStatus(200);
        });
        
        app.get("/api/cart", function(req, res) {
            let db = req.app.get("db");
            // console.log(req.user.id);
            // console.log(req.session);
            if (req.session.hold) {
                console.log("hello", req.user.id);
                db
                .add_to_ecart(req.session.hold, req.user.id, 1)
                .then(resp => {
                    req.session.hold = null;
                    // console.log(resp);
                    db
                    .get_user_ecart(req.user.id)
                    .then(resp => {
                        // console.log(resp);
                        res.status(200).send(resp);
                    })
                    .catch(console.log);
                })
                .catch(console.log);
            } else {
                // console.log('user', req.user );
                db
                .get_user_ecart(req.user.id)
                .then(resp => {
                    res.send(resp);
                })
                .catch(console.log);
            }
        });
        

        app.put("/api/update/", (req, res) => {
          // console.log()
          let db = req.app.get("db");
          const { quantity } = req.body;
          for (let key in quantity) {
            db
              .update_ecart([quantity[key], key])
              .then(response => {
                res.send(response);
              })
              .catch(console.log);
          }
        });
  
        app.delete("/api/delete/:id", function(req, res) {
          let db = req.app.get("db");
          const id = req.params.id;
          db
            .delete_from_ecart([id])
            .then(response => {
              res.send(response);
            })
            .catch(console.log);
        });
        

        passport.use(
            new Auth0Strategy(
          {
            domain: DOMAIN,
            clientID: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            callbackURL: CALLBACK_URL,
            scope: "openid profile"
          },
          function(accessToken, refreshToken, extraParams, profile, done) {
            //database calls
            const db = app.get("db");
      
            const { sub, given_name, family_name } = profile._json;
            //   console.log(profile._json)
      
            db
              .get_euser([sub])
              .then(response => {
                if (response[0]) {
                  done(null, response[0].id);
                } else {
                  db
                    .create_euser([sub, given_name, family_name])
                    .then(response => {
                      done(null, response[0].id);
                    })
                    .catch(console.log);
                }
              })
              .catch(console.log);
          }
        )
      );

      passport.serializeUser((id, done) => {
        done(null, id);
      });
      
      passport.deserializeUser((id, done) => {
        // whatever is on the done in deser. is the user info
        const db = app.get("db");
        db
          .find_all_eusers([id])
          .then(res => {
            console.log("deserializedID", id);
            console.log("deserializedUser", res[0]);
            done(null, res[0]);
          })
          .catch(console.log);
      });
      
      app.get("/auth", passport.authenticate("auth0"));
      app.get(
        "/auth/callback",
        passport.authenticate("auth0", {
          successRedirect: process.env.SUCCESSREDIRECT
        })
      );
      
      app.get("/auth/me", (req, res) => {
        if (!req.user) {
          res.status(404).send("You aint logged in");
        } else {
          res.status(200).send(req.user); // when we want the user info we use req.user
        }
      });
      
      app.get("/auth/logout", (req, res) => {
        req.logOut();
        return res.redirect("http://localhost:3000/#/");
      });
      

    app.listen( SERVER_PORT, () =>{ 
        console.log ( `Listening on port: ${SERVER_PORT}` ) 
    } )




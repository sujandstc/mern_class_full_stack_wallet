## Lets start working on NODEJS

#### On terminal, Run `npm init`

#### 1. Create a .gitignore file and ignore node_modules and .env file like so:

```
/node_modules
.env
```

#### 2. Lets make our nodejs a typescript project. Install typescript package and ts-node-dev (Typescript to Javascript Compiler)

```
npm install typescript
npm install -D ts-node-dev
```

_Note: -D in npm install is for developer dependency_

#### 3. Goto package.json and add these in scripts

```
"scripts": {
   "build":"tsc",
   "start": "ts-node-dev app.ts"
  },
```

_Note: Nodejs cannot interpret typescript directly so we are running ts-node-dev as a development runtime compiler_

#### 4. Create a new file tsconfig.json in root directory of project - this will be your typescript config file. Paste this inside of that file

```
{
  "compilerOptions": {
    "strict": true,
    "target": "es6",
    "module": "commonjs",
    "outDir": "./dist",
    "esModuleInterop": true,
    "typeRoots": [
      "@types",
      "node_modules/@types"
    ],
  },
  "exclude": ["node_modules", "dist"]
}
```

#### 5. Restart your VsCode for enabling typescript

#### 6. Create a new file app.ts and write this code to test if typescript is running fine

```
let age: number = "hello world";
```

_Here, we are trying to assign string to number which should give an error on typescript. If its showing error, typescript is configured for the project_

#### 7. Install express

```
npm install express
```

Use this code on app.ts

```
import express from "express";
```

_This should give an error because we have not installed types for this package. Lets install types as they are required by typescript _

```
npm install -D @types/express
```

_You need to import types for most of the dependencies_

#### 8. Create .env file, Create a Server, use mongoose, dot env, keep mongo connection string in .env and everything you need for setting up project!

### Lets work on first feature of our app User Login and User Register

#### 1. Lets work on users model

> Create models folder
> New file users.model.ts and create schema, model and export from it.

#### 2. Create new file models.ts in root directory and import all models inside of that file

#### 3. Now import that models.ts on app.ts right after mongoose connection like so..

```
// Connecting to mongodb
mongoose
  .connect(process.env.mongo_connect!, {})
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((e: any) => {
    console.log("Connection failed!");
    console.log(e);
  });

// Intiializing all models..
import "./models";

```

#### 4. Now instead of keeping all api endpoints in app.ts which will eventually make our code unreadable and un-maintainable, we will keep all routes seperately. For that create a Modules Folder

#### 5. Now, as we are working on users feature like signup and login, we will create new folder Users on modules

#### 6. Create users.routes.ts in users module, create a dummy post request and then export it like so

```
import { Router } from "express";

const usersRoute = Router();

usersRoute.post("/", (req, res) => {
  res.status(200).json({
    status: "Route is working fine!",
  });
});

export default usersRoute;
```

#### 7. Now use that route in app.ts. You can keep this right above server!

```
// All requests that is sent to localhost:8000/users will be forwarded to usersRoute now.
app.use("/api/v1/users", usersRoute);

// Starting server
app.listen(8000, () => {
  console.log("Server started successfully!");
});

```

#### 8. Check api from postman. Send POST request to localhost:8000/users (Might be different in your code!)

#### 9. Now, lets create a controllers folder inside modules > users where we will be keeping logics like signup, login and so on.

#### 10. First we will be working on signup so create a new file userSignup.ts, create a function that sends response and export it like so:

```
import { Request, Response } from "express";

const usersSignup = (req: Request, res: Response) => {
  res.status(200).json({
    status: "Hello from signup route!",
  });
};

export default usersSignup;

```

#### 11. Now we need to use this usersSignup controller in usersRoute.. so move into users.routes.ts and use this usersSignup like so

```
import { Router } from "express";
import usersSignup from "./users/controllers/usersSignup";

const usersRoute = Router();

// Passing usersSignup controller to this route
usersRoute.post("/", usersSignup);

export default usersRoute;

```

### This completes the basic setup!!!

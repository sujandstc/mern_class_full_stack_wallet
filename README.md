# Steps for this re-creating this project on your own

1. Create react project with vite with TypeScript
2. Create folder for NodeJS project (Just create a folder, nothing else)

## Start working on NodeJS first!

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

#### 7. Install express and use express on file using import statement.

```
npm install express
```

Use it on app.ts

```
import express from "express";
```

_This should give an error because we have not install types for this package. Lets install it_

```
npm install -D @types/express
```

_You need to import types for most of the dependencies_

#### 8. Create a Server, use mongoose, dot env and everything you need for setting up project!

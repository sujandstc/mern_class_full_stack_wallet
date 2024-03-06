# Steps for this re-creating this project on your own

- Create react project with vite with TypeScript
- Create folder for NodeJS project (Just create a folder, nothing else)

## Start working on NodeJS first!

#### On terminal, Run `npm init`

#### Create a .gitignore file and ignore node_modules and .env file like so:

```
/node_modules
.env
```

#### Lets make our nodejs a typescript project. Install typescript package and ts-node-dev (Typescript to Javascript Compiler)

```
npm install typescript
npm install -D ts-node-dev
```

_Note: -D in npm install is for developer dependency_

#### Goto package.json and add these in scripts

```
"scripts": {
   "build":"tsc",
   "start": "ts-node-dev app.ts"
  },
```

_Note: Nodejs cannot interpret typescript directly so we are running ts-node-dev as a development runtime compiler_

#### Create a new file tsconfig.json in root directory of project - this will be your typescript config file. Paste this inside of that file

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

#### Restart your VsCode for enabling typescript

#### Create a new file app.ts and write this code to test if typescript is running fine

```
let age: number = "hello world";
```

_Here, we are trying to assign string to number which should give an error on typescript. If its showing error, typescript is configured for the project_

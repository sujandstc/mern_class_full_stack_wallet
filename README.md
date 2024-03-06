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

Note: -D in npm install is for developer dependency

#### Goto package.json and add these in scripts

```
"scripts": {
   "build":"tsc",
   "start": "ts-node-dev app.ts"
  },
```

Note: Nodejs cannot interpret typescript directly so we are running ts-node-dev as a development runtime compiler

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

#### Create a new file app.ts

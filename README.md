# employess_backend

this repository contains backend of a project to manage employees

## Technologies  and Tools

- Express 
- Typescript
- Winston
- Joi
- Moment
- Uuid

## Requirements

- Node 16 or higher

## Installation

To clone this repository, is necessary use the following commands:

```
cd existing_dir
git clone https://github.com/cjeanMa/Employees_BackEnd
```
Then access to the directory created for the clone command.
To download all modules necessaries,  use the following commands 

```
npm install
npm start
```

The port by default is **8000**, if you need to change the port enter to **src/bootstrap/server.bootstrap.ts**
and change the property **port** inside the class **ServerBoostrap**

After start this app, is necessary run the frontend Project store in [Employees_Frontend](https://gitlab.com/jmcastle009/employees_frontend)

## Testing 

After the installation, if you want you can make testing.
To do unit testing, use this commands

```
npm test
```

# Tandem

### Prerequisites (globally installed)

 - node + npm
 - mongod (not atm but will)
 - yarn
 
After installing these, clone the repository. Within its contents run:
```
yarn install
```

### Database
Make a `.localdb` folder within the repository: `mkdir .localdb`.

Eeach time open the DB with:
```
$ mongod --dbpath .localdb
```

### Backend

To run:
```
yarn backend
```

Uses:

- express
- mongoose/mongo

### Website/Webapp 

To run:
```
yarn web-app
```

Uses:

- ES6 syntax
- React + Reflux


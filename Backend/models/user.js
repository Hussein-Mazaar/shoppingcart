let db = [
    {id: 1, username: 'John', password: '111'},
    {id: 2, username: 'Edward', password: '222'}
];


let counter = 2;

module.exports = class User {
    constructor(id, username, password) {
        this.id = id;
        this.username = username;
        this.password = password;
    }

    save(){
        this.id = ++counter; //start with 1;
        db.push(this);
        return this;
    }

    edit(){
        const index = db.findIndex(user => user.id == this.id);
        db.splice(index, 1, this);
        return this;
    }

    static find(username, password){
        return db.find(user => user.username === username && user.password === password);
    }

    static findById(userId){
        return db.find(user => user.id == userId);
    }

    static getAll(){
        return db;
    }

    static deleteById(userId){
        const index = db.findIndex(user => user.id == userId);
        const deletedUser = db[index];
        db.splice(index, 1);
        return deletedUser;
    }

}

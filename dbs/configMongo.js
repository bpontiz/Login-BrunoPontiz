import { Schema, model, connect, disconnect } from 'mongoose';
import users from '../config/users.js';

const databaseName = 'login';

const newUsers = [];

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    pass: {type: String, required: true}
});

connect(`mongodb://localhost:27017/${databaseName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000
});

console.log(`Connection successful to database ${databaseName}.`);

const UserDAO = model('users', userSchema);

for (const user of users) {
    newUsers.push(UserDAO.create(user));
};

const userResponse = await Promise.allSettled(newUsers);
const userRejection = userResponse.filter(res => res.status === 'rejected');

userRejection.length == 0 ?
    console.log(`User successfully added to database\n${userResponse}`) :
        console.log(`ERR! Could not add user to database\n${userRejection}`);

export default UserDAO;
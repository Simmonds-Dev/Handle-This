const { User } = require('../models');

const userData = [
    {
        username: 'Chris',
        email: 'chris@email.com',
        password: 'test',
    },

];

const seedUser = () => User.bulkCreate(userData, { individualHooks: true });

module.exports = seedUser;
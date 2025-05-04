const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;


const registerRoutes = require('./routes/register');
const loginRoutes = require('./routes/login');
const postsRoutes = require('./routes/posts');
const profileRoutes = require('./routes/profile')
const db = require('./models'); 


app.use(express.json());


app.use('/api/register', registerRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/profile',profileRoutes);

db.sequelize.sync({ force: true }) 
    .then(() => {
        console.log('Database synced successfully');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error syncing database:', err);
    });


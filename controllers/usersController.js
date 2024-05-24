const NewUser = require("../models/NewUser");

const newusercontroller = {};

newusercontroller.register = async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
        const userReg = new NewUser({ name, email, password }); // Create a new instance of NewUser
        await userReg.save();
        console.log('User saved:', userReg, req.path);
       
   
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error creating user' });
    }

    res.render('index', {
        name: req.body.name
    })
};

newusercontroller.login = async (req, res, next) => {
    const { name, password } = req.body;

    try {
        const user = await NewUser.findOne({ name, password });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.render('index', {
            name: req.body.name
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error logging in user' });
    }


};

newusercontroller.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Error logging out' });
        }
        res.redirect('/');
    });
};

module.exports = newusercontroller;

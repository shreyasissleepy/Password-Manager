const express = require('express');
const app = express();
const cors = require('cors');
const { model } = require('./model');
const bcrypt = require('bcrypt');
const { caesarCipher } = require('./handlePwd')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post('/login', async (req, res) => {
    const { name, password } = req.body;
    const response = await model.findOne({ name: name });
    if (!response) {
        return res.send('Invalid credentials');
    }
    if (await bcrypt.compare(password, response.password)) {
        return res.send('Access granted');
    } else {
        return res.send('Invalid credentials');
    }
});

app.post('/signUp', async (req, res) => {
    const { name, email, password } = req.body;
    await bcrypt.hash(password, 10, async (err, hash) => {
        if (err) return res.status(500).send('Error creating account');
        try {
            await model.create({
                name: name,
                email: email,
                password: hash,
            });
            res.send('Account created successfully');
        } catch (err) {
            res.send(err);
        }
    });
});

app.post('/addPassword', async (req, res) => {
    try {
        const { name, sitename, siteemail, sitepassword } = req.body;
        const shift = Math.floor(Math.random() * 27);
        const encrypted_password = {encrypted_password:await caesarCipher(sitepassword,shift),shift:shift};

        await model.updateOne(
            { name: name },
            { $push: { saved_passwords: { sitename, siteemail, encrypted_password } } }
        );

        res.status(200).send('Password added successfully');
    } catch (error) {
        console.error("Error adding password:", error);
        res.status(500).send('Failed to add password');
    }
});

app.get('/getPasswords/:name', async (req, res) => {
    try {
        const name = req.params.name;
        const user = await model.findOne({ name: name });

        if (!user) {
            return res.status(404).send('User not found');
        }

        const decryptedPasswords = user.saved_passwords.map((item) => {
            const decryptedPassword = caesarCipher(item.encrypted_password.encrypted_password,-item.encrypted_password.shift);
            return {
                sitename: item.sitename,
                siteemail: item.siteemail,
                decryptedPassword: decryptedPassword || 'Decryption failed'
            };
        });

        await console.log(decryptedPasswords)
        res.status(200).json({ passwords: decryptedPasswords });
    } catch (error) {
        console.error("Error retrieving passwords:", error);
        res.status(500).send('Failed to retrieve passwords');
    }
});

app.post('/delete',async(req,res)=>{
    const {name,delete_index} = req.body

    const query = { name:name }

    const unsetUpdate = {
        $unset: { [`saved_passwords.${delete_index}`]: 1 }
    }

    const pullUpdate = {
        $pull: { saved_passwords: null }
    }

    await model.updateOne(query, unsetUpdate)

    await model.updateOne(query, pullUpdate)
})

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const members = require('../../Members'); //../ outside of the api folder ../ outside of the route floder 


// Gets All Mebmer
// "/" is because in the index file the router is alreay list it up so therefore no need to put it here again
router.get('/', (req, res) => {
    res.json(members);
});

// Get Single Member
// "/" index.js alreay have the route and only need the id for the if 
router.get('/:id1', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id1));
    if (found) {
        res.json(members.filter(members => members.id === parseInt(req.params.id1)));

    }
    else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id1}` });
    }

});

// Create Member
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }
    if (!newMember.name || !newMember.email) {
        return res.status(400).json({ msg: 'Please include a name and email' });
    }

    //members.save(newMember);  this is for mangoDB or SQL
    members.push(newMember);
    //res.json(members);
    res.redirect('/');

});


// Update member
router.put('/:id1', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id1));
    if (found) {
        const updMember = req.body;
        members.forEach(member => {
            if (member.id === parseInt(req.params.id1)) {
                member.name = updMember.name ? updMember.name : member.name;
                member.email = updMember.email ? updMember.email : member.email;
                res.json({ msg: 'Member updated', member });

            }
           
        });
         
    }else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
    }

});


// Delete Member
router.delete('/:id1', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id1));
    if (found) {
        res.json({ msg: 'Member delted', members: members.filter(members => members.id !== parseInt(req.params.id1)) });

    }
    else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id1}` });
    }

});


module.exports = router;
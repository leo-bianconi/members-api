const express = require('express');
const router = express.Router();
const UUID = require('uuid');
const members = require('../../Members');

// Database model
const Member = require('../../db/db-odm');

// Gets all members
router.get('/', (req, res) => {
    const allMembers = Member.find((err, data) => {
        if (err) {
            res.status(500).json({ msg: 'Internal Server Error' });
        } else {
            res.json(data);
        }
    });
});

// Get single member
router.get('/:id', (req, res) => {
    const found = Member.countDocuments({ _id: req.params.id });
    if (found) {
        Member.find({ _id: req.params.id }, (err, data) => {
            if (err) {
                res.status(500).json({ msg: 'Internal Server Error' });
            } else {
                res.json(data);
            }
        });
    } else {
        res.status(404).json({ msg: 'User not found' });
    }
});

// Create member
router.post('/', (req, res) => {
    
    // No email or name specified
    if (!req.body.name || !req.body.email) {
        return res.status(400).json({ msg: 'Please specify a name and email!' });
    }
    else {  
        Member.countDocuments({ email: req.body.email }, (err, count) => {
            if (err) res.status(500).json({ msg: 'Internal Server Error' });            // 500
            else if (count > 0) {                                                       // If email already in database    
                res.status(400).json({ msg: 'User with this email already exists' });              
            } else {                                                                    // If everything goes well
                const newMember = new Member({
                    name: req.body.name,
                    email: req.body.email,
                    status: 'active'
                });
                
                newMember.save(() => {
                    res.json(newMember);
                });
            }
        });
    }

   
    
});

// Update member
router.put('/:id', (req, res) => {
   
    const updMember = req.body;
    Member.findOne({ _id: req.params.id }, (err, m) => {
        if (!m) res.status(400).json({ msg: 'User not found' });                // Id not existing in db
        else if (err) res.status(500).json({ msg: 'Internal Server Error' });   // Internal Server Error
        else {                                                                  // Everything goes well
            m.name = updMember.name ? updMember.name : m.name;
            m.email = updMember.email ? updMember.email : m.email;
            m.save((err, doc) => {
                res.json(doc);
            });
        }
    });
});

// Delete member
router.delete('/:id', (req, res) => {
    Member.deleteOne({ _id: req.params.id }, (err) => {
        if (err) res.status(404).json({ msg: 'User not found' });                // Id not existing in db
        // Add internal Server Error
        else {                                                                  // Everything goes well
            res.json({ msg: 'User deleted successfully' });
        }
    })
});

module.exports = router;
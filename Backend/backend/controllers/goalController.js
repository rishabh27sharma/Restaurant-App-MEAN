const asyncHandler = require('express-async-handler')

const Restaurent = require('../models/restaurentModel')

// @desc Get Restaurents
// @route GET /api/restaurents
// @access Private
const getRestaurents = asyncHandler(async (req, res) => {
    const restaurents = await Restaurent.find()
    res.status(200).json(restaurents);

    // res.status(200).json({ message: 'Get Goals' });
})

// @desc Set Restaurent
// @route POST /api/restaurents
// @access Private
const setRestaurent = asyncHandler(async (req, res) => {
    if (!req.body.name) {
        res.status(400)
        throw new Error('Please add name field')
    }

    const newRestaurent = new Restaurent({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        address: req.body.address,
        services: req.body.services,
    });

    newRestaurent.save()
    res.status(200).json(newRestaurent);

    // res.status(200).json({ message: 'Set Goals' });
})

// @desc Update Restaurent
// @route PUT /api/restaurents/:id
// @access Private
const updateRestaurent = asyncHandler(async (req, res) => {
    const requestedId = req.params.id;
    const restaurent = await Restaurent.findById(requestedId)

    if (!restaurent) {
        res.status(400)
        throw new Error('Restaurent Not Found');
    }

    const updatedRestaurent = await Restaurent.findByIdAndUpdate(requestedId, req.body, { new: true })

    res.status(200).json(updatedRestaurent);


    // res.status(200).json({ message: `Update goal ${req.params.id}` });
})

// @desc Delete Restaurent
// @route DELETE /api/restaurents/:id
// @access Private
const deleteRestaurent = asyncHandler(async (req, res) => {
    const requestedId = req.params.id;
    const restaurent = await Restaurent.findByIdAndRemove(requestedId)

    if (!restaurent) {
        res.status(400)
        throw new Error('Restaurent Not Found');
    }

    res.status(200).json({ id: req.params.id });

    // res.status(200).json({ message: `Delete goal ${req.params.id}` });
})

module.exports = {
    getRestaurents,
    setRestaurent,
    updateRestaurent,
    deleteRestaurent
}
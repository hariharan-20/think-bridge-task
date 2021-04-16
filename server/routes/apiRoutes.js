const express = require('express')

const router = express.Router()
const Inventory = require('../models/inventory')

router.get('/GetAll', async (req, res) => {
    try {
        const data = await Inventory.find({})
        console.log(data)
        res.status(200).send({ data })

    } catch (err) {
        res.status(500).json({
            error: {
                message: 'something went wrong'
            }
        })
    }
})

router.get('/GetOne', async (req, res) => {
    try {

        const { id } = req.body || ''
        console.log(req.body)
        if(!id) {
            return res.status(400).json({
                error: {
                    message: 'Select any data to edit'
                }
            })
        }

        const data = await Inventory.find({_id:id})
        console.log(data)
        res.status(200).send({ data })

    } catch (err) {
        res.status(500).json({
            error: {
                message: 'something went wrong'
            }
        })
    }
})

router.post('/Edit', async (req, res) => {
    try {
        // console.log(req.body)
        const { id, data } = req.body || ''
        if(!id || !data) {
            return res.status(400).json({
                error: {
                    message: 'Select any data to edit'
                }
            })
        }

        const newData = await Inventory.findByIdAndUpdate({_id: id}, data)
        console.log(newData)
        res.status(200).send({ msg: 'update successfull', newData })

    } catch (err) {
        res.status(500).json({
            error: {
                message: 'something went wrong'
            }
        })
    }
})

router.post('/Delete', async (req, res) => {
    console.log(req.body)
    try {
        const { id } = req.body || ''

        if(!id) {
            return res.status(400).json({
                error: {
                    message: 'Select any data to delete'
                }
            })
        }

        const data = await Inventory.findByIdAndDelete({_id: id})

        console.log(data)
        res.status(200).send({ msg: 'delete successfull', data })

    } catch (err) {
        res.status(500).json({
            error: {
                message: 'something went wrong'
            }
        })
    }
})

router.post('/SaveData', async (req, res) => {
    try {
        console.log(req.body);
        const { name, description, quantity, price } = req.body || ''
        if (!name || !description || !quantity || !price) {
            return res.status(400).json({
                error: {
                    message: 'Enter All details'
                }
            })
        }
        // const relationPerson= await Table.find({name:relation});
        // if(!relationPerson){
        //     return res.status(400).json()
        // }
        // const payload= {
        //     name:name,
        //     tag:tag,
        //     relation:relation
        // } 
        // const tableData= await Table.create(payload)

        const newInventoryData = new Inventory()        

        newInventoryData.name = name
        newInventoryData.description = description
        newInventoryData.price = price
        newInventoryData.quantity = quantity

        // console.log(newInventoryData)
        await newInventoryData.save()

        res.status(200).send({ newInventoryData })

    } catch (err) {
        res.status(500).json({
            error: {
                message: 'something went wrong'
            }
        })
    }
})

module.exports = router
const Address = require('../models/Address')
const AdminCode = require('../models/AdminCode')


class Controllers {
  async add(req, res) {
    const {street, house, code, coors} = req.body
    console.log(street, house, code, coors);
    const address = await Address.findOne({street, house, code, coors})
    if(address) {
      return res.json({status: 'Failed'})
    }
    const newAddress = await new Address({street, house, code, coors})
    newAddress.save()
    return res.json({status: 'Success'})
  }

  async get(req, res) {
    const {limitAddress} = req.body
    // console.log(parseInt(limitAddress));
    const addresses = await Address.find({}, null, {limit: parseInt(limitAddress)})
    const count = await Address.count()
    console.log(count);


    return res.send({addresses, count})
  }

  async getOne(req, res) {
    // const password = 'S3RL_Rave_on'


    const {street, house} = req.body
    const filterStreet = street[0].toUpperCase() + street.slice(1)
    console.log(filterStreet);
    const address = await Address.findOne({filterStreet, house})
    if(!address) {
      return res.sendStatus(404).end()
    }
    return res.json(address)
  }

  async getPartWord(req, res) {
    const address = await Address.find()

    const street = req.body.part
    const upperStreet = street.charAt(0).toUpperCase() + street.slice(1)


    let filterAddress = address.filter(item => item.street.indexOf(upperStreet) >= 0)


    if(filterAddress.length === 0) {
      const firstLetter = street.charAt(0)
      filterAddress = address.filter(item => item.street.indexOf(firstLetter) === 0)
      const filterStreet = filterAddress.map(item => item.street)

      const possibleStreet = filterStreet.filter(function(item, pos) {
          return filterStreet.indexOf(item) == pos;
      })
    }


    if(filterAddress.length === 0) {
      return res.sendStatus(404).end()
    }

    return res.json(filterAddress)
  }

  async getStreet(req, res) {
    const {street} = req.body
    const address = await Address.find({street})
    return res.json(address)
  }


  async delete(req, res) {
    const {street, house} = req.body
    const address = await Address.findOne({street, house})

    if(!address) {
      return res.json({status: 'error'})
    }
    await Address.deleteOne({street, house})
    return res.json({status: 'delete'})
  }

  async update(req, res) {
    const {street, house, code} = req.body

    await Address.findOneAndUpdate({street, house}, {code}, {upsert: true}, function(err, doc) {
      if (err) return res.send(500, {error: err});
      return res.send('Succesfully saved.');
    })




    // return res.json({status: 'Updated'})
  }



}

module.exports = new Controllers()

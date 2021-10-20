const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  Product.findAll({
    attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
    include: [
        {
            model: Category,
            attributes: ['id', 'category_name']
        },
        {
            model: Tag,
            attributes: ['id', 'tag_name']
        }
    ]
})
    .then(dbProductData => res.json(dbProductData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// get one product
router.get('/:id', (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  Product.findOne({
    where: {
        id: req.params.id
    },
    attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
    include: [
        {
            model: Category,
            attributes: ['id', 'category_name']
        },
        {
            model: Tag,
            attributes: ['id', 'tag_name']
        }
    ]
})
    .then(dbProductData => {
        if (!dbProductData) {
            res.status(404).json({ message: 'No product found with this id' });
            return;
        }
        res.json(dbProductData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


router.post('/', (req, res) => {
  // create a new product
    Product.create({
      product_name: req.body.product_name,
      price: req.body.price, 
      stock: req.body.stock, 
    })
      .then(dbProductData => res.json(dbProductData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});


router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Product.update(req.body, {
    where: {
        id: req.params.id
    }
})
    .then(dbProductData => {
        if (!dbProductData[0]) {
            res.status(404).json({ message: 'No Product with this ID' });
            return;
        }
        res.json(dbProductData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete product by its ID
  Product.destroy({
    where: {
        id: req.params.id
    }
})
    .then(dbProductData => {
        if (!dbProductData) {
            res.status(404).json({ message: 'No product found with this id' });
            return;
        }
        res.json(dbProductData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;

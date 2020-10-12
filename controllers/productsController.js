module.exports = {
    getAll: function (req, res, next) {
        const products = [
            {
                id: 1,
                name: "Moto G",
                price: 1000
            },
            {
                id: 2,
                name: "Moto X",
                price: 1500
            }
        ];
        res.json(products);
    },
    getById: function (req, res, next) {
        const product = {
            id: 1,
            name: "Moto G",
            price: 1000
        };
        res.json(product);
    },
    create: function(req, res, next){

    },
    update: function(req, res, next){

    },
    delete: function(req, res, next){
        
    }
}
class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }

    async getAllOrders(req, res, next) {
        try {
            const orders = await this.orderService.getAllOrders();
            return res.json(orders);
        } catch (err) {
            return next(err);
        }
    }

    async getOrderById(req, res, next) {
        try {
            const {orderId} = req.params;
            const order = await this.orderService.getOrderById(orderId);
            return res.render("order", {order});
        } catch (err) {
            return next(err);
        }
    }

    async getOrdersByIds(req, res, next) {
        try {
            const reqList = req.body.orderIds;
            const orders = await this.orderService.getOrdersByIds(reqList);
            console.log("check: " + JSON.stringify(orders));
            return res.json(orders);
        } catch (err) {
            return next(err);
        }
    }

    async removeItem(req, res, next) {
        try {
            const {itemId} = req.params;
            await this.orderService.removeItem(itemId);
            return res.json({message: "Item removed successfully"});
        } catch (err) {
            return next(err);
        }
    }

    async buyOrder(req, res, next) {
        try {
            const {orderId} = req.params;
            await this.orderService.buyOrder(orderId);
            return res.json({message: "Order purchased successfully"});
        } catch (err) {
            return next(err);
        }
    }

    async addOrder(req, res, next) {
        try {
            const {userId, email, status, items} = req.body;
            await this.orderService.addOrder({userId, email, status, items});
            return res.json({message: "Order added successfully"});
        } catch (err) {
            return next(err);
        }
    }
}

module.exports = OrderController;

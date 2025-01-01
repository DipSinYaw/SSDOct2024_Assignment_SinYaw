class OrderController {
  constructor(orderService) {
    this.orderService = orderService;
  }

  async getAllOrders(req, res, next) {
    try {
      const orders = await this.orderService.getAllOrders();
      return res.render("orders", { orders });
    } catch (err) {
      return next(err);
    }
  }

  async removeItem(req, res, next) {
    try {
      const { itemId } = req.params;
      await this.orderService.removeItem(itemId);
      return res.json({ message: "Item removed successfully" });
    } catch (err) {
      return next(err);
    }
  }

  async buyOrder(req, res, next) {
    try {
      const { orderId } = req.params;
      await this.orderService.buyOrder(orderId);
      return res.json({ message: "Order purchased successfully" });
    } catch (err) {
      return next(err);
    }
  }

  async addOrder(req, res, next) {
    try {
      const { userId, email, status, items } = req.body;
      await this.orderService.addOrder({ userId, email, status, items });
      return res.json({ message: "Order added successfully" });
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = OrderController;

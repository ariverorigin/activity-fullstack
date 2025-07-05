export type Order = { id: number; product: string; qty: number; price: number };

type Summary = {
    totalRevenue: number;
    medianOrderPrice: number;
    topProductByQty: string;
    uniqueProductCount: number;
};

export function summarizeOrders(orders: Order[]): Summary {
    if (orders.length === 0) {
        return {
            totalRevenue: 0,
            medianOrderPrice: 0,
            topProductByQty: '',
            uniqueProductCount: 0
        }
    }

    // get totalRevenue
    const totalRevenue = orders.reduce((sum, order) => sum + order.qty * order.price, 0);

    // get medianOrderPrice
    const orderSum = orders.map(order => order.price * order.qty).sort((a, b) => a - b);
    const mid = Math.floor(orderSum.length / 2);
    const medianOrderPrice = orderSum.length % 2 ? orderSum[mid] : (orderSum[mid] + orderSum[mid - 1]) / 2;

    // get topProductByQty
    const productQtyMap = new Map<string, number>();
    orders.forEach(order => {
        productQtyMap.set(order.product, (productQtyMap.get(order.product) || 0) + order.qty);
    });

    let topProductByQty = "";
    let maxQty = 0;
    for (const [product, qty] of productQtyMap.entries()) {
        if (qty > maxQty) {
            maxQty = qty;
            topProductByQty = product;
        }
    }

    // get uniqueProductCount
    const uniqueProductCount = new Set(orders.map(order => order.product)).size;

    return {
        totalRevenue: totalRevenue,
        medianOrderPrice: medianOrderPrice,
        topProductByQty: topProductByQty,
        uniqueProductCount: uniqueProductCount
    }
}
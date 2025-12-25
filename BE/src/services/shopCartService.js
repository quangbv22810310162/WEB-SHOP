import db from "../models/index";


let addShopCart = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.userId || !data.productdetailsizeId || !data.quantity) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter !'
                })
            } else {
                let cart = await db.ShopCart.findOne({ where: { userId: data.userId, productdetailsizeId: data.productdetailsizeId, statusId: 0 }, raw: false })
                if (cart) {
                    let res = await db.ProductDetailSize.findOne({ where: { id: data.productdetailsizeId } })
                    if (res) {
                        let receiptDetail = await db.ReceiptDetail.findAll({ where: { productDetailSizeId: res.id } })
                        let orderDetail = await db.OrderDetail.findAll({ where: { productId: res.id } })
                        let quantity = 0
                        for (let j = 0; j < receiptDetail.length; j++) {
                            quantity = quantity + receiptDetail[j].quantity
                        }
                        for (let k = 0; k < orderDetail.length; k++) {
                            let order = await db.OrderProduct.findOne({ where: { id: orderDetail[k].orderId } })
                            if (order.statusId != 'S7') {

                                quantity = quantity - orderDetail[k].quantity
                            }
                        }
                        res.stock = quantity
                    }



                    if (data.type === "UPDATE_QUANTITY") {

                        if (+data.quantity > res.stock) {
                            resolve({
                                errCode: 2,
                                errMessage: `Only ${res.stock} products`,
                                quantity: res.stock
                            })
                        } else {
                            cart.quantity = +data.quantity
                            await cart.save()
                        }
                    } else {

                        if ((+cart.quantity + (+data.quantity)) > res.stock) {
                            resolve({
                                errCode: 2,
                                errMessage: `Only ${res.stock} products`,
                                quantity: res.stock
                            })
                        } else {
                            cart.quantity = +cart.quantity + (+data.quantity)
                            await cart.save()
                        }
                    }

                }
                else {
                    let res = await db.ProductDetailSize.findOne({ where: { id: data.productdetailsizeId } })
                    if (res) {
                        let receiptDetail = await db.ReceiptDetail.findAll({ where: { productDetailSizeId: res.id } })
                        let orderDetail = await db.OrderDetail.findAll({ where: { productId: res.id } })
                        let quantity = 0
                        for (let j = 0; j < receiptDetail.length; j++) {
                            quantity = quantity + receiptDetail[j].quantity
                        }
                        for (let k = 0; k < orderDetail.length; k++) {
                            let order = await db.OrderProduct.findOne({ where: { id: orderDetail[k].orderId } })
                            if (order.statusId != 'S7') {

                                quantity = quantity - orderDetail[k].quantity
                            }
                        }
                        res.stock = quantity
                    }

                    if (+data.quantity > res.stock) {
                        resolve({
                            errCode: 2,
                            errMessage: `Chỉ còn ${res.stock} sản phẩm`,
                            quantity: res.stock
                        })
                        return;
                    } else {
                        let newCart = await db.ShopCart.create({
                            userId: data.userId,
                            productdetailsizeId: data.productdetailsizeId,
                            quantity: +data.quantity,
                            statusId: 0
                        });
                        
                        if (!newCart || !newCart.id) {
                            resolve({
                                errCode: 3,
                                errMessage: 'Không thể thêm vào giỏ hàng, vui lòng thử lại'
                            })
                            return;
                        }
                    }

                }
                resolve({
                    errCode: 0,
                    errMessage: 'ok'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
let getAllShopCartByUserId = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter !'
                })
            } else {
                let res = await db.ShopCart.findAll({
                    where: { userId: id, statusId: 0 }
                })
                let result = [];
                for (let i = 0; i < res.length; i++) {
                    try {
                        let productdetailsizeData = await db.ProductDetailSize.findOne({
                            where: { id: res[i].productdetailsizeId },
                            include: [
                                { model: db.Allcode, as: 'sizeData', attributes: ['value', 'code'] },
                            ],
                            raw: true,
                            nest: true
                        });
                        
                        if (!productdetailsizeData) {
                            console.log(`ProductDetailSize not found for id: ${res[i].productdetailsizeId}`);
                            continue;
                        }
                        
                        let productDetail = await db.ProductDetail.findOne({ 
                            where: { id: productdetailsizeData.productdetailId },
                            raw: true
                        });
                        
                        if (!productDetail) {
                            console.log(`ProductDetail not found for id: ${productdetailsizeData.productdetailId}`);
                            continue;
                        }
                        
                        let productDetailImage = await db.ProductImage.findAll({ 
                            where: { productdetailId: productDetail.id },
                            raw: true
                        });
                        
                        if (productDetailImage && productDetailImage.length > 0) {
                            for (let j = 0; j < productDetailImage.length; j++) {
                                if (productDetailImage[j].image) {
                                    productDetailImage[j].image = new Buffer(productDetailImage[j].image, 'base64').toString('binary');
                                }
                            }
                        }
                        
                        let productData = await db.Product.findOne({ 
                            where: { id: productDetail.productId },
                            raw: true
                        });
                        
                        if (!productData) {
                            console.log(`Product not found for id: ${productDetail.productId}`);
                            continue;
                        }
                        
                        result.push({
                            id: res[i].id,
                            userId: res[i].userId,
                            productdetailsizeId: res[i].productdetailsizeId,
                            quantity: res[i].quantity,
                            statusId: res[i].statusId,
                            productdetailsizeData: productdetailsizeData,
                            productDetail: productDetail,
                            productDetailImage: productDetailImage,
                            productData: productData
                        });
                    } catch (error) {
                        console.error(`Error processing cart item ${res[i].id}:`, error);
                        continue;
                    }
                }
                
                resolve({
                    errCode: 0,
                    data: result
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
let deleteItemShopCart = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter !'
                })
            } else {
                let res = await db.ShopCart.findOne({ where: { id: data.id, statusId: 0 } })
                if (res) {
                    await db.ShopCart.destroy({
                        where: { id: data.id }
                    })
                    resolve({
                        errCode: 0,
                        errMessage: 'ok'
                    })
                }
            }
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    addShopCart: addShopCart,
    getAllShopCartByUserId: getAllShopCartByUserId,
    deleteItemShopCart: deleteItemShopCart
}
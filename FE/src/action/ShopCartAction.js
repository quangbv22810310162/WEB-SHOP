import { SHOP_CART } from '../utils/constant';
import { addShopCartService, getAllShopCartByUserIdService } from '../services/userService';
import { toast } from 'react-toastify';


export const addItemCartStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await addShopCartService(data);

            if (res && res.errCode === 0) {
                dispatch(getItemCartStart(data.userId))
                dispatch(addItemCartSuccess())
                toast.success("Đã thêm vào giỏ hàng thành công!")
            } else {
                dispatch(addItemCartFaild());
                toast.error(res.errMessage || "Không thể thêm vào giỏ hàng")
            }
        } catch (error) {
            dispatch(addItemCartFaild());
            toast.error("Lỗi kết nối, vui lòng thử lại")
            console.error("Error adding to cart:", error);
        }
    }
}

export const addItemCartSuccess = () => {
    return {
        type: SHOP_CART.ADD_ITEM_CART_SUCCESS,
    }
}
export const addItemCartFaild = () => {
    return {
        type: SHOP_CART.ADD_ITEM_CART_FAILD,
    }
}
export const getItemCartStart = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllShopCartByUserIdService(id);
            console.log("Get cart response:", res);
            if (res && res.errCode === 0 && res.data) {
                console.log("Cart data:", res.data);
                dispatch(getItemCartSuccess(res.data))
            } else {
                console.log("Get cart failed:", res);
                dispatch(getItemCartSuccess([])); // Set empty array instead of fail
            }
        } catch (error) {
            console.error("Error getting cart:", error);
            dispatch(getItemCartSuccess([])); // Set empty array on error
        }
    }
}
export const getItemCartSuccess = (data) => {
    return {
        type: SHOP_CART.GET_ITEM_CART_SUCCESS,
        data: data
    }
}
export const getItemCartFaild = () => {
    return {
        type: SHOP_CART.GET_ITEM_CART_FAILD,
    }
}

export const ChooseVoucherStart = (data) => {
    return {
        type: SHOP_CART.CHOOSE_VOUCHER_START,
        data: data
    }
}
export const ChooseTypeShipStart = (data) => {
    return {
        type: SHOP_CART.CHOOSE_TYPESHIP_START,
        data: data
    }
}
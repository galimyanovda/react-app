import {
    ADD_TARIFF,
    ADD_ORDER,
    EDIT_ORDER_NAME,
    EDIT_ORDER_AUTHOR,
    REMOVE_ORDER,
    DOWNLOAD_ORDERS_DATA

} from './actions';

const initialState = {
    tariffs: []
};

export default function reducer(state=initialState, {type, payload}) {
    
    state.tariffs.sort(function(a, b) {
        if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
         if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
         return 0;
        });
    switch(type) {
    case ADD_TARIFF:
        return {
            ...state,
            tariffs: [
                ...state.tariffs, payload
            ]
        };
    case ADD_ORDER:
        return {
            ...state,
            tariffs: state.tariffs.map((orderArr, index) => (
                index === payload.orderArrId ? {
                    ...orderArr,
                    orders: [...orderArr.orders, payload.order]
                }
                : orderArr
            ))
        };
    case EDIT_ORDER_NAME:
        return {
            ...state,
            tariffs: state.tariffs.map((orderArr, index) => (
                index === payload.orderArrId ? {
                    ...orderArr,
                    orders: orderArr.orders.map((order, indexOrder) => (
                        indexOrder === payload.orderId ? {
                            ...order,
                            name: payload.newName
                        }
                        : order
                    ))
                }
                : orderArr
            ))
        };
    case EDIT_ORDER_AUTHOR:
        return {
            ...state,
            tariffs: state.tariffs.map((orderArr, index) => (
                index === payload.orderArrId ? {
                    ...orderArr,
                    orders: orderArr.orders.map((order, indexOrder) => (
                        indexOrder === payload.orderId ? {
                            ...order,
                            author: payload.newAuthor
                        }
                        : order
                    ))
                }
                : orderArr
            ))
        };
    case REMOVE_ORDER:
        return {
            ...state,
            tariffs: state.tariffs.map((orderArr, index) => (
                index === payload.orderArrId ? {
                    ...orderArr,
                    orders: orderArr.orders.filter((order, orderIndex) => (orderIndex !== payload.orderId))
                }
                : orderArr
            ))
        };
    case DOWNLOAD_ORDERS_DATA:
        return {
            ...state,
            tariffs: payload
        };

    default:
        return state;
    }
    
};


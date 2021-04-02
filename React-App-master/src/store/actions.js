const ADD_TARIFF = 'ADD_TARIFF';
const ADD_ORDER = 'ADD_ORDER';
const EDIT_ORDER_NAME = 'EDIT_ORDER_NAME';
const EDIT_ORDER_AUTHOR = 'EDIT_ORDER_AUTHOR';
const REMOVE_ORDER = 'REMOVE_ORDER';
const DOWNLOAD_ORDERS_DATA = 'DOWNLOAD_ORDERS_DATA';



const addTariffAction = (orderArr) => ({
    type: ADD_TARIFF,
    payload: orderArr
});

const addOrderAction = ({ order, orderArrId }) => ({
    type: ADD_ORDER,
    payload: { order, orderArrId }
});

const editOrderNameAction = ({ orderId, orderArrId, newName }) => ({
    type: EDIT_ORDER_NAME,
    payload: { orderId, orderArrId, newName }
});

const editOrderAuthorAction = ({ orderId, orderArrId, newAuthor }) => ({
    type: EDIT_ORDER_AUTHOR,
    payload: { orderId, orderArrId, newAuthor }
});

const removeOrderAction = ({ orderId, orderArrId }) => ({
    type: REMOVE_ORDER,
    payload: { orderId, orderArrId }
});

const downloadOrdersDataAction = (tariffs) => ({
    type: DOWNLOAD_ORDERS_DATA,
    payload: tariffs
});



export {
    ADD_TARIFF,
    ADD_ORDER,
    EDIT_ORDER_NAME,
    EDIT_ORDER_AUTHOR,
    REMOVE_ORDER,
    DOWNLOAD_ORDERS_DATA,
    addTariffAction,
    addOrderAction,
    editOrderNameAction,
    editOrderAuthorAction,
    removeOrderAction,
    downloadOrdersDataAction,

};

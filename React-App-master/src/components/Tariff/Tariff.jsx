import { PureComponent } from 'react';
import { connect } from 'react-redux';
import './Tariff.css';

import { addOrder } from '../../model/model';

import Order from '../Order/Order';
import { addOrderAction } from '../../store/actions';


class Tariff extends PureComponent {

    onOrderAdd = async () => {
        let orderName = prompt('Введите описание услуги', '');
        if (!orderName || !orderName.trim()) {
            alert('Невалидное описание услуги!');
            return;
        }
        orderName = orderName.trim();

        let orderAuthor = prompt('Введите стоимость', '').trim();
        if (!orderAuthor || !orderAuthor.trim()) {
            alert('Невалидная стоимость!');
            return;
        }

        orderAuthor = orderAuthor.trim();
        const newOrderData = {
            order: {
                name: orderName,
                author: orderAuthor
            },
            orderArrId: this.props.orderArrId
        };

        await addOrder(newOrderData);
        this.props.addOrderDispatch(newOrderData);
    }

    render() {
        const orderArrId = this.props.orderArrId;
        const orderArr = this.props.tariffs[orderArrId];

        return (
        <div className="orderarr">
            <header className="orderarr-name">
                { orderArr.name }
            </header>
            <div className="orderarr-orders">
                {orderArr.orders.map((order, index) => (
                    <Order key={`order-${index}`} orderId={index} orderArrId={orderArrId} />
                ))}
            </div>
            <footer className="orderarr-add-task" onClick={this.onOrderAdd}>
                Добавить услугу
            </footer>
        </div>
        );
    }
}

const mapStateToProps = ({ tariffs }) => ({ tariffs });

const mapDispatchToProps = dispatch => ({
    addOrderDispatch: ({ order, orderArrId }) => dispatch(addOrderAction({ order, orderArrId })),
});
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Tariff);

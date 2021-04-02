import { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';

import Tariff from '../Tariff/Tariff';

import { gettariffs, addTariff } from '../../model/model';

import { downloadOrdersDataAction, addTariffAction } from '../../store/actions';
import './App.css';

class App extends PureComponent {

    state = {
        isInputActive: false,
        inputValue: ''
    };

    async componentDidMount() {
        const tariffs = await gettariffs();
        this.props.downloadOrdersDataDispatch(tariffs);
    }

    inputTariff = () => {
        this.setState({
            isInputActive: true
        });
    }

    onKeyDown = async (event) => {
        if (event.key === 'Escape') {
          this.setState({
            isInputState: false,
            inputValue: ''
          });
        }
    
        if (event.key === 'Enter') {
            const orderArrName = this.state.inputValue;

            this.setState({
                isInputState: false,
                inputValue: ''
            })
            const orderArr = { name: orderArrName, orders: [] };
            await addTariff(orderArr);
            this.props.addTariffDispatch(orderArr);
        }
    }
    
    onInputChange = (event) => {
        this.setState({
            inputValue: event.target.value
        });
    }

    render() {
        const { inputValue, isInputActive } = this.state;

        return (
            <Fragment>
                <header id="main-header">
                    Ваши тарифы
                </header>
                <main id="main-container">
                    {this.props.tariffs.map((orderArr, index) => (
                        <Tariff key={`orderarr-${index}`} orderArrId={index}/>
                    ))}
                    <div className="orderarr">
                    {isInputActive && <input
                        type="text"
                        id="add-orderarr-input"
                        placeholder="Название тарифа"
                        value={inputValue}
                        onChange={this.onInputChange}
                        onKeyDown={this.onKeyDown}
                    />}
                    {!isInputActive && <header className="orderarr-name" onClick={this.inputTariff}>
                        Добавить тариф
                    </header>}
                    </div>
                </main>
            </Fragment>
        );
    }
}

const mapStateToProps = ({ tariffs }) => ({ tariffs });

const mapDispatchToProps = dispatch => ({
    addTariffDispatch: (orderArr) => dispatch(addTariffAction(orderArr)),
    downloadOrdersDataDispatch: (tariffs) => dispatch(downloadOrdersDataAction(tariffs)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

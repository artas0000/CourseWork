import React from "react";

class Form extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            fromCity: 'Minsk',
            toCity: 'Oslo',
            allDate: '', 
            minDate: '',
            maxDate: '',
            isCheck: true
        };

        this.reverseCity = this.reverseCity.bind(this);
    }

    componentWillMount() {
        const date = new Date();
        const day = date.getDate();
        const month = (date.getMonth() > 9) ? date.getMonth()+1 : "0" + (date.getMonth()+1);
        const year = date.getFullYear();
        
        const dateMax = new Date(year, +month + 2, day)
        const maxDay = dateMax.getDate();
        const maxMonth = (dateMax.getMonth() > 9) ? dateMax.getMonth()+1 : "0" + (dateMax.getMonth()+1);
        const maxYear = dateMax.getFullYear();

        this.setState({
            allDate: `${year}-${month}-${day}`,
            minDate: `${year}-${month}-${day}`,
            maxDate: `${maxYear}-${maxMonth}-${maxDay}`
        })
    }

    reverseCity(){
        const nowFromCity = this.state.fromCity;
        const nowToCity = this.state.toCity;
        this.setState({
            fromCity: nowToCity,
            toCity: nowFromCity
        });
    }

    handleChange = e => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleChangeCheckbox = e => {
        this.setState({
            isCheck: !this.state.isCheck,
        });
    }
    
    render(){
        
        const { fromCity, toCity, allDate, minDate, maxDate, isCheck } = this.state;

        return(
            <form onSubmit={this.props.scheduleMethod} className="flex">
                <input type="text" name="fromCity" value={fromCity} onChange={this.handleChange} placeholder="Город отправления"/>
                <input type="button" onClick={this.reverseCity}/>
                <input type="text" name="toCity" value={toCity} onChange={this.handleChange} placeholder="Город прибытия"/>
                <input type="date" name="allDate" value={allDate} onChange={this.handleChange} max={maxDate} min={minDate}/>
                <button>Показать рейсы</button>
                <label className="checkbox">
                    <input type="checkbox" defaultChecked={isCheck} onChange={this.handleChangeCheckbox} name="transfer"/>
                        <div className="checkbox__text">
                            Выводить рейсы с пересадками
                        </div>
                </label>
            </form>
        );
    }
}


export default Form;
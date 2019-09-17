import React, {Component} from 'react'



class CurrencyConverter extends Component{
    constructor(props) {
        super(props);
        this.currencies = ["AUD", "CAD", "CHF", "INR", "USD","EUR", "GBP","JPY", "NZD", "CNY", "NGR"]
        this.state = {
            base: "USD",
            other: 'EUR',
            value: 0,
            converted: 0
        };
        this.makeSelection = this.makeSelection.bind(this)
    }

    makeSelection(event){
        const {name,  value} = event.target
        this.setState({
            [name]: value,
            converted: null
        }, this.recalculate);

    }

    recalculate(){
        const value =    parseFloat(this.state.value);
        if(isNaN(value)) {
            return;
        }

      

        fetch("https://api.exchangeratesapi.io/latest?base=USD")
            .then(response => response.json())
            .then(data => {
               
                this.setState({
                    converted: data.rates[this.state.other] * value
                });


            });
    }

    render() {
        return (
            <div className={"container"}>
                <br/>
                <form >
                    <div className={"form-inline"}>

                        <select className={"form-control"} onChange={this.makeSelection} name={"base"} value={this.state.base}>
                            {this.currencies.map(currency => <option key={currency} value={currency}>{currency}</option> )}
                        </select>
                        <input className={"form-control"} type={"number"} onChange={this.makeSelection} name={"value"} value={this.state.value} />
                    </div>
                        <br/>
                    <div className={"form-inline"}>

                        <select className={"form-control"} onChange={this.makeSelection} name={"other"} value={this.state.other}>
                            {this.currencies.map(currency => <option key={currency} value={currency}>{currency}</option> )}
                        </select>
                        <input disabled={true} className={"form-control"} type={"number"} onChange={this.makeSelection} name={"converted"} value={this.state.converted === null ?  "calculating": this.state.converted} />
                    </div>
                </form>
            </div>
        );
    }

}
export default CurrencyConverter

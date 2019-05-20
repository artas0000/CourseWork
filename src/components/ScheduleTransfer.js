import React from "react";

class ScheduleTransfer extends React.Component {
        
    renderTable =() => {
        let number, planeName, route, departureTime, arrivalTime;
        if(this.props.segmentsInfoTransfer){
            number = this.props.segmentsInfoTransfer.map((item, index) => (
                    <tr key={index}>
                    <td>
                        <tr>With transfer</tr>
                        <tr>{item.details[0].thread.number}</tr>
                        <tr>{item.details[2].thread.number}</tr>
                    </td>
                    </tr>
                    ))
            planeName = this.props.segmentsInfoTransfer.map((item, index) => (
                <tr key={index}>
                <td >
                    <tr>With transfer</tr>
                    <tr>{item.details[0].thread.vehicle}</tr>
                    <tr>{item.details[2].thread.vehicle}</tr>
                </td>
                </tr>
                ))
            route = this.props.segmentsInfoTransfer.map((item, index) => (
                <tr key={index}>
                <td >
                    <tr>{item.departure_from.title} - {item.arrival_to.title}</tr>
                    <tr>{item.details[0].from.title} - {item.details[0].to.title}</tr>
                    <tr>{item.details[2].from.title} - {item.details[2].to.title}</tr>
                </td>
                </tr>
                ))
            departureTime = this.props.segmentsInfoTransfer.map((item, index) => (
                <tr key={index}>
                <td >
                    <tr>{item.departure.substr(11, 8) + ' ' + item.departure.substr(19, 6)}</tr>
                    <tr>{item.details[0].departure.substr(11, 8) + ' ' + item.departure.substr(19, 6)}</tr>
                    <tr>{item.details[2].departure.substr(11, 8) + ' ' + item.departure.substr(19, 6)}</tr>
                </td>
                </tr>
                ))
            arrivalTime = this.props.segmentsInfoTransfer.map((item, index) => (
                <tr key={index}>
                <td >
                    <tr>{item.arrival.substr(11, 8) + ' ' + item.arrival.substr(19, 6)}</tr>
                    <tr>{item.details[0].arrival.substr(11, 8) + ' ' + item.arrival.substr(19, 6)}</tr>
                    <tr>{item.details[2].arrival.substr(11, 8) + ' ' + item.arrival.substr(19, 6)}</tr>
                </td>
                </tr>
                ))
        return(<div className="table-responsive"><table className="table">
                <tbody>
                    <tr>
                        <th>Номер рейса</th>
                        <th>Самолёт</th>
                        <th>Маршрут</th>
                        <th>Время вылета</th>
                        <th>Время прибытия</th>
                    </tr>
                <td>{number}</td>
                <td>{planeName}</td>
                <td>{route}</td>
                <td>{departureTime}</td>
                <td>{arrivalTime}</td>
                </tbody>
        </table>
        </div>)
        }
        
    }

    render() {
        console.log(this.props.segmentsInfoTransfer)
        return ( <div >
                {this.renderTable()}
            </div>
        );
    }
}


export default ScheduleTransfer;
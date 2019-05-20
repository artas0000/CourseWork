import React from "react";

class Schedule extends React.Component {
        
    renderTable =() => {
        let row;
        if(this.props.segmentsInfo){
            row = this.props.segmentsInfo.map((item, index) => (
            
                <tr key={index}>
                    <td>{item.thread.number}</td>
                    <td>{item.thread.vehicle}</td>
                    <td>{item.from.title} - {item.to.title}</td>
                    <td>{item.departure.substr(11, 8) + ' ' + item.departure.substr(19, 6)}</td>
                    <td>{item.arrival.substr(11, 8) + ' ' + item.arrival.substr(19, 6)}</td>
                </tr>
            ))
        return(<table>
                <tbody>
                    <tr>
                        <th>Номер рейса</th>
                        <th>Самолёт</th>
                        <th>Маршрут</th>
                        <th>Время вылета</th>
                        <th>Время прибытия</th>
                    </tr>
                {row}
                </tbody>
        </table>)
        }
        
    }

    render() {
        console.log(this.props.segmentsInfo)
        return ( <div >
                {this.renderTable()}
            </div>
        );
    }
}


export default Schedule;
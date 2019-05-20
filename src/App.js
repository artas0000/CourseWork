import React from "react";
import Info from "./components/Info";
import Form from "./components/Form";
import Schedule from "./components/Schedule";
import ErrorInfo from "./components/ErrorInfo";
import ScheduleTransfer from "./components/ScheduleTransfer";

import "./App.css"

const API_KEY_SCHEDULE = "06d78f5c-1ffe-4f3d-b3a8-7e69b952d5d4";
const API_KEY_CITY_CODE = "d5574245-068f-411e-bd9b-48b9715d1475";
const API_KEY_TRANSLATE = "trnsl.1.1.20190509T193515Z.32ea28aa6befc900.b8f70d7ed8736e7b6613f94357cef16cb148038d";

const ERROR_UNCORRECT_CITY = "Введите корректный город";
const ERROR_NULL_FROM_CITY = "Введите город отправления";
const ERROR_NULL_TO_CITY = "Введите город прибытия";
const ERROR_EQUAL_CITY = "Города вылета и прибытия должны отличаться";
const ERROR_NULL_ROUTE = "Между этими городами не осуществляются авиаперелёты";
const ERROR_NEED_TRANSFER = "Выберите поиск рейсов с пересадкой";
const ERROR_NO_TRANSFER = "Доступны прямые рейсы";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      segmentsInfo: false, 
      segmentsInfoTransfer: false,
      error: undefined,
      fromError: undefined,
      toError: undefined
    }
  }

  getCorrectCity(cityName){
    var newCityName = "";
    for(let i of cityName){
      if(i === ' ' || i === '-'){
        continue;
      }
      else{
        newCityName += i;
      }
    }
    return newCityName;
  }

  getSchedule = async (event) => {
    event.preventDefault();
    var fromCityText = event.target.elements.fromCity.value;
    var toCityText = event.target.elements.toCity.value;
    const allDate = event.target.elements.allDate.value;
    const transferCheck = event.target.elements.transfer.checked;
    var langOfSchedule = "en";

    if (fromCityText){
      var api_url_translate = await fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${API_KEY_TRANSLATE}&text=${fromCityText}&lang=en`)
      var dataOfTranslateText = await api_url_translate.json();
      console.log(dataOfTranslateText);
      fromCityText = dataOfTranslateText.text[0];
      if(dataOfTranslateText.lang.substr(0, 2) === "ru"){
        langOfSchedule = dataOfTranslateText.lang.substr(0, 2);
      }
      this.setState({
        error: undefined,
        fromError: undefined
      });
    }
    else{
      this.setState({
        segmentsInfo: false,
        segmentsInfoTransfer: false,
        error: undefined,
        fromError: ERROR_NULL_FROM_CITY
      });
    }
    if (toCityText){
      api_url_translate = await fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${API_KEY_TRANSLATE}&text=${toCityText}&lang=en`)
      dataOfTranslateText = await api_url_translate.json();
      toCityText = dataOfTranslateText.text[0];
      console.log(dataOfTranslateText);
      this.setState({
        error: undefined,
        toError: undefined
      });
    }
    else{
      this.setState({
        error: undefined,
        segmentsInfo: false,
        segmentsInfoTransfer: false,
        toError: ERROR_NULL_TO_CITY
      });
    }

    const api_url_city = await fetch(`https://iatacodes.org/api/v6/cities?api_key=${API_KEY_CITY_CODE}`)
    const dataOfCity = await api_url_city.json();
    var fromCityCode = [];
    var toCityCode = [];
    for (let i in dataOfCity.response) {
      if (this.getCorrectCity(dataOfCity.response[i].name).toLowerCase() === this.getCorrectCity(fromCityText).toLowerCase()) {
        fromCityCode.push(dataOfCity.response[i].code);
      }
    }
    for (let i in dataOfCity.response) {
      if (this.getCorrectCity(dataOfCity.response[i].name).toLowerCase() === this.getCorrectCity(toCityText).toLowerCase()) {
        toCityCode.push(dataOfCity.response[i].code);
        
      }
    }
    console.log(fromCityCode, toCityCode);

    if (fromCityCode.length === 0 || toCityCode.length === 0){
      if(fromCityCode.length === 0  && this.state.fromError === undefined){  
        this.setState({
          segmentsInfo: false,
          segmentsInfoTransfer: false,
          error: undefined,
          fromError: ERROR_UNCORRECT_CITY
        });
      }
      if(toCityCode.length === 0  && this.state.toError === undefined){
        this.setState({
          segmentsInfo: false,
          segmentsInfoTransfer: false,
          error: undefined,
          toError: ERROR_UNCORRECT_CITY
        });
      }
    }
    else if(fromCityCode[0] === toCityCode[0]){
      this.setState({
        segmentsInfo: false,
        error: ERROR_EQUAL_CITY,
        toError: undefined,
        fromError: undefined
      });
    }
    else{
      var doubleBreak = false;
      for (let fromCode of fromCityCode){
        if (doubleBreak){
          break;
        }
        for (let toCode of toCityCode){
          const api_url = await fetch(`http://api.rasp.yandex.net/v3.0/search/?apikey=${API_KEY_SCHEDULE}&format=json&from=${fromCode}&to=${toCode}&lang=${langOfSchedule}_RU&page=1&date=${allDate}&transport_types=plane&system=iata&transfers=${transferCheck}`);
          const data = await api_url.json();
          console.log(data);
          if(!transferCheck){
            if (data.pagination.total === 0){
              this.setState({
                segmentsInfo: false,
                segmentsInfoTransfer: false,
                error: ERROR_NEED_TRANSFER
              });
            }
            else{
              this.setState({
              segmentsInfo: data.segments,
              segmentsInfoTransfer: false,
              error: undefined,
              fromError: undefined,
              toError: undefined
            });
            doubleBreak = true;
            break;
          }
          }
          else{
            if (data.pagination.total === 0){
              this.setState({
                segmentsInfo: false,
                segmentsInfoTransfer: false,
                error: ERROR_NULL_ROUTE
              });
            }
            else if (!data.segments[0].has_transfers){
              this.setState({
                segmentsInfo: false,
                segmentsInfoTransfer: false,
                error: ERROR_NO_TRANSFER
              });
              doubleBreak = true;
              break;
            }
            else{
              this.setState({
                segmentsInfo: false,
                segmentsInfoTransfer: data.segments,
                error: undefined,
                fromError: undefined,
                toError: undefined
              });
              doubleBreak = true;
              break;
            }
              console.log(data);
          }
        }
      }
    }
  }

  render() {
    return ( 
      <div className="wrapper">
        <div className="main">
          <div className="container">
            <div className="row justify-content-center">
              <div className="info">
                <Info />
              </div>
              <div className="form">
                <Form scheduleMethod = {this.getSchedule} /> 
                <ErrorInfo 
                fromError = {this.state.fromError}
                toError = {this.state.toError}
                error = {this.state.error}
              />
              </div>
              <div className="table">
                <Schedule segmentsInfo = {this.state.segmentsInfo} /> 
                <ScheduleTransfer segmentsInfoTransfer = {this.state.segmentsInfoTransfer} /> 
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
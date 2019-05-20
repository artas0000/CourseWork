import React from "react";

class ErrorInfo extends React.Component{
    render(){
        return(
            <div className="errors">
                <span className="error">{this.props.fromError}</span>
                <span className="error1">{this.props.toError}</span>
                <span className="error2">{this.props.error}</span>
            </div>
        );
    }
}

export default ErrorInfo;
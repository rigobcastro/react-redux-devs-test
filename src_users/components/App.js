import React from "react";
import ReduxToastr from 'react-redux-toastr'
import { connect } from "react-redux";
import "../stylesheets/main.scss";

// App component
export class App extends React.Component {
  // render
  render() {
    const {children}=this.props;
    // render
    return (
      <div className="container">
        <ReduxToastr
          timeOut={4000}
          newestOnTop={false}
          preventDuplicates
          position="bottom-right"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          progressBar
        />

        <div>{children}</div>
      </div>
    );
  }
}


export default App;

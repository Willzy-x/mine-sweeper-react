import React from 'react';
import TimerCounter from './TimeCounter';

class InfoPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.props.store.getState();
    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    this.setState(this.props.store.getState());
  }

  componentDidMount() {
    this.props.store.subscribe(this.onChange);
  }

  componentWillUnmount() {
    this.props.store.unsubscribe(this.onChange);
  }

  render() {
    return (
      <div className="info-panel container-md">
        <div className="row" >
          <TimerCounter className="col-sm text-left " /> 
          <span className="col-sm text-right badge badge-primary" >
            Number of remaining mines: { this.state.remainingMines }
          </span>
        </div>
      </div>
    );
  }
}

export default InfoPanel;


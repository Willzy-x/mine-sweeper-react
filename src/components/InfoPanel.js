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
      <div className="info-panel">
        <TimerCounter /> 
        <p>{ this.state.remainingMines }</p>
      </div>
    );
  }
}

export default InfoPanel;


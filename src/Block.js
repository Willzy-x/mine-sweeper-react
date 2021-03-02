import React from 'react';

class Block extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      concealed: true
    };

    this.handleBlockClick = this.handleBlockClick.bind(this);
  }


  handleBlockClick() {
    this.setState({
      concealed: false
    });
  }

  render() {
    return (
      <button className="block" onClick={this.handleBlockClick} >
        { this.state.concealed ? "x" : this.props.value }
      </button>
    );
  }
}

export default Block;
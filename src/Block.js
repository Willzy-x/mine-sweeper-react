import React from 'react';

class Block extends React.Component {

  render() {
    const blockStyle = {
      "height": "50px",
      "width": "50px",
      "padding": "5px",
      "background-color": this.props.concealed ? "#F8F8FF" : "#DCDCDC"
    };

    return (
      <button className="block" onClick={ () => this.props.onClickBlock()} style={blockStyle} >
        { this.props.concealed ? "x" : this.props.value }
      </button>
    );
  }
}

export default Block;
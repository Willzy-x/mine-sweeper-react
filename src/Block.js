import React from 'react';

class Block extends React.Component {

  render() {
    var textTemp = this.props.concealed > 0 ? "x" : this.props.value;
    let blockValue = this.props.concealed === 2 ? "🚩" : textTemp;
    const blockStyle = {
      "height": "50px",
      "width": "50px",
      "padding": "5px",
      "backgroundColor": this.props.concealed > 0 ? "#F8F8FF" : "#DCDCDC"
    };

    return (
      <button className="block" onClick={
        (event) => {
          if (event.nativeEvent.ctrlKey) {
            this.props.onClickCtrlBlock();
          } else {
            this.props.onClickBlock();
          }
        }
        } style={blockStyle} >
        { blockValue }
      </button>
    );
  }
}

export default Block;
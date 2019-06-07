import React from "react";
import { Comment, Avatar } from "antd";
import propTypes from "prop-types";
import '../styles/Assisstant.css'

export class Assistant extends React.Component {
  static propTypes = {
    text: propTypes.string.isRequired
  };

  render() {
    return (
      <Comment
        className="Ling-Ling"
        author={<a>Ling Ling</a>}
        avatar={
          <Avatar
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="Han Solo"
          />
        }
        content={this.props.text}
      />
    );
  }
}

import React, {Component} from 'react';
class detailsimg extends Component {
    shouldComponentUpdate(nextProps) {
        if (this.props.content === nextProps.content) {
            return false
        } else {
            return true
        }
    }
    render() {
        return (
            <div
                id="detailsImg"
                dangerouslySetInnerHTML={{
                __html: this.props.content
            }}></div>
        );
    }
}
export default detailsimg;

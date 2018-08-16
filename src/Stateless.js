import { PureComponent } from "react";

export default class extends PureComponent {
  static defaultProps = {
    value: {}
  };
  constructor(props) {
    super(props);
    const { value, beforeMount } = props;
    this.state = value;
    if(beforeMount) beforeMount(value);
  }
  componentDidMount() {
    const { afterMount } = this.props;
    if (afterMount)
      afterMount({ value: this.state, change: this.updateState });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) this.updateState(this.props.value);
  }
  updateState = (nextState = {}) => {
    const { beforeChange, afterChange } = this.props;
    const prevState = this.state;
    if (beforeChange) beforeChange(nextState, prevState);
    this.setState(nextState);
    if (afterChange) afterChange(nextState, prevState);
  };
  render = () =>
    this.props.children({ value: this.state, change: this.updateState });
}

import { PureComponent } from "react";

export default class extends PureComponent {
  static defaultProps = {
    value: {}
  };
  constructor(props) {
    super(props);
    this.state = props.value;
  }
  componentDidMount() {
    if (this.props.onMount)
      this.props.onMount({ value: this.state, change: this.updateState });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) this.updateState();
  }
  updateState = (state = this.props.value) => {
    if (this.props.beforeChange) this.props.beforeChange(state);
    this.setState(state);
    if (this.props.afterChange) this.props.afterChange(state);
  };
  render = () =>
    this.props.children({ value: this.state, change: this.updateState });
}

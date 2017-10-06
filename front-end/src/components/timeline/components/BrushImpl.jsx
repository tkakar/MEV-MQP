import { Brush } from 'recharts';


class BrushImpl extends Brush {
  constructor(props) {
    super(props);
    console.log(this.state);
  }

  componentDidMount() {
    document.getElementById('timeline-chart').addEventListener('wheel', (e) => {
      let delta = 0;

      if (e.deltaY > 0) {
        delta = 1;
      } else if (e.deltaY < 0) {
        if (this.state.startX > 0) {
          delta = -1;
        }
      } else {
        console.log('DeltaY is 0');
      }

      const { startX, endX } = this.state;
      const { x, width, travellerWidth, startIndex, endIndex, onChange } = this.props;

      if (delta > 0) {
        delta = Math.min(
          delta,
          x + width - travellerWidth - endX,
          x + width - travellerWidth - startX,
        );
      } else if (delta < 0) {
        delta = Math.max(delta, x - startX, x - endX);
      }
      const newIndex = this.getIndex({
        startX: startX + delta,
        endX: endX + delta,
      });

      if ((newIndex.startIndex !== startIndex || newIndex.endIndex !== endIndex) && onChange) {
        onChange(newIndex);
      }

      this.setState({
        startX: startX + delta,
        endX: endX + delta,
        slideMoveStartX: e.pageX,
      });

      e.preventDefault();
    }, true);
  }
}

export default BrushImpl;

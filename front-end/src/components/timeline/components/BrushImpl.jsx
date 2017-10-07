import { Brush } from 'recharts';


class BrushImpl extends Brush {
  addScrollHandler = (e) => {
    const { startX, endX } = this.state;
    const { x, width, travellerWidth, startIndex, endIndex, onChange } = this.props;
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


    if (delta > 0) {
      delta = Math.min(
        delta,
        (x + width) - travellerWidth - endX,
        (x + width) - travellerWidth - startX,
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
  }

    addZoomHandler = (e) => {
      e.preventDefault();
      if (this.state.endX - this.state.startX < 2 && e.deltaY > 0) {
        return null;
      }

      // console.log(e)
      let movingTravellerId;
      const { x, width, travellerWidth, onChange } = this.props;
      const params = { startX: this.state.startX, endX: this.state.endX };
      let delta = 0;

      const rand = Math.random();
      // console.log(rand, ' : ', this.props.getmouseZoomLocation() / (this.props.width * 1.05));
      if (rand > this.props.getmouseZoomLocation() / (this.props.width * 1.05)) {
        movingTravellerId = 'endX';
      } else {
        movingTravellerId = 'startX';
      }

      if (e.deltaY > 0) {
        if (movingTravellerId === 'endX') {
          delta = -1;
        } else {
          delta = 1;
        }
      } else if (e.deltaY < 0) {
        if (this.state.startX > 0) {
          if (movingTravellerId === 'endX') {
            delta = 1;
          } else {
            delta = -1;
          }
        }
      } else {
        console.log('DeltaY is 0');
      }

      const prevValue = this.state[movingTravellerId];

      // console.log(this.state.startX);
      // console.log(this.state.endX);
      // console.log(this.state.endX - this.state.startX);
      // console.log(this.props.getmouseZoomLocation() / (this.props.width * 1.05));

      if (delta > 0) {
        delta = Math.min(delta, (x + width) - travellerWidth - prevValue);
      } else if (delta < 0) {
        delta = Math.max(delta, x - prevValue);
      }

      params[movingTravellerId] = prevValue + delta;
      const newIndex = this.getIndex(params);

      this.setState({
        [movingTravellerId]: prevValue + delta,
        brushMoveStartX: e.pageX,
      }, () => {
        if (onChange) {
          onChange(newIndex);
        }
      });

      return null;
    }

    componentDidMount() {
      document.getElementById('timeline-chart').addEventListener('wheel', (e) => {
        if (e.ctrlKey) {
          this.addZoomHandler(e);
        } else {
          this.addScrollHandler(e);
        }
      }, true);
    }
}

export default BrushImpl;

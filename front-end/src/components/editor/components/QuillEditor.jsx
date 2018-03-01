import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Paper from 'material-ui/Paper';
import _ from 'lodash';
import Button from 'material-ui/Button';
import { getReportNarrativeFromID } from '../../../actions/reportActions';
import styles from './QuillEditorStyles';
import annotationColors from './AnnotationColors';
import './NarrativeAnnotator.css';

class QuillEditor extends Component {
  static propTypes = {
    getReportNarrativeFromID: PropTypes.func.isRequired,
    incrementSummary: PropTypes.func,
    classes: PropTypes.shape({
      pdfView: PropTypes.string,
      editorWindow: PropTypes.string,
      paperWindow: PropTypes.string,
      root: PropTypes.string,
      wrapper: PropTypes.string,
      buttonSuccess: PropTypes.string,
      buttonProgress: PropTypes.string,
    }).isRequired,
    primaryid: PropTypes.number,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }),
  }

  static defaultProps = {
    match: {},
    primaryid: null,
    incrementSummary: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      current: {
        reportText: '',
        tags: [],
      },
      saved: {
        reportText: '',
        tags: [],
      },
    };
  }

  componentWillMount() {
    if (this.props.match.params) {
      this.getTextFromID(Number(this.props.match.params.id, 10));
    } else {
      this.getTextFromID(this.props.primaryid);
    }
  }

  componentDidMount() {
    // Auto save the text every 10 seocnds
    window.addEventListener('beforeunload', this.onUnload);
    // this.autosave = setInterval(() => this.saveWork(), 10000);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onUnload);
    // clearInterval(this.autosave);
  }

  onUnload = () => this.saveWork();

  getTextFromID = (id) => {
    if (isNaN(id)) {
      this.setState({
        saving: true,
        success: false,
        loading: false,
      });
    } else {
      this.props.getReportNarrativeFromID(id)
        .then((rows) => {
          if (rows.length > 0) {
            this.setState({
              saving: false,
              success: true,
              loading: false,
              current: {
                reportText: rows[0].report_text,
                tags: rows[0].tags,
              },
              saved: {
                reportText: rows[0].report_text,
                tags: rows[0].tags,
              },
            });
          } else {
            this.setState({
              saving: true,
              success: false,
              loading: false,
            });
          }
        });
    }
  }

  setHeaderStyle(header) {
    this.quill.format('header', header);
  }

  saveWork = () => {
    if (!this.state.saving && !_.isEqual(this.state.current, this.state.saved)) {
      this.setState({
        success: false,
        saving: true,
      });

      const fetchData = {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: this.state.current.reportText,
          tags: this.state.current.tags,
          primaryid: (this.props.match.params)
            ? Number(this.props.match.params.id, 10)
            : this.props.primaryid,
        }),
      };

      fetch(`${process.env.REACT_APP_NODE_SERVER}/savereporttext`, fetchData)
        .then(() => {
          this.props.incrementSummary();
          this.setState({
            saved: this.state.current,
            success: true,
            saving: false,
          });
        })
        .catch(err => console.log(err));
    }
  }

  handleChange = (value) => {
    const drugRE = `background-color: ${annotationColors.drug};`;
    const reactionRE = `background-color: ${annotationColors.reaction};`;
    const dosageRE = `background-color: ${annotationColors.dosage};`;
    const ageRE = `background-color: ${annotationColors.age};`;
    const sexRE = `background-color: ${annotationColors.sex};`;
    const weightRE = `background-color: ${annotationColors.weight};`;
    const indicationRE = `background-color: ${annotationColors.indication};`;
    const interestingRE = `background-color: ${annotationColors.interesting};`;
    const newTags = {};

    const spans = document.getElementById(`${this.props.primaryid}` || 'react-quill')
      .getElementsByClassName('ql-editor')[0]
      .getElementsByTagName('span');

    for (let i = 0; i < spans.length; i += 1) {
      switch (spans[i].getAttribute('style')) {
        case drugRE:
          newTags.drug = (newTags.drug)
            ? newTags.drug.concat(spans[i].innerText)
            : [spans[i].innerText];
          break;
        case reactionRE:
          newTags.reaction = (newTags.reaction)
            ? newTags.reaction.concat(spans[i].innerText)
            : [spans[i].innerText];
          break;
        case dosageRE:
          newTags.dosage = (newTags.dosage)
            ? newTags.dosage.concat(spans[i].innerText)
            : [spans[i].innerText];
          break;
        case ageRE:
          newTags.age = (newTags.age)
            ? newTags.age.concat(spans[i].innerText)
            : [spans[i].innerText];
          break;
        case sexRE:
          newTags.sex = (newTags.sex)
            ? newTags.sex.concat(spans[i].innerText)
            : [spans[i].innerText];
          break;
        case weightRE:
          newTags.weight = (newTags.weight)
            ? newTags.weight.concat(spans[i].innerText)
            : [spans[i].innerText];
          break;
        case indicationRE:
          newTags.indication = (newTags.indication)
            ? newTags.indication.concat(spans[i].innerText)
            : [spans[i].innerText];
          break;
        case interestingRE:
          newTags.interesting = (newTags.interesting)
            ? newTags.interesting.concat(spans[i].innerText)
            : [spans[i].innerText];
          break;
        default:
      }
    }
    this.setState({ success: false, current: { reportText: value, tags: newTags } });
  }

  colorBackground(color) {
    const { index, length } = this.quill.getSelection();
    this.quill.formatText(index, length, 'background', color);
  }

  customToolbar = () => (
    <div id={`react-quill-${this.props.primaryid}`} style={{ padding: '4px' }}>
      <select defaultValue="false" className="ql-header" style={{ height: '36px', margin: '4px' }}>
        <option value="1" />
        <option value="2" />
        <option value="false" />
      </select>
      <Button className="ql-colorBackground" value={annotationColors.drug} style={{ padding: '0px', margin: '4px', background: annotationColors.drug }}>
        Drug
      </Button>
      <Button className="ql-colorBackground" value={annotationColors.reaction} style={{ padding: '0px', margin: '4px', background: annotationColors.reaction }}>
        Adverse Reaction
      </Button>
      <Button className="ql-colorBackground" value={annotationColors.dosage} style={{ padding: '0px', margin: '4px', background: annotationColors.dosage }}>
        Dosage
      </Button>
      <Button className="ql-colorBackground" value={annotationColors.age} style={{ padding: '0px', margin: '4px', background: annotationColors.age }}>
        Age
      </Button>
      <Button className="ql-colorBackground" value={annotationColors.sex} style={{ padding: '0px', margin: '4px', background: annotationColors.sex }}>
        Gender
      </Button>
      <Button className="ql-colorBackground" value={annotationColors.weight} style={{ padding: '0px', margin: '4px', background: annotationColors.weight }}>
        Weight
      </Button>
      <Button className="ql-colorBackground" value={annotationColors.indication} style={{ padding: '0px', margin: '4px', background: annotationColors.indication }}>
        Indication
      </Button>
      <Button className="ql-colorBackground" value="" style={{ padding: '0px', margin: '4px' }}>
        Clear
      </Button>
      <Button className="ql-colorBackground pull-right" value={annotationColors.interesting} style={{ padding: '0px', margin: '4px', background: annotationColors.interesting }}>
        Interesting
      </Button>
    </div>
  )

  modules = {
    toolbar: {
      container: `#react-quill-${this.props.primaryid}`,
      handlers: {
        colorBackground: this.colorBackground,
        header: this.setHeaderStyle,
      },
    },
    history: {
      delay: 500,
      maxStack: 500,
      userOnly: true,
    },
  };

  render() {
    return (
      <div className={`${this.props.classes.pdfView} container`}>
        {/* ====== Quil editor for Annotating the Report Text ====== */}
        <Paper elevation={4} className={this.props.classes.paperWindow}>
          {this.customToolbar()}
          {
            (!this.state.loading)
              ? <ReactQuill
                id={`${this.props.primaryid}` || 'react-quill'}
                value={this.state.current.reportText}
                onChange={this.handleChange}
                modules={this.modules}
                theme="snow"
                readOnly
              />
              : null
          }
        </Paper>

        {/* ====== Save Button Area ====== */}
        <div className={this.props.classes.wrapper}>
          <Button
            raised
            color="primary"
            className={(this.state.success) ? this.props.classes.buttonSuccess : ''}
            disabled={this.state.saving}
            onClick={this.saveWork}
          >
            Save
          </Button>
          {this.state.saving &&
            <CircularProgress
              size={24}
              className={this.props.classes.buttonProgress}
            />}
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { getReportNarrativeFromID },
)(withStyles(styles)(QuillEditor));


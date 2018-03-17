import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, XAxis, YAxis, CartesianGrid, Bar } from 'recharts';
// import Select from 'react-select';
import {Combobox} from 'react-widgets';
import { getTagsinCase, getReportsInCases, getCaseNameByID, getCaseReports,setSearchedReports } from '../../actions/reportActions';
import annotationColors from '../editor/components/AnnotationColors';
import * as JsSearch from 'js-search';
import "react-widgets/dist/css/react-widgets.css";
import lunr from 'lunr';

// import natural from 'natural';
import  natural from './natural.js';
import { Quill } from 'quill';

const styles = {};
class CaseSummary extends Component {

  static propTypes = {
    getTagsinCase: PropTypes.func.isRequired,
    getReportsInCases: PropTypes.func.isRequired,
    getCaseNameByID: PropTypes.func.isRequired,
    getCaseReports: PropTypes.func.isRequired,
    setSearchedReports: PropTypes.func.isRequired,
    summaryCounter: PropTypes.number,
    caseID: PropTypes.number,
    userID: PropTypes.number.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }),
  }

  static defaultProps = {
    caseID: null,
    summaryCounter: 0,
    match: {
      params: {
        id: null,
      },
    },
  }

  constructor(props) {
    super(props);
    this.state = {
      tags: {},
      caseName: '',
      caseDescription: '',
      reportsInCase: [],
      pieChartData: [],
      barChartData: [],
      highlightedWordsData:[],
      highlightedWords:[],
      caseNarratives:[],
      caseNarrativesData:[],
      searchedReports:[],
      searchOption: '',
    };
  }

  componentWillMount() {    
    this.props.getCaseNameByID(this.props.caseID)
      .then(rows => this.setState({
        caseName: (rows[0] ? rows[0].name : ''),
        caseDescription: (rows[0] ? rows[0].description : ''),
      }, () => {
        this.updateSummary();
      }));
  }

  componentWillReceiveProps(incomingProps) {
    if (this.state.summaryCounter !== incomingProps.summaryCounter) {
      this.updateSummary();

      this.setState({
        summaryCounter: incomingProps.summaryCounter,
      });
    }
  }

  getReportTypeData = () => {
    // console.log(getReportsInCases);
    // console.log(this.state.reportsInCase)
    const typeObject = this.state.reportsInCase.reduce((acc, report) => {
      acc[report.type] = (acc[report.type]) ? acc[report.type] + 1 : 1;
      return acc;
    }, {});

    const pieChartData = Object.keys(typeObject).reduce((acc, key) => {
      return acc.concat({ name: key.toUpperCase(), value: typeObject[key] });
    }, []);

    this.setState({
      pieChartData,
    });
  }


  /******* define funciton  */

  getTagData = () => {
   
    const stop_words= ["", 'a','about','above','across','after','again','against','all','almost','alone','along','already','also','although','always','among','an','and','another','any','anybody','anyone','anything','anywhere','are','area','areas','around','as','ask','asked','asking','asks','at','away','b','back','backed','backing','backs','be','became','because','become','becomes','been','before','began','behind','being','beings','best','better','between','big','both','but','by','c','came','can','cannot','case','cases','certain','certainly','clear','clearly','come','could','d','did','differ','different','differently','do','does','done','down','down','downed','downing','downs','during','e','each','early','either','end','ended','ending','ends','enough','even','evenly','ever','every','everybody','everyone','everything','everywhere','f','face','faces','fact','facts','far','felt','few','find','finds','first','for','four','from','full','fully','further','furthered','furthering','furthers','g','gave','general','generally','get','gets','give','given','gives','go','going','good','goods','got','great','greater','greatest','group','grouped','grouping','groups','h','had','has','have','having','he','her','here','herself','high','high','high','higher','highest','him','himself','his','how','however','i','if','important','in','interest','interested','interesting','interests','into','is','it','its','itself','j','just','k','keep','keeps','kind','knew','know','known','knows','l','large','largely','last','later','latest','least','less','let','lets','like','likely','long','longer','longest','m','made','make','making','man','many','may','me','member','members','men','might','more','most','mostly','mr','mrs','much','must','my','myself','n','necessary','need','needed','needing','needs','never','new','new','newer','newest','next','no','nobody','non','noone','not','nothing','now','nowhere','number','numbers','o','of','off','often','old','older','oldest','on','once','one','only','open','opened','opening','opens','or','order','ordered','ordering','orders','other','others','our','out','over','p','part','parted','parting','parts','per','perhaps','place','places','point','pointed','pointing','points','possible','present','presented','presenting','presents','problem','problems','put','puts','q','quite','r','rather','really','right','right','room','rooms','s','said','same','saw','say','says','second','seconds','see','seem','seemed','seeming','seems','sees','several','shall','she','should','show','showed','showing','shows','side','sides','since','small','smaller','smallest','so','some','somebody','someone','something','somewhere','state','states','still','still','such','sure','t','take','taken','than','that','the','their','them','then','there','therefore','these','they','thing','things','think','thinks','this','those','though','thought','thoughts','three','through','thus','to','today','together','too','took','toward','turn','turned','turning','turns','two','u','under','until','up','upon','us','use','used','uses','v','very','w','want','wanted','wanting','wants','was','way','ways','we','well','wells','went','were','what','when','where','whether','which','while','who','whole','whose','why','will','with','within','without','work','worked','working','works','would','x','y','year','years','yet','you','young','younger','youngest','your','yours','z'];
    // const highlightedWordsData = [];
    const highlightedRawWords=[];
    var highlightedWords=[];
    const barChartData = Object.keys(this.state.tags).reduce((acc, key) => {
      return acc.concat({
        name: (key.toUpperCase() === 'SEX') ? 'GENDER' : key.toUpperCase(),
        count: this.state.tags[key].length,
      });
    }, []);

    /********  To get the highlighed words */

    Object.keys(this.state.tags).map((keyName) => {
      var x = this.state.tags[keyName];
      Object.keys(x).map((values) => {
        // console.log(x[values]);
        highlightedRawWords.push(x[values].toLowerCase().split(' '));
      })
    })
      
    /*********** Smooth the 2D array into 1D */
   
    for(var i = 0; i < highlightedRawWords.length; i++){
      highlightedWords = highlightedWords.concat(highlightedRawWords[i]);
    }

    /********* remove trailing commas */
    for(var i = 0; i < highlightedWords.length; i++){
      highlightedWords[i]= highlightedWords[i].replace(/(^,)|(,$)/g, "");
      highlightedWords[i]= highlightedWords[i].replace(/[""().:;|/^%\'5]/g, "");
    }
    // console.log(highlightedWords)

      /********** remove stop words */
    highlightedWords = highlightedWords.filter( function( el ) {
      return stop_words.indexOf( el ) < 0;
    } );

    /************** count each word */
    var counts = {};
    for (var i = 0; i < highlightedWords.length; i++) {
      var num = highlightedWords[i];
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    /**************  create frequency table sort of data */

    const highlightedWordsData = Object.keys(counts).reduce((acc, key) => {
      return acc.concat({
        name:key,
        count: counts[key],
      });
    }, []);

    

    // console.log(highlightedWords)

    this.setState({
      barChartData,
      highlightedWordsData,
      highlightedWords,
    });
  }

  updateSummary = () => {
    this.props.getTagsinCase(this.props.caseID)
      .then((tags) => {
        const combinedTags = tags.reduce((acc, row) => {
          Object.keys(JSON.parse(row.tags)).forEach((key) => {
            acc[key] = (acc[key])
              ? acc[key].concat(JSON.parse(row.tags)[key])
              : JSON.parse(row.tags)[key];
          });
          return acc;
        }, {});
        this.setState({
          tags: { ...combinedTags },
        }, () => {
          this.updateGraphs();
        });
      });
  }

  updateGraphs = () => {
    /********* reports assigned to the variable */
    this.props.getReportsInCases(this.props.userID, this.state.caseName)
      .then(reports => this.setState({
        reportsInCase: reports,
      }, () => {
        this.getReportTypeData();
        this.getTagData();
      }));
  }

  getCaseNarratives = () => {
    // console.log(this.state.caseNarratives)

    const caseNarrativesData = Object.keys(this.state.caseNarratives).reduce((acc, key) => {
      // console.log(this.props.allReports[key] )
      return acc.concat({
        name:  this.state.caseNarratives[key].primaryid ,
        count: this.state.caseNarratives[key].report_text,
      });
    }, []);

    // console.log(caseNarrativesData)

    
    this.setState({
      caseNarrativesData,
    });

  }

  calculateTfidf = () => {
  console.log(natural);
    // var tfidf = new TfIdf();
    /***************** get all reports text narratives */
    // const allreportsNarrative = Object.keys(this.props.allReports).reduce((acc, key) => {
    //   // console.log(this.props.allReports[key] )
    //   return acc.concat({
    //     name: this.props.allReports[key].primaryid ,
    //     count: this.props.allReports[key].report_text,
    //   });
    // }, []);

    /***************** Calculate Tf-idf */
    // console.log(allreportsNarrative)

    // Object.keys(allreportsNarrative).map((key)=>{
    //   // tfidf.addDocument(allreportsNarrative[key]);
    // })
    // this.props.getCaseReports(this.state.caseName, this.props.userID, {})
    // .then((data) => this.setState({
    //     caseNarratives: data,
    // },()=>{
    //   this.getCaseNarratives();
    // }));
      // console.log(this.state.caseNarrativesData)

  }

  /**
   * Changes the first letter of any word in a string to be capital
   * BEING REUSED IN ReportListing.jsx NEED TO DEAL WITH THIS LATER ! DUPLICATE METHODS
   */
  toTitleCase = str => str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

  COLORS = {
    supportive: '#0CC8E8',
    primary: '#0CE88E',
  };

  /************ when case changes, update the reports */
  handleCaseChange = () => {
    this.props.updateTab(this.state.caseName);
  }

  /**************** when the search button is pressed,  */
  handleSearchCaseChange = () =>{
    this.props.updateTab('searched reports');
    // this.props.updateSearchedTab(this.state.searchedReports);
    // console.log("Helloo")

   
  }

   /*************** When search option changes call the corresponding function and set the state */
   handleSearchOptionChange = (value) => {
    this.setState({searchOption :value,});
    
    if (value=== 'Score Based'){
      this.calculateTfidf();
    }
    else
      this.searchDocs();

  }

  /************** Search and build index to find documents related to highlighted words */
  searchDocs= () => {
    var searchedReports =[];
    var newArr=[]

    if(this.props.allReports){
        var search = new JsSearch.Search('primaryid');
        search.searchIndex = new JsSearch.TfIdfSearchIndex();     
        search.addIndex('report_text');
        search.addDocuments( this.props.allReports)


        // console.log(this.state.highlightedWords, this.props.allReports)
        if(this.state.highlightedWords.length !== 0) {
         var str = this.state.highlightedWords;
         for (var i = 0, length = str.length; i < length; i++) {
            searchedReports.push(search.search(str[i]));
          }
        }

        /************  converting the 2D object array to 1D */
        for(var i = 0; i < searchedReports.length; i++){
            newArr = newArr.concat(searchedReports[i]);
        }

        searchedReports = newArr;

        /******* Removing duplicate objects from array */
        searchedReports= searchedReports.filter((searchedReports, index, self) =>
          index === self.findIndex((t) => (
            t.primaryid === searchedReports.primaryid
          ))
        )

        console.log(searchedReports);
        this.props.setSearchedReports (searchedReports);

    } 
  }

  /*********** Prepare data for keywords barcharts */
  BarChart = ()  => {    
    const total_bars=4;
    const keywords_count= 10;  
    var counter = 0;
    let all_barCharts = [];
    var data=[];

    
    if (this.state.highlightedWordsData.length > 0){
      const data_all = this.state.highlightedWordsData;
      const data_length =  this.state.highlightedWordsData.length;
      const max_value = data_all.reduce((max, p) => p.count > max ? p.count : max, data_all[0].count)

    data_all.sort((a, b) => a.count > b.count?-1:1)
   
      for (var i=0; i<total_bars;i++){
            // let all_barCharts= []
            for(var j=counter; j<counter+keywords_count && j< data_length;j++){   
              data.push(data_all[j])
            }
            // console.log("data", data, this.renderBarChart(data))
            all_barCharts.push(this.renderBarChart(data, max_value,i));
            // console.log(all_barCharts)
            counter=counter+data.length;
            data=[];
      } 
    
    } 
    return all_barCharts; 
  }

  renderBarChart = (barData, d_all,i) => ((barData.length > 0)
  ?(
      <div key={i} style={{ width: '120px', height:'300px', display:'inline-block'}}> 
      <ResponsiveContainer>
          <BarChart
            data={barData}
            layout="vertical"
            // width= {150}
          >
            <XAxis hide={true} dataKey="count" type="number" domain={[0,d_all]} ticks={['']}/>
            <YAxis dataKey="name"  type="category" width={100} interval={0} domain={[0,100]}/>

            <Tooltip
              offset={15}
              cursor={{ stroke: '#424242', strokeWidth: 1 }}
              wrapperStyle={{ padding: '4px', zIndex: 1000 }}
              isAnimationActive={false}
            />
            <Bar dataKey="count" stroke="#444" height={15} barSize= {15} barGap = {0}> 
              {
                barData.map((entry) => 
                  <Cell key= {entry} fill='orange' />
                )
              }
            </Bar>          
          </BarChart>
        </ResponsiveContainer>
    </div>    
    )
    :null)


  renderPieChart = () => ((this.state.pieChartData.length > 0)
    ? (
      <div style={{height:"250px"}}>
        <ResponsiveContainer width="100%" height={200} >
          <PieChart width={200} height={200}>
            <Legend />
            <Pie
              data={this.state.pieChartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={30}
              outerRadius={60}
              fill="#82ca9d"
              paddingAngle={1}
              label
              legendType="circle"
            >
              {
                this.state.pieChartData.map((entry, index) =>
                  <Cell key={entry} fill={this.COLORS[entry.name.toLowerCase()]} />)
              }
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    )
    : null);

  render() { 
    // this.searchDocs();
    // this.calculateTfidf();
    return (
      /*****  casename/case info */
      <div style={{ width: '100%' }} >
        <Button className="pull-right"  style={{marginLeft:'5px', minHeight:'20px', minWidth:'30px'}} onClick={this.handleCaseChange} raised color="primary">Case Reports</Button>
        <Button className="pull-right"  style={{marginLeft:'5px', minHeight:'20px', minWidth:'30px'}} onClick={this.handleSearchCaseChange} raised color="primary">Recommended Reports</Button>
        <Typography type="display1">
          Case Details:
        </Typography>
        <br />
        <div style={{width:'50%', height:'70px', float: 'left', marginBottom:'20px' }}>
          <Typography type="headline">
            {this.toTitleCase(this.state.caseName)}
          </Typography>
          <Typography type="button">
            {this.state.caseDescription || 'No Description' }
          </Typography>
          <Typography type="body1">
            Total Count of Reports: {this.state.reportsInCase.length}
          </Typography>
        </div>
        <div style={{ width:'50%', height:'70px',float: 'left', marginBottom:'20px' }}>
          <Typography type="headline">
              {'Keywords Summary'}
          </Typography>
          <Combobox 
              data={['User Defined Keywords', 'Score Based']}
              defaultValue={"User Defined Keywords"}
              // dropUp
              onChange = {this.handleSearchOptionChange}
          />
        </div>
        <div>
            {this.BarChart()}
        </div> 
        <div>
            {this.renderPieChart()}
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  userID: state.user.userID,
  allReports: state.all_reports.all_reports
});



/**
 * Conect this component to the Redux global State.
 * Maps Redux state to this comonent's props.
 * Gets Redux actions to be called in this component.
 * Exports this component with the proper JSS styles.
 */
export default connect(
  mapStateToProps,
  { getTagsinCase, getReportsInCases, getCaseNameByID , getCaseReports, setSearchedReports},
)(withStyles(styles)(CaseSummary));




import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome';
import { connect } from 'dva'
import moment from 'moment'
import BooleanOption from 'components/BooleanOption';
import { Row, Col, Icon, Card, Tabs, Table, Radio, DatePicker, Tooltip, Menu, Dropdown,Badge, Switch,Select,Form,AutoComplete,Modal } from 'antd'
import { Link, Route, Redirect} from 'dva/router'
import numeral from 'numeral'
import {
  ChartCard, yuan, MiniArea, MiniBar, MiniProgress, Field, Bar, Pie, TimelineChart,
} from '../../components/Charts'
import Trend from '../../components/Trend'
import NumberInfo from '../../components/NumberInfo'
import { getTimeDistance } from '../../utils/utils'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import styles from './EmployeeCompanyTraining.dashboard.less'
import DescriptionList from '../../components/DescriptionList';
import ImagePreview from '../../components/ImagePreview';
import GlobalComponents from '../../custcomponents';
import DashboardTool from '../../common/Dashboard.tool'


const {aggregateDataset,calcKey, defaultHideCloseTrans,
  defaultImageListOf,defaultSettingListOf,defaultBuildTransferModal,
  defaultExecuteTrans,defaultHandleTransferSearch,defaultShowTransferModel,
  defaultRenderExtraHeader,
  defaultSubListsOf,
  defaultRenderExtraFooter,renderForTimeLine,renderForNumbers
}= DashboardTool



const { Description } = DescriptionList;
const { TabPane } = Tabs
const { RangePicker } = DatePicker
const { Option } = Select


const imageList =(employeeCompanyTraining)=>{return [
	 ]}

const internalImageListOf = (employeeCompanyTraining) =>defaultImageListOf(employeeCompanyTraining,imageList)

const optionList =(employeeCompanyTraining)=>{return [ 
	]}

const buildTransferModal = defaultBuildTransferModal
const showTransferModel = defaultShowTransferModel
const internalSettingListOf = (employeeCompanyTraining) =>defaultSettingListOf(employeeCompanyTraining, optionList)
const internalLargeTextOf = (employeeCompanyTraining) =>{

	return null
	

}







const internalRenderExtraHeader = defaultRenderExtraHeader




const internalRenderExtraFooter = defaultRenderExtraFooter
const internalSubListsOf = defaultSubListsOf

const internalSummaryOf = (employeeCompanyTraining,targetComponent) =>{
	
	
	const {EmployeeCompanyTrainingService} = GlobalComponents
	
	return (
	<DescriptionList className={styles.headerList} size="small" col="4">
<Description term="序号">{employeeCompanyTraining.id}</Description> 
<Description term="员工">{employeeCompanyTraining.employee==null?"未分配":employeeCompanyTraining.employee.displayName}
 <Icon type="swap" onClick={()=>
  showTransferModel(targetComponent,"员工","employee",EmployeeCompanyTrainingService.requestCandidateEmployee,
	      EmployeeCompanyTrainingService.transferToAnotherEmployee,"anotherEmployeeId",employeeCompanyTraining.employee?employeeCompanyTraining.employee.id:"")} 
  style={{fontSize: 20,color:"red"}} />
</Description>
<Description term="训练">{employeeCompanyTraining.training==null?"未分配":employeeCompanyTraining.training.displayName}
 <Icon type="swap" onClick={()=>
  showTransferModel(targetComponent,"训练","companyTraining",EmployeeCompanyTrainingService.requestCandidateTraining,
	      EmployeeCompanyTrainingService.transferToAnotherTraining,"anotherTrainingId",employeeCompanyTraining.training?employeeCompanyTraining.training.id:"")} 
  style={{fontSize: 20,color:"red"}} />
</Description>
<Description term="当前状态">{employeeCompanyTraining.currentStatus}</Description> 
	
        {buildTransferModal(employeeCompanyTraining,targetComponent)}
      </DescriptionList>
	)

}


class EmployeeCompanyTrainingDashboard extends Component {

 state = {
    transferModalVisiable: false,
    candidateReferenceList: {},
    candidateServiceName:"",
    candidateObjectType:"city",
    targetLocalName:"城市",
    transferServiceName:"",
    currentValue:"",
    transferTargetParameterName:"",  
    defaultType: 'employeeCompanyTraining'


  }
  componentDidMount() {

  }
  

  render() {
    // eslint-disable-next-line max-len
    const { id,displayName,  } = this.props.employeeCompanyTraining
    if(!this.props.employeeCompanyTraining.class){
      return null
    }
    const cardsData = {cardsName:"员工参与的公司培训",cardsFor: "employeeCompanyTraining",cardsSource: this.props.employeeCompanyTraining,
  		subItems: [
    
      	],
  	};
    //下面各个渲染方法都可以定制，只要在每个模型的里面的_features="custom"就可以得到定制的例子
    
    const renderExtraHeader = this.props.renderExtraHeader || internalRenderExtraHeader
    const settingListOf = this.props.settingListOf || internalSettingListOf
    const imageListOf = this.props.imageListOf || internalImageListOf
    const subListsOf = this.props.subListsOf || internalSubListsOf
    const largeTextOf = this.props.largeTextOf ||internalLargeTextOf
    const summaryOf = this.props.summaryOf || internalSummaryOf
    const renderExtraFooter = this.props.renderExtraFooter || internalRenderExtraFooter
    return (

      <PageHeaderLayout
        title={`${cardsData.cardsName}: ${displayName}`}
        content={summaryOf(cardsData.cardsSource,this)}
        wrapperClassName={styles.advancedForm}
      >
      {renderExtraHeader(cardsData.cardsSource)}
        <div>
        {settingListOf(cardsData.cardsSource)}
        {imageListOf(cardsData.cardsSource)}
        {subListsOf(cardsData)} 
        {largeTextOf(cardsData.cardsSource)}
          
        </div>
      </PageHeaderLayout>
    )
  }
}

export default connect(state => ({
  employeeCompanyTraining: state._employeeCompanyTraining,
}))(Form.create()(EmployeeCompanyTrainingDashboard))


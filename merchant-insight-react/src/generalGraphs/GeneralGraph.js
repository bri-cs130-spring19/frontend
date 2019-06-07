import React from 'react';
import  {Col, Row, Icon, Statistic } from 'antd';


export class GeneralGraph extends React.Component {

    constructor() {
        super();
    }
   
    getCard = (category) => {
        const categorty_type = {
            "Device Type": "bar-chart",
            "Education": "bar-chart",
            "Ethnicity": "bar-chart",
            "Gender": "pie-chart",
            "Household Income": "dot-chart",
            "Likelihood to Recommend": "rise",
            "Likelihood to Buy": "rise",
            "Overall Satisfaction": "smile",
            "Purchase Amount": "dollar",
            }

        const graphType = categorty_type[category];
        console.log(graphType);
        return (
                <Statistic title={category}
                           prefix={<Icon type={graphType} style={{fontSize: '64px'}} className="generalGraphIcon" />}
                           value={1} valueStyle={{fontSize: 0}} className="graph-tile"
                >
                </Statistic>
        )
    }

    state = {
        redirect: false
    }
      
    redirectToDeviceType = () => {
        this.props.history.push('/devicetype')
    }
   
    redirectToEducation = () => {
        this.props.history.push('/education')
    }

    redirectToEthnicity = () => {
        this.props.history.push('/ethnicity');
    }

    redirectToGender = () => {
        this.props.history.push('/gender')
    }
    redirectToHouseHoldIncome = () => {
        this.props.history.push('/householdincome');
    }
    redirectToLikelyRecommend = () => {
        this.props.history.push('/likelyrecommend');
    }
    redirectToLikelyBuy = () => {
        this.props.history.push('/likelybuy');
    }
    redirectToOverallSatis = () => {
        this.props.history.push('/overallsatis');
    }
    redirectToPurchaseAmount = () => {
        this.props.history.push('/purchaseamount');
    }
    render() {
      return (
        

        <div className="generalGraph">
                <Row type="flex" justify="space-between" align="middle">
                    <Col  xs={12} sm={12} md={12} lg={12} xl={8}>

                        <div onClick={this.redirectToDeviceType}>
                            {this.getCard('Device Type')}
                        </div>
                    </Col>
                    <Col  xs={12} sm={12} md={12} lg={12} xl={8}>
                        <div onClick={this.redirectToEducation}>
                            {this.getCard('Education')}
                        </div>
                    </Col>
                    <Col  xs={12} sm={12} md={12} lg={12} xl={8}>
                        <div onClick={this.redirectToEthnicity}>
                            {this.getCard('Ethnicity')}
                        </div>
                    </Col>

                    <Col  xs={12} sm={12} md={12} lg={12} xl={8}>
                        <div onClick={this.redirectToGender}>
                            {this.getCard('Gender')}
                        </div>
                    </Col>

                    <Col  xs={12} sm={12} md={12} lg={12} xl={8}>
                        <div onClick={this.redirectToHouseHoldIncome}>
                            {this.getCard('Household Income')}
                        </div>
                    </Col>
                    <Col  xs={12} sm={12} md={12} lg={12} xl={8}>
                        <div onClick={this.redirectToLikelyRecommend}>
                            {this.getCard('Likelihood to Recommend')}
                        </div>
                    </Col>

                    <Col  xs={12} sm={12} md={12} lg={12} xl={8}>
                        <div onClick={this.redirectToLikelyBuy}>
                            {this.getCard('Likelihood to Buy')}
                        </div>
                    </Col>

                    <Col  xs={12} sm={12} md={12} lg={12} xl={8}>
                        <div onClick={this.redirectToOverallSatis}>
                            {this.getCard('Overall Satisfaction')}
                        </div>
                    
                    </Col>
                    <Col  xs={12} sm={12} md={12} lg={12} xl={8}>
                        <div onClick={this.redirectToPurchaseAmount}>
                            {this.getCard('Purchase Amount')}
                        </div>
                    </Col>
                </Row>
        </div>
        );
    }
}

  
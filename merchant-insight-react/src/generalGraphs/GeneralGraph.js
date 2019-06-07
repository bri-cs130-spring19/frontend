import React from 'react';
import { Card, Col, Row } from 'antd';
import barImg from './images/bar1.png';
import pieImg from './images/pie1.png';




const {Meta} = Card;

export class GeneralGraph extends React.Component {
    constructor() {
        super();
    }
   
    getCard = (category) => {
        return (
            <Card
                hoverable        
                cover={<img alt="example" src={barImg} />}
            >
                <Meta title={category} fontSize={10}  />
            </Card>
        );
    };
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
        this.props.history.push('/ethnicity')
    }

    redirectToGender = () => [
        this.props.history.push('/gender')
    ]
    redirectToHouseHoldIncome = () => {
        this.props.history.push('/householdincome')
    }
    redirectToLikelyRecommend = () => {
        this.props.history.push('/likelyrecommend')
    }
    redirectToLikelyBuy = () => {
        this.props.history.push('/likelybuy')
    }
    redirectToOverallSatis = () => {
        this.props.history.push('/overallsatis')
    }
    redirectToPurchaseAmount = () => {
        this.props.history.push('/purchaseamount')
    }
    render() {
      return (
        
        <div>
            <div style={{ padding: '30px' }}>
                <Row gutter={16}>
                    <Col span={8}>
                        <div onClick={this.redirectToDeviceType}>
                            {this.getCard('Device Type')}
                        </div>
                    </Col>

                    <Col span={8}>
                        <div onClick={this.redirectToEducation}>
                            {this.getCard('Education')}
                        </div>
                    </Col>
                    <Col span={8}>
                        <div onClick={this.redirectToEthnicity}>
                            {this.getCard('Ethnicity')}
                        </div>
                    </Col>
                </Row>
            </div>
            <div style={{ padding: '30px' }}>
                <Row gutter={16}>
                    <Col span={8}>
                        <div onClick={this.redirectToGender}>
                            {this.getCard('Gender')}
                        </div>
                    </Col>

                    <Col span={8}>
                        <div onClick={this.redirectToHouseHoldIncome}>
                            {this.getCard('Household Income')}
                        </div>
                    </Col>
                    <Col span={8}>
                        <div onClick={this.redirectToLikelyRecommend}>
                            {this.getCard('Likely to Recommend')}
                        </div>
                    </Col>
                </Row>
            </div>
            <div style={{ padding: '30px' }}>
                <Row gutter={16}>
                    <Col span={8}>
                        <div onClick={this.redirectToLikelyBuy}>
                            {this.getCard('Likely to Buy')}
                        </div>
                    </Col>

                    <Col span={8}>
                        <div onClick={this.redirectToOverallSatis}>
                            {this.getCard('Overall Satisfaction')}
                        </div>
                    
                    </Col>
                    <Col span={8}>
                        <div onClick={this.redirectToPurchaseAmount}>
                            {this.getCard('Purchace Amount')}
                        </div>
                    </Col>
                </Row>
            </div>

        </div>
        
        );
    }
}

  
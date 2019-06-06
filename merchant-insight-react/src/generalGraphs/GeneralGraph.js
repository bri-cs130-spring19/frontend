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
                <Meta title={category}/>
            </Card>
        );
    };
    state = {
        redirect: false
    }
      
    redirectToDeviceType = () => {
        this.props.history.push('/devicetype')
    }
   
    render() {
      return (
        
        <div>
            <div style={{ background: '#ECECEC', padding: '30px' }}>
                <Row gutter={16}>
                    <Col span={8}>
                        <div onClick={this.redirectToDeviceType}>
                            {this.getCard('Device Type')}
                        </div>
                    </Col>

                    <Col span={8}>
                    {this.getCard('Education')}
                    </Col>
                    <Col span={8}>
                        {this.getCard('Ethnicity')}
                    </Col>
                </Row>
            </div>
            <div style={{ background: '#ECECEC', padding: '30px' }}>
                <Row gutter={16}>
                    <Col span={8}>
                        {this.getCard('Gender')}
                    </Col>

                    <Col span={8}>
                    {this.getCard('Household Income')}
                    </Col>
                    <Col span={8}>
                        {this.getCard('Likely to Recommend')}
                    </Col>
                </Row>
            </div>
            <div style={{ background: '#ECECEC', padding: '30px' }}>
                <Row gutter={16}>
                    <Col span={8}>
                        {this.getCard('Likely to Buy')}
                    </Col>

                    <Col span={8}>
                    {this.getCard('Overall Statisfaction')}
                    </Col>
                    <Col span={8}>
                        {this.getCard('Purchace Amount')}
                    </Col>
                </Row>
            </div>

        </div>
        
        );
    }
}

  
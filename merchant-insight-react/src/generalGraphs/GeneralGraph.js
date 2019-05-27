import React from 'react';
import { Card, Col, Row } from 'antd';
import barImg from './images/bar1.png';
import pieImg from './images/pie1.png';

const {Meta} = Card;

export class GeneralGraph extends React.Component {
    render() {
      return (
        <div>
            <div style={{ background: '#ECECEC', padding: '30px' }}>
                <Row gutter={16}>
                    <Col span={8}>
                        <Card
                            hoverable
                            
                            cover={<img alt="example" src={barImg} />}
                        >
                            <Meta title="Device Type"/>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card
                            hoverable
                            
                            cover={<img alt="example" src={barImg} />}
                        >
                            <Meta title="Education"/>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card
                            hoverable
                            
                            cover={<img alt="example" src={barImg} />}
                        >
                            <Meta title="Ethnicity"/>
                        </Card>
                    </Col>
                </Row>
                
            </div>
            <div style={{ background: '#ECECEC', padding: '30px' }}>
                <Row gutter={16}>
                    <Col span={8}>
                        <Card
                            hoverable
                            
                            cover={<img alt="example" src={barImg} />}
                        >
                            <Meta title="Ethnicity"/>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card
                            hoverable
                            
                            cover={<img alt="example" src={barImg} />}
                        >
                            <Meta title="Ethnicity"/>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card
                            hoverable
                            
                            cover={<img alt="example" src={barImg} />}
                        >
                            <Meta title="Ethnicity"/>
                        </Card>
                    </Col>
                </Row>
                
            </div>
            <div style={{ background: '#ECECEC', padding: '30px' }}>
                <Row gutter={16}>
                    <Col span={8}>
                        <Card
                            hoverable
                            
                            cover={<img alt="example" src={barImg} />}
                        >
                            <Meta title="Ethnicity"/>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card
                            hoverable
                            
                            cover={<img alt="example" src={barImg} />}
                        >
                            <Meta title="Ethnicity"/>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card
                            hoverable
                            
                            cover={<img alt="example" src={barImg} />}
                        >
                            <Meta title="Ethnicity"/>
                        </Card>
                    </Col>
                </Row>
                
            </div>
            
            
           
        </div>
        
        );
    }
}
  
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Layout, Menu, Breadcrumb, Dropdown, Button, Input, Collapse,Select,Icon, Row, Col} from 'antd';

const { Header, Content, Footer } = Layout;
const Option = Select.Option;
const Panel = Collapse.Panel;
const customPanelStyle = {
  background: 'gray',
  borderRadius: 4,
  marginBottom: 24,
  paddingBottom:2,
  border: 0,
  overflow: 'hidden',
};



class App extends Component {
state = {

    title:"",
    subtitle:"",
    text:[],
    group: [],
    sections:[],

  section:{
    title:"",
    text:[],
    group: [],
    sections:[]
  }
}

changeHandlerOperation = (e) =>{
  let value = e.target.value;
  let id = e.target.id

  this.setState(prevState => ({
    ...prevState,
    operations: {
      ...prevState.operations,
      [id]: value
    }
    })
  )
}
changeHandlerSection = (e) =>{
  let value = e.target.value;
  let id = e.target.id

  this.setState(prevState => ({
    ...prevState,
    section: {
      ...prevState.section,
      [id]: value
    }
    })
  )
}

  render() {
    return (
      <Layout className="layout">
      <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
          </Menu>
        </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div >
          <Row style={{justify:"center"}}>
            <Col span={12} offset={6}>
                {this.state.operations.title}-{this.state.operations.subtitle}
            </Col>
          </Row>
        </div>
        <div style={{ background: '#fff', padding: 24 }}>
          <div>
            <Input addonBefore="Manual Title:" defaultValue="" id="title" value={this.state.operations.title} onChange={this.changeHandlerOperation.bind(this)}/>
          </div>  
          <div>
             <Input addonBefore="Manual SubTitle:" defaultValue="" id="subtitle" value={this.state.operations.subtitle} onChange={this.changeHandlerOperation.bind(this)}/>
          </div>  
          <Collapse accordion defaultActiveKey={['1']}>
          <Panel  key="1" style={customPanelStyle}>
            <div style={{ marginBottom: 16 }}>
              <Input addonBefore="Section Title:" defaultValue="" />
            </div>
            <div>
              <AddButton text="Section"/>
              <AddButton text="Group"/>
              <AddButton text="Text"/>
              <AddButton text="Table"/>
            </div>
          </Panel>
          </Collapse> 
            <div>
              <AddButton text="Section"/>
              <AddButton text="Group"/>
              <AddButton text="Text"/>
              <AddButton text="Table"/>
            </div>
          </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
    )
  }
}

class AddButton extends React.Component {
  render() {
      return (
        <Button type="dashed" text={this.props.text} onClick = {this.props.onClick}>
          <Icon type="plus" /> {this.props.text}
        </Button>
      );
  }
}


///addText
//create div pop up
//pop up based on state
// create empty string 
// length of text list add input ie. text:["dfds",""] add to length.state.text 


export default App;

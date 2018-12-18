import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Layout, Menu, Breadcrumb, Dropdown, Button, Input, Collapse,Select,Icon} from 'antd';

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
  operations:{
    title:"",
    subtitle:"",
    sections:[]
  },
  section:{
    title:"",
    text:"",
    group: [],
    sections:[]
  }
}

changeText(e){
  this.setState({title: e.target.value});
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
        <div style={{ background: '#fff', padding: 24 }}>
          <div>
            <Input addonBefore="Manual Title:" defaultValue="" />
          </div>  
          <div>
             <Input addonBefore="Manual SubTitle:" defaultValue="" />
          </div>  
          <Collapse accordion defaultActiveKey={['1']}>
          <Panel header={this.state.operations.title} key="1" style={customPanelStyle}>
            <div style={{ marginBottom: 16 }}>
              <Input addonBefore="Section Title:" defaultValue="" value={this.state.operations.title} onChange={this.changeText}/>
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

export default App;



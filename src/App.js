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
      title: "Submenu",
      text: "text",
      group:["text 1","text2"],
      sections:[{
        title: 'hello',
        text: 'derp'
      }]
  }
  componentDidMount(){
    var main = {
      title:"fgfdg",
      text:"terfd"
    };

    console.log("state", this.state)
   
    this.setState({
      ...this.state,
      sections:[ ...this.state.sections, main]
    })
  }
   
  
  

  render() {
    console.log("sectionmain ",this.state);
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
              <Panel header="Untitled" key="1" style={customPanelStyle}>
                <div style={{ marginBottom: 16 }}>
                  <Input addonBefore="Section Title:" defaultValue="" />
                </div>
                <Collapse accordion defaultActiveKey={['1']}>
                <Panel header="Untitled" key="1" style={customPanelStyle}>
                  <div style={{ marginBottom: 16 }}>
                    <Input addonBefore="Section Title:" defaultValue="" />
                  </div>
                  <div>
                    <AddButton text="" onClick=""/>
                    <AddGroupButton/>
                    <AddTextButton/>
                    <AddTableButton/>
                  </div>
                </Panel>
              </Collapse>
                <div>
                  <AddSectionButton/>
                  <AddGroupButton/>
                  <AddTextButton/>
                  <AddTableButton/>
                </div>
              </Panel>
            </Collapse> 
            <div>
              <AddSectionButton/>
              <AddGroupButton/>
              <AddTextButton/>
              <AddTableButton/>
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

class AddTextButton extends React.Component {
  addText (){
      alert ('Text')
  }
  render() {
      return (
        <Button type="dashed" onClick = {this.props.onClick}>
          <Icon type="plus" /> {this.props.text}}
        </Button>
      );
  }
}

class AddGroupButton extends React.Component {
  addText (){
      alert ('Group')
  }
  render() {
      return (
        <Button type="dashed" onClick = {this.addText}>
          <Icon type="plus" /> Add Group
        </Button>
      );
  }
}

class AddSectionButton extends React.Component {
  addText (){
      alert ('Section')
  }
  render() {
      return (
        <Button type="dashed" onClick = {this.addText}>
          <Icon type="plus" /> Add Section
        </Button>
      );
  }
}
class AddTableButton extends React.Component {
  addText (){
      alert ('Table')
  }
  render() {
      return (
        <Button type="dashed" onClick = {this.addText}>
          <Icon type="plus" /> Add Table
        </Button>
      );
  }
}
export default App;

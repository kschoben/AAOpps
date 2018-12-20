import React, { Component } from 'react';
import './App.css';
import { Layout, Menu, Breadcrumb, Button, Input, Collapse,Icon, Row, Col} from 'antd';

const { Header, Content, Footer } = Layout;
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
  objList = [
    {type:"text", value: "This is a test "},
    {type:"text", value: "This is a test2"},
    {type:"group", value: ["This is a text from group 1","This is a test2"]},
    {type:"section", value: "This is a test4"}
  ];

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
      [id]: value

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

  addText = () =>{
    this.setState(prevState => ({
      text:[...prevState.text,""]
      })
    )
  }

  onTextChange = (e) =>{
    let value = e.target.value;
    let id = parseInt(e.target.id , 10)
    this.setState(prevState =>({
      text:{
        ...prevState,
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
                {this.state.title}-{this.state.subtitle}
            </Col>
          </Row>
        </div>
        <div style={{ background: '#fff', padding: 24 }}>
          <div>
            <Input style={{padding:10}} addonBefore="Manual Title:" defaultValue="" id="title" value={this.state.title} onChange={this.changeHandlerOperation.bind(this)}/>
          </div>  
          <div>
             <Input style={{padding:10}} addonBefore="Manual SubTitle:" defaultValue="" id="subtitle" value={this.state.subtitle} onChange={this.changeHandlerOperation.bind(this)}/>
          </div>  
          {/* <div>
             <Input addonBefore="Manual SubTitle:" defaultValue="" id="0" value={this.state.text[0]} onChange={this.onTextChange.bind(this)}/>
          </div>   */}
          <div>
          {
            this.objList.map((obj,index)=> {
              if(typeof obj.type === typeof ""){
                console.log(obj.type)
                switch(obj.type){
                  case "text":
                    console.log(obj.value)
                      return(
                        <Input style={{padding:10}} key={index} addonBefore="Text:" defaultValue="" id="0" value={this.state.text[0]} onChange={this.onTextChange.bind(this)}/>
                      )
                  case "group":
                      console.log("key: ",index)
                          return(
                                  <div key={index} style={{padding:10}}>
                                      {
                                          obj.value.map((text,index)=>{
                                               return(<Input key={index} value={text} addonBefore="Group:"/>)
                                          })
                                      }
                                  </div>
                              )
                  case "section":
                  console.log(obj.value)
                    return(
                      <Collapse  accordion defaultActiveKey={['1']}>
                          <Panel style={{padding:10}} key="1" style={customPanelStyle}>
                            <div style={{ marginBottom: 16 }}>
                              <Input addonBefore="Section Title:" defaultValue="" />
                            </div>
                            <div>
                              <AddButton text="Section"/>
                              <AddButton text="Group"/>
                              <AddButton text="Text" />
                              <AddButton text="Table" />
                            </div>
                          </Panel>
                      </Collapse>
                    )
                  }
                }
              })
            }
            </div>
            
            <div style={{padding:10}}>
              <AddButton text="Section"/>
              <AddButton text="Group"/>
              <AddButton text="Text" onClick = {this.addText} />
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

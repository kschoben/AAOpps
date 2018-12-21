import React, { Component } from 'react';
import './App.css';
import { Layout, Menu, Breadcrumb, Button, Input, Collapse,Icon, Row, Col} from 'antd';
import update from 'react-addons-update'; // ES6


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

  state = {
    title:"",
    subtitle:"",
    objList:[
    {type:"text", value: "This is a test "},
    {type:"text", value: "This is a test2"},
    {type:"group", value: [{type:"text", value: "This is a test2"}, {type:"text", value: "This is a test2"}]},
    {type:"section", value: "This is a test4"} 
    ]
  }

  changeHandler = (e) =>{
    let value = e.target.value;
    let id = e.target.id

    this.setState(prevState => ({
      ...prevState,
      [id]: value

      })
    )
  }



  addText = () =>{
    
    this.setState(prevState => ({
      objList:[...prevState.objList, {type:"text",value:""} ]
      })
    )
  }

  addGroup = () =>{
    this.setState(prevState => ({
      objList:[...prevState.objList, {type:"group",value:[""]} ]
      })
    )
  }

  addGroupText = (e,id) =>{
    console.log(id)
    this.setState(prevState => ({
      objList: update(this.state.objList, {[id]:{value:{$push:[{type:"text",value:""}]}}})
      })
    )
  }

  onTextChange = (e) =>{
    let val = e.target.value
    let id = e.target.id
      this.setState(({
        objList: update(this.state.objList, {[id]: {value: {$set: val}}})
        })
      )
  }
  onGroupTextChange = (e,key) =>{
    console.log("key:", key)
    console.log("e: ", e)
    let val = e.target.value
    let id = e.target.id
    console.log(val)
    console.log(id)
    console.log(this.state.objList.key)
      this.setState(({
        objList: update(this.state.objList, {[key]:{value:{[id]:{value:{$set: val}}}}})
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
            <Input style={{padding:10}} addonBefore="Manual Title:" defaultValue="" id="title" value={this.state.title} onChange={this.changeHandler.bind(this)}/>
          </div>  
          <div>
             <Input style={{padding:10}} addonBefore="Manual SubTitle:" defaultValue="" id="subTitle" value={this.state.subTitle} onChange={this.changeHandler.bind(this)}/>
          </div>  
          <div>
          {
            this.state.objList.map((obj,index)=> {
              if(typeof obj.type === typeof ""){
                switch(obj.type){
                  case "text":
                      return(
                          <Text  key={index} id={index} value={this.state.objList[index].value} onChange={this.onTextChange.bind(this)} />
                      )

                  case "group":
                      return(
                        <div key={index}  style={{padding:10}}>
                          <Group id={index} group={this.state.objList[index]} onClick = {this.addGroupText} onChange={this.onGroupTextChange} /> 
                        </div>
                      )

                  // case "section":
                  // console.log(obj.value)
                  //   return(
                  //     <Collapse  accordion defaultActiveKey={['1']}>
                  //         <Panel style={{padding:10}} key="1" style={customPanelStyle}>
                  //           <div style={{ marginBottom: 16 }}>
                  //             <Input addonBefore="Section Title:" defaultValue="" />
                  //           </div>
                  //           <div>
                  //             <AddButton text="Section"/>
                  //             <AddButton text="Group"/>
                  //             <AddButton text="Text" />
                  //             <AddButton text="Table" />
                  //           </div>
                  //         </Panel>
                  //     </Collapse>
                  //   )
                  }
                }
              })
            }
            </div>
            
            <div style={{padding:10}}>
              <AddButton text="Section"/>
              <AddButton text="Group" onClick = {this.addGroup}/>
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
class Text extends React.Component {
  render() {
    return(
      <Input style={{padding:10}} key={this.props.index}  addonBefore="Text:" id={this.props.id} value={this.props.value} onChange={this.props.onChange}/>
    )
  }
}

class Group extends React.Component {
  render() {
    const { group, id } = this.props
    return(
      <div>
      {group.value.map((text,groupIndex)=>{
        return( 
            <Input addonBefore="Group:" key={groupIndex} id={groupIndex} value={text.value} onChange={(e) => this.props.onChange(e, id)}/>
            
        )
    })
   }
    <AddButton text="Text" onClick = {(e)=>this.props.onClick(e,id)}/>
  </div>
    )
  }
}

export default App;

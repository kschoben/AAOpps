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
    objList:[]
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
      objList:[...prevState.objList, {type:"group",value:[{type:"text",value:""}]}]
      })
    )
  }

  addSection = () =>{
    this.setState(prevState => ({
      objList:[...prevState.objList, {type:"section",value:[{type:"text",value:""}]}]
      })
    )
  }

  addGroupText = (e,id) =>{
    console.log(this.state.objList[id].value)
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

  deleteTextbox(id) {
    const objList1 = this.state.objList
    console.log(objList1)
    objList1.splice(id, 0);
    console.log( objList1.splice(id,1))
    console.log(objList1)
    this.setState(prevState => ({
      objList:objList1
      }))
    }

    deleteGroupTextbox(id, groupIndex) {
      const objList1 = this.state.objList
      console.log(objList1)
      objList1.splice(id, 0);
      console.log( objList1[id].value.splice(groupIndex,1))
      console.log(objList1)
      this.setState(prevState => ({
        objList:objList1
        }))
      }
  
  

  onGroupTextChange = (e,key) =>{
    let val = e.target.value
    let id = e.target.id
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
            <Input addonBefore="Manual Title:" defaultValue="" id="title" value={this.state.title} onChange={this.changeHandler.bind(this)}/>
          </div>  
          <div>
             <Input  addonBefore="Manual SubTitle:" defaultValue="" id="subtitle" value={this.state.subtitle} onChange={this.changeHandler.bind(this)}/>
          </div>  
          <div>
          {
            this.state.objList.map((obj,index)=> {
              if(typeof obj.type === typeof ""){
                switch(obj.type){
                  case "text":
                      return(
                          <Text   key={index} id={index} onClick = {() => this.deleteTextbox(index)} value={this.state.objList[index].value} onChange={this.onTextChange.bind(this)} />
                      )

                  case "group":
                      return(
                        <div key={index}  style={{padding:10}}>
                          <Group id={index} group={this.state.objList[index]} onClickRemoveGroupText = {() => this.deleteGroupTextbox(index)} onClickRemove = {() => this.deleteTextbox(index)} onClick = {this.addGroupText} onChange={this.onGroupTextChange} /> 
                        </div>
                      )

                   case "section":
                      return(
                        <Section   
                            key={index} 
                            id={index} 
                            value={this.state.objList[index].value} 
                            
                            //textbox
                            onClickTextDelete = {() => this.deleteTextbox(index)} 
                            onChangeText={this.onTextChange.bind(this)}
                            //group
                            />
                )
                  }
                }
              })
            }
            </div>
            
            <div style={{padding:10}}>
              <AddButton text="Section" onClick={this.addSection}/>
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
      <div class="textrow">
      <Input  key={this.props.index}  addonBefore="Text:" id={this.props.id} value={this.props.value} onChange={this.props.onChange}/>
      <button class="textdeletebutton" onClick={this.props.onClick}><Icon type="close-circle" /></button>
      </div>
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
          <div class="textrow">
            <Input addonBefore="Group:" key={groupIndex} id={groupIndex} value={text.value} onChange={(e) => this.props.onChange(e, id)}/>
            <button class="textdeletebutton"><Icon type="close-circle" onClick = {() => this.props.onClickRemoveGroupText(id,groupIndex)}/></button>
          </div>
        )
    })
   }
    <AddButton text="Text" onClick = {(e)=>this.props.onClick(e,id)}/>
    <AddButton text="Remove" onClick = {()=>this.props.onClickRemove(id)}/>
  </div>
    )
  }
}

class Section extends React.Component {
  // cycleSection(sectionValue){
  //   let idPath = []
  //   sectionValue.Value.map((val,subIndex) => {
  //     if(sectionValue[subindex].value === "section"){
  //       //return section to render
  //       //cycleSection(sectionValue[subIndex].value)
  //     }
  //     if(sectionValue[subIndex].value === "group"){
  //       return(
  //         <div>
  //           {section.value.map((text,groupIndex)=>{
  //             return( 
  //               <div class="textrow">
  //                 <Input addonBefore="Group:" key={groupIndex} id={groupIndex} value={text.value} onChange={(e) => this.props.onChange(e, id)}/>
  //                 <button class="textdeletebutton"><Icon type="close-circle" onClick = {() => this.props.onClickRemoveGroupText(id,groupIndex)}/></button>
  //               </div>
  //             )
  //           })}  
  //           <AddButton text="Text" onClick = {(e)=>this.props.onClick(e,id)}/>
  //           <AddButton text="Remove" onClick = {()=>this.props.onClickRemove(id)}/>
  //         </div>
  //       )
  //     }
  //     if(sectionValue[subindex].value === "text"){
  //       return(
  //         <div class="textrow">
  //         <Input  key={this.props.index}  addonBefore="Text:" id={this.props.id} value={this.props.value} onChange={this.props.onChange}/>
  //         <button class="textdeletebutton" onClick={this.props.onClick}><Icon type="close-circle" /></button>
  //         </div>
  //       )
  //     }
  //   })
  // }
  
  render() {
    const { value, id } = this.props
    return(
      <div>
        <AddButton text="Text" onClick = {(e)=>this.props.onClick(e,id)}/>
        <AddButton text="Remove" onClick = {()=>this.props.onClickRemove(id)}/>
      </div>
    )
  }
}
export default App;

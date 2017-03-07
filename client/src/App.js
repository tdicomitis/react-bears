import React from 'react';
import ViewContainer from './ViewContainer';
import PostContainer from './PostContainer';
import HomeContainer from './HomeContainer';
import EditContainer from './EditContainer';

var App = React.createClass ({
  getInitialState: function() {
    return {
      activeComponent: "home",
      editableBearId: null
    }
  },
  updateActiveComponent(name, id){
    this.setState({ activeComponent: name });
    if(id){
      this.setState({ editableBearId: id })
    }
  },
  showComponent: function(id){
    if(this.state.activeComponent === "home") {
      return <HomeContainer />
    } else if(this.state.activeComponent === "view")  {
      return <ViewContainer updateActiveComponent={this.updateActiveComponent} />
    } else if(this.state.activeComponent === "post")  {
      return <PostContainer />
    } else if(this.state.activeComponent === "edit")  {
      return <EditContainer id={this.state.editableBearId} />
    } else {
      return null
    }
  },
  render: function() {
    return (
    <div>
      <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="collapse navbar-collapse" id="">
              <ul className="nav navbar-nav">
              <li><a onClick={this.updateActiveComponent.bind(this, 'home')}> Home </a></li>
              <li><a onClick={this.updateActiveComponent.bind(this, 'view')}> Bears </a></li>
              <li><a onClick={this.updateActiveComponent.bind(this, 'post')}> Create Bear </a></li>
              </ul>
            </div>
          </div>
        </nav>
        { this.showComponent() }
    </div>
    )
  }
});


export default App;

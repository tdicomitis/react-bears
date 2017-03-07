import React from 'react';
import $ from 'jquery';
import BearsList from './BearsList'

var ViewContainer = React.createClass({
  getInitialState: function(){
    return {
      bears: null
    }
  },
  loadBearsFromServer: function() {
    var self = this;
    $.ajax({
      url: "./api/bears",
      method: "GET"
    }).done(function(data){
      self.setState({ bears: data })
      console.log(data, "Successfully updating state")
    })
  },
  componentWillMount: function() {
    this.loadBearsFromServer();
  },
  deleteBear: function(id) {
    var self = this;
    $.ajax({
      url: '/api/bears/' + id,
      method: 'DELETE'
    }).done(function(data){
      console.log(data, "SUCCESS DELETING BEAR");
      self.loadBearsFromServer();
    })
  },
  render: function(){
    return (
      <div className="jumbotron">
        <h1> Hello From View! </h1>
        { this.state.bears ? <BearsList updateActiveComponent={this.props.updateActiveComponent} bears={this.state.bears} deleteBear={this.deleteBear}/> : null }
      </div>
    )
  }
});

export default ViewContainer;

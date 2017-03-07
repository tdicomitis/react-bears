import React from 'react';
import PostBearForm from './PostBearForm'
import $ from 'jquery';

var PostContainer = React.createClass({
  getInitialState: function() {
    return {
      name: null,
      species: null,
      color: null
    }
  },
  updateName: function(name){
    return this.setState({ name: name });
  },
  updateSpecies: function(species){
    return this.setState({ species: species })
  },
  updateColor: function(color){
    return this.setState({ color: color })
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var self = this;
    var data = {
      name: this.state.name,
      color: this.state.color,
      species: this.state.species
    };
    $.ajax({
      url: '/api/bears',
      method: 'POST',
      data: data
    }).done(function(data){
      console.log(data, "SUCCESS CREATING BEAR")
    })
  },
  render: function() {
    return (
      <div className="jumbotron">
        <h1> Build a Bear! </h1>
        <PostBearForm updateName={this.updateName}
          updateSpecies={this.updateSpecies}
          updateColor={this.updateColor}
          handleSubmit={this.handleSubmit}
        />
      </div>
    )
  }
});

export default PostContainer;

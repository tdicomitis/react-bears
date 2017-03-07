import React from 'react';
import $ from 'jquery';
import EditForm from './EditBearForm'

var EditContainer = React.createClass({
  getInitialState: function() {
    return {
      name: null,
      species: null,
      color: null,
    }
  },
  componentWillMount: function() {
    this.loadBearFromServer();
  },
  updateName: function(name) {
    return this.setState({ name: name })
    console.log(this.state.name)
  },
  updateSpecies: function(species) {
    return this.setState({ species: species })
      console.log(this.state.species)
  },
  updateColor: function(color) {
    return this.setState({ color: color})
      console.log(this.state.color)
  },
  loadBearFromServer: function() {
      var self = this;
      $.ajax({
        url: `/api/bears/${this.props.id}`,
        method: "GET"
      }).done(function(data){
        console.log(data)
        self.setState({ name: data.name, color: data.color, species: data.species })
      })
    },
  handleSubmit: function(e) {
    e.preventDefault();
    var self = this;
    var data = {
      name: this.state.name,
      color: this.state.color,
      species : this.state.species
    };
    $.ajax({
      url: `/api/bears/${this.props.id}`,
      method: "PUT",
      data: data
    }).done(function(data){
      console.log(data, 'SUCCESS EDITING BEAR')
    })
  },
  render: function() {
    return (
      <div className="jumbotron">
        <h1> Hello From Edit! </h1>
        <EditForm name={this.state.name}
          color={this.state.color}
          species={this.state.species}
          updateName={this.updateName}
          updateSpecies={this.updateSpecies}
          updateColor={this.updateColor}
          handleSubmit={this.handleSubmit}
        />
      </div>
    )
  }
});

export default EditContainer;

import React from 'react';

var EditBearForm = React.createClass({
  render: function() {
    return (
      <div className="">
        <form onSubmit={this.props.handleSubmit}>
        <div className="form-group">
          <label>name</label>
          <input onChange={(event) => this.props.updateName(event.target.value)} value={this.props.name} type="text" className="form-control" id="" placeholder="name"/>
        </div>
        <div className="form-group">
          <label>species</label>
          <input onChange={(event) => this.props.updateSpecies(event.target.value)} value={this.props.species} type="text" className="form-control" id="" placeholder="name"/>
        </div>
        <div className="form-group">
          <label>color</label>
          <input onChange={(event) => this.props.updateColor(event.target.value)} value={this.props.color} type="text" className="form-control" id="" placeholder="name"/>
        </div>
        <button type="submit" className="btn btn-default">Submit</button>
        </form>
      </div>
    )
  }
});

export default EditBearForm;

import React from 'react';

var PostBearForm = React.createClass({
  render: function() {
    return (
      <div className="">
        <form onSubmit={this.props.handleSubmit}>
        <div className="form-group">
          <label>name</label>
          <input onChange={ (event) => this.props.updateName(event.target.value)} type="text" className="form-control" id="" placeholder="name"/>
        </div>
        <div className="form-group">
          <label>species</label>
          <input onChange={ (event) => this.props.updateSpecies(event.target.value)} type="text" className="form-control" id="" placeholder="name"/>
        </div>
        <div className="form-group">
          <label>color</label>
          <input onChange={ (event) => this.props.updateColor(event.target.value)} type="text" className="form-control" id="" placeholder="name"/>
        </div>
        <button type="submit" className="btn btn-default">Submit</button>
        </form>
      </div>
    )
  }
});

export default PostBearForm;

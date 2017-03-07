import React from 'react';
import BearCard from './BearCard'


var BearsList = React.createClass({
  render: function(){
    var self=this;
      var bearCards = this.props.bears.map(function(item){
        return <BearCard name={item.name} color={item.color}
                species={item.species} deleteBear={self.props.deleteBear}
                id={item._id} updateActiveComponent={self.props.updateActiveComponent}
              />
      });
      return (
        <div className="bear-flex">
          { bearCards }
        </div>
      )
    }
});

export default BearsList;

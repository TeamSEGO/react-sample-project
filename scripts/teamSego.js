/** @jsx React.DOM */
var segoMember = [{name:"keen",inChargeOf :"gag", generation:"old"},{name:"steve", inChargeOf : "study",generation:"old"},{name:"jump",inChargeOf :"zzal", generation:"young"},{name:"gray",inChargeOf :"security", generation:"young"}];
var SegoForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var name = this.refs.name.getDOMNode().value.trim();
    var inChargeOf = this.refs.inChargeOf.getDOMNode().value.trim();
    var generation = this.refs.generation.getDOMNode().value.trim();
    if (!name || !inChargeOf|| !generation) {
      console.log("fill the blank");
      return;
    }
    this.props.memebers.push({name:name,inChargeOf :inChargeOf, generation:generation});
    this.props.onFormChange(this.props.memebers);
    this.refs.name.getDOMNode().value = '';
    this.refs.inChargeOf.getDOMNode().value = '';
    this.refs.generation.getDOMNode().value = '';
  },
  render : function(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="이름" ref="name" />
          <input type="text" placeholder="담당" ref="inChargeOf" />
          <input type="text" placeholder="세대" ref="generation" />
          <input type="submit" value="Post" />
        </form>
      </div>
    );
  }
});
var SegoDiv = React.createClass({
  formChanged : function(members){
    console.log(members);
    this.setState({});
  },
  render : function() {
    var members=[];
    this.props.member.forEach(function( member ){
      members.push( <div>
                    이름 : {member.name}
                    , 담당 : {member.inChargeOf}
                    , 세대 : {member.generation}
                    </div>
                  );
    }.bind(this));
    return (
      <div>
        <SegoForm onFormChange={this.formChanged} memebers = {this.props.member}/>
        <div>
          {members}
        </div>
      </div>
    );
  }
});
React.render(<SegoDiv member={segoMember}/>, document.body);
// <SegoRow member={this.props.member}/>

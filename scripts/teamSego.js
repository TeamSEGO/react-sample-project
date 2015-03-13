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
    console.log(this.props.members);
    this.props.members.push({name:name,inChargeOf :inChargeOf, generation:generation});
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
          <input type="submit" value="Insert" />
        </form>
      </div>
    );
  }
});
var SegoSearch = React.createClass({
  handleChange: function(e) {
    this.props.onSearch( this.refs.name.getDOMNode().value );
  },
  render : function(){
    return(
      <div>
        <form>
          이름으로 찾기 : <input
          type="text"
          placeholder="이름"
          onChange = {this.handleChange}
          value={this.props.name}
          ref="name" />
        </form>
      </div>
    );
  }
});
var SegoDiv = React.createClass({
  getInitialState: function() {
    return {
        member : this.props.members,
        nameFilter: ''
    };
  },
  formChanged : function(){
    this.setState({});
  },
  onSearch: function( name ){
    if(!name) name="";
    this.setState({
      nameFilter: name
    });
  },
  render : function() {
    var members=[];
    if(this.state.member && this.state.member.length > 0){
      this.state.member.forEach(function( member ){
        if ( member.name.indexOf(this.state.nameFilter) === -1 ) {
            return;
        }
        members.push( <div>
                      이름 : {member.name}
                      , 담당 : {member.inChargeOf}
                      , 세대 : {member.generation}
                      </div>
                    );
      }.bind(this));
    }
    return (
      <div>
        <SegoForm
        onFormChange={this.formChanged}
        members={this.props.members}
        />
        <div>
          {members}
        </div>
        <SegoSearch onSearch={this.onSearch}/>
      </div>
    );
  }
});
React.render(<SegoDiv members={segoMember}/>, document.body);
// <SegoRow member={this.props.member}/>

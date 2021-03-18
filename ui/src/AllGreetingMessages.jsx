import React from "react";

class ASingleGreetingMessage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: this.props.greeting.message,
      name: this.props.greeting.name,
      id: this.props.greeting.id,
      inputLinkClicked: false,
    };
    this.toggleEditForm = this.toggleEditForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleEditForm() {
    if (this.state.inputLinkClicked) {
      this.setState({
        inputLinkClicked: false,
      });
    } else {
      this.setState({
        inputLinkClicked: true,
      });
    }
  }
  async handleSubmit(e){
    e.preventDefault();
    
    const form = document.forms.greetingEdit;
    
    const changes = {
      message:form.message.value,
      name:form.name.value
    }
    const id = this.state.id;
    this.props.updateGreeting(id, changes);


  }

  render() {
    const { greeting } = this.props;
    return (
      <div>
        <p>
          {greeting.id}. '{greeting.message}' - {greeting.name}
        </p>

        {this.state.inputLinkClicked ? (
          <div></div>
        ) : (
          <button onClick={this.toggleEditForm}>Edit</button>
        )}

        <button>Delete</button>

        <br />
        {this.state.inputLinkClicked ? (
          <form name="greetingEdit" onSubmit={this.handleSubmit}>
            <textarea
              type="text"
              name="message"
              value={this.state.message}
              onChange={(e) => this.setState({ message: e.target.value })}
              rows="4"
              cols="40"
            />
            <br />
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
              size="40"
            />
            <br />
            <button type="submit">Submit changes</button>
            <button type="button" onClick={this.toggleEditForm}>
              Cancel
            </button>
          </form>
        ) : (
          <div></div>
        )}
        <br />
      </div>
    );
  }
}

export default class AllGreetingMessages extends React.Component {
  render() {
    //console.log(this.props.greetingsData);
    const allGreetingMessages = this.props.greetingsData.map((i) => (
      <ASingleGreetingMessage key={i.id} greeting={i} updateGreeting={this.props.updateGreeting}/>
    ));
    return <div>{allGreetingMessages}</div>;
  }
}


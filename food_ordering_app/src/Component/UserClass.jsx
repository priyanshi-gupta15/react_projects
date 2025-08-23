import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      count1: 1,
    };
    console.log("child contructer called");
  }

  componentDidMount() {
    console.log("child mount");
  }

  componentDidUpdate()
  {
    console.log("did update");
    
  }

  componentWillUnmount()
  {
    console.log("component unmount");
    
  }
  render() {
    console.log("child render called");

    const { name, location, contact } = this.props;
    const { count } = this.state;
    return (
      <>
        <div className="justify-items-center bd-white shadow-md rounded-2xl mt-5">
          <div className="flex flex-wrap gap-6">
            <h1 className="font-bold text-2xl">count :- {count}</h1>
            <button
              onClick={() => {
                this.setState({
                  count: this.state.count + 1,
                });
              }}
              className="border bg-gray-300 rounded-md p-1"
            >
              count increase
            </button>
          </div>

          <div className="font-bold">{name}</div>
          <div>{location}</div>
          <div>Contact-no: {contact}</div>
        </div>
      </>
    );
  }
}

export default UserClass
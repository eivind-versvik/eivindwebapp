import React from 'react';

// TODO: FIX REDIRECT URL WITH EXTRA '/'
class MyComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        items: []
      };
    }
  
    componentDidMount() {
      fetch("https://eivindfunctions3.azurewebsites.net/api/stripecreate?redirect_url=${encodeURIComponent(this.props.redirect_url)}")
        .then((response) => {
            return response.text();
        })
        .then(
          (result) => {
            console.log(result);
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }
  
    render() {
      const { error, isLoaded, items } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
            <div>gagwa</div>
        );
      }
    }
  }
  
export default MyComponent;

import React from 'react';
import { config } from './Constants';

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
      fetch(`${config.url.FUNCTION_URL}/api/stripecreate?redirect_url=${encodeURIComponent(config.url.SITE_URL)}`)
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

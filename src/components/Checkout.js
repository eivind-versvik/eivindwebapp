import React from 'react';

import { config } from './Constants';


class Checkout extends React.Component {
    constructor(props) {
      super(props);
    }
    
    render() {
      return (
      <div className="sr-root">
      <div className="sr-main">
        <section className="container">
          <div>
            <h1>Single photo {config.url.FUNCTION_URL} {config.url.SITE_URL} {process.env.NODE_ENV}</h1>
            <h4>Purchase a Pasha original photo</h4>
            <div className="pasha-image">
              <img
                alt="Random asset from Picsum"
                src="https://picsum.photos/280/320?random=4"
                width="140"
                height="160"
              />
            </div>
          </div>
          
          <form action={config.url.FUNCTION_URL + "/api/stripecreate?redirect_url=" + encodeURIComponent(config.url.SITE_URL)} method="POST">
            <button role="link">Buy</button>
          </form>
        </section>
      </div>
    </div>
    );
    }
  }
  
export default Checkout;

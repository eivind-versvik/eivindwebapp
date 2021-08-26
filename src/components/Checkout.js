import React from 'react';

import { config } from './Constants';
import {DashboardLayout} from './Layout';


class Checkout extends React.Component {

    render() {
      return (
        <DashboardLayout>
    <div className="sr-root">
      <div className="sr-main">
         <section className="container">
          <div>
            <h1>Test: Single photo <br /> {config.url.FUNCTION_URL} <br /> {config.url.SITE_URL} <br /> {process.env.NODE_ENV}</h1>
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

    </DashboardLayout>
    );
    }
  }
  
export default Checkout;

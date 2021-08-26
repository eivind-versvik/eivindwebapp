import React from 'react';

import { config } from './Constants';
import {DashboardLayout} from './Layout';


class Checkout extends React.Component {

    render() {
      return (
        <DashboardLayout>
    <div className="sr-root">
      <div className="sr-main">
      <div class="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
            Azure Functions are hosted here: {config.url.FUNCTION_URL} <br /> 
            Web site is currentled hosted here: {config.url.SITE_URL} <br /> 
            Node environment is currently: {process.env.NODE_ENV} <br />
            <br />
            Test that you can buy single photo <br /> 
            <br />
            </div>

         {/* <section className="container"> */}
          <div>
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
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" role="link">Buy</button>

          </form>
          <div class="pt-1 text-base leading-6 font-bold sm:text-lg sm:leading-7">
            You will be re-directed to stripe after clicking Buy
          </div>
        {/* </section>  */}
        </div>
        </div>

    </DashboardLayout>
    );
    }
  }
  
export default Checkout;

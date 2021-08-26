import React from "react";

const prod = {
  url: {
    FUNCTION_URL: 'https://eivindfunctions3.azurewebsites.net',
    SITE_URL: 'https://eivindwebservice.azurewebsites.net'
  }
};

const dev = {
  url: {
    FUNCTION_URL: 'https://eivindfunctions3.azurewebsites.net',
    SITE_URL: 'http://127.0.0.1:3000'
  }
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;
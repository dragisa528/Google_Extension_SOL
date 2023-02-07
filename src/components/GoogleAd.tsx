import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class GoogleAds extends PureComponent<{
  client: string, 
  slot: string,
  format:string,
  className: string,
  style: object
}> {
  
  static defaultProps = {
    format: 'auto',
    className: '',
    style: { display: 'block' },
  };

  componentDidMount() {
    ((d, s, id, cb) => {
      console.log(`${d} : ${s} : ${id} : ${cb}`)
      const element = d.getElementsByTagName(s)[0];
      const fjs = element;
      let js = element;

      js = d.createElement(s);
      js.id = id;
      js.setAttribute('src', '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js');
      fjs?.parentNode?.insertBefore(js, fjs);
      js.addEventListener('onload', cb);
    })(document, 'script', 'google-ads-sdk', () => {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    });
  }

  render() {
    return (
      <ins
        className={`adsbygoogle ${this.props.className}`}
        data-ad-client={this.props.client}
        data-ad-slot={this.props.slot}
        style={this.props.style}
        data-ad-format={this.props.format}
      />
    );
  }
}

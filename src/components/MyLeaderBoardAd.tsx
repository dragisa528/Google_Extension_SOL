import React, { Component  } from 'react'

declare global {
    interface Window {
        adsbygoogle:any;
    }
}

class MyLeaderBoardAd extends Component {

    componentDidMount() {
     (window.adsbygoogle = window.adsbygoogle || []).push({})
    }

   render () {
    return(
        <div>
        <ins className = "adsbygoogle"
                style = { {display:"inline-block",width:"728px",height:"90px"} }
                data-ad-client = "ca-pub-5090203590318254"
                data-ad-slot = "f08c47fec0942fa0"></ins>
        </div>)
    }
}

export default MyLeaderBoardAd
import React from 'react'
import videojs from 'video.js'

// const videojs = require('video.js').default
// window.videojs = videojs

// import 'video.js/dist/video-js.css'
// import 'videojs-resolution-switcher/lib/videojs-resolution-switcher.css'

// require('videojs-contrib-hls/dist/videojs-contrib-hls.js')

export default class VideoPlayer extends React.Component {
  componentDidMount() {
    // instantiate Video.js
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      console.log('onPlayerReady', this)
    })
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    return (
      <div>
        <div data-vjs-player>
          <video ref={node => (this.videoNode = node)} className="video-js"></video>
        </div>
      </div>
    )
  }
}

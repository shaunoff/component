class ConvertUrl {
  // vimeo documentation: https://help.vimeo.com/hc/en-us/articles/224969968-Embedding-videos-overview
  // facebook documentation: https://developers.facebook.com/docs/plugins/embedded-video-player
  // youtube documentation: https://support.google.com/youtube/answer/171780?hl=en

  get_embed(video_url, video_type) {
    // Process url based on video type
    if (video_type === 'facebook') {
      return this.facebook_embed(video_url)
    } else if (video_type === 'youtube') {
      return this.youtube_embed(video_url)
    } else if (video_type === 'vimeo') {
      return this.vimeo_embed(video_url)
    }

    return false
  }

  get_embed_html(video_url, video_type) {
    // Process url based on video type
    // Return embed code using iframe html + get_embed
    if (video_type === 'facebook') {
      return this.facebook_embed_html(this.facebook_embed(video_url))
    } else if (video_type === 'youtube') {
      return this.youtube_embed_html(this.youtube_embed(video_url))
    } else if (video_type === 'vimeo') {
      return this.vimeo_embed_html(this.vimeo_embed(video_url))
    }

    return false
  }

  facebook_embed_html(embed_url) {
    return `
    <div id="fb-root"></div>
    <script>
      (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.12';
      fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    </script>
    <div class="fb-video" data-href="${embed_url}" data-width="450" data-allowfullscreen="true" data-show-text="false">
      <div class="fb-xfbml-parse-ignore">
        <blockquote cite="${embed_url}">
          <a href="${embed_url}">Test</a>
        </blockquote>
      </div>
    </div>`

    /*
    <div class="fb-video" data-href="${embed_url}" data-width="500" data-show-text="false"><blockquote cite="${embed_url}" class="fb-xfbml-parse-ignore"><a href="${embed_url}">Best Videos of the Year So Far!</a><p>People did a lot of awesome stuff in the first half of 2017, here&#039;s the best videos so far! 👏</p>Posted by <a href="https://www.facebook.com/peopleareawesome/">People Are Awesome</a> on Friday, July 28, 2017</blockquote></div>
    */
    // return `<iframe src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebook%2Fvideos%2F10153231379946729%2F&show_text=0&width=560" width="560" height="315" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allowFullScreen="true"></iframe>`
  }

  youtube_embed_html(embed_url) {
    return `
      <iframe
        width="450"
        height="253"
        src="${embed_url}"
        webkitallowfullscreen mozallowfullscreen allowfullscreen
      ></iframe>
    `
  }

  vimeo_embed_html(embed_url) {
    return `
      <iframe
        width="450"
        height="253"
        src="${embed_url}"
        webkitallowfullscreen mozallowfullscreen allowfullscreen
      ></iframe>
    `
  }

  youtube_embed(video_url) {
    let id = this.extract_youtube_video_id(video_url)

    if (id) {
      id = `https://www.youtube.com/embed/${id}` // would need additional values for autoplay etc
    } else {
      id = ''
    }

    return id
  }

  facebook_embed(video_url) {
    let id = this.extract_facebook_video_id(video_url)

    if (id) {
      id = `https://www.facebook.com/facebook/videos/${id}`
    } else {
      id = ''
    }

    return id
  }

  vimeo_embed(video_url) {
    let id = this.extract_vimeo_video_id(video_url)

    if (id) {
      id = `https://player.vimeo.com/video/${id}`
    } else {
      id = ''
    }

    return id
  }

  extract_youtube_video_id(video_url) {
    const youtube_regex = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/

    return this.get_id(video_url, youtube_regex)
  }

  extract_facebook_video_id(video_url) {
    const facebook_regex = /^(?:(?:https?:)?\/\/)?(?:www\.)?facebook\.com\/[a-zA-Z0-9\.]+\/videos\/(?:[a-z0-9\.]+\/)?([0-9]+)\/?(?:\?.*)?$/

    return this.get_id(video_url, facebook_regex)
  }

  extract_vimeo_video_id(video_url) {
  // can be simplified (handles youtube and vimeo) - also misses 'ondemand' links

    const vimeo_regex = /(?:player.|www.)?(?:vimeo\.com|youtu(?:be\.com|\.be|be\.googleapis\.com))\/(?:video\/|embed\/|channels\/(?:\w+\/)|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/

    return this.get_id(video_url, vimeo_regex)
  }

  determine_video_source(video_url) {
    // using regex from external_video_service.vue in cp
    const facebook_regex = /facebook\.com/
    const vimeo_regex = /(?:vimeo\.com)\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|)(\d+)(?:|\/\?)/
    const youtube_regex = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/

    if (video_url) {
      if (facebook_regex.test(video_url)) {
        return 'facebook'
      } else if (youtube_regex.test(video_url)) {
        return 'youtube'
      } else if (vimeo_regex.test(video_url)) {
        return 'vimeo'
      }
    }
  }

  get_id(video_url, id_regex) {
    const url_ids = video_url.match(id_regex)
    let id = ''

    if (url_ids) {
      id = url_ids[1]
    }

    return id
  }

}

export default new ConvertUrl()

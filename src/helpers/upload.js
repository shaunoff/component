import Vue from 'vue'

class UploadDigitalAsset {
  async create_digital_asset(file, digital_asset_params, base_path, associable_id, orm) {

    const response = await Vue.axios({
      url: `${base_path}/digital_assets`,
      method: 'post',
      data: {
        digital_asset: {
          name: file.name
        },
        timestamp: new Date().getTime(),
        fields: ['signature']
      }
    })
    return await response.data
  }

  add_external_video(external_video_url, external_video_source, base_path) {
    const campaign_ids = scope_object.current_campaign ? [scope_object.current_campaign.id] : null
    const attrs = {
      name: 'External Video',
      external_video_url: external_video_url.trim(),
      source: external_video_source,
      campaign_ids
    }
    return store.create(
      'digital_asset',
      {
        digital_asset: attrs,
        fields: ['oembed_html', 'external_video_poster']
      },
      { basePath: base_path }
    )
  }
}

export default new UploadDigitalAsset()

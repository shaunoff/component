import { PluginManager } from 'tinymce/tinymce';
import { capitalize } from 'inflection';

const liquid_variables = [
  {
    name: 'Retailer',
    sub_menu: [
      {
        name: 'Name',
        content: 'retailer.name'
      },
      {
        name: 'Logo URL',
        content: 'retailer.logo_url'
      },
      {
        name: 'Formatted Phone',
        content: 'retailer.formatted_phone'
      },
      {
        name: 'Phone',
        content: 'retailer.phone'
      },
      {
        name: 'Phone extension',
        content: 'retailer.phone_extension'
      },
      {
        name: 'Website URL',
        content: 'retailer.website_url'
      },
      {
        name: 'Twitter URL',
        content: 'retailer.twitter_url'
      },
      {
        name: 'Facebook URL',
        content: 'retailer.facebook_url'
      },
      {
        name: 'Address 1',
        content: 'retailer.location.addr1'
      },
      {
        name: 'Address 2',
        content: 'retailer.location.addr2'
      },
      {
        name: 'City',
        content: 'retailer.location.city'
      },
      {
        name: 'State',
        content: 'retailer.location.state'
      },
      {
        name: 'Zip code',
        content: 'retailer.location.zip'
      },
      {
        name: 'Location full HTML',
        content: 'retailer.location.full_html'
      },
      {
        name: 'Automation URL',
        content: 'retailer.automation_url'
      },
      {
        name: 'Dashboard URL',
        content: 'retailer.dashboard_url'
      },
      {
        name: 'Local ads page URL',
        content: 'retailer.local_ads_url'
      }
    ]
  },
  {
    name: (brand) => {
      return brand ? capitalize(brand.campaign_alias) : 'Campaign'
    },
    sub_menu: [
      {
        name: 'Name',
        content: 'campaign.name'
      },
      {
        name: 'Logo URL',
        content: 'campaign.logo_url'
      },
      {
        name: 'Description',
        content: 'campaign.description'
      },
      {
        name: 'Start date',
        content: 'campaign.start_date'
      },
      {
        name: 'End date',
        content: 'campaign.end_date'
      },
      {
        name: 'Landing Page URL',
        content: (campaign) => {
          if (campaign && (campaign.campaign_type === "frame" || campaign.campaign_type === "template")) {
            return 'campaign.share_url'
          } else {
            return false
          }
        }
      }
    ]
  },
  {
    name: 'Brand',
    sub_menu: [
      {
        name: 'Name',
        content: 'brand.name'
      },
      {
        name: 'Logo URL',
        content: 'brand.logo_url'
      },
      {
        name: 'Support email address',
        content: 'brand.support_email_address'
      },
      {
        name: 'Retailer alias',
        content: 'brand.retailer_alias'
      },
      {
        name: 'Campaign alias',
        content: 'brand.campaign_alias'
      },
      {
        name: 'Division alias',
        content: 'brand.division_alias'
      }
    ]
  },
  {
    name: 'Invitation',
    sub_menu: [
      {
        name: 'Local ads page URL',
        content: 'invitation.local_ads_url'
      },
      {
        name: 'Automations page URL',
        content: 'invitation.automations_url'
      },
      {
        name: 'Account users page URL',
        content: 'invitation.account_users_url'
      },
      {
        name: 'Brand assets page URL',
        content: 'invitation.brand_assets_url'
      }
    ]
  }
]

function generate_menu (editor, brand, campaign) {
  let menu = []
  liquid_variables.forEach((category) => {
    let sub_menu = []
    category.sub_menu.forEach((variable) => {
      const content = variable.content instanceof Function ? variable.content(campaign) : variable.content
      if (content) {
        sub_menu.push({
          text: variable.name,
          onclick: () => {
            editor.insertContent(`{{ ${content} }}`)
          }
        })
      }
    })
    menu.push({
      text: category.name instanceof Function ? category.name(brand) : category.name,
      menu: sub_menu
    })
  })
  return menu
}

function liquid (brand, campaign) {
  PluginManager.add('liquid', function(editor, url) {
    editor.addButton('liquid', {
      type: 'menubutton',
      icon: 'code-setting',
      menu: generate_menu(editor, brand, campaign)
    })

    return {
      getMetadata: () => {
        return  {
          title: "liquid variable plugin",
          url: "http://promoboxx.com"
        }
      }
    }
  })
}

export default liquid

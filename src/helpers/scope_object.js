import store from '@promoboxx/pbxxjsdata'

const User = store.getMapper('user').recordClass
const Brand = store.getMapper('brand').recordClass
const Division = store.getMapper('division').recordClass
const Campaign = store.getMapper('campaign').recordClass

class ScopeObject {
  get current_user() {
    return this._current_user
  }

  set current_user(user) {
    if (!user) {
      throw 'no user provided for authentication'
    } else {
      if (user instanceof User) {
        this._current_user = user
      } else {
        this._current_user = store.add('user', user)
      }
    }
  }

  get current_brand() {
    return this._current_brand
  }

  set current_brand(brand) {
    if (!brand) {
      throw 'no brand provided for context'
    } else {
      if (brand instanceof Brand) {
        this._current_brand = brand
      } else {
        this._current_brand = store.add('brand', brand)
      }
    }
  }

  get current_division() {
    return this._current_division
  }

  set current_division(division) {
    if (!division) {
      throw 'no division provided for context'
    } else {
      if (division instanceof Division) {
        this._current_division = division
      } else {
        this._current_division = store.add('division', division)
      }
    }
  }

  get current_campaign() {
    return this._current_campaign
  }

  set current_campaign(campaign) {
    if (!campaign) {
      throw 'no campaign provided for context'
    } else {
      if (campaign instanceof Campaign) {
        this._current_campaign = campaign
      } else {
        try {
          this._current_campaign = store.add('campaign', campaign)
        } catch(e) {
          console.log(e.message)
          console.log(e.errors)
        }
      }
    }
  }

  get current() {
    return this._current
  }

  set current(scope_object) {
    if (scope_object instanceof Brand) {
      this.current_brand = scope_object
      this._current = this.current_brand
    } else if (scope_object instanceof Division) {
      this.current_division = scope_object
      this._current = this.current_division
    } else {
      throw 'Invalid Scope Object, not a type of Brand or Division'
    }
  }
}

export default new ScopeObject()

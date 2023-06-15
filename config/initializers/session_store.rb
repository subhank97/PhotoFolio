if Rails.env.production?
    Rails.application.config.session_store :cookie_store, 
                                           key: '_not_instagram_session', 
                                           domain: :all, 
                                           same_site: :none, 
                                           secure: true, 
                                           tld_length: 3
  else
    Rails.application.config.session_store :cookie_store, 
                                           key: '_not_instagram_session'
  end
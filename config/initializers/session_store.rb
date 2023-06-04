Rails.application.config.session_store :cookie_store, key: '_not_instagram_session', secure: Rails.env.production?

Rails.application.config.session_store :cookie_store, key: 'PhotoFolio', secure: Rails.env.production?

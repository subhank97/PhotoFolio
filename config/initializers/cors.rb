Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'https://pictogram-b63u.onrender.com' # Frontend URL for production

    if Rails.env.development?
      origins 'http://localhost:4000' # Frontend URL for development
    end

    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      credentials: true
  end
end









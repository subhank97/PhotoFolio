require 'faker'

puts "🌱 Seeding spices..."

5.times do
    first_name = Faker::Name.unique.first_name
    last_name = Faker::Name.unique.first_name
    full_name = first_name+last_name
    User.create!(full_name: full_name, username: first_name)
end 

15.times do 
    image= Faker::LoremFlickr.image
    description= Faker::Quote.famous_last_words
    category= Faker::Book.genre
    user_id= User.ids.sample
    Post.create!(image: image, description: description, user_id: user_id)
end 

puts "✅ Done seeding!"

User
Post

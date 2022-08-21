require 'faker'

puts "🌱 Seeding spices..."

# 5.times do
#     first_name = Faker::Name.unique.first_name
#     last_name = Faker::Name.unique.first_name
#     full_name = first_name+last_name
#     password = Faker::Internet.password
#     User.create!(full_name: full_name, username: first_name, password: password)
# end 

user1 = User.create!(full_name: "Subhan Khan", username: "test", password: "123")

Post.create!(image: "https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHBob3RvZ3JhcGh5fGVufDB8fDB8fA%3D%3D&w=1000&q=80",
             description: "People say nothing is impossible, but I do nothing every day.",
             user_id: user1)
Post.create!(image: "https://i0.wp.com/jonasraskphotography.com/wp-content/uploads/2020/08/DSCF1146.jpg?fit=1440%2C960&ssl=1",
             description: "If you think nothing is impossible, try slamming a revolving door.",
             user_id: user1)
Post.create!(image: "https://images.unsplash.com/photo-1587590227264-0ac64ce63ce8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tJTIwb2JqZWN0c3xlbnwwfHwwfHw%3D&w=1000&q=80",
             description: "I finally realized that people are prisoners of their phones… that’s why it’s called a “cell” phone. ",
             user_id: user1)
Post.create!(image: "https://images.squarespace-cdn.com/content/v1/53c631e4e4b0c4d68989cbef/1410108841601-8DJHKTK2RL5Z3DCN1ZGI/DSC1276.jpg?format=1000w",
             description: "There are 100 billion nerves in the human body, and there are people who have the ability to irritate all of them. ",
             user_id: user1)
Post.create!(image: "https://petapixel.com/assets/uploads/2015/03/post-processing-toronto-wedding-photography-random-texture.jpg",
             description: "I don’t think inside the box and I don’t think outside the box… I don’t even know where the box is.",
             user_id: user1)
Post.create!(image: "https://i.pinimg.com/550x/e5/aa/97/e5aa977fe2b95c999a4987ad0fe82c32.jpg",
             description: "I would like to thank my arms for always being by my side, my legs for always supporting me, and my fingers because I can always count on them.",
             user_id: user1)
Post.create!(image: "https://static.boredpanda.com/blog/wp-content/uploads/2017/04/JAY_0572-2-2-58f798a00c4da__880.jpg",
             description: "If you fall, I will be there. Signed: Floor.",
             user_id: user1)
Post.create!(image: "https://ninopuciophotography.com/wp-content/uploads/2019/01/1-1024x650.jpg",
             description: "To make time fly, throw your watch out the window.",
             user_id: user1)
Post.create!(image: "https://images.unsplash.com/photo-1534939268078-694e7b6d99b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXw0NTM3Mzg3fHxlbnwwfHx8fA%3D%3D&w=1000&q=80",
             description: "My friend thinks he’s smart. He said onions are the only food that makes you cry. So I threw a coconut at his face.",
             user_id: user1)
Post.create!(image: "https://images.pexels.com/photos/9304725/pexels-photo-9304725.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
             description: "Wine + dinner = winner",
             user_id: user1)

puts "✅ Done seeding!"

User
Post

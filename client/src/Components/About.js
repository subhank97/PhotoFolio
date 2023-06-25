import React from 'react'

const flowerImage = {
    backgroundImage: "url('https://c0.wallpaperflare.com/preview/525/741/299/dark-flower-flower-arrangement-bouquet.jpg')",
};

const About = () => {
    return (
        <div class="min-h-screen flex bg-black text-white">
            <div class="w-5/12">
                <img class="object-cover h-screen w-full" src="https://c0.wallpaperflare.com/preview/525/741/299/dark-flower-flower-arrangement-bouquet.jpg" alt="Elegant flowers" />
            </div>
            <div class="w-7/12 p-12 mt-32">
                <h1 class="text-4xl font-bold text-amber-400">Art Gallery</h1>
                <h2 class="text-2xl italic font-semibold text-amber-400 mt-4">
                    <span class="border-b-2 border-amber-400 pb-2">(n.) trans</span>porting souls to a world of creativity
                </h2>
                <p class="mt-8 text-lg">
                    Our platform is a community of artists and art lovers. Here, you can interact with stunning photos from around the world, leave likes and comments, and join the conversation. Register an account and you can even display your own images. Welcome to our gallery!
                </p>
            </div>
        </div>
    )
}

export default About
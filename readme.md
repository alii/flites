# flight

Flight is an opinionated hot reloading development server for TypeScript applications. It replaces tools like `ts-node-dev` and `nodemon`. It is designed to be used in a development environment, and is not intended to be used in production.

Under the hood it uses esbuild, a modern build system for TypeScript, to compile your TypeScript files. This means it stays speedy even with larger projects and workspaces.

--

###### Old meme readme is below lol

--

# flight

Flight is a **really** opinionated development build tool/bundler for Node and TypeScript applications. It has no configuration options whatsoever leaving you with the quickest way to get started into developing a large scale TypeScript app.

Under the hood, flight uses the absolutely fantastic [esbuild](https://npmjs.com/package/esbuild). It's a totally brilliant toy and serves many many useful purposes. qna below!

# what it do

it spys on ur files and then when u save src/index.ts (by default, u can change just by doing another command line argument) and then when u do the save it compiles the typescript into a single file (under dist/index.js) and does the restart of your app !!

everything will be bundled into a single file, absolutely everything. sooo technically you could use this to replace like rollup or something but please don't do that bc this has zero options as i said. there is actually another reason that there are no options and that is because there is no internet on the flight and i dont want to have to pay like $37.99 for a couple of hours of slow 3g just to install a command line parser from npm and make it nice and stuff so yeah also this readme is a total meme bc im not even sure if anybody will use this but i think open source doesnt have to be all professional im just chatting to you and you are reading what ive written but i guess you cant say anything back to me because its not a conversation this is so lonely oh well i hope you are having a great day go buy yourself a coffee because you deserve it x

# Why the name flight?

I literally made this on a flight to SF and a friend of mine was in need of a quick dev/hot reload for TypeScript. Right now we have ts-node-dev but hopefully flight will be an apt replacement.

# Why is my code?

not sure, if you want help with something though, reach out on [twitter @alistaiiiir](https://twitter.com/alistaiiiir) or on discord @ alistair#9999. or even my website but it doesnt seem like anybody uses that contact form lmao

# Who is allowed to use this?

idk it's probably released under apache 2 or something just check the license file and if it says u can use it at ur company (which it will because i love open soruce and yeah) then u can use it ok i am gonna put my laptop awy bc im getting jet lag adn the flight lands soon thank you guys for listening and reading this episode was sponsored by audible free audio book link in the description like and describe

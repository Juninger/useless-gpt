# UselessGPT

Welcome to **UselessGPT!**

*This application was created for the VG-assignment in 'Cross-platform Applications with Web Technologies' (DA395A).*

It works just like the popular ChatGPT, with the *minor* difference that all answers are completely useless and out-of-context. Instead of creating meaningful and relevant responses, UselessGPT delivers pseudo-random messages which can contain quotes from Donald Trump and Kanye West, or facts about numbers.

> :warning: **Warning:** Some responses "generated" by UselessGPT may contain foul language or inappropriate content.

![Screen recording of UselessGPT]("./Screenshots/chatting.gif")

## Installation

1. Clone the repository:

        git clone https://github.com/Juninger/useless-gpt

2. Open 'useless-gpt' in Visual Studio Code, or other editor.

3. In the terminal, navigate to the location of 'useless-gpt':

        cd path/to/useless-gpt

4. Install the required packages:

        npm install

5. Wait until installation is complete.

## Usage

To run UselessGPT, follow these steps:

1. In the terminal, navigate to the 'useless-gpt' folder:

        cd path/to/useless-gpt

2. Start the project:

        npm start

3. Wait for the application to launch.

4. Visit the application at [localhost:3000](http://localhost:3000) or other location specified by your terminal.

5. Ask away!

## APIs used by UselessGPT

This project uses the following external APIs to answer all your questions:

- [Kanye Rest](https://kanye.rest/)
- [Tronald Dump](https://www.tronalddump.io/)
- [Numbers API](http://numbersapi.com/)

## Frameworks & Libraries

The project utilizes the following frameworks and libraries:

- React: [Official website](https://reactjs.org/)
- Bootstrap: [Official website](https://getbootstrap.com/)
  - For easier styling  
- react-bootstrap: [Official website](https://react-bootstrap.github.io/)
  - Bootstrap in ready-to-use React-components  
- Axios: [GitHub repository](https://github.com/axios/axios)
  - Used for HTTP requests
- AnimeJS: [Official documentation](https://animejs.com/documentation/)
  - Used to create animations for rendering new messages
>❗If you encounter any issues with the animations, try opening the application in another browser

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

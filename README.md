# Project details

Project created as an example of responsive design for companies that need to display a portfolio, generating data from RESTful APIs. For this example, a .json file was used to generate the data, but a URL can also be used.

|                |Version							|
|----------------|-------------------------------|
|Javascript          |            |
|ES6          | |

## Important note 

To see a demonstration of this design, select the following link: [Demo](https://dev-shelvin-batista.github.io/creative-portfolio/)

## Instructions

To run the frontend project, follow these steps:

- Clone the project, either with the command git clone `https://github.com/dev-shelvin-batista/creative-portfolio.git` or using a GitHub graphical tool.
- It is recommended to install and use a local server for testing, such as Wampserver, Xampp, or Apache, as a server is required to obtain data such as RESTful services. Otherwise, a browser security error will occur when attempting to access the URL. 
- Copy the generated folder to the installed server folder.
- Use the default URL of the installed local server, for example: `http://localhost/creative-portfolio/`

## Docker Instructions

To run the frontend project in a Docker container, follow these steps:

- Clone the project, either with the command git clone `https://github.com/dev-shelvin-batista/creative-portfolio.git` or using a GitHub graphical tool.

- Access the folder in a command terminal using the cd command.

- The project already has a Dockerfile that generates the image to create the container. Just create the image with the `docker build -t creative-portfolio .` command.

- Create the container from the image created by running the `docker run --rm -p 80:80 creative-portfolio` command.

- After running the above command, the container will be active and you will be able to access the frontend project from the host with the URL `http://localhost/` or `http://localhost:80/`.

- You can change the port to be used on the host by modifying the port in the **docker run** command in the **-p** option.
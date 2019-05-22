# Pokemon App
Hello! Thank you for your interest in joining our front end engineering team at Stylindex :)

We ask all candidates to complete this short exercise to help us evaluate their suitability for the roles we are recruiting for. We recommend spending between 2 and 4 hours. You will have an opportunity to discuss your solution, and the choices you made at the next interview stage.

## The Exercise
Create an application to display a recommended reading list using [React](https://facebook.github.io/react) and any suitable libraries (we use [React](https://facebook.github.io/react), [Apollo](https://www.apollographql.com/docs/react/), [Jest](https://github.com/facebook/jest) and [styled-components](https://www.styled-components.com)). You may use [create-react-app](https://github.com/facebook/create-react-app) to bootstrap your application.

### Acceptance Criteria
* Fetch the GraphQL data from [this GraphQL API](https://graphql-pokemon.now.sh/?query=%7B%0A%20%20pokemon(id%3A%20%22UG9rZW1vbjowMDE%3D%22)%20%7B%0A%20%20%20%20id%0A%20%20%20%20number%0A%20%20%20%20name%0A%20%20%20%20maxCP%0A%20%20%20%20maxHP%0A%20%20%20%20image%0A%20%20%20%20types%0A%20%20%20%20evolutions%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%20%20number%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20maxCP%0A%20%20%20%20%20%20maxHP%0A%20%20%20%20%20%20image%0A%20%20%20%20%20%20types%0A%20%20%20%20%7D%0A%20%20%7D%0A%20%20pokemons(first%3A%2010)%20%7B%0A%20%20%20%20id%0A%20%20%20%20number%0A%20%20%20%20name%0A%20%20%20%20maxCP%0A%20%20%20%20maxHP%0A%20%20%20%20image%0A%20%20%20%20types%0A%20%20%7D%0A%7D%0A)
* Display the list of pokemon on a page, each pokemon item showing
    - id
    - number
    - name
    - maxCP
    - maxHP
    - image
    - types
* Clicking on the 'More information' link should open another page showing
    - All the above
    - the evolutions of this pokemon

### Requirements
A good solution will
* satisfy the acceptance criteria
* work on common web browsers
* have good test coverage
* have a functional user experience and design
* use _appropriate_ front end libraries
* be production ready

Please put your solution on a repository hosting service such as [GitHub](https://github.com) or [Bitbucket](https://bitbucket.org) and don't forget to include a README file to tell us how to build and run the application :)
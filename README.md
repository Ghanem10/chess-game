
# Chess Game

  ![front page chess](https://github.com/gani1000/chess-game/assets/107857762/4f091739-509f-4f61-9aba-fd57e5431c7c)

# User Interface

   - In this section, the user interface is divided into several components, react hooks handle and provides seamless navigation 
       across the application. The front page contains the starting component for the app. Dynamically changes/renders the main component
       for the chess board to start the game with a button click.

             // sartGame is react state toggle the value with a click
     
            {(!startGame) ? (
                <ListOptions 
                    setStartGame={setStartGame}
                />
            ) : (
                <ChessBoard 
                    highlightSquare={highlightSquare}
                    pawnPromotion={pawnPromotion}
                    setPawnPromotion={setPawnPromotion}
                    updatePossibleMoves={updatePossibleMoves}
                />
            )}

- Then, on the main page, all the logic is handled by several components to provide instant updates to the UI.
    they render the main chess component with the timer and record moves components with endless features. Using react hooks
    to provide the best UX.
  
    ![main](https://github.com/gani1000/chess-game/assets/107857762/955574cf-3cb5-449c-b063-da588b6a17a9)


# Application Roadmap
```
|
.____ Component
|    |
|    .____ chessBoard
|    |    |
|    |    .____ chessBoard.JSX
|    |    |
|    |    .____ pawnPromotion.JSX
|    |    |
|    |    .____ updateRecordMoves.JS
|    |
|    .____ sass
|    |    |
|    |    .____ board.SCSS
|    |
|    .____ state
|         |
|         .____ stateManagement.JS
|
.____ contextprovider
|    |
|    .____ context.provider.JSX
|
.____ Engine
|    |
|    .____ recordsGames
|         |
|         .____ eval.engine.JS
|         |
|         .____ main.engine.JS
|
.____ interface
|    |
|    .____ EndGame
|    |    |
|    |    .____ checkmate.SCSS
|    |    |
|    |    .____ gameEnd.SCSS
|    |    |
|    |    .____ gameEnd.JSX
|    |
|    .____ listFront
|    |    |
|    |    .____ list.JSX
|    |    |
|    |    .____ list.SCSS
|    |
|    .____ recordmoves
|    |    |
|    |    .____ recorder.JSX
|    |    |
|    |    .____ recorder.SCSS
|    |
|    .____ sidebar
|    |    |
|    |    .____ JSX
|    |    |
|    |    .____ SCSS
|    |    |
|    |    .____ sidebar.SCSS
|    |    |
|    |    .____ sideBarItems.JSX
|    |
|    .____ timer
|         |
|         .____ timerPlayer.JSX
|         |
|         .____ timerPlayer.SCSS
|
.____ layout
|    |
|    .____ pieceImages.JS
|    |
|    .____ squares.JSX
|
.____ model
|    |
|    .____ piecesReference.JS
|
.____ Movement
|    |
|    .____ constant
|    |
|    .____ pieces
|    |
|    .____ rules
|
.____ ReferenceBoard
|    |
|    .____ ReferenceBoard.JSX
|
.____ test
|    |
|    .____ chessBoard.test.JS
|    |
|    .____ king.in-check.test.JS
|
.____ userprofile
|    |
|    .____ log
|    |    |
|    |    .____ login.JSX
|    |    |
|    |    .____ register.JSX
|    |    |
|    |    .____ style.SCSS
|    |
|    .____ profile
|         |
|         .____ profile.JSX
|         |
|         .____ profile.SCSS
|
.____ Server
|    |
|    .____ controller
|    |    |
|    |    .____ controller.JS
|    |    |
|    |    .____ playerStatus.JS
|    |
|    .____ DB
|    |    |
|    |    .____ connect.JS
|    |
|    .____ error
|    |    |
|    |    .____ error.JS
|    |    |
|    |    .____ middleware.JS
|    |
|    .____ graphQL
|    |    |
|    |    .____ playerInfo.gql
|    |    |
|    |    .____ playerRanking.gql
|    |
|    .____ log
|    |    |
|    |    .____ github.JS
|    |    |
|    |    .____ google.JS
|    |
|    .____ model
|    |    |
|    |    .____ schema.JS
|    |
|    .____ player
|    |    |
|    |    .____ game.JS
|    |    |
|    |    .____ room.JS
|    |
|    .____ routes
|    |    |
|    |    .____ loginProviders.JS
|    |    |
|    |    .____ routes.JS
|    |
|    .____ test
|         |
|         .____ createRoom.test.JS
|         |
|         .____ database.test.JS
|         |
|         .____ loginrouters.test.JS
|         |
|         .____ routes.test.JS
|    |
|    .____ Server.JS

```
# Features supported in the application:

## Client:
* Engine & gameplay: player vs. an engine or multiple players.

## ChessComponent:
- Record moves after the game is ended.
- Block check when the king is in danger.
- Show possible moves for the pieces - on the grab.
- Capture the enemy piece when the king is in check.
- Castling, Checkmate, and stalemate.
- **TO ADD:** Resign, offer a draw.

## Timer:
- Who runs out of time loses.
- **TO ADD:** Timer with increment.
- List of timers/options.

## SideBar - context provider (React hooks):
- Update the square's colors.

## Authentication:
- Login and register with JWT.
- Authenticate with login providers: Github and Google.

## Profile:
- Update the player's status/ranking after every game.
- Losses and wins as well as the total points they have.

## Server:
- WS server for simulating the player's moves.
- Real-time updates.
- Creating a room for each player.
- Ranking system for matching online players.

## DB:
### Schema Mongoose:
- Write and read from HTTP requests.
- Save player info "ranking" after every game.

# README.md updates

- Readme.md will be updated after the Engine is added.

# Get Started

To run the chess game locally, follow these steps:

* Clone the repository 

      git clone https://github.com/your-username/chess-game.git
  
* Install dependencies

        npm install

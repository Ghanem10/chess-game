
# Chess Game

  ![front page chess](https://github.com/gani1000/ChessGame/assets/107857762/63011f0d-0a1d-4d08-8c35-b43aef5b4d26)
     
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
    
    ![main](https://github.com/gani1000/ChessGame/assets/107857762/79860080-c2c5-4be5-a755-d4816456773d)

# Application Roadmap
```
|
.____ _test_
|    |
|    .____ testing_pieces_movements
|
.____ component
|    |
|    .____ chessboard
|    |    |
|    |    .____ ChessBoard.jsx
|    |    |
|    |    .____ UpdateRecordeMoves.js
|    |
|    .____ SCSS
|    |
|    .____ state
|         |
|         .____ stateManagement.ts
|
.____ interface
     |
     .____ listfront
     |    |
     |    .____ list.jsx
     |    |
     |    .____ list.scss
     |
     .____ recordmoves
     |    |
     |    .____ record.jsx
     |    |
     |    .____ record.scss
     |
     .____ sidebar
     |    |
     |    .____ JSX/static
     |    |
     |    .____ SCSS
     |    |
     |    .____ sideBarItems.jsx
     |
     .____ timer
     |    |
     |    .____ EndGame/JSX
     |         |
     |         .____ timerplayer.jsx
     |         |
     |         .____ timerplayer.scss
     |
     .____ warper
          |
          .____ Hook context provider
```
# System design of the app:
  [Here's a link to the eraser system design app](https://app.eraser.io/workspace/YtnNZoWYZfP73BtqVlln?origin=share) 
  
  ![Capture](https://github.com/gani1000/chess-game/assets/107857762/a791b936-62ae-40df-892b-49f8072c6c4d)


# Features supported in the application:
* Client:
* Engine & gameplay: player vs. an engine or multiple players.

* ChessComponent:
    - Record moves after the game is ended.
    - Block check when the king is in danger.
    - Show possible moves for the pieces - on the grab.
    - Capture the enemy piece when the king is in check.
    - Castling, Checkmate and stelmate.

** TOADD: Resign, offer a draw.

* Timer:
    - Who runs out of time loses.
    ** TOADD: - timer with increment.
    - list of timers/options.
    * SideBar - context provider (react hooks):
    - Update the square's colors.

* Authentication:
    - Login and register with JWT.
    - Authenticate with login providers, Github, and Google.

* Profile:
    - Update the player's status/ranking after every game.
    - Losses and wins as well as the total points he has.
    
* Server:
    - WS server for simulating the player's moves
    - real-time updates.
    - creating a room for each player.
    - ranking system for matching online players.
* DB:
* Schema Mongoose:
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

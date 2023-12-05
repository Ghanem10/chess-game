#!/bin/bash

prompt_exit() {
  read -p "Press Enter to continue or 'c' to exist..."
  if [[ $REPLY == "c" || $REPLY == "C" ]]; then
      echo "existing..."
  fi
}

tournament_commands() {
  echo "** Accessed Tournament Commands."

  echo "1. Create a tournament"
  echo "2. Add tournament and admin to database"
  echo "3. Add users to this tournament (Adds 10 dome users)"
  echo "4. Remove users from this tournament (Remove all existing users)"
  echo "4. Remove tournament and admin from database"

  echo "Press 'c' and Enter to exit or any other key to continue..."
  read choice

  case $choice in
      1)
          node "scripts/create-tournament"
          prompt_exit
          ;;
      2)
          node "scripts/add-tournament"
          prompt_exit
          ;;
      3)
          node "scripts/add-users"
          prompt_exit
          ;;
      4)
          node "scripts/remove-users"
          prompt_exit
          ;;
      5)
          node "scripts/remove-tournament"
          prompt_exit
          ;;
      c|C)
          echo "Existing..."
          exit
          ;;
      *)
          echo "Invalid input, please try again."
          ;;
  esac
}

community_commands() {
  echo "** Accessed Community Commands."
  
  echo "1. Create a community"
  echo "2. Add community and admin to database"
  echo "3. Add users to this community (Adds 10 dome users)"
  echo "4. Remove users from this community (Remove all existing users)"
  echo "4. Remove community and admin from database"

  echo "Press 'c' and Enter to exit or any other key to continue..."
  read choice

  case $choice in
      1)
          node "scripts/create-community"
          prompt_exit
          ;;
      2)
          node "scripts/add-community"
          prompt_exit
          ;;
      3)
          node "scripts/add-users"
          prompt_exit
          ;;
      4)
          node "scripts/remove-users"
          prompt_exit
          ;;
      5)
          node "scripts/remove-community"
          prompt_exit
          ;;
      c|C)
          echo "Existing..."
          exit
          ;;
      *)
          echo "Invalid input, please try again."
          ;;
  esac
}

while true; do 
  echo "What would you like to do? ("Enter a number")"

  echo "1. Access Tournament Commands."
  echo "2. Access Community Commands."

  read NUMBER

  case $NUMBER in
      1)
          tournament_commands
          ;;
      2)
          community_commands
          ;;
      *)
          echo "Invalid input, please try again."
          ;;
  esac
done
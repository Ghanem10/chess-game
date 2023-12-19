
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAction } from "../../redux/actions/userAction";

export const UpdatePlayerStatus = ({ wonTeam, matchInfo }) => {

    const user = useSelector(
        (state) => state.user.user?.updatedPlayerStatus
    );

    const demoUser = JSON.parse(localStorage.getItem("token")).user;

    const [playerData, setPlayerData] = useState(user || demoUser);

    const dispatch = useDispatch();

    useEffect(() => {
        const getUpdatePlayerStatus = async () => {

            const userId = playerData?._id;

            const payload = {
                points: playerData?.points,
                losses: playerData?.losses,
                draws: playerData?.draws,
                wins: playerData?.wins,
            };

            if (wonTeam === "WHITE" && matchInfo.team === "WHITE") {
                payload.points = playerData?.points + 16;
                payload.wins = 1;
            } else {
                payload.points = playerData?.points - 15;
                payload.losses = 1;
            }

            await dispatch(updateUserAction(userId, payload));
            
            setPlayerData(user);
        };

        getUpdatePlayerStatus();
    }, [wonTeam]);

    return (
        <div className='update-player-status'>
            <h3>Points: {user?.points}</h3>
        </div>
    );
};
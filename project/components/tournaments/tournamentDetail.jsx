import React from 'react';

export default function TournamentDetail({ tournament }) {
    return (
        <React.Fragment>
            <span>
                <strong>Title:</strong> {" "}
                    {
                        tournament.title
                    }
            </span>
            <span>
                <strong>Members:</strong> {" "}
                    {
                        tournament.members > 0 
                        ? tournament.members 
                        : "No members."
                    }
            </span>
        </React.Fragment>
    );
}

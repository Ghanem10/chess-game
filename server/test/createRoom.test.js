'use strict'
import {jest} from '@jest/globals';
import { createRoom } from "../player/room";

// jest-websocket-mock
const mockWSS = {
    on: jest.fn(),
    send: jest.fn(),
};

describe('WS tests', () => {
    it('should create a room when a "join" message is received', () => {

        const rooms = new Map();
        const message = {
            _ID: 'room1',
            type: 'join',
            player1: 'playerA',
            player2: 'playerB',
        };

        createRoom(rooms, message);

        expect(rooms.get('room1')).toEqual({
            player1: 'playerA',
            player2: 'playerB',
        });
    });
});


// mocking WS
const mockSenderWS = {
    on: jest.fn(),
    send: jest.fn(),
};

const mockReceiverWS = {
    on: jest.fn(),
    send: jest.fn(),
};

describe('WS tests', () => {
    it('should handle "move" message and broadcast it to the other player', () => {

        mockWSS.on = jest.fn((event, callback) => {

            if (event === 'connection') {
            
                callback(mockSenderWS);
                callback(mockReceiverWS);
            }
        });

        // Simulate "move" message
        const message = {
            _ID: 'room1',
            type: 'move',
            player1: 'playerA',
            player2: 'playerB',
            move: { x: 1, y: 2 },
        };

        mockSenderWS.send(JSON.stringify(message));
        mockReceiverWS.send(JSON.stringify(message));
        
        expect(mockSenderWS.send).toHaveBeenCalledWith(JSON.stringify(message));
        expect(mockReceiverWS.send).toHaveBeenCalledWith(JSON.stringify(message));
    });
});

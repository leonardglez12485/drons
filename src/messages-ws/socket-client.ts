import {Manager} from 'socket.io-client';

export const conectToServer= ()=>{

const manager = new Manager('http://localhost:3005/socket.io/socket.io.js')

const socket = manager.socket('/');
} 


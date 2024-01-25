import io from "socket.io-client";

export const socket = io.connect("https://api-uno-game.casablancass.online");
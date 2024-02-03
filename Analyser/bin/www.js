#!/usr/bin/env node

/**
 * Module dependencies.
 */

import { log } from "console";
import app from "../app.js";
// const debug = require("debug")("analyser:server");
import http from "http";

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || "3003");
app.set("port", port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
	const port = parseInt(val, 10);

	if (isNaN(port)) {
		// named pipe
		return val;
	}

	if (port >= 0) {
		// port number
		return port;
	}

	return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

const onError = (error) => {
	if (error.syscall !== "listen") {
		throw error;
	}

	const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case "EACCES":
			console.error(bind + " requires elevated privileges");
			process.exit(1);
			break;
		case "EADDRINUSE":
			console.error(bind + " is already in use");
			process.exit(1);
			break;
		default:
			throw error;
	}
};
/**
 * Event listener for HTTP server "listening" event.
 */

const onListening = () => {
	const addr = server.address();
	log("Listening on ", port);
};

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

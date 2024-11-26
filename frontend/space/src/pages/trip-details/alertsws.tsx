import React, { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";

const AlertsWs = () => {
    const [quotes, setQuotes] = useState([]);

    useEffect(() => {
        const client = new Client({
            brokerURL: "ws://localhost:8080/space-websocket",
            onConnect: () => {
                console.log("Connected to WebSocket");
                client.subscribe("/topic/alerts", (message) => {
                    if (message.body) {
                        const QuotesList = JSON.parse(message.body);
                        console.log("websocket fetch: ", QuotesList);
                        setQuotes(QuotesList);
                        console.log("websocket updated: ", quotes);
                    }
                });
            },
        });

        client.activate();

        // Cleanup on component unmount
        return () => {
            client.deactivate();
        };
    }, []);

    return (
        <>
        </>
    );
};

export default AlertsWs;
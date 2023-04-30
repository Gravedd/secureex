<script>
    const socket = new WebSocket(`ws://localhost:8080`);

    socket.addEventListener('open', (event) => {
        console.log('Socket connected');
        socket.send(JSON.stringify({
            "action": "auth",
            "data": [
                "login", "pass"
            ]
        }));
    });

    socket.addEventListener('message', (event) => {
        console.log(`Received message: ${event.data}`);
    });

    socket.addEventListener('close', (event) => {
        console.log('Socket disconnected');
    });


</script>

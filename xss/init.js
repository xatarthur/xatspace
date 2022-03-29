function theOne() {
    var connection = new WebSocket("wss://api.lanyard.rest/socket");
    var int;

    connection.onmessage = (event) => {
        var data = JSON.parse(event.data);
        var op = data.op;
        if (op == 1) {
            int = setInterval(
                () =>
                connection.readyState == connection.OPEN &&
                connection.send(JSON.stringify({
                    op: 3
                })),
                data.d.heartbeat_interval
            );
            connection.send(
                JSON.stringify({
                    op: 2,
                    d: {
                        subscribe_to_id: "184425304079466496",
                    },
                })
            );
        } else if (data.op == 0) {
            // online status
            if (data.d.discord_status === 'dnd') {
                document.getElementById('onlineStatus').innerHTML = `<img src="https://cdn.discordapp.com/avatars/${data.d.discord_user.id}/${data.d.discord_user.avatar}?size=512" style="border:#f04747 3px solid;" class="thuk-img overflow-hidden w-64 mx-auto">`;
            } else {
                if (data.d.discord_status === 'idle') {
                    document.getElementById('onlineStatus').innerHTML = `<img src="https://cdn.discordapp.com/avatars/${data.d.discord_user.id}/${data.d.discord_user.avatar}?size=512" style="border:#faa61a 3px solid;" class="thuk-img overflow-hidden w-64 mx-auto">`;
                } else {
                    if (data.d.discord_status === 'online') {
                        document.getElementById('onlineStatus').innerHTML = `<img src="https://cdn.discordapp.com/avatars/${data.d.discord_user.id}/${data.d.discord_user.avatar}?size=512" style="border:#43b581 3px solid;" class="thuk-img overflow-hidden w-64 mx-auto">`;
                    } else {
                        if (data.d.discord_status === 'offline') {
                            document.getElementById('onlineStatus').innerHTML = `<img src="https://cdn.discordapp.com/avatars/${data.d.discord_user.id}/${data.d.discord_user.avatar}?size=512" style="border:#cccccc 3px solid;" class="thuk-img overflow-hidden w-64 mx-auto">`;
                        }
                    }
               }
            }

            //status >>>>>
            if (data.d.active_on_discord_desktop || data.d.active_on_discord_web || data.d.active_on_discord_mobile === true) {
                if (data.d.activities.length !== 0) {
                    if (data['d']['activities'][0]['type'] === 4) {
                        document.getElementById('status').innerHTML = `&nbsp;${data['d']['activities'][0]['state']}&nbsp;`;
                    } else {
                        document.getElementById('status').innerText = `No status 😵`;
                    }
                } else {
                    document.getElementById('status').innerText = `No status 😵`;
                }

            }
            if (data['d']['discord_status'] === 'offline') {
                document.getElementById('status').innerText = 'I\'m offline! 😵';
            }

            //spotify >>>>
            if (data.d.spotify === null) {
                document.getElementById('listeningto').innerHTML = '<p>Nothing... 😵</p>'
            }else {
                document.getElementById('listeningto').innerHTML = `<p>${data.d.spotify.artist}: ${data.d.spotify.song} 🎶🎶</p>`
            }
        }
    };

    connection.onclose = () => int && clearInterval(int);
}
theOne();

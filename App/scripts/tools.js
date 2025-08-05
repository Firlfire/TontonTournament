function GetAllChampionsAndIcons() {
    var champs = [];
    fetch('https://ddragon.leagueoflegends.com/api/versions.json')
        .then(res => res.json())
        .then(versions => {
            const latestVersion = versions[0];
            return fetch(`https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/en_US/champion.json`);
        })
        .then(res => res.json())
        .then(data => {
            const champions = Object.values(data.data);
            champions.forEach(champion => {
                champs.push({
                    "name": champion.name,
                    "urlImage": `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg`
                });
            });
            console.table(champs);
            return champs;
        })
        .catch(err => console.error(err));
}

function ReceiveMessage(event) {
    const origin = event.origin || ''
    // For Chrome, the origin property is in the event.originalEvent object.
    // console.log('recceived message', event.data)
    console.log(`Message from ${origin} with data ${JSON.stringify(event.data)}`);
    if (origin !== "null") return;

    if (event.data.type === 'adjustElementHeight') {
        const element = document.getElementById(event.data.containerId);
        element.style.height = `${event.data.height}px`;
    }
}
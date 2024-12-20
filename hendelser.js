const livTeller = document.getElementById('livTeller');
const poengTeller = document.getElementById('poengTeller');
const spillKnapp = document.getElementById('spillKnapp');
const lederbrettTabell = document.getElementById('lederbrett').getElementsByTagName('tbody')[0];

let liv, poeng;

// Funksjoner
// Oppdatering av spillscore og liv.
const oppdaterSpill = () => {
    livTeller.textContent = liv;
    poengTeller.textContent = poeng;
};

const oppdaterLederbrett = (navn, poeng) => {
    let lederbrettene = JSON.parse(localStorage.getItem('lederbrettene')) || [];
    lederbrettene.push({ navn, poeng });
    lederbrettene.sort((a, b) => b.poeng - a.poeng);
    lederbrettene = lederbrettene.slice(0, 10); // Beholder kun de 10 beste poengsummene.
    localStorage.setItem('lederbrettene', JSON.stringify(lederbrettene));
    gjengiLederbrettene(lederbrettene);
};

// Gjengi lederbrettene!!
const gjengiLederbrettene = (lederbrettene) => {
    lederbrettTabell.innerHTML = '';
    lederbrettene.forEach((entry, index) => {
        const rad = document.createElement('tr');
        rad.innerHTML = `
            <td>${index + 1}</td>
            <td>${entry.navn}</td>
            <td>${entry.poeng}</td>
        `;
        lederbrettTabell.appendChild(rad);
    });
};

// Hent data fra JSON.
fetch('./hovedoppgave.json')
    .then((response) => {
        if (!response.ok) {
            throw new Error('Søren. Ikkeno svar å få her!');
        }
        return response.json();
    })
    .then((data) => {
        // Initialiserer data slik at spillet kan kjøre.
        liv = data.gameSettings.startLives;
        poeng = data.gameSettings.startPoints;
        oppdaterSpill();

        // Dersom spilleren har tukla seg borti JSON og satt startLives til 0.
        if (liv === 0) {
            alert(`Gratulerer, du er en idiot! Du fikk ${poeng} poeng!`);
            const navn = prompt("Skriv inn navnet ditt:");
            oppdaterLederbrett(navn, poeng);
        }

        // Du har tid på deg! Trykk i vei!!!!!
        setInterval(() => {
            if (liv > 0) {
                liv--;
                oppdaterSpill();
                if (liv === 0) {
                    alert(`Du dævva, men du fikk ihvertfall ${poeng} poeng!`);
                    const navn = prompt("Skriv inn navnet ditt:");
                    oppdaterLederbrett(navn, poeng);
                }
            }
        }, data.gameSettings.timeToGetGot); // Henter intervall fra JSON. Som default er det på 5000 som er tilsvarende til 5 sekunder
    })
    .catch((error) => {
        console.error('Error:', error);
    });

// Trykker du knappen, får du poeng!! Hurra!
spillKnapp.addEventListener('click', () => {
    poeng += 10;
    oppdaterSpill();
});

// Gjengivelse av lederbrettene
document.addEventListener('DOMContentLoaded', () => {
    const lederbrettene = JSON.parse(localStorage.getItem('lederbrettene')) || [];
    gjengiLederbrettene(lederbrettene);
});




//Insert a pretty good excuse to why I didn't do the task in a fashionable manner. 

//Jeg ble litt investert i dette da, men deadline er deadline!

//Jeg har sikkert gjort endringer by the time you read this - derfor sjekk endringshistorikk for å se hva som har blitt endret siden. Jeg leverte inn denne klokka 21:30 20.12.2024. God Jul og god nyttår!
# AMERICANAS TIMER

Americanas timer is a simple timer, a kind of Pomodoro for take control of each partial game. 
Americana Padel Game is an event of some partial Games (for example 15 minutes each Partial game). 
When a Partial Game ends, the players change the court they are playing and another Partial game begins.
Until the Americana reachs at the end (usually a couple of hours)

## Installation

Clone the repo and open the index.html in your browser. That´s all.

## Usage

You need to fill all the fields to start countDown the time to each Partial Game. Otherwise a modal will be opened and the app will be restarted.

## Some images of the App:
<p align="center">
  <img src="https://github.com/pacojaez/americanasTimer/blob/master/material/imgReadMe/AmericanaTimer1.png?raw=true" alt="Americana Portada" width="500">
</p>
<p align="center">
  <img src="https://github.com/pacojaez/americanasTimer/blob/master/material/imgReadMe/AmericanaTimer2.png?raw=true" alt="Americana Portada" width="500">
</p>
<p align="center">
  <img src="https://github.com/pacojaez/americanasTimer/blob/master/material/imgReadMe/AmericanaTimer3.png?raw=true" alt="Americana Portada" width="500">
</p>
<p align="center">
  <img src="https://github.com/pacojaez/americanasTimer/blob/master/material/imgReadMe/AmericanaTimer4.png?raw=true" alt="Americana Portada" width="500">
</p>
<p align="center">
  <img src="https://github.com/pacojaez/americanasTimer/blob/master/material/imgReadMe/AmericanaTimer5.png?raw=true" alt="Americana Portada" width="500">
</p>


## CODE EXAMPLES

I´ve used a couple of classes to launch the App. 
One is the CountDown Class that stores all the attributes and methods of each Partial Game

```js
// Object with the init and cuntdown remaining time
class Countdown {

    constructor(time, expired = false) {
        this.time = time;
        this.expired = expired;
    }

    isExpired(time, now) {
        if (time < now)
            this.expired = true;
    }

    playSound() {

        let x = () => {
            audioElement.currentTime = 0;
            audioElement.play();

            setInterval(function() {

                if (audioElement.currentTime > 10) {

                    audioElement.pause();
                }
            }, 1000);
        }
        setTimeout(x, 1000);
    }

}
```

It´s important not iterate the elements that are Expired, so I filter the Array
```js
        // dont iterate the objects that expired is true
        const filteredArrayGames = arrayGames.filter(e => e.expired == false);
```


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)

## Thanks to:

* Robert Sallent for all his lessons.
* A lot of people I´m already learning with.


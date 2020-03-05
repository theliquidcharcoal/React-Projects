/*global Mixcloud*/
import React, {Component} from 'react';
import {
	BrowserRouter as Router,
	Route
} from 'react-router-dom';
import Header from './Header';
import FeaturedMix from './FeaturedMix';

const Home = () => <h1>Home</h1>
const Archive = () => <h1>Archive</h1>
const About = () => <h1>About</h1>


class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			//whether a mix is currently playing
			playing: false,
			//the id of the current mix
			currentMix: ''
		};
	}

	mountAudio = async() => {
		// when we use 'this' keyword, our widget is now accessible
		// anywhere inside the component.

		this.widget = Mixcloud.PlayerWidget(this.player);
		// here we wait for our widget to be ready before we continuing
		await this.widget.ready;
		// await this.widget.play();

		this.widget.events.pause.on(
			() => this.setState({
				playing: false
			})

		);

		this.widget.events.play.on(
			// () => console.log('is playing')
			() => this.setState({
				playing: true
			})
		);


		console.log(this.widget);
	};

	componentDidMount() {
		// console.log("The component mounted.");
		// when our app component is all loaded onto the page
		// our componentDidMount gets called an d we can be sure
		// everything is ready, so we then run our mountAudio() method
		this.mountAudio();
	};

	togglePlay = () => {
		// console.log('togglePlay');
		// we want to togglePlay on our widget.
		this.widget.togglePlay();
	}

	playMix = mixName => {
		//load a new mix by its name and 
		//then start playing it immediately
		this.widget.load(mixName, true);
		console.log(this.widget.load(mixName, true))
	}


	render() {

	  	return (
	  	//This dic contains everything
	  	// Router wraps our whole page and lets us use react-router
		  	<Router>
			    <div>
			    	{/*This div contains our page (excluding audio player)*/}
					<div className='flex-l justify-end'>
			    		{/*Feautured Mix (Needs styling)*/}
			    		<FeaturedMix  />
			    		
			    		<div className="w-50-l relative z-1">
			    			{/*Header*/}
			    			<Header />
			    			{/*Routed Page*/}

			    			<div>
			    				<button onClick={this.togglePlay}>
			    					{this.state.playing ? 'Pause' : 'Play'}
			    				</button>
			    			</div>

			    			<div>
			    				<button onClick={() => this.playMix
			    					('/HeadphoneCommute/low-light-mixes-pno-2010/')}>
			    					Play Mix
			    				</button>
			    			</div>

			    			<Route exact path="/" component={Home} />
			    			<Route path="/archive" component={Archive} />
			    			<Route path="/about" component={About} />

			    		</div>
			    	</div>	
				    	
			    	{/*Audio Player*/}
			    	<iframe  
			    		width="100%" 
			    		height="60" 
			    		src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=%2Fdeejaypardcharts%2Flapsley-live-acoustic-session-radio-01-annie-mac-2015%2F" 
			    		frameBorder="0"
			    		className="player db fixed bottom-0"
			    		// this allows us to get the acrual element inside react
			    		ref={player => (this.player = player)}
			    	>
					</iframe>
			    </div>
		  		
		  	</Router>
	  	);
	}
}

export default App;

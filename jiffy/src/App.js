import React, {Component} from 'react';
import loader from './images/loader.svg'
import Gif from './gif-comp.js'

// Function for Random Selection 
const randomSelect = arr => {
	const randIndex = Math.floor(Math.random() * arr.length);
	return arr[randIndex]
	console.log(arr[randIndex])
}



// Header Component
const Header = () => (
	<div className="header grid">
		<h1 className="title">Jiffy</h1>

	</div>

);

const UserHint = ({loading, hintText}) => (
	<div className="user-hint">
		{	loading ? 
			<img className="block mx-auto" src={loader} /> : 
			<span className="">{hintText}</span>
		}
	</div>

)

class App extends Component {

	constructor(props){
		super(props)
		this.state = {
			searchTerm: '',
			hintText: '',
			gif: null,
			// We have an array of GIFs here
			gifs: []
		}
	}

	// We awnt a function that searches the giphy api using
	// fetch and puts the search term into the query url and
	// then we can do something with the results

	//We can also write async methods into our components
	//that let us use the async/await style of function

	searchGiphy = async searchTerm => {
		//First we try our fetch
		try{
			//here we use the await keyword to wait for our response to comeback.
			const response = await fetch(
				`https://api.giphy.com/v1/gifs/search?api_key=dmo1TAE8ufvIIqWpugW6aTY15isD27Sd&q=${searchTerm}&limit=250&offset=0&rating=G&lang=en`
			);
    		
    		// here we convert our raw response into json data
    		// const {data} gets the .data part of our response
    		const {data} = await response.json();



    		// hrere we grab random result from our images
    		const randomGif = randomSelect(data);
    		console.log({randomGif});
    		console.log(data)


    		this.setState((prevState, props) => ({
    			...prevState,
    			// get the first result and put in the state.
    			gif: randomGif,
    			// Here we use our spread to take the previous gifs and 
    			// spread them out, and then add our new random gif.
    			// onto the end of the gifs array.
    			gifs: [...prevState.gifs, randomGif]

    		}))

		  // If fetch fails, we catch it down here.
		} catch (error) {

		}
	}




	// with create-react-app we can write our methods as arrow functions,
	// meaning we don't need the constructor and bind

	handleChange = event => {
		

		const {value} = event.target; // console.log(event.target.value);

		// by setting the search term in our state and also using that
		// on the input as the value, we have created what is called
		// a controlled input
		this.setState((prevState, props) => ({

				//We take our old props and spread them out here
				...prevState,
				// then we overwrite the ones we want after
				searchTerm: value,
				hintText: value.length > 2 ? `Hit Enter to search ${value}` : ''


			})

		)



		// if(value.length > 2){
		// 	// console.log("this is valid search term");
		// } 
	};

	//When we have 2 or more chareacters in our search box
	// and we have also pressed enter, we then want to run search.

	handleKeyPress = event => {
		const {value} = event.target
		console.log(event.key);

		if(value.length > 2 && event.key === 'Enter'){
			// alert(`search for ${value}`);
			//here we call our searchGiphy function using the search term.
			this.searchGiphy(value);

		} else {
			if(event.key === 'Enter'){
				alert(`Please enter more than 2 characters`);
			}
		}
	};


	
	render(){
		const {searchTerm, gif} = this.state //const searchTerm = this.state.searchTerm
	  	return (
		    <div className="page">
		      	<Header />		  		
		  		{/*Search Box*/}
		  		<div className="search grid">
		  			<input 
		  				type="text" 
		  				className="input db py3" 
		  				placeholder="Type Something" 
		  				onChange={this.handleChange}
		  				onKeyPress={this.handleKeyPress}
		  				value={searchTerm}
		  			/>
		  			{/*Our Stack of GIF images
		  			 Here we loop over our array of gif images from our state and we create multiple videos from it.*/}
		  			{/*
		  				Its only going to render our video when we have a gif in the state, we can test for it using &&
		  			*/}
		  			
		  			{/*
		  				gif && <video className="db video" autoPlay={true} loop
							src={this.state.gif.images.original.mp4} />
					*/}

		  			{this.state.gifs.map(

		  				gif => (
		  					<Gif {...gif} />

						
						)
	  				)}

		  		</div>
		  		{/*Here we pass our userHint all of our state using a spread*/}
		  		<UserHint {...this.state} />

		    </div>
  		);
	}
}

export default App;
